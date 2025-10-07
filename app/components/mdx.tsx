import Link from 'next/link';
import Image from 'next/image';

import { highlight } from 'sugar-high';
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

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
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
