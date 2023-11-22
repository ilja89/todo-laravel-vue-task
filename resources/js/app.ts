import {App, plugin} from "@inertiajs/inertia-vue3";
import {createApp, h} from "vue";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from "vuetify/iconsets/mdi";
import {createVuetify} from "vuetify";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    }
})

const el = document.getElementById('app') as HTMLElement

const app = createApp({
    render: () => h(App, {
        initialPage: JSON.parse(el.dataset.page as string),
        resolveComponent: (name) => import(`./Pages/${name}.vue`).then((module) => module.default)
    })
})
app.use(plugin)
app.use(vuetify)
app.mount(el)
