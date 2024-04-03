import { FOCUSABLE_SELECTOR } from '@js/modules/focusableSelector'

export class Menu {
  /** @type {string | null} */
  menuID = null

  /** @type {HTMLButtonElement | null} */
  menuButtonElement = null

  /** @type {HTMLButtonElement | null} */
  menuBackElement = null

  /** @type {HTMLButtonElement | null} */
  menuElement = null

  /**
   * @param {HTMLElement} menuButtonElement
   * @return {void}
   */
  constructor (menuButtonElement) {
    this.menuButtonElement = menuButtonElement

    this.menuID = this.menuButtonElement.dataset.menuButton
    this.menuElement = document.querySelector(`[data-menu="${this.menuID}"]`)
    this.menuBackElement = this.menuElement.querySelector(`[data-menu-back="${this.menuID}"]`)

    this.menuButtonElement.addEventListener('click', this.toggleMenu.bind(this))
    this.menuButtonElement.addEventListener('keypress', this.toggleMenu.bind(this))
    this.menuElement.addEventListener('keyup', this.handleEscapeKey.bind(this))

    if (this.menuBackElement) {
      this.menuBackElement.addEventListener('click', this.handleBackButton.bind(this))
      this.menuBackElement.addEventListener('keypress', this.handleBackButton.bind(this))
    }

    this.menuElement.menu = this
  }

  /**
   * @return {boolean}
   */
  get menuIsOpen () {
    return this.menuButtonElement.getAttribute('aria-expanded') === 'true'
  }

  /**
   * @return {HTMLElement}
   */
  get firstFocusableElement () {
    return this.menuElement.querySelector(FOCUSABLE_SELECTOR)
  }

  /**
   * @return {HTMLElement}
   */
  get lastFocusableElement () {
    return this.menuElement.querySelectorAll(FOCUSABLE_SELECTOR).at(-1)
  }

  /**
   * @return {string}
   */
  get menuActiveClass () {
    return this.menuElement.dataset.activeClass
  }

  /**
   * @param {string} value
   */
  set menuActiveClass (value) {
    this.menuElement.dataset.activeClass = value
  }

  /**
   * @param {string} value
   */
  get menuButtonActiveClass () {
    return this.menuButtonElement.dataset.activeClass
  }

  /**
   * @param {string} value
   */
  set menuButtonActiveClass (value) {
    this.menuButtonElement.dataset.activeClass = value
  }

  /**
   * @return {boolean}
   */
  get willOpenWithTransition () {
    if (!this.menuButtonElement.dataset.openWithTransition) return false

    return this.menuButtonElement.dataset.openWithTransition === 'true'
  }

  /**
   * @param {string} value
   */
  set willOpenWithTransition (value) {
    this.menuButtonElement.dataset.openWithTransition = value
  }

  /**
   * @param {KeyboardEvent | MouseEvent} event
   * @return {void}
   */
  toggleMenu (event) {
    const isKeyboardEvent = event instanceof KeyboardEvent

    if (isKeyboardEvent) {
      event.preventDefault()
    }

    if (this.menuIsOpen) {
      this.close(isKeyboardEvent)
    } else if (this.willOpenWithTransition) {
      this.openWithTransition(isKeyboardEvent)
    } else {
      this.open(isKeyboardEvent)
    }
  }

  /**
   * @param {boolean} isKeyboardEvent
   * @return {void}
   */
  close (isKeyboardEvent) {
    this.menuElement.addEventListener('transitionend', () => {
      this.menuElement.setAttribute('aria-hidden', 'true')
      this.menuElement.inert = true

      if (isKeyboardEvent) {
        this.menuButtonElement.focus()
      }
    }, { once: true })

    this.menuElement.classList.remove(this.menuActiveClass)
    this.menuButtonElement.setAttribute('aria-expanded', 'false')
    this.menuButtonElement.classList.remove(this.menuButtonActiveClass)

    document.removeEventListener('click', this.handleClickOutside.bind(this))
  }

  /**
   * @param {boolean} isKeyboardEvent
   * @return {void}
   */
  open (isKeyboardEvent) {
    this.menuElement.classList.add(this.menuActiveClass)
    this.menuElement.setAttribute('aria-hidden', 'false')
    this.menuButtonElement.setAttribute('aria-expanded', 'true')
    this.menuButtonElement.classList.add(this.menuButtonActiveClass)
    this.menuElement.inert = false

    if (isKeyboardEvent) {
      this.firstFocusableElement.focus()
    }

    document.addEventListener('click', this.handleClickOutside.bind(this))
  }

  /**
   * @param {boolean} isKeyboardEvent
   * @return {void}
   */
  openWithTransition (isKeyboardEvent) {
    requestAnimationFrame(() => {
      this.menuElement.setAttribute('aria-hidden', 'false')

      requestAnimationFrame(() => {
        this.menuElement.classList.add(this.menuActiveClass)
        this.menuButtonElement.setAttribute('aria-expanded', 'true')
        this.menuButtonElement.classList.add(this.menuButtonActiveClass)
        this.menuElement.inert = false

        if (isKeyboardEvent) {
          this.firstFocusableElement.focus()
        }

        document.addEventListener('click', this.handleClickOutside.bind(this))
      })
    })
  }

  /**
   * @param {KeyboardEvent} event
   * @return {void}
   */
  handleEscapeKey (event) {
    if (event.key === 'Escape') {
      event.stopPropagation()

      this.close(true)
    }
  }

  /**
   * @param {MouseEvent} event
   * @return {void}
   */
  handleClickOutside (event) {
    if (event.currentTarget.activeElement === this.menuButtonElement) return

    if (this.menuIsOpen && !this.menuElement.contains(event.target)) {
      this.close()
    }
  }

  /**
   * @param {KeyboardEvent | MouseEvent} event
   * @return {void}
   */
  handleBackButton (event) {
    event.preventDefault()
    event.stopPropagation()

    const isKeyboardEvent = event instanceof KeyboardEvent

    this.close(isKeyboardEvent)
  }
}
