# Kirti & Shivam — December 2026

Responsive React + Vite invitation with a full-width Sunlit Heritage artwork, gentle ambient motion, separate engagement and wedding invitations, countdown, music, calendar downloads, and sharing.

## Run
```
npm install
npm run dev
```

## Build and deploy
```
npm run build
```
Deploy `dist` to a static host. No backend or secrets are required. Sharing uses the current URL, so share from the deployed site.

## Confirmed details
- Kirti & Shivam
- Engagement: Sunday, 6 December 2026 at 2:00 PM IST. Venue pending.
- Wedding: Saturday, 12 December 2026 at 8:00 PM IST, Laxmi Nagar, Delhi. Exact venue pending.
- Dinner timing remains unconfirmed.

Edit `src/config.js` for names, dates, venues, optional WhatsApp RSVP number and optional licensed audio URL. Calendar downloads use the configured Indian timezone offset and an estimated three-hour duration. The default original instrumental is synthesized locally; tap Play music to start. No recording from the reference site is used. WhatsApp RSVP appears only after a contact number is configured.

## Design sources
Current app: `src/App.jsx`, `src/HeritageHero.jsx`, `src/wedding.css`, `src/heritage.css`, `src/celebrations.css`, `src/Celebrations.jsx`, `src/Motion.jsx`, `src/WeddingMusic.jsx`. Earlier source/CSS revisions remain in the folder but are not imported.

Artwork: `public/images/sunlit-heritage.webp`, generated with the built-in ImageGen tool and encoded as WebP. This is decorative artwork, not a photograph of the actual venue. Prompt and production notes are in `ARTWORK.md`.

Reduced-motion mode displays all event cards statically. Google Fonts loads online with local font fallbacks. The page itself spans the full viewport; reading sections have their own internal spacing.


## Selected theme
Sunlit Heritage: ivory #FFF7EA, saffron #B85B32, gold #D6AB57. The header has been removed. The hero has no pinned zoom or scroll-triggered text fade. Responsive picture sources use desktop and portrait artwork. Both ceremonies have separate visible invitations. Artwork prompts and asset paths are in SUNLIT-ARTWORK.md.


## Ceremony programme
The celebrations now render from the events array through src/CeremonySchedule.jsx and src/schedule.css. Compact rows show each ceremony name, date, time and venue immediately; native expandable details contain descriptions and calendar downloads. Haldi, Mehendi and Chaak Bhat are included with dates, times and venues marked to be announced. Add further events to src/config.js using a unique kind; unknown icon kinds use a wedding symbol fallback. Calendar buttons appear only for events with a complete timestamp, and the default wedding download resolves the event by kind rather than array position.

Readability updates use darker text and larger small-text sizes. Checked programme title/venue/time and RSVP paragraph contrast ratios exceed 4.5:1. The default wedding calendar download was verified as 12 December 2026 at 8 PM IST. Production build passes.

## Selected song
Din Shagna Da, YouTube video 1LVpuWpRs3I. The music control links to the original YouTube song in a new tab. Both standard and privacy-enhanced YouTube embeds returned "This video is unavailable" during verification, although the original watch page opened. The app therefore uses the direct link rather than a broken embedded player. No audio was extracted or downloaded. To use a permitted local audio recording instead, clear musicYouTubeId and set musicUrl to the audio asset URL. The original synthesized soundtrack remains the fallback only when both fields are empty.
