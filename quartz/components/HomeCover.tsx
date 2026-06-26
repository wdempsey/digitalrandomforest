import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"

const sectionLinks = [
  { label: "Essays", href: "garden/essays" },
  { label: "Notes", href: "garden/notes" },
  { label: "Library", href: "garden/library" },
]

const topicLinks = [
  { label: "AI Workflows", href: "topics/ai-workflows" },
  { label: "Software & Methods", href: "topics/software-methods" },
  { label: "Causal Inference", href: "topics/causal-inference" },
  { label: "Statistics", href: "topics/statistics" },
  { label: "mHealth", href: "topics/mhealth" },
]

// A hand-curated reading path. Editorial control lives here, not in a filter UI.
const startHereSlugs = [
  "garden/notes/researchers-are-not-end-point-verifiers",
  "garden/notes/academics-as-ai-managers",
  "garden/library/double-machine-learning-summary",
]

const validKinds = new Set(["essay", "note", "pattern", "library"])
const placeholderSketch = "/assets/sketches/card-placeholder.svg"
const typeIcons: Record<string, string> = {
  essay: "❧",
  note: "✎",
  pattern: "◈",
  library: "📚",
}

const stageMeta: Record<string, { glyph: string; label: string }> = {
  seed: { glyph: "🌱", label: "Seed" },
  growing: { glyph: "🌿", label: "Growing" },
  evergreen: { glyph: "🌳", label: "Evergreen" },
}

function stageOf(f: QuartzPluginData): { glyph: string; label: string } {
  const status = (f.frontmatter?.status as string | undefined) ?? "seed"
  return stageMeta[status] ?? { glyph: "🌱", label: status.charAt(0).toUpperCase() + status.slice(1) }
}

function byDateDesc(cfg: QuartzComponentProps["cfg"], a: QuartzPluginData, b: QuartzPluginData) {
  const aDate = (a.dates && getDate(cfg, a)?.getTime()) ?? 0
  const bDate = (b.dates && getDate(cfg, b)?.getTime()) ?? 0
  return bDate - aDate
}

function isWriting(f: QuartzPluginData): boolean {
  const kind = f.frontmatter?.kind as string | undefined
  if (!kind || !validKinds.has(kind)) return false
  if (!f.slug || f.slug === "index" || f.slug.endsWith("/index")) return false
  return !!f.frontmatter?.title
}

const HomeCover: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  const writing = allFiles.filter(isWriting)
  const bySlug = new Map(writing.map((f) => [f.slug!, f]))

  // Hero: the featured essay, newest first; fall back to newest essay.
  const hero =
    writing
      .filter((f) => f.frontmatter?.kind === "essay" && f.frontmatter?.featured === true)
      .sort((a, b) => byDateDesc(cfg, a, b))[0] ??
    writing.filter((f) => f.frontmatter?.kind === "essay").sort((a, b) => byDateDesc(cfg, a, b))[0]

  const startHere = startHereSlugs
    .map((slug) => bySlug.get(slug))
    .filter((f): f is QuartzPluginData => Boolean(f))

  const excluded = new Set<string>(
    [hero?.slug, ...startHereSlugs].filter(Boolean) as string[],
  )
  const recent = writing
    .filter((f) => !excluded.has(f.slug!))
    .sort((a, b) => byDateDesc(cfg, a, b))
    .slice(0, 4)

  const card = (item: QuartzPluginData) => {
    const kind = (item.frontmatter?.kind as string | undefined) ?? "note"
    const stage = stageOf(item)
    const cardHref = resolveRelative(fileData.slug!, item.slug!)
    return (
      <a class="writing-card internal" href={cardHref} data-no-popover="true">
        <p class="writing-card-icon card-icon" aria-hidden="true">
          {typeIcons[kind] ?? "✎"}
        </p>
        <p class="writing-card-meta card-meta">
          <span class="writing-card-kind">{kind}</span>
          <span class="dot">·</span>
          <span class="writing-card-stage">
            <span aria-hidden="true">{stage.glyph}</span> {stage.label}
          </span>
        </p>
        <h3 class="writing-card-title">{item.frontmatter?.title}</h3>
        {item.frontmatter?.description && (
          <p class="writing-card-desc">{item.frontmatter?.description}</p>
        )}
      </a>
    )
  }

  const heroSketch =
    (hero?.frontmatter?.sketch as string | undefined)?.trim() || placeholderSketch
  const heroSketchAlt =
    (hero?.frontmatter?.sketchAlt as string | undefined) ??
    `Sketch for ${hero?.frontmatter?.title ?? "the anchor essay"}`

  return (
    <div class="home-cover">
      {hero && (
        <section class="home-hero">
          <p class="home-eyebrow">What I'm thinking about now</p>
          <a class="hero-card internal" href={resolveRelative(fileData.slug!, hero.slug!)}>
            <div class="hero-card-image">
              <img src={heroSketch} alt={heroSketchAlt} loading="lazy" />
            </div>
            <div class="hero-card-body">
              <p class="hero-card-meta">
                <span>{(hero.frontmatter?.kind as string) ?? "essay"}</span>
                <span class="dot">·</span>
                <span>
                  <span aria-hidden="true">{stageOf(hero).glyph}</span> {stageOf(hero).label}
                </span>
              </p>
              <h2 class="hero-card-title">{hero.frontmatter?.title}</h2>
              {hero.frontmatter?.description && (
                <p class="hero-card-desc">{hero.frontmatter?.description}</p>
              )}
              <span class="hero-card-cue">Read the essay →</span>
            </div>
          </a>
        </section>
      )}

      {startHere.length > 0 && (
        <section class="home-start">
          <h2>Then wander into</h2>
          <div class="writing-grid">{startHere.map(card)}</div>
        </section>
      )}

      {recent.length > 0 && (
        <section class="home-recent">
          <h2>Recently tending</h2>
          <div class="writing-grid">{recent.map(card)}</div>
        </section>
      )}

      <p class="stage-legend">
        <span aria-hidden="true">🌱</span> Seed · <span aria-hidden="true">🌿</span> Growing ·{" "}
        <span aria-hidden="true">🌳</span> Evergreen — pages grow and are revised as the thinking does.
      </p>

      <section class="home-explore">
        <h2>Explore the Garden</h2>
        <p>
          {sectionLinks.map((link, i) => (
            <>
              {i > 0 && <span> · </span>}
              <a class="internal" href={resolveRelative(fileData.slug!, link.href)}>
                {link.label}
              </a>
            </>
          ))}
        </p>
      </section>

      <section class="home-topics">
        <h2>Topics</h2>
        <div class="topic-row">
          {topicLinks.map((topic) => (
            <a class="internal topic-pill" href={resolveRelative(fileData.slug!, topic.href)}>
              {topic.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

HomeCover.css = `
.home-hero {
  margin-top: 0.4rem;
}
.home-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
  margin: 0 0 0.7rem 0;
}
.hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
  padding: 1.4rem 1.5rem;
  border: var(--card-border, 1px solid rgba(0, 0, 0, 0.06));
  border-radius: 12px;
  background: var(--card-bg, rgba(0, 0, 0, 0.015));
  text-decoration: none;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}
.hero-card:hover {
  box-shadow: var(--warm-shadow, 0 8px 24px rgba(73, 58, 43, 0.06));
  transform: translateY(-1px);
}
.hero-card-image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.hero-card-meta {
  margin: 0 0 0.4rem 0;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}
.hero-card-meta,
.hero-card-meta span {
  font-size: 0.78rem;
  color: var(--gray);
}
.hero-card-meta .dot {
  color: var(--lightgray);
}
.hero-card-title {
  font-family: var(--headerFont, "Source Serif 4"), serif;
  font-size: 1.6rem;
  line-height: 1.2;
  margin: 0 0 0.5rem 0;
  color: var(--dark);
}
.hero-card-desc {
  margin: 0 0 0.8rem 0;
  color: var(--darkgray);
  font-size: 1rem;
  line-height: 1.55;
}
.hero-card-cue {
  font-size: 0.85rem;
  color: var(--secondary);
}
.home-start,
.home-recent {
  margin-top: 2.4rem;
}
.home-start > h2,
.home-recent > h2 {
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  color: var(--darkgray);
  margin: 0 0 0.9rem 0;
}
.writing-card .writing-card-stage {
  white-space: nowrap;
}
.stage-legend {
  margin: 2rem 0 0.4rem 0;
  font-size: 0.8rem;
  color: var(--gray);
}
@media (max-width: 750px) {
  .hero-card {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
  .hero-card-image {
    order: 2;
  }
}
`

export default (() => HomeCover) satisfies QuartzComponentConstructor
