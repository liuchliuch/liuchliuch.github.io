import { SWITCH_COUNT, RULES, followsRules, allowedArrangements, bitsOf } from './counting.js';

const $ = selector => document.querySelector(selector);
const svgNS = 'http://www.w3.org/2000/svg';
const palette = { ink: 'var(--ink)', accent: 'var(--orange)', blue: 'var(--navy)', muted: 'var(--slate)', red: 'var(--red)' };
const originals = new Map([...document.querySelectorAll('[data-zh]')].map(el => [el, el.innerHTML]));
const positions = [[120, 26], [188, 65], [188, 143], [120, 182], [52, 143], [52, 65]];
const miniPositions = [[20, 4], [32, 11], [32, 25], [20, 32], [8, 25], [8, 11]];
let language = 'en';
let rule = 'cycle';
let arrangement = 21;
let gridFocus = 21;

const copy = (en, zh) => language === 'zh' ? zh : en;
const format = number => Number(number.toFixed(5)).toString();
function svgElement(tag, attributes = {}, text = '') {
  const el = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  if (text) el.textContent = text;
  return el;
}
function miniature(mask, { edges = RULES.cycle, valid = true } = {}) {
  const svg = svgElement('svg', { viewBox: '0 0 40 36', 'aria-hidden': 'true', class: 'mini-cycle' });
  edges.forEach(([a, b]) => svg.append(svgElement('line', { x1: miniPositions[a][0], y1: miniPositions[a][1], x2: miniPositions[b][0], y2: miniPositions[b][1], stroke: valid ? palette.muted : '#b8bfbd', 'stroke-width': .8 })));
  bitsOf(mask).forEach((on, i) => svg.append(svgElement('circle', { cx: miniPositions[i][0], cy: miniPositions[i][1], r: 2.8, fill: on ? (valid ? palette.accent : '#aab3b5') : 'var(--pale)', stroke: valid ? palette.accent : '#aab3b5', 'stroke-width': .8 })));
  return svg;
}
function buildExperiment() {
  positions.forEach(([x, y], i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'switch-node';
    button.style.left = `${x / 240 * 100}%`;
    button.style.top = `${y / 208 * 100}%`;
    button.addEventListener('click', () => { arrangement ^= 1 << i; renderExperiment(); });
    $('#switch-nodes').append(button);
  });
  for (let mask = 0; mask < 1 << SWITCH_COUNT; mask++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pattern';
    button.dataset.mask = mask;
    button.addEventListener('click', () => { arrangement = mask; gridFocus = mask; renderExperiment(); });
    button.addEventListener('keydown', event => {
      const offset = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 8, ArrowUp: -8 }[event.key];
      let next;
      if (offset !== undefined) next = (mask + offset + 64) % 64;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 63;
      else return;
      event.preventDefault();
      gridFocus = next;
      [...$('#patterns').children].forEach((el, i) => { el.tabIndex = i === next ? 0 : -1; });
      $('#patterns').children[next].focus();
    });
    $('#patterns').append(button);
  }
}
function renderExperiment() {
  const edges = RULES[rule];
  const allowed = allowedArrangements(edges);
  const valid = followsRules(arrangement, edges);
  const conflicts = edges.filter(([a, b]) => (arrangement & (1 << a)) && (arrangement & (1 << b)));
  const conflictingPoints = new Set(conflicts.flat());
  $('#constraint-lines').replaceChildren();
  edges.forEach(([a, b]) => {
    const conflict = conflicts.some(([u, v]) => a === u && b === v);
    $('#constraint-lines').append(svgElement('line', { x1: positions[a][0], y1: positions[a][1], x2: positions[b][0], y2: positions[b][1], stroke: conflict ? palette.red : palette.muted, 'stroke-width': 1.5, 'stroke-dasharray': conflict ? '4 4' : 'none' }));
  });
  [...$('#switch-nodes').children].forEach((button, i) => {
    const on = Boolean(arrangement & (1 << i));
    button.textContent = on ? '1' : '0';
    button.setAttribute('aria-pressed', on);
    button.setAttribute('aria-label', copy(`Point ${i + 1}, ${on ? 'on' : 'off'}`, `点 ${i + 1}，${on ? '亮起' : '熄灭'}`));
    button.classList.toggle('conflict', conflictingPoints.has(i));
  });
  $('#arrangement-status').textContent = valid ? copy('✓ This one works', '✓ 这个状态符合规则') : copy('× Two neighbors are on', '× 相邻的点同时亮起');
  $('#arrangement-status').classList.toggle('conflict', !valid);
  $('#valid-count').textContent = allowed.length;
  $('#valid-fraction').textContent = allowed.length;
  document.querySelectorAll('[data-rule]').forEach(button => button.setAttribute('aria-pressed', button.dataset.rule === rule));
  [...$('#patterns').children].forEach((button, mask) => {
    const allowed = followsRules(mask, edges);
    button.classList.toggle('is-invalid', !allowed);
    button.setAttribute('aria-pressed', mask === arrangement);
    button.tabIndex = mask === gridFocus ? 0 : -1;
    const bitString = bitsOf(mask).map(bit => Number(bit)).join('');
    button.setAttribute('aria-label', copy(`Configuration ${bitString}: ${allowed ? 'allowed' : 'ruled out'}`, `状态 ${bitString}：${allowed ? '符合规则' : '违反规则'}`));
    button.replaceChildren(miniature(mask, { edges, valid: allowed }));
  });
}

// The coefficient of lambda^k counts independent sets of size k in a six-cycle.
const cycleConfigurations = allowedArrangements(RULES.cycle);
const coefficients = Array.from({ length: 4 }, (_, k) => cycleConfigurations.filter(mask => bitsOf(mask).filter(Boolean).length === k).length);
function buildWeights() {
  coefficients.forEach((coefficient, k) => {
    const group = document.createElement('div');
    group.className = 'weight-group';
    const example = cycleConfigurations.find(mask => bitsOf(mask).filter(Boolean).length === k);
    group.innerHTML = '<div class="weight-bars"><div class="weight-bar"><span class="bar-value"></span></div></div>';
    group.append(miniature(example));
    const term = document.createElement('div');
    term.className = 'weight-term';
    term.textContent = ['1', '6λ', '9λ²', '2λ³'][k];
    const label = document.createElement('div');
    label.className = 'group-label';
    group.append(term, label);
    $('#weight-groups').append(group);
  });
}
function renderWeights() {
  const lambda = Number($('#weight-slider').value);
  const total = coefficients.reduce((sum, coefficient, k) => sum + coefficient * lambda ** k, 0);
  $('#lambda-value').textContent = lambda.toFixed(2);
  $('#weighted-total').textContent = format(total);
  $('#weight-slider').setAttribute('aria-valuetext', copy(`Lambda ${lambda}; weighted sum ${format(total)}`, `λ 为 ${lambda}，加权和为 ${format(total)}`));
  [...$('#weight-groups').children].forEach((group, k) => {
    const contribution = coefficients[k] * lambda ** k;
    group.querySelector('.weight-bar').style.height = `${contribution / 36 * 78}%`;
    group.querySelector('.bar-value').textContent = format(contribution);
    group.querySelector('.group-label').innerHTML = copy(`${k} ${k === 1 ? 'point' : 'points'} on<br>${coefficients[k]} ${coefficients[k] === 1 ? 'configuration' : 'configurations'}`, `${k} 个点亮起<br>${coefficients[k]} 种状态`);
  });
  $('#weight-caption').textContent = lambda === 1
    ? copy('At λ = 1, every valid configuration counts equally. The sum is 18 again.', '当 λ = 1 时，每个可行状态贡献相同，答案又回到了 18。')
    : lambda === 0
      ? copy('At λ = 0, only the all-off configuration contributes. Its weight is 1.', '当 λ = 0 时，只有全部熄灭的状态作出贡献，它的权重为 1。')
      : copy(`At λ = ${lambda}, the same 18 configurations contribute a total weight of ${format(total)}. The bars show each group’s contribution.`, `当 λ = ${lambda} 时，同样的 18 种可行状态，加权和为 ${format(total)}。柱高表示每一组的贡献。`);
}
function drawResearch() {
  // Slate drawing grounds echo the cover's shadows; gold marks the focal objects.
  const tones = { line: '#8da1ad', guide: '#4d687c', light: '#e6dac4', gold: '#d0a35e', ink: 'var(--navy)' };
  function art(kind) {
    const svg = svgElement('svg', { viewBox: '0 0 420 220' });
    const line = (a, b, color = tones.line, width = 1) => svg.append(svgElement('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: color, 'stroke-width': width }));
    const dot = (p, r = 5, fill = tones.gold) => svg.append(svgElement('circle', { cx: p[0], cy: p[1], r, fill }));
    const circle = (p, r, color = tones.guide) => svg.append(svgElement('circle', { cx: p[0], cy: p[1], r, fill: 'none', stroke: color, 'stroke-width': .7 }));
    const text = (p, label, color = tones.light, size = 12) => svg.append(svgElement('text', { x: p[0], y: p[1], fill: color, 'font-family': 'Georgia, serif', 'font-size': size, 'font-style': 'italic', 'text-anchor': 'middle' }, label));
    if (kind === 'networks') {
      const points = [[210, 28], [288, 72], [288, 154], [210, 198], [132, 154], [132, 72], [210, 112]];
      circle([210, 112], 88); circle([210, 112], 101);
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [2, 6], [4, 6]].forEach(([a, b]) => line(points[a], points[b], tones.line, 1.4));
      line([132, 72], [72, 40]); line([288, 72], [350, 39]); line([132, 154], [65, 178]); line([288, 154], [350, 181]);
      [[72, 40], [350, 39], [65, 178], [350, 181]].forEach(p => dot(p, 3, tones.line));
      points.forEach((p, i) => { dot(p, i === 6 ? 19 : 13, i === 6 ? tones.gold : tones.light); text([p[0], p[1] + 4], 'f', tones.ink, i === 6 ? 18 : 13); });
      [[249, 50], [288, 112], [171, 176]].forEach(p => { dot(p, 8, tones.ink); text([p[0], p[1] + 3], 'x', tones.gold, 11); });
    } else if (kind === 'constraints') {
      const variables = [[97, 35], [210, 28], [322, 35], [74, 112], [210, 111], [344, 112], [97, 189], [210, 196], [322, 189]];
      const factors = [[152, 70], [267, 70], [152, 154], [267, 154]];
      factors.forEach(p => circle(p, 42));
      [[0, 0], [1, 0], [1, 1], [2, 1], [3, 0], [3, 2], [4, 0], [4, 1], [4, 2], [4, 3], [5, 1], [5, 3], [6, 2], [7, 2], [7, 3], [8, 3]].forEach(([v, f]) => line(variables[v], factors[f]));
      variables.forEach((p, i) => { dot(p, 8, i === 4 ? tones.gold : tones.light); circle(p, 13); });
      factors.forEach(([x, y], i) => { svg.append(svgElement('rect', { x: x - 12, y: y - 12, width: 24, height: 24, fill: tones.gold, transform: `rotate(${i % 2 ? 12 : -12} ${x} ${y})` })); text([x, y + 4], 'g', tones.ink, 14); });
    } else if (kind === 'maps') {
      const points = [[72, 75], [138, 41], [190, 97], [159, 172], [77, 159]];
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]].forEach(([a, b]) => line(points[a], points[b], tones.line, 1.5));
      const colors = [tones.gold, tones.light, '#8ba8bd'];
      points.forEach((p, i) => { circle(p, 16); dot(p, 9, colors[i % 3]); });
      svg.append(svgElement('path', { d: 'M218 111h44m-8-6 8 6-8 6', fill: 'none', stroke: tones.gold, 'stroke-width': 1.2 }));
      const target = [[321, 66], [365, 151], [277, 151]];
      target.forEach((p, i) => line(p, target[(i + 1) % 3], tones.line, 1.5));
      target.forEach((p, i) => { circle(p, 22); dot(p, 12, colors[i]); });
    } else {
      const points = Array.from({ length: 14 }, (_, i) => [133 + 76 * Math.cos(i * Math.PI / 7), 110 + 76 * Math.sin(i * Math.PI / 7)]);
      circle([133, 110], 88);
      points.forEach((p, i) => { line(p, points[(i + 1) % 14], tones.line); line(p, points[(i + 5) % 14], tones.guide, .6); line(p, points[(i + 8) % 14], tones.guide, .6); });
      points.forEach((p, i) => dot(p, i % 3 ? 4 : 7, i % 3 ? tones.light : tones.gold));
      svg.append(svgElement('path', { d: 'M235 110h38m-8-6 8 6-8 6', fill: 'none', stroke: tones.gold, 'stroke-width': 1.2 }));
      const target = [[323, 72], [360, 110], [323, 148], [286, 110]];
      target.forEach((p, i) => line(p, target[(i + 1) % 4], tones.line, 1.4)); line(target[0], target[2]);
      circle([323, 110], 56);
      target.forEach((p, i) => dot(p, 10, i === 0 ? tones.gold : tones.light));
    }
    return svg;
  }
  ['networks', 'constraints', 'maps', 'compression'].forEach(kind => $(`#art-${kind}`).append(art(kind)));
}
function translate(next) {
  language = next;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  originals.forEach((original, el) => { el.innerHTML = next === 'zh' ? el.dataset.zh : original; });
  document.title = copy('CountingLib — The mathematics of counting possibilities', 'CountingLib — 所有可能，究竟有多少？');
  $('#language-toggle').textContent = copy('中文', 'EN');
  $('#language-toggle').setAttribute('aria-label', copy('切换为中文', 'Switch to English'));
  $('nav').setAttribute('aria-label', copy('Main navigation', '主导航'));
  $('.rule-controls').setAttribute('aria-label', copy('Choose a rule set', '选择一组规则'));
  $('#switch-nodes').setAttribute('aria-label', copy('Six points. Press a point to toggle it.', '六个点。点击切换亮灭状态。'));
  $('#patterns').setAttribute('aria-label', copy('All 64 configurations. Use arrow keys to explore; Enter to select.', '全部 64 种状态。用方向键浏览，回车选择。'));
  $('#weight-slider').setAttribute('aria-label', copy('Weight per point, lambda', '每个亮点的权重 λ'));
  renderExperiment();
  renderWeights();
  try { localStorage.setItem('countinglib-language', next); } catch { /* Language persistence is optional. */ }
}

buildExperiment();
buildWeights();
drawResearch();
document.querySelectorAll('[data-rule]').forEach(button => button.addEventListener('click', () => { rule = button.dataset.rule; renderExperiment(); }));
$('#next-arrangement').addEventListener('click', () => {
  const allowed = allowedArrangements(RULES[rule]);
  arrangement = allowed[(allowed.indexOf(arrangement) + 1) % allowed.length];
  gridFocus = arrangement;
  renderExperiment();
});
$('#reset-experiment').addEventListener('click', () => { rule = 'cycle'; arrangement = 21; gridFocus = 21; renderExperiment(); });
$('#weight-slider').addEventListener('input', renderWeights);
$('#reset-weight').addEventListener('click', () => { $('#weight-slider').value = 1; renderWeights(); });
$('#language-toggle').addEventListener('click', () => translate(language === 'en' ? 'zh' : 'en'));
try { language = localStorage.getItem('countinglib-language') === 'zh' ? 'zh' : 'en'; } catch { /* English is the default. */ }
translate(language);

// Keep the masthead indicator aligned with the section being read.
if ('IntersectionObserver' in window) {
  const sectionLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) sectionLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  ['idea', 'research', 'library'].forEach(id => observer.observe(document.getElementById(id)));
  observer.observe(document.querySelector('.cover'));
}
