import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"

const gardenLinks = [
  { label: "Garden", href: "garden" },
  { label: "Essays", href: "garden/essays" },
  { label: "Notes", href: "garden/notes" },
  { label: "Library", href: "garden/library" },
  { label: "Topics", href: "topics" },
]
const headerLogoPath = "/assets/branding/drf-tree.svg"

const TopNav: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)

  return (
    <nav class={classNames(displayClass, "top-nav")} aria-label="Primary">
      <a class="top-nav-logo internal" href={root} aria-label={cfg.pageTitle}>
        <img src={headerLogoPath} alt="Digital Random Forest" class="top-nav-logo-icon" />
      </a>
      <ul>
        <li class="nav-dropdown-wrap">
          <details class="nav-dropdown">
            <summary>Garden</summary>
            <ul class="nav-dropdown-menu">
              {gardenLinks.map((link) => (
                <li>
                  <a href={joinSegments(root, link.href)} class="internal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <a href={joinSegments(root, "now")} class="internal">
            Now
          </a>
        </li>
        <li>
          <a href={joinSegments(root, "about")} class="internal">
            About
          </a>
        </li>
      </ul>
    </nav>
  )
}

TopNav.css = `
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.top-nav .top-nav-logo {
  display: inline-flex;
  align-items: center;
  color: color-mix(in srgb, var(--darkgray) 90%, var(--accent) 10%);
  text-decoration: none;
  opacity: 0.96;
}

.top-nav .top-nav-logo-icon {
  display: block;
  height: 36px;
  width: auto;
  max-height: 36px;
  filter: saturate(0.92) contrast(0.94);
}

.top-nav ul {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem 0.9rem;
  width: 100%;
}

.top-nav a {
  letter-spacing: 0.01em;
  font-size: 0.76rem;
  color: color-mix(in srgb, var(--darkgray) 86%, transparent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 0.1rem;
}

.top-nav a:hover {
  color: var(--dark);
  border-bottom-color: var(--tertiary);
}

.top-nav .nav-dropdown {
  position: relative;
}

.top-nav .nav-dropdown > summary {
  list-style: none;
  cursor: pointer;
  color: color-mix(in srgb, var(--darkgray) 86%, transparent);
  font-size: 0.76rem;
}

.top-nav .nav-dropdown > summary::-webkit-details-marker {
  display: none;
}

.top-nav .nav-dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.4rem);
  min-width: 9rem;
  display: grid;
  gap: 0.25rem;
  padding: 0.5rem;
  background: rgba(249, 243, 235, 0.95);
  border: 1px solid rgba(60, 55, 50, 0.1);
  border-radius: 10px;
  box-shadow: 0 8px 22px rgba(30, 24, 20, 0.08);
}

.top-nav .nav-dropdown-menu a {
  display: block;
  padding: 0.2rem 0.28rem;
  border-radius: 6px;
}

@media (max-width: 900px) {
  .top-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .top-nav ul {
    justify-content: flex-start;
  }
}
`

export default (() => TopNav) satisfies QuartzComponentConstructor
