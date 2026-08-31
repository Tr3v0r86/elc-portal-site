/* ELC Portal install affordance (issue 0076).

   Takes the bottom-left slot the deploy-injected project-window pill (#pw-pill)
   holds internally. That pill does not ship to v1, so at launch this is the only
   bottom-left chrome (Trevor 2026-07-26).

   Why this exists: the Portal never had install UI. It leaned on Chrome's own
   mini-infobar, which Chrome shows once per origin and then withdraws after an
   install-then-uninstall, so the install path vanished with nothing behind it. We
   now capture beforeinstallprompt ourselves and preventDefault it, which suppresses
   Chrome's one-shot bar and hands us the event to fire on demand.

   The affordance does NOT wait for that event on Android (2026-07-28, Trevor's
   Pixel): Chrome can withhold beforeinstallprompt entirely, for an unobservable
   stretch after an uninstall, and the first build only rendered the pill FROM the
   event, so a withheld event meant no install UI at all, which is the original bug
   wearing a new coat. Android now renders the pill unconditionally; a captured
   event upgrades the tap to the native prompt, and without one the tap coaches the
   menu path (browser menu, then Add to Home screen), which always exists.

   iOS Safari never fires beforeinstallprompt: Add to Home Screen is Share-sheet only,
   so iOS gets the two steps as a coach card. Line's in-app browser cannot install at
   all, and Bangkok families open links from inside it constantly, so it gets pointed
   out to a real browser (same detection render.js already uses for the
   coffee-mornings hint).

   Not every iOS browser is Safari, and telling someone to use a toolbar they do not have
   is a dead end (Adam, 2026-08-06: "I tried to Install App but it was giving me
   directions for Safari (which I don't use)"). Chrome, Firefox and Edge on iOS all carry
   Add to Home Screen behind their own menu instead of the Safari share toolbar, so they
   get their own two steps: same branch, different words.

   Styles consume tokens.css custom properties only (ADR-0002).
   Self-check: node tools/install-mode.test.mjs */
(function () {
  'use strict';

  /* Pure branch selector. Keep it DOM-free: the self-check imports this file so the
     branch map can never drift from what deploys.
     ponytail: iPadOS 13+ reports as Macintosh, so an iPad in Safari lands on 'none'
     rather than 'ios'. Upgrade path if that starts to matter: take
     navigator.maxTouchPoints as a fourth argument and treat Macintosh plus touch as
     iOS. Not done now because phones do not hit it. */
  function mode(ua, standalone, hasPrompt) {
    if (standalone) return 'none';              // already installed, nothing to offer
    if (hasPrompt) return 'prompt';             // Chromium: drive the real prompt
    // In-app browsers cannot add to the home screen at all, and coaching a toolbar
    // they do not have is the Adam-2026-08-06 dead end from another direction. ELC
    // pushes portal links by email and LINE and families forward them on from there,
    // so Facebook, Messenger, Instagram and WeChat are live paths, not theoretical.
    if (/\bLine\/|FBAN|FBAV|FB_IAB|Instagram|MicroMessenger/i.test(ua)) return 'inapp';
    if (/iPhone|iPad|iPod/i.test(ua)) {
      // Every browser on iOS is WebKit, so none of them fires the prompt event, but only
      // Safari puts Add to Home Screen behind the toolbar Share button. Chrome (CriOS),
      // Firefox (FxiOS), Edge (EdgiOS) and Opera (OPT) keep it in their own menu.
      return /CriOS|FxiOS|EdgiOS|OPT\//.test(ua) ? 'iosmenu' : 'ios';
    }
    if (/Android/i.test(ua)) return 'android';  // pill now, event may upgrade the tap
    return 'none';                              // no install path we can offer
  }

  // The Node self-check imports this file, where there is no DOM to wire.
  if (typeof window === 'undefined') { globalThis.__portalInstallMode = mode; return; }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      navigator.standalone === true;
  }

  // Already running as the app: never render, and never listen.
  if (isStandalone()) return;

  var deferred = null;
  var pill = null;

  /* Geometry mirrors #pw-pill exactly so this drops into that slot unchanged when the
     project window retires at v1. Whether the primary install CTA should stay a quiet
     outline pill or take a filled treatment is Claude Design's call (rule 7). */
  var css =
    '#install-pill{position:fixed;bottom:26px;left:26px;z-index:9998;' +
    'display:none;align-items:center;gap:8px;' +
    'font-family:var(--mono);font-size:12px;letter-spacing:.04em;' +
    'color:var(--aubergine);background:var(--paper);' +
    'border:1px solid var(--aubergine);border-radius:999px;' +
    'padding:9px 14px;cursor:pointer;white-space:nowrap;}' +
    '#install-pill.on{display:inline-flex;}' +
    '#install-pill svg{width:13px;height:13px;stroke:var(--aubergine);stroke-width:1.8;' +
    'fill:none;flex:none;}' +
    '@media(max-width:720px){#install-pill{bottom:80px;left:16px;' +
    'font-size:11.5px;padding:8px 12px;}}' +
    '#install-coach{border:1px solid var(--rule);border-top:2px solid var(--purple);' +
    'border-radius:12px;background:var(--white);color:var(--ink);' +
    'font-family:var(--sans);padding:24px 26px;max-width:420px;width:calc(100% - 32px);}' +
    '#install-coach::backdrop{background:rgba(31,25,40,0.44);}' +
    '#install-coach h2{font-family:var(--serif);font-weight:400;font-size:22px;' +
    'line-height:1.15;margin-bottom:12px;}' +
    '#install-coach p,#install-coach li{font-weight:300;font-size:14.5px;line-height:1.6;' +
    'color:var(--charcoal);}' +
    '#install-coach ol{margin:0 0 18px 18px;}' +
    '#install-coach li{margin-bottom:9px;}' +
    /* Glyph chip: the icon a parent is hunting for, at reading size, inline in the
       sentence that names it. Borrowed wholesale from the pill's icon spec above
       (13px, 1.8 stroke, --aubergine) so the two read as one family, in a --rule
       box on --paper so it reads as a button rather than as decoration. */
    '#install-coach .gl{display:inline-flex;align-items:center;justify-content:center;' +
    'width:22px;height:22px;vertical-align:-6px;margin:0 3px;' +
    'border:1px solid var(--rule);border-radius:5px;background:var(--paper);}' +
    '#install-coach .gl svg{width:13px;height:13px;stroke:var(--aubergine);' +
    'stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round;}' +
    '#install-coach button{background:var(--aubergine);color:var(--white-pure);' +
    'border:1px solid var(--aubergine);border-radius:6px;font-family:var(--sans);' +
    'font-weight:600;font-size:13.5px;padding:10px 18px;cursor:pointer;}';

  /* Inline 24x24 stroke paths, not a sprite entry: install.js injects itself onto pages
     at three different directory depths, so a <use href="assets/img/icons.svg#..."> here
     would need a relative path this file cannot know. The pill above already carries its
     glyph inline for the same reason. Geometry follows the sprite's conventions: 24 box,
     integer coordinates, round caps, stroke only.

     Each mark is the platform's own, drawn to be recognised rather than to be pretty. The
     iOS Share mark is a tray with the arrow breaking out through its top edge, which is
     why the shaft overlaps the box. Chrome's menu is three dots HORIZONTAL on iOS and
     VERTICAL on Android, so those are two glyphs, not one reused. */
  var ICONS = {
    share:   '<path d="M8 12H5v8h14v-8h-3"/><path d="M12 3v10"/><path d="M8 7l4-4 4 4"/>',
    dotsh:   '<circle cx="6" cy="12" r="1.5" fill="var(--aubergine)" stroke="none"/>' +
             '<circle cx="12" cy="12" r="1.5" fill="var(--aubergine)" stroke="none"/>' +
             '<circle cx="18" cy="12" r="1.5" fill="var(--aubergine)" stroke="none"/>',
    dotsv:   '<circle cx="12" cy="6" r="1.5" fill="var(--aubergine)" stroke="none"/>' +
             '<circle cx="12" cy="12" r="1.5" fill="var(--aubergine)" stroke="none"/>' +
             '<circle cx="12" cy="18" r="1.5" fill="var(--aubergine)" stroke="none"/>',
    addhome: '<path d="M4 4h16v16H4z"/><path d="M12 9v6"/><path d="M9 12h6"/>',
    openout: '<path d="M10 6H5v13h13v-5"/><path d="M14 5h5v5"/><path d="M19 5l-8 8"/>'
  };

  /* A step is an array of parts. A string part is text; an object part is a glyph chip.
     Deliberately NOT a plain string any more: the old shape set li.textContent, which
     cannot carry an element, and a card that only NAMES an unlabelled icon is the whole
     defect (issue 0207). Rewritten by 0205 (relay #162, a parent stuck on an
     iPhone): the old two steps named the right two actions and described neither
     findably. Safari auto-hides the bottom bar on scroll, so getting it back is now
     step 1; Add to Home Screen sits below the app row in the share sheet, so the drag
     is its own step; and the Add confirm is stated rather than assumed.
     The bottom-centre claim is a deliberate trade: Safari's toolbar moves to the top
     under the Single Tab layout, so that sentence is wrong for a minority, where
     'somewhere on screen' was useless to everyone. The glyph carries the invariant
     either way.
     ponytail: iosmenu stays ONE branch for Chrome, Firefox, Edge and Opera rather than
     four. Their menus differ by position, not by name, and a confidently wrong position
     is worse than naming the icon. Split it only if a family reports being stuck. */
  var COACH = {
    ios: {
      title: 'Add the Portal to your home screen',
      steps: [['If there is no toolbar along the bottom of the screen, scroll down once to bring it back.'],
        ['Tap the', { i: 'share' }, ' Share button in that toolbar, bottom centre.'],
        ['Slide the sheet upwards, past the row of apps, then choose', { i: 'addhome' }, ' Add to Home Screen.'],
        ['Tap Add, top right.']]
    },
    iosmenu: {
      title: 'Add the Portal to your home screen',
      steps: [['Tap the browser menu, the', { i: 'dotsh' }, ' three dots in your browser toolbar.'],
        ['Scroll down the menu, then choose', { i: 'addhome' }, ' Add to Home Screen.'],
        ['Tap Add.']]
    },
    android: {
      title: 'Add the Portal to your home screen',
      steps: [['Tap the browser menu, the', { i: 'dotsv' }, ' three dots, top right.'],
        ['Choose', { i: 'addhome' }, ' Add to Home screen. Some phones say Install app instead: either one is right.'],
        ['Tap Install to confirm.']]
    },
    inapp: {
      title: 'Open the Portal in your browser first',
      steps: [['You are in an app\'s own built-in browser, and it cannot add anything to the home screen.'],
        ['Tap the menu, then choose', { i: 'openout' }, ' Open in browser.'],
        ['In Safari or Chrome, tap Install app again and follow the steps there.']]
    }
  };

  /* Text parts go in as text nodes, never as markup: the strings above are ours, but
     building them with innerHTML would leave a hole for the next person to widen. */
  function buildStep(parts) {
    var li = document.createElement('li');
    parts.forEach(function (part) {
      if (typeof part === 'string') { li.appendChild(document.createTextNode(part)); return; }
      var chip = document.createElement('span');
      chip.className = 'gl';
      chip.setAttribute('aria-hidden', 'true');
      chip.innerHTML = '<svg viewBox="0 0 24 24">' + ICONS[part.i] + '</svg>';
      li.appendChild(chip);
    });
    return li;
  }

  function render(kind) {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    pill = document.createElement('button');
    pill.id = 'install-pill';
    pill.type = 'button';
    pill.className = 'on';
    pill.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/>' +
      '<path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>Install app';
    document.body.appendChild(pill);

    var copy = COACH[kind];
    var dlg = null;
    if (copy) {
      dlg = document.createElement('dialog');
      dlg.id = 'install-coach';
      dlg.innerHTML = '<h2></h2><ol></ol><button type="button">Got it</button>';
      dlg.querySelector('h2').textContent = copy.title;
      copy.steps.forEach(function (step) {
        dlg.querySelector('ol').appendChild(buildStep(step));
      });
      document.body.appendChild(dlg);
      dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
    }

    /* ONE handler, decided at tap time, because the capabilities change under the
       pill: on Android the event can land (or be consumed) after render. Captured
       event -> the native prompt; none -> the coach card; neither (desktop 'prompt'
       pill whose event was consumed) -> nothing, honestly inert. */
    pill.addEventListener('click', function () {
      if (deferred) {
        var ev = deferred;
        // Kept only until it is used: a prompt event cannot be fired twice.
        deferred = null;
        ev.prompt();
        ev.userChoice.then(function (choice) {
          if (choice && choice.outcome === 'accepted') hide();
        });
        return;
      }
      // Native <dialog>: focus trap and Escape come from the platform, not from us.
      if (dlg) dlg.showModal();
    });
  }

  function hide() {
    if (pill) pill.classList.remove('on');
  }

  /* Chromium fires this once the app qualifies, after the manifest and SW settle, so
     an end-of-body listener is early enough. preventDefault kills Chrome's own bar. */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    if (!pill) render('prompt');
  });

  window.addEventListener('appinstalled', function () {
    deferred = null;
    hide();
  });

  /* Startup branches resolve on load without waiting for any event: iOS and in-app
     never get one, and Android must not depend on one (a withheld event meant no
     install UI at all, the original bug). 'prompt' is deliberately absent here:
     hasPrompt is false until the event lands, and the listener above renders it the
     moment it does (desktop Chromium); on an already-rendered Android pill the event
     just upgrades the tap. */
  var startup = mode(navigator.userAgent || '', false, false);
  if (startup !== 'none') render(startup);
})();
