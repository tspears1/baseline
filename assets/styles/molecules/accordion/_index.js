export class Accordion {
  /** @type {HTMLDetailsElement | null} */
  detailsElement = null

  /** @type {HTMLDivElement | null} */
  contentElement = null

  /** @type {string | null} */
  groupId = null

  /** @type {HTMLElement | null} */
  summaryElement = null

  /**
   * @param {HTMLDetailsElement} detailsElement
   */
  constructor (detailsElement) {
    this.detailsElement = detailsElement
    this.summaryElement = detailsElement.querySelector('[data-accordion-summary]')
    this.contentElement = detailsElement.querySelector('[data-accordion-content]')

    if ('accordionGroup' in detailsElement.dataset) {
      this.groupId = detailsElement.dataset.accordionGroup
    }

    this.detailsElement.accordion = this

    this.summaryElement.addEventListener('click', this.accordionInit.bind(this))
  }

  /**
   * For determining if other accordions need to be collapsed
   *
   * @return {boolean}
   */
  get isPartOfGroup () {
    return this.groupId !== null
  }

  /**
   * For animation calculations
   *
   * @return {string}
   */
  get targetHeight () {
    const height = this.contentElement.offsetHeight + this.summaryElement.offsetHeight
    return `${height}px`
  }

  /**
   * For animation calculations
   *
   * @return {string}
   */
  get closedHeight () {
    return `${this.summaryElement.offsetHeight}px`
  }

  /**
   * Initialize accordion on interaction
   *
   * @param {MouseEvent | KeyboardEvent} event
   * @return {void}
   */
  accordionInit (event) {
    event.preventDefault()

    this.toggle()
  }

  /**
   * Public method to toggle accordion open or closed
   *
   * @return {void}
   */
  toggle () {
    if (this.detailsElement.open) {
      this.close()
    } else {
      if (this.isPartOfGroup) {
        this.closeGroup()
      }

      this.open()
    }
  }

  /**
   * Public method to close accordion
   *
   * @return {void}
   */
  close () {
    this.detailsElement.addEventListener('transitionend', () => {
      this.detailsElement.removeAttribute('style')
    }, { once: true })

    this.detailsElement.style.setProperty('--accordion-target-height', this.closedHeight)

    this.detailsElement.removeAttribute('data-accordion-open')
    this.detailsElement.setAttribute('aria-expanded', false)
    this.detailsElement.open = false
  }

  /**
   * Public method to open accordion
   *
   * @return {void}
   */
  open () {
    this.detailsElement.style.setProperty('--accordion-target-height', this.closedHeight)

    this.detailsElement.setAttribute('data-accordion-open', null)
    this.detailsElement.setAttribute('aria-expanded', true)

    requestAnimationFrame(() => {
      this.detailsElement.open = true
      this.detailsElement.style.setProperty('--accordion-target-height', this.targetHeight)
    })
  }

  /**
   * If accordion is part of a group, close all other accordions in the group
   *
   * @return {void}
   */
  closeGroup () {
    const accordionGroupElements = [...document.querySelectorAll(`[data-accordion-group="${this.groupId}"]`)]
      .filter(el => el !== this.detailsElement)

    accordionGroupElements.forEach(el => {
      el.accordion.close()
    })
  }
}
