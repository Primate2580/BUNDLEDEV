import type { Level, Track, TopicMeta } from "@/engine/types";

/**
 * The curriculum map. Every planned topic is listed here so the dashboard and
 * sidebar show the whole journey. A topic becomes playable when it gets a
 * `load` function (and `lessonCount`) pointing at its content file.
 *
 * To add content for a topic: write src/content/<track>/<topic>.ts, then add
 * `load: () => import("./<track>/<topic>")` to its entry below. No engine
 * changes needed.
 */

const t = (
  id: string,
  title: string,
  level: Level,
  summary: string,
  extra: Partial<TopicMeta> = {},
): TopicMeta => ({ id, title, level, summary, ...extra });

export const tracks: Track[] = [
  {
    id: "html",
    title: "HTML",
    tagline: "Structure and meaning: the skeleton of every page.",
    topics: [
      // Beginner
      t("document-structure", "Document structure", "beginner", "Doctype, head, body and how a page is put together.", {
        load: () => import("./html/document-structure"),
        lessonCount: 10,
      }),
      t("text-and-headings", "Text and headings", "beginner", "Headings, paragraphs, emphasis and quotes.", {
        prerequisites: ["document-structure"],
        load: () => import("./html/text-and-headings"),
        lessonCount: 23,
      }),
      t("links", "Links", "beginner", "Anchors, relative and absolute URLs, fragments.", {
        prerequisites: ["text-and-headings"],
        load: () => import("./html/links"),
        lessonCount: 23,
      }),
      t("images", "Images", "beginner", "img, alt text, sizing and formats.", {
        prerequisites: ["document-structure"],
        load: () => import("./html/images"),
        lessonCount: 23,
      }),
      t("lists", "Lists", "beginner", "Ordered, unordered and description lists.", {
        prerequisites: ["text-and-headings"],
        load: () => import("./html/lists"),
        lessonCount: 23,
      }),
      t("tables", "Tables", "beginner", "Rows, columns, headers and captions.", { prerequisites: ["lists"] }),
      t("basic-forms", "Basic forms", "beginner", "Inputs, labels and submitting data.", { prerequisites: ["text-and-headings"] }),
      // Intermediate
      t("semantic-layout", "Semantic layout", "intermediate", "header, nav, main, article, section, footer.", { prerequisites: ["text-and-headings", "links"] }),
      t("form-controls", "Form controls and validation", "intermediate", "Input types and built-in validation.", { prerequisites: ["basic-forms"] }),
      t("media-embeds", "Audio, video and embeds", "intermediate", "Media elements, tracks and iframes.", { prerequisites: ["images"] }),
      t("a11y-basics", "Accessibility basics", "intermediate", "Landmarks, alt text, labels, contrast.", { prerequisites: ["semantic-layout"] }),
      t("meta-seo", "Meta tags and SEO", "intermediate", "Title, description, Open Graph and social cards.", { prerequisites: ["document-structure"] }),
      // Advanced
      t("aria-focus", "ARIA and focus", "advanced", "Roles, states and managing keyboard focus.", { prerequisites: ["a11y-basics"] }),
      t("responsive-images", "Responsive images", "advanced", "picture, srcset and sizes.", { prerequisites: ["images"] }),
      t("dialog-popover", "Dialog, popover and details", "advanced", "Native interactive elements.", { prerequisites: ["semantic-layout"] }),
      t("html-performance", "Loading performance", "advanced", "Preload, lazy loading and render-blocking.", { prerequisites: ["responsive-images"] }),
      t("structured-data", "Structured data", "advanced", "JSON-LD and microdata.", { prerequisites: ["meta-seo"] }),
      // Pro
      t("custom-elements", "Custom elements", "pro", "Web components and Shadow DOM basics.", { prerequisites: ["dialog-popover"] }),
      t("a11y-audits", "Accessibility audits", "pro", "Testing with screen readers and tooling.", { prerequisites: ["aria-focus"] }),
      t("html-maintainability", "Maintainable HTML", "pro", "Naming, structure and long-lived markup.", { prerequisites: ["semantic-layout"] }),
    ],
  },
  {
    id: "css",
    title: "CSS",
    tagline: "Style, layout and motion, from selectors to subgrid.",
    topics: [
      // Beginner
      t("selectors", "Selectors", "beginner", "Element, class, id, attribute and combinators.", {
        load: () => import("./css/selectors"),
        lessonCount: 8,
      }),
      t("colors", "Colors", "beginner", "Named, hex, rgb, hsl and modern color spaces.", {
        prerequisites: ["selectors"],
        load: () => import("./css/colors"),
        lessonCount: 21,
      }),
      t("units", "Units", "beginner", "px, rem, em, %, vw, vh and when to use each.", {
        prerequisites: ["selectors"],
        load: () => import("./css/units"),
        lessonCount: 23,
      }),
      t("typography", "Typography", "beginner", "Fonts, size, weight, spacing and line length.", {
        prerequisites: ["units"],
        load: () => import("./css/typography"),
        lessonCount: 26,
      }),
      t("box-model", "Box model", "beginner", "Content, padding, border, margin and box-sizing.", {
        prerequisites: ["selectors"],
        load: () => import("./css/box-model"),
        lessonCount: 9,
      }),
      t("display", "Display", "beginner", "Block, inline, inline-block and none.", {
        prerequisites: ["box-model"],
        load: () => import("./css/display"),
        lessonCount: 9,
      }),
      t("backgrounds-borders", "Backgrounds and borders", "beginner", "Images, gradients, radius and shadows.", {
        prerequisites: ["colors", "box-model"],
        load: () => import("./css/backgrounds-borders"),
        lessonCount: 26,
      }),
      // Intermediate
      t("positioning", "Positioning", "intermediate", "static, relative, absolute, fixed and sticky.", {
        prerequisites: ["display", "box-model"],
        load: () => import("./css/positioning"),
        lessonCount: 25,
      }),
      t("flexbox", "Flexbox", "intermediate", "One-dimensional layout with axes and free space.", {
        prerequisites: ["display", "box-model"],
        load: () => import("./css/flexbox"),
        lessonCount: 12,
      }),
      t("grid", "Grid", "intermediate", "Two-dimensional layout with tracks and areas.", {
        prerequisites: ["display", "box-model"],
        load: () => import("./css/grid"),
        lessonCount: 9,
      }),
      t("media-queries", "Media queries", "intermediate", "Responsive breakpoints and user preferences.", {
        prerequisites: ["units"],
        load: () => import("./css/media-queries"),
        lessonCount: 23,
      }),
      t("pseudo-classes", "Pseudo-classes and pseudo-elements", "intermediate", ":hover, :focus, ::before and friends.", {
        prerequisites: ["selectors"],
        load: () => import("./css/pseudo-classes"),
        lessonCount: 24,
      }),
      t("transitions", "Transitions", "intermediate", "Animating between states.", {
        prerequisites: ["pseudo-classes"],
        load: () => import("./css/transitions"),
        lessonCount: 23,
      }),
      // Advanced
      t("cascade-specificity", "Cascade and specificity", "advanced", "Why a rule wins, and how to reason about it.", {
        prerequisites: ["selectors"],
        load: () => import("./css/cascade-specificity"),
        lessonCount: 22,
      }),
      t("stacking-context", "Stacking context", "advanced", "z-index and why it sometimes does nothing.", {
        prerequisites: ["positioning"],
        load: () => import("./css/stacking-context"),
        lessonCount: 22,
      }),
      t("transforms-animations", "Transforms and animations", "advanced", "translate, rotate, keyframes.", {
        prerequisites: ["transitions"],
        load: () => import("./css/transforms-animations"),
        lessonCount: 23,
      }),
      t("custom-properties", "Custom properties", "advanced", "Variables, scope and theming.", {
        prerequisites: ["colors"],
        load: () => import("./css/custom-properties"),
        lessonCount: 23,
      }),
      t("container-queries", "Container queries", "advanced", "Components that respond to their container.", { prerequisites: ["media-queries"] }),
      t("modern-selectors", "Modern selectors", "advanced", ":has(), :is(), :where() and nesting.", { prerequisites: ["pseudo-classes"] }),
      t("cascade-layers", "Cascade layers", "advanced", "@layer for predictable overrides.", { prerequisites: ["cascade-specificity"] }),
      // Pro
      t("subgrid", "Subgrid", "pro", "Aligning nested grids to a parent.", { prerequisites: ["grid"] }),
      t("scroll-effects", "Scroll snap and scroll-driven animation", "pro", "Scroll-based behavior without JavaScript.", { prerequisites: ["transforms-animations"] }),
      t("logical-properties", "Logical properties", "pro", "Layout that adapts to writing direction.", { prerequisites: ["box-model"] }),
      t("css-architecture", "CSS architecture", "pro", "BEM, utility-first, layers and scaling.", { prerequisites: ["cascade-layers"] }),
      t("css-debugging", "Debugging CSS", "pro", "A method for finding why styles misbehave.", { prerequisites: ["cascade-specificity"] }),
    ],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    tagline: "Utility-first styling, from first class to design system.",
    topics: [
      // Beginner
      t("utility-first", "The utility-first idea", "beginner", "Why classes replace separate stylesheets."),
      t("tw-setup", "Setup", "beginner", "Installing Tailwind v4 and how it builds.", { prerequisites: ["utility-first"] }),
      t("tw-spacing", "Spacing", "beginner", "Padding, margin and the spacing scale.", { prerequisites: ["utility-first"] }),
      t("tw-colors", "Colors", "beginner", "The palette, opacity and custom colors.", { prerequisites: ["utility-first"] }),
      t("tw-typography", "Typography", "beginner", "Font size, weight, leading and tracking.", { prerequisites: ["utility-first"] }),
      t("tw-sizing", "Sizing", "beginner", "Width, height, min and max.", { prerequisites: ["tw-spacing"] }),
      t("tw-borders-shadows", "Borders and shadows", "beginner", "Rounded corners, rings and depth.", { prerequisites: ["tw-colors"] }),
      // Intermediate
      t("tw-flex-grid", "Flex and grid utilities", "intermediate", "Layout with utilities.", { prerequisites: ["tw-spacing", "tw-sizing"] }),
      t("tw-variants", "State variants", "intermediate", "hover:, focus:, disabled: and more.", { prerequisites: ["utility-first"] }),
      t("tw-responsive", "Responsive design", "intermediate", "Mobile-first breakpoints.", { prerequisites: ["tw-variants"] }),
      t("tw-dark-mode", "Dark mode", "intermediate", "dark: variant and theme strategies.", { prerequisites: ["tw-variants"] }),
      // Advanced
      t("tw-arbitrary", "Arbitrary values", "advanced", "One-off values with square brackets.", { prerequisites: ["tw-spacing"] }),
      t("tw-theme", "Customizing with @theme", "advanced", "Design tokens in Tailwind v4.", { prerequisites: ["tw-colors"] }),
      t("tw-extraction", "@apply and extraction", "advanced", "Reusing styles without a mess.", { prerequisites: ["tw-variants"] }),
      t("tw-group-peer", "Group and peer", "advanced", "Styling based on related elements.", { prerequisites: ["tw-variants"] }),
      t("tw-animation", "Animation", "advanced", "Built-in and custom animations.", { prerequisites: ["tw-variants"] }),
      // Pro
      t("tw-plugins", "Plugins and custom utilities", "pro", "Extending Tailwind.", { prerequisites: ["tw-theme"] }),
      t("tw-design-systems", "Design systems", "pro", "Tokens, components and consistency at scale.", { prerequisites: ["tw-theme", "tw-extraction"] }),
      t("tw-performance", "Performance", "pro", "Build output and keeping CSS small.", { prerequisites: ["tw-setup"] }),
      t("tw-tradeoffs", "When not to use Tailwind", "pro", "Honest limits and alternatives.", { prerequisites: ["tw-extraction"] }),
    ],
  },
];

export const getTrack = (trackId: string): Track | undefined =>
  tracks.find((track) => track.id === trackId);

export const getTopic = (trackId: string, topicId: string): TopicMeta | undefined =>
  getTrack(trackId)?.topics.find((topic) => topic.id === topicId);

/** A topic is playable once its content has been written. */
export const isTopicReady = (topic: TopicMeta): boolean => typeof topic.load === "function";
