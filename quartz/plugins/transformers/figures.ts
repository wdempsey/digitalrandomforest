import { QuartzTransformerPlugin } from "../types"
import { Root as HtmlRoot, Element, ElementContent } from "hast"
import { visit, SKIP } from "unist-util-visit"

/**
 * Figures
 *
 * Turns plain Markdown image/link paragraphs into a consistent, captioned
 * figure system — no special syntax beyond standard Markdown.
 *
 * Authoring conventions:
 *
 *   Single captioned figure (caption = the Markdown image "title"):
 *     ![alt text](/assets/foo.png "A visible caption")
 *
 *   Image sequence / gallery (put images on consecutive lines, NO blank
 *   line between them — they share one paragraph and become a gallery):
 *     ![first](/a.png "Step one")
 *     ![second](/b.png "Step two")
 *     ![third](/c.png "Step three")
 *
 *   Inline video (a link, on its own line, to a video file or YouTube):
 *     [Demo](https://youtu.be/dQw4w9WgXcQ)
 *     [Clip](/assets/clip.mp4 "Optional caption")
 *
 * A paragraph is only transformed when its meaningful content is *only*
 * images (or a single embed link); mixed text+image paragraphs are left
 * untouched, so inline icons keep working.
 */

const VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)$/i
const YOUTUBE =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i

type HastChild = ElementContent

function isWhitespaceText(node: HastChild): boolean {
  return node.type === "text" && node.value.trim() === ""
}

function isBreak(node: HastChild): boolean {
  return node.type === "element" && node.tagName === "br"
}

function meaningfulChildren(p: Element): Element[] {
  // Ignore whitespace text nodes and <br>; keep real elements.
  return p.children.filter(
    (c): c is Element =>
      c.type === "element" && !isBreak(c) && !isWhitespaceText(c),
  )
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined
}

function text(value: string): HastChild {
  return { type: "text", value }
}

function figcaption(caption?: string): Element[] {
  if (!caption) return []
  return [
    {
      type: "element",
      tagName: "figcaption",
      properties: {},
      children: [text(caption)],
    },
  ]
}

function prepImg(img: Element): Element {
  const props = img.properties ?? (img.properties = {})
  if (props.loading === undefined) props.loading = "lazy"
  if (props.decoding === undefined) props.decoding = "async"
  // The Markdown "title" becomes the caption, not a hover tooltip.
  delete (props as Record<string, unknown>).title
  return img
}

function captionFor(img: Element): string | undefined {
  return asString(img.properties?.title)
}

function youtubeFrame(id: string, title?: string): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["video-frame"] },
    children: [
      {
        type: "element",
        tagName: "iframe",
        properties: {
          src: `https://www.youtube-nocookie.com/embed/${id}`,
          title: title ?? "Embedded video",
          loading: "lazy",
          frameborder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowfullscreen: true,
        },
        children: [],
      },
    ],
  }
}

function videoElement(src: string): Element {
  return {
    type: "element",
    tagName: "video",
    properties: { controls: true, preload: "metadata", playsinline: true },
    children: [
      {
        type: "element",
        tagName: "source",
        properties: { src },
        children: [],
      },
    ],
  }
}

function makeFigure(className: string[], body: Element[], caption?: string): Element {
  return {
    type: "element",
    tagName: "figure",
    properties: { className },
    children: [...body, ...figcaption(caption)],
  }
}

export const Figures: QuartzTransformerPlugin = () => {
  return {
    name: "Figures",
    htmlPlugins() {
      return [
        () => {
          return (tree: HtmlRoot) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName !== "p") return

              const kids = meaningfulChildren(node)
              if (kids.length === 0) return

              const allImages = kids.every((c) => c.tagName === "img")

              // --- Image-only paragraphs -> figure or gallery ---
              if (allImages) {
                if (kids.length === 1) {
                  const img = prepImg(kids[0])
                  const caption = captionFor(kids[0])
                  Object.assign(node, makeFigure(["figure"], [img], caption))
                  return SKIP
                }

                // Multiple images -> sequence / gallery.
                const items: Element[] = kids.map((raw) => {
                  const caption = captionFor(raw)
                  const img = prepImg(raw)
                  return makeFigure(["gallery-item"], [img], caption)
                })
                Object.assign(node, {
                  type: "element",
                  tagName: "figure",
                  properties: {
                    className: ["figure-gallery"],
                    "data-count": String(items.length),
                  },
                  children: items,
                } as Element)
                return SKIP
              }

              // --- Single embed link -> video / YouTube ---
              if (kids.length === 1 && kids[0].tagName === "a") {
                const a = kids[0]
                const href = asString(a.properties?.href)
                if (!href) return

                const linkText = a.children
                  .filter((c): c is { type: "text"; value: string } => c.type === "text")
                  .map((c) => c.value)
                  .join("")
                  .trim()
                const caption =
                  linkText && linkText !== href ? linkText : undefined

                const yt = href.match(YOUTUBE)
                if (yt) {
                  Object.assign(
                    node,
                    makeFigure(["figure", "video-embed"], [youtubeFrame(yt[1], caption)], caption),
                  )
                  return SKIP
                }

                if (VIDEO_EXT.test(href)) {
                  Object.assign(
                    node,
                    makeFigure(["figure", "video-file"], [videoElement(href)], caption),
                  )
                  return SKIP
                }
              }

              return
            })
          }
        },
      ]
    },
  }
}
