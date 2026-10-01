# Pandora Website — Codex Instructions

Before making significant UI, architecture, content, or product decisions:

1. Read `PANDORA_BRIEF.md` completely.
2. Read `CONTENT.md` for current factual server information.
3. Treat `PANDORA_BRIEF.md` as the source of truth for product/design intent.
4. Treat `CONTENT.md` as the source of truth for current website facts.
5. Use files in `references/` as supporting source material only.
6. If a reference file conflicts with `CONTENT.md` or `PANDORA_BRIEF.md`, do not silently choose one. Flag the inconsistency.
7. Preserve unusual interaction concepts in the brief instead of replacing them with generic cards, dashboards, or common gaming-site patterns simply because they are easier to implement.
8. Do not invent finalized faction names, faction colors, faction icons, player assignments, player bios, captains, server address, screenshots, live scores, current events, or other content marked TBD.
9. The website currently has NO live server API or telemetry. Do not build fake live status UI.
10. Build media components so screenshots, GIFs, WebP animations, and short muted videos can be swapped in later without redesigning the site.
11. Respect `prefers-reduced-motion` and provide graceful fallbacks for major animations.
12. Keep content/data reasonably separate from presentation.
13. Favor reusable, responsive components over one-off page code.
14. Keep the interface cinematic, dark, tactile, and interactive without making it noisy, flashy, or difficult to read.
15. Avoid overusing cards. Use spacing, typography, dividers, layered backgrounds, bookmarks/tabs, and motion to create hierarchy.
16. Future live integrations may be added later, but the current site should work fully as a static information hub.
17. Before implementing a major feature, ask whether it both:
   - makes Pandora feel larger, more atmospheric, and more fun to explore; and
   - still makes information easy for a small friend group to find.

If implementation details are unspecified, choose a reasonable solution that preserves the established design intent rather than inventing a different visual language.
