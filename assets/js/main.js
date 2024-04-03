// Styles
import "@styles/main.scss";
import "highlight.js/styles/night-owl.css";

// Global
import "lazysizes";
import hljs from "highlight.js";

// Baseline ==========================//
import "@js/baseline.js";

// import polyfill for css :has() selector (applies to Firefox only).
import { cssHasInputCheckedPolyfill, cssHasPolyfill } from "./polyfill/css-has";

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("HMR");
  });
}

// Init ==========================//
cssHasInputCheckedPolyfill();
cssHasPolyfill();

// Accordions ==========================//
const accordions = [...document.querySelectorAll("[data-accordion]")];

if (accordions.length) {
  const { Accordion } = await import("@styles/molecules/accordion/_index");
  accordions.forEach((accordion) => new Accordion(accordion));
}

// Tabs ==========================//
const tabs = [...document.querySelectorAll("[data-tabs]")];

if (tabs.length) {
  const { Tabs } = await import("@styles/molecules/tabs/_index");
  tabs.forEach((tab) => new Tabs(tab));
}

// Toasts ==========================//
const toasts = [...document.querySelectorAll("[toast-trigger]")];

if (toasts.length) {
  const { createToastTrigger } = await import(
    "@styles/organisms/toasts/_index"
  );
  toasts.forEach((toast) => createToastTrigger(toast));
}

// Videos ==========================//
const videos = [
  ...document.querySelectorAll(".lazyload--video, [data-lazy-video]"),
];

if (videos.length) {
  const { lazyLoadVideo } = await import("@styles/atoms/media/_index");
  videos.forEach((video) => lazyLoadVideo(video));
}

// Carousel ==========================//
const carousels = [...document.querySelectorAll("[data-carousel]")];

if (carousels.length) {
  await import("@styles/molecules/carousel/_index");
}

// Testimonial Slider ==========================//
const testimonialSliders = [
  ...document.querySelectorAll("[data-testimonial-slider]"),
];

if (testimonialSliders.length) {
  await import("@styles/organisms/testimonial-slider/_index");
}

// Arrow Navigation ==========================//
const arrowNavigationElements = [
  ...document.querySelectorAll("[data-arrow-navigation]"),
];

if (arrowNavigationElements.length) {
  const { ArrowNavigation } = await import("@js/modules/arrowNavigation");
  arrowNavigationElements.forEach(
    (arrowNavigationElement) => new ArrowNavigation(arrowNavigationElement),
  );
}

const menuButtons = [...document.querySelectorAll("[data-menu-button]")];

if (menuButtons.length) {
  const { Menu } = await import("@js/modules/menu");

  menuButtons.forEach((menuButton) => new Menu(menuButton));
}

// Code Samples ==========================//
const codeSamples = [...document.querySelectorAll("[data-code")];

if (codeSamples.length) {
  codeSamples.forEach((codeSample) => {
    hljs.highlightElement(codeSample);
  });
}
