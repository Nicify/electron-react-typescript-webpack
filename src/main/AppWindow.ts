import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
class AppWindow extends BrowserWindow {
    constructor(config: BrowserWindowConstructorOptions, urlLocation: string) {
        const basicConfig: BrowserWindowConstructorOptions = {
            title: 'productName',
            show: false,
            maximizable: true,
            resizable: true,
            backgroundColor: '#fff',
            webPreferences: {
                sandbox: false,
                webSecurity: false,
                enableRemoteModule: true,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                backgroundThrottling: false,
            },
        }
        const finalConfig = { ...basicConfig, ...config }
        super(finalConfig)
        this.loadURL(urlLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

export default AppWindow
