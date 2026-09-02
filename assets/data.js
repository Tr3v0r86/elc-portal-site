/* ELC Portal: volatile content. One edit here updates every surface.
   Pages render these islands via assets/render.js. Statuses are honest
   (rule 6): football live, the rest open 7 Sep. */
window.PORTAL = {
  // version + build: render.js stamps these into the footer fine print (.fine) on
  // every page, so the stamp refreshes the instant this network-first file lands
  // (0061): one edit here restamps the whole site, the reviewer's tell that
  // update-propagation worked. feedback.js payloads also read version. The MASTHEAD
  // tape (.tape) stays shell-owned, hardcoded per page: bump it in the v0.8 stamp
  // pass. build = deploy date of the current shell (honest, not the viewer's clock).
  // BUILD METADATA (issue 0153): version · build · term are set by the deploy pass,
  // not by a content editor. Third custody class in this file, alongside the
  // BEGIN/END SHEET-OWNED fences and the HAND-KEPT marks. Leave these alone when you
  // are here to change content: they are stamped when the site ships.
  version: 'v1.0',
  build: '8 Aug',
  term: 'Term 1',

  // Live-feed subscribe controls (ADR-0006, superseded-for-launch by issue 0077). The UI
  // came off every calendar page on 2026-08-03 and the flip is frozen: launch advertises
  // no subscription at all. Feeds still build each deploy, unadvertised. Re-flip = restore
  // a [data-subscribe] row + set this true; render.js wires the rest.
  subscribeLive: false,

  // Academic-year bounds for the calendar print "academic year" range (0058). A full
  // span that brackets the school year's dated events (first 3 Aug 2026, last 28 Jul
  // 2027), NOT a claim about the exact first/last school day: those live in
  // calendarEvents ("K2 to Y6 first day of school" 18 Aug, "Last day of the school
  // year" 17 Jun). Date authority = the City School calendar SSOT
  // (docs/sources/calendars.md); widen if events ever fall outside. Used full-span,
  // never today-anchored.
  academicYear: { start: '2026-08-01', end: '2027-07-31' },

  // Workshops + coffee mornings programme switch (issues 0112 / 0127 / 0137; the socials
  // are called coffee mornings since 0227).
  // MOVED OUT OF render.js 2026-08-11 (Trevor, ADR-0013). It was `DETAILS_DUE =
  // '2026-08-14'` inside the frozen renderer, which meant the entire programme
  // published ITSELF at Bangkok midnight on the 14th, and the date could not be moved
  // without editing a frozen surface. It is now a switch thrown by hand: there is no
  // date arithmetic left, so nothing here fires on a clock.
  //   published: false -> the "coming on <date>" hold copy shows; the workshops and
  //                       coffee mornings listings stay off the community page
  //   published: true  -> hold copy goes, both listings publish
  // Absent island = treated as still waiting, so a stripped data.js can never publish
  // an unfinished programme. The two strings below are the exact parent-facing copy, so
  // changing the date is one edit in one place and nothing is assembled from anything.
  // tools/check-coming-up.mjs reads `published` too: the gate's page-owed grace and the
  // page's hold copy are now the same switch, never two dates that can disagree.
  programme: {
    published: true,   // flipped 2026-08-25: first workshop batch landed in the SSOT (titles, subs, Jotform links)
    dueShort: 'Coming the week of 17 August',
    dueLong: 'The programme is coming the week of 17 August.'
  },

  // Pages still being finalised (sprint 3 D5). render.js prepends a visible
  // "We are finalising this page" chip on any page whose content-root data-page key
  // is listed here. Removing a key = that page's verify-artifact row is signed off
  // (docs/verify-v0.5.md).
  // 0080 (2026-08-03): gate-card + the 7 armonia slugs dropped (pages archived).
  // 2026-08-05: glossary + community-giving dropped (pages archived, Trevor).
  // 0135 + 0136: the two holding pages are drafts by definition, so the chip says so
  // rather than leaving a family to guess why a page has no details on it.
  // 2026-08-13 (Trevor): hopes-and-wishes dropped. Dates, teachers and the booking
  // links are all real now, so the chip was the last thing on the page still hedging.
  // 0171: extended-hours was added 2026-08-14 AM and dropped the same day PM. The facts
  // landed (Trevor, from Anna and Briana's programme) and the page now states them all;
  // the only thing pending is the Jotform link, and its own row says exactly when it
  // arrives (Monday 17 August), so a draft chip would hedge a page that is no longer
  // hedging. Same close-out the hopes-and-wishes drop above set on 2026-08-13.
  // 0049: coffee-mornings dropped 2026-08-26 (Trevor). Five of the six cohorts carry
  // their deck; Dove stays on the page with no deck and, since the same day, no slides
  // line at all, so nothing on the page is pending an answer any more. Same close-out
  // as hopes-and-wishes and extended-hours above.
  // 0161: pe-samakee-nuts-and-bolts dropped 2026-08-31 (Trevor). The page states
  // Isabella's card, Samakee's own phone line and email, and the Parent App row;
  // nothing on it is pending an answer, so the chip was hedging a page that is not.
  draftPages: ['photo-consent', 'how-to-pay',
               'nuts-and-bolts', 'loy-krathong',
               'library'],

  // School status (issue 0031 item 1). null = normal day, no banner anywhere.
  // To raise a notice, replace null with an object and deploy (see docs/runbook.md):
  //   status: { level: 'notice',                 // 'notice' (gold) or 'alert' (red)
  //             title: 'Early pickup today',
  //             body: 'All campuses close at 1pm. Buses leave at 1:15.',
  //             expires: '2026-08-20' }          // last day the banner shows; it kills itself after
  // BEGIN SHEET-OWNED: status
  status: null,
  // END SHEET-OWNED: status

  // Outdoor air quality (sprint 3 F4). null = no air tile anywhere (it is hidden).
  // When the outdoor-play call is made (runbook, manual for now), set the level so
  // the home tile and the status page show today's decision:
  //   air: { level: 'caution',                 // 'good' | 'caution' | 'indoor'
  //          note: 'Short outdoor breaks only.',
  //          updated: 'today, 9am' }            // shown verbatim after "Updated "
  // BEGIN SHEET-OWNED: air
  air: null,
  // END SHEET-OWNED: air

  // Contacts: the single edit point every contact chip on the site reads from.
  // phone: null renders as "Coming" until the real number is supplied (rule 6).
  // ⚠️ office@ per people directory (Praveen); Trevor to verify parent-facing (issue 0031).
  contacts: {
    office:     { label: 'School office',   email: 'office@elc.ac.th',     phone: '+66 (0)2 381 2919' },
    activities: { label: 'Activities team', email: 'activities@elc.ac.th', phone: '+66 (0)2 381 2919' },
    // Nurse Apple, per the comms Nuts & Bolts doc (docs/sources/nuts-and-bolts-doc.md).
    // No dedicated nurse line: the school number reaches her (Trevor, 2026-07-17).
    nurse:      { label: 'School nurse',    email: 'apples@elc.ac.th',     phone: '+66 (0)2 381 2919' },
    // Safeguarding concerns go to the child protection officer, NOT the office
    // (Trevor 2026-08-05). Email only: no dedicated phone line given.
    cp:         { label: 'Child protection officer', email: 'cp-officer@elc.ac.th' },
    // PDPA and data requests go to the data protection address, NOT the office
    // (Trevor 2026-08-06, relay #60, issue 0125). Email only, same shape as cp:
    // no dedicated line was given and "Phone coming" would be a false promise.
    dataprotection: { label: 'Data protection', email: 'dataprotection@elc.ac.th' },
    // Trevor himself, for the note's "email me" link (issue 0138, relay #62). Lives here
    // rather than as a raw mailto in the note so the address has one edit point like
    // every other on the site. No phone: families reach him in person or by mail.
    trevor:     { label: 'Trevor Cardozo', email: 'trevorc@elc.ac.th' },
    // The Purple Elephant Samakee runs its own line and its own inbox: the centre is in
    // Nonthaburi, not Thong Lor, so the school office number reaches the wrong building
    // (issue 0161, Trevor 2026-08-10). Number + address per the centre's public page,
    // https://www.elc.ac.th/schools/purple-elephant-samakee/
    samakee:    { label: 'The Purple Elephant Samakee', email: 'purpleelephant.samakee@elc.ac.th', phone: '+66 (0)2 003 5185' },
    // Isabella Hydon, centre head and administrator at Samakee (Trevor 2026-08-10).
    // Email only: families reach the centre itself on the samakee line above.
    isabella:   { label: 'Isabella Hydon', email: 'isabellah@elc.ac.th' },
    // Blue Jade run the bus. Both are the vendor's own parent-facing lines, given by Sarah
    // 2026-08-17 (issue 0044): the email is the address families are asked to whitelist, and
    // the hotline is the only number that reaches a moving bus. Sarah's reply typed the
    // hotline with an extra trailing digit; Trevor confirmed the correct 10-digit number
    // 2026-08-17. NOT the school office: a bus question routed to the office loses the driver.
    bluejade:   { label: 'Blue Jade transport', email: 'transportELC@blue-jade.com', phone: '+66 (0)62 862 4613' }
  },

  // Office hours per campus (sprint 3 P7). null renders one honest "Office hours
  // coming" row wherever [data-strip="office"] appears (gate card, help, contacts).
  // Fill when confirmed:
  //   officeHours: [
  //     { campus: 'The City School', hours: 'Mon to Fri, 7:30am to 4:30pm', note: '' },
  //     { campus: 'Dove Centre',      hours: 'Mon to Fri, 8am to 4pm',       note: 'Term time only' }
  //   ]
  // BEGIN SHEET-OWNED: officeHours
  officeHours: null,
  // END SHEET-OWNED: officeHours

  // Registration windows RETIRED (P4 pass A, 2026-07-19): the two sport rows moved
  // into calendarEvents (2026-08-20 info evening, 2026-09-07 sign-up opens, both
  // aud:'parent', href:'activities/') so the week strip and Coming up own them from
  // one source. The legacy countdown renderer + the SHEET-OWNED regWindows fence are
  // gone; pull-sheet.py tolerates-and-warns on any leftover regWindows sheet rows.

  // Booking windows (plan 2026-07-16 item 1.4): bounded "book now" rows in the same
  // strip, rendered BEFORE the countdown rows. Whole row is one link; no add-to-
  // calendar. HAND-KEPT, deliberately NOT sheet-owned: pull-sheet.py regenerates
  // the fenced blocks and its schema cannot express these rows (it would silently
  // wipe them). href is SITE-ROOT-relative and gate-checked against disk. Schema:
  //   { from: '2026-08-10',                    // first day shown (inclusive)
  //     until: '2026-08-18',                   // last day (inclusive); self-removes after
  //     href: 'hopes-and-wishes/',             // must resolve to site/<href>index.html
  //     label: 'Book your Hopes and Wishes time',
  //     sub: 'All year groups · 17 to 18 Aug' }
  // EMPTY BY POLICY (Trevor 2026-08-15): the H&W booking row came down early because
  // the homepage should stay static and predictable, and each banner is one more
  // system to keep updated; coordinators and class teachers carry that comms load
  // directly. Before adding a row here, ask whether the event page + week strip
  // already cover it. (The 08-11 hold-back .filter went with the row it gated.)
  bookingWindows: [],

  // Coming up cards (slice 2, issue 0047). EDITORIAL curation (D2): each row here
  // promotes ONE event group to a homepage card. href is the group identity: every
  // calendarEvents row sharing it folds into the card, and render.js computes the
  // exact date window from those rows. A card ages out when the group's last date
  // passes; groups surface once their next date is within ~30 days; the band caps
  // at 4 (overflow rewrites the header link to "+N more"). The title lives HERE:
  // a grouped card's name exists in no single row (plan decision #19).
  // HAND-KEPT like bookingWindows: pull-sheet.py never touches this island.
  // Schema: { href: 'hopes-and-wishes/',   // group key; must resolve on disk (gate-checked)
  //           title: 'Hopes and Wishes',   // group display title
  //           blurb: 'One card sentence.',
  //           go: 'Find your class' }      // card action label
  featuredEvents: [
    { href: 'hopes-and-wishes/', title: 'Hopes and Wishes',
      blurb: 'Twenty minutes with your child\'s teacher to start the year, in your words.',
      go: 'Find your class' },
    // 0227 / ADR-0016: this card IS the information session now. The 2026-08-17 note it
    // replaces said "coffee morning" was the canonical name families hear while the purpose
    // was information sharing; that tension is resolved by giving the monthly parent social
    // the coffee-morning name and this one its own. The card has no subheading slot
    // (render.js is frozen) and the eyebrow carries the date, so the blurb's lead sentence
    // is the subheading. Same framing as the /information-sessions/ lead: change both
    // together. HAND-KEPT: this href is NOT the sheet's, so it moves now, while the six
    // SHEET-OWNED rows still say the old path until Sarah's edit and the next pull.
    { href: 'information-sessions/', title: 'Information session',
      blurb: 'The start-of-year session for your year group. Meet the coordinators and administrators who hold it together and hear how the year runs.',
      go: 'Find your year group' },
    // ASA (Trevor 2026-08-20: the Term 1 brochure "should also be pushed to the main ASA
    // showcase card on the homepage"). The 20-21 Aug Showcase row and the 24 Aug
    // enrolments row share href 'asa/', so they fold into ONE card and this overlay
    // names it. The card CANNOT open the PDF itself: render.js (FROZEN) always links a
    // grouped card to its internal page when one exists (linkHref || extLink, ~line
    // 1009), so the honest shape is blurb names the brochure, card lands on asa/, and
    // the brochure button there is the next tap. The go label names the real
    // destination per 0143's rule.
    // ⚠️ RETITLED "ASA sign up" 2026-08-24 (Trevor: "No longer ASA Showcase"). The overlay
    // supplies the card's TITLE, BLURB and GO LABEL and nothing else: it has no lifetime of its
    // own, so this card lives or dies by its calendarEvents rows (render.js:987). With no
    // `until` on the 24 Aug row that means IT AGES OUT ON 25 AUGUST, which is not what Trevor
    // asked for ("have it run until September 4th") and cannot be fixed from this island. The
    // route, its cost and the reason it was not done by hand are in issue 0211.
    // This island IS pull-proof, so the retitle is durable; the row is not.
    { href: 'asa/', title: 'ASA sign up',
      blurb: 'Sign up opens at 10am on Monday 24 August and stays open for the next two weeks. The Term 1 brochure has every activity, who teaches it, and what children do.',
      go: 'Brochure and how ASA works' },
    // Event-page overlay (Trevor 2026-08-31, issue 0220, REVISED same day): comunita
    // events (workshops + coffee mornings) carry href 'community/' and their homepage
    // cards land on the community page, which holds each event's block (headline,
    // subheading, what to expect, RSVP). Deliberately NO overlay for 'community/':
    // an overlay is keyed by href, so one entry would retitle EVERY comunita card the
    // same way; with no overlay each card keeps its own row title and sub, which is
    // what a family should read. Only community-football/ (not comunita, gold row)
    // keeps a dedicated page + overlay. NO DATES IN BLURBS: the card's `when` chip
    // renders the date from the rows and the overlay is pull-proof.
    // ⚠ BLURB IS PAYAL'S SEPTEMBER DIGEST COPY, not the portal's own words (Sarah, Google
    // Chat 2026-09-01: "can we please update the Open Evening card to match Payal's Sept
    // digest... The ELC Community Football Event as well please"). The digest went to
    // families the same morning Payal's note went live on the portal, so the card a family
    // taps has to read like the email that sent them. Two edits to her sentences, both
    // mechanical: "Y1-Y6" spelled out as "Years 1 to 6" (house style, no dashes in site
    // copy) and the event's own name dropped from the football blurb because the card
    // title already carries it (the 0228 de-duplication, kept). Voice untouched.
    // ⚠ ELC-FC IS DELIBERATELY NOT NAMED. Her sentence also said the event coincides with
    // "registration for ELC-FC"; the 2026-08-31 review cut exactly that claim from
    // community-football/ as false (football registration is already open, sports[] is a
    // dormant island rendered nowhere since 0080, and the brand has no destination on any
    // portal surface). Awaiting Trevor's word: if ELC-FC registration really does open on
    // 11 Sep it needs a destination first, not just a sentence.
    { href: 'community-football/', title: 'After school community football',
      blurb: 'Following last year\'s successful turnout, it is back for another season: Years 1 to 6, all skill levels welcome. It also lands in the same week the ASA programme starts.',
      go: 'What it is and how to RSVP' },
    // Open Evening had NO overlay, so its card showed the bare row title and an empty body
    // (the row's `sub` is ''). This entry is the digest sentence verbatim. No date in the
    // blurb (0220's rule: the `when` chip renders it from the row) and "More details to
    // follow" is Payal's own hedge, which matches the holding page it lands on. The card
    // itself only appears from 10 September, 14 days out from the 24th.
    // 2026-09-02 (0239): Trevor supplied the running order (meet and mingle on the pitch 5:45,
    // classrooms 6:15, specialist and support teams 7:00), so "More details to follow" and the
    // wine-and-canapés line came off the blurb; the page carries the schedule and left draftPages.
    { href: 'open-evening/', title: 'Open Evening',
      blurb: 'An evening for families to step into their child\'s learning, connect with teachers, and get to know other ELC parents. Meet and mingle on the pitch from 5:45, then time in the classrooms, then our specialist and support teams.',
      go: 'See how the evening runs' }
  ],

  // Safeguarding leads (issue 0031 item 6): /safeguarding/ renders a card per
  // entry; empty = the page shows the generic route only. Fill when confirmed:
  //   { campus: 'The City School', name: '...', role: 'Designated Safeguarding Lead', email: '...' }
  safeguarding: [],

  // This-week strip derives from calendarEvents in render.js (current week, else next up).
  // No separate week[]: one source of truth (issue 0018).

  // Note rotation, THREE voices: Trevor · Heather · Payal (Trevor 2026-08-11, issue 0168).
  // This replaces 0051's single-voice-for-hard-launch rule, which is spent. Nobody else:
  // a fourth voice is a decision, not an edit. Trevor cools every body before deploy
  // whoever signed it, and the eyebrow names the person ('A note from Heather').
  // render.js shows the latest note whose `from` <= today (Bangkok).
  //
  // ⚠️ AUTO-ROTATION IS OFF (Trevor 2026-08-10, issue 0164). A queued note used to
  // publish itself the moment its `from` date arrived: the 10 Aug note replaced the
  // welcome note on the landing page before Trevor had read it live. render.js is
  // frozen (ADR-0010) and its date pick stays, so the hold lives here instead:
  // exactly ONE row is live at a time and every future note sits commented out
  // below. A queued note goes live only when Trevor says so in that exchange:
  // uncomment it, set `from` to that day or earlier, then deploy. Never uncomment a
  // dated row because its date has passed, and never add a row with a future `from`.
  notes: [
    // ONE note at a time (Trevor 2026-08-15): a new note CLEARS the old one, no history.
    // The 0168 three-voice rotation keeps its voices, but retired notes are commented out
    // below rather than left live, so render.js's Earlier notes list stays empty by data.
    // Heather's start-of-year note (issue 0168), LIVE since 2026-08-15 (Trevor moved the
    // flip from Sunday in that exchange; `from` = deploy day per ADR-0013, never future).
    // `when` stays EMPTY on notes (Trevor 2026-08-15): no dates, no cadence words.
    // Notes roll over periodically; parents should not read a schedule into them.
    // ASA sign-up announcement, LIVE 2026-08-24 on Trevor's word (issue 0179).
    // ⚠ WRITTEN TO BE TRUE BEFORE 10am (Trevor 2026-08-24: "Im launching this note before
    // 10am"). It states the opening as a FACT with a time on it rather than a state, so the
    // sentence is correct at 09:00 and still correct at 15:00 without a second deploy. Do not
    // "fix" it to the present tense after 10am: rotate the whole note instead.
    // The cta is INTERNAL on purpose: `evHref` in render.js rejects schemes (render.js:39), so
    // a note cta cannot carry an off-portal URL and the Register buttons live on the ASA card
    // and on asa/. That is also the one-front-door reader path (CLAUDE.md rule 3): the note
    // routes to asa/, asa/ carries the button, the parent is never told a second address.
    // ⚠ The activities@elc.ac.th address is PLAIN TEXT here, not a link: render.js sets the
    // body with textContent, and a note gets exactly ONE cta, which Trevor asked to spend on
    // the ASA page. The address IS a live mailto one tap away on asa/ (site/asa/index.html:147).
    // Payal's September note, LIVE 2026-09-01 on Trevor's word ("flip the message on the
    // portal to payal's note"). `from` is the deploy day, never future (ADR-0013 / issue 0164
    // hold). It replaces the ASA sign-up note, which is commented out below: one note at a
    // time, no history. The three event names were aligned to the portal's own names on
    // 2026-08-31 (0227 / 0228 / ADR-0016) and still match data.js verbatim: 'Parent coffee
    // morning' (calendarEvents 2026-09-07) and 'After school community football'
    // (2026-09-11). Payal's OWN email may still carry her draft names; the portal cannot
    // fix that from here (connections.md, the email-destination table).
    // ⚠ The 2 September lanyard sentence is FUTURE TENSE and this note ships on 1 September.
    // It is correct on the 1st and still correct after the 2nd (it states a dated rule, not a
    // state), so it needs no follow-up deploy. Do not "fix" it to the present tense: rotate
    // the whole note instead, the same rule the ASA note carried.
    // ⚠ The headshot on site/index.html is STATIC and was hand-swapped to hos.png (Payal) in
    // the same commit. render.js does not read `photo`; that field is advisory here.
    { from: '2026-09-01', eyebrow: 'A note from Payal', when: '',
      title: 'A special start to our year.',
      body: 'Seeing our campuses come to life with the bright smiles, big ideas and boundless energy of our children has made the start of this school year truly special. Our first six weeks are focused on getting to know each child, understanding who they are as learners, and valuing the unique strengths and experiences they bring. The safety of our community remains our highest priority: all new purple lanyards and authorization cards have been printed, and from Wednesday 2 September anyone arriving without an ELC lanyard will be asked to show photo ID and sign in for a visitor lanyard. A lockdown drill also runs this month, one of the routines that keep our campuses safe and secure. September brings much to look forward to, from our Parent coffee morning and After school community football to Open Evening: every date is on the calendar here.',
      photo: 'hos.png',
      cta: { href: 'calendar/', label: 'See the calendar' },
      sig: 'Payal Kogar · Head of Schools and Pedagogista' }

    // ---- QUEUED OR RETIRED, NOT LIVE. Trevor's explicit yes activates one. ----
    // To go live: uncomment ONE row, comment the row it replaces (one note at a time),
    // set `from` to today or earlier, deploy.
    // Optional cta (plan 1.5): renders as one link after the body, gone after `until`.
    //
    // ASA sign-up announcement, RETIRED 2026-09-01 when Payal's September note replaced it.
    // It ran from 2026-08-24 (issue 0179). Its tense was written to be true before and after
    // 10am on launch day; if it is ever re-run, re-time the sentence rather than the clock.
    // The ASA claim is NOT gone from the site with it: activities/, asa/, asa/fees/ and the
    // help answer still carry it (connections.md, the ASA claim table).
    // { from: '2026-08-24', eyebrow: 'A note from Trevor', when: '',
    //   title: 'After school activities open for sign up today.',
    //   body: 'Sign up opens at 10am on Monday 24 August and stays open for the next two weeks. Twenty-eight activities run from 7 September to 17 December: making and tech, studio arts, sport and movement, language and music. The ASA page has the brochure with every activity, what each one costs, and what happens after you register. Having trouble registering, or any questions? Email activities@elc.ac.th.',
    //   cta: { href: 'asa/', label: 'See the activities' },
    //   sig: 'Trevor · Head of Operations and Educational Experience' },
    //
    // Heather's start-of-year note (issue 0168), RETIRED 2026-08-24 when the ASA sign-up
    // announcement replaced it. It ran from 2026-08-15.
    // { from: '2026-08-15', eyebrow: 'A note from Heather', when: '',
    //   title: 'Welcome to the school year and to ELC Portal.',
    //   body: 'Whether your family is returning to our gardens or joining us for the very first time, we are thrilled to begin this journey together. This busy week brings many meaningful opportunities to connect, from our Hopes and Wishes meetings and year level Coffee Mornings to the excitement and anticipation of the first day of school. Transitioning into a new routine takes a community, and we look forward to working together to build a strong, supportive foundation for your child\'s success.',
    //   sig: 'Heather Pease · Head of Teaching and Learning' },
    //
    // Trevor's launch welcome, RETIRED 2026-08-15 when Heather's note replaced it.
    // { from: '2026-07-01', eyebrow: 'A note from Trevor', when: 'This month · August',
    //   title: 'Welcome to a new year.',
    //   body: 'ELC Portal is new this year: one place for everything your family does with us beyond the classroom. It is built to be used as a standalone app on your phone, and that is where it works best: follow the instructions in the Install app button at the bottom left, and the details and announcements here are always at your fingertips. We are building it not just for our community, but with you. Just as we shape the children\'s learning around relationships and listening, this page grows from what families tell us they need. So tell me what you need: use the feedback button on any page, email me, or come and see me in person at the gate or on the playground.',
    //   cta: { contact: 'trevor', label: 'Email me' },
    //   sig: 'Trevor · Head of Operations and Educational Experience' },
    //
    // { from: '2026-08-10', eyebrow: 'A note from Trevor', when: '17 to 18 August',
    //   title: 'We start with your hopes.',
    //   body: 'On 17 and 18 August your child\'s teachers sit down with you for Hopes and Wishes: what you want this year to hold for your child, in your words. It is my favourite way to begin the year. Everything else on this page can wait until you have booked your time.',
    //   cta: { href: 'hopes-and-wishes/', label: 'Book your time', until: '2026-08-18' },
    //   sig: 'Trevor · Head of Operations and Educational Experience' },
    // { from: '2026-08-17', eyebrow: 'A note from Trevor', when: '17 to 25 August',
    //   title: 'Come and meet your year team.',
    //   body: 'Your year group\'s coffee morning lands between 17 and 25 August: this is the information session for the year ahead, where you meet the coordinators and administrators who hold your year together and hear how it runs. The social mornings that run through the rest of the year are a different, more relaxed thing. Times are on the calendar; come find me while you are there.',
    //   cta: { href: 'coffee-mornings/', label: 'Find your year group' },
    //   sig: 'Trevor · Head of Operations and Educational Experience' },
    // { from: '2026-08-24', eyebrow: 'A note from Trevor', when: 'This week',
    //   title: 'Everyone is in.',
    //   body: 'From this week every child, every year group, every campus is in school. The rhythm of the year starts now: the week ahead lives on this page, and anything you need to sign up for is under Activities. Tell me what is missing; this page is built from what families ask for.',
    //   sig: 'Trevor · Head of Operations and Educational Experience' }
  ],

  // Quick notices to families (issue 0148, Trevor 2026-08-07). A second tile under the
  // leadership note, same markup and styling, for something short-lived that families need
  // now: a safety update, a closure, a change of plan. NOT the note rotation: a notice is
  // bounded by `until` and it clears itself on the day after, with no history kept. This
  // island is the ONLY edit point (render.js removes the mount when nothing is live), so an
  // expired notice can never sit stale on the page and there is no static fallback copy to
  // forget about. Latest live one wins, same rule as notes[].
  // Schema: { from: '2026-08-07',            // Bangkok civil date, inclusive
  //           until: '2026-08-10',           // inclusive; the tile is gone on the 11th
  //           eyebrow: 'A note from Payal',
  //           when: 'Friday 7 August',       // written, not derived: it must not go stale
  //           title, body, sig,
  //           photo: 'hos.png',              // optional, site/assets/img/
  //           cta: { href: 'safeguarding/', label: 'Read the policy' } }   // optional
  // HAND-KEPT: pull-sheet.py never touches this island.
  // Same hold as notes[] (Trevor 2026-08-10, issue 0164): never queue a notice with a
  // future `from`. A notice is added the day it should appear, not ahead of time.
  notices: [
    // Payal's letter to families after the Nonthaburi school shooting, sent by email the
    // same morning (Drive: "7/8/26 Safety Comms"). This is a truncation of that letter, not
    // new copy, and it holds for four days.
    { from: '2026-08-07', until: '2026-08-10',
      eyebrow: 'A note from Payal',
      when: 'Friday 7 August',
      title: 'Where we stand today.',
      body: 'Like you, we learned this morning of the tragic shooting at a school in Nonthaburi. Our hearts are with the students, educators and families affected. The incident is contained and has no connection to our schools. We have been in close contact with our security partners at the US Embassy since this morning, and our security teams at every campus are on heightened alert: you will notice this in the firm enforcement of campus access at our gates. Next week, before the children return, our whole staff walks through our safety policies and procedures together, including our lockdown procedure. If you would like to talk anything through with us, our doors are open.',
      photo: 'hos.png',
      sig: 'Payal Kogar · Head of Schools and Pedagogista' }
  ],

  // ---- Hopes and Wishes / PTC booking (issue 0043, plan 2026-07-16) ----
  // The start-of-year parent-teacher conference. ONE page (site/hopes-and-wishes/)
  // renders these islands via render.js; Payal emails the single link. The SAME page
  // + rail is reused for the October and March PTCs by editing this block (CONTEXT "PTC").
  // HAND-KEPT (Sarah/Neung edit): plain data, deliberately NOT a SHEET-OWNED fence
  // (pull-sheet.py knows only its four schemas and would wipe these rows).
  // Booking is LINK-OUT only (rule 1): each bookingUrl opens the teacher's Google
  // Calendar appointment page in a new tab; no embed ships until the device-QA gate
  // passes. Every field null-degrades honestly (rule 6): no bookingUrl -> "Booking
  // link coming" (never a dead button, never href="#"), no photo -> initials
  // placeholder, no bio -> "a short introduction is on the way". Booking closes by
  // DATE (derived from ptc.dates), no manual active flag anyone must remember to flip.
  ptc: {
    name: 'Hopes and Wishes',
    // Calendar truth (mirrors the calendarEvents H&W rows; build-api.mjs asserts they
    // match). booking-open derives from these: open while today <= the last date.
    // Dates per the City School calendar 3rd version (docs/sources/calendars.md:
    // the Drive working deck is the date authority; the April draft said 17/18/19).
    dates: [
      { date: '2026-08-17', groups: 'K2 to Y6' },
      { date: '2026-08-18', groups: 'K1' }
    ],
    // NOT WIRED YET (0050 sweep truth pass): no renderer reads the three fields
    // below; the H&W page copy is hardcoded in hopes-and-wishes/index.html. They
    // are deliberate seams for the October/March PTC reuse (issue 0043): wire a
    // render.js mount when that page goes data-driven, or cut them then.
    slotNote: 'Twenty minutes, one to one with your child\'s teacher.',   // == the page's #ptc-status line
    questionnaireUrl: null,
    packUrl: null
  },

  // Booking cards, class-keyed (a co-taught class carries two teachers on one card,
  // one bookingUrl). `year` drives the grouping + the jump strip (explicit order in
  // render.js, not lexicographic). Roster + bio source: docs/sources/staffing-2026-27.md.
  // Bios are drafts and await each teacher's check (the page carries the "finalising"
  // chip); only the demo card's booking link is live today.
  classes: [
    // INTERACTIVE TEST CARD (Trevor, 2026-07-16): real photo + real live booking link
    // + sample bio. Proves the whole flow end to end and gives the embed QA gate a
    // live schedule to test against. Fate at parent launch = Trevor's call (remove, or
    // repurpose as a "Questions about booking?" support card). Link source: Trevor's
    // Gmail signature, /u/0/ account segment stripped.
    { class: 'How booking works', year: 'demo', campus: null, flag: null,
      teachers: [ { name: 'Trevor Cardozo', role: 'Head of operations and educational experience',
        photo: 'assets/img/trevor.png',
        bio: 'SAMPLE (Trevor edits): Born in Canada, Trevor has taught in Bangkok and at Upper Canada College, and now leads operations and educational experience at ELC. He is happiest weaving technology into education: computers, robotics and digital media.' } ],
      bookingUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3iBMbLleKHpScuhn2uyBpVYxrOGdtpq3pLUwzuWBACrTJCGJM2rOParGZx4TyU1K5DacnUEoat?gv=true' },

    // FULL ROSTER (2026-07-17), 23 booking cards from docs/sources/staffing-2026-27.md.
    // Photos: assets/img/team/<key>.jpg, 560px B&W squares from the Headshots.zip set
    // (manifest = the Claude Design system project). Bios compressed 40-60 words from
    // the 25/26 bios Doc (canonical, pulled at build time); every card awaits its
    // teacher's self-check + staffing sign-off (Payal + Heather + Trevor) before
    // parent-facing publish; the page-level draft note covers the interim.
    // PE49 K1 class (Tina) deliberately absent: Purple Elephant is out of launch scope.
    // Y4 Lauren RESOLVED 2026-08-07: Trevor supplied the headshot directly, so the
    // ambiguity is gone (the Headshots.zip 'lauren' was last year's SSW Lauren, and
    // that file is still NOT the one wired here). team/lauren.jpg is Lauren Marsh.

    { class: 'K1 Sarah', year: 'K1', campus: null, flag: null,
      teachers: [ { name: 'Sarah Jansen van Vuuren', role: 'Class teacher', photo: 'assets/img/team/sarah.jpg',
        bio: 'From South Africa and in Bangkok since 2022, Sarah holds an honours degree in education from the University of Cape Town. She builds a nurturing room where children explore, experiment and engage with the world, with strong relationships between families, staff and children at the centre. Outside school: hiking, swimming and photography.' } ],
      bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2-qu8rDwGKwYh9ZqiI3ijSCN18Vd0jCD35hj3t2pU4YeIy11565JUo1UuypnCe_EBSOqOD4ZLC' },

    { class: 'K1 Bee', year: 'K1', campus: null, flag: null,
      teachers: [ { name: 'Blathain Callaghan', role: 'Class teacher', photo: 'assets/img/team/bee.jpg',
        bio: 'From Ireland and in Bangkok since 2019, Bee joins ELC this year. With a degree in early childhood studies and ten years alongside our youngest learners, she is passionate about learning through play. Off the clock: Gaelic football, museums and exploring the city.' } ],
      bookingUrl: 'https://calendar.app.google/MQ41ynbCSin652zC9' },

    { class: 'K1 Katie', year: 'K1', campus: null, flag: null,
      teachers: [ { name: 'Ekaterina Mokrushina', role: 'Class teacher', photo: 'assets/img/team/katie.jpg',
        bio: 'Katie has taught K1 at ELC since 2019, after classrooms in Beijing and Chengdu, and speaks Mandarin. A master\'s in educational technology made her our technology integration lead, and she is always happy to talk with families about screen time at home. Beyond school: tennis and diving.' } ],
      bookingUrl: 'https://calendar.app.google/21kVzC2gRnktKX7Z6' },

    // 5th K1 class (Trevor 2026-07-17): K1 = Sarah, Bee, Katie, SINEAD, Rae. The
    // sheet's "Sinead replacement, hire TBC" row is stale: Sinead stays, no new hire.
    { class: 'K1 Sinead', year: 'K1', campus: null, flag: null,
      teachers: [ { name: 'Sinead McGee', role: 'Class teacher', photo: 'assets/img/team/sinead.jpg',
        bio: 'Sinead is from Ireland and lives in Bangkok with her husband and two daughters. With a PGDE in early years and classrooms in the UK, China and Cambodia behind her, she builds a safe, nurturing room grounded in inquiry, agency and collaboration. Off duty: good food, weight lifting and a good cup of coffee.' } ],
      bookingUrl: 'https://calendar.app.google/6dqcnFXrL8erpeHv7' },

    { class: 'K1 Rae', year: 'K1', campus: null, flag: null,
      teachers: [ { name: 'Rae-Lynn Neill', role: 'Class teacher', photo: 'assets/img/team/rae.jpg',
        bio: 'Rae has been part of ELC since 2013. From Ontario, Canada, with degrees in arts and education, she is now training in dyslexia support: literacy is her passion. She believes children learn best through play, inquiry and the senses, in a room built on inclusivity.' } ],
      bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Gf5ELqO3d1l5h3isiDv5I656O2WgaUFJQlXgbyTh6SO2ynWiDc-9M2Ia38l18bsrfvrPfiGlP' },

    { class: 'K2 Izzy', year: 'K2', campus: null, flag: null,
      teachers: [ { name: 'Isreal Tan', role: 'Class teacher', photo: 'assets/img/team/izzy.jpg',
        bio: 'From New Zealand with an education degree from Victoria University of Wellington, Izzy has been part of ELC for over ten years in roles across the school. He documents children\'s learning with a photographer\'s eye and takes their ideas seriously. Outside: rugby, world music and Bangkok\'s food.' } ],
      bookingUrl: 'https://calendar.app.google/RgyqHJHxztDtxg9M7' },

    { class: 'K2 Nasreen', year: 'K2', campus: null, flag: null,
      teachers: [ { name: 'Nasreen Hassan', role: 'Class teacher', photo: 'assets/img/team/nas.jpg',
        bio: 'Ms Nas comes from Cape Town with fifteen years of teaching behind her, ten of them international. In her K2 room, curiosity and joy sit beside the academics, and she counts a child happy to arrive as half the job done. Outside school: yoga, cooking and the hand pan.' } ],
      bookingUrl: 'https://calendar.app.google/RBfPLTras7Knymss5' },

    { class: 'K2 Kelly', year: 'K2', campus: null, flag: null,
      teachers: [ { name: 'Kelly Wadenholm', role: 'Class teacher', photo: 'assets/img/team/kelly.jpg',
        bio: 'Kelly grew up in Bangkok with Stockholm roots, then spent six years in Melbourne earning her early years degree and teaching kindergarten. She builds a room where every child feels valued and takes an active part in their own learning. Off duty she stays active, eats Thai food and heads for the beach.' } ],
      bookingUrl: 'https://calendar.app.google/diWMkG3MvvhqzK6w8' },

    { class: 'K2 Jess', year: 'K2', campus: null, flag: null,
      teachers: [ { name: 'Jessica Melton', role: 'Class teacher', photo: 'assets/img/team/jess.jpg',
        bio: 'Jess is from Virginia and has taught in Thailand since 2016, with a master\'s in teaching multilingual learners. Homeroom and learning support roles taught her to build language-rich rooms where children feel safe, seen and heard. Outside school: art, singing, studying Thai and scuba diving.' } ],
      bookingUrl: 'https://calendar.app.google/2fLaQdevccj7f3oQ7' },

    { class: 'K2 Emillia', year: 'K2', campus: null, flag: null,
      teachers: [ { name: 'Emillia Harris', role: 'Class teacher', photo: 'assets/img/team/emillia.jpg',
        bio: 'Emillia is from the UK, with a primary education degree from Leeds Trinity, and has called Bangkok home for four years. She believes young children thrive when encouraged to wonder, test ideas and discover, and loves bringing the natural world into the room. Happiest outdoors, especially by the beach.' } ],
      bookingUrl: 'https://calendar.app.google/dnymKStwjNQFtri27' },

    { class: 'Y1 Tammy', year: 'Y1', campus: null, flag: null,
      teachers: [ { name: 'Tammy Sion', role: 'Class teacher', photo: 'assets/img/team/tammy.jpg',
        bio: 'Tammy is from Singapore, with over twenty five years of teaching across Singapore and Australia and an early childhood degree from Monash. She builds an inclusive room where every voice matters and every idea is met with curiosity and respect. Outside school: shopping and a good murder mystery.' } ],
      bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1SglIDZv2ryQbLT-xvEeYBoFGCyDWoC8Kn8S4TPqjFupU7LlERVgi7-c3HQS8Hm7zSCUaTYicc' },

    { class: 'Y1 Rowan', year: 'Y1', campus: null, flag: null,
      teachers: [ { name: 'Rowan Hayworth', role: 'Class teacher', photo: 'assets/img/team/rowan.jpg',
        bio: 'Rowan trained in Scotland and taught in Spain before Bangkok. He believes every child deserves to feel safe, heard and valued, and shows up each day with the energy for it. Beyond the classroom you will find him playing Gaelic football or padel, mic in hand given the chance.' } ],
      bookingUrl: 'https://calendar.app.google/UduCWn19yYRLPXpJA' },

    { class: 'Y1 Rin', year: 'Y1', campus: null, flag: null,
      teachers: [ { name: 'Rarinthip Gandhi', role: 'Class teacher', photo: 'assets/img/team/rin.jpg',
        bio: 'Rin starts her third year at the City School, moving to Year 1 after two years in Year 3. A computer science background and a master\'s in education from Exeter shape a room where children think creatively, collaborate joyfully and embrace challenges. Outside: adventure outdoors and new cultures.' } ],
      bookingUrl: 'https://calendar.app.google/uc2VfGqPmWRGvkez5' },

    { class: 'Y1 Meg', year: 'Y1', campus: null, flag: null,
      teachers: [ { name: 'Meghan Costello', role: 'Class teacher', photo: 'assets/img/team/meg.jpg',
        bio: 'Meg is from Vermont, USA, with dual master\'s degrees in education and special education. She has taught in New Hampshire and in Nagoya, Japan, and builds a classroom where children feel safe to explore and express themselves with joyful curiosity. This year she is excited to explore Thailand and its language.' } ],
      bookingUrl: 'https://calendar.app.google/6Htk5o43aAL16kcf6' },

    { class: 'Y2 Julie', year: 'Y2', campus: null, flag: null,
      teachers: [ { name: 'Julie Thomson', role: 'Class teacher', photo: 'assets/img/team/julie.jpg',
        bio: 'Julie is from New Zealand and arrives after six years teaching in Doha, Qatar, fourteen years in classrooms in all. She believes children learn best where it is safe to ask questions, make mistakes and explore the world around them. Outside school: new places, different foods and other cultures.' } ],
      bookingUrl: 'https://calendar.app.google/JuWzRxukFozpQwp69' },

    { class: 'Y2 Eric', year: 'Y2', campus: null, flag: null,
      teachers: [ { name: 'Eric Olorenshaw', role: 'Class teacher', photo: 'assets/img/team/eric.jpg',
        bio: 'Eric is Canadian, from the Toronto area, with a master of teaching from the University of Toronto and fifteen years across South Korea, Bahrain and Bangkok. His passion is helping children imagine and design a sustainable future. Many Year 2 families will already know him from last year.' } ],
      bookingUrl: 'https://calendar.app.google/wj2wLcDciZYd4ufZ8' },

    { class: 'Y2 Kobus', year: 'Y2', campus: null, flag: null,
      teachers: [ { name: 'Kobus Roux', role: 'Class teacher', photo: 'assets/img/team/kobus.jpg',
        bio: 'Born in South Africa and in Thailand since 2015, Kobus is a qualified elementary teacher who loves building a real relationship with every child in a room where all feel seen. This is his second year as a City School homeroom teacher. Outside: rugby, scuba diving, hiking and family.' } ],
      bookingUrl: 'https://calendar.app.google/4RkZjQUZYLWekwLH9' },

    { class: 'Y3 Sophie', year: 'Y3', campus: null, flag: null,
      teachers: [ { name: 'Sophie Mottet', role: 'Class teacher', photo: 'assets/img/team/sophie.jpg',
        bio: 'Now in her third year on the Year 3 team, Sophie studied psychology in Montreal and teaching in Wellington. She builds classrooms grounded in curiosity, respect and connection, and keeps learning alongside the children. At home she is happiest trying out a new recipe.' } ],
      bookingUrl: 'https://calendar.app.google/Eqm5U8ui5cwDGRoX6' },

    { class: 'Y3 Keyyona', year: 'Y3', campus: null, flag: null,
      teachers: [ { name: 'Keyyona Lennon-Booker', role: 'Class teacher', photo: 'assets/img/team/keyyona.jpg',
        bio: 'Keyyona is from the USA with a decade of teaching across South Korea and Hong Kong, where she earned her PGDE and master\'s at the University of Hong Kong. Her room is child-centred and inquiry-driven, growing confident, compassionate and globally minded learners. Outside: staying active and Bangkok\'s food scene.' } ],
      bookingUrl: 'https://calendar.app.google/WExzWfqWYfQypY3c9' },

    { class: 'Y4 Lauren', year: 'Y4', campus: null, flag: null,
      teachers: [ { name: 'Lauren Marsh', role: 'Class teacher', photo: 'assets/img/team/lauren.jpg',
        bio: 'Lauren joins Year 4 with fifteen years across Key Stage 2, most recently in Thailand and before that Shanghai and England. A specialist in maths and history, she co-creates a room where children take the risks real learning needs. Mum to Winnie; loves the outdoors, gardening and reading.' } ],
      bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0nJ8DU5gEW1Qzm3j9qg89bHBMo8v4lwcMx5wyqGI4z1xTIRYQ0thtPMHwLHxbd-PS6yR8-Ziup' },

    { class: 'Y4 Carl', year: 'Y4', campus: null, flag: null,
      teachers: [ { name: 'Carl Allinson', role: 'Class teacher', photo: 'assets/img/team/carl.jpg',
        bio: 'Carl is from the UK, a geologist turned teacher with fifteen years across Germany, China, South Korea, Spain and Thailand. His daughter Sunny is in K2 here. In his room children choose work that matches their level and goals, building confidence and ownership. Outside: music, football and travel.' } ],
      bookingUrl: 'https://calendar.app.google/THFw1vJSfEzKVB9e9' },

    { class: 'Y5 Clifford and Athena', year: 'Y5', campus: null, flag: null,
      teachers: [
        { name: 'Clifford Sumner', role: 'Class teacher', photo: 'assets/img/team/clifford.jpg',
          bio: 'Originally from the UK with a decade teaching in Seoul, Clifford is in his second year in Bangkok. He is drawn to educational technology and to shaping learning around each child in a collaborative room. Outside school he reads, stays active and heads for the water when he can.' },
        { name: 'Athena Lee Moria', role: 'Associate teacher', photo: 'assets/img/team/athena.jpg', bio: null }
      ],
      bookingUrl: 'https://calendar.app.google/Pe8avZiwXXJyy4BQ6' },

    { class: 'Y6 Chrissy and Maddy', year: 'Y6', campus: null, flag: null,
      teachers: [
        { name: 'Chrissy Turnbull', role: 'Class teacher', photo: 'assets/img/team/chrissy.jpg',
          bio: 'Back for her fifth year at the City School, Chrissy leads Year 6 literacy and our responsive classroom and SEL work. A Hong Kong upbringing, a first career in events and thirteen years of teaching give her a wide-angle view of childhood. Off duty: travel, music, films and pilates.' },
        { name: 'Madison Moore', role: 'Class teacher', photo: 'assets/img/team/madison.jpg',
          bio: 'Maddy is from the United States, where a design degree led her to teaching. After two years in Year 4 she steps up to Year 6, aiming for a room where children feel safe, have fun and are genuinely challenged. Outside class: reading, learning Thai and taking up golf.' }
      ],
      bookingUrl: 'https://calendar.app.google/u8dFxgFvZNB8LrZo6' },

    // DOVE (Trevor 2026-08-07, relaying April via Sarah Pelham): Dove was absent from
    // the portal entirely. It is NOT in docs/sources/staffing-2026-27.md: that sheet
    // predates the 2026-07-15 fold of the Dove Centre into the City School, so these two
    // rows are Trevor's word, not the sheet's, and the sheet owes a Dove block.
    // LAST on the page, after Y6, on Trevor's call (YEAR_ORDER in render.js decides the
    // section order; these two sit last here so the file reads the way the page renders).
    // Headshots + surnames landed 2026-08-07 (Trevor, direct). OPEN, deliberately not
    // guessed: bios · which H&W day Dove sits on (ptc.dates names K2-Y6 and K1 only).
    // Dove books as one appointment (sheet gives Dove a single combined link, not
    // per-teacher): both cards share the same bookingUrl.
    { class: 'D1 Elger', year: 'Dove', campus: null, flag: null,
      teachers: [ { name: 'Elger Sevilla', role: 'Class teacher', photo: 'assets/img/team/elger.jpg', bio: null } ],
      bookingUrl: 'https://calendar.app.google/KbVKUGUjKsscrUz27' },

    { class: 'D2 Carolyne', year: 'Dove', campus: null, flag: null,
      teachers: [ { name: 'Carolyne Thornton', role: 'Class teacher', photo: 'assets/img/team/carolyne.jpg', bio: null } ],
      bookingUrl: 'https://calendar.app.google/KbVKUGUjKsscrUz27' }
  ],

  // Honest sport statuses (PRD 0002 F2 confirmed truth as of 2026-07-07)
  // DORMANT since 2026-08-03 (issue 0080), and it is a fourth custody class: sports +
  // sportNote are still true but are rendered on no surface at all. Sport came off every
  // page and the data stayed so a restore is markup-only. The sport page is archived, the
  // home tile and the activities card are gone, and this island is unmapped in the search
  // build. Sport registration is being built inside the WordPress ASA surface on
  // portal.elc.ac.th instead. Do not edit these expecting to see anything change on
  // screen, and do not delete them: deleting throws away the restore path 0080 kept on
  // purpose. (Issue 0153 moved this mark out of the runbook and onto the field itself.)
  sports: [
    { name: 'Football',   status: 'open', label: 'Open now' },
    { name: 'Basketball', status: 'soon', label: 'Opens 7 Sep' },
    { name: 'Cricket',    status: 'soon', label: 'Opens 7 Sep' },
    { name: 'Swimming',   status: 'soon', label: 'Opens 7 Sep' }
  ],
  // DORMANT with sports[] above (0080): rendered nowhere.
  sportNote: 'Parent info evening 20 Aug. Sign-up opens 7 Sep.',

  // (Refund and withdrawal content is deliberately NOT on the portal, Trevor 2026-07-12.)

  // REAL 2026/27 events: parsed from "The City School Events 26" sheet per issue 0018,
  // filter rule applied (staff-only dropped; two no-school staff days rescued per Trevor
  // 2026-07-09; Dec 5 Saturday performance confirmed). Review trail:
  // docs/sources/events-review-2026-27.md. Future live feed (0004) swaps in behind this.
  // type:'gold' MEANS key date / milestone (drives the key-dates .ics feed); 'purple' = everything else.
  // REQUIRED aud (P4 pass A, 2026-07-19): audience taxonomy driving dot colour on the
  // calendar grid + agenda: 'parent' (involves parents: coffee mornings, H&W, info
  // evenings, workshops, PTCs, performances), 'child' (children-only school days: first/
  // last day, athletics/field day, cultural celebrations), 'holiday' (no school / closed).
  // "Registration/booking opens" folds into 'parent'. Presentation metadata, retune freely.
  // Optional until:'YYYY-MM-DD' (inclusive last day) on multi-day rows: drives ICS DTEND
  // (exclusive until+1) in render.js AND build-api's feed.
  // ⚠️ "visual surfaces stay start-anchored" USED TO BE HERE AND IS FALSE (corrected 2026-08-24).
  // 0114 made the week strip and the month grid expand a row onto EVERY covered day
  // (expandByDate, render.js:160), 0186 made the Coming-up band span start to until in its
  // eyebrow and keep the row alive until `until` passes (render.js:987), and the print year
  // sheet paints a glyph on every covered day (render.js:1396). So an `until` is visible on
  // five surfaces, not one: budget for weekend cells too, and remember the row TITLE repeats
  // on each of them (a row named "...Start" spanning twelve days reads as a lie). See 0187.
  // Optional nopage:true = deliberately page-less (a portal page is never owed): exempts the
  // row from the Coming-up "coming soon" pill AND the check-coming-up coverage gate. Set on
  // children-only school days and programme rows (summer festivals). aud:'holiday' is exempt
  // without nopage. The gate alerts on any pageless, non-holiday, non-nopage row inside its
  // window: that alert means "build this page or flag it nopage" (deliberate, per plan §9).
  // Optional href (plan 2026-07-16 item 1.1): SITE-ROOT-relative page path
  // ('hopes-and-wishes/') renders the title as a link wherever the event appears
  // and becomes the share target. CLICK-ONLY: href never promotes an event visually
  // (D2); homepage prominence stays editorial (featuredEvents/bookingWindows/notes).
  // Rows sharing one href are one event (the slice-2 grouping key: a featuredEvents
  // card folds every row with its href). NOTE: docs[] hrefs further down use the
  // OTHER convention (page-relative from policies/), do not mix.
  // build-api.mjs strips href from the public calendar JSON.
  // The two Hopes and Wishes rows below carry href: 'hopes-and-wishes/' (plan §2c);
  // build-api.mjs asserts every ptc date has a matching calendar row (one-directional).
  // community flag retired 2026-08-06 (0102): comunita alone decides what lives on community/.
  // Coffee-morning rows additionally carry: cohort (K1|K2|Y1|Y2|'Y3 to Y6'|Dove) ·
  // time/venue (null = "To be confirmed") · slides (null until the deck lands, then
  // { href:'https://…', tag:'PDF' }; HTTPS only or the build gate rejects).
  //
  // SAFEGUARDING RULE for every event row, sheet-owned or hand-kept (Trevor 2026-08-21,
  // 0204 tier C, /safeguarding-review): parent-audience events MAY carry a public start
  // time and venue; child-audience events and performances NEVER carry per-cohort stage
  // times or "Y2 on stage at X" granularity: that detail travels by email only. Two
  // adjacent facts under the same rule: last-day hometime subs are generalised to
  // "Early hometime" (0204 tier B, 2026-08-21) and the elc.ac.th public site is the
  // disclosure baseline (whatever it already publishes is portal-safe). Enforcement is
  // the PULL=1 review step: a sheet edit that imports cohort-level performance times or
  // resurrects the hometime clocks gets generalised HERE before deploy. Held repo-side
  // deliberately while the events system builds out; Sarah has not been asked to hold
  // it at the sheet yet.
  // BEGIN SHEET-OWNED: calendarEvents
  calendarEvents: [
    { date: '2026-07-29', cat: 'event', type: 'purple', aud: 'parent', until: '2026-08-07', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', title: 'ELC Summer Festival of the Arts, Session 2', sub: 'A week of making and performing, to 7 Aug.' },
    { date: '2026-08-12', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'The Queen Mother\'s Birthday Holiday', sub: '' },
    { date: '2026-08-14', cat: 'event', type: 'gold', aud: 'parent', href: 'new-family-orientation/', title: 'New Family Orientation', sub: 'A warm welcome for families new to ELC.' },
    { date: '2026-08-17', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/261928681379473', cohort: 'K1', time: '8:30 to 9:30 am', venue: 'The Atrium', slides: { href: 'https://elcportal.elc.ac.th/information-sessions/k1-information-session-2026.pdf', tag: 'PDF' }, title: 'K1 Information session', sub: '' },
    { date: '2026-08-17', cat: 'event', type: 'purple', aud: 'parent', href: 'hopes-and-wishes/', title: 'K2 to Y6 Hopes and Wishes meetings', sub: '' },
    { date: '2026-08-18', cat: 'event', type: 'purple', aud: 'parent', href: 'hopes-and-wishes/', title: 'K1 Hopes and Wishes meetings', sub: '' },
    { date: '2026-08-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'K2 to Y6 first day of school', sub: '' },
    { date: '2026-08-18', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/261940160950454', cohort: 'Y1', time: '8:30 to 9:30 am', venue: 'The Atrium', slides: { href: 'https://elcportal.elc.ac.th/information-sessions/y1-information-session-2026.pdf', tag: 'PDF' }, title: 'Y1 Information session', sub: '' },
    { date: '2026-08-19', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'K1 first day of school', sub: '' },
    { date: '2026-08-20', cat: 'event', type: 'purple', aud: 'parent', href: 'asa/', title: 'ASA showcase', sub: '' },
    { date: '2026-08-20', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/261940913095460', cohort: 'Y3 to Y6', time: '8:30 to 9:30 am', venue: 'The Atrium', slides: { href: 'https://elcportal.elc.ac.th/information-sessions/y3-to-y6-information-session-2026.pdf', tag: 'PDF' }, title: 'Y3 to Y6 Information session', sub: '' },
    { date: '2026-08-21', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/262158847629471', cohort: 'Dove', time: '9 to 10 am', venue: 'Welcome Room, Lagora', title: 'Dove Information session', sub: '' },
    { date: '2026-08-21', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/261940118766462', cohort: 'Y2', time: '8:30 to 9:30 am', venue: 'The Atrium', slides: { href: 'https://elcportal.elc.ac.th/information-sessions/y2-information-session-2026.pdf', tag: 'PDF' }, title: 'Y2 Information session', sub: '' },
    { date: '2026-08-24', cat: 'event', type: 'purple', aud: 'parent', until: '2026-09-05', href: 'asa/', title: 'ASA Enrolments Start', sub: '' },
    { date: '2026-08-24', cat: 'event', type: 'purple', aud: 'parent', href: 'information-sessions/', ext: 'https://form.jotform.com/261940122478457', cohort: 'K2', time: '8:30 to 9:30 am', venue: 'The Atrium', slides: { href: 'https://elcportal.elc.ac.th/information-sessions/k2-information-session-2026.pdf', tag: 'PDF' }, title: 'K2 Information session', sub: '' },
    { date: '2026-09-07', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'ASA\'s Start', sub: '' },
    { date: '2026-09-07', cat: 'social', type: 'purple', aud: 'parent', href: 'community/', ext: 'https://form.jotform.com/262360861224453', comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2026-09-11', cat: 'event', type: 'gold', aud: 'child', href: 'community-football/', ext: 'https://form.jotform.com/262288919933473', title: 'After school community football', sub: '' },
    { date: '2026-09-17', cat: 'workshop', type: 'purple', aud: 'parent', href: 'community/', ext: 'https://form.jotform.com/262360929144459', time: '8:30 to 9:30 am', venue: 'The Atrium', comunita: true, title: 'Safe Passages, Bright Horizons', sub: 'Keeping Our Children Safe - Emotionally, Socially, Physically and Digitally' },
    { date: '2026-09-18', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'International Schools Holiday', sub: '' },
    { date: '2026-09-24', cat: 'event', type: 'purple', aud: 'parent', href: 'open-evening/', time: '5:45 to 7:30 pm', title: 'Open Evening', sub: '' },
    { date: '2026-10-02', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Parent Teacher Conferences (Progress)', sub: 'No school for children' },
    { date: '2026-10-03', cat: 'event', type: 'purple', aud: 'parent', href: 'open-house/', title: 'Open House at The City School', sub: '' },
    { date: '2026-10-05', cat: 'social', type: 'purple', aud: 'parent', nopage: true, ext: 'https://form.jotform.com/262360716288462', comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2026-10-12', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2026-10-16', nopage: true, title: 'Holiday: ELC October mid-term break', sub: 'to 16 Oct' },
    { date: '2026-10-22', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, ext: 'https://form.jotform.com/262360685205456', comunita: true, title: 'Language of Maths', sub: 'Experiencing, Communicating & Exploring the Magic of Maths' },
    { date: '2026-10-23', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'King Chulalongkorn Memorial Day', sub: 'No school for children; Teacher In-Service Day' },
    { date: '2026-10-27', cat: 'event', type: 'gold', aud: 'child', until: '2026-10-30', nopage: true, title: 'School Photos With U-Smile', sub: '' },
    { date: '2026-10-29', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, ext: 'https://form.jotform.com/262360746297465', comunita: true, title: 'Language of Maths', sub: 'Repeat of the 22 Oct session. RSVP to one session only.' },
    { date: '2026-11-02', cat: 'social', type: 'purple', aud: 'parent', nopage: true, ext: 'https://form.jotform.com/262361215951454', comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2026-11-23', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Y1 and Y2 Holiday Pageant', sub: '' },
    { date: '2026-11-24', cat: 'event', type: 'purple', aud: 'child', href: 'loy-krathong/', title: 'ELC celebrates Loy Krathong', sub: '' },
    { date: '2026-11-26', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'K1 Holiday Pageant', sub: '' },
    { date: '2026-11-27', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'K2 Holiday Pageant', sub: '' },
    { date: '2026-12-04', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Rescheduled National Day Performance', sub: 'Friday' },
    { date: '2026-12-05', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'King Rama IX Birthday and National Day', sub: 'Saturday' },
    { date: '2026-12-07', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'King Rama IX Birthday Substitution Holiday', sub: '' },
    { date: '2026-12-10', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Parent Teacher Conferences (Report Card)', sub: 'No school for children' },
    { date: '2026-12-11', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Y3 to Y6 Holiday Choir Concert', sub: '' },
    { date: '2026-12-16', cat: 'athletics', type: 'purple', aud: 'child', nopage: true, title: 'K2 to Y6 Fun Field Day', sub: '' },
    { date: '2026-12-17', cat: 'athletics', type: 'purple', aud: 'child', nopage: true, title: 'K1 and Dove Centre Fun Field Day', sub: '' },
    { date: '2026-12-17', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'Last Day of ASA\'s', sub: '' },
    { date: '2026-12-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'Last day of Term 1', sub: '11:30 hometime K1 and K2, 12:00 hometime Y1 to Y6' },
    { date: '2026-12-21', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-01-10', nopage: true, title: 'Holiday: Christmas and New Year', sub: 'to 10 Jan' },
    { date: '2027-01-11', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'School resumes for Term 2', sub: '' },
    { date: '2027-01-18', cat: 'social', type: 'purple', aud: 'parent', nopage: true, comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2027-02-01', cat: 'social', type: 'purple', aud: 'parent', nopage: true, comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2027-02-11', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, title: 'Project Through the Years at ELC', sub: '' },
    { date: '2027-02-12', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, title: 'Project Through the Years at ELC', sub: '' },
    { date: '2027-02-12', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, title: 'Project in Kindergarten', sub: '' },
    { date: '2027-02-19', cat: 'athletics', type: 'purple', aud: 'child', nopage: true, title: 'Athletics Day', sub: '' },
    { date: '2027-02-22', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-02-26', nopage: true, title: 'Holiday: ELC February mid-term break', sub: 'to 26 Feb' },
    { date: '2027-03-01', cat: 'social', type: 'purple', aud: 'parent', nopage: true, comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2027-03-13', cat: 'event', type: 'purple', aud: 'parent', href: 'open-house/', title: 'Open House at The City School', sub: '' },
    { date: '2027-03-19', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Parent Teacher Conference (Progress)', sub: 'No school for children' },
    { date: '2027-03-25', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'Y3 to Y6 Drama and Music Evening', sub: '' },
    { date: '2027-03-30', cat: 'event', type: 'purple', aud: 'child', nopage: true, title: 'ELC Songkran celebrations', sub: '' },
    { date: '2027-04-05', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-16', nopage: true, title: 'Songkran Holiday', sub: 'to 16 Apr' },
    { date: '2027-04-06', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'Chakri Day Holiday', sub: '' },
    { date: '2027-04-13', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-15', nopage: true, title: 'Thai New Year: Songkran', sub: 'to 15 Apr' },
    { date: '2027-04-26', cat: 'event', type: 'purple', aud: 'parent', until: '2027-04-29', nopage: true, title: 'Art From The Heart exhibition and fundraising week', sub: 'to 29 Apr' },
    { date: '2027-04-26', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'New Families and The Purple Elephant Families to ELC', sub: '' },
    { date: '2027-05-03', cat: 'social', type: 'purple', aud: 'parent', nopage: true, comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2027-05-04', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'Coronation Day Holiday', sub: '' },
    { date: '2027-05-05', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, title: 'Little Steps, Big Futures: charting your child\'s K to 6 journey', sub: '' },
    { date: '2027-05-06', cat: 'workshop', type: 'purple', aud: 'parent', nopage: true, title: 'Little Steps, Big Futures: charting your child\'s K to 6 journey', sub: '' },
    { date: '2027-05-10', cat: 'event', type: 'purple', aud: 'parent', nopage: true, title: 'New Families and The Purple Elephant Families to ELC', sub: 'Afternoon K1 session' },
    { date: '2027-05-20', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'Visakha Bucha Day : normal school day', sub: 'Normal school day' },
    { date: '2027-05-27', cat: 'event', type: 'purple', aud: 'child', nopage: true, title: 'Wan Wai Khru: Teacher\'s Appreciation Day', sub: '' },
    { date: '2027-06-03', cat: 'event', type: 'purple', aud: 'child', nopage: true, title: 'The Queen\'s Birthday: holiday', sub: 'Holiday' },
    { date: '2027-06-07', cat: 'social', type: 'purple', aud: 'parent', nopage: true, comunita: true, title: 'Parent coffee morning', sub: '' },
    { date: '2027-06-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, title: 'Last day of the school year', sub: 'Hometime 11:30 for K1 and K2, 12:00 for Y1 to Y6' },
    { date: '2027-06-21', cat: 'event', type: 'purple', aud: 'parent', until: '2027-07-02', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', title: 'ELC Summer Festival of the Arts, Session 1', sub: 'to 2 Jul' },
    { date: '2027-07-05', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-07-23', nopage: true, title: 'School holiday: office open', sub: 'to 23 Jul' },
    { date: '2027-07-26', cat: 'event', type: 'purple', aud: 'parent', until: '2027-07-30', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', title: 'ELC Summer Festival of the Arts, Session 2', sub: '26 to 27 and 29 to 30 Jul' },
    { date: '2027-07-28', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, title: 'King Vajiralongkorn\'s Birthday Holiday', sub: '' }
  ],
  // END SHEET-OWNED: calendarEvents

  // Purple Elephant events (issue 0064). PROVISIONAL: hand-synced from the DRAFT
  // staff calendar SSOT sheet 1stE9Z9H0lH4z2VeziEUnt9fBEBn5i8Phx8Ger6yPs1g
  // (tabs 'PE Events 26' gid 181294013 + 'PE Samakee 26' gid 1433628630), parent-safe
  // filtered (staff-only dropped, no-school days rescued). The PE head confirms dates.
  // Deliberately ISOLATED from calendarEvents: tagged pe:'thonglor'|'samakee', rendered
  // only on the /purple-elephant/ microsites. NOT the coffee-morning `cohort` key.
  // BEGIN SHEET-OWNED: peEvents
  peEvents: [
    { date: '2026-08-03', cat: 'event', type: 'purple', aud: 'parent', until: '2026-08-07', nopage: true, pe: 'samakee', title: 'ELC Summer Festival of the Arts, Session 2', sub: 'A week of making and performing, to 7 Aug.' },
    { date: '2026-08-12', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'The Queen Mother\'s Birthday Holiday', sub: '' },
    { date: '2026-08-17', cat: 'event', type: 'purple', aud: 'parent', href: 'hopes-and-wishes/', pe: 'samakee', title: 'Hopes and Wishes for K1 and K2', sub: '' },
    { date: '2026-08-17', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Meet and Greet for T1 and T2 parents', sub: 'By appointment only.' },
    { date: '2026-08-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'samakee', title: 'First day of school for K1 and K2', sub: '' },
    { date: '2026-08-19', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'samakee', title: 'First day of school for T1 and T2', sub: '' },
    { date: '2026-09-18', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'International Schools Holiday', sub: '' },
    { date: '2026-09-24', cat: 'event', type: 'purple', aud: 'parent', href: 'open-evening/', pe: 'samakee', title: 'Open Evening', sub: 'Parents only.' },
    { date: '2026-09-26', cat: 'event', type: 'purple', aud: 'parent', href: 'open-house/', pe: 'samakee', title: 'Open House at The Purple Elephant Samakee', sub: 'For new families.' },
    { date: '2026-10-09', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Parent Teacher Conference', sub: 'No school for K1 and K2. Normal school day for T1 and T2.' },
    { date: '2026-10-13', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'King Rama IX Memorial Day', sub: '' },
    { date: '2026-10-19', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2026-10-23', nopage: true, pe: 'samakee', title: 'Holiday: October mid-term break', sub: 'to 23 Oct' },
    { date: '2026-10-23', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'King Chulalongkorn Memorial Day', sub: 'No school for children' },
    { date: '2026-11-13', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Professional Development Day', sub: 'No school for children.' },
    { date: '2026-11-24', cat: 'event', type: 'purple', aud: 'child', href: 'loy-krathong/', pe: 'samakee', title: 'Loy Krathong Celebrations', sub: '' },
    { date: '2026-12-07', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'King Rama IX Birthday and National Day', sub: 'Substitution day.' },
    { date: '2026-12-14', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Winter Celebration and Christmas Brunch', sub: '' },
    { date: '2026-12-18', cat: 'event', type: 'gold', aud: 'parent', nopage: true, pe: 'samakee', title: 'Last day of Term 1', sub: 'Early dismissal. Hometime 11:00 for T1 and T2, 11:30 for K1 and K2.' },
    { date: '2026-12-21', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2026-12-31', nopage: true, pe: 'samakee', title: 'Holiday: Christmas and New Year', sub: 'to 31 Dec' },
    { date: '2027-01-01', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-01-08', nopage: true, pe: 'samakee', title: 'Holiday: Christmas and New Year', sub: 'to 8 Jan' },
    { date: '2027-01-11', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Professional Development Day', sub: 'No school for children.' },
    { date: '2027-01-12', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'samakee', title: 'Start of Term 2', sub: '' },
    { date: '2027-01-22', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Term 1 reports sent to parents', sub: 'K1 and K2.' },
    { date: '2027-01-29', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Parent Teacher Conference', sub: 'No school for children.' },
    { date: '2027-02-05', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Samakee Celebrates Lunar New Year', sub: 'Children only.' },
    { date: '2027-02-06', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Lunar New Year Day', sub: '' },
    { date: '2027-02-16', cat: 'athletics', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Fun Field Day for T1 and T2', sub: 'Children only.' },
    { date: '2027-02-18', cat: 'athletics', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Fun Field Day for K1 and K2', sub: 'Children only.' },
    { date: '2027-02-22', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-02-26', nopage: true, pe: 'samakee', title: 'Holiday: mid-term break', sub: 'to 26 Feb' },
    { date: '2027-02-22', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Makha Bucha Day', sub: '' },
    { date: '2027-03-01', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Festival of Literature Month', sub: 'Throughout March.' },
    { date: '2027-03-06', cat: 'event', type: 'purple', aud: 'parent', href: 'open-house/', pe: 'samakee', title: 'Open House at The Purple Elephant Samakee', sub: 'For new families.' },
    { date: '2027-03-10', cat: 'event', type: 'purple', aud: 'parent', until: '2027-03-11', nopage: true, pe: 'samakee', title: 'Photo Session', sub: 'Children and parents.' },
    { date: '2027-03-26', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Book Character Parade', sub: '' },
    { date: '2027-04-02', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'ELC Songkran Celebrations', sub: '' },
    { date: '2027-04-05', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-16', nopage: true, pe: 'samakee', title: 'Songkran Holiday', sub: 'to 16 Apr' },
    { date: '2027-04-06', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Chakri Day', sub: '' },
    { date: '2027-04-13', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-15', nopage: true, pe: 'samakee', title: 'Thai New Year, Songkran', sub: 'to 15 Apr' },
    { date: '2027-05-01', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'samakee', title: 'Art From the Heart Month', sub: 'Throughout May' },
    { date: '2027-05-04', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Coronation Day', sub: '' },
    { date: '2027-05-17', cat: 'event', type: 'purple', aud: 'parent', until: '2027-05-21', nopage: true, pe: 'samakee', title: 'Arts Exhibition Week', sub: 'to 21 May' },
    { date: '2027-05-20', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Visakha Bucha Day', sub: '' },
    { date: '2027-05-25', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'samakee', title: 'Art From the Heart Art Auction Evening', sub: 'Parents only.' },
    { date: '2027-06-01', cat: 'event', type: 'purple', aud: 'parent', until: '2027-06-17', nopage: true, pe: 'samakee', title: 'K1 and K2 Learning Journey', sub: 'to 17 Jun' },
    { date: '2027-06-03', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'The Queen\'s Birthday', sub: 'No school.' },
    { date: '2027-06-17', cat: 'event', type: 'gold', aud: 'parent', nopage: true, pe: 'samakee', title: 'Last day of Term 2', sub: 'Early dismissal. Hometime 11:00 for T1 and T2, 11:30 for K1 and K2.' },
    { date: '2027-06-18', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'Professional Development Day', sub: 'No school for children.' },
    { date: '2027-06-21', cat: 'event', type: 'purple', aud: 'parent', until: '2027-06-30', nopage: true, pe: 'samakee', title: 'ELC Summer Festival of the Arts, Session 1', sub: 'to 30 Jun' },
    { date: '2027-07-01', cat: 'event', type: 'purple', aud: 'parent', until: '2027-07-02', nopage: true, pe: 'samakee', title: 'ELC Summer Festival of the Arts, Session 1', sub: 'to 2 Jul' },
    { date: '2027-07-05', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-07-30', nopage: true, pe: 'samakee', title: 'Summer holiday', sub: 'Office and accounting open.' },
    { date: '2027-07-26', cat: 'event', type: 'purple', aud: 'parent', until: '2027-07-30', nopage: true, pe: 'samakee', title: 'ELC Summer Festival of the Arts, Session 2', sub: 'to 30 Jul' },
    { date: '2027-07-28', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'samakee', title: 'King Vajiralongkorn\'s Birthday', sub: '' },
    { date: '2026-08-03', cat: 'event', type: 'purple', aud: 'child', until: '2026-08-11', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', pe: 'thonglor', title: 'ELC Summer Festival of the Arts, Session 2', sub: 'to 11 Aug' },
    { date: '2026-08-12', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'The Queen Mother\'s Birthday Holiday', sub: '' },
    { date: '2026-08-13', cat: 'event', type: 'purple', aud: 'child', until: '2026-08-14', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', pe: 'thonglor', title: 'ELC Summer Festival of the Arts, Session 2', sub: 'to 14 Aug' },
    { date: '2026-08-21', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'thonglor', title: 'Meet and Greet with Parents', sub: 'PE 39, 49 and 55' },
    { date: '2026-08-24', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'thonglor', title: 'Start of Term 1', sub: '' },
    { date: '2026-09-18', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'International Schools Holiday', sub: '' },
    { date: '2026-09-23', cat: 'event', type: 'purple', aud: 'parent', href: 'open-house/', pe: 'thonglor', title: 'The Purple Elephant 49 Open House', sub: '' },
    { date: '2026-10-02', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'Professional Development Day', sub: 'No school for children' },
    { date: '2026-10-12', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2026-10-16', nopage: true, pe: 'thonglor', title: 'Holiday: ELC October mid-term break', sub: 'to 16 Oct' },
    { date: '2026-10-19', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'thonglor', title: 'K1 Project Share at The Purple Elephant Campuses with Chiara', sub: '' },
    { date: '2026-10-23', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'King Chulalongkorn Memorial Day', sub: 'No school for children' },
    { date: '2026-11-25', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'thonglor', title: 'Loy Krathong Celebrations', sub: '' },
    { date: '2026-12-07', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'King Rama IX Birthday and National Day Substitution Holiday', sub: '' },
    { date: '2026-12-15', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'thonglor', title: 'The Purple Elephant 39 Christmas Party', sub: '' },
    { date: '2026-12-16', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'thonglor', title: 'The Purple Elephant 49 Christmas Party', sub: '' },
    { date: '2026-12-17', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'thonglor', title: 'The Purple Elephant 55 Christmas Party', sub: '' },
    { date: '2026-12-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'thonglor', title: 'Last day of Term 1', sub: 'Hometime 12 pm' },
    { date: '2026-12-21', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2026-12-31', nopage: true, pe: 'thonglor', title: 'Holiday: Christmas and New Year', sub: 'to 31 Dec' },
    { date: '2027-01-01', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-01-08', nopage: true, pe: 'thonglor', title: 'Holiday: Christmas and New Year', sub: 'to 8 Jan' },
    { date: '2027-01-11', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'Professional Development Day', sub: 'No school for children' },
    { date: '2027-02-22', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-02-26', nopage: true, pe: 'thonglor', title: 'Holiday: ELC February mid-term break', sub: 'to 26 Feb' },
    { date: '2027-03-19', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'Professional Development Day', sub: 'No school for children' },
    { date: '2027-04-02', cat: 'event', type: 'purple', aud: 'child', nopage: true, pe: 'thonglor', title: 'ELC Songkran Celebrations', sub: '' },
    { date: '2027-04-05', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-16', nopage: true, pe: 'thonglor', title: 'Songkran Holiday', sub: 'to 16 Apr' },
    { date: '2027-04-13', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-04-15', nopage: true, pe: 'thonglor', title: 'Thai New Year: Songkran', sub: 'to 15 Apr' },
    { date: '2027-04-26', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'thonglor', title: 'New Families and The Purple Elephant Families to ELC', sub: 'Afternoon K1 session' },
    { date: '2027-05-04', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'Coronation Day Holiday', sub: '' },
    { date: '2027-05-10', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'thonglor', title: 'New Families and The Purple Elephant Families to ELC', sub: 'Afternoon K1 session' },
    { date: '2027-05-18', cat: 'event', type: 'purple', aud: 'parent', nopage: true, pe: 'thonglor', title: 'T1 Family Tours at The City School', sub: '' },
    { date: '2027-05-20', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'Visakha Bucha Holiday', sub: '' },
    { date: '2027-06-03', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'The Queen\'s Birthday', sub: 'No School' },
    { date: '2027-06-18', cat: 'event', type: 'gold', aud: 'child', nopage: true, pe: 'thonglor', title: 'Last day of School Year; Hometime 12 pm', sub: '' },
    { date: '2027-06-21', cat: 'event', type: 'purple', aud: 'child', until: '2027-06-30', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', pe: 'thonglor', title: 'ELC Summer Festival of the Arts, Session 1', sub: 'to 30 Jun' },
    { date: '2027-07-01', cat: 'event', type: 'purple', aud: 'child', until: '2027-07-09', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', pe: 'thonglor', title: 'ELC Summer Festival of the Arts, Session 1', sub: 'to 9 Jul' },
    { date: '2027-07-12', cat: 'holiday', type: 'purple', aud: 'holiday', until: '2027-07-23', nopage: true, pe: 'thonglor', title: 'Holiday: Office and Accounting open', sub: 'to 23 Jul' },
    { date: '2027-07-26', cat: 'event', type: 'purple', aud: 'child', until: '2027-07-30', nopage: true, ext: 'https://www.elc.ac.th/summer-school/', pe: 'thonglor', title: 'ELC Summer Festival of the Arts, Session 2', sub: '26 to 30 Jul' },
    { date: '2027-07-28', cat: 'holiday', type: 'purple', aud: 'holiday', nopage: true, pe: 'thonglor', title: 'King Vajiralongkorn\'s Birthday Holiday', sub: '' }
  ],
  // END SHEET-OWNED: peEvents

  // Real documents from the policies registry (docs/sources/policies-registry.md,
  // sheet 1J5J8xNhre5N3mr88vLSlSKUK_efVJ6rb6pq8zdRca9Q). Rule: admissions and fee
  // documents NEVER surface on the portal (Trevor, 2026-07-08). Sizes from live
  // HEAD checks 2026-07-08. href:null = no real document yet; render honest, never href="#".
  // Optional per-doc fields (sprint 3): reviewed:'YYYY-MM' -> a "Reviewed <Mon YYYY>"
  // mono stamp; rule:'one operative sentence' -> an "In short:" line. Honest only: set
  // reviewed from the registry's stated review date, rule from the PDF's own words, and
  // flag every extracted rule on docs/verify-v0.5.md (misquoting policy is worse than silence).
  docs: [
    { group: 'Start here', name: 'Parent handbook, 2026/27', sub: 'How the school runs, from the day to the year. The one to read first.', kind: 'PDF', tag: 'PDF · 1.9 MB', href: 'https://www.elc.ac.th/wp-content/uploads/Parent-Handbook-2026-27.pdf' },
    // CALENDAR ROWS REMOVED 2026-08-04 (Trevor, walking the policies hub per 0084). Four
    // rows went: 'Term dates and calendar' pointing at ../calendar/, plus the three
    // official WordPress academic-year calendars (City, PE 39/49/55, PE Samakee).
    // Policies is the document hub; the calendar has its own nav item AND tabbar tab on
    // every page, so the internal row was a third route to a place already two taps away.
    // The three external ones also sat beside the portal's own calendar offering families
    // a choice of calendars with no way to tell which is current, and the portal's is the
    // sheet-fed one (0046: sheet stays planning SSOT, portal publishes). Restoring is
    // re-adding these rows; the WordPress pages are untouched and still live.
    { group: 'Health and safety', name: 'Safeguarding and child protection', sub: 'Our commitment, and who to speak to if something is not right.', kind: 'PDF', tag: 'PDF · 700 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Safeguarding-and-Child-Protection-Policy-1.pdf' },
    // Re-uploaded 2026-08-07 04:07 UTC at the SAME URL (registry sheet row 14): 53 KB -> 23 KB
    // (22,671 bytes, HEAD-checked). Sizes here are decimal KB, matching the 2026-07-08 pass.
    { group: 'Health and safety', name: 'Safeguarding triage chart', sub: 'How a concern moves from first report to action, at a glance.', kind: 'PDF', tag: 'PDF · 23 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Safeguarding-Triage-Chart.pdf' },
    { group: 'Health and safety', name: 'School emergency operations plan', sub: 'How the school prepares for and responds to an emergency.', kind: 'PDF', tag: 'PDF · 810 KB', href: 'https://www.elc.ac.th/wp-content/uploads/School-Emergency-Operations-Policy-and-Plan.pdf' },
    { group: 'Health and safety', name: 'Accident and illness process', sub: 'What happens when a child is hurt or unwell at school.', kind: 'PDF', tag: 'PDF · 44 KB', href: 'https://www.elc.ac.th/wp-content/uploads/ACCIDENT-ILLNESS-PROCESS-23-24.pdf' },
    { group: 'Health and safety', name: 'Outdoor air quality policy', sub: 'How we decide on outdoor play when the air is poor.', kind: 'PDF', tag: 'PDF · 138 KB', href: 'https://www.elc.ac.th/wp-content/uploads/2025_Outdoor_Air_Quality_Policy.pdf' },
    { group: 'Health and safety', name: 'Safe handling policy', sub: 'How and when staff may physically support a child.', kind: 'PDF', tag: 'PDF · 131 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Safe-Handling-Policy.pdf' },
    { group: 'Health and safety', name: 'Low level of concern policy', sub: 'How we notice and act on the small worries early.', kind: 'PDF', tag: 'PDF · 148 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Low-Level-of-Concern-Policy.pdf' },
    { group: 'Health and safety', name: 'Intimate care guidelines', sub: 'How we support toileting and personal care with dignity.', kind: 'PDF', tag: 'PDF · 127 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Intimate-Care-Guidelines.pdf' },
    { group: 'Health and safety', name: 'Lightning procedures', sub: 'When outdoor activity stops and how we shelter.', kind: 'PDF', tag: 'PDF · 240 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Lightning-Procedures.pdf' },
    { group: 'Everyday', name: 'Challenging behaviour policy, 2026/27', sub: 'How we understand and respond to challenging behaviour.', kind: 'PDF', tag: 'PDF · 481 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Challenging-Behaviour-Policy-2026-27.pdf' },
    { group: 'Everyday', name: 'Bus behaviour policy', sub: 'What we expect on the bus, for safety and calm.', kind: 'PDF', tag: 'PDF · 123 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Bus-Behaviour-Policy.pdf' },
    { group: 'Everyday', name: 'Data privacy policy', sub: 'How we handle your family\'s information and images.', kind: 'PDF', tag: 'PDF · 85 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Data-Privacy-Policy.pdf' },
    { group: 'Everyday', name: 'Student technology acceptance', sub: 'How children use school technology, agreed each year.', kind: 'PDF', tag: 'PDF · 861 KB', href: 'https://www.elc.ac.th/wp-content/uploads/Student-Technology-Acceptance.pdf' },
    { group: 'Everyday', name: 'Digital assets acceptable use', sub: 'The rules for school accounts, devices and systems.', kind: 'PDF', tag: 'PDF · 163 KB', href: 'https://www.elc.ac.th/wp-content/uploads/ELC-Digital_Assets-Acceptable_Use_Policy.pdf' },
    { group: 'Everyday', name: 'Photo consent and takedown', sub: 'What we photograph, your choices, and our 48 hour takedown promise.', kind: 'LINK', tag: 'View', href: 'photo-consent/' },
    { group: 'Activities', name: 'Activity terms and conditions', sub: 'Booking, places and what happens if plans change.', kind: 'PDF', tag: null, href: null }
  ]
};
