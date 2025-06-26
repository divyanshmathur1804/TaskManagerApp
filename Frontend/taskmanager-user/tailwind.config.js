/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // ← match your project's source files
    "./public/index.html",             // ← optional, for HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
