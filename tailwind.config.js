/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#664DFF",
        "dark-gray": "#2D396B",
        // "light-primary": "#8ABDF8",
        // "text-secondary": "#707EAE",
        // "dark-black": "#2B3674",
        // "light-black": "#969BB3",
        secondary: "#707EAE",
        error: "#F52618",
        // lightGray: "#8386A8",
        info: "#68769F",
        success: "#4CC800",
        // Average: "#4cb585",
        Warning: "#FFC000",
        // Critical: "#FF5959",
        // white: "#fff",
        // "sidebar-bg": "linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.00) 104.88%)",
        // "alert-rgb": "linear-gradient(316.85deg, #FF9696 1.46%, #EC2C2C 98.44%),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
        // "Warning-rgb": "linear-gradient(315deg, #FFC960 -0.89%, #EF9D00 99.11%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
        // "problem-rgb": "linear-gradient(135deg, #6C83FF 0.6%, #889BFF 100.6%),linear-gradient(0deg, #FFFFFF, #FFFFFF)"
      },
      screens: {
        sm: "320px",
        md: "768px",
        md2: "900px",
        lg: "974px",
        lg2: "1280px",
        xl: "1440px",
        xl2: "2000px"
      },
      boxShadow: {
        shadowOne: "2px 2px 5px 1px rgba(85, 52, 221, 0.15)",
        shadowTwo: "0px 4px 15px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
