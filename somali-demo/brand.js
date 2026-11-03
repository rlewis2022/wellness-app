/*
 * Brand for the Somali demo page at /somali-demo/. "Demo Clinic" is made up.
 * Text is a draft Somali translation that still needs review by a native speaker.
 * Logo paths are relative to this folder.
 */
window.BRAND = {
  name: 'Tababar Maalinle',
  tagline: 'Tababar fudud oo maalinle ah oo loogu talagalay gacmaha iyo maskaxda, oo ka yimid saaxiibbadaada Demo Clinic.',
  welcome: 'Ku soo dhowow! Isku day hal tababar oo gaaban maalin kasta. Ma jiraan dhibco, mana jirto degdeg.',
  logo: '../demo/logo.svg',
  logoDark: '../demo/logo-dark.svg',
  logoAlt: 'Demo Clinic',
  showName: true,
  colors: {
    primary: '#0B71C3',
    accent: '#CC3366',
  },
  font: 'sans',
  contact: {
    text: "Su'aalo ma qabtaa? Wac Demo Clinic: 555-0100.",
    website: 'https://example.com',
    websiteLabel: 'Booqo Demo Clinic',
  },
  finishMessage: 'Berri ayaan ku aragnaa!',

  // Visit counting for clinic pages (optional). Paste the site token from
  // Cloudflare Web Analytics here to count how many times this page is opened.
  // Leave '' to count nothing. Has no effect on the main page.
  analytics: {
    cloudflareToken: '',
  },
};
