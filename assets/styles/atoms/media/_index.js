// TODO: Iframes are inconsistently loading. Youtube seems to be the biggest issue.
/**
 * @function lazyLoadVideo
 * @description Lazy load video either by click or when in view
 * @param {HTMLElement} el
 * @returns
 */
const lazyLoadVideo = (el) => {
  // Load video on click event.
  if (el.dataset.lazyVideo === 'click') {
    const trigger = el.querySelector('[data-lazy-video-trigger]')
    const video = el.querySelector('video, iframe')
    const sources = video?.querySelectorAll('[data-src]').length ? video?.querySelectorAll('[data-src]') : [video]
    trigger?.addEventListener('click', () => {
      el.classList.add('loaded')
      sources?.forEach(source => source.setAttribute('src', source.dataset.src))
      video?.load()
      video.inert = false
    }, { once: true })
    return
  }

  // Load video when in view.
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      const video = el.tagName === 'VIDEO' || el.tagName === 'IFRAME' ? el : el.querySelector('video, iframe')
      const sources = video?.querySelectorAll('[data-src]') || [video]
      el.classList.add('loaded')
      sources?.forEach(source => source.setAttribute('src', source.dataset.src))
      video?.load()
      video.inert = false
      observer.unobserve(el)
    }
  })
  observer.observe(el)
}

export { lazyLoadVideo }
