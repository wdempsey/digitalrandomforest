const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.add("in-view"))
      } else {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.remove("in-view"))
      }
    }
  }
})

function toggleToc(this: HTMLElement) {
  setTocCollapsed(this, !this.classList.contains("collapsed"))
}

function setTocCollapsed(button: HTMLElement, collapsed: boolean) {
  button.classList.toggle("collapsed", collapsed)
  button.setAttribute("aria-expanded", collapsed ? "false" : "true")
  const content = button.nextElementSibling as HTMLElement | null
  if (!content) return
  content.classList.toggle("collapsed", collapsed)
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector<HTMLElement>(".toc-header")
    const content = toc.querySelector<HTMLElement>(".toc-content")
    if (!button || !content) return

    let manuallyToggled = false
    const onClick = () => {
      manuallyToggled = true
      toggleToc.call(button)
    }
    const onScroll = () => {
      if (window.scrollY < 80) manuallyToggled = false
      if (!manuallyToggled) setTocCollapsed(button, window.scrollY > 420)
    }

    button.addEventListener("click", onClick)
    document.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    window.addCleanup(() => {
      button.removeEventListener("click", onClick)
      document.removeEventListener("scroll", onScroll)
    })
  }
}

document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
