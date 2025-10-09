import Link from 'next/link';
import Image from 'next/image';

import { highlight } from 'sugar-high';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

function Table({ children }: { children: any }) {
  const rows = children?.props?.children ?? [];

  if (!Array.isArray(rows) || rows.length === 0) {
    return children;
  }

  const headers = (rows[0]?.props?.children ?? []).map((header: React.ReactNode, index: number) => (
    <th key={index}>{header}</th>
  ));

  const tableRows = rows.slice(1).map((row: any, rowIndex: number) => (
    <tr key={rowIndex}>
      {(row?.props?.children ?? []).map((cell: React.ReactNode, cellIndex: number) => (
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

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? '';

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

function RoundedImage({ alt, className, ...rest }: React.ComponentProps<typeof Image>) {
  const composedClassName = className ? `rounded-lg ${className}` : 'rounded-lg';
  return <Image alt={alt ?? ''} className={composedClassName} {...rest} />;
}

function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const codeHTML = highlight(String(children));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(value: React.ReactNode): string {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children);

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
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
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
};

interface CustomMDXProps {
  source: string;
}

export async function CustomMDX({ source }: CustomMDXProps) {
  return MDXRemote({
    source,
    components,
  });
}
