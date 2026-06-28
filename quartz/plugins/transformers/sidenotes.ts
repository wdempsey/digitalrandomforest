import { QuartzTransformerPlugin } from "../types"
import { Root as HtmlRoot, Element, ElementContent } from "hast"

/**
 * Sidenotes
 *
 * Relocates standard GitHub-style Markdown footnotes ( text[^1] ... [^1]: note )
 * into Tufte-style margin sidenotes at build time. Authoring is unchanged.
 * Fully defensive: if the expected footnote markup isn't present it does
 * nothing, so it can never break a build.
 */

function classOf(n: any): string[] {
  const c = n && n.properties && n.properties.className
  if (Array.isArray(c)) return c as string[]
  if (typeof c === "string") return c.split(/\s+/)
  return []
}

function isRefAnchor(n: any): boolean {
  if (!n || n.type !== "element" || n.tagName !== "a") return false
  const h = n.properties && n.properties.href
  return typeof h === "string" && h.startsWith("#user-content-fn-") && !h.startsWith("#user-content-fnref")
}

function isBackref(n: any): boolean {
  if (!n || n.type !== "element" || n.tagName !== "a") return false
  const h = n.properties && n.properties.href
  return typeof h === "string" && h.startsWith("#user-content-fnref")
}

function stripBackref(nodes: any[]): ElementContent[] {
  const out: any[] = []
  for (const n of nodes) {
    if (isBackref(n)) continue
    if (n && n.type === "element" && n.tagName === "p") {
      out.push(...stripBackref(n.children || []))
      continue
    }
    if (n && n.type === "element") {
      n.children = stripBackref(n.children || [])
      out.push(n)
      continue
    }
    out.push(n)
  }
  while (out.length && out[out.length - 1].type === "text" && !out[out.length - 1].value.trim()) {
    out.pop()
  }
  return out as ElementContent[]
}

export const Sidenotes: QuartzTransformerPlugin = () => {
  return {
    name: "Sidenotes",
    htmlPlugins() {
      return [
        () => {
          return (tree: HtmlRoot) => {
            const defs = new Map<string, ElementContent[]>()

            const collectLi = (n: any) => {
              if (!n || !Array.isArray(n.children)) return
              for (const li of n.children) {
                if (
                  li.type === "element" &&
                  li.tagName === "li" &&
                  li.properties &&
                  typeof li.properties.id === "string"
                ) {
                  defs.set(li.properties.id, stripBackref(li.children || []))
                } else {
                  collectLi(li)
                }
              }
            }

            const findSection = (n: any) => {
              if (!n || !Array.isArray(n.children)) return
              for (let i = 0; i < n.children.length; i++) {
                const ch = n.children[i]
                if (
                  ch.type === "element" &&
                  ch.tagName === "section" &&
                  classOf(ch).includes("footnotes")
                ) {
                  collectLi(ch)
                  n.children.splice(i, 1)
                  i -= 1
                  continue
                }
                findSection(ch)
              }
            }
            findSection(tree)

            if (defs.size === 0) return

            let counter = 0
            const replace = (n: any) => {
              if (!n || !Array.isArray(n.children)) return
              for (let i = 0; i < n.children.length; i++) {
                const ch = n.children[i]
                if (ch.type === "element" && ch.tagName === "sup") {
                  const a = (ch.children || []).find((x: any) => isRefAnchor(x))
                  if (a) {
                    const href = String((a.properties && a.properties.href) || "")
                    const content = defs.get(href.slice(1))
                    if (content) {
                      counter += 1
                      const num = String(counter)
                      const marker: Element = {
                        type: "element",
                        tagName: "sup",
                        properties: { className: ["sidenote-ref"] },
                        children: [{ type: "text", value: num }],
                      }
                      // A footnote reference lives inside a paragraph. Keep the generated
                      // note phrasing-valid so the browser does not split that paragraph
                      // and strand the prose following the reference outside its <p>.
                      const aside: Element = {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["sidenote"], role: "note" },
                        children: [
                          {
                            type: "element",
                            tagName: "sup",
                            properties: { className: ["sidenote-num"] },
                            children: [{ type: "text", value: num }],
                          },
                          { type: "text", value: " " },
                          ...content,
                        ],
                      }
                      n.children.splice(i, 1, marker, aside)
                      i += 1
                      continue
                    }
                  }
                }
                replace(ch)
              }
            }
            replace(tree)
          }
        },
      ]
    },
  }
}
