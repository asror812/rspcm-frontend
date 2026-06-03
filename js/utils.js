/* ── Toast ── */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

/* ── Modal ── */
function showModal(title, bodyHtml, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-save').onclick = onSave;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

/* ── Confirm dialog ── */
function confirm(msg) {
  return window.confirm(msg);
}

/* ── Date format ── */
function fmtDate(s) {
  if (!s) return '—';
  return new Date(s).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}
function fmtDateOnly(s) {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('ru-RU');
}

/* ── Status badges ── */
const STATUS_LABELS = {
  DRAFT: 'Черновик', READY: 'Готов', PUBLISHED: 'Опубликован',
  COMPLETED: 'Завершён', CANCELLED: 'Отменён',
  SUBMITTED: 'На проверке', RETURNED: 'Возвращено', GRADED: 'Оценено',
  STARTED: 'В процессе', INDIVIDUAL: 'Индивидуальная', TEAM: 'Командная',
  QUESTION: 'Тест', PRACTICE: 'Практика',
  FORMING: 'Формирование', WAITING_MEMBERS: 'Ждём команду',
  READY_TO_CHOOSE: 'Выбор практики', PRACTICE_CHOSEN: 'Практика выбрана',
  UZ: 'Узбекский', RU: 'Русский',
};
const STATUS_CLASS = {
  DRAFT:'badge-gray', READY:'badge-blue', PUBLISHED:'badge-green',
  COMPLETED:'badge-gray', CANCELLED:'badge-red',
  SUBMITTED:'badge-yellow', RETURNED:'badge-orange', GRADED:'badge-green',
  STARTED:'badge-blue', INDIVIDUAL:'badge-purple', TEAM:'badge-indigo',
  QUESTION:'badge-blue', PRACTICE:'badge-orange',
};
function badge(val) {
  const label = STATUS_LABELS[val] || val;
  const cls = STATUS_CLASS[val] || 'badge-gray';
  return `<span class="badge ${cls}">${label}</span>`;
}

/* ── Pagination ── */
function paginator(current, totalPages, onPage) {
  if (totalPages <= 1) return '';
  let html = '<div class="pagination">';
  if (current > 0) html += `<button onclick="${onPage}(${current-1})">‹</button>`;
  for (let i = 0; i < totalPages; i++) {
    if (i === current) html += `<button class="active">${i+1}</button>`;
    else if (Math.abs(i - current) < 3) html += `<button onclick="${onPage}(${i})">${i+1}</button>`;
  }
  if (current < totalPages - 1) html += `<button onclick="${onPage}(${current+1})">›</button>`;
  return html + '</div>';
}

/* ── Nav ── */
function setActive(id) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('nav-' + id);
  if (el) el.classList.add('active');
}
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const s = document.getElementById('section-' + id);
  if (s) s.classList.add('active');
  setActive(id);
}

/* ── Loader ── */
function loading(containerId, show) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (show) el.innerHTML = '<div class="loader-wrap"><div class="loader"></div></div>';
}
