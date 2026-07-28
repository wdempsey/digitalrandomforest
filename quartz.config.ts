import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Digital Random Forest",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "digitalrandomforest",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Source Serif 4",
        body: "Newsreader",
        code: "IBM Plex Mono",
      },
      colors: {
        // "Letterpress" — kept in sync with the :root tokens in
        // quartz/styles/custom.scss. Change both together.
        lightMode: {
          light: "#f7f4ed",
          lightgray: "#e4ddd0",
          gray: "#8f8577",
          darkgray: "#665c52",
          dark: "#211d1a",
          secondary: "#8c3a2b",
          tertiary: "#a9634f",
          highlight: "#efe9dc",
          textHighlight: "#e7cfc088",
        },
        darkMode: {
          light: "#1a1714",
          lightgray: "#38322b",
          gray: "#8f8577",
          darkgray: "#cbbdaa",
          dark: "#f2ece1",
          secondary: "#e0917a",
          tertiary: "#b06f5a",
          highlight: "rgba(224, 145, 122, 0.14)",
          textHighlight: "#7a453688",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Figures(),
      Plugin.Sidenotes(),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
