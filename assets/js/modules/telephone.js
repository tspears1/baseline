/**
 * @typedef {function} getTelephoneLink
 * @description Converts a telephone number to a link
 * @param {string} string - The telephone number to convert
 * @returns {string} - The converted telephone number
 * @example 1 (800) 555-5555 => tel:1-800-555-5555
*/
const getTelephoneLink = (string) => 'tel:' + string.replace(/\(|\)/g, '').replace(/\s/g, '-')

/**
 * @typedef {function} getTelephoneAria
 * @description Converts a telephone number to an aria label friendly string.
 * @param {string} string - The telephone number to convert
 * @returns {string} - The converted telephone number
 * @example 1 (800) 555-5555 => 1. 800. 555. 5555 - periods and spaces are added for screen readers.
*/
const getTelephoneAria = (string) => string.replaceAll(/\(|\)/g, '').replaceAll(/\s|-/g, '.').replaceAll('', ' ').replaceAll(' .', '.')

export { getTelephoneLink, getTelephoneAria }
