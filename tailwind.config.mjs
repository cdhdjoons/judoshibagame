/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainRed: 'rgb(160, 0, 0, 0.8)',
        footerBg: 'rgb(0, 0, 0, 0.5)',
        balanceBg: 'rgb(0, 0, 0, 0.7)',
        taskBg: 'rgb(2, 116, 116, 0.08)',
        taskBg2: 'rgb(116, 2, 65, 0.08)',
        boxBg: 'rgb(0, 0, 0, 0.41)',
        borderBlack: 'rgb(0, 0, 0, 0.3)',
      },
      fontFamily: {
        appleNeo: ["var(--font-appleSd-gothic)", "sans-serif"],
      },
      screens: {
        'xs': {'max': '345px'}, // 345px 이하일 때 적용
      },
    },
  },
  plugins: [],
};
