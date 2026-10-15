/* Static CountingLib preview. Source text is rendered only through text nodes. */
'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const create = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const anchor = (text, url, className) => {
    const node = create('a', text, className); node.href = url; return node;
  };
  const keywords = new Set(('import open namespace end theorem lemma def abbrev inductive structure class instance noncomputable private protected section variable variables universe universes where by exact apply intro intros obtain have let in fun match with if then else do return forall exists Type Prop Sort deriving show from as at simp rw change constructor cases rcases refine classical').split(' '));

  function tokenize(text, language = 'lean') {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      const start = i;
      let kind = '';
      if ((language === 'lean' && text.startsWith('--', i)) ||
          (language !== 'lean' && text[i] === '#')) {
        i = text.indexOf('\n', i); if (i < 0) i = text.length;
        kind = 'comment';
      } else if (language === 'lean' && text.startsWith('/-', i)) {
        i += 2; let depth = 1;
        while (i < text.length && depth) {
          if (text.startsWith('/-', i)) { depth++; i += 2; }
          else if (text.startsWith('-/', i)) { depth--; i += 2; }
          else i++;
        }
        kind = 'comment';
      } else if (text[i] === '"' || (language !== 'lean' && text[i] === "'")) {
        const quote = text[i++];
        while (i < text.length) {
          if (text[i] === '\\') i = Math.min(i + 2, text.length);
          else if (text[i++] === quote) break;
        }
        kind = 'string';
      } else if (/\s/u.test(text[i])) {
        while (i < text.length && /\s/u.test(text[i])) i++;
      } else if (/\d/u.test(text[i])) {
        i++; while (i < text.length && /[\d._]/u.test(text[i])) i++;
        kind = 'number';
      } else if (/[\p{L}_]/u.test(text[i])) {
        i++; while (i < text.length && /[\p{L}\p{N}_'.]/u.test(text[i])) i++;
        const value = text.slice(start, i);
        kind = keywords.has(value) ? 'keyword' : /^[\p{Lu}]/u.test(value) ? 'type' : '';
      } else if (text[i] === '«') {
        i++; while (i < text.length && text[i++] !== '»') { /* quoted identifier */ }
      } else {
        i++; kind = /[∀∃→↔∧∨¬=:+*λ⟶≤≥∈⊆]/u.test(text[start]) ? 'operator' : '';
      }
      tokens.push({text: text.slice(start, i), kind});
    }
    return tokens;
  }

  function highlight(node, text, language = 'lean') {
    const fragment = document.createDocumentFragment();
    for (const token of tokenize(text, language)) {
      fragment.append(token.kind ? create('span', token.text, 'tok-' + token.kind)
        : document.createTextNode(token.text));
    }
    node.replaceChildren(fragment);
  }

  // Expose the pure lexer for small dependency-free regression tests.
  window.CountingLibSyntax = {tokenize};
  const nav = $('primary-nav');
  const navToggle = $('nav-toggle');
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open'); navToggle.setAttribute('aria-expanded', String(open));
  });
  for (const node of document.querySelectorAll('pre > code[class^="language-"]')) {
    highlight(node, node.textContent, node.className.replace('language-', ''));
  }
  const oldState = new URLSearchParams(location.hash.slice(1));
  if (document.body.dataset.page === 'overview' &&
      ['decl', 'q', 'family', 'module', 'kind', 'category'].some((key) => oldState.has(key))) {
    location.replace('api.html' + location.hash); return;
  }
  if (document.body.dataset.page !== 'api') {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.focus();
      }
    });
    return;
  }

  let data, families, rows, matches = [], visible = 20, timer;
  let state = {q: '', category: '', family: '', kind: '', module: '', namespace: '', decl: ''};
  const controls = {q: 'query', category: 'category', family: 'family', kind: 'kind'};
  const moduleNames = new Set();
  const moduleCounts = new Map();
  const moduleButtons = [];
  const moduleGroups = [];
  const pageSize = 20;

  function urlFor(next) {
    const params = new URLSearchParams();
    for (const key of ['q', 'category', 'family', 'kind', 'module', 'namespace', 'decl']) {
      if (next[key]) params.set(key, next[key]);
    }
    return 'api.html' + (params.size ? '#' + params.toString() : '');
  }
  function permalink(row) { return urlFor({...state, decl: row.name}); }
  function navigate(next, mode = 'push', scrollTarget = false) {
    clearTimeout(timer);
    state = {...state, ...next};
    const url = urlFor(state);
    if (location.pathname.split('/').pop() + location.hash !== url) {
      history[mode === 'replace' ? 'replaceState' : 'pushState'](null, '', url);
    }
    syncControls(); render(scrollTarget);
  }
  function syncControls() {
    for (const [key, id] of Object.entries(controls)) $(id).value = state[key];
  }
  function readLocation(scrollTarget = false) {
    clearTimeout(timer);
    const params = new URLSearchParams(location.hash.slice(1));
    for (const key of Object.keys(state)) state[key] = params.get(key) || '';
    for (const key of ['category', 'family', 'kind']) {
      const select = $(controls[key]);
      if (![...select.options].some((item) => item.value === state[key])) state[key] = '';
    }
    const selected = state.decl && rows.find((row) => row.name === state.decl || row.display_name === state.decl);
    if (selected && !rowMatches(selected)) {
      for (const key of Object.keys(state)) if (key !== 'decl') state[key] = '';
    }
    syncControls(); render(scrollTarget);
  }
  function rowMatches(row) {
    const tokens = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return (!state.category || row.category === state.category) &&
      (!state.family || row.family === state.family) && (!state.kind || row.kind === state.kind) &&
      (!state.module || row.module === state.module) &&
      (!state.namespace || row.module === state.namespace || row.module.startsWith(state.namespace + '.')) &&
      tokens.every((token) => row.searchText.includes(token));
  }
  const moduleOrder = ['Counting.Foundation', 'Counting.Encoding', 'Counting.Complexity',
    'Counting.Computation', 'Counting.Model', 'Counting.Gadget', 'Counting.Algorithm'];
  function rank(module) {
    const index = moduleOrder.findIndex((prefix) => module === prefix || module.startsWith(prefix + '.'));
    return index < 0 ? moduleOrder.length : index;
  }
  function sortRows(a, b) {
    if (state.q.trim()) {
      const query = state.q.trim().toLowerCase();
      const score = (row) => row.display_name.toLowerCase() === query ? 0
        : row.display_name.toLowerCase().endsWith('.' + query) ? 1
        : row.display_name.toLowerCase().includes(query) ? 2 : 3;
      const difference = score(a) - score(b); if (difference) return difference;
    }
    return rank(a.module) - rank(b.module) || a.module.localeCompare(b.module) || a.display_name.localeCompare(b.display_name);
  }
  function moduleButton(label, count, path, namespace = false) {
    const button = create('button'); button.type = 'button';
    button.append(create('span', label), create('span', String(count), 'count'));
    button.title = (path || 'All selected modules') + ' · ' + count + ' selected declarations';
    button.setAttribute('aria-label', label + ', ' + count + ' selected declarations');
    button.addEventListener('click', () => {
      navigate({module: namespace ? '' : path, namespace: namespace ? path : '', decl: ''});
      $('module-panel').classList.remove('open'); $('module-toggle').setAttribute('aria-expanded', 'false');
      $('api-title').scrollIntoView({block: 'start'});
    });
    moduleButtons.push({button, path, namespace}); return button;
  }
  function buildTree() {
    const tree = {children: new Map(), count: 0, own: 0, path: ''};
    for (const [module, count] of moduleCounts) {
      let node = tree; node.count += count;
      for (const part of module.split('.')) {
        if (!node.children.has(part)) node.children.set(part, {children: new Map(), count: 0, own: 0, path: node.path ? node.path + '.' + part : part});
        node = node.children.get(part); node.count += count;
      }
      node.own = count;
    }
    const panel = $('module-tree'); panel.replaceChildren();
    panel.append(moduleButton('All modules', rows.length, ''));
    function branch(name, node, depth) {
      if (!node.children.size) return moduleButton(name, node.own, node.path);
      const detail = create('details', undefined, 'module-node');
      detail.open = depth === 0;
      const summary = create('summary'); summary.append(create('span', name), create('span', String(node.count), 'count'));
      detail.append(summary); moduleGroups.push({detail, path: node.path});
      const children = create('div', undefined, 'module-node-children');
      const all = moduleButton('All in ' + name, node.count, node.path, true); all.classList.add('namespace-link'); children.append(all);
      if (node.own) children.append(moduleButton(name + ' (module)', node.own, node.path));
      for (const [child, value] of [...node.children].sort(([a], [b]) => a.localeCompare(b))) children.append(branch(child, value, depth + 1));
      detail.append(children); return detail;
    }
    for (const [name, node] of [...tree.children].sort(([a], [b]) => a.localeCompare(b))) panel.append(branch(name, node, 0));
  }
  function updateTree() {
    for (const item of moduleButtons) {
      const active = item.namespace ? item.path === state.namespace && !!state.namespace
        : item.path ? item.path === state.module : !state.module && !state.namespace;
      item.button.classList.toggle('active', active);
      if (active) item.button.setAttribute('aria-current', 'true'); else item.button.removeAttribute('aria-current');
    }
    const selected = state.module || state.namespace;
    if (selected) for (const item of moduleGroups) {
      if (selected === item.path || selected.startsWith(item.path + '.')) item.detail.open = true;
    }
  }
  function actionButton(text, callback) {
    const node = create('button', text, 'text-button'); node.type = 'button'; node.addEventListener('click', callback); return node;
  }
  function copyButton(label, text) {
    const node = actionButton(label, async () => {
      try {
        await navigator.clipboard.writeText(text); node.textContent = 'Copied';
        setTimeout(() => { node.textContent = label; }, 1500);
      } catch (_) { node.textContent = 'Copy unavailable'; }
    }); return node;
  }
  function contract(family) {
    const list = create('dl', undefined, 'contract');
    for (const field of family.fields) list.append(create('dt', field.label), create('dd', field.text));
    return list;
  }
  function explicitDetail(row, key, title) {
    const detail = create('details', undefined, 'inner-details'); detail.append(create('summary', title));
    detail.addEventListener('toggle', () => {
      if (!detail.open || detail.dataset.loaded) return; detail.dataset.loaded = 'true';
      const pre = create('pre', undefined, 'explicit-type'); pre.tabIndex = 0;
      const code = create('code');
      // Large pp.all terms remain literal text; the readable signature above is lexed.
      code.textContent = row[key]; pre.append(code);
      detail.append(create('p', 'Complete recorded Lean pp.all output.', 'detail-caption'), pre,
        copyButton('Copy explicit text', row[key]));
    }); return detail;
  }
  function declaration(row) {
    const family = families.get(row.family);
    const article = create('article', undefined, 'declaration'); article.id = 'declaration-' + row.name;
    if (state.decl === row.name || state.decl === row.display_name) article.classList.add('is-target');
    const heading = create('div', undefined, 'decl-header');
    heading.append(create('span', row.kind.replaceAll('-', ' '), 'decl-kind'));
    const title = create('h3');
    const short = row.display_name.startsWith(row.module + '.') ? row.display_name.slice(row.module.length + 1) : row.display_name;
    const nameLink = anchor(short, permalink(row)); nameLink.title = row.display_name;
    title.append(nameLink); heading.append(title); article.append(heading);
    if (row.summary) article.append(create('p', row.summary, 'decl-summary'));
    const pre = create('pre', undefined, 'signature'); const code = create('code');
    highlight(code, row.readable_type || row.type); pre.append(code); article.append(pre);
    if ((row.readable_type || '').includes('⋯')) article.append(create('p', 'Readable form; some proof terms are elided. Full explicit text is available below.', 'detail-caption'));
    if (row.display_name !== row.name) {
      const note = create('p', undefined, 'alias-note'); note.append(document.createTextNode('Export alias of '), create('code', row.name), document.createTextNode('; one kernel declaration.')); article.append(note);
    }
    const actions = create('div', undefined, 'decl-actions');
    actions.append(anchor('Source ↗', row.source_url), anchor('Permalink', permalink(row)),
      copyButton('Copy import', 'import ' + row.import), copyButton('Copy signature', row.display_name + ' :\n' + (row.readable_type || row.type)));
    if (family.paper_url) actions.append(anchor('Paper ↗', family.paper_url));
    else if (family.reference_url) actions.append(anchor('Paper reference ↗', family.reference_url));
    if (family.original_source_url) actions.append(anchor('Original Lean ↗', family.original_source_url));
    article.append(actions);
    const detail = create('details', undefined, 'decl-details'); detail.append(create('summary', 'Explicit type, provenance & contract'));
    detail.addEventListener('toggle', () => {
      if (!detail.open || detail.dataset.loaded) return; detail.dataset.loaded = 'true';
      const content = create('div', undefined, 'detail-content');
      content.append(create('p', 'Readable signatures use Lean’s ordinary pretty printer; implicit arguments or proof terms may be elided. The explicit view retains recorded pp.all detail.', 'detail-caption'));
      content.append(explicitDetail(row, 'type', 'Full explicit Lean type'));
      if (row.specification) content.append(explicitDetail(row, 'specification', 'Specification body'));
      content.append(create('p', 'Import ' + row.import + ' · Provider ' + row.module, 'detail-caption'));
      if (row.original_declaration) content.append(create('p', 'Original declaration: ' + row.original_declaration + (row.paper_item ? ' · Paper item ' + row.paper_item : ''), 'detail-caption'));
      content.append(create('h4', family.title, 'contract-title'), contract(family));
      if (family.paper_note) content.append(create('p', family.paper_note, 'detail-caption'));
      const links = create('div', undefined, 'detail-source-links');
      if (family.original_source_url) links.append(anchor('Original Lean source ↗', family.original_source_url));
      if (family.reference_url) links.append(anchor('Paper reference ↗', family.reference_url));
      content.append(links); detail.append(content);
    }); article.append(detail); return article;
  }
  function renderFamily() {
    const box = $('family-context'); box.replaceChildren();
    const family = families.get(state.family);
    const missing = state.decl && !rows.some((row) => row.name === state.decl || row.display_name === state.decl);
    box.hidden = !family && !missing;
    if (missing) box.append(create('p', 'The requested declaration is not in this selected reference.', 'note'));
    if (family) {
      const note = create('section', undefined, 'family-note');
      note.append(create('h2', family.title), create('p', family.public_import ? 'Public import: ' + family.public_import : 'The scope and cost contract is available with each declaration.'));
      box.append(note);
    }
  }
  function renderResults(append = false) {
    const panel = $('results'); if (!append) panel.replaceChildren();
    const contents = $('module-contents'); contents.replaceChildren();
    if (!matches.length) {
      const empty = create('div', undefined, 'empty-state'); empty.append(create('h2', 'No matching declarations'), create('p', 'Try fewer words or reset the filters.')); panel.append(empty);
    } else {
      const groups = new Map();
      for (const row of matches.slice(0, visible)) {
        if (!groups.has(row.module)) groups.set(row.module, []); groups.get(row.module).push(row);
      }
      for (const [module, groupRows] of groups) {
        let section = append ? document.getElementById('module-' + module) : null;
        let title;
        if (!section) {
          section = create('section', undefined, 'module-group'); section.id = 'module-' + module;
          section.setAttribute('aria-label', module);
          if (!state.module) {
            const heading = create('header', undefined, 'module-heading'); title = create('h2', module); title.tabIndex = -1;
            heading.append(title, create('span', '', 'module-count')); section.append(heading);
          }
          panel.append(section);
        } else title = section.querySelector('h2');
        const count = section.querySelector('.module-count');
        if (count) count.textContent = String(groupRows.length) + ' declaration' + (groupRows.length === 1 ? '' : 's');
        for (const row of groupRows) if (!append || !document.getElementById('declaration-' + row.name)) section.append(declaration(row));
        const item = create('button', module); item.type = 'button';
        item.addEventListener('click', () => { const target = title || section.querySelector('h3 a'); target?.scrollIntoView({block: 'start'}); target?.focus({preventScroll: true}); }); contents.append(item);
      }
    }
    $('result-count').textContent = matches.length + ' result' + (matches.length === 1 ? '' : 's') + (matches.length > visible ? ' · showing ' + visible : '');
    $('active-scope').textContent = state.module ? 'Declarations' : (state.namespace ? state.namespace + '.*' : 'All selected modules');
    $('load-more').hidden = matches.length <= visible; panel.setAttribute('aria-busy', 'false');
  }
  function render(scrollTarget = false) {
    matches = rows.filter(rowMatches).sort(sortRows); visible = pageSize;
    const selected = state.decl && matches.findIndex((row) => row.name === state.decl || row.display_name === state.decl);
    if (selected >= 0 && state.decl) visible = Math.max(pageSize, selected + 1);
    const module = state.module;
    $('api-title').textContent = module ? module.split('.').pop() : state.namespace ? state.namespace.split('.').pop() : 'API';
    $('catalog-size').textContent = module ? (moduleCounts.get(module) || 0) + ' selected declarations in this module'
      : state.namespace ? matches.length + ' selected declarations in this namespace' : rows.length + ' declarations · ' + moduleNames.size + ' modules';
    const importLine = $('module-import'); importLine.replaceChildren(); importLine.hidden = !module;
    if (module) { importLine.append(create('code', 'import ' + module), copyButton('Copy import', 'import ' + module)); }
    updateTree(); renderFamily(); renderResults();
    if (scrollTarget && state.decl) {
      const row = matches.find((item) => item.name === state.decl || item.display_name === state.decl);
      if (row) requestAnimationFrame(() => document.getElementById('declaration-' + row.name)?.scrollIntoView({block: 'start'}));
    }
  }
  function controlChanges(mode = 'push') {
    const next = {decl: ''}; for (const [key, id] of Object.entries(controls)) next[key] = $(id).value;
    if (next.q.trim() && next.q !== state.q) { next.module = ''; next.namespace = ''; }
    navigate(next, mode);
  }
  async function initialize() {
    try {
      const response = await fetch('api-data.json'); if (!response.ok) throw new Error('Catalog unavailable');
      data = await response.json(); rows = data.declarations; families = new Map(data.families.map((item) => [item.id, item]));
      for (const row of rows) {
        row.searchText = [row.name, row.display_name, row.module, row.import, row.type, row.readable_type || '', families.get(row.family).title].join('\n').toLowerCase();
        moduleNames.add(row.module); moduleCounts.set(row.module, (moduleCounts.get(row.module) || 0) + 1);
      }
      $('module-total').textContent = String(moduleNames.size); $('catalog-size').textContent = rows.length + ' declarations · ' + moduleNames.size + ' modules';
      for (const family of data.families) { const option = create('option', family.title); option.value = family.id; $('family').append(option); }
      for (const kind of [...new Set(rows.map((row) => row.kind))].sort()) { const option = create('option', kind.replaceAll('-', ' ')); option.value = kind; $('kind').append(option); }
      buildTree();
      $('query').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => controlChanges('replace'), 140); });
      $('search-form').addEventListener('submit', (event) => { event.preventDefault(); controlChanges(); });
      for (const id of ['category', 'family', 'kind']) $(id).addEventListener('change', () => controlChanges());
      $('reset').addEventListener('click', () => {
        navigate({q: '', category: '', family: '', kind: '', module: '', namespace: '', decl: ''}); $('query').focus();
      });
      $('load-more').addEventListener('click', () => {
        const old = Math.min(visible, matches.length); visible += pageSize; renderResults(true);
        const row = matches[old]; if (row) { const article = document.getElementById('declaration-' + row.name); article?.querySelector('h3 a')?.focus({preventScroll: true}); article?.scrollIntoView({block: 'start'}); }
      });
      $('module-toggle').addEventListener('click', () => {
        const open = $('module-panel').classList.toggle('open'); $('module-toggle').setAttribute('aria-expanded', String(open));
        if (open) requestAnimationFrame(() => $('module-panel').querySelector('button')?.focus());
      });
      window.addEventListener('hashchange', () => readLocation(true));
      window.addEventListener('popstate', () => readLocation(true));
      document.addEventListener('keydown', (event) => {
        if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey &&
          !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
          event.preventDefault(); $('query').focus();
        }
        if (event.key === 'Escape') {
          if (nav.classList.contains('open')) { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.focus(); }
          else if ($('module-panel').classList.contains('open')) { $('module-panel').classList.remove('open'); $('module-toggle').setAttribute('aria-expanded', 'false'); $('module-toggle').focus(); }
          else if ($('query').value) { $('query').value = ''; controlChanges(); $('query').focus(); }
        }
      });
      readLocation(!!state.decl || location.hash.includes('decl='));
    } catch (_) {
      $('load-error').hidden = false; $('result-count').textContent = 'Catalog unavailable'; $('results').setAttribute('aria-busy', 'false');
      for (const id of ['query', 'category', 'family', 'kind', 'reset', 'load-more']) $(id).disabled = true;
      console.error('CountingLib selected API could not be loaded.');
    }
  }
  initialize();
})();
