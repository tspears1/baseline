/**
 * @typedef {function} nonNull
 * @description Removes null values from an object
 * @param {object} obj - The object to remove null values from
 * @returns {object} - The object with null values removed
 * @example const obj = { a: 1, b: null, c: 3 }
 * const nonNullObj = nonNull(obj) // { a: 1, c: 3 }
 */
const nonNull = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
  )
}

export { nonNull }
