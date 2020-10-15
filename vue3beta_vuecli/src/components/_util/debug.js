import {isProd} from './env'

export const warn = (msg, fn = 'error') => {
  !isProd && console[fn](`[csii-vx-mobile]: ${msg}`)
}
