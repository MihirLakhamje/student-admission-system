import daisyui from 'daisyui';
import preline from "preline/plugin"

/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
  'node_modules/preline/dist/*.js',
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
  },
};
export const daisyui= {
  themes: ["winter"],
}
export const plugins = [daisyui, preline];