// Web Components ==========================//
import "@js/lit-components/index.js";

// Code Copy ==========================//
const copy = [...document.querySelectorAll("[data-copy]")];

if (copy.length) {
  const { CopyButton } = await import("@js/modules/copy-button");
  copy.forEach((button) => new CopyButton(button));
}

// Accordion Cache ==========================//
const accordionGroup = [...document.querySelectorAll("[data-accordion-cache]")];
if (accordionGroup.length) {
  const { useAccordionCache } = await import("@js/modules/accordionCache");
  accordionGroup.forEach((group) => {
    useAccordionCache(group);

    const updatePanelScroll = () => {
      const accordions = group.querySelectorAll("[data-panel-trigger]");
      accordions.forEach((acc) => {
        const trigger = acc.querySelector("summary");
        const panel = document.querySelector(
          `#section-${acc.dataset.panelTrigger}`,
        );

        // scroll currently active associated panel into view
        window.requestAnimationFrame(() => {
          if (acc.open)
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        // scroll associated panel into view when clicked
        trigger.addEventListener("click", () => {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    };
    updatePanelScroll();
  });
}

// Three.js ==========================//
const threeJsElements = [...document.querySelectorAll("[data-three-js]")];
if (threeJsElements.length) {
  threeJsElements.forEach(async (el) => {
    await import(`@js/three/${el.dataset.threeJs}.jsx`);
  });
}

// Observers ==========================//
const buildHeightObserver = (el, slug, variableName) => {
  const observer = new ResizeObserver(([entry]) => {
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty(
        variableName,
        entry.target.offsetHeight + "px",
      );
      Object.assign(window, {
        observers: {
          ...window.observers,
          slug: { height: entry.target.offsetHeight },
        },
      });
    });
  });
  el && observer.observe(el);
};

buildHeightObserver(
  document.querySelector(".baselineHeader"),
  "header",
  "--header-height",
);
buildHeightObserver(
  document.querySelector(".baselineFooter"),
  "footer",
  "--footer-height",
);
