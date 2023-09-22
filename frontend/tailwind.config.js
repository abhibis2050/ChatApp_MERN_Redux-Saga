/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important:true,
  theme: {
    extend: {
      colors: {
        bluebase: "#0059E4",
      },
      screens: {
        "3xl": "1740px",
      },
      backgroundImage: {
        grad: "linear-gradient(to right, #005bea, #ffffff)",
        gradButton: "linear-gradient(to right, #f97316, #f9dd04)",
      },
    },
  },
  plugins: [require("daisyui")],
};
