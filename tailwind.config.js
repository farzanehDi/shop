module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['IRANSans'],
      display: ['IRANSans']
    },
    minWidth: {
     '1/3': '30%',
    },
       
    extend: {colors: {
        gray: {
          '50': '#fbfbfb',
          '100': '#efefef',
          '200': '#e5e5e5',
          '300': '#cacaca',
          '400': '#666666',
          '500': '#4f4f4f',
        },
        blue: {
          '100': '#1685ff',
          '200': '#007bff',
          '300': '#036bdb',
          '400': '#0051a9',
          '500': '#013b7a',
        },
        orange: {
          '100': '#fc8a2c',
          '200': '#fd7e14',
          '300': '#ec6a00',

        }
      }},
  },
  variants: {
    
  },
  plugins: [   ({ addComponents, theme }) => {
    addComponents({
      ".container": {
         // Breakpoints
        "@screen sm": {
          maxWidth: theme("screens.md"),
        },
        "@screen md": {
          maxWidth:1700,
        },
      },
    });
  },],
}
