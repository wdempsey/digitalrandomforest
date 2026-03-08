const setupHomeFilters = () => {
  const root = document.querySelector(".home-cover")
  if (!root) return

  const cards = Array.from(root.querySelectorAll(".writing-card")) as HTMLElement[]
  const typeButtons = Array.from(root.querySelectorAll(".filter-chip[data-type]")) as HTMLButtonElement[]
  const stageButtons = Array.from(root.querySelectorAll(".filter-chip[data-stage]")) as HTMLButtonElement[]

  let activeType = "all"
  let activeStage = "all"

  const applyFilters = () => {
    for (const card of cards) {
      const cardType = card.dataset.type ?? "note"
      const cardStage = card.dataset.stage ?? "seed"
      const typeOk = activeType === "all" || cardType === activeType
      const stageOk = activeStage === "all" || cardStage === activeStage
      card.style.display = typeOk && stageOk ? "" : "none"
    }
  }

  for (const button of typeButtons) {
    button.addEventListener("click", () => {
      activeType = button.dataset.type ?? "all"
      typeButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button))
      applyFilters()
    })
  }

  for (const button of stageButtons) {
    button.addEventListener("click", () => {
      activeStage = button.dataset.stage ?? "all"
      stageButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button))
      applyFilters()
    })
  }
}

document.addEventListener("nav", setupHomeFilters)
