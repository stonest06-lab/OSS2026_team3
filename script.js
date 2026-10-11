const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section[id]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);

    if (!activeLink) return;

    const isActive =
      scrollPosition >= top && scrollPosition < top + height;

    activeLink.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

const demoFiles = {
  'index.html': {
    previous: [
      '<main class="planner">',
      '  <h1>일정 관리</h1>',
      '  <form id="task-form">',
      '    <input id="task-title" placeholder="새 일정 입력">',
      '    <button type="submit">추가</button>',
      '  </form>',
      '  <ul id="task-list"></ul>',
      '</main>',
    ].join('\n'),
    current: [
      '<main class="planner">',
      '  <header class="planner-header">',
      '    <div><p class="eyebrow">MY WORKSPACE</p><h1>오늘의 일정</h1></div>',
      '    <button id="theme-toggle" type="button" aria-label="테마 전환">◐</button>',
      '  </header>',
      '  <section class="stats" aria-label="일정 통계">',
      '    <article><span>전체 일정</span><strong id="total-count">0</strong></article>',
      '    <article><span>완료 일정</span><strong id="done-count">0</strong></article>',
      '    <article><span>완료율</span><strong id="completion-rate">0%</strong></article>',
      '  </section>',
      '  <form id="task-form">',
      '    <input id="task-title" placeholder="새 일정을 입력하세요" required>',
      '    <input id="task-date" type="date" aria-label="마감일">',
      '    <select id="task-priority" aria-label="우선순위">',
      '      <option value="보통">보통</option><option value="높음">높음</option>',
      '    </select>',
      '    <button type="submit">일정 추가</button>',
      '  </form>',
      '  <div class="filters" aria-label="일정 필터">',
      '    <button class="filter active" data-filter="all">전체</button>',
      '    <button class="filter" data-filter="active">진행 중</button>',
      '    <button class="filter" data-filter="done">완료</button>',
      '  </div>',
      '  <ul id="task-list" class="task-list"></ul>',
      '</main>',
    ].join('\n'),
  },
  'style.css': {
    previous: [
      'body { font-family: Arial, sans-serif; background: #f1f5f9; padding: 32px; }',
      '.planner { max-width: 620px; margin: auto; padding: 24px; background: white; }',
      'form { display: flex; gap: 8px; }',
      'li { padding: 12px; border-bottom: 1px solid #ddd; }',
    ].join('\n'),
    current: [
      ':root { font-family: Inter, "Segoe UI", sans-serif; color: #182235; background: #f4f7fb; }',
      '* { box-sizing: border-box; }',
      'body { min-height: 100vh; margin: 0; padding: 32px 18px; background: radial-gradient(circle at top right, #dceafe, transparent 42%), #f4f7fb; }',
      '.planner { max-width: 880px; margin: auto; padding: 30px; border: 1px solid #e4eaf2; border-radius: 24px; background: rgba(255,255,255,.94); box-shadow: 0 18px 55px #27364b18; }',
      '.planner-header, .stats, form, .filters, .task { display: flex; align-items: center; gap: 12px; }',
      '.planner-header { justify-content: space-between; margin-bottom: 24px; }',
      '.planner h1 { margin: 5px 0 0; font-size: 2rem; }',
      '.eyebrow { margin: 0; color: #66809c; font-size: .7rem; letter-spacing: .14em; }',
      '#theme-toggle, button { border: 0; border-radius: 10px; padding: 10px 14px; background: #2563eb; color: white; cursor: pointer; }',
      '#theme-toggle { background: #edf3ff; color: #2456a7; font-size: 1.1rem; }',
      '.stats { margin-bottom: 20px; }',
      '.stats article { flex: 1; padding: 16px; border: 1px solid #e7edf5; border-radius: 15px; background: #f8faff; }',
      '.stats span, .stats strong { display: block; } .stats span { color: #708198; font-size: .8rem; } .stats strong { margin-top: 7px; font-size: 1.5rem; }',
      'form { flex-wrap: wrap; padding: 12px; border: 1px solid #e4eaf2; border-radius: 14px; }',
      'input, select { min-width: 0; flex: 1; padding: 11px; border: 1px solid #e0e7ef; border-radius: 9px; background: white; color: #182235; }',
      '.filters { margin: 19px 0 10px; } .filter { background: #edf2f8; color: #596a80; } .filter.active { background: #2563eb; color: white; }',
      '.task-list { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }',
      '.task { padding: 13px; border: 1px solid #e7edf5; border-radius: 13px; } .task label { flex: 1; display: flex; align-items: center; gap: 10px; }',
      '.task.done .task-name { color: #91a0b3; text-decoration: line-through; } .task small { color: #738197; } .task .delete { padding: 7px 10px; background: #fff0f0; color: #c34550; }',
      '.empty { padding: 28px; color: #8290a2; text-align: center; }',
      'body.dark { color: #edf4ff; background: #101827; } body.dark .planner { border-color: #28364a; background: #182335; } body.dark .stats article, body.dark .task, body.dark form { border-color: #2c3c52; background: #1d2b40; } body.dark input, body.dark select { border-color: #39485d; background: #111c2c; color: #edf4ff; } body.dark .stats span, body.dark .task small { color: #a9bad0; }',
      '@media (max-width: 620px) { body { padding: 14px 10px; } .planner { padding: 20px 14px; border-radius: 18px; } .stats { align-items: stretch; gap: 7px; } .stats article { padding: 11px 8px; } .stats strong { font-size: 1.2rem; } form { align-items: stretch; } form input, form select { flex-basis: 40%; } form button { flex: 1; } .task { flex-wrap: wrap; } }',
    ].join('\n'),
  },
  'script.js': {
    previous: [
      'const form = document.querySelector("#task-form");',
      'const titleInput = document.querySelector("#task-title");',
      'const list = document.querySelector("#task-list");',
      'form.addEventListener("submit", (event) => {',
      '  event.preventDefault();',
      '  const item = document.createElement("li");',
      '  item.textContent = titleInput.value;',
      '  list.append(item);',
      '  titleInput.value = "";',
      '});',
    ].join('\n'),
    current: [
      'const form = document.querySelector("#task-form");',
      'const titleInput = document.querySelector("#task-title");',
      'const dateInput = document.querySelector("#task-date");',
      'const priorityInput = document.querySelector("#task-priority");',
      'const list = document.querySelector("#task-list");',
      'const tasks = [{ id: 1, title: "프로젝트 기획안 정리", date: "", priority: "높음", done: false }];',
      'let filter = "all";',
      'const render = () => {',
      '  const visibleTasks = tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done));',
      '  list.innerHTML = visibleTasks.length ? "" : \'<li class="empty">표시할 일정이 없습니다.</li>\';',
      '  visibleTasks.forEach((task) => {',
      '    const item = document.createElement("li");',
      '    item.className = `task${task.done ? " done" : ""}`;',
      '    const label = document.createElement("label");',
      '    const checkbox = document.createElement("input");',
      '    checkbox.type = "checkbox"; checkbox.checked = task.done;',
      '    checkbox.addEventListener("change", () => { task.done = checkbox.checked; render(); });',
      '    const name = document.createElement("span"); name.className = "task-name"; name.textContent = task.title;',
      '    const detail = document.createElement("small"); detail.textContent = `${task.date || "마감일 없음"} · ${task.priority}`;',
      '    label.append(checkbox, name);',
      '    const remove = document.createElement("button"); remove.className = "delete"; remove.textContent = "삭제";',
      '    remove.addEventListener("click", () => { tasks.splice(tasks.indexOf(task), 1); render(); });',
      '    item.append(label, detail, remove); list.append(item);',
      '  });',
      '  const completed = tasks.filter((task) => task.done).length;',
      '  document.querySelector("#total-count").textContent = tasks.length;',
      '  document.querySelector("#done-count").textContent = completed;',
      '  document.querySelector("#completion-rate").textContent = `${tasks.length ? Math.round(completed / tasks.length * 100) : 0}%`;',
      '  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.filter === filter));',
      '};',
      'form.addEventListener("submit", (event) => {',
      '  event.preventDefault();',
      '  tasks.unshift({ id: Date.now(), title: titleInput.value.trim(), date: dateInput.value, priority: priorityInput.value, done: false });',
      '  form.reset(); render();',
      '});',
      'document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => { filter = button.dataset.filter; render(); }));',
      'document.querySelector("#theme-toggle").addEventListener("click", () => document.body.classList.toggle("dark"));',
      'render();',
    ].join('\n'),
  },
};

const fileKinds = {
  html: { prefix: 'index', extension: 'html' },
  css: { prefix: 'style', extension: 'css' },
  js: { prefix: 'script', extension: 'js' },
};
const promptInput = document.querySelector('#prompt-input');
const copyPromptButton = document.querySelector('#copy-prompt');
const promptCopyStatus = document.querySelector('#prompt-copy-status');
const versions = Array.from({ length: 5 }, () => ({
  prompt: '',
  files: { html: null, css: null, js: null },
}));
let selectedVersion = 0;
let selectedFile = 'html';

versions.forEach((version) => {
  version.prompt = promptInput.value;
});

Object.entries(demoFiles).forEach(([name, file]) => {
  const kind = name === 'index.html' ? 'html' : name === 'style.css' ? 'css' : 'js';
  versions[0].files[kind] = file.previous;
  versions[1].files[kind] = file.current;
});
versions[0].files = { ...window.step2Files };
versions[0].prompt = `HTML, CSS, JavaScript를 사용하여 스마트 일정 관리 대시보드 웹사이트를 만들어줘.
- index.html, style.css, script.js 파일로 분리해줘.
- 상단 헤더, 일정 등록 영역, 일정 목록, 통계 카드 영역을 구성해줘.
- 전체 일정, 완료 일정, 완료율을 표시할 공간을 만들어줘.
- 깔끔하고 현대적인 대시보드 디자인을 적용해줘.
- 외부 라이브러리와 프레임워크는 사용하지 마.
- 현재 단계에서는 기본 UI 구성에 집중해줘.`;
versions[1].files = { ...window.step3Files };
versions[1].prompt = `현재 스마트 일정 관리 대시보드에 JavaScript 기능을 추가해줘.
- 일정 제목을 입력하여 새로운 일정을 추가할 수 있게 해줘.
- 등록된 일정의 내용을 수정하거나 삭제할 수 있게 해줘.
- 체크박스를 이용해 일정의 완료 상태를 변경할 수 있게 해줘.
- 완료된 일정에는 취소선을 표시해줘.
- 빈 제목은 등록되지 않도록 해줘.
- 기존 디자인은 유지해줘.`;

const fileTabs = document.querySelectorAll('.file-tab');
const versionTabs = document.querySelectorAll('.version-tab');
const diffView = document.querySelector('#diff-view');
const changeCount = document.querySelector('#change-count');
const previousCode = document.querySelector('#previous-code');
const currentCode = document.querySelector('#current-code');
const applyCodeButton = document.querySelector('#apply-code');
const preview = document.querySelector('#ui-preview');
const promptStepLabel = document.querySelector('#prompt-step-label');
const importInput = document.querySelector('#version-files');
const importStatus = document.querySelector('#file-import-status');

const copyPromptText = async () => {
  const text = promptInput.value;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const copyBuffer = document.createElement('textarea');
      copyBuffer.value = text;
      copyBuffer.setAttribute('readonly', '');
      copyBuffer.style.position = 'fixed';
      copyBuffer.style.opacity = '0';
      document.body.append(copyBuffer);
      copyBuffer.select();
      const copied = document.execCommand('copy');
      copyBuffer.remove();
      if (!copied) throw new Error('브라우저가 클립보드 복사를 허용하지 않았습니다.');
    }
    promptCopyStatus.textContent = '프롬프트를 복사했습니다.';
  } catch (error) {
    promptCopyStatus.textContent = '복사에 실패했습니다. 프롬프트를 선택해 직접 복사해 주세요.';
    console.error('프롬프트 복사 실패:', error);
  }
};

copyPromptButton.addEventListener('click', copyPromptText);

const getFileName = (kind, version) =>
  `${fileKinds[kind].prefix}${version}.${fileKinds[kind].extension}`;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

const createDiff = (previousText, currentText) => {
  if (!previousText) {
    return currentText
      ? currentText.split('\n').map((text) => ({ type: 'added', text }))
      : [];
  }

  const previousLines = previousText.split('\n');
  const currentLines = currentText.split('\n');
  const columns = currentLines.length + 1;
  const cellCount = (previousLines.length + 1) * columns;
  const matrix = cellCount <= 2000000 ? new Uint32Array(cellCount) : null;

  if (!matrix) {
    return [
      ...previousLines.map((text) => ({ type: 'removed', text })),
      ...currentLines.map((text) => ({ type: 'added', text })),
    ];
  }

  for (let oldIndex = previousLines.length - 1; oldIndex >= 0; oldIndex -= 1) {
    for (let newIndex = currentLines.length - 1; newIndex >= 0; newIndex -= 1) {
      const index = oldIndex * columns + newIndex;
      matrix[index] = previousLines[oldIndex] === currentLines[newIndex]
        ? matrix[(oldIndex + 1) * columns + newIndex + 1] + 1
        : Math.max(
            matrix[(oldIndex + 1) * columns + newIndex],
            matrix[oldIndex * columns + newIndex + 1],
          );
    }
  }

  const diff = [];
  let oldIndex = 0;
  let newIndex = 0;

  while (oldIndex < previousLines.length || newIndex < currentLines.length) {
    if (
      oldIndex < previousLines.length &&
      newIndex < currentLines.length &&
      previousLines[oldIndex] === currentLines[newIndex]
    ) {
      diff.push({ type: 'unchanged', text: currentLines[newIndex] });
      oldIndex += 1;
      newIndex += 1;
    } else if (
      oldIndex < previousLines.length &&
      (newIndex >= currentLines.length ||
        matrix[(oldIndex + 1) * columns + newIndex] >= matrix[oldIndex * columns + newIndex + 1])
    ) {
      diff.push({ type: 'removed', text: previousLines[oldIndex] });
      oldIndex += 1;
    } else {
      diff.push({ type: 'added', text: currentLines[newIndex] });
      newIndex += 1;
    }
  }

  return diff;
};

const renderDiff = () => {
  const current = versions[selectedVersion].files[selectedFile];
  const previous = selectedVersion > 0
    ? versions[selectedVersion - 1].files[selectedFile]
    : '';

  diffView.setAttribute('aria-labelledby', `tab-${selectedFile}`);
  if (current === null) {
    diffView.replaceChildren();
    const message = document.createElement('p');
    message.className = 'diff-empty';
    message.textContent = `${getFileName(selectedFile, selectedVersion)} 파일을 아직 불러오지 않았습니다. 파일 불러오기를 선택하세요.`;
    diffView.append(message);
    changeCount.textContent = '파일 없음';
    return;
  }

  const diff = createDiff(previous || '', current);
  let added = 0;
  let removed = 0;
  let lineNumber = 0;
  const fragment = document.createDocumentFragment();

  diff.forEach((line) => {
    const row = document.createElement('div');
    row.className = `diff-line ${line.type}`;
    const marker = document.createElement('span');
    marker.className = 'diff-marker';
    marker.textContent = line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' ';
    const number = document.createElement('span');
    number.className = 'diff-number';
    if (line.type !== 'removed') lineNumber += 1;
    number.textContent = line.type === 'removed' ? '' : String(lineNumber);
    const code = document.createElement('code');
    code.className = 'diff-code';
    code.textContent = line.text || ' ';
    row.append(marker, number, code);
    fragment.append(row);
    if (line.type === 'added') added += 1;
    if (line.type === 'removed') removed += 1;
  });

  diffView.replaceChildren(fragment);
  changeCount.textContent = selectedVersion > 0 && previous === null
    ? `이전 단계 파일 없음 · +${added} 추가`
    : `+${added} 추가 · −${removed} 삭제`;
};

const updatePreview = () => {
  const files = versions[selectedVersion].files;
  if (files.html === null) {
    preview.srcdoc = '<!doctype html><html lang="ko"><meta charset="utf-8"><body style="font:16px Segoe UI,sans-serif;padding:32px;color:#526176"><h2>미리보기 대기 중</h2><p>이 단계의 index 파일을 불러오면 UI가 여기에 표시됩니다.</p></body></html>';
    return;
  }

  const html = files.html
    .replace(/<link\b[^>]*href=["'][^"']*\.css[^"']*["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*src=["'][^"']*["'][^>]*>\s*<\/script>/gi, '');
  const style = (files.css || '').replace(/<\/style/gi, '<\\/style');
  const script = (files.js || '').replace(/<\/script/gi, '<\\/script');
  const styleTag = `<style>${style}</style>`;
  const scriptTag = `<script>${script}<\/script>`;
  const withStyles = /<\/head>/i.test(html)
    ? html.replace(/<\/head>/i, `${styleTag}</head>`)
    : `${styleTag}${html}`;
  const srcdoc = /<\/body>/i.test(withStyles)
    ? withStyles.replace(/<\/body>/i, `${scriptTag}</body>`)
    : `${withStyles}${scriptTag}`;

  preview.srcdoc = srcdoc;
};

const loadSelectedFile = () => {
  const current = versions[selectedVersion].files[selectedFile];
  const previous = selectedVersion > 0
    ? versions[selectedVersion - 1].files[selectedFile]
    : '';
  const previousLabel = selectedVersion > 0
    ? getFileName(selectedFile, selectedVersion - 1)
    : '기준 파일 없음';

  fileTabs.forEach((tab) => {
    const isSelected = tab.dataset.file === selectedFile;
    tab.classList.toggle('active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
    tab.textContent = getFileName(tab.dataset.file, selectedVersion);
  });
  previousCode.value = previous || '';
  currentCode.value = current || '';
  previousCode.labels[0].querySelector('span').textContent = previousLabel;
  currentCode.labels[0].querySelector('span').textContent = getFileName(selectedFile, selectedVersion);
  previousCode.disabled = true;
  currentCode.disabled = current === null;
  renderDiff();
};

const loadSelectedVersion = () => {
  versionTabs.forEach((tab) => {
    const isSelected = Number(tab.dataset.version) === selectedVersion;
    tab.classList.toggle('active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });
  promptInput.value = versions[selectedVersion].prompt;
  promptStepLabel.textContent = `STEP ${selectedVersion + 2} 프롬프트`;
  promptCopyStatus.textContent = '';
  loadSelectedFile();
  updatePreview();
};

versionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    selectedVersion = Number(tab.dataset.version);
    loadSelectedVersion();
  });
});

fileTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    selectedFile = tab.dataset.file;
    loadSelectedFile();
  });
});

applyCodeButton.addEventListener('click', () => {
  versions[selectedVersion].files[selectedFile] = currentCode.value;
  renderDiff();
  updatePreview();
});

importInput.addEventListener('change', async () => {
  const files = Array.from(importInput.files || []);
  if (files.length === 0) return;

  const loadedFiles = [];
  const ignoredFiles = [];

  for (const file of files) {
    const match = file.name.match(/^(index|style|script)([0-4])\.(html|css|js)$/i);
    const promptMatch = file.name.match(/^prompt([0-4])\.(txt|md)$/i);

    if (match) {
      const [, prefix, versionText, extension] = match;
      const kindByPrefix = { index: 'html', style: 'css', script: 'js' };
      const kind = kindByPrefix[prefix.toLowerCase()];
      if (fileKinds[kind].extension === extension.toLowerCase()) {
        versions[Number(versionText)].files[kind] = await file.text();
        loadedFiles.push(file.name);
      } else {
        ignoredFiles.push(file.name);
      }
    } else if (promptMatch) {
      versions[Number(promptMatch[1])].prompt = await file.text();
      loadedFiles.push(file.name);
    } else {
      ignoredFiles.push(file.name);
    }
  }

  importStatus.textContent = loadedFiles.length
    ? `${loadedFiles.length}개 파일을 불러왔습니다.${ignoredFiles.length ? ` 이름 형식이 맞지 않아 건너뛴 파일: ${ignoredFiles.join(', ')}` : ''}`
    : `불러올 수 있는 파일이 없습니다. 번호 0~4를 사용한 index0.html, style0.css, script0.js 또는 prompt0.txt 형식을 확인하세요.`;
  importInput.value = '';
  loadSelectedVersion();
});

loadSelectedVersion();
