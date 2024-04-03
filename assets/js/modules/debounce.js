/**
 * @typedef {function} debounce
 * @description Debounces a function
 * @param {function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {function} - The debounced function
 * @example const debouncedFunction = debounce(() => console.log('Hello, World!'), 1000)
 */
const debounce = (func, delay) => {
  let inDebounce

  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

export { debounce }
