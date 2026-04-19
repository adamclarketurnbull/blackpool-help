// logic.js — pure logic functions (no DOM)
function getServiceStatus(service, now) { return { status: 'closed', label: 'Closed today' }; }
function isStale(service, today) { return false; }

// Node.js compatibility for tests
if (typeof module !== 'undefined') { module.exports = { getServiceStatus, isStale }; }
