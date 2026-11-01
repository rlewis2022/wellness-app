# Wellness App

Short daily practice for hands and mind, built for older adults on phones and tablets. Each visit is three activities picked at random: one hand-control activity, one thinking puzzle, and one everyday phone skill. People choose Easy, Medium or Hard before they start.

It runs in any modern phone or tablet browser. There is nothing to install and no account to create.

For general wellness only. It is not intended to diagnose, treat or prevent any condition.

## The activities

| Group | Activity | Easy | Medium | Hard |
|---|---|---|---|---|
| Hand control | **Connect the dots**: tap numbered dots in order to draw a picture | 4–5 large dots, next dot circled | 7–9 dots | 10–12 small dots |
| Hand control | **Find the way**: drag a line through a maze | 4 × 4 | 6 × 6 | 8 × 8 |
| Hand control | **Copy the drawing**: copy a small drawing freehand (not scored) | Square, triangle, plus sign | House, envelope, arrow | House with door and window, star, overlapping squares |
| Thinking puzzle | **Odd one out**: tap the word that doesn't belong | 3 questions, 3 words each | 4 questions, 4 words | 4 harder questions |
| Thinking puzzle | **Put in order**: tap answers in order (numbers, days, seasons, steps) | 2 questions, 3 items | 2 questions, 4 items | 2 questions, 5 items |
| Phone skills | **Typing**: type what's shown with the on-screen keyboard | 3 short words | 3 longer words | 2 short phrases |
| Phone skills | **Scroll and find**: find a name in a contact-style list | 15 names | 30 names, 2 rounds | 50 names, 2 rounds |
| Phone skills | **Use a slider**: slide a knob to a marked spot | 2 rounds, ±8 | 3 rounds, ±5 | 3 rounds, ±3 |
| Phone skills | **Swiping**: swipe a card the way the arrow points | 3 cards, left/right | 5 cards, left/right | 6 cards, all four directions |
| Phone skills | **Zoom in**: pinch to zoom and read a tiny sign | Larger sign | Smaller sign | Tiny sign in a random spot, look-alike answers |

There is no timer and no score. Wrong answers get a gentle hint and another try. After the third activity, a "Well done" screen invites them to come back tomorrow or do another session.

## Privacy

Nothing is kept and nothing is sent.

- **No storage.** No cookies, localStorage, IndexedDB, or any other browser storage. Each visit starts fresh.
- **No network requests.** No analytics, no web fonts, no third-party scripts. A Content Security Policy in `index.html` blocks every network connection except loading the site's own files.
- **Typed text stays on the page.** The typing activity's box has autocomplete off, and nothing typed is stored.

What the site cannot control: the host (GitHub Pages, your own server, and so on) may keep standard web server logs, such as IP addresses and visit times.

## Branding for a clinic

Everything a clinic would change lives in one file: **`brand.js`**. The brand carries through the whole app: start page, buttons, highlights, drawing ink, the maze, the activity header and the finish page.

| Setting | What it does |
|---|---|
| `name` | Shown at the top of the start page and in the browser tab |
| `tagline` | One line under the name |
| `welcome` | Optional welcome paragraph on the start page |
| `logo` | Logo file hosted with the site, such as `brand/logo.png`. Shown on the start page, in the activity header, and on the finish page |
| `logoDark` | Optional second logo for phones in dark mode, for example one with light text |
| `logoAlt` | Text read aloud by screen readers for the logo |
| `showName` | Set to `false` to hide the name when the logo already shows it |
| `colors.primary` | Buttons, highlights, maze path, drawing ink |
| `colors.accent` | Goal markers, the slider target, "find this" boxes |
| `font` | `'sans'`, `'serif'` or `'rounded'`, using fonts already on the device |
| `contact.text`, `contact.website`, `contact.websiteLabel` | Contact line and link on the start and finish pages |
| `finishMessage` | Extra line on the finish page |

**Rules the app enforces:**

- **Logos must be files hosted with the site** (or `data:` images). Links to logos on other websites are ignored, because loading them would let another site see visitors.
- **Colors are adjusted automatically for readability.** If a brand color is too light or too dark for text or buttons, in light or dark mode, the app shifts its shade until it meets contrast guidelines. Very pale brand colors will look a little deeper on screen.
- **Website links must start with `https://`.**

**Example:** `brands/example-clinic/` holds a made-up clinic's `brand.js`, logo and dark-mode logo. To try it, copy `brands/example-clinic/brand.js` over the top-level `brand.js`, keeping a copy of the original first.

**Live demo.** The `demo/` folder shows a made-up "Demo Clinic" brand at `/demo/` on the same site, with a note that it is not a real clinic. It has its own `brand.js` and logos in that folder.

**One site per clinic.** Each deployment shows one brand. For several clinics, deploy a copy of the site for each one with its own `brand.js` and logo.

## Running it

It's a static site with no build step.

**Try it on your computer.** From this folder, run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly from disk may not work in some browsers because of the security policy, so use a local server.

**Put it online with GitHub Pages:** in the repository, go to **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, and save. The site appears at `https://<username>.github.io/<repository>/`. Hosting it for a commercial purpose needs a commercial license (see License below).

## Changing the content

| What | Where |
|---|---|
| Words, puzzles, names and pictures | Lists near each activity in `js/activities.js`: `DOT_SHAPES`, `COPY_MODELS`, `ODD_SETS`, `ORDER_ROUNDS`, `TYPING_WORDS`, `FIRST_NAMES` |
| How hard each level is | The `cfg` values at the top of each activity's `mount` function in `js/activities.js` |
| Adding an activity | Add an object to `ACTIVITIES` in `js/activities.js` with `id`, `group` (`'hand'`, `'thinking'` or `'phone'`), `title`, `instruction(level)` and `mount(api)` |
| Palm size cut-off | `PALM_SIZE` in `js/activities.js` |
| Default colors | `brand.js`, or the fallback values at the top of `css/style.css` |

## Wording

The app's text describes general wellness ("keep your hands and mind active"). If you change the wording, avoid claims about diagnosing, treating, preventing or improving any medical condition. Claims like that can make software a regulated medical device in the US. Check any health-related wording with someone qualified before publishing it.

## Known limits

- **Pinch to zoom needs two fingers,** so it can't be done with a single stylus. The Zoom in and Zoom out buttons work as an alternative.
- **Cheap rubber-tip styluses look like a finger to the browser.** Extra touches while drawing and very large touches (a resting palm) are ignored, but a palm that lands first can still start a line.
- **Tested in a desktop browser engine at phone size**, including simulated two-finger pinch. It has not yet been tested on real iPhones and Android devices, or reviewed by an accessibility specialist.

## License

Wellness App is **free for personal and nonprofit use**. It is source-available under the [PolyForm Noncommercial License 1.0.0](LICENSE), which is not an open-source license.

In plain language (the [LICENSE](LICENSE) file is what legally applies):

- **Free to use, change, and share** for personal, non-commercial purposes, and for charitable organizations, schools, public research and health organizations, and government institutions.
- **Commercial use needs a paid license.** That includes a for-profit clinic, practice or company using it, branding it, or offering it as a service.
- **Keep the notice.** Anyone who shares this code must include the license and the line `Required Notice: Copyright 2026 Ronald A Lewis`.

For commercial licensing, contact **ralewis.firm@gmail.com**.

Copyright 2026 Ronald A Lewis.
