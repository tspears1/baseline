import { Carousel } from '@js/modules/carousel'

/**
 * @typedef {import('swiper/types').SwiperOptions} SwiperOptions
 */

/** @type {SwiperOptions} */
const config = {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  breakpointsBase: 'container',
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 32
    }
  }
}

const carousels = [...document.querySelectorAll('[data-carousel]')]

if (carousels.length) {
  carousels.forEach(carousel => new Carousel(carousel, config))
}
