import { css } from 'lit'
import componentStyles from '@js/lit-components/styles/component.styles.js'

export default css`
    ${componentStyles}

    :host {
        display: block;
    }

    .code-preview {
        --_code-preview-helper-inset:       var(--code-preview-helper-inset, -0.75rem -0.75rem auto auto);
        --_code-preview-helper-position:    var(--code-preview-helper-position, absolute);
        --_code-preview-inline-size:        var(--code-preview-inline-size, 100cqi);
        --_code-preview-padding-inline:     var(--code-preview-padding-inline, 1.5rem);
        --_code-preview-trigger-width:      var(--code-preview-trigger-width, 1.75rem);
        background-color: var(--eos-color-neutral-50);
        border-radius: 3px;
        max-inline-size: var(--_code-preview-inline-size);
        position: relative;

        &.code-preview--fixed-helper {
            --_code-preview-helper-inset:       var(--code-preview-helper-inset, auto 0.5rem 0.5rem auto);
            --_code-preview-helper-position:    var(--code-preview-helper-position, fixed);
        }
    }

    .code-preview__preview {
        background-color: var(--code-preview-background-color, var(--eos-color-neutral-1000));
        border-bottom: none;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: var(--code-preview-border, 1px solid var(--eos-color-neutral-200));
        inline-size: var(--_code-preview-inline-size);
        max-inline-size: var(--_code-preview-inline-size);
        min-inline-size: calc(23.4375rem + (var(--_code-preview-trigger-width) * 2) + (var(--_code-preview-padding-inline) * 2));
        padding-block: var(--code-preview-padding-block, 1.5rem);
        padding-inline: calc(var(--_code-preview-padding-inline) + var(--_code-preview-trigger-width));
        position: relative;
        z-index: 3;
    }

    .code-preview__preview--dragging {

        /* Block the preview while dragging to prevent iframes from intercepting drag events */
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: ew-resize;
        }

        .code-preview__preview-content::before {
            opacity: 0.85;
            transition: opacity var(--duration-quick) var(--ease-in-out);
        }
    }


    .code-preview__preview-content {
        position: relative;

        &::before {
            background: var(--color-pronto-light);
            border-radius: var(--radius-2);
            box-shadow: var(--elevation-6);
            color: var(--color-pronto-darkish);
            content: attr(data-container-size);
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: var(--font-weight-bold);
            inset: var(--_code-preview-helper-inset);
            letter-spacing: var(--tracking-wide);
            opacity: 0;
            padding: var(--size-0) var(--size-1);
            pointer-events: none;
            position: var(--_code-preview-helper-position);
            transition: opacity var(--duration-slow) var(--ease-in-out) var(--duration-fast);
            z-index: var(--z-max);
        }
    }

    .code-preview__resizer {
        appearance: none;
        align-items: center;
        background-color: var(--code-preview-trigger-background-color, var(--eos-color-neutral-0));
        border: var(--code-preview-trigger-right-border, var(--code-preview-trigger-border, none));
        bottom: 0;
        box-shadow: none;
        color: var(--code-preview-trigger-color, var(--eos-color-neutral-600));
        cursor: ew-resize;
        display: flex;
        font-size: 20px;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0;
        width: var(--_code-preview-trigger-width);
    }

    .code-preview__resizer:where([data-preview-resizer="start"]) {
        border: var(--code-preview-trigger-left-border, var(--code-preview-trigger-border, none));
        left: 0;
        right: auto;
    }

    .code-preview__resizer svg {
        pointer-events: none;
    }

    @media screen and (max-width: 600px) {
        .code-preview__preview {
            --_code-preview-trigger-width: 0px;
        }

        .code-preview__resizer {
            display: none;
        }
    }
`