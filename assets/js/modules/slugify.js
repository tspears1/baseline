/**
 * Courtesy of https://gist.github.com/codeguy/6684588
 * @typedef {function} slugify
 * @description Converts a string to a slug
 * @param {string} stringToSlugify - The string to slugify
 * @returns {string} - The slugified string
 * @example slugify('Hello, World!') => 'hello-world'
*/
const slugify = (stringToSlugify) => {
  if (stringToSlugify) {
    stringToSlugify = stringToSlugify.replace(/^\s+|\s+$/g, '') // trim
    stringToSlugify = stringToSlugify.toLowerCase()

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaeeeeiiiioooouuuunc------'
    for (let i = 0, l = from.length; i < l; i++) {
      stringToSlugify = stringToSlugify.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    stringToSlugify = stringToSlugify.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
  }

  return stringToSlugify
}

export { slugify }
