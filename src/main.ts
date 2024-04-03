import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//tailwind style
import "./styles/index.css";


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import vuetifyPlugin from "./plugin/vuetify";
// import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import {  mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css";
import 'material-symbols/outlined.css';
import { aliases, md } from "vuetify/iconsets/md";
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      md
    },
  },
})


const app = createApp(App)

app.use(
  Vue3Toasity,
  {
    autoClose: 3000,
		theme:'colored',
    position: 'top-center',
		transition: 'slide',
  } as ToastContainerOptions,
);

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(vuetifyPlugin)

app.mount('#app')
