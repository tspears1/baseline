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
      spaceBetween: 144
    }
  },
  slideActiveClass: 'testimonialSlider__slide--active',
  slidePrevClass: 'testimonialSlider__slide--prev'
}

const testimonialSliders = [...document.querySelectorAll('[data-testimonial-slider]')]

if (testimonialSliders.length) {
  testimonialSliders.forEach(testimonialSlider => new Carousel(testimonialSlider, config))
}
