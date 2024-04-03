# Menu

Basic implementation of menu functionality. Make sure to include all necessary attributes for accessibility.

## Basic HTML Structure
```html
<button
    type="button"
    aria-expanded="false"
    aria-controls="menu"
    data-menu-button="menu"
    data-open-with-transition="true"
    data-active-class="is-active"
    id="menu-button"
>
    Menu Button
</button>
<div
    class="mobileNavigation__list"
    data-arrow-navigation
    data-menu="menu"
    aria-hidden="true"
    aria-labelledby="menu-button"
    data-active-class="is-active"
    id="menu"
    inert
>
    <!-- Menu Content -->
</div>
```

## Usage
```javascript
const menu = new Menu(selector)
```

## API

### Properties

* `menuID` - (string) Unique ID for menu
* `menuButtonElement` - (HTMLButtonElement) Button to trigger menu
* `menuBackElement` = (HTMLButtonElement | null) Optional back button for closing menu
* `firstFocusableElement` = (HTMLElement)
* `lastFocusableElement` = (HTMLElement)
* `menuActiveClass` = (string) CSS class for when menu panel is active
* `menuButtonActiveClass` = (string) CSS class for when menu button is active
* `willOpenWithTransition` = (boolean) Whether to open menu with CSS transition

### Methods
* `toggleMenu(event: KeyboardEvent | MouseEvent): void`
* `close(isKeyboardEvent: boolean): void`
* `open(isKeyboardEvent: boolean): void`
* `openWithTransition(isKeyboardEvent: boolean): void`