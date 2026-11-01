'use strict';

/*
 * Wellness App
 *
 * Privacy: this file never stores anything (no cookies, localStorage, IndexedDB)
 * and never makes a network request. Each visit starts fresh.
 *
 * Branding comes from brand.js (window.BRAND). See README.md, "Branding for a clinic".
 */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const ACTIVITIES = window.WELLNESS_ACTIVITIES || [];
  // All words people see come from the language file (js/lang/*.js).
  const L = window.WELLNESS_LANG;
  const vibrate = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (_) { /* not supported */ } };
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------------- Brand ---------------- */

  const DEFAULT_BRAND = {
    name: 'Wellness App',
    tagline: 'A few minutes a day to keep your hands and mind active.',
    welcome: '',
    logo: '',
    logoDark: '',
    logoAlt: '',
    showName: true,
    colors: { primary: '#2F6B5E', accent: '#B4561C' },
    font: 'sans',
    contact: { text: '', website: '', websiteLabel: '' },
    finishMessage: '',
  };

  const FONTS = {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", Times, serif',
    rounded: 'ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", "Varela Round", system-ui, sans-serif',
  };

  // Theme surfaces the brand colors must stay readable against (match css/style.css).
  const THEMES = {
    l: { bg: [243, 245, 244], surface: [255, 255, 255], softMix: 0.86 },
    d: { bg: [15, 21, 19], surface: [24, 32, 29], softMix: 0.74 },
  };
  const WHITE = [255, 255, 255];
  const NEAR_BLACK = [17, 17, 17];

  function parseHex(hex) {
    if (typeof hex !== 'string') return null;
    let h = hex.trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const toHex = (rgb) => `#${rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')}`;
  function luminance(rgb) {
    const c = rgb.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function rgbToHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    return [h / 6, s, l];
  }
  function hslToRgb([h, s, l]) {
    if (s === 0) return [l * 255, l * 255, l * 255];
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const f = (t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
  }
  // Darken (on a light background) or lighten (on a dark one) until the contrast target is met.
  function fitContrast(rgb, against, min) {
    if (contrast(rgb, against) >= min) return rgb;
    const hsl = rgbToHsl(rgb);
    const darken = luminance(against) > 0.4;
    for (let i = 0; i < 60; i++) {
      hsl[2] = Math.max(0, Math.min(1, hsl[2] + (darken ? -0.02 : 0.02)));
      const out = hslToRgb(hsl);
      if (contrast(out, against) >= min) return out;
    }
    return darken ? [0, 0, 0] : [255, 255, 255];
  }
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  // A fill color and the text color to put on it, at least 4.5:1 apart.
  function fillAndText(rgb) {
    const cw = contrast(rgb, WHITE);
    const cb = contrast(rgb, NEAR_BLACK);
    if (cb >= cw && cb >= 4.5) return [rgb, NEAR_BLACK];
    if (cw >= 4.5) return [rgb, WHITE];
    return cb > cw ? [fitContrast(rgb, NEAR_BLACK, 4.5), NEAR_BLACK] : [fitContrast(rgb, WHITE, 4.5), WHITE];
  }

  function themeColors(base, theme) {
    const t = THEMES[theme];
    // Fills (buttons, markers) must stand out from the page; text must be easy to read.
    const fill = fitContrast(base, t.surface, 3);
    const [fillOk, onFill] = fillAndText(fill);
    const text = fitContrast(fitContrast(base, t.surface, 4.5), t.bg, 4.5);
    const soft = mix(base, t.surface, t.softMix);
    return { fill: toHex(fillOk), on: toHex(onFill), text: toHex(text), soft: toHex(soft) };
  }

  const isText = (v) => typeof v === 'string' && v.trim() !== '';
  // Logos must be files hosted with the site (or data: images). Other websites are blocked for privacy.
  const isLocalAsset = (v) => isText(v) && (/^data:image\//i.test(v) || (!/^[a-z][a-z0-9+.-]*:/i.test(v) && !v.startsWith('//')));
  const isHttps = (v) => isText(v) && /^https:\/\/[^\s]+$/i.test(v);

  function readBrand() {
    const b = (window.BRAND && typeof window.BRAND === 'object') ? window.BRAND : {};
    const colors = b.colors || {};
    const contact = b.contact || {};
    return {
      name: isText(b.name) ? b.name.trim() : DEFAULT_BRAND.name,
      tagline: typeof b.tagline === 'string' ? b.tagline.trim() : DEFAULT_BRAND.tagline,
      welcome: isText(b.welcome) ? b.welcome.trim() : '',
      logo: isLocalAsset(b.logo) ? b.logo.trim() : '',
      logoDark: isLocalAsset(b.logoDark) ? b.logoDark.trim() : '',
      logoAlt: isText(b.logoAlt) ? b.logoAlt.trim() : '',
      showName: b.showName !== false,
      primary: parseHex(colors.primary) || parseHex(DEFAULT_BRAND.colors.primary),
      accent: parseHex(colors.accent) || parseHex(DEFAULT_BRAND.colors.accent),
      font: FONTS[b.font] ? b.font : 'sans',
      contactText: isText(contact.text) ? contact.text.trim() : '',
      website: isHttps(contact.website) ? contact.website.trim() : '',
      websiteLabel: isText(contact.websiteLabel) ? contact.websiteLabel.trim() : '',
      finishMessage: isText(b.finishMessage) ? b.finishMessage.trim() : '',
    };
  }

  // Uses the dark-mode logo when the phone is in dark mode and one is provided.
  const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const logoFor = (brand) => ((darkQuery && darkQuery.matches && brand.logoDark) ? brand.logoDark : brand.logo);
  function setLogo(img, brand) {
    if (!brand.logo) { img.hidden = true; return; }
    img.alt = brand.logoAlt || `${brand.name} logo`;
    img.onerror = () => { img.hidden = true; };
    img.src = logoFor(brand);
    img.hidden = false;
  }
  function setContact(box, textEl, linkEl, brand) {
    textEl.textContent = brand.contactText;
    textEl.hidden = !brand.contactText;
    if (brand.website) {
      linkEl.href = brand.website;
      linkEl.textContent = brand.websiteLabel || brand.website.replace(/^https:\/\//i, '').replace(/\/$/, '');
      linkEl.hidden = false;
    } else {
      linkEl.hidden = true;
    }
    box.hidden = !brand.contactText && !brand.website;
  }

  function applyBrand() {
    const brand = readBrand();
    const root = document.documentElement.style;

    ['l', 'd'].forEach((theme) => {
      const p = themeColors(brand.primary, theme);
      const a = themeColors(brand.accent, theme);
      root.setProperty(`--b-primary-${theme}`, p.fill);
      root.setProperty(`--b-on-primary-${theme}`, p.on);
      root.setProperty(`--b-primary-text-${theme}`, p.text);
      root.setProperty(`--b-primary-soft-${theme}`, p.soft);
      root.setProperty(`--b-accent-${theme}`, a.fill);
      root.setProperty(`--b-on-accent-${theme}`, a.on);
      root.setProperty(`--b-accent-text-${theme}`, a.text);
      root.setProperty(`--b-accent-soft-${theme}`, a.soft);
    });
    root.setProperty('--b-font', FONTS[brand.font]);

    document.title = brand.name;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = themeColors(brand.primary, 'l').fill;

    const h1 = $('#brand-name');
    h1.textContent = brand.name;
    h1.classList.toggle('visually-hidden', !brand.showName && Boolean(brand.logo));
    $('#brand-tagline').textContent = brand.tagline;
    $('#brand-tagline').hidden = !brand.tagline;
    $('#brand-welcome').textContent = brand.welcome;
    $('#brand-welcome').hidden = !brand.welcome;

    const logos = [$('#brand-logo'), $('#bar-logo'), $('#finish-logo')];
    logos.forEach((img) => setLogo(img, brand));
    if (darkQuery && brand.logoDark) {
      const swap = () => logos.forEach((img) => setLogo(img, brand));
      if (darkQuery.addEventListener) darkQuery.addEventListener('change', swap);
      else if (darkQuery.addListener) darkQuery.addListener(swap);
    }
    // The logo is decorative where the name is already said nearby.
    $('#bar-logo').alt = '';
    $('#finish-logo').alt = '';

    setContact($('#brand-contact'), $('#brand-contact-text'), $('#brand-website'), brand);
    setContact($('#finish-contact'), $('#finish-contact-text'), $('#finish-website'), brand);

    $('#finish-message').textContent = brand.finishMessage;
    $('#finish-message').hidden = !brand.finishMessage;
  }

  /* ---------------- Screens ---------------- */

  const screens = Array.from(document.querySelectorAll('.screen'));
  function show(id) {
    screens.forEach((s) => { s.hidden = s.id !== id; });
    const screen = document.getElementById(id);
    screen.scrollTop = 0;
    const heading = screen.querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  /* ---------------- Level ---------------- */

  let level = 'easy';
  document.querySelectorAll('.level-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      level = btn.dataset.level;
      document.querySelectorAll('.level-option').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });

  /* ---------------- Session ---------------- */

  const GROUPS = [['hand'], ['thinking'], ['phone']];
  const groupName = (g) => L.ui.groups[g] || '';
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let session = [];
  let index = 0;
  let lastIds = [];
  let cleanups = [];
  let resizeHandlers = [];
  let timers = [];

  // One activity from each group, picked at random. Avoids repeating the last session's picks when possible.
  function buildSession() {
    const picks = GROUPS.map(([g]) => {
      const pool = ACTIVITIES.filter((a) => a.group === g);
      const fresh = pool.filter((a) => !lastIds.includes(a.id));
      return pick(fresh.length ? fresh : pool);
    }).filter(Boolean);
    lastIds = picks.map((a) => a.id);
    return picks;
  }

  function teardown() {
    timers.forEach(clearTimeout);
    timers = [];
    cleanups.forEach((fn) => { try { fn(); } catch (_) { /* ignore */ } });
    cleanups = [];
    resizeHandlers = [];
    $('#act-area').textContent = '';
    $('#act-actions').textContent = '';
    say('');
  }

  const feedbackEl = $('#act-feedback');
  function say(text, good) {
    feedbackEl.textContent = text || '';
    feedbackEl.classList.toggle('is-good', Boolean(good));
  }

  function makeButton(label, kind) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `btn ${kind === 'primary' ? 'btn-primary' : 'btn-secondary'}`;
    b.textContent = label;
    $('#act-actions').appendChild(b);
    return b;
  }

  function beginSession(list, chosenLevel) {
    if (chosenLevel) level = chosenLevel;
    session = list;
    index = 0;
    show('activity');
    runActivity();
  }

  function runActivity() {
    teardown();
    const activity = session[index];
    $('#act-step').textContent = L.ui.step(index + 1, session.length);
    $('#act-step').setAttribute('aria-label', L.ui.stepLabel(index + 1, session.length));
    $('#act-group').textContent = groupName(activity.group);
    $('#act-title').textContent = activity.title;
    $('#act-instruction').textContent = activity.instruction(level);
    $('#activity').scrollTop = 0;

    let finished = false;
    const api = {
      area: $('#act-area'),
      level,
      say,
      vibrate,
      cssVar,
      button: makeButton,
      setInstruction: (text) => { $('#act-instruction').textContent = text; },
      later: (fn, ms) => { timers.push(setTimeout(fn, ms)); },
      onResize: (fn) => { resizeHandlers.push(fn); },
      onCleanup: (fn) => { cleanups.push(fn); },
      done(message) {
        if (finished) return;
        finished = true;
        say(message || L.ui.wellDone, true);
        vibrate([40, 60, 40]);
        $('#act-actions').textContent = '';
        const last = index === session.length - 1;
        const next = makeButton(last ? L.ui.finish : L.ui.nextActivity, 'primary');
        next.addEventListener('click', () => {
          if (last) finishSession();
          else { index += 1; runActivity(); }
        });
        next.focus({ preventScroll: false });
      },
    };
    activity.mount(api);
    const heading = $('#act-title');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }

  function finishSession() {
    teardown();
    show('finish');
  }

  function goHome() {
    teardown();
    show('start');
  }

  $('#start-button').addEventListener('click', () => beginSession(buildSession()));
  $('#again-button').addEventListener('click', () => beginSession(buildSession()));
  $('#home-button').addEventListener('click', goHome);
  $('#end-button').addEventListener('click', () => show('confirm'));
  $('#keep-going').addEventListener('click', () => {
    screens.forEach((s) => { s.hidden = s.id !== 'activity'; });
    $('#act-title').focus({ preventScroll: true });
  });
  $('#confirm-end').addEventListener('click', goHome);

  // Re-fit drawing areas when the screen rotates or changes size noticeably.
  let resizeTimer = null;
  let lastSize = [window.innerWidth, window.innerHeight];
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const size = [window.innerWidth, window.innerHeight];
      // Small height changes (a phone's address bar or keyboard) are ignored so a drawing isn't wiped.
      if (Math.abs(size[0] - lastSize[0]) < 2 && Math.abs(size[1] - lastSize[1]) < 120) return;
      lastSize = size;
      if ($('#activity').hidden) return;
      resizeHandlers.forEach((fn) => fn());
    }, 200);
  });

  // Fill the page's fixed text from the language file.
  function applyLanguage() {
    document.documentElement.lang = L.code || 'en';
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const text = L.ui[node.dataset.i18n];
      if (typeof text === 'string') node.textContent = text;
    });
  }

  applyLanguage();
  applyBrand();
})();
