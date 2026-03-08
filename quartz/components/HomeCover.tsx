import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative } from "../util/path"
import { getDate } from "./Date"
import script from "./scripts/homecover.inline"

const sectionLinks = [
  { label: "Essays", href: "garden/essays" },
  { label: "Notes", href: "garden/notes" },
  { label: "Patterns", href: "garden/patterns" },
  { label: "Library", href: "garden/library" },
]

const topicLinks = [
  { label: "AI Workflows", href: "topics/ai-workflows" },
  { label: "Software & Methods", href: "topics/software-methods" },
  { label: "Causal Inference", href: "topics/causal-inference" },
  { label: "Statistics", href: "topics/statistics" },
  { label: "mHealth", href: "topics/mhealth" },
]

const validKinds = new Set(["essay", "note", "pattern", "library"])
const stageLabels = ["seed", "growing", "evergreen"]
const placeholderSketch = "/assets/sketches/card-placeholder.svg"
const typeIcons: Record<string, string> = {
  note: "✎",
  pattern: "◈",
  library: "📚",
}

function byDateDesc(cfg: QuartzComponentProps["cfg"], a: QuartzPluginData, b: QuartzPluginData) {
  const aDate = (a.dates && getDate(cfg, a)?.getTime()) ?? 0
  const bDate = (b.dates && getDate(cfg, b)?.getTime()) ?? 0
  return bDate - aDate
}

function byFeaturedThenDate(cfg: QuartzComponentProps["cfg"], a: QuartzPluginData, b: QuartzPluginData) {
  const aFeatured = a.frontmatter?.featured === true ? 1 : 0
  const bFeatured = b.frontmatter?.featured === true ? 1 : 0
  if (aFeatured !== bFeatured) return bFeatured - aFeatured
  return byDateDesc(cfg, a, b)
}

const HomeCover: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  const writing = allFiles
    .filter((f) => {
      const kind = f.frontmatter?.kind as string | undefined
      if (!kind || !validKinds.has(kind)) return false
      if (!f.slug || f.slug === "index" || f.slug.endsWith("/index")) return false
      return !!f.frontmatter?.title
    })
    .sort((a, b) => byFeaturedThenDate(cfg, a, b))
    .slice(0, 12)

  return (
    <div class="home-cover">
      <section class="home-writing writing-section">
        <h2>Writing</h2>
        <div class="home-filters filter-row">
          <div class="filter-group filter-chips" data-filter-group="type">
            <button class="filter-chip is-active" data-type="all">All</button>
            <button class="filter-chip" data-type="essay">Essays</button>
            <button class="filter-chip" data-type="note">Notes</button>
            <button class="filter-chip" data-type="pattern">Patterns</button>
            <button class="filter-chip" data-type="library">Library</button>
          </div>
          <div class="filter-group filter-chips" data-filter-group="stage">
            <button class="filter-chip is-active" data-stage="all">All stages</button>
            {stageLabels.map((stage) => (
              <button class="filter-chip" data-stage={stage}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div class="writing-grid">
          {writing.map((item, idx) => {
            const kind = (item.frontmatter?.kind as string | undefined) ?? "note"
            const stage = (item.frontmatter?.status as string | undefined) ?? "seed"
            const sketch = item.frontmatter?.sketch as string | undefined
            const sketchAlt =
              (item.frontmatter?.sketchAlt as string | undefined) ??
              `Sketch for ${item.frontmatter?.title ?? "entry"}`
            const cardHref = resolveRelative(fileData.slug!, item.slug!)
            const showEssayImage = kind === "essay"
            const thumbSrc = showEssayImage ? placeholderSketch : ""
            const typeIcon = typeIcons[kind] ?? ""
            const isFeatured = idx === 0

            return (
              <a
                class={`writing-card internal ${isFeatured ? "is-featured" : ""}`}
                href={cardHref}
                data-no-popover="true"
                data-type={kind}
                data-stage={stage}
              >
                {showEssayImage ? (
                  <div class="writing-card-image-wrap">
                    <img class="writing-card-image" src={thumbSrc} alt={sketchAlt} loading="lazy" />
                  </div>
                ) : (
                  <p class="writing-card-icon card-icon" aria-hidden="true">{typeIcon}</p>
                )}
                <p class="writing-card-meta card-meta">
                  <span class="writing-card-kind">{kind}</span>
                  <span class="dot">·</span>
                  <span class="writing-card-stage">{stage}</span>
                </p>
                <h3 class="writing-card-title">{item.frontmatter?.title}</h3>
                {item.frontmatter?.description && <p class="writing-card-desc">{item.frontmatter?.description}</p>}
              </a>
            )
          })}
        </div>
      </section>

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

HomeCover.afterDOMLoaded = script

export default (() => HomeCover) satisfies QuartzComponentConstructor
