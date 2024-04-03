import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, query, queryAll, queryAssignedNodes } from 'lit/decorators.js'
import styles from './code-preview.styles.js'

/**
 * @element code-preview
 * @summary Resizable preview window for code examples.
 * @status incomplete
 *
 * @slot - Default. Preview window and HTML source code.
 *
 * @csspart preview - The preview window.
 *
 * @cssproperty --code-preview-background - Background color of the preview window.
 * @cssproperty --code-preview-padding-block - Padding on the block axis of the preview window.
 * @cssproperty --code-preview-padding-inline - Padding on the inline axis of the preview window.
 */


export default class CodePreview extends LitElement {
    static styles = styles

    // Show both resize triggers by default. If duo is false, only the right trigger will be shown.
    @property({ type: Boolean, reflect: true }) duo = true

    @property({ type: Boolean, reflect: true }) fixedHelper = false

    /** @type {HTMLElement} */
    @query('.code-preview__preview') preview

    /** @type {HTMLElement} */
    @query('.code-preview__preview-content') content

    /** @type {HTMLElement[]} */
    @queryAll('.code-preview__resizer') resizers

    /** @type {HTMLElement[]} */
    @queryAssignedNodes({ flatten: true }) defaultSlot

    /**
     * @description Get the current width of the preview window.
     * @param {TouchEvent|MouseEvent} event
     * @returns {number}
     * @private
     */
    _getCurrentWidth(event) {
        return event.changedTouches
            ? event.changedTouches[0].pageX
            : event.clientX
    }

    /**
     * @description Handle dragging of the resize triggers.
     * @param {TouchEvent|MouseEvent} event
     * @return {void}
     * @private
     */
    _handleResizerDrag(event, trigger) {
        const { resizers, preview, content, _getCurrentWidth } = this

        if (!resizers || !preview || !content) return

        let startX = _getCurrentWidth(event)

        let startWidth = document.defaultView && parseInt(document.defaultView.getComputedStyle(preview).width, 10)

        /**
         * @description Handle the drag move event.
         * @param {TouchEvent|MouseEvent} event
         */
        function _dragMove(event) {
            let width = 0
            const currentWidth = _getCurrentWidth(event)
            const throttle = 0.5
            if (trigger === 'start' ) {
                width = (startWidth ?? 0 ) - ((currentWidth - startX) / throttle)
            } else if (trigger === 'end') {
                width = startWidth + ((currentWidth - startX) / throttle)
            }
            preview.style.width = `${width}px`

            window.requestAnimationFrame(() => content.dataset.containerSize = `${content.offsetWidth}px`)
        }

        function _dragStop() {
            preview.classList.remove("code-preview__preview--dragging")
            document.documentElement.removeEventListener("mousemove", _dragMove)
            document.documentElement.removeEventListener("touchmove", _dragMove)
            document.documentElement.removeEventListener("mouseup", _dragStop)
            document.documentElement.removeEventListener("touchend", _dragStop)
        }

        event.preventDefault()
        preview.classList.add("code-preview__preview--dragging")
        document.documentElement.addEventListener("mousemove", _dragMove)
        document.documentElement.addEventListener("touchmove", _dragMove)
        document.documentElement.addEventListener("mouseup", _dragStop)
        document.documentElement.addEventListener("touchend", _dragStop)
    }

    render() {
        return html`
            <div
                part="base"
                class="code-preview ${classMap({
                    'code-preview--duo': this.duo,
                    'code-preview--fixed-helper': this.fixedHelper
                })}"
            >
                <div class="code-preview__preview">
                    <button
                        class="code-preview__resizer"
                        data-preview-resizer="start"
                        @mousedown=${(event) => this._handleResizerDrag(event, 'start')}
                        @touchmove=${(event) => this._handleResizerDrag(event, 'start')}
                        @mouseup=${(event) => this._handleResizerDrag(event, null)}
                        @touchend=${(event) => this._handleResizerDrag(event, null)}
                        tabindex="-1"
                    >
                        <slot name="icon-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="" viewBox="0 0 16 16" part="svg">
                                <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                            </svg>
                        </slot>
                    </button>

                    <div class="code-preview__preview-content">
                        <slot></slot>
                    </div>

                    <button
                        class="code-preview__resizer"
                        data-preview-resizer="end"
                        @mousedown=${(event) => this._handleResizerDrag(event, 'end')}
                        @touchmove=${(event) => this._handleResizerDrag(event, 'end')}
                        @mouseup=${(event) => this._handleResizerDrag(event, null)}
                        @touchend=${(event) => this._handleResizerDrag(event, null)}
                        tabindex="-1"
                    >
                        <slot name="icon-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="" viewBox="0 0 16 16" part="svg">
                                <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                            </svg>
                        </slot>
                    </button>
                </div>
            </div>
        `
    }
}
