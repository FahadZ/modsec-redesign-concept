# Review of modsec.ca (current site)

Reviewed 2026-09-21 by loading the home page and all linked pages (services, products, Honeywell, LifeSentry, articles, promotions, testimonials, contact) and checking the home page at desktop and 375px mobile width. This is a hands-on review, not an automated Lighthouse or accessibility audit.

**Overall: 3 / 10**

| Area | Score | What I found |
|---|---|---|
| Visual design & brand | 3/10 | 2010-era look: gradient nav, curved header, blue page background, stock family photo. The logo and colours are worth keeping; the layout is not. |
| Mobile | 1/10 | No viewport meta tag. On a 375px screen the desktop layout is shrunk down, so text is tiny and the nav is cramped. |
| Trust & security signals | 2/10 | The site loads over plain **HTTP** (no HTTPS), which browsers flag as "Not secure". That is a poor look for a security company. ULC and Honeywell are mentioned in text only, with no badges. |
| Lead generation | 2/10 | No phone number on the home page. The contact page shows the phone, email and address as a **picture**, so they are not clickable, not searchable, and unreadable to screen readers. No contact form, no quote request, no click-to-call. |
| Content | 4/10 | Friendly, credible copy, but generic. "Repuation" is misspelled in the footer on every page, plus "Secuirty" and "HoneyWells". The Products page lists no products, LifeSentry is just a PDF link, and the charity promotion has no details. No pricing or packages anywhere. |
| SEO | 5/10 | Good page titles, meta descriptions and local keywords, and a security articles page. But there are no H1/H2 headings on the home page, no structured data (LocalBusiness), and no HTTPS. |
| Accessibility | 3/10 | No heading structure, contact details as an image, pale grey text on light backgrounds. |
| Social proof | 7/10 | The best asset: at least seven real, specific testimonials and a "35+ years" story. Most sit on a separate page, with only two shown in the footer. |
| Freshness | 3/10 | The footer copyright still says 2023. |

## Biggest opportunities
1. Move to HTTPS and a responsive layout.
2. Put a phone number, click-to-call and a "free security analysis" form above the fold.
3. Show packages, bundles and products so visitors can self-qualify.
4. Turn the testimonials, ULC and Honeywell credentials into visible trust signals.
5. Add structured data, proper headings and real text for contact details.

## Not verified
- HTTPS/redirect behaviour beyond loading the page over http://.
- Page speed, Core Web Vitals, or a full WCAG audit.
- Whether ULC certification and Honeywell dealer status are current (taken from the owner's own copy).
