# DT-S Spa — Kampala, Uganda

A responsive static website for a local sauna, massage, gym and rooms business. It uses plain HTML, CSS and JavaScript.

## Pages
- `index.html` — overview of the four main services and an appointment enquiry form.
- `services.html` — sauna and gym information plus a massage menu with named styles.
- `rooms.html` — room enquiry information.
- `about us.html` — about the spa.
- `contact us.html` — contact information and directions.
- `gallery.html` — illustrative sauna, massage, gym and room images. Older project images, audio and video are archived in `examples.html`.
- `examples.html` — preserved HTML tables, lists, text elements and demonstration form from the earlier project.

## Run locally
Open `index.html` in a modern browser. No build step or third-party JavaScript package is required.

## Massage and sauna enquiries
The massage menu includes relaxation/Swedish, deep tissue, aromatherapy oil, hot stone, sports, head/neck/shoulder, foot, Thai-style stretching, four-hands, couples, body-to-body and Italian massage enquiries. The words “body-to-body” and “Italian” can be used differently by different providers; staff should explain the exact service, boundaries, duration and current price before a customer confirms.

Sauna enquiries cover a standard session and allow customers to ask about private use, combining sauna with massage, and whether dry-sauna or steam options are available. Do not treat an enquiry as confirmation that every option is available.

The booking form validates the enquiry, builds a formatted message and opens the visitor's configured email app addressed to `ssegirinyapius07@gmail.com`. The visitor must review the draft and press Send; the site does not send email in the background. A copy-message fallback is available if an email app does not open. WhatsApp remains hidden until the business's verified number is added in `site-config.js`. The form does not store information, take payment or confirm bookings.

## Before public launch
Replace illustrative images with genuine, approved photos of the actual premises when available. Confirm the contact details, service list, prices, opening hours, room arrangements and what each massage name means before publishing firm promises. Verify that the configured enquiry email is the right address for the business. No database or online payment system is currently implemented.
