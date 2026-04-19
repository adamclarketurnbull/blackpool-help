// data.js — loads services from services.csv
// To update the directory: edit services.csv in Excel, Google Sheets, or Numbers.
// Save as CSV (comma-separated), commit and push — the site updates automatically.
//
// Hours format:  days comma-separated, then colon, then HH:MM-HH:MM — multiple slots separated by ;
//   Single slot:   "mon,tue,fri:10:00-13:00"  (quote in CSV if days contain commas)
//   Split hours:   mon:20:00-23:00;sat:22:00-02:00
// what_they_offer: pipe-separated  e.g.  hot food|clothing|showers
// referral_needed: yes  or  no

var SERVICES = [];

function loadServices() {
  return fetch('./services.csv')
    .then(function(r) {
      if (!r.ok) throw new Error('Could not load services.csv');
      return r.text();
    })
    .then(function(text) {
      SERVICES = parseServicesCSV(text);
      return SERVICES;
    });
}

function parseServicesCSV(text) {
  var lines = text.trim().split('\n');
  var headers = parseCSVRow(lines[0]);
  return lines.slice(1).filter(function(l) { return l.trim(); }).map(function(line) {
    var vals = parseCSVRow(line);
    var o = {};
    headers.forEach(function(h, i) { o[h.trim()] = (vals[i] || '').trim(); });
    return {
      name:            o.name,
      category:        o.category,
      description:     o.description,
      address:         o.address,
      phone:           o.phone,
      url:             o.url || null,
      opening_hours:   parseHours(o.hours),
      what_they_offer: o.what_they_offer ? o.what_they_offer.split('|').map(function(t){ return t.trim(); }) : [],
      who_for:         o.who_for,
      referral_needed: o.referral_needed === 'yes',
      referral_contact: o.referral_contact || null,
      last_verified:   o.last_verified
    };
  });
}

var DAY_NAMES = ['sun','mon','tue','wed','thu','fri','sat'];

function expandDayRange(str) {
  // Expands "mon-fri" shorthand into ["mon","tue","wed","thu","fri"]
  var rangeMatch = str.match(/^([a-z]{3})-([a-z]{3})$/);
  if (!rangeMatch) return [str];
  var start = DAY_NAMES.indexOf(rangeMatch[1]);
  var end   = DAY_NAMES.indexOf(rangeMatch[2]);
  if (start === -1 || end === -1) return [str];
  var out = [];
  for (var i = start; i <= end; i++) out.push(DAY_NAMES[i]);
  return out;
}

function parseHours(str) {
  if (!str) return [];
  return str.split(';').map(function(slot) {
    slot = slot.trim();
    // Match HH:MM-HH:MM at end, or bare HH:MM at end (no closing time)
    var rangeMatch = slot.match(/(\d{2}:\d{2}-\d{2}:\d{2})$/);
    var singleMatch = !rangeMatch && slot.match(/(\d{2}:\d{2})$/);
    if (!rangeMatch && !singleMatch) return null;

    var timeRange = rangeMatch ? rangeMatch[1] : singleMatch[1];
    var daysPart  = slot.slice(0, slot.length - timeRange.length - 1);
    var times     = rangeMatch ? timeRange.split('-') : [timeRange, addHour(timeRange)];

    var days = [];
    daysPart.split(',').forEach(function(d) {
      expandDayRange(d.trim()).forEach(function(day) { days.push(day); });
    });

    return { days: days.filter(Boolean), from: times[0], to: times[1] };
  }).filter(Boolean);
}

function addHour(time) {
  var parts = time.split(':');
  var h = (parseInt(parts[0], 10) + 1) % 24;
  return String(h).padStart(2, '0') + ':' + parts[1];
}

function parseCSVRow(row) {
  var result = [], cur = '', inQ = false;
  for (var i = 0; i < row.length; i++) {
    var c = row[i];
    if      (c === '"' && !inQ)      { inQ = true; }
    else if (c === '"' && inQ)       { if (row[i+1] === '"') { cur += '"'; i++; } else { inQ = false; } }
    else if (c === ',' && !inQ)      { result.push(cur); cur = ''; }
    else                             { cur += c; }
  }
  result.push(cur);
  return result;
}
