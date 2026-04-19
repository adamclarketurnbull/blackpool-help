// app.js — DOM, rendering, filtering, form

var CATEGORIES = {
  food:      { label: 'Food',     color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  shelter:   { label: 'Shelter',  color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  outreach:  { label: 'Outreach', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  addiction: { label: 'Addiction Support', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  clothing:  { label: 'Clothing', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  family:    { label: 'Family',   color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  other:     { label: 'Other',    color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' }
};

var STATUS_CLASSES = {
  open:        'text-green-400',
  opens_later: 'text-slate-400',
  closed:      'text-slate-600'
};

function renderCard(service, mode) {
  // mode: 'home' (shows open/closed status) or 'directory' (shows last_verified)
  var status = getServiceStatus(service);
  var stale = isStale(service);
  var cat = CATEGORIES[service.category] || CATEGORIES.other;
  var isDimmed = mode === 'home' && status.status === 'closed';
  var phone = service.phone;

  var tagsHtml = service.what_they_offer.map(function(t) {
    return '<span class="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">' + t + '</span>';
  }).join('');

  var staleHtml = stale
    ? '<p class="text-xs text-amber-400 mt-2">⚠ Info may be outdated — last verified ' + service.last_verified + '</p>'
    : '';

  var verifiedHtml = mode === 'directory'
    ? '<p class="text-xs text-slate-500 mt-2">Last verified: ' + service.last_verified + (stale ? ' ⚠' : '') + '</p>'
    : '';

  var referralHtml = service.referral_needed
    ? '<p class="text-xs text-amber-300 mt-2 font-medium">Referral required — ' + service.referral_contact + '</p>'
    : '';

  var urlHtml = service.url
    ? '<a href="' + service.url + '" target="_blank" rel="noopener" class="text-xs text-slate-400 hover:text-amber-400 underline mt-1 inline-block">Website / Facebook</a>'
    : '';

  var statusClass = STATUS_CLASSES[status.status] || STATUS_CLASSES.closed;
  var cardOpacity = isDimmed ? 'opacity-50' : '';

  return '<article class="rounded-xl border border-slate-700 bg-slate-800 p-4 flex flex-col gap-3 ' + cardOpacity + '">' +
    '<div class="flex items-start justify-between gap-2">' +
      '<div>' +
        '<span class="text-xs px-2 py-0.5 rounded-full border ' + cat.color + ' font-medium">' + cat.label + '</span>' +
        '<h2 class="mt-2 text-base font-bold text-white leading-snug">' + service.name + '</h2>' +
      '</div>' +
    '</div>' +
    '<p class="text-sm text-slate-400 leading-relaxed">' + service.description + '</p>' +
    '<div class="flex flex-wrap gap-1.5">' + tagsHtml + '</div>' +
    '<p class="text-xs text-slate-500">' + service.address + '</p>' +
    (mode === 'home' ? '<p class="text-sm font-medium ' + statusClass + '">' + status.label + '</p>' : '') +
    referralHtml +
    staleHtml +
    verifiedHtml +
    urlHtml +
    '<a href="tel:' + phone.replace(/\s/g, '') + '" ' +
      'aria-label="Call ' + service.name + ' on ' + phone + '" ' +
      'class="mt-1 w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm py-2.5 transition-colors">' +
      '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.338c0 10.28 8.182 18.6 18.375 18.6a18.45 18.45 0 004.518-.563l-4.19-4.19a14.25 14.25 0 01-5.168 1.005c-5.318 0-9.803-3.528-11.52-8.438L2.25 6.338z"/>' +
      '</svg>' +
      phone +
    '</a>' +
  '</article>';
}

var DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function updateClock() {
  var now = new Date();
  var hh = String(now.getHours()).padStart(2, '0');
  var mm = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock-time').textContent = hh + ':' + mm;
  document.getElementById('clock-day').textContent = DAYS_FULL[now.getDay()];
}

function sortForHome(services) {
  var order = { open: 0, opens_later: 1, closed: 2 };
  return services.slice().sort(function(a, b) {
    var sa = getServiceStatus(a).status;
    var sb = getServiceStatus(b).status;
    return (order[sa] || 2) - (order[sb] || 2);
  });
}

function renderHomeCards(services) {
  var container = document.getElementById('cards-home');
  var sorted = sortForHome(services);
  container.innerHTML = sorted.map(function(s) {
    return renderCard(s, 'home');
  }).join('');
}

var activeHomeCategory = 'all';
var activeDirectoryCategory = 'all';

function buildFilterBar(containerId, activeCategory, onSelect) {
  var container = document.getElementById(containerId);
  var filters = ['all'].concat(Object.keys(CATEGORIES));
  container.innerHTML = filters.map(function(cat) {
    var label = cat === 'all' ? 'All' : (CATEGORIES[cat] ? CATEGORIES[cat].label : cat);
    var isActive = cat === activeCategory;
    var activeClass = isActive
      ? 'bg-amber-500 text-slate-900 font-semibold'
      : 'bg-slate-700 text-slate-300 hover:bg-slate-600';
    return '<button ' +
      'data-cat="' + cat + '" ' +
      'aria-pressed="' + isActive + '" ' +
      'class="flex-shrink-0 text-sm px-3 py-1.5 rounded-full transition-colors ' + activeClass + '">' +
      label +
    '</button>';
  }).join('');

  container.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      onSelect(btn.getAttribute('data-cat'));
    });
  });
}

function applyHomeFilter(category) {
  activeHomeCategory = category;
  window.location.hash = category === 'all' ? '' : category;
  buildFilterBar('filter-bar-home', category, applyHomeFilter);
  var filtered = category === 'all'
    ? SERVICES
    : SERVICES.filter(function(s) { return s.category === category; });
  renderHomeCards(filtered);
}

function applyDirectoryFilter(category) {
  activeDirectoryCategory = category;
  buildFilterBar('filter-bar-directory', category, applyDirectoryFilter);
  var filtered = category === 'all'
    ? SERVICES
    : SERVICES.filter(function(s) { return s.category === category; });
  renderDirectoryCards(filtered);
}

function renderDirectoryCards(services) {
  // Sort: fresh first, stale last
  var sorted = services.slice().sort(function(a, b) {
    var aStale = isStale(a) ? 1 : 0;
    var bStale = isStale(b) ? 1 : 0;
    return aStale - bStale;
  });
  var container = document.getElementById('cards-directory');
  container.innerHTML = sorted.map(function(s) {
    return renderCard(s, 'directory');
  }).join('');
}

function showSection(sectionId) {
  ['home','directory','suggest'].forEach(function(id) {
    document.getElementById(id).classList.toggle('hidden', id !== sectionId);
  });
  ['home','directory','suggest'].forEach(function(id) {
    var el = document.getElementById('nav-' + id);
    if (!el) return;
    el.classList.toggle('text-amber-400', id === sectionId);
    el.classList.toggle('text-slate-300', id !== sectionId);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateClock();
  setInterval(updateClock, 60000);

  // Read hash for initial filter
  var hash = window.location.hash.replace('#', '');
  var validCats = Object.keys(CATEGORIES);
  var initCat = validCats.indexOf(hash) !== -1 ? hash : 'all';

  buildFilterBar('filter-bar-home', initCat, applyHomeFilter);
  buildFilterBar('filter-bar-directory', 'all', applyDirectoryFilter);

  applyHomeFilter(initCat);

  // Nav view switching
  document.getElementById('nav-home').addEventListener('click', function(e) {
    e.preventDefault(); showSection('home');
  });
  document.getElementById('nav-directory').addEventListener('click', function(e) {
    e.preventDefault();
    renderDirectoryCards(SERVICES);
    buildFilterBar('filter-bar-directory', 'all', applyDirectoryFilter);
    showSection('directory');
  });
  document.getElementById('nav-suggest').addEventListener('click', function(e) {
    e.preventDefault(); showSection('suggest');
  });

  // Suggest form
  var form = document.getElementById('suggest-form');
  var statusEl = document.getElementById('form-status');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Replace YOUR_FORMSPREE_ID with the actual endpoint from formspree.io
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

    var data = {};
    new FormData(form).forEach(function(val, key) { data[key] = val; });

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    statusEl.className = 'hidden text-sm rounded-lg px-3 py-2';

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(res) { return res.json().then(function(body) { return { ok: res.ok, body: body }; }); })
    .then(function(result) {
      if (result.ok) {
        statusEl.className = 'text-sm rounded-lg px-3 py-2 bg-green-500/20 text-green-300 border border-green-500/30';
        statusEl.textContent = 'Thanks — we\'ll verify and add it to the directory.';
        form.reset();
      } else {
        throw new Error(result.body.error || 'Submission failed');
      }
    })
    .catch(function(err) {
      statusEl.className = 'text-sm rounded-lg px-3 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/30';
      statusEl.textContent = 'Something went wrong. Please try again or call us directly.';
    })
    .finally(function() {
      btn.disabled = false;
      btn.textContent = 'Submit suggestion';
    });
  });

  showSection('home');
});
