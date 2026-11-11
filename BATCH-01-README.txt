CSS Lab - content batch 1: CSS Colors (21 lessons)

Copy the contents of this zip over your project folder (src/ merges, 4 existing files are replaced):
  src/content/css/colors.ts                          NEW
  src/content/css/colors/workshops/build-a-pricing-card/   NEW (12 steps + workshop.generated.ts)
  src/content/index.ts                               REPLACED (colors now has load + lessonCount: 21)
  src/content/lesson-index.generated.ts              REPLACED (regenerated search index, 78 lessons)
  src/lib/explain/knowledge.ts                       REPLACED (adds colour/custom-property descriptions)

Then run:
  npm run build:content
  npm run test:content
  npm run typecheck   (or: npx tsc -b)
  npm run dev
