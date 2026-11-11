import type { TopicContent } from "@/engine/types";
import illustrateATrailGuide from "./images/workshops/illustrate-a-trail-guide/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "the-img-element",
          kind: "learn",
          title: "The img element",
          summary: "Putting a picture on a page with src and alt, and what happens when the file is missing.",
          minutes: 8,
          concept: {
            description: "The `img` element puts a picture on the page. It has no closing tag and no content, because everything it needs is in its attributes. The `src` attribute says which file to show, and the `alt` attribute gives a written description for anyone who cannot see the picture.",
            why: "Pictures carry information that words alone may not, but a picture is only useful to people who can see it, and only while it loads. The `alt` text is what everyone else gets, including people with screen readers, people on slow connections, and search engines. Writing it from the very first image is a habit worth building.",
            mentalModel: "Picture a framed photo on a wall with a small card beside it. The photo is the `src`, and the card is the `alt`. If the photo is taken down, or a visitor cannot see it, the card still tells them what was there.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's add an image. Open the example in the Playground. The file `ridge.jpg` does not exist there, so the browser cannot load it, and you will see the alt text in its place. That is a fair preview of what a screen reader would announce.",
            },
            {
              type: "code",
              language: "html",
              code: "<img src=\"images/ridge.jpg\" alt=\"Hikers on the Ridge Trail at sunrise\">",
            },
            {
              type: "paragraph",
              text: "The element is a single tag. It starts with `img`, and then it has two attributes. The `src` value is a path, written just as in a link, so `images/ridge.jpg` means a file called `ridge.jpg` in a folder called `images` next to the page. The `alt` value is a short sentence about what the picture shows. Both attributes are needed, and a page with an image that has no `alt` is incomplete.",
            },
            {
              type: "paragraph",
              text: "An image is an inline element, which means it sits in a line of text like a very large letter. If you put one inside a paragraph, the words wrap around its position, and if you put it on its own, it sits on a line by itself. You will learn how to control its size and placement in a moment, and with CSS later on.",
            },
            {
              type: "paragraph",
              text: "Now see what happens when things go wrong. Open the next example, where the first image has a path that leads nowhere, and the second has no `alt` at all.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/missing.jpg" alt="A map of the Ridge Trail">
    <img src="images/missing.jpg">`,
            },
            {
              type: "paragraph",
              text: "The first image shows its alt text, and the second shows only a broken-picture icon. A screen reader user hears the alt text of the first one, but for the second, many screen readers read out the file name, which might be something unhelpful like `IMG_2034.jpg`. That is the reason `alt` is always present, even when the value is empty, as you will see shortly.",
            },
            {
              type: "paragraph",
              text: "Two small notes before you move on. First, the `img` element is a void element, so there is no `</img>`, and some people write `<img ... />` with a slash, which is allowed but not required. Second, the browser starts downloading the file as soon as it reads the tag, so a picture's size matters, which you will return to in the lessons on file size and loading.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "writing-alt-text",
          kind: "learn",
          title: "Writing alt text",
          summary: "How to describe a picture so that the words do the same job as the image.",
          minutes: 8,
          concept: {
            description: "**Alt text** is a short written replacement for an image. It should do the same job for the reader that the picture does for a sighted person: it tells them what matters about the image in the place where it appears. It is read aloud by screen readers, and shown if the image cannot load.",
            why: "For many visitors the alt text is the image. A good description makes the page work for a person who is blind, for someone on a poor connection, and for a search engine trying to understand the page. A poor one, or none at all, leaves a hole in the page.",
            mentalModel: "Imagine describing a photo to a friend over the phone. You would not read out every detail. You would say the one or two things that matter for what you are talking about, and you would stop.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's compare two descriptions of the same photo. Open the example in the Playground and read both alt texts aloud.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/ridge.jpg" alt="Photo">
    <img src="images/ridge.jpg" alt="Two hikers walk along a grassy ridge at sunrise, with mist in the valley below">`,
            },
            {
              type: "paragraph",
              text: "The first alt text, `Photo`, says nothing the reader could not guess from the fact that there is an image. The second tells them who is in it, what they are doing, and the mood of the scene. As a rule of thumb, ask what you would want to know if you could not see the picture, and write that, in a sentence or two.",
            },
            {
              type: "paragraph",
              text: "A few habits make alt text better. Keep it short, because very long descriptions are tiring to listen to, and a sentence of around ten or twenty words is usually plenty. Do not begin with \"image of\" or \"picture of\", because the screen reader already announces that it is an image. And do not repeat words that are already in the text next to the image, because the listener would hear everything twice.",
            },
            {
              type: "paragraph",
              text: "Write alt text as plain language, with normal punctuation, and without keywords stuffed in for search engines. Search engines do read it, but they are good at spotting nonsense, and a description written for people also works best for them. If the image contains words, such as a sign, the alt text should include those words.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- Avoid -->
    <img src="images/sign.jpg" alt="image of a picture of a sign photo trail hiking park">
    
    <!-- Better -->
    <img src="images/sign.jpg" alt="Trail sign: Ridge Trail, 7 km, closed after dark">`,
            },
            {
              type: "paragraph",
              text: "The first example is a stack of filler words and keywords, and it tells the listener nothing. The second says what the sign says, which is the information the picture carries. If you are ever unsure, read the page aloud with the image replaced by its alt text, and see whether it still makes sense.",
            },
            {
              type: "paragraph",
              text: "Alt text is not a place for opinions or marketing, and it is not a caption. A caption is for everybody and sits beside the picture, while alt text stands in for the picture itself. The lesson on figures shows how the two work together, and the lesson on context shows why the same image may need a different description on a different page.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-broken-image",
          kind: "predict",
          title: "Predict the broken images",
          summary: "Four images whose files do not exist. Work out what each one shows, and what a screen reader would say.",
          minutes: 7,
          mode: "html",
          intro: "None of these four files exists, so every image fails to load. That makes a good test of the alt attribute. Decide what each one will show and say, then run the code.",
          code: {
            html: `<img src="images/a.jpg" alt="Hikers at sunrise" width="240" height="60">
    <img src="images/b.jpg" alt="" width="240" height="60">
    <img src="images/c.jpg" width="240" height="60">
    <a href="index.html"><img src="images/logo.png" alt="Ridge Park home page" width="240" height="60"></a>`,
            css: "",
          },
          questions: [
            {
              prompt: "The first image fails to load. What do people see and hear in its place?",
              options: ["Nothing at all", "Its alt text, `Hikers at sunrise`", "The file name `a.jpg`", "An error message from the page"],
              answerIndex: 1,
              hint: "The alt text exists for exactly this moment.",
              explanation: "When an image cannot load, the browser shows its alt text instead, and a screen reader reads the same words.",
              proves: [
                {
                  type: "attribute",
                  selector: "img[src=\"images/a.jpg\"]",
                  attribute: "alt",
                  message: "The first image has descriptive alt text.",
                  expected: "Hikers at sunrise",
                },
              ],
            },
            {
              prompt: "The second image has `alt=\"\"`. What happens for a screen reader user?",
              options: ["It skips the image completely", "It reads the file name", "It reads the word `image`", "It reads the whole `src`"],
              answerIndex: 0,
              hint: "An empty alt says the image is decoration.",
              explanation: "An empty `alt` marks the image as decorative, so assistive tools skip it. That is right for a flourish and wrong for a real photo.",
              proves: [
                {
                  type: "exists",
                  selector: "img[alt=\"\"]",
                  message: "One image has an empty alt.",
                },
              ],
            },
            {
              prompt: "The third image has no `alt` attribute at all. What is the risk?",
              options: [
                "None, browsers fill it in",
                "The page will not display",
                "The image loads twice",
                "Some screen readers read out the file name, which is unhelpful",
              ],
              answerIndex: 3,
              hint: "Compare it with the empty alt in the second image.",
              explanation: "Without the attribute, a screen reader has nothing to go on and may announce the file name. An empty alt is different, because it says the omission is deliberate.",
              proves: [
                {
                  type: "count",
                  selector: "img:not([alt])",
                  message: "Exactly one image has no `alt`.",
                  min: 1,
                  max: 1,
                },
              ],
            },
            {
              prompt: "The fourth image is the only thing inside a link to `index.html`. What does a screen reader announce as the link?",
              options: [
                "`logo.png`",
                "`index.html`",
                "`Ridge Park home page`, from the image's alt",
                "Nothing",
              ],
              answerIndex: 2,
              hint: "When an image is the only content of a link, what becomes the link text?",
              explanation: "The alt text of an image inside a link becomes the link's text, so it should say where the link goes.",
              proves: [
                {
                  type: "exists",
                  selector: "a[href=\"index.html\"] > img[alt=\"Ridge Park home page\"]",
                  message: "The linked image has alt text that names the destination.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "decorative-functional-and-complex-images",
          kind: "learn",
          title: "Decorative, functional and complex images",
          summary: "The kinds of image that need an empty alt, an action in the alt, or a longer description.",
          minutes: 8,
          concept: {
            description: "Not every image needs a sentence. A **decorative** image adds nothing to the content and gets an empty alt. A **functional** image acts as a link or button, so its alt says what happens. A **complex** image, such as a chart, needs a short alt and a longer description nearby.",
            why: "If you describe every flourish on a page, a screen reader user wades through noise. If you skip the alt on a chart, they miss the point of a section. Telling the three apart is the heart of writing alt text well.",
            mentalModel: "Think of a printed leaflet read aloud to someone. You would skip the border pattern, read out the label on a button, and explain a chart in a few sentences of its own.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with decoration. Open the example in the Playground, where a divider line sits between two paragraphs.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Welcome to the park.</p>
    <img src="images/divider.png" alt="">
    <p>Now the trail rules.</p>`,
            },
            {
              type: "paragraph",
              text: "The attribute is present, but its value is empty. That tells a screen reader to skip the image completely, which is exactly right for a flourish. It is very different from leaving `alt` out, because without the attribute, the reader may announce the file name. If an image is purely for looks, you can also draw it with CSS, which keeps it out of your HTML altogether.",
            },
            {
              type: "paragraph",
              text: "Functional images do a job. When an image is the only thing inside a link, its alt text becomes the link text, so describe the destination or action, and not the picture. A magnifying glass in a search button should say `Search`, not `Magnifying glass`.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="index.html">
      <img src="images/logo.png" alt="Ridge Park home page">
    </a>`,
            },
            {
              type: "paragraph",
              text: "Complex images, such as charts, maps and diagrams, hold more information than a sentence can. Give them a short alt that names what the image is, and put the full detail in the page, close to the image, where everybody can read it. A table next to a chart is a good choice, because it serves everyone, not just people who cannot see the picture. Do not try to cram a whole chart into the alt attribute, because it is hard to read and cannot be navigated.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/weather.png" alt="Bar chart of average monthly rainfall, described below">
    <p>Rainfall is lowest in July, at 40 mm, and highest in December, at 120 mm.</p>`,
            },
            {
              type: "paragraph",
              text: "One last category is the image of text, such as a banner with words baked into the picture. Avoid it when you can, because text in an image cannot be resized, searched or translated, and it often looks blurry on some screens. If you must use one, the alt text should repeat the words exactly, so nothing is lost.",
            },
            {
              type: "paragraph",
              text: "To decide quickly, ask what the image is for. If it is just for looks, use an empty alt. If it does something when selected, describe the action. If it carries information, describe it, in a short alt if you can, and in the page if you cannot. Run through your images one at a time with that question, and the right choice is almost always clear.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-vague-alts",
          kind: "debug",
          title: "Debug: the vague alts",
          mode: "html",
          summary: "Four images, four alt problems: a useless word, a file name, a missing attribute and a description of pure decoration.",
          minutes: 8,
          broken: {
            html: `<h1>Ridge Trail</h1>
    <img class="photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="225" alt="image">
    <img class="sign" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23f59e0b'/%3E%3C/svg%3E" width="160" height="100" alt="IMG_2034.jpg">
    <img class="map" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%234ade80'/%3E%3C/svg%3E" width="300" height="200">
    <img class="divider" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='12'%3E%3Crect width='400' height='12' fill='%23a78bfa'/%3E%3C/svg%3E" width="400" height="12" alt="Picture of a picture of the divider line">`,
            css: "",
          },
          challenge: {
            title: "Fix every alt",
            description: "This guide has four images with four different alt problems. Describe the photo and the sign properly, in your own words. The map has no alt at all, so add one. The divider is decoration, so its alt should be empty. Do not change anything else.",
            hints: [
              "Read each alt aloud. Which ones tell you nothing, which is a file name, which is missing, and which is describing a flourish?",
              "The map needs the attribute added, and the divider needs its value emptied.",
              "`alt=\"\"` on the divider, and a short real description on the other three.",
            ],
            checks: [
              {
                type: "a11y",
                rule: "img-alt",
                message: "Every image has an `alt` attribute",
              },
              {
                type: "count",
                selector: "img[alt=\"image\"]",
                message: "Nobody uses the word `image` as a description",
                max: 0,
              },
              {
                type: "count",
                selector: "img[alt$=\".jpg\"]",
                message: "...and no alt is a file name",
                max: 0,
              },
              {
                type: "exists",
                selector: "img.photo[alt]:not([alt=\"\"]), img.sign[alt]:not([alt=\"\"])",
                message: "...the photo and the sign have real descriptions",
              },
              {
                type: "attribute",
                selector: "img.divider",
                attribute: "alt",
                message: "...and the divider's alt is empty.",
                expected: "",
              },
            ],
            solution: {
              html: `<h1>Ridge Trail</h1>
    <img class="photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="225" alt="Hikers on a grassy ridge at sunrise">
    <img class="sign" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23f59e0b'/%3E%3C/svg%3E" width="160" height="100" alt="Trail sign: Ridge Trail, 7 km">
    <img class="map" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%234ade80'/%3E%3C/svg%3E" width="300" height="200" alt="Map of the Ridge Trail loop">
    <img class="divider" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='12'%3E%3Crect width='400' height='12' fill='%23a78bfa'/%3E%3C/svg%3E" width="400" height="12" alt="">`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-describe-the-images",
          kind: "lab",
          title: "Lab: describe the images",
          mode: "html",
          summary: "Three images, three jobs. Give a photo a real description, a divider an empty alt, and a linked logo an alt that names where it goes.",
          minutes: 9,
          starter: {
            html: `<h1>Ridge Trail guide</h1>
    <img class="photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="225">
    <p>Welcome to the Ridge Trail.</p>
    <img class="divider" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='12'%3E%3Crect width='400' height='12' fill='%23f59e0b'/%3E%3C/svg%3E" width="400" height="12">
    <p>Choose a route below.</p>
    <a href="index.html"><img class="logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40'%3E%3Crect width='120' height='40' fill='%234ade80'/%3E%3C/svg%3E" width="120" height="40"></a>`,
            css: "",
          },
          challenge: {
            title: "Choose the right alt for each image",
            description: "None of these images has an `alt` yet. Describe the photo, in your own words, so that someone who cannot see it gets the picture. The divider is only decoration, so give it an empty alt. The logo is the only thing in a link, so its alt should be `Ridge Park home page`.",
            hints: [
              "Three `alt` attributes, one per image, each with a different kind of value.",
              "The photo's alt must not be empty. The divider's alt must be empty, written as `alt=\"\"`.",
              "`alt=\"Two hikers walk along a grassy ridge at sunrise\"`, `alt=\"\"` and `alt=\"Ridge Park home page\"`",
            ],
            checks: [
              {
                type: "a11y",
                rule: "img-alt",
                message: "Every image has an `alt` attribute",
              },
              {
                type: "exists",
                selector: "img.photo[alt]:not([alt=\"\"])",
                message: "The photo has a real description",
              },
              {
                type: "attribute",
                selector: "img.divider",
                attribute: "alt",
                message: "...the decorative divider has an empty alt",
                expected: "",
              },
              {
                type: "attribute",
                selector: "img.logo",
                attribute: "alt",
                message: "...and the linked logo says where it goes.",
                expected: "Ridge Park home page",
              },
            ],
            solution: {
              html: `<h1>Ridge Trail guide</h1>
    <img class="photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="225" alt="Two hikers walk along a grassy ridge at sunrise">
    <p>Welcome to the Ridge Trail.</p>
    <img class="divider" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='12'%3E%3Crect width='400' height='12' fill='%23f59e0b'/%3E%3C/svg%3E" width="400" height="12" alt="">
    <p>Choose a route below.</p>
    <a href="index.html"><img class="logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40'%3E%3Crect width='120' height='40' fill='%234ade80'/%3E%3C/svg%3E" width="120" height="40" alt="Ridge Park home page"></a>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "width-height-and-layout-shift",
          kind: "learn",
          title: "Width, height and layout shift",
          summary: "Why every image should say how big it is, and how to keep it from overflowing.",
          minutes: 8,
          concept: {
            description: "The `width` and `height` attributes tell the browser how big an image is, in pixels, before it downloads the file. With them, the browser can leave exactly the right amount of room, so the text below does not jump when the picture arrives. That jump is called **layout shift**.",
            why: "A page that moves as it loads is annoying, and it can make you tap the wrong link. Search engines measure it as part of page quality. Two small attributes on every image prevent the problem, and they cost nothing.",
            mentalModel: "Imagine a theatre where the seats are put out before the audience arrives. If the rows are marked in advance, nobody has to move when the show begins. The attributes mark the rows.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at how the size is written.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/ridge.jpg"
         alt="Hikers on the Ridge Trail at sunrise"
         width="800" height="450">`,
            },
            {
              type: "paragraph",
              text: "The numbers are pixels, written without a unit. They should match the real dimensions of the file, or at least its shape, because the browser uses them to work out the aspect ratio, which is 800 to 450 here. Before the file arrives, it reserves a box of that shape, and when the picture loads, nothing around it moves.",
            },
            {
              type: "paragraph",
              text: "You may wonder what happens when the screen is narrower than 800 pixels. Without more help, the picture would overflow and force a sideways scroll. The usual fix is a little CSS that you will see again in the layout topics: `max-width: 100%` stops the image from growing wider than its container, and `height: auto` lets the height follow the shape.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      img { max-width: 100%; height: auto; }
    </style>
    <img src="images/ridge.jpg" alt="Hikers on the Ridge Trail at sunrise"
         width="800" height="450">`,
            },
            {
              type: "paragraph",
              text: "Both parts of that rule matter. If you set only `max-width: 100%`, the height attribute of 450 stays fixed, and a narrower image would be squashed. With `height: auto`, the browser keeps the ratio from the attributes, so the picture shrinks smoothly, and the reserved space shrinks with it.",
            },
            {
              type: "paragraph",
              text: "There is a second benefit. Because the browser knows the shape before the file arrives, it can also keep the space correct for images that load lazily, which you will meet shortly. Reserving room is the single most useful thing you can do for how stable a page feels.",
            },
            {
              type: "paragraph",
              text: "Do not use the attributes to resize an image to something very different from its real size. Setting `width=\"100\"` on a 4000 pixel photo shrinks how it looks, but the visitor still downloads the whole file. Resize the file itself first, a topic for the lesson on file size.",
            },
            {
              type: "paragraph",
              text: "A good rule is simple: every `img` gets an `alt`, a `width` and a `height`. Add the two numbers by looking at the file's properties in your folder. If you ever see text jump as your page loads, an image without dimensions is the first place to look. Make it part of the routine of adding any picture, in the same breath as the file path.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "image-sizing-explorer",
          kind: "visualizer",
          title: "Image sizing explorer",
          summary: "A wide picture in a narrow column. Change its max-width and height to see it overflow, squash or fit.",
          minutes: 8,
          concept: {
            description: "An 800 pixel wide picture sits in a column that is only 280 pixels wide. The dashed border is the column. Controls change the image's `max-width` and `height`, and you can see it spill out of the column, get squashed out of shape, or shrink neatly to fit.",
            why: "Almost every responsive page needs the same two declarations on its images, and they are easy to get half right. Watching what happens with only one of them makes it clear why both are needed, and why the height attribute alone is not enough.",
            mentalModel: "Picture a photo pushed into a frame that is too small. If the frame is a hard edge, the photo hangs out. If you squeeze the sides but not the top, it distorts. Shrinking both together keeps the picture's shape.",
          },
          stage: {
            html: `<div class="column">
      <img class="photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%2338bdf8'/%3E%3C/svg%3E" width="800" height="450" alt="A sample landscape">
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .column { width: 280px; margin: 16px; border: 2px dashed #64748b; }
    .photo { display: block; }`,
            annotate: "none",
            target: ".column",
            items: ".column",
            itemCount: 1,
          },
          starter: `.photo {
      max-width: none;
      height: 120px;
    }
    `,
          controls: [
            {
              id: "maxw",
              label: "max-width",
              selector: ".photo",
              property: "max-width",
              fallback: "none",
              type: "options",
              options: ["none", "100%"],
              help: "100% stops the image growing wider than its column.",
            },
            {
              id: "height",
              label: "height",
              selector: ".photo",
              property: "height",
              fallback: "auto",
              type: "options",
              options: ["auto", "120px", "300px"],
              help: "auto keeps the picture's shape. A fixed height squashes it.",
            },
          ],
          presets: [
            {
              id: "overflow",
              label: "Overflowing",
              description: "no limit, natural height",
              css: ".photo { max-width: none; height: auto; }",
            },
            {
              id: "squashed",
              label: "Squashed",
              description: "limited width, fixed height",
              css: ".photo { max-width: 100%; height: 120px; }",
            },
            {
              id: "fluid",
              label: "Fluid",
              description: "limited width, height auto",
              css: ".photo { max-width: 100%; height: auto; }",
            },
          ],
          challenge: {
            title: "Make the image fit its column",
            description: "Make the picture shrink to fit its column without changing shape: its `max-width` should be `100%` and its `height` should be `auto`.",
            hints: [
              "Two declarations in the `.photo` rule.",
              "`max-width` is the one that stops the overflow, and `height: auto` keeps the shape.",
              "`.photo { max-width: 100%; height: auto; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".photo",
                property: "max-width",
                expected: ["100%"],
                message: "The picture never grows wider than its column",
              },
              {
                type: "computedStyle",
                selector: ".photo",
                property: "height",
                expected: ["auto", "157.5px"],
                message: "...and its height follows its width, so the shape is kept.",
              },
            ],
            solution: `.photo {
      max-width: 100%;
      height: auto;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-image-size",
          kind: "predict",
          title: "Predict the image sizes",
          summary: "Four copies of the same 400 by 300 picture in a 200 pixel box, each with different CSS. Work out how big each one is drawn.",
          minutes: 8,
          mode: "html",
          intro: "All four images have `width=\"400\"` and `height=\"300\"` attributes, and the box around them is 200 pixels wide. Read the CSS for each class, decide the size it will be drawn at, then run the code and measure.",
          code: {
            html: `<div class="box">
      <img class="a" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="300" alt="Sample A">
      <img class="b" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="300" alt="Sample B">
      <img class="c" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="300" alt="Sample C">
      <img class="d" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2338bdf8'/%3E%3C/svg%3E" width="400" height="300" alt="Sample D">
    </div>`,
            css: `.box { width: 200px; border: 2px solid #38bdf8; }
    img { display: block; margin-bottom: 8px; }
    .b { max-width: 100%; height: auto; }
    .c { max-width: 100%; }
    .d { width: 50%; height: auto; }`,
          },
          questions: [
            {
              prompt: "Image A has no CSS beyond `display: block`. How wide is it drawn?",
              options: ["200px, because the box limits it", "400px, so it spills out of the box", "300px", "100px"],
              answerIndex: 1,
              hint: "Does a box with a fixed width shrink an image inside it by itself?",
              explanation: "Without a rule that limits it, the image keeps the width from its attribute, 400 pixels, and overflows the 200 pixel box.",
              proves: [
                {
                  type: "count",
                  selector: "img[width=\"400\"][height=\"300\"]",
                  message: "All four images carry the same size attributes.",
                  min: 4,
                  max: 4,
                },
              ],
            },
            {
              prompt: "Image B has `max-width: 100%; height: auto`. What size is it drawn at?",
              options: ["400 by 300", "200 by 300", "200 by 150", "200 by 200"],
              answerIndex: 2,
              hint: "The width is limited to the box. What happens to the height when it is auto?",
              explanation: "The width shrinks to 200, and `height: auto` lets the height follow the 4 to 3 shape from the attributes, so it is 150.",
              proves: [
                {
                  type: "exists",
                  selector: "img.b",
                  message: "Image B exists, with the fluid rule.",
                },
              ],
            },
            {
              prompt: "Image C has only `max-width: 100%`. What size is it drawn at?",
              options: ["200 by 300, squashed out of shape", "200 by 150, the same as B", "400 by 300", "100 by 75"],
              answerIndex: 0,
              hint: "What still holds the height at 300?",
              explanation: "The width is limited to 200, but the `height` attribute still says 300, so the picture is drawn 200 wide and 300 tall, and its shape is distorted. This is why `height: auto` matters.",
              proves: [
                {
                  type: "exists",
                  selector: "img.c",
                  message: "Image C exists, with only `max-width`.",
                },
              ],
            },
            {
              prompt: "Image D has `width: 50%; height: auto`. How wide is it drawn?",
              options: ["50 pixels", "400 pixels", "200 pixels", "100 pixels"],
              answerIndex: 3,
              hint: "Half of what? Think about the box.",
              explanation: "A percentage width is a share of the container, so 50 per cent of the 200 pixel box is 100 pixels, and `height: auto` gives 75.",
              proves: [
                {
                  type: "exists",
                  selector: "img.d",
                  message: "Image D exists, with a percentage width.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "image-formats",
          kind: "learn",
          title: "Image file formats",
          summary: "JPEG, PNG, GIF, SVG, WebP and AVIF: what each is for.",
          minutes: 8,
          concept: {
            description: "An image **format** is the way a picture is stored in a file. Each one has strengths. Some compress photographs well, some keep sharp edges and transparency, and some are drawings made of shapes and not of pixels. Choosing the right one makes pages smaller and pictures cleaner.",
            why: "The format you choose changes how big the file is, how it looks, and whether it can be transparent. A photo saved in the wrong format can be several times larger than it needs to be, and a logo saved as a photo format can look smudged.",
            mentalModel: "Think of choosing a container. A paper bag is fine for a loaf of bread, a rigid box suits a cake, and neither is right for soup. Each image has a container that fits it best.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at the file extensions. Each one is a different format.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/ridge.jpg" alt="A mountain ridge at sunrise" width="400" height="225">
    <img src="images/logo.svg" alt="Ridge Park logo" width="120" height="120">
    <img src="images/chart.png" alt="Rainfall by month" width="400" height="225">`,
            },
            {
              type: "paragraph",
              text: "JPEG, with the extension `.jpg`, is the classic format for photographs. It makes small files by throwing away detail the eye barely notices, but it does not support transparency, and text or sharp lines can look fuzzy. PNG, with `.png`, keeps every pixel exactly, supports transparency, and suits screenshots, diagrams and images with flat colours, though photographs saved as PNG are very large.",
            },
            {
              type: "paragraph",
              text: "SVG, with `.svg`, is different in kind. It describes a picture as shapes and curves, not pixels, so it stays perfectly sharp at any size, and the files are tiny. That makes it ideal for logos, icons and simple illustrations. It is not suited to photographs.",
            },
            {
              type: "paragraph",
              text: "GIF is an older format limited to 256 colours. It is still used for short animations, but the files are large and the quality is poor, so a short video is almost always a better choice today. If you are choosing a format for a new image, you will rarely pick GIF.",
            },
            {
              type: "paragraph",
              text: "Animation deserves a note. If you want a looping picture, an animated WebP or a short muted video file is much smaller than a GIF and looks better. The video element appears in a later topic, so for now remember that the right answer is rarely a GIF.",
            },
            {
              type: "paragraph",
              text: "Two newer formats are worth knowing. WebP, with `.webp`, handles photographs and graphics, supports transparency, and usually makes smaller files than JPEG or PNG. AVIF, with `.avif`, compresses even better. Both are supported by all current major browsers, so you can use them directly, and later you will learn how to offer them with a fallback.",
            },
            {
              type: "paragraph",
              text: "A simple way to choose: photographs go in WebP, AVIF or JPEG; logos, icons and simple drawings go in SVG; screenshots and images that need transparency go in PNG or WebP. Whichever you pick, keep the file as small as you can without ruining the picture, which is the subject of the next lesson.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "file-size-and-compression",
          kind: "learn",
          title: "File size and compression",
          summary: "Resizing and compressing images so a page loads quickly, without making pictures look poor.",
          minutes: 8,
          concept: {
            description: "A picture's **file size** is how many bytes the visitor must download. It depends on the pixel dimensions, the format and the **compression**, which is how hard the picture is squeezed. Resizing to the right dimensions and compressing sensibly are the two biggest steps you can take.",
            why: "Images are usually the heaviest part of a page. A single phone photo can be several megabytes, and a visitor on a mobile connection may wait a long time for it, or give up. Small, well-prepared images make a page feel fast, and they save visitors' data.",
            mentalModel: "Imagine posting a parcel. A package you could fit in an envelope should not go in a crate. The same is true of a picture shown at a small size: send only as many pixels as the page actually needs.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with dimensions. Open the example in the Playground and compare what is typed with what is shown.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- The file is 4000 pixels wide, but it is shown at 400 -->
    <img src="images/big-photo.jpg" alt="Lake at dawn" width="400" height="267">`,
            },
            {
              type: "paragraph",
              text: "The browser shrinks the picture on screen, but it still downloads all 4000 pixels, so the visitor pays for ten times more data than they can see. The fix is to resize the file itself before you put it on the site, using any image editor, or a free tool in your browser. Then the downloaded file matches how big the picture is displayed.",
            },
            {
              type: "paragraph",
              text: "A useful rule is to make the file about twice as wide as it is shown, because many phones and laptops have screens with twice as many pixels as the layout uses, and they show a sharper picture from a bigger file. So an image displayed at 400 pixels wide would be saved at around 800. More than that is wasted, and less can look soft on sharp screens.",
            },
            {
              type: "paragraph",
              text: "Then comes compression. JPEG and WebP let you choose a quality level, and a setting between 70 and 85 per cent usually looks the same to the eye as the original while making the file far smaller. Try a few settings and compare. When you can see no difference, take the smaller file. Photographs can be compressed far harder than screenshots or diagrams, which show flaws much sooner.",
            },
            {
              type: "paragraph",
              text: "It helps to have a rough budget in mind. A hero photo at the top of a page should usually be a few hundred kilobytes at most, and small thumbnails a few tens of kilobytes. If a single image is over a megabyte, ask whether it can be smaller.",
            },
            {
              type: "paragraph",
              text: "Finally, remember that the visitor may not see every image, so do not load pictures you do not need. A decorative texture that could be a few lines of CSS does not need to be a photograph. Fewer, smaller, well-chosen images beat many heavy ones every time. Test with a throttled connection in your browser's developer tools, which shows what a visitor on a slow phone sees.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "image-paths-and-file-names",
          kind: "learn",
          title: "Image paths and file names",
          summary: "Where to keep your images, how to name them, and why a missing picture is usually a path problem.",
          minutes: 8,
          concept: {
            description: "The `src` of an image is a **path** to a file, and it follows the same rules as the `href` of a link. A relative path starts from the folder that holds the page, and an absolute path is a full web address. Most broken images are mistakes in the path or the file name.",
            why: "A missing picture is among the most common problems on a new site, and it nearly always has a simple cause: a wrong folder, a wrong capital letter or a mistyped extension. Good habits in naming and organising files prevent most of them.",
            mentalModel: "Picture a library with a clear shelving scheme. If every book has a sensible label and sits in the right section, nobody has to hunt. Your images are the same, and the path is the shelf mark.",
          },
          body: [
            {
              type: "paragraph",
              text: "Imagine a site with this layout, and look at how the paths change from one page to the next.",
            },
            {
              type: "code",
              language: "html",
              code: `site/
      index.html
      walks/
        ridge.html
      images/
        ridge.jpg
        logo.svg`,
            },
            {
              type: "paragraph",
              text: "On `index.html`, the picture is in a folder next to the page, so the path is `images/ridge.jpg`. On `walks/ridge.html`, it is one folder up and then down, so the path is `../images/ridge.jpg`. The same file needs a different path on each page, because the path always starts from the page that uses it.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- on index.html -->
    <img src="images/ridge.jpg" alt="Ridge at sunrise" width="400" height="225">
    
    <!-- on walks/ridge.html -->
    <img src="../images/ridge.jpg" alt="Ridge at sunrise" width="400" height="225">`,
            },
            {
              type: "paragraph",
              text: "File names deserve some care. Use lowercase, use hyphens instead of spaces, and keep the extension in lowercase too, as in `mill-creek-bridge.jpg`. Many web servers treat `Ridge.JPG` and `ridge.jpg` as different files, so a name that works on your own computer can fail once the site goes live. A name that says what the picture shows, such as `ridge-sunrise.jpg`, is also better than `IMG_2034.jpg` for you and for search engines.",
            },
            {
              type: "paragraph",
              text: "You can also point `src` at an absolute address, such as `https://example.com/photos/ridge.jpg`, but be careful. If the picture belongs to somebody else, they may move it, or block it, or object to the use, and your page then shows a gap. Whenever you can, keep a copy of your own images on your own site.",
            },
            {
              type: "paragraph",
              text: "When a picture does not appear, work through the usual causes in order. Is the folder name right? Is the file name spelled the same, in the same case? Is the extension correct? Did you count the folders properly in a relative path? The browser's developer tools list a failed request in red, with the exact address it tried, which makes the mistake easy to spot.",
            },
            {
              type: "paragraph",
              text: "Keep all your pictures in one folder, such as `images`, rather than scattering them next to each page, so you always know where to look and can replace one in a single place. With a tidy folder, plain names and a quick check of each path, missing pictures become rare. It takes a few seconds per image, and it saves you from the embarrassment of a page full of broken icons.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-broken-images",
          kind: "debug",
          title: "Debug: the broken images",
          mode: "html",
          summary: "Four images would fail on a real site, each for a different reason. Read the paths against the folder listing and fix them.",
          minutes: 8,
          broken: {
            html: `<h1>Park pictures</h1>
    <img src="Images/ridge.jpg" width="400" height="225" alt="The ridge">
    <img src="images/logo.sv" width="120" height="40" alt="Ridge Park logo">
    <img src="images/mill creek.jpg" width="400" height="225" alt="Mill Creek">
    <img scr="images/map.png" width="300" height="200" alt="Trail map">`,
            css: "",
          },
          challenge: {
            title: "Make every path match a real file",
            description: "The site has a folder called `images` with exactly these files: `ridge.jpg`, `logo.svg`, `mill-creek.jpg` and `map.png`, all in lowercase. The files do not exist in the Playground, so the preview shows alt text, but the checks read your paths. Fix the capital letter, the wrong extension, the space and the misspelt attribute.",
            hints: [
              "Compare each path with the list of file names, letter by letter.",
              "One image has no `src` at all, because the attribute name is misspelt.",
              "`images/ridge.jpg`, `images/logo.svg`, `images/mill-creek.jpg` and `src=\"images/map.png\"`",
            ],
            checks: [
              {
                type: "exists",
                selector: "img[src=\"images/ridge.jpg\"]",
                message: "The ridge picture has the right path",
              },
              {
                type: "exists",
                selector: "img[src=\"images/logo.svg\"]",
                message: "...the logo has the right extension",
              },
              {
                type: "exists",
                selector: "img[src=\"images/mill-creek.jpg\"]",
                message: "...the Mill Creek picture has no space",
              },
              {
                type: "exists",
                selector: "img[src=\"images/map.png\"]",
                message: "...the map's attribute is spelt `src`",
              },
              {
                type: "count",
                selector: "img:not([src])",
                message: "...and every image has a `src`.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Park pictures</h1>
    <img src="images/ridge.jpg" width="400" height="225" alt="The ridge">
    <img src="images/logo.svg" width="120" height="40" alt="Ridge Park logo">
    <img src="images/mill-creek.jpg" width="400" height="225" alt="Mill Creek">
    <img src="images/map.png" width="300" height="200" alt="Trail map">`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "figure-and-figcaption",
          kind: "learn",
          title: "Figures and captions",
          summary: "The figure and figcaption elements, and how a caption differs from alt text.",
          minutes: 8,
          concept: {
            description: "The `figure` element wraps a piece of content that is referred to from the main text, such as an image, a chart or a snippet of code. The `figcaption` element inside it gives that content a caption. Together they tie a picture to its description.",
            why: "A caption adds information for every reader, and a `figure` tells browsers and assistive tools that the caption belongs to the picture. It also keeps the pair together if you later move them around the page.",
            mentalModel: "Think of a photograph in a newspaper with a line of text under it. The photo and the line are one unit, and a reader sees them as a pair.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at what sits inside the `figure`.",
            },
            {
              type: "code",
              language: "html",
              code: `<figure>
      <img src="images/bridge.jpg"
           alt="A wooden footbridge over a stream"
           width="600" height="400">
      <figcaption>The new bridge over Mill Creek, finished in November.</figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "The `figcaption` can come before or after the content, and a `figure` can hold more than one image if they belong together. Browsers draw a `figure` with some space around it by default, and CSS can change that. The element does not itself change how anything looks, but it gives the pair a clear shape in your markup.",
            },
            {
              type: "paragraph",
              text: "Now an important question: if there is a caption, do I still need alt text? Yes, because they do different jobs. A caption is for everyone, and it adds context, such as a date or a place. Alt text replaces the picture for people who cannot see it. If the alt text just repeats the caption, a screen reader says the same thing twice.",
            },
            {
              type: "paragraph",
              text: "In the example above, the alt describes what the picture shows, a wooden footbridge, and the caption says what it is and when it opened. Neither repeats the other. When the caption already describes the picture well, you can keep the alt short, or in some cases empty, though you should be careful with the second choice, and think about what a person who cannot see the picture would miss.",
            },
            {
              type: "paragraph",
              text: "A `figure` is not only for images. You might wrap a table, a quotation or a block of code that the text refers to by name, as in \"see Figure 2\". The test is whether the content could be moved to another place, such as the end of the page, without breaking the sense of the text around it. If so, it is a good candidate for a `figure`.",
            },
            {
              type: "code",
              language: "html",
              code: `<figure>
      <pre><code>npm run dev</code></pre>
      <figcaption>Start the development server.</figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "The caption is real text, so it can be selected, searched and translated, and CSS can style it. An image with words painted into it can do none of that, which is one more reason to keep captions out of the picture.",
            },
            {
              type: "paragraph",
              text: "Use a `figure` when a picture or other item needs a caption, or is referred to from the text. For a picture that is simply part of the flow, an `img` on its own is perfectly fine. Do not add a `figure` just because you can, since extra wrappers that carry no meaning add noise.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "svg-and-icons",
          kind: "learn",
          title: "SVG and icons",
          summary: "Using SVG as an image file or as inline markup, and making icons accessible.",
          minutes: 8,
          concept: {
            description: "**SVG** is a format that describes a picture with shapes, so it stays sharp at any size. You can use it in two ways. As a file, you point an `img` at it, as with any picture. Inline, you write the `svg` element straight into your HTML, where CSS can style its parts.",
            why: "Logos and icons appear on almost every page, and they have to look crisp on every screen. SVG gives you that, in a few hundred bytes. Inline SVG goes further, since an icon can take the colour of the text around it and change on hover.",
            mentalModel: "Think of the difference between a photograph of a circle and instructions for drawing one: \"centre here, this wide\". Instructions can be followed at any size, and an SVG is a set of instructions.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with SVG as a file. Open the example in the Playground. It is an `img` like any other, so it needs an `alt`, and the browser treats it as one picture.",
            },
            {
              type: "code",
              language: "html",
              code: "<img src=\"images/logo.svg\" alt=\"Ridge Park logo\" width=\"120\" height=\"120\">",
            },
            {
              type: "paragraph",
              text: "That is the simplest use, and it works well for a logo. The file is cached by the browser like other images, and you can reuse it on every page. Its drawback is that CSS from your page cannot reach inside it, so you cannot change its colours with your stylesheet.",
            },
            {
              type: "paragraph",
              text: "Inline SVG puts the drawing in the page. Open the next example and look at the shapes inside the `svg` element, and notice that it has a `viewBox`, which gives the drawing its own coordinate system, so it scales smoothly.",
            },
            {
              type: "code",
              language: "html",
              code: `<svg viewBox="0 0 24 24" width="48" height="48" role="img" aria-labelledby="t">
      <title id="t">Trail marker</title>
      <circle cx="12" cy="12" r="10" fill="currentColor"/>
      <path d="M8 12l3 3 5-6" fill="none" stroke="white" stroke-width="2"/>
    </svg>`,
            },
            {
              type: "paragraph",
              text: "The fill value `currentColor` means \"use the text colour here\", so the icon matches the words beside it, and CSS can recolour it with a single `color` rule. You can also style parts with classes, animate them, or change them on hover. This is something an `img` cannot do. The whole drawing is only text in your page, so it adds almost no weight and needs no extra request.",
            },
            {
              type: "paragraph",
              text: "Accessibility works differently for inline SVG. If the icon carries meaning on its own, give the `svg` a `role=\"img\"` and a `title`, as above, so a screen reader announces it. If the icon sits beside a text label that says the same thing, it is decorative, and you should hide it from screen readers with `aria-hidden=\"true\"`. You will meet these attributes properly in the accessibility topics.",
            },
            {
              type: "code",
              language: "html",
              code: `<button type="button">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor"/>
      </svg>
      Save trail
    </button>`,
            },
            {
              type: "paragraph",
              text: "To choose between the two, ask whether you need to style the drawing from CSS. If not, use an `img` pointing at a file, because it is simpler and cached. If you do, or if the icon must follow the text colour, write it inline. Either way, keep the drawing simple, and give it a name or hide it, so no one is left guessing.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "image-gap-explorer",
          kind: "visualizer",
          title: "Image gap explorer",
          summary: "An image in a framed box leaves a strip of space beneath it. Change display and vertical-align to find where it comes from.",
          minutes: 8,
          concept: {
            description: "A picture sits inside an amber frame that has no padding, yet a thin strip of amber shows beneath it. The cause is that an image is an inline element, and inline things sit on the text baseline, with room below for letters like g and y. Controls change `display` and `vertical-align`.",
            why: "Beginners meet this gap on almost every first page with images, and often add odd margins to hide it. Knowing the real cause, that images behave like letters, gives you two clean fixes and makes the rest of inline layout easier to understand.",
            mentalModel: "Imagine a very large letter sitting on a line of writing. The line keeps space beneath its baseline for the tails of letters, so the letter does not touch the bottom of the line, even when there are no tails.",
          },
          stage: {
            html: "<div class=\"frame\"><img class=\"pic\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='200' height='120' fill='%2338bdf8'/%3E%3C/svg%3E\" width=\"200\" height=\"120\" alt=\"A sample picture\"></div>",
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .frame { width: 200px; margin: 16px; background: #f59e0b; font-size: 16px; line-height: 1.5; }`,
            annotate: "box",
            target: ".pic",
            items: ".pic",
            itemCount: 1,
          },
          starter: `.pic {
      display: inline;
      vertical-align: baseline;
    }
    `,
          controls: [
            {
              id: "display",
              label: "display",
              selector: ".pic",
              property: "display",
              fallback: "inline",
              type: "options",
              options: ["inline", "block"],
              help: "A block image is not placed on a text line.",
            },
            {
              id: "valign",
              label: "vertical-align",
              selector: ".pic",
              property: "vertical-align",
              fallback: "baseline",
              type: "options",
              options: ["baseline", "middle", "top", "bottom"],
              help: "Moves an inline image relative to the line.",
            },
          ],
          presets: [
            {
              id: "gap",
              label: "The gap",
              description: "inline, on the baseline",
              css: ".pic { display: inline; vertical-align: baseline; }",
            },
            {
              id: "bottom",
              label: "Align bottom",
              description: "inline, but no gap",
              css: ".pic { display: inline; vertical-align: bottom; }",
            },
            {
              id: "block",
              label: "Make it block",
              description: "not on a text line",
              css: ".pic { display: block; }",
            },
          ],
          challenge: {
            title: "Close the gap",
            description: "Remove the strip of amber below the picture by making the image a `block` element.",
            hints: [
              "The gap comes from the image sitting on a text line.",
              "Change one value in the `.pic` rule, the one for `display`.",
              "`.pic { display: block; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".pic",
                property: "display",
                expected: ["block"],
                message: "The image is a `block`, so it no longer sits on a text line.",
              },
            ],
            solution: `.pic {
      display: block;
      vertical-align: baseline;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lazy-loading-and-priority",
          kind: "learn",
          title: "Lazy loading and priority",
          summary: "Letting the browser skip images below the fold, and loading the important one first.",
          minutes: 8,
          concept: {
            description: "By default, the browser downloads every image on a page as soon as it finds the tag. The `loading=\"lazy\"` attribute tells it to wait until the image is close to the screen. That saves data and speeds up the part of the page people see first.",
            why: "A long page with twenty pictures does not need all twenty at once. If a visitor leaves after reading the top, they never pay for the ones further down. Lazy loading helps most on long pages, and it takes one attribute.",
            mentalModel: "Imagine a waiter who brings each course only when you are ready, not all at once. Your table stays clear, and nothing goes to waste if you leave early.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at the second image.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/hero.jpg" alt="Ridge at sunrise" width="800" height="450">
    
    <!-- far down the page -->
    <img src="images/gallery-1.jpg" alt="Stream in autumn"
         width="400" height="300" loading="lazy">`,
            },
            {
              type: "paragraph",
              text: "The first image appears at the top, so it loads straight away. The second has `loading=\"lazy\"`, so the browser waits until the visitor scrolls near it. Notice that it also has `width` and `height`. This matters more than ever with lazy images, because the browser must reserve their space in advance, or the page would jump as each one appears.",
            },
            {
              type: "paragraph",
              text: "There is a rule you should never break: do not lazy load the main image at the top of the page. A picture that is visible on arrival should load at once. If you delay it, the page seems slower, and the most important image is the last to show. Use lazy loading only for images that start below the visible area.",
            },
            {
              type: "paragraph",
              text: "To check that you got it right, scroll a long page slowly with the network panel open. Images should appear in the list just before they reach the screen, and none of the pictures at the top should be waiting. If a top image is lazy, remove the attribute at once. Browsers that do not understand the attribute simply load the image normally, so there is no harm in using it.",
            },
            {
              type: "paragraph",
              text: "A second attribute is `decoding=\"async\"`, which tells the browser it may decode the picture, which means turn the file into pixels, without holding up the rest of the page. It is safe on most images and does no harm on any of them.",
            },
            {
              type: "paragraph",
              text: "For the one image that matters most, usually the top picture, you can go the other way. The `fetchpriority=\"high\"` attribute asks the browser to download it ahead of less important files. Use it for one image at most, because if everything is high priority, nothing is.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/hero.jpg" alt="Ridge at sunrise"
         width="800" height="450" fetchpriority="high">`,
            },
            {
              type: "paragraph",
              text: "Together, these attributes let you tell the browser what you know about your page. The top image is urgent, the ones far down are not, and all of them have a known size. The browser does the work of scheduling, and your visitors get the part they need first.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-size-the-images",
          kind: "lab",
          title: "Lab: size the images",
          mode: "html",
          summary: "Give two images their dimensions, and make only the one below the fold load lazily.",
          minutes: 9,
          starter: {
            html: `<h1>Mill Creek walk</h1>
    <img class="hero" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%2338bdf8'/%3E%3C/svg%3E" alt="Mill Creek in the early morning">
    <p>Scroll down for more pictures.</p>
    <img class="gallery" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%234ade80'/%3E%3C/svg%3E" alt="The stream in autumn">`,
            css: "",
          },
          challenge: {
            title: "Reserve space and load wisely",
            description: "The hero picture is 800 by 450 and the gallery picture is 400 by 300. Add `width` and `height` to both. The gallery picture sits far down the page, so make it load lazily. The hero is the first thing visitors see, so it must not be lazy.",
            hints: [
              "Four attributes for the sizes, one for lazy loading.",
              "The sizes are plain numbers with no unit. Lazy loading is `loading=\"lazy\"`, and it belongs on the gallery image only.",
              "`width=\"800\" height=\"450\"` on the hero, and `width=\"400\" height=\"300\" loading=\"lazy\"` on the gallery.",
            ],
            checks: [
              {
                type: "attribute",
                selector: "img.hero",
                attribute: "width",
                message: "The hero is 800 wide",
                expected: "800",
              },
              {
                type: "attribute",
                selector: "img.hero",
                attribute: "height",
                message: "...and 450 tall",
                expected: "450",
              },
              {
                type: "attribute",
                selector: "img.gallery",
                attribute: "width",
                message: "The gallery picture is 400 wide",
                expected: "400",
              },
              {
                type: "attribute",
                selector: "img.gallery",
                attribute: "height",
                message: "...and 300 tall",
                expected: "300",
              },
              {
                type: "attribute",
                selector: "img.gallery",
                attribute: "loading",
                message: "...and loads lazily",
                expected: "lazy",
              },
              {
                type: "count",
                selector: "img.hero[loading]",
                message: "...while the hero has no `loading` attribute.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Mill Creek walk</h1>
    <img class="hero" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%2338bdf8'/%3E%3C/svg%3E" alt="Mill Creek in the early morning" width="800" height="450">
    <p>Scroll down for more pictures.</p>
    <img class="gallery" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%234ade80'/%3E%3C/svg%3E" alt="The stream in autumn" width="400" height="300" loading="lazy">`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "alt-text-in-context",
          kind: "learn",
          title: "Alt text in context",
          summary: "Why the same picture can need different alt text on different pages.",
          minutes: 8,
          concept: {
            description: "There is no single correct alt text for a picture. The right words depend on **context**: what the page is about, what is written around the image, and what the image is doing there. The same photo may deserve a full description in one place and an empty alt in another.",
            why: "If you memorise rules, you will write alt text that is correct on paper and unhelpful on the page. Asking \"what does this picture add here?\" produces text that serves the reader, whatever the picture and wherever it appears.",
            mentalModel: "Imagine a photo of a bridge. In a guidebook chapter on bridges, you would describe its shape. In a news story about a repair, you might name the damage. Beside a caption that already says it all, you might add nothing.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's look at one picture in three places. Open the example in the Playground and compare the alt text in each.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- A trail guide: the picture is the subject -->
    <img src="images/bridge.jpg"
         alt="A wooden footbridge with a handrail, crossing a shallow stream" width="400" height="300">
    
    <!-- A link to the bridge's page: the picture is a button -->
    <a href="bridge.html">
      <img src="images/bridge.jpg" alt="Mill Creek bridge" width="120" height="90">
    </a>
    
    <!-- Beside a caption that already describes it -->
    <img src="images/bridge.jpg" alt="" width="400" height="300">
    <p>The new wooden footbridge over Mill Creek, finished in November.</p>`,
            },
            {
              type: "paragraph",
              text: "In the first, the picture is the content, so the alt describes what is in it. In the second, the picture is inside a link, so the alt says where the link goes, and the bridge's name does that job. In the third, the text beside the picture already says everything, so an empty alt avoids saying it twice.",
            },
            {
              type: "paragraph",
              text: "That last choice needs care. Empty alt is right when the surrounding text carries all the meaning. If the picture shows something the text does not, such as the shape of the bridge or the weather on the day, then a person who cannot see it would miss that, and the picture is not decorative.",
            },
            {
              type: "paragraph",
              text: "It also helps to ask whether the picture would be missed if it were removed. Another useful question is whether the information is needed to understand the page. A photo of a smiling team on an \"About us\" page may not need more than a short alt. A diagram that shows how to assemble something absolutely does, and it deserves a careful description that follows the same order as the steps.",
            },
            {
              type: "paragraph",
              text: "When you work with other people, such as an editor or a client who supplies the pictures, it helps to agree how to handle alt text from the start. A short note in your content guide, such as \"describe what the picture adds, keep it under two sentences, and leave it empty if it is only decoration\", saves guesswork.",
            },
            {
              type: "paragraph",
              text: "To sum up, do not look for a perfect description of the picture, but for the right description of the picture here. Picture the page without the image, read it aloud, and write what needs to be said to fill the gap. That small habit, repeated for every image, is what separates a page that merely has alt text from one that is genuinely usable.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "checking-your-images",
          kind: "learn",
          title: "Checking your images",
          summary: "A short routine for finding broken, heavy or unlabelled images before visitors do.",
          minutes: 8,
          concept: {
            description: "Checking images means looking at them in ways your visitors might meet them: with the pictures off, on a slow connection, with a keyboard and a screen reader, and in the browser's tools. A few minutes of testing catches problems that are easy to fix and annoying to leave in.",
            why: "You see your own page with fast internet and good eyesight, on your own screen. Many of your visitors do not. Testing in their conditions finds missing pictures, missing alt text and heavy files that you would never notice yourself.",
            mentalModel: "Imagine inspecting a house before you hand over the keys. You do not only look from the front door. You open the cupboards, run the taps and check the windows.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with the simplest test. Open the example in the Playground. Every image in it has a path that fails, so the browser shows alt text instead of the pictures.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/missing-1.jpg" alt="Hikers at sunrise" width="300" height="200">
    <img src="images/missing-2.jpg" alt="" width="300" height="200">
    <img src="images/missing-3.jpg" width="300" height="200">`,
            },
            {
              type: "paragraph",
              text: "The first image shows its alt text, which is reassuring. The second shows nothing, which is correct for a decorative image but would be a mistake for a real photo. The third shows a broken icon and has no alt at all, which is a mistake in every case. Looking at a page with the images broken on purpose shows you how much your alt text carries.",
            },
            {
              type: "paragraph",
              text: "Next, look at the real page. Open your browser's developer tools and find the network panel, which lists every file the page loaded, with its size and status. Failed images show up in red, with the address the browser tried. The largest files are easy to spot, and you can see at a glance whether a single picture is far heavier than the rest.",
            },
            {
              type: "paragraph",
              text: "Then test how it sounds. Turn on a screen reader, such as the one built into your phone or a free one for your computer, and listen to a page with images on it. Does each alt make sense? Does anything get read twice? Are decorative pictures silent? Even a few minutes teaches you more than any rule list.",
            },
            {
              type: "paragraph",
              text: "You can also let tools do some of the work. Browsers have built-in auditing panels that flag missing alt text, images without dimensions, and files that are larger than they need to be. They are not perfect, since they cannot judge whether an alt text is good, but they are excellent at finding missing attributes.",
            },
            {
              type: "paragraph",
              text: "Finish with a checklist you can keep. Does every image have an alt attribute, with the right kind of value? Does it have width and height? Is the file the right size and format? Does it load from a correct path? Is lazy loading used below the fold, and never on the main image? If you can answer yes to all of these, your images are in good shape.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    illustrateATrailGuide,

    /* ------------------------------------------------------------------ */
    {
          id: "images-quiz",
          kind: "quiz",
          title: "Quiz: images",
          summary: "Eighteen questions on img, alt text, dimensions, formats, file size, paths, captions, lazy loading and checking.",
          minutes: 13,
          passPercent: 70,
          questions: [
            {
              prompt: "Which two attributes does every `img` need at the very least?",
              options: ["`src` and `title`", "`src` and `alt`", "`href` and `alt`", "`width` and `height`"],
              answerIndex: 1,
              explanation: "The `src` says which file to show, and the `alt` gives a written replacement for people who cannot see it.",
            },
            {
              prompt: "What happens when an image fails to load and has alt text?",
              options: ["The page stops loading", "Nothing is shown", "The file name is shown", "The alt text is shown in its place"],
              answerIndex: 3,
              explanation: "Browsers show the alt text when the picture cannot load, and screen readers read the same words.",
            },
            {
              prompt: "Which alt text is best for a photo of two hikers on a ridge at sunrise?",
              options: [
                "`Two hikers walk along a grassy ridge at sunrise`",
                "`Image of a picture of hikers`",
                "`Photo`",
                "`hikers ridge sunrise hiking trail park`",
              ],
              answerIndex: 0,
              explanation: "Good alt text says what matters about the picture, in plain language, without filler or keyword stuffing.",
            },
            {
              prompt: "Why should alt text not start with \"image of\"?",
              options: [
                "It is against the HTML rules",
                "It makes the file larger",
                "Screen readers already announce that it is an image",
                "It breaks the link",
              ],
              answerIndex: 2,
              explanation: "The screen reader says \"image\" already, so the words add nothing and make listening tedious.",
            },
            {
              prompt: "What should you write for an image that is purely decoration?",
              options: ["Leave the `alt` attribute out", "`alt=\"\"`, an empty value", "`alt=\"decoration\"`", "`alt=\"image\"`"],
              answerIndex: 1,
              explanation: "An empty alt tells assistive tools to skip the image. Leaving the attribute out is different, because a screen reader may read the file name.",
            },
            {
              prompt: "An image is the only content of a link to the home page. What should its alt say?",
              options: [
                "What the picture looks like",
                "The file name",
                "Nothing",
                "Where the link goes, such as `Ridge Park home page`",
              ],
              answerIndex: 3,
              explanation: "The alt becomes the link text, so it should name the destination.",
            },
            {
              prompt: "What is the best way to handle a chart that holds a lot of information?",
              options: [
                "Put every number in the alt attribute",
                "Leave the alt empty",
                "Give it a short alt and describe the detail in the page nearby",
                "Use a very large font",
              ],
              answerIndex: 2,
              explanation: "A short alt names the chart, and a nearby paragraph or table serves everyone with the full detail.",
            },
            {
              prompt: "What do the `width` and `height` attributes do before the file arrives?",
              options: [
                "They let the browser reserve the right amount of space",
                "Nothing",
                "They compress the image",
                "They hide the image",
              ],
              answerIndex: 0,
              explanation: "Knowing the shape in advance means the text below does not jump when the picture loads.",
            },
            {
              prompt: "Which CSS pair keeps a large image inside a narrow column without distorting it?",
              options: ["`width: 100px; height: 100px`", "`max-width: 100%; height: auto`", "`max-height: 100%; width: auto`", "`display: none`"],
              answerIndex: 1,
              explanation: "The max-width stops the overflow, and `height: auto` keeps the shape from the attributes.",
            },
            {
              prompt: "Which format is best for a logo that must stay sharp at any size?",
              options: ["JPEG", "GIF", "BMP", "SVG"],
              answerIndex: 3,
              explanation: "SVG describes shapes instead of pixels, so it scales without blurring, and the files are tiny.",
            },
            {
              prompt: "Which format is usually the best choice for photographs among these?",
              options: ["WebP or JPEG", "PNG", "SVG", "GIF"],
              answerIndex: 0,
              explanation: "Photographs compress well in WebP and JPEG. As PNG they are far larger, and SVG is not meant for them.",
            },
            {
              prompt: "A photo is 4000 pixels wide and shown at 400. What is the best fix?",
              options: [
                "Set `width=\"400\"` and leave the file alone",
                "Use PNG instead",
                "Resize the file itself, to about twice the display width",
                "Add `loading=\"lazy\"`",
              ],
              answerIndex: 2,
              explanation: "The browser still downloads every pixel of a big file, so resize the file, to around twice the display width for sharp screens.",
            },
            {
              prompt: "On a page in the `walks` folder, how would you reach `images/ridge.jpg` at the top of the site?",
              options: ["`images/ridge.jpg`", "`../images/ridge.jpg`", "`walks/images/ridge.jpg`", "`./ridge.jpg`"],
              answerIndex: 1,
              explanation: "The two dots go up one folder, and then the path goes down into `images`.",
            },
            {
              prompt: "Which is the best file name?",
              options: ["`IMG_2034.JPG`", "`Mill Creek Bridge.jpg`", "`mill_creek bridge.JPG`", "`mill-creek-bridge.jpg`"],
              answerIndex: 3,
              explanation: "Lowercase, hyphens and a descriptive name avoid case and space problems, and tell people what the picture shows.",
            },
            {
              prompt: "How does a `figcaption` differ from alt text?",
              options: [
                "They are the same thing",
                "A caption is only for screen readers",
                "A caption is for everyone and adds context, and alt text stands in for the picture",
                "Alt text is only for search engines",
              ],
              answerIndex: 2,
              explanation: "They do different jobs, so the alt should not simply repeat the caption.",
            },
            {
              prompt: "Which image should never get `loading=\"lazy\"`?",
              options: [
                "The main picture visible when the page opens",
                "A gallery picture far down the page",
                "A thumbnail in the footer",
                "A picture in a collapsed section",
              ],
              answerIndex: 0,
              explanation: "A picture that is visible on arrival should load at once. Delaying it makes the page seem slower.",
            },
            {
              prompt: "Why is the same photo sometimes given different alt text on different pages?",
              options: [
                "Search engines require it",
                "The right description depends on what the picture adds in that context",
                "Browsers cache alt text",
                "It is only a style choice",
              ],
              answerIndex: 1,
              explanation: "Alt text serves the reader in context, so it varies with the page, the surrounding text and the picture's job there.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "images-review",
          kind: "review",
          title: "Review: images",
          summary: "The img element, alt text for each kind of image, dimensions, formats, size, paths, captions, SVG, lazy loading and checks.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "Every image is an `img` with a `src` path and an `alt`. Write the alt as a short description of what the picture adds in its context. Use an empty `alt=\"\"` for decoration, an action or destination for an image in a link or button, and a short name plus a nearby description for a chart or diagram. Never leave the attribute out.",
            },
            {
              type: "code",
              language: "html",
              code: `<img src="images/ridge.jpg"
         alt="Two hikers walk along a grassy ridge at sunrise"
         width="800" height="450">`,
            },
            {
              type: "paragraph",
              text: "Give every image `width` and `height`, so the browser can reserve room and avoid layout shift, and add `max-width: 100%; height: auto` in CSS so images shrink with their column. Choose the format by the picture: photographs in WebP, AVIF or JPEG, logos and icons in SVG, and screenshots or transparency in PNG or WebP. Resize the file to about twice its display width and compress it until you see a difference.",
            },
            {
              type: "paragraph",
              text: "Paths work as they do in links: relative to the page, with `../` to go up. Keep pictures in one folder, with lowercase hyphenated names. Use a `figure` and `figcaption` when a picture needs a caption, and remember the caption and the alt do different jobs.",
            },
            {
              type: "code",
              language: "html",
              code: `<figure>
      <img src="images/bridge.jpg" alt="A wooden footbridge over a stream"
           width="600" height="400" loading="lazy">
      <figcaption>The new bridge over Mill Creek.</figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "Use `loading=\"lazy\"` for images below the fold, and never for the main picture at the top, which can take `fetchpriority=\"high\"` instead. Inline SVG can follow the text colour with `currentColor`, and needs a title or `aria-hidden`. Check your pages with images off, in the network panel and with a screen reader, and keep the checklist short: alt, size, format, path and loading.",
            },
          ],
        },
  ],
};

export default content;
