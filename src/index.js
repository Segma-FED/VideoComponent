/**
 * Created by Lucas on 2020/12/11.
 */
import VideoComponent from './components/VideoComponent'
import { playStatus, playErrors } from './utils/constant'

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('VideoComponent', VideoComponent)
}

const plugin = {
    install
}

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}

export {
    VideoComponent,
    playStatus,
    playErrors
}
