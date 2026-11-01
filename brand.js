/*
 * Branding
 *
 * Change this file to brand the app for a clinic or organization.
 * Everything here is optional. Anything left out uses the default look.
 * See README.md, "Branding for a clinic", for details and an example.
 */
window.BRAND = {
  // Shown at the top of the start page and in the browser tab.
  name: 'Wellness App',

  // One line under the name.
  tagline: 'A few minutes a day to keep your hands and mind active.',

  // A short welcome paragraph on the start page. Leave '' for none.
  welcome: '',

  // Logo file in this site's folder, for example 'brand/logo.png' or 'brand/logo.svg'.
  // It must be a file hosted with the site. Links to other websites are blocked for privacy.
  logo: '',
  logoAlt: '',

  // Optional second logo for phones in dark mode, for example one with light-colored text.
  logoDark: '',

  // Set to false to hide the name when the logo already shows it.
  showName: true,

  // Colors as hex codes. Very light or very dark colors are adjusted automatically
  // so text stays readable in both light and dark mode.
  colors: {
    primary: '#2F6B5E', // buttons, highlights, drawing ink
    accent: '#B4561C',  // goal markers and small highlights
  },

  // 'sans', 'serif' or 'rounded'. Uses fonts already on the device.
  font: 'sans',

  // Contact line on the start and finish pages. Leave text '' to hide.
  contact: {
    text: '',
    website: '',      // must start with https://
    websiteLabel: '', // link text, for example 'Visit our website'
  },

  // Extra line on the finish page. Leave '' for none.
  finishMessage: '',
};
