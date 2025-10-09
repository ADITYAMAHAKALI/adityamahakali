import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog');
const SUPPORTED_EXTENSIONS = ['.md', '.mdx'];

export interface PostFrontmatter {
  title?: string;
  description?: string;
  summary?: string;
  publishedAt?: string;
  date?: string;
  updatedAt?: string;
  tags?: unknown;
  draft?: boolean;
  [key: string]: unknown;
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostSummary {
  frontmatter: PostFrontmatter;
  content: string;
}

interface RawPost {
  slug: string;
  filePath: string;
  frontmatter: PostFrontmatter;
  content: string;
}

interface FrontMatterParseResult {
  frontmatter: PostFrontmatter;
  content: string;
}

const FRONT_MATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_ROOT)
    .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .map((file) => file.replace(/\.mdx?$/i, ''))
    .sort((a, b) => a.localeCompare(b));
}

export function getAllPosts(): PostSummary[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => readPost(slug))
    .filter((value): value is RawPost => value !== null)
    .filter((post) => !isDraft(post.frontmatter))
    .map((post) => toSummary(post));

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = readPost(slug);

  if (!post || isDraft(post.frontmatter)) {
    return null;
  }

  return {
    ...toSummary(post),
    frontmatter: post.frontmatter,
    content: post.content,
  };
}

export function getPostSummary(slug: string): PostSummary | null {
  const post = readPost(slug);

  if (!post || isDraft(post.frontmatter)) {
    return null;
  }

  return toSummary(post);
}

function readPost(slug: string): RawPost | null {
  const filePath = resolvePostFilePath(slug);

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, content } = extractFrontMatter(fileContents);

  return {
    slug,
    filePath,
    frontmatter,
    content,
  };
}

function resolvePostFilePath(slug: string): string | null {
  const baseName = slug.replace(/\.mdx?$/i, '');

  for (const extension of SUPPORTED_EXTENSIONS) {
    const filePath = path.join(CONTENT_ROOT, `${baseName}${extension}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

function toSummary(post: RawPost): PostSummary {
  const title = typeof post.frontmatter.title === 'string'
    ? post.frontmatter.title
    : startCaseFromSlug(post.slug);

  const description = pickDescription(post.frontmatter);
  const tags = normaliseTags(post.frontmatter.tags);
  const publishedAt = resolvePublishedDate(post.frontmatter, post.filePath);
  const updatedAt = resolveUpdatedDate(post.frontmatter);
  const readingTime = estimateReadingTime(post.content);

  return {
    slug: post.slug,
    title,
    description,
    tags,
    publishedAt,
    updatedAt,
    readingTime,
  };
}

function pickDescription(frontmatter: PostFrontmatter): string {
  if (typeof frontmatter.description === 'string') {
    return frontmatter.description;
  }

  if (typeof frontmatter.summary === 'string') {
    return frontmatter.summary;
  }

  return '';
}

function normaliseTags(tags: PostFrontmatter['tags']): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => (typeof tag === 'string' ? tag : null))
    .filter((tag): tag is string => tag !== null);
}

function resolvePublishedDate(frontmatter: PostFrontmatter, filePath: string): string {
  const candidate =
    typeof frontmatter.publishedAt === 'string'
      ? frontmatter.publishedAt
      : typeof frontmatter.date === 'string'
        ? frontmatter.date
        : undefined;

  const parsed = parseDate(candidate);

  if (parsed) {
    return parsed.toISOString();
  }

  const stats = fs.statSync(filePath);
  return stats.birthtime.toISOString();
}

function resolveUpdatedDate(frontmatter: PostFrontmatter): string | undefined {
  const parsed = parseDate(frontmatter.updatedAt);
  return parsed?.toISOString();
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const timestamp = Date.parse(trimmed);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return new Date(timestamp);
}

function estimateReadingTime(content: string): string {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const averageWordsPerMinute = 200;
  const minutes = Math.max(1, Math.round(words / averageWordsPerMinute));

  return `${minutes} min read`;
}

function startCaseFromSlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function isDraft(frontmatter: PostFrontmatter): boolean {
  return frontmatter.draft === true;
}

function extractFrontMatter(source: string): FrontMatterParseResult {
  const match = source.match(FRONT_MATTER_REGEX);

  if (!match) {
    return { frontmatter: {}, content: source.trimStart() };
  }

  const [, frontMatterBlock] = match;
  const content = source.slice(match[0].length);
  const frontmatter = parseFrontMatterBlock(frontMatterBlock);

  return {
    frontmatter,
    content: content.trimStart(),
  };
}

function parseFrontMatterBlock(block: string): PostFrontmatter {
  const result: PostFrontmatter = {};
  const lines = block.split(/\r?\n/);
  let currentKey: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const arrayItemMatch = line.match(/^-\s*(.+)$/);

    if (arrayItemMatch && currentKey) {
      const value = parseScalar(arrayItemMatch[1]);
      const existing = result[currentKey];

      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[currentKey] = [value];
      }

      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);

    if (!keyValueMatch) {
      currentKey = null;
      continue;
    }

    const [, key, value] = keyValueMatch;

    if (value === '') {
      result[key] = [];
      currentKey = key;
      continue;
    }

    result[key] = parseScalar(value);
    currentKey = key;
  }

  return result;
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const list = trimmed.slice(1, -1).split(',');
    return list
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => removeWrappingQuotes(item));
  }

  if (trimmed === 'true') {
    return true;
  }

  if (trimmed === 'false') {
    return false;
  }

  const maybeNumber = Number(trimmed);
  if (!Number.isNaN(maybeNumber)) {
    return maybeNumber;
  }

  return removeWrappingQuotes(trimmed);
}

function removeWrappingQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}
