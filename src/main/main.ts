import { isDev } from '@lib/helper'
import { app, BrowserWindow, ipcMain } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS, REACT_PERF } from 'electron-devtools-installer'
import path from 'path'

import AppWindow from './AppWindow'

app.setAppUserModelId('org.your.productname')

app.commandLine.appendSwitch('enable-lazy-image-loading', 'true')

const baseUrl = isDev() ? 'http://localhost:2003' : `file://${path.resolve(__dirname)}/index.html`

let mainWindow: BrowserWindow

function init() {
    mainWindow = new AppWindow(
        {
            show: false,
            width: 1280,
            height: 768,
            minWidth: 1280,
            minHeight: 768,
        },
        baseUrl,
    )

    ipcMain.on('showMainWindow', () => mainWindow.show())
}

app.once('ready', async () => {
    init()
    if (!isDev()) return
    Promise.all([installExtension(REACT_DEVELOPER_TOOLS), installExtension(REACT_PERF)])
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (!mainWindow) {
        init()
    }
})
