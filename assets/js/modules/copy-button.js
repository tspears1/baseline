/**
 * CopyButton
 */
export class CopyButton {
  /** @type {HTMLButtonElement} */
  triggerElement = null

  /** @type {HTMLElement} */
  tooltipElement = null

  /** @type {String} */
  copiedContent = null

  constructor (triggerElement) {
    this.triggerElement = triggerElement
    this.tooltipElement = this.triggerElement?.querySelector('tooltip, .tooltip') ?? null
    this.copiedContent = this.triggerElement?.dataset?.copy

    this.triggerElement.addEventListener('click', this.#copyText.bind(this))
  }

  #copyText () {
    navigator.clipboard.writeText(this.copiedContent)
    if (this.tooltipElement) {
      this.#showTooltip()
    }
  }

  #showTooltip () {
    this.tooltipElement.setAttribute('active', '')
    setTimeout(() => {
      this.tooltipElement.removeAttribute('active')
    }, 1500)
  }
}
