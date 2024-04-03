import Swiper from 'swiper'
import { A11y } from 'swiper/modules'

/**
 * @typedef {import('swiper/types').Swiper} Swiper
 */

/**
 * @typedef {import('swiper/types').SwiperOptions} SwiperOptions
 */

export class Carousel {
  /** @type {HTMLElement | null} */
  carouselElement = null

  /** @type {HTMLElement | null} */
  carouselWrapper = null

  /** @type {HTMLButtonElement | null} */
  nextButton = null

  /** @type {HTMLButtonElement | null} */
  prevButton = null

  /** @type {HTMLButtonElement[]} */
  paginationButtons = []

  /** @type {Swiper | null} */
  swiperInstance = null

  /**
   * @param {HTMLElement} carouselElement
   * @param {SwiperOptions} swiperConfig
   */
  constructor (carouselElement, swiperConfig = {}) {
    this.carouselElement = carouselElement
    this.carouselWrapper = this.carouselElement.querySelector('[data-carousel-wrapper]')
    this.nextButton = this.carouselElement.querySelector('[data-carousel-next]')
    this.prevButton = this.carouselElement.querySelector('[data-carousel-prev]')
    this.paginationButtons = [...this.carouselElement.querySelectorAll('[data-pagination-bullet]')]

    const config = {
      modules: [A11y],
      ...swiperConfig
    }

    this.swiperInstance = new Swiper(this.carouselWrapper, config)

    this.swiperInstance.on('realIndexChange', this.slideChange.bind(this))

    this.paginationButtons.forEach((button, index) => {
      button.addEventListener('click', () => { this.swiperInstance.slideTo(index) })
    })

    this.paginationButtons.forEach(tabButton => tabButton.addEventListener('keydown', this.handleKeydown.bind(this)))
    this.nextButton.addEventListener('click', this.handleNextSlide.bind(this))
    this.prevButton.addEventListener('click', this.handlePreviousSlide.bind(this))

    this.carouselElement.carousel = this
  }

  /**
   * @param {Swiper} swiper swiper instance
   * @return {void}
   */
  slideChange (swiper) {
    setTimeout(() => {
      const { realIndex } = swiper

      this.paginationButtons.forEach(button => {
        button.setAttribute('aria-selected', 'false')
        button.setAttribute('tabindex', '-1')
      })

      this.paginationButtons[realIndex].setAttribute('aria-selected', 'true')
      this.paginationButtons[realIndex].setAttribute('tabindex', '0')
    }, 0)
  }

  /**
   * @param {KeyboardEvent} event
   * @return {void}
   */
  handleKeydown ({ key }) {
    switch (key) {
      case 'ArrowRight':
        this.handleNextSlide()
        break
      case 'ArrowLeft':
        this.handlePreviousSlide()
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

    const { realIndex } = this.swiperInstance

    this.paginationButtons[realIndex].focus()
  }

  /**
   * @return {void}
   */
  handleNextSlide () {
    this.swiperInstance.slideNext()
  }

  /**
   * @return {void}
   */
  handlePreviousSlide () {
    this.swiperInstance.slidePrev()
  }

  /**
   * @return {void}
   */
  handleHome () {
    this.swiperInstance.slideTo(0)
  }

  /**
   * @return {void}
   */
  handleEnd () {
    this.swiperInstance.slideTo(this.swiperInstance.slides.length - 1)
  }
}
