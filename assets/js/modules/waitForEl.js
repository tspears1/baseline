/**
 * @typedef {function} waitForEl
 * @description Waits for an element to exist in the DOM
 * @param {string} selector - The selector to wait for
 * @returns {Promise} - A promise that resolves when the element exists in the DOM
 * @example waitForEl('.my-element').then(() => console.log('Element found!'))
*/
const waitForEl = (selector) => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}

export { waitForEl }
