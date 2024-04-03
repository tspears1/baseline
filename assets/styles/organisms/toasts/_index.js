/**
 * @typedef {object} options
 * @property {boolean} autohide - If true, toast will hide after delay. If false, toast will not hide.
 * @property {number} delay - Time in milliseconds before toast hides.
 * @property {['light', 'dark']} theme - Theme of toast.
 * @property {['start-start', 'start-center', 'start-end', 'center-start', 'center-center', 'center-end', 'end-start', 'end-center', 'end-end']} position - Position of toast stack.
 * @property {boolean} closable - If true, toast will have close button.
 * @property {[boolean, string]} icon - If true, toast will have icon. If string, toast will have icon with string as icon name.
 */

/**
 * @function createToast
 * @param {[string, HTMLElement]} message
 * @param {['success', 'info', 'warning', 'error']} status
 * @param {options} options
 */
const createToast = (message, status = '', options = {}) => {
  // Setup.
  let container, stack, timeout

  const toast = document.createElement('output')

  const statusIcons = {
    success: 'icon-success-square',
    info: 'icon-info-square',
    warning: 'icon-warning-square',
    error: 'icon-error-square'
  }

  const defaults = {
    autohide: true,
    delay: 5000,
    theme: 'light',
    position: 'start-end',
    closable: true,
    icon: true
  }

  // Merge defaults with user options
  const { autohide, delay, theme, position, closable, icon } = { ...defaults, ...options }

  /**
     * @function removeToast
     * @description Removes toast from DOM after animation.
     */
  const removeToast = () => {
    toast.animate({ opacity: [1, 0] }, { duration: 150, easing: 'ease-out' }).onfinish = () => {
      toast.remove()
      if (stack.children.length === 0) stack.remove()
    }
  }

  // Build Toast Container
  container = document.querySelector('.toasts')
  if (!container) {
    container = document.createElement('div')
    container.classList.add('toasts')
    document.body.appendChild(container)
  }

  // Build Toast Stack
  stack = container.querySelector(`.toasts__stack[stack-position="${position}"]`)
  if (!stack) {
    stack = document.createElement('div')
    stack.classList.add('toasts__stack')
    stack.setAttribute('stack-position', position)
    container.appendChild(stack)
  }

  // Build Toast
  toast.classList.add('message', 'toast')
  toast.setAttribute('message-theme', theme)
  if (status) toast.setAttribute('message-status', status)
  if (autohide) toast.setAttribute('message-autohide', '')

  const content = document.createElement('div')
  content.classList.add('message__content')
  const grid = document.createElement('div')
  grid.classList.add('message__grid')

  // Add icon to toast (optional).
  if (icon) {
    const iconElement = document.createElement('div')
    iconElement.classList.add('message__icon')
    const svg = typeof icon === 'string' ? icon : statusIcons[status] ?? 'icon-info-square'
    iconElement.innerHTML = `
            <svg class="icon" aria-hidden="true" role="presentation">
                <use href="#${svg}" />
            </svg>
        `
    content.appendChild(iconElement)
  }

  const text = document.createElement('div')
  text.classList.add('message__text')
  text.innerHTML = message
  content.appendChild(text)

  grid.appendChild(content)
  toast.appendChild(grid)

  // Add close button to toast (optional).
  if (closable) {
    const actions = document.createElement('div')
    actions.classList.add('message__actions')

    const trigger = document.createElement('button')
    trigger.classList.add('message__trigger')
    trigger.innerHTML = `
            <span class="sr-only">Close message</span>
            <svg class="icon icon--close" aria-hidden="true" role="presentation">
                <use href="#icon-close" />
            </svg>
        `
    trigger.addEventListener('click', () => {
      removeToast()
      clearTimeout(timeout)
    })
    actions.appendChild(trigger)
    grid.appendChild(actions)
  }

  /**
     * @function flipToast
     * @description Animates container as toast enters.
     */
  const flipToast = () => {
    const first = stack.offsetHeight
    stack.appendChild(toast)
    const last = stack.offsetHeight
    const invert = last - first
    toast.animate({ transform: [`translateY(${invert}px)`, 'translateY(0)'] }, { duration: 150, easing: 'ease-out' })
  }

  // Add toast to DOM
  flipToast()
  toast.animate({ opacity: [0, 1] }, { duration: 150, easing: 'ease-in' })

  // Remove toast if stack is too long
  if (stack.children.length > 5) stack.children[0].remove()

  // Autohide toast
  if (autohide) {
    timeout = setTimeout(() => {
      removeToast()
    }, delay)
    toast.addEventListener('mouseenter', () => {
      clearTimeout(timeout)
    })
    toast.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        removeToast()
      }, delay)
    })
  }
}

/**
 *
 * @function createToastTrigger
 * @description Creates toast from button click based on attributes.
 * @param {HTMLButtonElement} el
 */
const createToastTrigger = (el) => {
  const message = el.getAttribute('toast-trigger')
  const status = el.getAttribute('toast-status')
  const options = el.getAttribute('toast-options')
  el.addEventListener('click', () => {
    createToast(message, status, JSON.parse(options))
  })
}

export { createToast, createToastTrigger }
