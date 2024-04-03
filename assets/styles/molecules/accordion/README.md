# Accordion

Basic implementation of accordion functionality. An accordion can be operated independently or as part of a group using the `data-accordion-group` data attribute.

## Basic HTML Structure
```html
<details class="accordion" data-accordion data-accordion-group="optional-group-id" aria-expanded="false">
    <summary class="accordion__summary" role="button" data-accordion-summary>
        <h3 class="accordion__heading">
            Why use a different color for interactions vs. navigation?
        </h3>
        <div class="accordion__iconWrapper">
            <svg class="accordion__icon icon icon--chevron-down" aria-hidden="true" role="presentation">
                <use href="#icon-chevron-down" />
            </svg>
        </div>
    </summary>
    <div class="accordion__content" data-accordion-content>
        <p>
            Donec mattis consequat libero at fermentum. Phasellus ultricies ultrices felis eu dapibus. Donec nec pellentesque eros. Proin cursus, felis eu sollicitudin sodales, mi tellus posuere risus, id vehicula enim nisi id risus. Praesent ultrices, eros tempor tincidunt vehicula, sem orci imperdiet ante, iaculis egestas arcu dolor pretium dui. Nullam egestas cursus diam quis ultrices. Praesent mollis ligula vel lorem gravida, at commodo nibh posuere. Maecenas id mollis metus, sit amet ultricies urna. Pellentesque congue elementum massa, a tristique sem feugiat ac.
        </p>
    </div>
</details>
```

## Usage
```javascript
const accordion = new Accordion(selector)
```

## API

### Properties

* `detailsElement` - (HTMLDetailsElement) Parent accordion element
* `contentElement` - (HTMLElement) Element containing accordion content
* `summaryElement` = (HTMLElement) Summary Element containing button for accordion
* `groupId` = (string | null) Shared group ID if accordion is part of a group
* `isPartOfGroup` = (boolean) If accordion is part of group
* `targetHeight` = (string) Target height of accordion content when open.
* `closedHeight` = (string) Whether to track active tab via URL hash.

### Methods
* `toggle(): void`
* `close(): void`
* `open(): void`
* `closeGroup(): void`