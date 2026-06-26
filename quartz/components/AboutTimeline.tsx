import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const AboutTimeline: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "about") return null

  return (
    <section class="about-timeline" aria-labelledby="ideas-timeline-title">
      <h2 id="ideas-timeline-title">Career / Ideas Timeline</h2>
      <ol class="timeline-main">
        <li class="timeline-step">
          <span class="timeline-node">Statistics</span>
        </li>
        <li class="timeline-step">
          <span class="timeline-node">Data Science Practice</span>
        </li>
        <li class="timeline-step">
          <span class="timeline-node">Reproducible Research Systems</span>
        </li>
        <li class="timeline-step has-branch">
          <span class="timeline-node">AI-assisted Workflows</span>
          <ul class="timeline-branch">
            <li>
              <span class="timeline-node branch-node">Digital Random Forest (this site)</span>
            </li>
          </ul>
        </li>
        <li class="timeline-step">
          <span class="timeline-node">CodexBatman</span>
        </li>
      </ol>
    </section>
  )
}

AboutTimeline.css = `
.about-timeline {
  margin: 0.8rem 0 2.4rem;
  padding: 1rem 0 0.6rem;
}

.about-timeline h2 {
  margin: 0 0 1.1rem;
  font-size: 1rem;
  font-family: var(--bodyFont);
  font-weight: 500;
  color: var(--text-secondary, var(--darkgray));
}

.about-timeline .timeline-main {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.about-timeline .timeline-step {
  position: relative;
  flex: 1 1 0;
}

.about-timeline .timeline-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 1.1rem;
  left: calc(100% - 0.15rem);
  width: 1.3rem;
  height: 1px;
  background: rgba(47, 42, 38, 0.2);
}

.about-timeline .timeline-node {
  display: block;
  border: 1px solid rgba(47, 42, 38, 0.06);
  border-radius: 10px;
  background: #fdfbf7;
  padding: 0.6rem 0.75rem;
  font-size: 0.86rem;
  line-height: 1.35;
  color: var(--text-primary, var(--dark));
}

.about-timeline .timeline-branch {
  list-style: none;
  margin: 0;
  padding: 1.3rem 0 0 0;
  position: absolute;
  left: 0;
  right: 0;
}

.about-timeline .timeline-branch::before {
  content: "";
  position: absolute;
  top: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 1rem;
  background: rgba(47, 42, 38, 0.2);
}

.about-timeline .branch-node {
  text-align: center;
}

@media (max-width: 900px) {
  .about-timeline .timeline-main {
    flex-direction: column;
    gap: 0.65rem;
  }

  .about-timeline .timeline-step:not(:last-child)::after {
    top: calc(100% + 0.32rem);
    left: 50%;
    width: 1px;
    height: 0.35rem;
    transform: translateX(-50%);
  }

  .about-timeline .timeline-branch {
    position: static;
    padding-top: 0.65rem;
  }

  .about-timeline .timeline-branch::before {
    display: none;
  }
}
`

export default (() => AboutTimeline) satisfies QuartzComponentConstructor
