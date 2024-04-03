/**
 * @module has-polyfill
 * @description polyfill for css :has selector
 * @function cssHasPolyfill
 * @param {[string, HTMLElement]} [root=document] - provide selector string or HTMLElement to scope querySelectorAll
 * @param {string} [prefix="has--"] - prefix for class name
 * @property {string} [data-css-has] - selector name for child element
 *
 * @example .parent:has(.child) { ... }
 * <div class="parent" data-css-has="child">
 * which creates `.has--child` class on .parent
 *
 */

const cssHasPolyfill = (root = document, prefix = 'has--') => {
  if (!CSS.supports('selector(:has(*))')) {
    const rootEl = typeof root === 'string' ? document.querySelector(root) : root
    rootEl.querySelectorAll('[data-css-has]').forEach((el) => {
      const selector = el.dataset.cssHas
      if (selector) {
        const hasChild = el.querySelector(`.${selector}`)
        hasChild && !el.classList.contains(prefix + selector) && el.classList.add(prefix + selector)
      }
    })
  }
}

/**
 * @module has-polyfill
 * @description polyfill for css :has(input:checked) selector
 * @function cssHasInputCheckedPolyfill
 * @param {[string, HTMLElement]} [root=document] - provide selector string or HTMLElement to scope querySelectorAll
 * @param {string} [prefix="has--"] - prefix for class name
 * @param {string} [suffix="-checked"] - suffix for class name
 * @property {string} [data-css-has-input-checked] - selector name for child element
 * @example .parent:has(input:checked) { ... }
 * <div class="parent" data-css-has-input-checked>
 * which creates `.has--input-checked` class on .parent
*/

const cssHasInputCheckedPolyfill = (root = document, prefix = 'has--', suffix = '-checked') => {
  if (!CSS.supports('selector(:has(*))')) {
    const rootEl = typeof root === 'string' ? document.querySelector(root) : root
    rootEl.querySelectorAll('[data-css-has-input-checked]').forEach((el) => {
      const inputSelector = el.dataset.cssHasInputChecked || 'input'
      const inputs = el.querySelectorAll(inputSelector)
      if (!inputs.length) return

      // add "has--input" class to parent
      el.classList.add(`${prefix}${inputSelector}`)

      inputs.forEach((input) => {
        // add "has--input-checked" class to parent if input is checked on load
        if (input.checked) {
          el.classList.add(`${prefix}${inputSelector}${suffix}`)
        }
        // add "has--input-checked" class to parent on input change
        input.addEventListener('change', (e) => {
          e.target.checked
            ? el.classList.add(`${prefix}${inputSelector}${suffix}`)
            : el.classList.remove(`${prefix}${inputSelector}${suffix}`)
        })
      })
    })
  }
}
export { cssHasPolyfill, cssHasInputCheckedPolyfill }
