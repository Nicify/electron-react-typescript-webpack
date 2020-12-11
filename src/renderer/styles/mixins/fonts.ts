import { css } from 'styled-components'

export const disableFontRenderingOptimization = () => css`
    text-shadow: none !important;
    text-rendering: unset !important;
    -webkit-text-stroke-width: 0 !important;
`
