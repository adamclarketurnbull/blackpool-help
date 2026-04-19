// data.js
// Hours are approximate — verify each service before launch
var SERVICES = [
  {
    name: "The Bridge Project",
    category: "food",
    description: "Hot meals, clothing and essentials run by the Salvation Army in central Blackpool.",
    address: "Salvation Army, 37 Reads Ave, Blackpool FY1 4BT",
    phone: "01253 624 216",
    url: "https://www.salvationarmy.org.uk",
    opening_hours: [
      { days: ["mon","tue","thu","fri"], from: "10:00", to: "13:00" }
    ],
    what_they_offer: ["hot food", "clothing", "essentials"],
    who_for: "all",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "Street Angels",
    category: "outreach",
    description: "Volunteer outreach on Monday evenings and a safe space on Saturday nights in the town centre.",
    address: "Blackpool Town Centre (roaming on Mon, base TBC on Sat)",
    phone: "07700 000001",
    url: "https://www.streetangels.org.uk",
    opening_hours: [
      { days: ["mon"], from: "20:00", to: "23:00" },
      { days: ["sat"], from: "22:00", to: "02:00" }
    ],
    what_they_offer: ["outreach", "safety", "emotional support"],
    who_for: "all",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "Helping Hearts Fylde",
    category: "shelter",
    description: "Severe Weather Emergency Protocol (SWEP) shelter provision. Active when temperatures drop to 0°C or below.",
    address: "Blackpool — call for current location",
    phone: "07700 000002",
    url: "https://www.helpingheartsfylde.co.uk",
    opening_hours: [
      { days: ["mon","tue","wed","thu","fri","sat","sun"], from: "20:00", to: "08:00" }
    ],
    what_they_offer: ["emergency shelter", "warmth", "bedding"],
    who_for: "rough_sleepers",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "Homeless Action",
    category: "outreach",
    description: "Specialist support and referral service for people experiencing homelessness in Blackpool.",
    address: "Blackpool — referral only, call for details",
    phone: "01253 272 599",
    url: null,
    opening_hours: [
      { days: ["mon","tue","wed","thu","fri"], from: "09:00", to: "17:00" }
    ],
    what_they_offer: ["referral", "housing support", "advocacy"],
    who_for: "rough_sleepers",
    referral_needed: true,
    referral_contact: "Call 01253 272 599 to self-refer",
    last_verified: "2026-03-01"
  },
  {
    name: "Streetlife",
    category: "other",
    description: "Drop-in support for young people aged 16–25 — mental health, housing, benefits, and more.",
    address: "48 Buchanan St, Blackpool FY1 3EH",
    phone: "01253 625 034",
    url: null,
    opening_hours: [
      { days: ["mon","tue","wed","thu","fri"], from: "09:00", to: "17:00" }
    ],
    what_they_offer: ["mental health", "housing advice", "benefits help", "drop-in"],
    who_for: "young_people",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "The Big Food Truck",
    category: "food",
    description: "Free hot food distributed from a mobile truck — locations vary, check Facebook for today's stop.",
    address: "Varies — see Facebook page for location",
    phone: "07700 000003",
    url: "https://www.facebook.com/thebigfoodtruck",
    opening_hours: [
      { days: ["mon","tue","thu"], from: "12:00", to: "14:00" }
    ],
    what_they_offer: ["hot food", "drinks"],
    who_for: "all",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "Blackpool Food Bank (Big Food Project)",
    category: "food",
    description: "Emergency food parcels for individuals and families in crisis. Referral required — see details.",
    address: "Blackpool — referral required, call for location",
    phone: "01253 477 100",
    url: "https://www.bigfoodproject.co.uk",
    opening_hours: [
      { days: ["tue","thu"], from: "10:00", to: "12:00" }
    ],
    what_they_offer: ["food parcels", "toiletries"],
    who_for: "families",
    referral_needed: true,
    referral_contact: "Referral via GP, social worker, or Citizens Advice",
    last_verified: "2026-03-01"
  },
  {
    name: "Empowerment Blackpool",
    category: "other",
    description: "Mental health support and community groups — including a men's group. Welcoming and informal.",
    address: "Blackpool — call for current venue",
    phone: "01253 477 200",
    url: null,
    opening_hours: [
      { days: ["tue","thu"], from: "10:00", to: "15:00" }
    ],
    what_they_offer: ["mental health", "peer support", "men's groups"],
    who_for: "all",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  },
  {
    name: "STAR Blackpool",
    category: "other",
    description: "Community mental health recovery support — self-referral welcome, drop-in available.",
    address: "Blackpool — call for address",
    phone: "01253 477 300",
    url: null,
    opening_hours: [
      { days: ["mon","tue","wed","thu","fri"], from: "09:00", to: "16:00" }
    ],
    what_they_offer: ["mental health", "recovery support", "drop-in"],
    who_for: "all",
    referral_needed: false,
    referral_contact: null,
    last_verified: "2026-03-01"
  }
];
