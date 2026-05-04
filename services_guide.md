# services.csv — Formatting Guide

This file is used by both humans verifying data and by AI assistants (Claude) adding new services.
All new services must be verified before adding — see the Verification section below.

---

## Hours — the key column

The `hours` column uses this pattern: `days:start-end`

- Days are **comma-separated** (mon, tue, wed, thu, fri, sat, sun)
- Multiple time slots are **semicolon-separated**
- **If the cell contains commas, wrap it in quotes in Excel**

**Single day:**
```
tue:11:00-12:30
```

**Multiple days, same time:**
```
"mon,wed,fri:10:00-13:00"
```
*(needs quotes because of the commas)*

**Different days with different times — use a semicolon to separate each slot:**
```
mon:10:00-12:00;wed:18:00-20:00
```

**Multiple days in one slot + a separate slot on another day:**
```
"mon,tue,thu:10:00-13:00;sat:09:00-11:00"
```
*(quotes needed because of commas)*

**Overnight (e.g. late night into early hours):**
```
sat:22:00-02:00
```

---

## Full row example — a service running lunch Mon/Wed and an evening session on Friday

```
My Service,food,Description here.,123 Example St FY1 1AA,01253 000000,https://example.com,"mon,wed:12:00-14:00;fri:18:00-20:00",hot food|drinks,all,no,,2026-05-04
```

---

## All columns

| Column | Example | Notes |
|---|---|---|
| name | Amazing Graze | |
| category | food | food / shelter / outreach / other |
| description | Free hot meals... | Plain text, keep it to 1-2 sentences |
| address | 44 Bolton St FY1 6AA | Wrap in quotes if it contains a comma |
| phone | 07522 816826 | |
| url | https://example.com | Leave blank if none |
| hours | `"tue,fri:10:00-13:00"` | See above — must be YYYY-MM-DD |
| what_they_offer | hot food\|pizza\|drinks | Pipe `\|` separated |
| who_for | all | all / families / rough_sleepers / young_people |
| referral_needed | no | yes or no |
| referral_contact | Call 01253 000000 | Leave blank if referral_needed = no |
| last_verified | 2026-05-04 | Always YYYY-MM-DD — never DD/MM/YYYY |

---

## Dates must be YYYY-MM-DD

✅ `2026-05-04`
❌ `04/05/2026` — this will break the stale-data warning (services flagged as outdated after 90 days)

---

## Categories

Currently only `food` is shown on the site. Other categories exist in the code for future use:

| Value | Meaning |
|---|---|
| food | Free meals, food banks, food parcels, community kitchens |
| shelter | Emergency or temporary accommodation |
| outreach | Street outreach, mobile support |
| addiction | Addiction and recovery support |
| clothing | Clothing banks, donated goods |
| family | Family-specific support services |
| other | Mental health, drop-ins, anything else |

To enable more categories on the site, edit line 7 of `app.js`:
```js
var ENABLED_CATEGORIES = ['food']; // add e.g. 'shelter', 'outreach' — or use 'all'
```

---

## what_they_offer — suggested tags

Use consistent tags where possible so filtering works well in future:

`hot food` · `food parcels` · `takeaway` · `pizza` · `soup` · `drinks` · `3-course meal`
`clothing` · `sleeping bags` · `toiletries` · `essentials`
`emergency shelter` · `warmth` · `bedding`
`outreach` · `safety` · `emotional support`
`mental health` · `peer support` · `drop-in` · `housing advice` · `benefits help`

---

## Verification checklist

Before adding any service, confirm:

- [ ] The service is currently active (not closed down)
- [ ] Opening hours are accurate — check the organisation's own website or Facebook
- [ ] Phone number connects to the service (not a defunct number)
- [ ] Address is correct — check Google Maps
- [ ] Referral requirements are confirmed
- [ ] `last_verified` is set to today's date in YYYY-MM-DD format

**Sources to check:**
- Organisation's own website
- Their Facebook page (often more up to date than websites)
- Blackpool Council community pages: https://www.blackpool.gov.uk
- Charity Commission register: https://register-of-charities.charitycommission.gov.uk
- Local community Facebook groups (Streets of Aztec etc.)

---

## Notes for AI assistants (Claude)

When asked to find or add services:

1. Search for Blackpool-based food / community services using the sources above
2. Confirm the service is in or very near Blackpool (FY1–FY4 postcodes)
3. Do not add a service if hours cannot be confirmed from a primary source
4. Set `last_verified` to today's date
5. Use the formatting rules in this guide exactly — particularly the hours format and date format
6. Flag any service where details are uncertain rather than guessing
7. Descriptions should be plain, factual, and under 20 words — written for someone in crisis, not a marketing audience
