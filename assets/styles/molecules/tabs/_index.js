export class Tabs {
  /** @type {HTMLDivElement | null} */
  tabsElement = null

  /** @type {'horizontal' | 'vertical'} */
  initialDirection = 'horizontal'

  /** @type {ResizeObserver | null} */
  resizeObserver = null

  /**
   * @param {HTMLDivElement} tabsElement
   */
  constructor (tabsElement) {
    this.tabsElement = tabsElement

    this.tabsElement.tabs = this

    this.initialDirection = this.tabDirection
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this))
    this.resizeObserver.observe(this.tabsElement)

    this.tabButtons.forEach(tabButton => tabButton.addEventListener('click', this.handleClick.bind(this)))
    this.tabButtons.forEach(tabButton => tabButton.addEventListener('keydown', this.handleKeydown.bind(this)))

    if (this.hashTracking) {
      this.hashTracking = true
      this.setInitialTabByHash()
    }
  }

  /**
   * Tabs ID
   *
   * @return {string | undefined}
   */
  get tabsId () {
    if (!('tabs' in this.tabsElement.dataset)) {
      throw new Error('No tabs ID found on tabs element, make sure you have a data-tabs attribute on the tabs element.')
    }

    return this.tabsElement.dataset.tabs
  }

  /**
   * Get defined tab direction
   *
   * @return {'horizontal' | 'vertical'}
   */
  get tabDirection () {
    return this.tabsElement.dataset.tabsDirection || 'horizontal'
  }

  /**
   * Set defined tab direction
   *
   * @param {'horizontal' | 'vertical'} direction
   * @return {void}
   */
  set tabDirection (direction) {
    this.tabsElement.dataset.tabsDirection = direction
  }

  /**
   * Tab Buttons
   *
   * @return {HTMLButtonElement[]}
   */
  get tabButtons () {
    return [...this.tabsElement.querySelectorAll('[aria-controls]')].filter(this.elementScopedForInstance.bind(this))
  }

  /**
   * Tab Panels
   *
   * @return {HTMLElement[]}
   */
  get tabPanels () {
    return [...this.tabsElement.querySelectorAll('[role="tabpanel"]')].filter(this.elementScopedForInstance.bind(this))
  }

  /**
   * First Tab Button
   *
   * @return {HTMLButtonElement}
   */
  get firstTabButton () {
    return this.tabButtons.at(0)
  }

  /**
   * Last Tab Button
   *
   * @return {HTMLButtonElement}
   */
  get lastTabButton () {
    return this.tabButtons.at(-1)
  }

  /**
   * Get whether hash should be tracked
   *
   * @return {boolean}
   */
  get hashTracking () {
    return 'trackHash' in this.tabsElement.dataset
  }

  /**
   * Gets the tab panel associated with the tab button
   *
   * @param {HTMLButtonElement} tabButton
   * @return  {HTMLDivElement | undefined}
   */
  getAssociatedTabPanel (tabButton) {
    const panelId = tabButton.getAttribute('aria-controls')
    const associatedPanel = this.tabPanels.find(tabPanel => tabPanel.id === panelId)

    if (associatedPanel === undefined) {
      throw new Error(`No associated tab panel found for tab button: ${tabButton}`)
    }

    return associatedPanel
  }

  /**
   * @param {MouseEvent} event
   * @return {void}
   */
  handleClick ({ currentTarget }) {
    const tabPanel = this.getAssociatedTabPanel(currentTarget)

    this.setActiveTab(currentTarget, tabPanel)
  }

  /**
   * @param {KeyboardEvent} event
   * @return {void}
   */
  handleKeydown ({ currentTarget, key }) {
    const arrowNextDirection = this.tabDirection === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
    const arrowPreviousDirection = this.tabDirection === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

    switch (key) {
      case arrowNextDirection:
        this.handleNextTab(currentTarget)
        break
      case arrowPreviousDirection:
        this.handlePreviousTab(currentTarget)
        break
      case 'Home':
        this.handleHome()
        break
      case 'End':
        this.handleEnd()
        break
      default:
        break
    }
  }

  /**
   * Sets the active tab button and tab panel
   *
   * @param {HTMLButtonElement} tabButton
   * @param {HTMLDivElement} tabPanel
   * @return {void}
   */
  setActiveTab (tabButton, tabPanel) {
    this.tabButtons.forEach(tabButton => {
      tabButton.setAttribute('aria-selected', 'false')
      tabButton.setAttribute('tabindex', -1)
    })
    this.tabPanels.forEach(tabPanel => { tabPanel.dataset.activeTab = 'false' })

    tabButton.focus()
    tabButton.setAttribute('tabindex', 0)
    tabButton.setAttribute('aria-selected', 'true')

    tabPanel.dataset.activeTab = 'true'

    if (this.hashTracking) {
      this.updateHash(tabButton)
    }
  }

  /**
   * Handle Next Tab
   *
   * @param {HTMLButtonElement} tabButton
   * @return {void}
   */
  handleNextTab (tabButton) {
    if (tabButton === this.lastTabButton) {
      const firstTabPanel = this.getAssociatedTabPanel(this.firstTabButton)
      this.setActiveTab(this.firstTabButton, firstTabPanel)

      return
    }

    const tabButtonIndex = this.tabButtons.indexOf(tabButton)
    const nextTabButton = this.tabButtons[tabButtonIndex + 1]
    const nextTabPanel = this.getAssociatedTabPanel(nextTabButton)

    this.setActiveTab(nextTabButton, nextTabPanel)
  }

  /**
   * Handle Previous Tab
   *
   * @param {HTMLButtonElement} tabButton
   * @return {void}
   */
  handlePreviousTab (tabButton) {
    if (tabButton === this.firstTabButton) {
      const lastTabPanel = this.getAssociatedTabPanel(this.lastTabButton)
      this.setActiveTab(this.lastTabButton, lastTabPanel)

      return
    }

    const tabButtonIndex = this.tabButtons.indexOf(tabButton)
    const previousTabButton = this.tabButtons[tabButtonIndex - 1]
    const previousTabPanel = this.getAssociatedTabPanel(previousTabButton)

    this.setActiveTab(previousTabButton, previousTabPanel)
  }

  /**
   * Handle home key
   *
   * @return {void}
   */
  handleHome () {
    const firstTabPanel = this.getAssociatedTabPanel(this.firstTabButton)
    this.setActiveTab(this.firstTabButton, firstTabPanel)
  }

  /**
   * Handle end key
   *
   * @return {void}
   */
  handleEnd () {
    const lastTabPanel = this.getAssociatedTabPanel(this.lastTabButton)
    this.setActiveTab(this.lastTabButton, lastTabPanel)
  }

  /**
   * Set active tab by hash
   *
   * @return {void}
   */
  setInitialTabByHash () {
    const hash = window.location.hash.slice(1)
    const tabButton = this.tabButtons.find(tabButton => tabButton.id === hash)

    if (tabButton === undefined) {
      return
    }

    const tabPanel = this.getAssociatedTabPanel(tabButton)

    this.setActiveTab(tabButton, tabPanel)
  }

  /**
   * Update hash
   *
   * @param {HTMLButtonElement} tabButton
   * @return {void}
   */
  updateHash (tabButton) {
    const hashID = tabButton.id
    window.location.hash = hashID
  }

  /**
   * Handle resize
   *
   * @param {ResizeObserverEntry[]} entries
   * @return {void}
   */
  handleResize ([observerEntry]) {
    const { width } = observerEntry.contentRect

    if (width < 1024 && this.initialDirection !== 'horizontal') {
      this.tabDirection = 'horizontal'

      return
    }

    if (width >= 1024 && this.initialDirection === 'vertical') {
      this.tabDirection = this.initialDirection
    }
  }

  /**
   * Check if scoped for Instance
   *
   * @param {HTMLElement} element
   * @return {boolean}
   */
  elementScopedForInstance (element) {
    const instanceParent = element.closest('[data-tabs]')

    return instanceParent === this.tabsElement
  }
}
