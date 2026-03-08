import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate } from "./Date"
import { resolveRelative } from "../util/path"

const kindOrder = ["essay", "note", "pattern", "library"]

function byDateDesc(cfg: QuartzComponentProps["cfg"], a: QuartzPluginData, b: QuartzPluginData) {
  const aDate = (a.dates && getDate(cfg, a)?.getTime()) ?? 0
  const bDate = (b.dates && getDate(cfg, b)?.getTime()) ?? 0
  return bDate - aDate
}

export default (() => {
  const TopicConnections: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
    const slug = fileData.slug ?? ""
    if (!slug.startsWith("topics/")) return null

    const topic = slug.split("/")[1]
    const related = allFiles.filter((f) => {
      if (!f.slug || f.slug === slug) return false
      const topics = (f.frontmatter?.topics ?? []) as string[]
      return topics.includes(topic)
    })

    if (related.length === 0) return null

    const grouped = kindOrder
      .map((kind) => ({
        kind,
        items: related
          .filter((f) => (f.frontmatter?.kind as string | undefined) === kind)
          .sort((a, b) => byDateDesc(cfg, a, b))
          .slice(0, 6),
      }))
      .filter((group) => group.items.length > 0)

    return (
      <section class="topic-connections">
        <h2>Related Writing</h2>
        {grouped.map((group) => (
          <div class="topic-group">
            <h3>{group.kind}</h3>
            <ul>
              {group.items.map((item) => (
                <li>
                  <a class="internal" href={resolveRelative(slug, item.slug!)}>
                    {item.frontmatter?.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    )
  }

  return TopicConnections
}) satisfies QuartzComponentConstructor
