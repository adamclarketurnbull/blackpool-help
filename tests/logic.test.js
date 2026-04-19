// tests/logic.test.js
var { getServiceStatus, isStale } = require('../logic.js');

var passed = 0;
var failed = 0;

function assert(label, condition) {
  if (condition) {
    console.log('  PASS:', label);
    passed++;
  } else {
    console.error('  FAIL:', label);
    failed++;
  }
}

// --- getServiceStatus tests ---

var mondayNoon = new Date('2026-04-20T12:00:00'); // Monday
var mondayEvening = new Date('2026-04-20T20:30:00');
var mondayClosed = new Date('2026-04-20T15:00:00');
var tuesday = new Date('2026-04-21T11:00:00');
var saturday = new Date('2026-04-25T22:30:00');
var sunday = new Date('2026-04-26T12:00:00');

var bridgeProject = {
  opening_hours: [{ days: ['mon','tue','thu','fri'], from: '10:00', to: '13:00' }]
};

var streetAngels = {
  opening_hours: [
    { days: ['mon'], from: '20:00', to: '23:00' },
    { days: ['sat'], from: '22:00', to: '02:00' }
  ]
};

var noHours = { opening_hours: [] };

console.log('\ngetServiceStatus:');
assert('Bridge Project open Mon 12:00', getServiceStatus(bridgeProject, mondayNoon).status === 'open');
assert('Bridge Project closed Mon 15:00', getServiceStatus(bridgeProject, mondayClosed).status !== 'open');
assert('Bridge Project open Tue 11:00', getServiceStatus(bridgeProject, tuesday).status === 'open');
assert('Bridge Project closed Sun', getServiceStatus(bridgeProject, sunday).status === 'closed');
assert('Street Angels open Mon 20:30', getServiceStatus(streetAngels, mondayEvening).status === 'open');
assert('Street Angels open Sat 22:30', getServiceStatus(streetAngels, saturday).status === 'open');
assert('Street Angels closed Mon 12:00', getServiceStatus(streetAngels, mondayNoon).status !== 'open');
assert('No hours service is closed', getServiceStatus(noHours, mondayNoon).status === 'closed');
assert('Status label is a string', typeof getServiceStatus(bridgeProject, mondayNoon).label === 'string');
assert('Label contains time info when open', getServiceStatus(bridgeProject, mondayNoon).label.includes('13:00'));

// opens_later: Bridge Project on Monday at 08:00 (before opening)
var mondayEarly = new Date('2026-04-20T08:00:00');
assert('Bridge Project opens_later Mon 08:00', getServiceStatus(bridgeProject, mondayEarly).status === 'opens_later');
assert('opens_later label contains opening time', getServiceStatus(bridgeProject, mondayEarly).label.includes('10:00'));

// --- isStale tests ---

var today = new Date('2026-04-19');
var freshService  = { last_verified: '2026-03-20' }; // 30 days ago
var staleService  = { last_verified: '2025-12-01' }; // >90 days ago
var borderService = { last_verified: '2026-01-19' }; // exactly 90 days ago

console.log('\nisStale:');
assert('Fresh service (30 days) is not stale', isStale(freshService, today) === false);
assert('Stale service (>90 days) is stale',    isStale(staleService, today) === true);
assert('Exactly 90 days is stale',             isStale(borderService, today) === true);

// --- summary ---
console.log('\n' + passed + ' passed, ' + failed + ' failed');
if (failed > 0) process.exit(1);
