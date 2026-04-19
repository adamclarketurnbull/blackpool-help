// logic.js — pure logic functions (no DOM)

// Returns { status: 'open'|'opens_later'|'closed', label: string }
// now is an optional Date (defaults to new Date()) — injectable for testing
function getServiceStatus(service, now) {
  var d = now || new Date();
  var days = ['sun','mon','tue','wed','thu','fri','sat'];
  var currentDay = days[d.getDay()];
  var hh = String(d.getHours()).padStart(2, '0');
  var mm = String(d.getMinutes()).padStart(2, '0');
  var currentTime = hh + ':' + mm;

  var opensLaterAt = null;

  for (var i = 0; i < service.opening_hours.length; i++) {
    var entry = service.opening_hours[i];
    if (entry.days.indexOf(currentDay) === -1) continue;

    var overnight = entry.to <= entry.from; // e.g. 22:00 to 02:00
    var isOpen = overnight
      ? (currentTime >= entry.from || currentTime < entry.to)
      : (currentTime >= entry.from && currentTime < entry.to);

    if (isOpen) {
      return { status: 'open', label: 'Open now · Closes ' + entry.to };
    }

    if (currentTime < entry.from) {
      if (opensLaterAt === null || entry.from < opensLaterAt) {
        opensLaterAt = entry.from;
      }
    }
  }

  if (opensLaterAt !== null) {
    return { status: 'opens_later', label: 'Opens today at ' + opensLaterAt };
  }

  return { status: 'closed', label: 'Closed today' };
}

// Returns true if last_verified is 90+ days before today
// today is an optional Date (defaults to new Date()) — injectable for testing
function isStale(service, today) {
  var ref = today || new Date();
  var verified = new Date(service.last_verified);
  var diffMs = ref.getTime() - verified.getTime();
  var diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 90;
}

if (typeof module !== 'undefined') { module.exports = { getServiceStatus, isStale }; }
