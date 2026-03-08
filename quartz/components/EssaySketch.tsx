import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const EssaySketch: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const sketch = fileData.frontmatter?.sketch
  if (typeof sketch !== "string" || sketch.trim().length === 0) return null

  const sketchAlt =
    (typeof fileData.frontmatter?.sketchAlt === "string" && fileData.frontmatter?.sketchAlt) ||
    `Sketch for ${fileData.frontmatter?.title ?? "this page"}`

  return (
    <figure class={classNames(displayClass, "essay-sketch")}>
      <img src={sketch} alt={sketchAlt} loading="lazy" />
    </figure>
  )
}

export default (() => EssaySketch) satisfies QuartzComponentConstructor
