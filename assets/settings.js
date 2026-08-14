/* ELC Portal family settings (issues 0154/0155, PRD 0004).

   One cog in the top right of every app page; behind it the two device-local
   preferences: which centre the portal opens on, and light or dark. Built on the
   install.js pattern: self-contained chrome that injects its own button, dialog
   and styles, consuming tokens.css custom properties only (ADR-0002).

   This file is loaded in <head>, BEFORE the stylesheets paint the body, because it
   doubles as the theme bootstrap: dark mode must land on <html> before first paint
   or every navigation flashes light. Everything DOM-heavy waits for DOMContentLoaded.

   Storage: one JSON blob, localStorage 'elcp:settings' =
     { campus: 'city' | 'pe-thong-lor' | 'pe-samakee', theme: 'light' | 'dark',
       text: 'default' | 'large' | 'xl' }
   A missing key, an unknown value, a malformed blob, or private mode all mean
   today's behaviour exactly: City, light, default text. Unknown keys are ignored
   rather than preserved, so a later version adding one costs no migration, which
   is why the 'text' key (issue 0173) needed none. */
(function () {
  'use strict';

  var KEY = 'elcp:settings';
  var THEME_COLOR = { light: '#F4F2EA', dark: '#17141B' };   // dark = --paper (handback-0155 watch item 4)
  var CAMPUS_PATH = {
    'pe-thong-lor': 'purple-elephant/thong-lor/',
    'pe-samakee': 'purple-elephant/samakee/'
  };
  var CAMPUS_LABEL = {
    'city': 'The City School',
    'pe-thong-lor': 'The Purple Elephant Thong Lor',
    'pe-samakee': 'The Purple Elephant Samakee'
  };
  /* Text size (issue 0173): three steps, not a slider: every step is a state
     somebody has to be able to verify on a real page. 'default' writes no
     attribute, so Default renders byte-identical to before this shipped. */
  var TEXT_LABEL = { 'default': 'Default', 'large': 'Large', 'xl': 'Extra large' };

  function load() {
    var s = { campus: 'city', theme: 'light', text: 'default' };
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var got = JSON.parse(raw);
        if (CAMPUS_LABEL[got.campus]) s.campus = got.campus;
        if (got.theme === 'dark') s.theme = 'dark';
        if (TEXT_LABEL[got.text]) s.text = got.text;
      }
    } catch (e) { /* private mode or bad blob: defaults stand */ }
    return s;
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  /* Site root, derived from this script's own src ('assets/settings.js' at root,
     '../assets/settings.js' one level down): the same depth problem the search
     widget solves with data-root, solved here without needing the DOM. */
  var BASE = (function () {
    var src = (document.currentScript && document.currentScript.src) || '';
    return src.replace(/assets\/settings\.js.*$/, '');
  })();

  var settings = load();

  /* --- theme bootstrap: runs now, pre-paint --- */
  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', THEME_COLOR[theme] || THEME_COLOR.light);
  }
  applyTheme(settings.theme);

  /* --- text size bootstrap: same pre-paint seam as the theme, and for the same
         reason. The attribute has to land before the stylesheets paint or every
         navigation flashes at the wrong size. --- */
  function applyText(text) {
    if (text === 'large' || text === 'xl') document.documentElement.setAttribute('data-textsize', text);
    else document.documentElement.removeAttribute('data-textsize');
  }
  applyText(settings.text);

  /* --- default centre: redirect once per browser SESSION, at root entry only ---
     The entry flag is set on every page load, so following any link (including the
     campus switcher back to City) never re-triggers the redirect; only a fresh
     open of the portal at the root does. location.replace keeps the back button
     honest: the redirect leaves no history entry to bounce off. */
  var atHome = document.documentElement.getAttribute('data-template') === 'home';
  var entered = null;
  try { entered = sessionStorage.getItem('elcp:entered'); } catch (e) {}
  if (atHome && !entered && CAMPUS_PATH[settings.campus]) {
    try { sessionStorage.setItem('elcp:entered', '1'); } catch (e) {}
    location.replace(BASE + CAMPUS_PATH[settings.campus]);
    return;   // navigating away: build no UI on the page being left
  }
  try { sessionStorage.setItem('elcp:entered', '1'); } catch (e) {}

  /* --- everything below is UI and waits for the DOM --- */

  var css =
    '#settings-cog{display:inline-flex;align-items:center;justify-content:center;' +
    'width:34px;height:34px;margin-left:12px;flex:none;cursor:pointer;' +
    'background:none;border:none;border-radius:50%;color:var(--muted);}' +
    '#settings-cog:hover{color:var(--aubergine);background:var(--rule-2);}' +
    '#settings-cog svg{width:19px;height:19px;stroke:currentColor;stroke-width:1.6;' +
    'fill:none;stroke-linecap:round;stroke-linejoin:round;}' +
    '#settings-panel{margin:auto;border:1px solid var(--rule);border-top:2px solid var(--purple);' +
    'border-radius:12px;background:var(--white);color:var(--ink);' +
    'font-family:var(--sans);padding:26px 28px;max-width:440px;width:calc(100% - 32px);}' +
    '#settings-panel::backdrop{background:rgba(31,25,40,0.44);}' +
    '#settings-panel h2{font-family:var(--serif);font-weight:400;font-size:24px;' +
    'line-height:1.15;margin:0 0 4px;}' +
    '#settings-panel .sp-sub{font-size:13px;color:var(--muted);margin:0 0 18px;}' +
    '#settings-panel fieldset{border:none;border-top:1px solid var(--rule-2);' +
    'margin:0;padding:14px 0 12px;}' +
    '#settings-panel legend{font-family:var(--mono);font-size:11px;letter-spacing:.08em;' +
    'text-transform:uppercase;color:var(--gold-deep);padding:0 0 6px;}' +
    '#settings-panel label{display:flex;align-items:center;gap:10px;font-weight:300;' +
    'font-size:14.5px;line-height:1.5;color:var(--charcoal);padding:5px 0;cursor:pointer;}' +
    '#settings-panel input{accent-color:var(--purple);width:16px;height:16px;flex:none;}' +
    '#settings-panel .sp-note{font-size:12.5px;color:var(--muted);margin:6px 0 0;}' +
    '#settings-panel .sp-actions{display:flex;justify-content:flex-end;margin-top:16px;}' +
    '#settings-panel .sp-close{background:var(--aubergine);color:var(--white-pure);' +
    'border:1px solid var(--aubergine);border-radius:6px;font-family:var(--sans);' +
    'font-weight:600;font-size:13.5px;padding:9px 18px;cursor:pointer;}';

  var COG_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="3.2"/>' +
    '<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.08a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56h.08a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.08a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.03z"/></svg>';

  function buildPanel() {
    var dlg = document.createElement('dialog');
    dlg.id = 'settings-panel';

    var campusRows = Object.keys(CAMPUS_LABEL).map(function (k) {
      return '<label><input type="radio" name="sp-campus" value="' + k + '"' +
        (settings.campus === k ? ' checked' : '') + '>' + CAMPUS_LABEL[k] + '</label>';
    }).join('');

    var textRows = Object.keys(TEXT_LABEL).map(function (k) {
      return '<label><input type="radio" name="sp-text" value="' + k + '"' +
        (settings.text === k ? ' checked' : '') + '>' + TEXT_LABEL[k] + '</label>';
    }).join('');

    dlg.innerHTML =
      '<h2>Settings</h2>' +
      '<p class="sp-sub">Saved on this device only.</p>' +
      '<fieldset><legend>Opens on</legend>' + campusRows +
      '<p class="sp-note">The portal starts on this centre’s page. You can always move between centres from the menu.</p></fieldset>' +
      '<fieldset><legend>Appearance</legend>' +
      '<label><input type="radio" name="sp-theme" value="light"' + (settings.theme !== 'dark' ? ' checked' : '') + '>Light</label>' +
      '<label><input type="radio" name="sp-theme" value="dark"' + (settings.theme === 'dark' ? ' checked' : '') + '>Dark</label>' +
      '</fieldset>' +
      '<fieldset><legend>Text size</legend>' + textRows +
      '<p class="sp-note">Makes the page bigger, not just the words, so nothing crowds. The menus and the printed calendar stay the same size.</p></fieldset>' +
      '<div class="sp-actions"><button type="button" class="sp-close">Done</button></div>';

    document.body.appendChild(dlg);
    dlg.querySelector('.sp-close').addEventListener('click', function () { dlg.close(); });

    dlg.querySelectorAll('input[name="sp-campus"]').forEach(function (r) {
      r.addEventListener('change', function () { settings.campus = r.value; save(settings); });
    });
    dlg.querySelectorAll('input[name="sp-theme"]').forEach(function (r) {
      r.addEventListener('change', function () {
        settings.theme = r.value;
        save(settings);
        applyTheme(settings.theme);
      });
    });
    dlg.querySelectorAll('input[name="sp-text"]').forEach(function (r) {
      r.addEventListener('change', function () {
        settings.text = r.value;
        save(settings);
        applyText(settings.text);
      });
    });

    return dlg;
  }

  function initUI() {
    var header = document.querySelector('header');
    if (!header || document.getElementById('settings-cog')) return;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var cog = document.createElement('button');
    cog.id = 'settings-cog';
    cog.type = 'button';
    cog.setAttribute('aria-label', 'Settings');
    cog.setAttribute('aria-haspopup', 'dialog');
    cog.innerHTML = COG_SVG;
    header.appendChild(cog);

    var dlg = null;
    cog.addEventListener('click', function () {
      if (!dlg) dlg = buildPanel();
      dlg.showModal();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUI);
  else initUI();
})();
