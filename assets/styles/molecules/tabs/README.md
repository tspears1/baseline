# Tabs

Basic implementation of tabs functionality. While unopinionated about styles, it is expected that the visual direction of the tab buttons themselves have accessibilty concerns in regards to arrow key direction.

## Basic HTML Structure
All attributes in this example are required.
```html
<div data-tabs="tabs-id" data-tabs-direction="horizontal">
    <div role="tablist">
        <button id="tab-1" role="tab" aria-selected="true" aria-controls="tabpanel-1">
            Tab Button
        </button>
        
        <!-- ... -->
    </div>
    <div>
        <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1" data-active-tab="true">
            <p>Tab Panel</p>
        </div>
        
        <!-- ... -->
    </div>
</div>
```

## Usage
```javascript
const tabs = new Tabs(selector)
```

## API

### Properties

* `tabsId` - (string) Unique identifier for whole tabs interface. Must be unique to page.
* `tabDirection` - (string<'horizontal' | 'vertical'>) Direction of tabs.
* `tabButtons` = (HTMLButtonElement[]) Returns all tab buttons as array.
* `tabPanels` = (HTMLElement[]) Returns all tab panels as array.
* `firstTabButton` = (HTMLButtonElement) Returns the first tab button.
* `lastTabButton` = (HTMLButtonElement) Returns last tab button.
* `hasTracking` = (boolean) Whether to track active tab via URL hash.

### Methods
* `getAssociatedTabPanel(tabButton: HTMLButtonElement): HTMLElement`
* `setActiveTab(tabButton: HTMLButtonElement, tabPanel: HTMLElemenet): void`
* `handleNextTab(tabButton: HTMLButtonElement): void`
* `handlePreviousTab(tabButton: HTMLButtonElement): void`
* `handleHome(): void`
* `handleEnd(): void`
* `setInitialTabByHash(): void`
* `elementScopedForInstance(element: HTMLElement): boolean`