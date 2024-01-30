/** @type {import('tailwindcss').Config} */
import { pallete } from "./src/plugin/palette";
export default {
  prefix: "tw-",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: pallete.schemes.light
  },
  plugins: [],
}

