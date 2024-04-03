const useAccordionCache = (el) => {
  // group id is based on the page url slug + [name] attribute (or data-accordion-group) of the accordion group
  const accordions = el.querySelectorAll('details')
  const groupId = `${window.location.pathname}-${accordions[0].getAttribute('name') ?? accordions[0]?.dataset?.accordionGroup ?? 'default'}`

  const accordionCache = JSON.parse(localStorage.getItem('accordionCache'))
  if (!accordionCache) {
    localStorage.setItem('accordionCache', JSON.stringify({
      [groupId]: []
    }))
  }

  // add event listener to each accordion to update localStorage when opened or closed
  accordions.forEach((accordion, index) => {
    accordion.addEventListener('toggle', () => {
      if (accordion.open) {
        if (accordionCache[groupId].includes(index)) { return }
        accordionCache[groupId] = [...accordionCache[groupId], index]
      } else {
        accordionCache[groupId] = accordionCache[groupId].filter(i => i !== index)
      }

      localStorage.setItem('accordionCache', JSON.stringify(accordionCache))
    })
  })

  // open any accordions that were open on the previous page load
  if (accordionCache && accordionCache[groupId]) {
    accordionCache[groupId].forEach(index => {
      accordions[index].open = true
    })
  }
}

export { useAccordionCache }
