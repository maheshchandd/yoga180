# Yoga180 — direct messaging revision (approved)

## Current behavior
- Demo requests use direct WhatsApp/Text links to +1 647-785-1243. Asha confirms times manually; no demo Calendar/Sheet/lead writes.
- Attendance QR is static and reusable: SMSTO:+16477851243:I am here for the class.
- No name entry, date/time, expiry, Google attendance sync or website attendance record.
- /admin retains password protection and the Leads inbox, with QR display/print/download.
- /check-in is a no-form SMS fallback with copy actions; /demo/cancel directs visitors to Asha.
- Old demo/attendance API namespaces are unregistered. Their source and database tables remain inactive; no historic records or secrets removed.
- Previous Google demo/attendance setup plan is superseded. Existing callback/chat and optional lead export remain unchanged.

## Verified
- Lint, web typecheck and production build passed; bundle-size warning only.
- Desktop/mobile Playwright checks passed: direct links, copy actions, QR download/display/print, no attendance/demo/lead-create requests, no JS errors.
- All four tested retired demo/attendance endpoints return 404 after restarting the development server to clear stale SSR state.
- Original QR, both admin downloads and printable poster decode to the exact number and message.
- No SMS or WhatsApp messages sent during testing; no database changes required.
- Print PDF and poster visually checked. Real iPhone/Android native SMS handoff still requires a phone scan test.

## Delivery
- Website on configured port 4200.
- /home/user/yoga180-qr/attendance-qr.png: raw reusable QR.
- /home/user/yoga180-qr/attendance-qr-poster.png: printable poster with number/message and tap-Send instruction.
