import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

// eslint-disable-next-line
export const noop = () => {}

export function isDev(): boolean {
    return process.env.NODE_ENV !== 'production'
}

export function mkdirp(path: string): void {
    if (existsSync(path)) {
        return
    }
    const parentDir = dirname(path)
    if (!existsSync(parentDir)) {
        mkdirp(parentDir)
    }
    mkdirSync(path)
}
