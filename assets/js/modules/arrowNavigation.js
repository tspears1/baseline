import { FOCUSABLE_SELECTOR } from '@js/modules/focusableSelector'

export class ArrowNavigation {
  /** @type {HTMLElement | null} */
  element = null

  /**
   * @param {HTMLElement} element
   */
  constructor (element) {
    this.element = element

    this.element.addEventListener('keydown', this.delegateKeyboardEvent.bind(this))

    this.element.arrowNavigation = this
  }

  /**
   * @return {HTMLElement[]}
   */
  get focusableElements () {
    return [...this.element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(element => {
      const parentElement = element.closest('[data-arrow-navigation]')

      return parentElement === this.element
    })
  }

  /**
   * @return {HTMLElement | null}
   */
  get currentFocusedElement () {
    return document.activeElement
  }

  /**
   * @param {KeyboardEvent} event
   * @return {void}
   */
  delegateKeyboardEvent (event) {
    event.stopPropagation()

    const currentFocusedRect = this.currentFocusedElement.getBoundingClientRect()

    let closestElement = null
    let closestDistance = Infinity

    this.focusableElements.forEach(focusableElement => {
      const rect = focusableElement.getBoundingClientRect()
      const distance = this.getDistance(currentFocusedRect, rect, event.key)

      if (distance < closestDistance) {
        closestDistance = distance
        closestElement = focusableElement
      }
    })

    if (closestElement) {
      event.preventDefault()

      closestElement.focus()
    }
  }

  /**
   * @param {DOMRect} rectA
   * @param {DOMRect} rectB
   * @param {'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'} direction
   * @return {void}
   */
  getDistance (rectA, rectB, direction) {
    switch (direction) {
      case 'ArrowUp':
        if (rectB.bottom <= rectA.top) {
          return this.directionUpCalulation(rectA, rectB)
        }

        break
      case 'ArrowRight':
        if (rectB.left >= rectA.right) {
          return this.directionRightCalculation(rectA, rectB)
        }

        break
      case 'ArrowDown':
        if (rectB.top >= rectA.bottom) {
          return this.directionDownCalculation(rectA, rectB)
        }

        break
      case 'ArrowLeft':
        if (rectB.right <= rectA.left) {
          return this.directionLeftCalculation(rectA, rectB)
        }

        break
      default:
        return Infinity
    }

    return Infinity
  }

  /**
   * @param {DOMRect} rectA
   * @param {DOMRect} rectB
   * @return {number}
   */
  directionUpCalulation (rectA, rectB) {
    return Math.hypot((rectA.left + rectA.right) / 2 - (rectB.left + rectB.right) / 2, rectA.top - rectB.bottom)
  }

  /**
   * @param {DOMRect} rectA
   * @param {DOMRect} rectB
   * @return {number}
   */
  directionRightCalculation (rectA, rectB) {
    return Math.hypot(rectB.left - rectA.right, (rectA.top + rectA.bottom) / 2 - (rectB.top + rectB.bottom) / 2)
  }

  /**
   * @param {DOMRect} rectA
   * @param {DOMRect} rectB
   * @return {number}
   */
  directionDownCalculation (rectA, rectB) {
    return Math.hypot((rectA.left + rectA.right) / 2 - (rectB.left + rectB.right) / 2, rectB.top - rectA.bottom)
  }

  /**
   * @param {DOMRect} rectA
   * @param {DOMRect} rectB
   * @return {number}
   */
  directionLeftCalculation (rectA, rectB) {
    return Math.hypot(rectA.left - rectB.right, (rectA.top + rectA.bottom) / 2 - (rectB.top + rectB.bottom) / 2)
  }
}
