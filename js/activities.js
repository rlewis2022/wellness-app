'use strict';

/*
 * Wellness App: the activities.
 *
 * Each activity has:
 *   id, group ('hand' | 'thinking' | 'phone'), title,
 *   instruction(level) -> text shown under the title,
 *   mount(api) -> builds the activity inside api.area.
 *
 * The api object (from js/app.js) gives each activity:
 *   api.area, api.level ('easy' | 'medium' | 'hard'),
 *   api.say(text, good), api.done(message), api.button(label, kind),
 *   api.setInstruction(text), api.later(fn, ms), api.onResize(fn),
 *   api.onCleanup(fn), api.cssVar(name), api.vibrate(ms).
 *
 * All text people see comes from window.WELLNESS_LANG (js/lang/en.js or another language file).
 *
 * Nothing here stores or sends anything.
 */
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  // Contacts larger than this (CSS px) are treated as a palm, not a stylus tip or fingertip.
  const PALM_SIZE = 70;
  // All words people see come from the language file (js/lang/*.js).
  const L = window.WELLNESS_LANG;

  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pickN = (arr, n) => shuffle(arr).slice(0, n);
  const sameOrder = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
  }
  function svgEl(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs || {}).forEach((k) => e.setAttribute(k, attrs[k]));
    return e;
  }
  const pointsAttr = (pts) => pts.map((p) => `${p[0]},${p[1]}`).join(' ');
  const isPalm = (e) => e.pointerType === 'touch' && (e.width > PALM_SIZE || e.height > PALM_SIZE);
  const afterLayout = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  // One finger or stylus at a time. Extra contacts (a resting palm) are ignored.
  function singlePointer(target, handlers) {
    let active = null;
    const pos = (e) => {
      const r = target.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    target.addEventListener('pointerdown', (e) => {
      if (active !== null) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (isPalm(e)) return;
      e.preventDefault();
      active = e.pointerId;
      try { target.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
      if (handlers.down) handlers.down(pos(e), e);
    });
    target.addEventListener('pointermove', (e) => {
      if (e.pointerId !== active) return;
      e.preventDefault();
      let evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
      if (!evs.length) evs = [e];
      evs.forEach((ev) => { if (handlers.move) handlers.move(pos(ev), ev); });
    });
    const end = (e) => {
      if (e.pointerId !== active) return;
      active = null;
      if (handlers.up) handlers.up();
    };
    target.addEventListener('pointerup', end);
    target.addEventListener('pointercancel', end);
    target.addEventListener('lostpointercapture', end);
  }

  // A canvas that fills its holder at the screen's pixel density.
  function makeCanvas(holder) {
    const c = el('canvas');
    holder.appendChild(c);
    const pad = { c, ctx: c.getContext('2d'), w: 0, h: 0 };
    pad.fit = () => {
      const w = holder.clientWidth;
      const h = holder.clientHeight;
      if (!w || !h) return false; // screen is hidden
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      pad.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pad.w = w;
      pad.h = h;
      return true;
    };
    return pad;
  }

  const ACTIVITIES = [];

  /* =========================================================
     HAND CONTROL
     ========================================================= */

  /* ---------- Connect the dots ---------- */

  function starPoints() {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = (-90 + i * 36) * Math.PI / 180;
      const r = i % 2 ? 19 : 44;
      pts.push([+(50 + r * Math.cos(a)).toFixed(1), +(53 + r * Math.sin(a)).toFixed(1)]);
    }
    return pts;
  }
  function heartPoints() {
    const pts = [];
    for (let i = 0; i < 12; i++) {
      const t = (i / 12) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push([+(50 + 2.6 * x).toFixed(1), +(46 - 2.6 * y).toFixed(1)]);
    }
    return pts;
  }

  const DOT_SHAPES = {
    easy: [
      { id: 'house', pts: [[20, 85], [80, 85], [80, 45], [50, 15], [20, 45]] },
      { id: 'kite', pts: [[50, 8], [82, 42], [50, 92], [18, 42]] },
      { id: 'flag', pts: [[25, 90], [25, 10], [82, 28], [25, 46]] },
    ],
    medium: [
      { id: 'fish', pts: [[8, 50], [28, 30], [52, 25], [72, 40], [92, 24], [92, 76], [72, 60], [52, 75], [28, 70]] },
      { id: 'sailboat', pts: [[10, 64], [48, 64], [48, 10], [86, 60], [90, 64], [75, 86], [25, 86]] },
      { id: 'arrow', pts: [[8, 40], [60, 40], [60, 18], [92, 50], [60, 82], [60, 60], [8, 60]] },
    ],
    hard: [
      { id: 'star', pts: starPoints() },
      { id: 'tree', pts: [[50, 6], [76, 38], [63, 38], [84, 64], [55, 64], [55, 92], [45, 92], [45, 64], [16, 64], [37, 38], [24, 38]] },
      { id: 'heart', pts: heartPoints() },
    ],
  };

  ACTIVITIES.push({
    id: 'dots',
    group: 'hand',
    title: L.dots.title,
    instruction: (level) => L.dots.instruction(level),
    mount(api) {
      const cfg = { easy: { r: 7, font: 6.2 }, medium: { r: 5.6, font: 4.8 }, hard: { r: 4.6, font: 4 } }[api.level];
      const shape = pick(DOT_SHAPES[api.level]);
      const pts = shape.pts;

      const holder = el('div', 'pad');
      const svg = svgEl('svg', { viewBox: '-8 -8 116 116', preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': L.dots.aria });
      const reveal = svgEl('polygon', { class: 'dots-reveal', points: pointsAttr(pts) });
      const lines = svgEl('g');
      const dots = svgEl('g');
      svg.append(reveal, lines, dots);
      holder.appendChild(svg);
      api.area.appendChild(holder);

      const nodes = pts.map((p, i) => {
        const g = svgEl('g', { class: 'dot' });
        g.append(
          svgEl('circle', { cx: p[0], cy: p[1], r: cfg.r + 2.4, class: 'dot-ring' }),
          svgEl('circle', { cx: p[0], cy: p[1], r: cfg.r, class: 'dot-fill' }),
        );
        const t = svgEl('text', { x: p[0], y: p[1], class: 'dot-num', 'font-size': cfg.font, 'text-anchor': 'middle', 'dominant-baseline': 'central' });
        t.textContent = String(i + 1);
        g.appendChild(t);
        dots.appendChild(g);
        return g;
      });

      let next = 0;
      const mark = () => nodes.forEach((g, i) => {
        g.classList.toggle('is-done', i < next);
        g.classList.toggle('is-next', api.level === 'easy' && i === next);
      });
      mark();

      const line = (a, b) => lines.appendChild(svgEl('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'dot-line' }));

      svg.addEventListener('pointerdown', (e) => {
        if (next >= pts.length || isPalm(e)) return;
        e.preventDefault();
        const m = svg.getScreenCTM();
        if (!m) return;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const p = pt.matrixTransform(m.inverse());
        let hit = -1;
        let best = Infinity;
        pts.forEach((q, i) => {
          const d = Math.hypot(q[0] - p.x, q[1] - p.y);
          if (d < cfg.r + 5 && d < best) { best = d; hit = i; }
        });
        if (hit === -1 || hit < next) return;
        if (hit !== next) {
          api.say(L.dots.wrong(hit + 1, next + 1));
          return;
        }
        if (next > 0) line(pts[next - 1], pts[next]);
        next += 1;
        mark();
        api.say('');
        api.vibrate(15);
        if (next === pts.length) {
          line(pts[next - 1], pts[0]);
          reveal.classList.add('is-shown');
          api.done(L.dots.done(L.dots.names[shape.id]));
        }
      });
    },
  });

  /* ---------- Maze ---------- */

  function makeMaze(n) {
    const walls = Array.from({ length: n * n }, () => ({ n: true, e: true, s: true, w: true }));
    const seen = new Array(n * n).fill(false);
    const stack = [0];
    seen[0] = true;
    while (stack.length) {
      const c = stack[stack.length - 1];
      const x = c % n;
      const y = Math.floor(c / n);
      const opts = [];
      if (y > 0 && !seen[c - n]) opts.push(['n', c - n, 's']);
      if (x < n - 1 && !seen[c + 1]) opts.push(['e', c + 1, 'w']);
      if (y < n - 1 && !seen[c + n]) opts.push(['s', c + n, 'n']);
      if (x > 0 && !seen[c - 1]) opts.push(['w', c - 1, 'e']);
      if (!opts.length) { stack.pop(); continue; }
      const [d, nb, back] = pick(opts);
      walls[c][d] = false;
      walls[nb][back] = false;
      seen[nb] = true;
      stack.push(nb);
    }
    return walls;
  }
  function neighborDir(n, a, b) {
    if (b === a - n) return 'n';
    if (b === a + n) return 's';
    if (b === a + 1 && a % n !== n - 1) return 'e';
    if (b === a - 1 && a % n !== 0) return 'w';
    return null;
  }

  ACTIVITIES.push({
    id: 'maze',
    group: 'hand',
    title: L.maze.title,
    instruction: () => L.maze.instruction,
    mount(api) {
      const n = { easy: 4, medium: 6, hard: 8 }[api.level];
      const walls = makeMaze(n);
      const goal = n * n - 1;
      const holder = el('div', 'pad');
      api.area.appendChild(holder);
      const pad = makeCanvas(holder);
      const geo = { ox: 0, oy: 0, cell: 1 };
      let path = [0];
      let drawing = false;
      let finished = false;
      let lastWallMsg = 0;

      const center = (c) => [geo.ox + (c % n + 0.5) * geo.cell, geo.oy + (Math.floor(c / n) + 0.5) * geo.cell];
      function cellAt([x, y]) {
        const ix = Math.floor((x - geo.ox) / geo.cell);
        const iy = Math.floor((y - geo.oy) / geo.cell);
        if (ix < 0 || iy < 0 || ix >= n || iy >= n) return null;
        return iy * n + ix;
      }

      function draw() {
        const g = pad.ctx;
        const cell = geo.cell;
        g.clearRect(0, 0, pad.w, pad.h);

        const [sx, sy] = center(0);
        g.fillStyle = api.cssVar('--success');
        g.beginPath();
        g.arc(sx, sy, cell * 0.3, 0, Math.PI * 2);
        g.fill();

        const [ex, ey] = center(goal);
        g.fillStyle = api.cssVar('--accent');
        g.fillRect(ex - cell * 0.27, ey - cell * 0.27, cell * 0.54, cell * 0.54);

        g.strokeStyle = api.cssVar('--primary');
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.lineWidth = Math.max(8, cell * 0.3);
        g.beginPath();
        path.forEach((c, i) => {
          const [x, y] = center(c);
          if (i) g.lineTo(x, y); else g.moveTo(x, y);
        });
        if (path.length === 1) g.lineTo(sx + 0.01, sy);
        g.stroke();

        g.strokeStyle = api.cssVar('--wall');
        g.lineWidth = Math.max(3, cell * 0.07);
        g.lineCap = 'round';
        g.beginPath();
        for (let c = 0; c < n * n; c++) {
          const x0 = geo.ox + (c % n) * cell;
          const y0 = geo.oy + Math.floor(c / n) * cell;
          const w = walls[c];
          if (w.n) { g.moveTo(x0, y0); g.lineTo(x0 + cell, y0); }
          if (w.w) { g.moveTo(x0, y0); g.lineTo(x0, y0 + cell); }
          if (w.e && c % n === n - 1) { g.moveTo(x0 + cell, y0); g.lineTo(x0 + cell, y0 + cell); }
          if (w.s && Math.floor(c / n) === n - 1) { g.moveTo(x0, y0 + cell); g.lineTo(x0 + cell, y0 + cell); }
        }
        g.stroke();

        if (!finished && path.length > 1) {
          const [lx, ly] = center(path[path.length - 1]);
          g.strokeStyle = api.cssVar('--accent');
          g.lineWidth = 3;
          g.beginPath();
          g.arc(lx, ly, cell * 0.3, 0, Math.PI * 2);
          g.stroke();
        }
      }

      function layout() {
        if (!pad.fit()) return;
        const size = Math.min(pad.w, pad.h) - 16;
        geo.cell = size / n;
        geo.ox = (pad.w - size) / 2;
        geo.oy = (pad.h - size) / 2;
        draw();
      }

      singlePointer(pad.c, {
        down(p) {
          if (finished) return;
          const c = cellAt(p);
          if (c === null) return;
          const i = path.indexOf(c);
          if (i === -1) {
            api.say(path.length === 1 ? L.maze.start : L.maze.keepGoing);
            return;
          }
          path = path.slice(0, i + 1);
          drawing = true;
          api.say('');
          draw();
        },
        move(p) {
          if (!drawing || finished) return;
          const c = cellAt(p);
          const last = path[path.length - 1];
          if (c === null || c === last) return;
          const i = path.indexOf(c);
          if (i !== -1) { path = path.slice(0, i + 1); draw(); return; }
          const dir = neighborDir(n, last, c);
          if (!dir) return; // moved too far at once; wait for the next point
          if (walls[last][dir]) {
            const now = Date.now();
            if (now - lastWallMsg > 1500) {
              api.say(L.maze.wall);
              lastWallMsg = now;
            }
            return;
          }
          path.push(c);
          draw();
          if (c === goal) {
            finished = true;
            drawing = false;
            draw();
            api.done(L.maze.done);
          }
        },
        up() { drawing = false; },
      });

      afterLayout(layout);
      api.onResize(layout);
    },
  });

  /* ---------- Copy a drawing ---------- */

  const COPY_MODELS = {
    easy: [
      { id: 'square', strokes: [[[20, 20], [80, 20], [80, 80], [20, 80], [20, 20]]] },
      { id: 'triangle', strokes: [[[50, 15], [86, 82], [14, 82], [50, 15]]] },
      { id: 'plus', strokes: [[[50, 12], [50, 88]], [[12, 50], [88, 50]]] },
    ],
    medium: [
      { id: 'house', strokes: [[[22, 50], [22, 86], [78, 86], [78, 50], [22, 50]], [[14, 52], [50, 16], [86, 52]]] },
      { id: 'envelope', strokes: [[[12, 26], [88, 26], [88, 76], [12, 76], [12, 26]], [[12, 26], [50, 54], [88, 26]]] },
      { id: 'arrow', strokes: [[[50, 88], [50, 14]], [[24, 40], [50, 14], [76, 40]]] },
    ],
    hard: [
      {
        id: 'houseDetail',
        strokes: [
          [[22, 50], [22, 86], [78, 86], [78, 50], [22, 50]], [[14, 52], [50, 16], [86, 52]],
          [[44, 86], [44, 66], [58, 66], [58, 86]], [[28, 58], [38, 58], [38, 68], [28, 68], [28, 58]],
        ],
      },
      { id: 'star', strokes: [starPoints().concat([starPoints()[0]])] },
      { id: 'twoSquares', strokes: [[[12, 12], [60, 12], [60, 60], [12, 60], [12, 12]], [[40, 40], [88, 40], [88, 88], [40, 88], [40, 40]]] },
    ],
  };

  ACTIVITIES.push({
    id: 'copy',
    group: 'hand',
    title: L.copy.title,
    instruction: () => L.copy.instruction,
    mount(api) {
      const model = pick(COPY_MODELS[api.level]);
      const box = el('div', 'model-box');
      const ms = svgEl('svg', { viewBox: '0 0 100 100', preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': L.copy.aria(L.copy.names[model.id]) });
      model.strokes.forEach((st) => ms.appendChild(svgEl('polyline', { points: pointsAttr(st), class: 'model-line' })));
      box.append(ms, el('p', 'model-label', L.copy.label(L.copy.names[model.id])));
      const holder = el('div', 'pad');
      api.area.append(box, holder);
      const pad = makeCanvas(holder);

      let strokes = [];
      let points = 0;
      const clear = api.button(L.copy.clear, 'secondary');
      const doneBtn = api.button(L.copy.doneButton, 'primary');
      doneBtn.disabled = true;

      function style(g) {
        g.strokeStyle = api.cssVar('--primary-text');
        g.lineWidth = 7;
        g.lineCap = 'round';
        g.lineJoin = 'round';
      }
      function redraw() {
        const g = pad.ctx;
        g.clearRect(0, 0, pad.w, pad.h);
        style(g);
        strokes.forEach((st) => {
          g.beginPath();
          st.forEach(([x, y], i) => { if (i) g.lineTo(x, y); else g.moveTo(x, y); });
          if (st.length === 1) g.lineTo(st[0][0] + 0.01, st[0][1]);
          g.stroke();
        });
      }

      singlePointer(pad.c, {
        down(p) { strokes.push([p]); redraw(); },
        move(p) {
          const st = strokes[strokes.length - 1];
          const prev = st[st.length - 1];
          st.push(p);
          points += 1;
          const g = pad.ctx;
          style(g);
          g.beginPath();
          g.moveTo(prev[0], prev[1]);
          g.lineTo(p[0], p[1]);
          g.stroke();
        },
        up() {
          if (points >= 25) {
            doneBtn.disabled = false;
            api.say(L.copy.hint);
          }
        },
      });

      clear.addEventListener('click', () => {
        strokes = [];
        points = 0;
        doneBtn.disabled = true;
        api.say('');
        redraw();
      });
      doneBtn.addEventListener('click', () => api.done(L.copy.done));

      const layout = () => { if (pad.fit()) redraw(); };
      afterLayout(layout);
      api.onResize(layout);
    },
  });

  /* =========================================================
     THINKING PUZZLES
     ========================================================= */

  /* ---------- Odd one out ---------- */

  ACTIVITIES.push({
    id: 'odd',
    group: 'thinking',
    title: L.odd.title,
    instruction: () => L.odd.instruction,
    mount(api) {
      const rounds = pickN(L.odd.sets[api.level], api.level === 'easy' ? 3 : 4);
      let r = 0;
      const label = el('p', 'round-label');
      const grid = el('div', 'choice-grid');
      api.area.append(label, grid);

      function show() {
        const set = rounds[r];
        label.textContent = L.ui.question(r + 1, rounds.length);
        grid.textContent = '';
        shuffle(set.items).forEach((word) => {
          const b = el('button', 'choice', word);
          b.type = 'button';
          b.addEventListener('click', () => {
            if (word === set.odd) {
              b.classList.add('is-right');
              grid.querySelectorAll('button').forEach((x) => { x.disabled = true; });
              api.say(L.odd.right(set.why), true);
              api.vibrate(30);
              api.later(() => {
                r += 1;
                if (r < rounds.length) { api.say(''); show(); } else api.done(L.odd.done);
              }, 1800);
            } else {
              b.classList.add('is-wrong');
              api.say(L.odd.wrong);
            }
          });
          grid.appendChild(b);
        });
      }
      show();
    },
  });

  /* ---------- Put in order ---------- */

  // Builds one round from a definition in the language file (see order.rounds in js/lang/en.js).
  function makeRound(def) {
    if (def.type === 'numbers') {
      const nums = pickN(Array.from({ length: def.max }, (_, i) => i + 1), def.count).sort((a, b) => a - b).map(String);
      return { prompt: def.prompt, items: nums };
    }
    if (def.type === 'slice') {
      const start = rand(def.list.length - def.count + 1);
      return { prompt: def.prompt, items: def.list.slice(start, start + def.count) };
    }
    if (def.type === 'pick') {
      const chosen = new Set(pickN(def.list, def.count));
      return { prompt: def.prompt, items: def.list.filter((x) => chosen.has(x)) };
    }
    return { prompt: def.prompt, items: def.items.slice() };
  }

  ACTIVITIES.push({
    id: 'order',
    group: 'thinking',
    title: L.order.title,
    instruction: () => L.order.instruction,
    mount(api) {
      const rounds = pickN(L.order.rounds[api.level], 2).map(makeRound);
      let r = 0;
      const label = el('p', 'round-label');
      const prompt = el('p', 'order-prompt');
      const list = el('div', 'order-list');
      api.area.append(label, prompt, list);

      function show() {
        const round = rounds[r];
        let k = 0;
        label.textContent = L.ui.question(r + 1, rounds.length);
        prompt.textContent = round.prompt;
        list.textContent = '';
        let order = shuffle(round.items);
        while (sameOrder(order, round.items)) order = shuffle(round.items);
        order.forEach((text) => {
          const b = el('button', 'order-item');
          b.type = 'button';
          const badge = el('span', 'order-badge');
          b.append(badge, el('span', null, text));
          b.addEventListener('click', () => {
            if (b.classList.contains('is-done')) return;
            if (text === round.items[k]) {
              k += 1;
              badge.textContent = String(k);
              b.classList.remove('is-wrong');
              b.classList.add('is-done');
              api.say('');
              api.vibrate(15);
              if (k === round.items.length) {
                api.say(L.order.right, true);
                list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
                api.later(() => {
                  r += 1;
                  if (r < rounds.length) { api.say(''); show(); } else api.done(L.order.done);
                }, 1500);
              }
            } else {
              b.classList.add('is-wrong');
              api.say(k === 0 ? L.order.wrongFirst : L.order.wrongNext);
            }
          });
          list.appendChild(b);
        });
      }
      show();
    },
  });

  /* =========================================================
     PHONE SKILLS
     ========================================================= */

  /* ---------- Typing ---------- */

  const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');

  ACTIVITIES.push({
    id: 'typing',
    group: 'phone',
    title: L.typing.title,
    instruction: () => L.typing.instruction,
    mount(api) {
      const words = pickN(L.typing.words[api.level], api.level === 'hard' ? 2 : 3);
      let r = 0;
      const label = el('p', 'round-label');
      const target = el('p', 'typing-target');
      const form = el('form', 'typing-form');
      form.noValidate = true;
      const inputLabel = el('label', null, L.typing.label);
      inputLabel.htmlFor = 'typing-input';
      const input = el('input', 'typing-input');
      input.id = 'typing-input';
      input.type = 'text';
      input.autocomplete = 'off';
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('enterkeyhint', 'done');
      input.spellcheck = false;
      form.append(inputLabel, input);
      api.area.append(label, target, form);
      const check = api.button(L.typing.check, 'primary');

      function show() {
        label.textContent = L.ui.progress(r + 1, words.length);
        target.textContent = words[r];
        input.value = '';
        input.disabled = false;
        check.disabled = false;
      }
      function submit() {
        const typed = normalize(input.value);
        if (!typed) { api.say(L.typing.empty); return; }
        if (typed === normalize(words[r])) {
          api.say(L.typing.right, true);
          api.vibrate(30);
          input.disabled = true;
          check.disabled = true;
          api.later(() => {
            r += 1;
            if (r < words.length) { api.say(''); show(); } else api.done(L.typing.done);
          }, 1200);
        } else {
          api.say(L.typing.wrong);
        }
      }
      form.addEventListener('submit', (e) => { e.preventDefault(); submit(); });
      check.addEventListener('click', submit);
      show();
    },
  });

  /* ---------- Scroll and find ---------- */

  ACTIVITIES.push({
    id: 'scroll',
    group: 'phone',
    title: L.scroll.title,
    instruction: () => L.scroll.instruction,
    mount(api) {
      const count = { easy: 15, medium: 30, hard: 50 }[api.level];
      const rounds = api.level === 'easy' ? 1 : 2;
      let r = 0;
      const label = el('p', 'round-label');
      const goal = el('p', 'find-target');
      const list = el('div', 'find-list');
      list.setAttribute('aria-label', L.scroll.listLabel);
      api.area.append(label, goal, list);

      function show() {
        const names = pickN(L.scroll.names, count)
          .map((f) => `${f} ${pick(L.scroll.initials)}.`)
          .sort((a, b) => a.localeCompare(b, L.code));
        const start = Math.floor(count * 0.45);
        const target = names[start + rand(count - start)];
        label.textContent = rounds > 1 ? L.ui.progress(r + 1, rounds) : '';
        label.hidden = rounds === 1;
        goal.textContent = L.scroll.find;
        goal.appendChild(el('strong', null, target));
        list.textContent = '';
        list.scrollTop = 0;
        names.forEach((name) => {
          const b = el('button', 'find-row');
          b.type = 'button';
          b.append(el('span', 'find-avatar', name[0]), el('span', null, name));
          b.addEventListener('click', () => {
            if (name === target) {
              b.classList.add('is-right');
              list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
              api.say(L.scroll.right, true);
              api.vibrate(30);
              api.later(() => {
                r += 1;
                if (r < rounds) { api.say(''); show(); } else api.done(L.scroll.done);
              }, 1200);
            } else {
              api.say(L.scroll.wrong(name, target));
            }
          });
          list.appendChild(b);
        });
      }
      show();
    },
  });

  /* ---------- Slider ---------- */

  ACTIVITIES.push({
    id: 'slider',
    group: 'phone',
    title: L.slider.title,
    instruction: () => L.slider.instruction,
    mount(api) {
      const cfg = { easy: { rounds: 2, tol: 8 }, medium: { rounds: 3, tol: 5 }, hard: { rounds: 3, tol: 3 } }[api.level];
      let r = 0;
      let target = 50;
      const label = el('p', 'round-label');
      const goalText = el('p', 'slider-goal');
      const wrap = el('div', 'slider-wrap');
      const marker = el('div', 'slider-target');
      const markerLabel = el('span', 'slider-target-label');
      marker.append(markerLabel, el('span', 'slider-target-stem'));
      const input = el('input', 'slider-input');
      input.type = 'range';
      input.id = 'slider-input';
      input.min = '0';
      input.max = '100';
      input.step = '1';
      input.setAttribute('aria-label', L.slider.aria);
      wrap.append(marker, input);
      const now = el('p', 'slider-now');
      api.area.append(label, goalText, wrap, now);

      function show() {
        target = 10 + rand(81);
        const start = target > 50 ? rand(21) : 80 + rand(21);
        input.value = String(start);
        input.disabled = false;
        label.textContent = L.ui.progress(r + 1, cfg.rounds);
        goalText.textContent = L.slider.goal;
        goalText.appendChild(el('strong', null, String(target)));
        markerLabel.textContent = String(target);
        wrap.style.setProperty('--t', String(target));
        now.textContent = L.slider.now(start);
      }
      input.addEventListener('input', () => { now.textContent = L.slider.now(input.value); });
      input.addEventListener('change', () => {
        const diff = Number(input.value) - target;
        if (Math.abs(diff) <= cfg.tol) {
          api.say(L.slider.right, true);
          api.vibrate(30);
          input.disabled = true;
          api.later(() => {
            r += 1;
            if (r < cfg.rounds) { api.say(''); show(); } else api.done(L.slider.done);
          }, 1200);
        } else {
          api.say(diff < 0 ? L.slider.more : L.slider.less);
        }
      });
      show();
    },
  });

  /* ---------- Swipe ---------- */

  const ARROWS = { left: '←', right: '→', up: '↑', down: '↓' };
  const swipeText = (d) => L.swipe.text(d);

  ACTIVITIES.push({
    id: 'swipe',
    group: 'phone',
    title: L.swipe.title,
    instruction: () => L.swipe.instruction,
    mount(api) {
      const total = { easy: 3, medium: 5, hard: 6 }[api.level];
      const base = api.level === 'hard' ? ['left', 'right', 'up', 'down'] : ['left', 'right'];
      const extra = Array.from({ length: total - base.length }, () => pick(base));
      const seq = shuffle(base.concat(extra));
      let i = 0;
      const label = el('p', 'round-label');
      const stage = el('div', 'swipe-stage');
      api.area.append(label, stage);
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function show() {
        const want = seq[i];
        label.textContent = L.swipe.card(i + 1, total, swipeText(want));
        stage.textContent = '';
        const card = el('div', 'swipe-card');
        card.append(el('span', 'swipe-arrow', ARROWS[want]), el('span', 'swipe-word', L.swipe.word[want]));
        card.setAttribute('aria-label', swipeText(want));
        stage.appendChild(card);

        let start = null;
        let moved = [0, 0];
        let busy = false;
        const setPos = (dx, dy) => { card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 25}deg)`; };

        singlePointer(card, {
          down(p, e) {
            if (busy) return;
            start = [e.clientX, e.clientY];
            moved = [0, 0];
            card.className = 'swipe-card is-moving';
          },
          move(p, e) {
            if (!start || busy) return;
            moved = [e.clientX - start[0], e.clientY - start[1]];
            setPos(moved[0], moved[1]);
          },
          up() {
            if (!start || busy) return;
            start = null;
            const [dx, dy] = moved;
            const threshold = Math.min(90, stage.clientWidth * 0.22);
            let dir = null;
            if (Math.max(Math.abs(dx), Math.abs(dy)) >= threshold) {
              dir = Math.abs(dx) >= Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
            }
            if (dir === want) {
              busy = true;
              api.say('');
              api.vibrate(25);
              const far = Math.max(stage.clientWidth, stage.clientHeight) * 1.2;
              const out = { left: [-far, dy], right: [far, dy], up: [dx, -far], down: [dx, far] }[dir];
              card.className = 'swipe-card is-leaving';
              setPos(out[0], out[1]);
              api.later(() => {
                i += 1;
                if (i < total) show(); else { stage.textContent = ''; api.done(L.swipe.done); }
              }, reduceMotion ? 50 : 320);
            } else {
              card.className = 'swipe-card is-settling';
              setPos(0, 0);
              if (dir) api.say(L.swipe.wrongDir(L.swipe.dir[dir], swipeText(want)));
              else if (Math.abs(dx) + Math.abs(dy) > 12) api.say(L.swipe.tooShort);
            }
          },
        });
      }
      show();
    },
  });

  /* ---------- Pinch to zoom ---------- */

  const SCENE_W = 100;
  const SCENE_H = 75;

  function buildScene(svg) {
    svg.append(
      svgEl('rect', { x: 0, y: 0, width: SCENE_W, height: SCENE_H, class: 'sc-sky' }),
      svgEl('circle', { cx: 86, cy: 12, r: 6, class: 'sc-sun' }),
      svgEl('path', { d: 'M0 52 Q 25 38 50 50 T 100 46 V 75 H 0 Z', class: 'sc-hill' }),
      svgEl('path', { d: 'M0 62 Q 30 54 60 62 T 100 60 V 75 H 0 Z', class: 'sc-hill-2' }),
      // house
      svgEl('rect', { x: 12, y: 36, width: 24, height: 20, class: 'sc-house' }),
      svgEl('polygon', { points: '9,37 24,25 39,37', class: 'sc-roof' }),
      svgEl('rect', { x: 21, y: 45, width: 6, height: 11, class: 'sc-door' }),
      svgEl('rect', { x: 14.5, y: 40, width: 5, height: 5, class: 'sc-window' }),
      svgEl('rect', { x: 29, y: 40, width: 5, height: 5, class: 'sc-window' }),
      // tree
      svgEl('rect', { x: 73, y: 38, width: 3, height: 14, class: 'sc-trunk' }),
      svgEl('circle', { cx: 74.5, cy: 33, r: 8, class: 'sc-leaf' }),
    );
  }

  ACTIVITIES.push({
    id: 'zoom',
    group: 'phone',
    title: L.zoom.title,
    instruction: (level) => L.zoom.instruction(level),
    mount(api) {
      const cfg = {
        easy: { font: 3.2, choices: 3, spots: [[54, 54]] },
        medium: { font: 1.7, choices: 3, spots: [[54, 54], [44, 64], [60, 48]] },
        hard: { font: 1.0, choices: 4, spots: [[54, 54], [90, 50], [6, 66], [62, 32], [42, 68]] },
      }[api.level];

      const answer = 10 + rand(90);
      const options = new Set([answer]);
      const swapped = Number(String(answer).split('').reverse().join(''));
      if (api.level === 'hard' && swapped >= 10 && swapped !== answer) options.add(swapped);
      while (options.size < cfg.choices) options.add(10 + rand(90));

      const view = el('div', 'zoom-view');
      const svg = svgEl('svg', { viewBox: `0 0 ${SCENE_W} ${SCENE_H}`, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': L.zoom.aria });
      buildScene(svg);
      const [sx, sy] = pick(cfg.spots);
      const bw = cfg.font * 2.4;
      const bh = cfg.font * 1.5;
      svg.append(
        svgEl('rect', { x: sx - cfg.font * 0.12, y: sy, width: cfg.font * 0.24, height: cfg.font * 2.6, class: 'sc-post' }),
        svgEl('rect', { x: sx - bw / 2, y: sy - bh, width: bw, height: bh, rx: cfg.font * 0.15, class: 'sc-sign' }),
      );
      const t = svgEl('text', { x: sx, y: sy - bh / 2, 'font-size': cfg.font, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'sc-sign-text' });
      t.textContent = String(answer);
      svg.appendChild(t);
      view.appendChild(svg);

      const tools = el('div', 'zoom-tools');
      const zin = el('button', 'btn btn-secondary', L.zoom.zoomIn);
      const zout = el('button', 'btn btn-secondary', L.zoom.zoomOut);
      const zreset = el('button', 'btn btn-secondary', L.zoom.reset);
      [zin, zout, zreset].forEach((b) => { b.type = 'button'; tools.appendChild(b); });

      const choices = el('div', 'choice-grid zoom-choices');
      const ask = el('p', 'round-label', L.zoom.ask);
      api.area.append(view, tools, ask, choices);

      // View state: center point and zoom level. Changing the viewBox keeps the picture sharp.
      const st = { cx: SCENE_W / 2, cy: SCENE_H / 2, z: 1 };
      const MAX_Z = 8;
      function apply() {
        st.z = Math.min(MAX_Z, Math.max(1, st.z));
        const w = SCENE_W / st.z;
        const h = SCENE_H / st.z;
        st.cx = Math.min(SCENE_W - w / 2, Math.max(w / 2, st.cx));
        st.cy = Math.min(SCENE_H - h / 2, Math.max(h / 2, st.cy));
        svg.setAttribute('viewBox', `${st.cx - w / 2} ${st.cy - h / 2} ${w} ${h}`);
        zout.disabled = st.z <= 1;
        zin.disabled = st.z >= MAX_Z;
      }
      const upp = (z) => (SCENE_W / z) / (view.clientWidth || 1); // scene units per screen pixel
      function worldAt(px, py) {
        const u = upp(st.z);
        return [st.cx - SCENE_W / st.z / 2 + px * u, st.cy - SCENE_H / st.z / 2 + py * u];
      }
      function zoomAround(px, py, newZ) {
        const [wx, wy] = worldAt(px, py);
        st.z = Math.min(MAX_Z, Math.max(1, newZ));
        const u = upp(st.z);
        st.cx = wx - px * u + SCENE_W / st.z / 2;
        st.cy = wy - py * u + SCENE_H / st.z / 2;
        apply();
      }

      const pointers = new Map();
      let gesture = null;
      const local = (e) => {
        const r = view.getBoundingClientRect();
        return [e.clientX - r.left, e.clientY - r.top];
      };
      function resetGesture() {
        const pts = Array.from(pointers.values());
        if (pts.length >= 2) {
          const [a, b] = pts;
          const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          gesture = { type: 'pinch', d0: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z0: st.z, world: worldAt(mid[0], mid[1]) };
        } else if (pts.length === 1) {
          gesture = { type: 'pan', last: pts[0] };
        } else {
          gesture = null;
        }
      }
      view.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.preventDefault();
        try { view.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
        pointers.set(e.pointerId, local(e));
        resetGesture();
      });
      view.addEventListener('pointermove', (e) => {
        if (!pointers.has(e.pointerId)) return;
        e.preventDefault();
        pointers.set(e.pointerId, local(e));
        if (!gesture) return;
        if (gesture.type === 'pinch' && pointers.size >= 2) {
          const [a, b] = Array.from(pointers.values());
          const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
          const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          st.z = Math.min(MAX_Z, Math.max(1, gesture.z0 * (d / gesture.d0)));
          const u = upp(st.z);
          st.cx = gesture.world[0] - mid[0] * u + SCENE_W / st.z / 2;
          st.cy = gesture.world[1] - mid[1] * u + SCENE_H / st.z / 2;
          apply();
        } else if (gesture.type === 'pan') {
          const p = pointers.get(e.pointerId);
          const u = upp(st.z);
          st.cx -= (p[0] - gesture.last[0]) * u;
          st.cy -= (p[1] - gesture.last[1]) * u;
          gesture.last = p;
          apply();
        }
      });
      const lift = (e) => {
        if (!pointers.has(e.pointerId)) return;
        pointers.delete(e.pointerId);
        resetGesture();
      };
      view.addEventListener('pointerup', lift);
      view.addEventListener('pointercancel', lift);
      view.addEventListener('lostpointercapture', lift);
      view.addEventListener('wheel', (e) => {
        e.preventDefault();
        const [px, py] = local(e);
        zoomAround(px, py, st.z * (e.deltaY < 0 ? 1.2 : 1 / 1.2));
      }, { passive: false });

      const mid = () => [view.clientWidth / 2, view.clientHeight / 2];
      zin.addEventListener('click', () => zoomAround(...mid(), st.z * 1.6));
      zout.addEventListener('click', () => zoomAround(...mid(), st.z / 1.6));
      zreset.addEventListener('click', () => { st.z = 1; st.cx = SCENE_W / 2; st.cy = SCENE_H / 2; apply(); });

      shuffle(Array.from(options)).forEach((num) => {
        const b = el('button', 'choice', String(num));
        b.type = 'button';
        b.addEventListener('click', () => {
          if (num === answer) {
            b.classList.add('is-right');
            choices.querySelectorAll('button').forEach((x) => { x.disabled = true; });
            api.done(L.zoom.done(answer));
          } else {
            b.classList.add('is-wrong');
            api.say(L.zoom.wrong);
          }
        });
        choices.appendChild(b);
      });

      apply();
    },
  });

  window.WELLNESS_ACTIVITIES = ACTIVITIES;
})();
