import { css } from 'styled-components'

export const hideScrollBar = () => css`
    ::-webkit-scrollbar {
        display: none;
    }
`

export const tinyButtons = () => css`
    scrollbar-width: 6px;

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        color: #cccccc;
        border-radius: 5px;
        background: #ccc;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
    }

    ::-webkit-scrollbar-track {
        border-radius: 5px;
        background: #ffffff00;
    }

    ::-webkit-scrollbar-button {
        color: #cccccc;
    }
`

export const noButtons = (width = '6px', color = 'rgba(0, 0, 0, 0.38)', hoverColor = 'rgba(0, 0, 0, 0.54)') => css`
    &::-webkit-scrollbar {
        width: ${width};
        height: ${width};
    }

    &::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${color};
        border: 0px none #ffffff;
        border-radius: 0px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${hoverColor};
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }
`
