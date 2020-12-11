import '@styles/normalize.css'
import '@styles/override.scss'
import './index.scss'

import { ipcRenderer } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'

import App from './App'

// Render components
export default function renderApp(): void {
    const rootEl = document.getElementById('root')
    const AppInstance = (
        <AppContainer>
            <HashRouter>
                <App />
            </HashRouter>
        </AppContainer>
    )

    render(AppInstance, rootEl, () => ipcRenderer.send('showMainWindow'))
}

renderApp()
