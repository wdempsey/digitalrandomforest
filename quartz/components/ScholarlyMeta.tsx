import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function parseDateLike(value: unknown): Date | null {
  if (!value) return null
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return null
}

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

const ScholarlyMeta: QuartzComponent = ({ cfg, fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter ?? {}
  const published =
    parseDateLike(frontmatter.date) ?? fileData.dates?.published ?? fileData.dates?.created ?? null
  const updated =
    parseDateLike(frontmatter.updated) ?? fileData.dates?.modified ?? fileData.dates?.published ?? null
  const status = typeof frontmatter.status === "string" ? frontmatter.status : null
  const version = typeof frontmatter.version === "string" ? frontmatter.version : null

  const stageGlyphs: Record<string, string> = {
    seed: "🌱",
    growing: "🌿",
    evergreen: "🌳",
  }

  const entries: [string, string][] = []
  if (published) entries.push(["Published", formatDate(published, cfg.locale)])
  if (updated) entries.push(["Updated", formatDate(updated, cfg.locale)])
  if (status) {
    const glyph = stageGlyphs[status]
    entries.push(["Stage", glyph ? `${glyph} ${toTitleCase(status)}` : toTitleCase(status)])
  }
  if (version) entries.push(["Version", version])

  if (entries.length === 0) return null

  return (
    <p class={classNames(displayClass, "scholarly-meta")}>
      {entries.map(([label, value]) => (
        <span class="meta-item">
          <span class="meta-label">{label}</span>
          <span class="meta-sep">·</span>
          <span class="meta-value">{value}</span>
        </span>
      ))}
    </p>
  )
}

ScholarlyMeta.css = `
.scholarly-meta {
  display: grid;
  gap: 0.2rem;
  margin: 0.2rem 0 1.6rem 0;
}

.scholarly-meta .meta-item {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--darkgray);
}

.scholarly-meta .meta-label {
  color: var(--darkgray);
}

.scholarly-meta .meta-sep {
  color: var(--gray);
}
`

export default (() => ScholarlyMeta) satisfies QuartzComponentConstructor
