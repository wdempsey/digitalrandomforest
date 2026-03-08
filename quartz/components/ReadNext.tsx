import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative } from "../util/path"

interface ReadNextOptions {
  limit: number
}

const defaultOptions: ReadNextOptions = {
  limit: 3,
}

function topicOverlap(a: string[] = [], b: string[] = []): number {
  const setB = new Set(b)
  return a.filter((topic) => setB.has(topic)).length
}

function sortByRelevance(current: QuartzPluginData, candidates: QuartzPluginData[]) {
  const currentTopics = (current.frontmatter?.topics ?? []) as string[]
  const currentKind = current.frontmatter?.kind as string | undefined
  return candidates.sort((a, b) => {
    const aTopics = (a.frontmatter?.topics ?? []) as string[]
    const bTopics = (b.frontmatter?.topics ?? []) as string[]
    const aScore = topicOverlap(currentTopics, aTopics) * 10 + (a.frontmatter?.kind === currentKind ? 3 : 0)
    const bScore = topicOverlap(currentTopics, bTopics) * 10 + (b.frontmatter?.kind === currentKind ? 3 : 0)
    if (aScore !== bScore) return bScore - aScore

    const aDate = a.dates?.modified?.getTime() ?? 0
    const bDate = b.dates?.modified?.getTime() ?? 0
    return bDate - aDate
  })
}

export default ((opts?: Partial<ReadNextOptions>) => {
  const options = { ...defaultOptions, ...opts }

  const ReadNext: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const currentSlug = fileData.slug
    if (!currentSlug || currentSlug === "index" || currentSlug.startsWith("topics/")) return null

    const currentTopics = (fileData.frontmatter?.topics ?? []) as string[]
    if (currentTopics.length === 0) return null

    const candidates = allFiles.filter((f) => {
      if (!f.slug || f.slug === currentSlug) return false
      if (!f.frontmatter?.title) return false
      const topics = (f.frontmatter?.topics ?? []) as string[]
      return topicOverlap(currentTopics, topics) > 0
    })

    const related = sortByRelevance(fileData, candidates).slice(0, options.limit)
    if (related.length === 0) return null

    return (
      <section class="read-next">
        <h3>Read Next</h3>
        <ul>
          {related.map((item) => (
            <li>
              <a href={resolveRelative(currentSlug, item.slug!)} class="internal">
                {item.frontmatter?.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return ReadNext
}) satisfies QuartzComponentConstructor<Partial<ReadNextOptions>>
