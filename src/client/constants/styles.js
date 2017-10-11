export const COLOR_BLACK = '#000000'
export const COLOR_WHITE = '#FFFFFF'

// courtesy of https://www.sitepoint.com/javascript-generate-lighter-darker-color/
const adjustLuminance = (hex, lum) => {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // convert to decimal and change luminosity
  let rgb = '#', c, i
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }

  return rgb
}

export const darken = (hex, percentage) => adjustLuminance(hex, percentage / -100)
export const lighten = (hex, percentage) => adjustLuminance(hex, percentage / 100)

export const colors = {
  text: {
    primary: COLOR_BLACK,
    secondary: lighten(COLOR_BLACK, 30),
    tertiary: lighten(COLOR_BLACK, 60)
  },
  background: {
    primary: COLOR_WHITE,
    secondary: darken(COLOR_WHITE, 20)
  }
}

export const fonts = {
  serif: 'serif',
  sansSerif: 'sans-serif'
}

export const deviceTypes = {
  mobile: {
    maxWidth: '360px'
  },
  tablet: {
    minWidth: '361px',
    maxWidth: '1024px'
  },
  desktop: {
    minWidth: '1025px'
  }
}
