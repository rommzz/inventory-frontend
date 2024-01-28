import { createVuetify, type ThemeDefinition } from 'vuetify'
import { pallete } from "@/assets/palette";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: pallete.schemes.light,
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})