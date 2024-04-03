/**
 * @typedef {function} until
 * @description Polls a function until it returns true
 * @param {function} conditional - The function to poll
 * @returns {Promise} - A promise that resolves when the function returns true
 * @example until(() => { isLoaded === true }).then(() => console.log('Is loaded!'))
*/
const until = (conditional) => {
  const poll = (done) => (conditional ? done() : setTimeout(() => poll(done), 500))
  return new Promise(poll)
}

export { until }
