import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import type { QuartzComponentProps } from "./quartz/components/types"

const isEssayReadingPage = (props: QuartzComponentProps) =>
  (props.fileData.frontmatter?.kind as string | undefined) === "essay" && props.fileData.slug !== "index"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.TopNav()],
  afterBody: [
    Component.ConditionalRender({
      component: Component.HomeCover(),
      condition: (props) => props.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.TopicConnections(),
      condition: (props) => props.fileData.slug?.startsWith("topics/") ?? false,
    }),
    Component.ReadNext({ limit: 3 }),
  ],
  footer: Component.Footer({
    links: {
      Garden: "/garden",
      Essays: "/garden/essays",
      Notes: "/garden/notes",
      Patterns: "/garden/patterns",
      Library: "/garden/library",
      About: "/about",
      Now: "/now",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ScholarlyMeta(),
      condition: (props) => props.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.EssaySketch(),
      condition: (props) => props.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (props) => props.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TableOfContents()),
      condition: isEssayReadingPage,
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: isEssayReadingPage,
    }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ScholarlyMeta()],
  left: [],
  right: [],
}
