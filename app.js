/* =====================================================
   Drug Pharma Egypt – Full Presentation Logic
   ===================================================== */

// ─── DATA ────────────────────────────────────────────
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const DATA = {
  wageh: [270947, 255070, 415074, 452747, 715150, 790497, 667832, 779836, 727134, 880613, 770483, 680078],
  azouny: [283145, 130105, 152763, 405350, 314093, 432340, 410906, 348792, 444704, 534137, 332688, 550959],
  magdy: [215212, 105600, 70494, 262359, 409687, 226414, 278534, 250584, 440715, 406597, 296018, 331363],
  canal: [231644, 126031, 170069, 191527, 194070, 192772, 147813, 271810, 256573, 211347, 304383, 485048],
};
const TOTALS = {};
Object.keys(DATA).forEach(k => { TOTALS[k] = DATA[k].reduce((a, b) => a + b, 0); });
const GRAND_TOTAL = Object.values(TOTALS).reduce((a, b) => a + b, 0);

const REPS = {
  wageeh: {
    name: 'Mohamed Wageeh',
    nameAr: 'محمد وجيه',
    role: 'District Manager',
    photo: 'wageh_photo.jpg',
    experience: '4 سنوات',
    premium: true,
    strengths: ['قيادة الفريق', 'التحليل الاستراتيجي', 'النمو المتسارع'],
    weaknesses: [],
    notes: ['يشرف على منطقتي الشرقية والقناة', 'ترقية يناير 2025'],
    promo_reps: 'مشرف – 4 مناديب',
    key: 'wageh',
    color: '#ffd700',
  },
  magdy: {
    name: 'Ahmed Magdy',
    nameAr: 'أحمد مجدي',
    role: 'مندوب مبيعات',
    photo: 'ahmed_magdy.jpg',
    experience: '7 سنوات',
    premium: false,
    strengths: ['مجهود بدني عالي', 'التحمل الميداني'],
    weaknesses: ['التأثير على الآخرين', 'ترتيب الأولويات'],
    notes: [],
    promo_reps: 'يتابع 7 مناديب دعاية',
    key: 'magdy',
    color: '#a8d5ba',
  },
  azouny: {
    name: 'Muhammed Azouny',
    nameAr: 'محمد عزوني',
    role: 'مندوب مبيعات',
    photo: 'azouny.jpg',
    experience: '3 سنوات',
    premium: false,
    strengths: ['علاقات قوية مع العملاء', 'الكاريزما الاجتماعية'],
    weaknesses: ['التحكم في الشخصية', 'الثقة بالنفس'],
    notes: [],
    promo_reps: 'يتابع 9 مناديب دعاية',
    key: 'azouny',
    color: '#90e0ef',
  },
  mahmoud: {
    name: 'Mahmoud Abdelaal',
    nameAr: 'محمود عبد العال',
    role: 'مندوب مبيعات',
    photo: 'mahmoud_abdelaal.jpg',
    experience: '3 شهور',
    premium: false,
    strengths: ['حماس عالي', 'قابلية التطوير'],
    weaknesses: [],
    notes: ['هدف: الانتقال لدائرة السيلز', 'مرحلة تأهيل'],
    promo_reps: 'يتابع 12 مندوب دعاية',
    key: 'canal',
    color: '#f4a261',
  },
};

// ─── VIEW NAVIGATION ─────────────────────────────────
let currentView = 'view-home';
let historyChartsDrawn = false;
let repsChartsDrawn = false;
let profileCharts = {};

function goView(id) {
  const prev = document.getElementById(currentView);
  const next = document.getElementById(id);
  if (!next || id === currentView) return;

  prev.classList.remove('active');
  prev.classList.add('slide-out');
  setTimeout(() => prev.classList.remove('slide-out'), 600);

  next.classList.add('active');
  // Reset scroll
  if (next.classList.contains('scrollable')) next.scrollTop = 0;
  currentView = id;

  if (id === 'view-history' && !historyChartsDrawn) {
    setTimeout(drawHistoryCharts, 450);
    historyChartsDrawn = true;
  }
  if (id === 'view-reps' && !repsChartsDrawn) {
    setTimeout(() => { buildTable(); drawRepsCharts(); }, 450);
    repsChartsDrawn = true;
  }
  if (id === 'view-customers') {
    setTimeout(drawCustomerCharts, 450);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeProfile(); closeModal(); }
});

// ─── HISTORY CHARTS ──────────────────────────────────
function drawHistoryCharts() {
  const opts = (labels, values, clr) => ({
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values, backgroundColor: clr.map(c => c + 'cc'),
        borderColor: clr, borderWidth: 2, borderRadius: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false }, tooltip: {
          callbacks: { label: ctx => ' ' + formatNum(ctx.parsed.y) + ' جنيه' }
        }
      },
      scales: {
        x: { ticks: { color: 'rgba(255,255,255,.6)', font: { family: 'Cairo', size: 11 } }, grid: { color: 'rgba(255,255,255,.05)' } },
        y: { ticks: { color: 'rgba(255,255,255,.6)', font: { family: 'Cairo', size: 10 }, callback: v => formatNum(v) }, grid: { color: 'rgba(255,255,255,.08)' } },
      }
    }
  });

  new Chart(document.getElementById('chart-sharqiya'), opts(
    ['2022\nمندوب واحد', '2025\n3 مناديب'],
    [650000, 1750000],
    ['#0096c7', '#26d07c']
  ));

  new Chart(document.getElementById('chart-canal'), opts(
    ['بداية 2025\nمندوب واحد', 'الآن\nمندوب واحد'],
    [120000, 275000],
    ['#0096c7', '#26d07c']
  ));
}

// ─── TABLE BUILD ─────────────────────────────────────
function buildTable() {
  const tbody = document.getElementById('table-body');
  const tfoot = document.getElementById('table-foot');
  if (!tbody) return;
  tbody.innerHTML = '';

  MONTHS.forEach((m, i) => {
    const total = DATA.wageh[i] + DATA.azouny[i] + DATA.magdy[i] + DATA.canal[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m}</td>
      <td class="col-wageh">${formatNum(DATA.wageh[i])}</td>
      <td class="col-azouny">${formatNum(DATA.azouny[i])}</td>
      <td class="col-magdy">${formatNum(DATA.magdy[i])}</td>
      <td class="col-canal">${formatNum(DATA.canal[i])}</td>
      <td class="col-total">${formatNum(total)}</td>`;
    tbody.appendChild(tr);
    // Staggered animation
    setTimeout(() => tr.querySelectorAll('td').forEach(td => td.classList.add('visible')), i * 80 + 200);
  });

  // Totals row
  const monthTotals = MONTHS.map((_, i) => DATA.wageh[i] + DATA.azouny[i] + DATA.magdy[i] + DATA.canal[i]);
  tfoot.innerHTML = `<tr>
    <td>الإجمالي</td>
    <td class="col-wageh">${formatNum(TOTALS.wageh)}</td>
    <td class="col-azouny">${formatNum(TOTALS.azouny)}</td>
    <td class="col-magdy">${formatNum(TOTALS.magdy)}</td>
    <td class="col-canal">${formatNum(TOTALS.canal)}</td>
    <td class="col-total">${formatNum(GRAND_TOTAL)}</td>
  </tr>`;
  setTimeout(() => tfoot.querySelectorAll('td').forEach(td => td.classList.add('visible')), 1200);
}

// ─── REPS CHARTS ─────────────────────────────────────
function drawRepsCharts() {
  const commonOpts = (label, data, color) => ({
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label, data, borderColor: color, backgroundColor: color + '18',
          borderWidth: 2.5, fill: true, tension: 0.42, pointRadius: 4,
          pointBackgroundColor: color, pointBorderColor: '#fff', pointBorderWidth: 1.5
        },
        {
          label: 'وجيه', data: DATA.wageh, borderColor: '#ffd700', backgroundColor: 'transparent',
          borderWidth: 1.5, fill: false, tension: 0.42, pointRadius: 0, borderDash: [4, 3]
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 1400, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' ' + formatNum(ctx.parsed.y) + ' جنيه' } }
      },
      scales: {
        x: { ticks: { color: 'rgba(255,255,255,.45)', font: { size: 9 }, maxRotation: 60 }, grid: { display: false } },
        y: { ticks: { color: 'rgba(255,255,255,.5)', font: { size: 9 }, callback: v => formatNum(v) }, grid: { color: 'rgba(255,255,255,.06)' } },
      }
    }
  });

  // Combined chart
  new Chart(document.getElementById('chart-monthly-all'), {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'وجيه', data: DATA.wageh, borderColor: '#ffd700', backgroundColor: '#ffd70018', fill: true, tension: .42, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#ffd700' },
        { label: 'عزوني', data: DATA.azouny, borderColor: '#00b4d8', backgroundColor: '#00b4d818', fill: false, tension: .42, borderWidth: 2, pointRadius: 3 },
        { label: 'مجدي', data: DATA.magdy, borderColor: '#a8d5ba', backgroundColor: 'transparent', fill: false, tension: .42, borderWidth: 2, pointRadius: 3 },
        { label: 'القناة', data: DATA.canal, borderColor: '#f4a261', backgroundColor: 'transparent', fill: false, tension: .42, borderWidth: 2, pointRadius: 3 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 1600, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: true, position: 'top', labels: { color: 'rgba(255,255,255,.8)', font: { family: 'Cairo', size: 11 }, padding: 16 } },
        tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + formatNum(ctx.parsed.y) + ' جنيه' } }
      },
      scales: {
        x: { ticks: { color: 'rgba(255,255,255,.6)', font: { family: 'Cairo', size: 10 } }, grid: { color: 'rgba(255,255,255,.05)' } },
        y: { ticks: { color: 'rgba(255,255,255,.6)', callback: v => formatNum(v) }, grid: { color: 'rgba(255,255,255,.07)' } },
      }
    }
  });

  // Individual charts
  new Chart(document.getElementById('chart-ind-wageh'), commonOpts('وجيه', DATA.wageh, '#ffd700'));
  new Chart(document.getElementById('chart-ind-azouny'), commonOpts('عزوني', DATA.azouny, '#00b4d8'));
  new Chart(document.getElementById('chart-ind-magdy'), commonOpts('مجدي', DATA.magdy, '#a8d5ba'));
  new Chart(document.getElementById('chart-ind-canal'), commonOpts('القناة', DATA.canal, '#f4a261'));
}

// ─── PROFILE MODAL ───────────────────────────────────
function openProfile(repKey) {
  const rep = REPS[repKey];
  if (!rep) return;
  const data = DATA[rep.key];
  const total = TOTALS[rep.key];
  const max = Math.max(...data);
  const min = Math.min(...data);

  // TOP
  document.getElementById('pmodal-top').innerHTML = `
    <div class="pmodal-photo ${rep.premium ? 'premium-frame' : 'regular-frame'}">
      <img src="${rep.photo}" alt="${rep.name}"/>
    </div>
    <div class="pmodal-meta">
      ${rep.premium ? '<div class="pmodal-crown">👑 Premium</div>' : ''}
      <h3>${rep.name}</h3>
      <div class="pmodal-role">${rep.nameAr} · ${rep.role}</div>
      <div class="pmodal-total">إجمالي 2025: ${formatNum(total)} جنيه</div>
    </div>`;

  // BODY
  let body = `
    <div class="pmodal-section">
      <h4>📋 معلومات عامة</h4>
      <div class="stat-grid">
        <div class="stat-box"><div class="s-val">${rep.experience}</div><div class="s-label">الخبرة</div></div>
        <div class="stat-box"><div class="s-val" style="color:${rep.color}">${formatNum(max)}</div><div class="s-label">أعلى شهر</div></div>
        <div class="stat-box"><div class="s-val">${rep.promo_reps}</div><div class="s-label">النطاق</div></div>
      </div>
    </div>`;

  if (rep.strengths.length || rep.weaknesses.length) {
    body += `<div class="pmodal-section"><h4>💡 نقاط القوة والضعف</h4><div class="pmodal-tags">`;
    rep.strengths.forEach(s => body += `<span class="tag-plus">✓ ${s}</span>`);
    rep.weaknesses.forEach(w => body += `<span class="tag-minus">△ ${w}</span>`);
    body += `</div></div>`;
  }

  if (rep.notes.length) {
    body += `<div class="pmodal-section"><h4>📌 ملاحظات</h4><div class="pmodal-tags">`;
    rep.notes.forEach(n => body += `<span class="tag-neutral">${n}</span>`);
    body += `</div></div>`;
  }

  // Monthly mini chart
  body += `<div class="pmodal-section">
    <h4>📈 السجل الشهري 2025</h4>
    <div class="pmodal-chart-wrap"><canvas id="pmodal-chart" class="pmodal-canvas"></canvas></div>
  </div>`;

  document.getElementById('pmodal-body').innerHTML = body;
  document.getElementById('profile-modal').classList.add('open');

  // Destroy previous chart if any
  if (profileCharts.main) { profileCharts.main.destroy(); delete profileCharts.main; }

  setTimeout(() => {
    const ctx = document.getElementById('pmodal-chart');
    if (!ctx) return;
    profileCharts.main = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [{
          label: rep.nameAr,
          data, borderRadius: 6, borderWidth: 2,
          backgroundColor: MONTHS.map((_, i) => data[i] === max ? rep.color + 'ee' : rep.color + '66'),
          borderColor: rep.color,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ' ' + formatNum(ctx.parsed.y) + ' جنيه' } }
        },
        scales: {
          x: { ticks: { color: 'rgba(255,255,255,.5)', font: { size: 9 }, maxRotation: 60 }, grid: { display: false } },
          y: { ticks: { color: 'rgba(255,255,255,.5)', callback: v => formatNum(v) }, grid: { color: 'rgba(255,255,255,.06)' } },
        }
      }
    });
  }, 100);
}

function closeProfile() {
  document.getElementById('profile-modal').classList.remove('open');
}

// ─── GENERIC MODAL ───────────────────────────────────
function showComingSoon(section) {
  document.getElementById('modal-title').textContent = section;
  document.getElementById('modal-body').textContent = `سيتم إضافة قسم "${section}" قريباً. ترقبوا التحديثات!`;
  document.getElementById('modal').classList.add('open');
}
function closeModal() { document.getElementById('modal').classList.remove('open'); }

// ─── CUSTOMER TABS ───────────────────────────────────
let customerChartsDrawn = false;

function showCustTab(tabId, btn) {
  document.querySelectorAll('.cust-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  if (btn) btn.classList.add('active');
}

function drawCustomerCharts() {
  if (customerChartsDrawn) return;
  customerChartsDrawn = true;

  // Animated counters
  animateCounter('cn-old', 0, 63, 1200);
  animateCounter('cn-new', 0, 153, 1400);
  animateCounter('sh-old', 0, 97, 1200);
  animateCounter('sh-new', 0, 175, 1400);

  // Canal doughnut
  const canalCtx = document.getElementById('chart-cust-canal');
  if (canalCtx) {
    new Chart(canalCtx, {
      type: 'doughnut',
      data: {
        labels: ['عملاء جُدد', 'عملاء سابقون'],
        datasets: [{
          data: [90, 63],
          backgroundColor: ['#26d07c', '#0077b6'],
          borderColor: '#011f3a', borderWidth: 3,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 1400, easing: 'easeOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,.7)', font: { family: 'Cairo', size: 11 }, padding: 14 } },
          tooltip: { callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + ' عميل' } }
        },
        cutout: '55%',
      }
    });
  }

  // Sharqiya doughnut
  const sharqCtx = document.getElementById('chart-cust-sharq');
  if (sharqCtx) {
    new Chart(sharqCtx, {
      type: 'doughnut',
      data: {
        labels: ['عملاء جُدد', 'عملاء سابقون'],
        datasets: [{
          data: [78, 97],
          backgroundColor: ['#26d07c', '#0077b6'],
          borderColor: '#011f3a', borderWidth: 3,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 1400, easing: 'easeOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,.7)', font: { family: 'Cairo', size: 11 }, padding: 14 } },
          tooltip: { callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + ' عميل' } }
        },
        cutout: '55%',
      }
    });
  }
}

// ─── ANIMATED COUNTER ────────────────────────────────
function animateCounter(elId, from, to, duration) {
  const el = document.getElementById(elId);
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const pct = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - pct, 3); // easeOutCubic
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val;
    if (pct < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── HELPERS ─────────────────────────────────────────
function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + ' م';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + ' ألف';
  return n.toLocaleString('ar-EG');
}
