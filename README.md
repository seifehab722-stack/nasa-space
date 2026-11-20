# BEYOND RELICS

**BEYOND RELICS** is an educational scientific comic and interactive space exploration platform created for the **NASA Space Apps Challenge**. It follows **COSMO**, a fictional alien explorer, across the universe while pairing every story discovery with verified, sourced astronomy.

> **Important Note for the Team Before Submission:**  
> Please review and verify all scientific copy, sources, chapter titles, team member placeholders, and the challenge name (`[CHALLENGE NAME — to be added by the team]`) across `src/data/` before final submission.

---

## Running Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Project Structure

- `public/characters/cosmo/` — Drop COSMO's official uploaded character reference image here.
- `public/textures/earth/` — Optional NASA Blue Marble / Visible Earth 2K (desktop) and 1K (mobile) textures (`day-2k.jpg`, `night-2k.jpg`, `clouds-2k.png`, `bump-2k.jpg`, `specular-2k.jpg`).
- `public/comic/chapter-01/`, `chapter-02/`, ... — Comic covers and ordered page images (`page-001.webp`, `page-002.webp`, etc.).
- `public/science/` & `public/explore/` — Optional team-uploaded space imagery.
- `src/data/` — All comic chapters, science entries, explore topics, quizzes, badges, team members, and sources:
  - `src/data/comic.ts` — COSMO hero reference path + chapters & pages.
  - `src/data/science.ts` — *Science Behind the Story* entries.
  - `src/data/explore.ts` — Six *Explore the Universe* topics.
  - `src/data/quizzes.ts` — Chapter knowledge quizzes.
  - `src/data/badges.ts` — Achievement badge definitions.
  - `src/data/about.ts` — Team members, challenge name, official sources, image credits, and contact details.
- `src/store/progressStore.tsx` — Local-only `localStorage` persistence (`beyond_relics_progress_v1`) with `try/catch` safety.

---

## How to Replace Placeholder Images

1. **COSMO Character Portrait (Home Hero):**
   - Place the official image file inside `public/characters/cosmo/` (e.g., `cosmo-hero.webp`).
   - Open `src/data/comic.ts` and set `COSMO_HERO_ASSET.imagePath = '/characters/cosmo/cosmo-hero.webp'`.
   - The reserved hero frame preserves layout and aspect ratio automatically.

2. **Comic Pages & Covers:**
   - Drop your finished comic pages into `/public/comic/chapter-01/` (for example, `page-001.webp`, `page-002.webp`) and `cover.webp`.
   - Update the matching `imagePath` / `coverImage` fields in `src/data/comic.ts`.
   - The reader automatically reads each page's natural dimensions and preserves aspect ratio without cropping or distortion.

---

## How to Add New Comic Pages or Chapters (No Component Changes Required)

1. **Add Pages to an Existing Chapter:**
   - Place the new image file in `/public/comic/chapter-01/` (e.g., `page-007.webp`).
   - Open `src/data/comic.ts` and append a new object to that chapter's `pages` array with `pageNumber`, `imagePath`, `alt`, and optional `scienceLinks` (`entrySlug`, `label`, `summary`, and optional `markerX` / `markerY` percentages).

2. **Add a New Chapter:**
   - Create a folder such as `/public/comic/chapter-03/` with `cover.webp` and `page-001.webp`, etc.
   - Add a new `ComicChapter` entry (or convert the existing `chapter-03` coming-soon entry by removing `isComingSoon: true`) in `src/data/comic.ts`.
   - Optionally add a matching quiz in `src/data/quizzes.ts` and linked science entries in `src/data/science.ts`.

---

## Updating Science Entries, Quizzes, Team, and Sources

- **Science Entries (`src/data/science.ts`):** Keep `storyMoment` (fiction) and `realScience` (fact) clearly separated. Every entry, *Did You Know?* box, and Explore topic must include verified `sources`.
- **Quizzes (`src/data/quizzes.ts`):** Add or update questions linked to `relatedScienceSlug`.
- **Team, Challenge Name, Contact & Sources (`src/data/about.ts`):** Replace `[TEAM MEMBER NAME]`, `[ROLE]`, and `[CHALLENGE NAME — to be added by the team]`. Fill in `PROJECT_CONTACT` fields only when real email/links are ready (empty strings stay hidden).
