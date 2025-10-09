import Link from 'next/link';
import Image from 'next/image';

import { tokenize } from 'sugar-high';
import React from 'react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
// import MermaidClient from './MermaidClient';
function Table({ children }) {
  let rows = children.props.children;

  let headers = rows[0].props.children.map((header, index) => (
    <th key={index}>{header}</th>
  ));

  let tableRows = rows.slice(1).map((row, index) => (
    <tr key={index}>
      {row.props.children.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

const TOKEN_TYPES = [
  'identifier',
  'keyword',
  'string',
  'class',
  'property',
  'entity',
  'jsxliterals',
  'sign',
  'comment',
  'break',
  'space',
] as const;

const BREAK_TOKEN_INDEX = TOKEN_TYPES.indexOf('break');

function toCodeString(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      return '';
    })
    .join('');
}

function renderToken(
  typeIndex: number,
  value: string,
  key: string
): React.ReactElement {
  const tokenName = TOKEN_TYPES[typeIndex] ?? 'identifier';

  return (
    <span
      key={key}
      className={`sh__token--${tokenName}`}
      style={{ color: `var(--sh-${tokenName})` }}
    >
      {value}
    </span>
  );
}

function createHighlightedNodes(code: string) {
  const tokens = tokenize(code);
  const lines: React.ReactElement[][] = [];
  let currentLine: React.ReactElement[] = [];

  const flushLine = () => {
    lines.push(currentLine);
    currentLine = [];
  };

  tokens.forEach(([typeIndex, value], tokenIndex) => {
    if (typeIndex === BREAK_TOKEN_INDEX) {
      flushLine();
      return;
    }

    const segments = value.split('\n');

    segments.forEach((segment, segmentIndex) => {
      currentLine.push(
        renderToken(typeIndex, segment, `${tokenIndex}-${segmentIndex}`)
      );

      if (segmentIndex < segments.length - 1) {
        flushLine();
      }
    });
  });

  if (currentLine.length || lines.length === 0) {
    flushLine();
  }

  return lines.map((lineTokens, lineIndex) => (
    <span key={`line-${lineIndex}`} className="sh__line">
      {lineTokens}
    </span>
  ));
}

function Code({ children, ...props }) {
  const code = toCodeString(children);
  const highlighted = createHighlightedNodes(code);

  return <code {...props}>{highlighted}</code>;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  // mermaid: MermaidClient, // Using the dynamically imported Mermaid component here
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
