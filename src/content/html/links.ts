import type { TopicContent } from "@/engine/types";
import buildATrailDirectory from "./links/workshops/build-a-trail-directory/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-link",
          kind: "learn",
          title: "What is a link?",
          summary: "The a element, its href attribute and the text between the tags.",
          minutes: 8,
          concept: {
            description: "A **link** is a piece of a page that takes the visitor somewhere else when they select it. You make one with the `a` element, short for anchor. The `href` attribute holds the address to go to, and the text between the tags is what the visitor sees and clicks.",
            why: "Links are what make the web a web. Without them, every page would be a dead end, and you would have to type each address by hand. They are also the first thing a search engine follows, and one of the first things a screen reader user looks for, so getting them right matters.",
            mentalModel: "Picture a footnote in a book that says \"see page 42\". The words are the text of the link, and the page number is its destination. The reader can follow it or ignore it, and a good footnote makes clear which one they want.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's build one. Open the Playground with the example below and look at how the tag is put together.",
            },
            {
              type: "code",
              language: "html",
              code: "<p>Read the <a href=\"https://example.com/guide\">full trail guide</a> before you set off.</p>",
            },
            {
              type: "paragraph",
              text: "The opening tag is `<a href=\"...\">`, and it has two parts: the element name, `a`, and an attribute called `href`, which stands for hypertext reference. The value in quotes is the address. The words `full trail guide` sit between the opening and closing tags, and they are the part that people see. Everything else is hidden from view, though the browser shows the address in a corner of the window when you hover over a link.",
            },
            {
              type: "paragraph",
              text: "The browser makes a few decisions for you. It draws the text in a different colour, usually blue, and underlines it, so people can tell it is a link. It changes the pointer to a hand when you hover, and it lets you reach the link with the Tab key and follow it with Enter. All of that comes free with the `a` element.",
            },
            {
              type: "paragraph",
              text: "A link can go anywhere that has an address: another site, another page of your own, a spot lower down the same page, or even an email program. The pattern never changes: an `a` element, an `href`, and some text.",
            },
            {
              type: "paragraph",
              text: "An `a` element without an `href` is only a placeholder. It does not go anywhere, it is not reachable by keyboard, and browsers do not style it as a link. If you ever see a link that does nothing, one of the first things to check is whether the `href` is spelled correctly. A typo such as `hef` produces a silent, broken anchor.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>This one works: <a href="https://example.com">Example</a></p>
    <p>This one does not: <a hef="https://example.com">Example</a></p>`,
            },
            {
              type: "paragraph",
              text: "Open that example and try to select both. Only the first behaves like a link, and the second is just plain text with a hidden attribute that nothing recognises. The browser does not warn you, so watch for this mistake in your own markup.",
            },
            {
              type: "paragraph",
              text: "A link is an inline element, so it sits inside a paragraph or a heading and flows with the words around it. The next lessons show what good addresses and good link text look like.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "urls-absolute-and-relative",
          kind: "learn",
          title: "Absolute and relative URLs",
          summary: "How an address is built, and the difference between a full address and one that depends on where you are.",
          minutes: 8,
          concept: {
            description: "An address on the web is called a **URL**. An **absolute URL** is complete: it has a scheme, a host and a path, such as `https://example.com/trails/ridge.html`. A **relative URL** leaves out the first part and depends on the page it appears on, such as `ridge.html`, which means \"the page called ridge.html next to this one\".",
            why: "You will use both kinds all the time. Absolute URLs are how you point at other websites. Relative URLs are how you link between the pages of your own site, and they keep working when you move the whole site to a new address, which is why developers prefer them for internal links.",
            mentalModel: "Think of giving directions. To a stranger you give a full address, including the city. To a neighbour you say \"the house next door\", because they already know where they are.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's take the full address apart first. Read the example in the Playground, and look at each piece.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"https://example.com/trails/ridge.html\">Ridge Trail</a>",
            },
            {
              type: "paragraph",
              text: "The start, `https`, is the scheme, which says how to talk to the server. The `example.com` part is the host, the name of the website. The `/trails/ridge.html` part is the path, which says which page on that site you want. Together they point at exactly one place, from anywhere in the world. That is what makes an address absolute.",
            },
            {
              type: "paragraph",
              text: "Now a relative one. On a page that lives at `https://example.com/trails/index.html`, the following link points at a page in the same folder.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"ridge.html\">Ridge Trail</a>",
            },
            {
              type: "paragraph",
              text: "The browser takes the address of the page the link is on, removes the file name, and puts `ridge.html` in its place. So the link above goes to `https://example.com/trails/ridge.html`, and if you copied both pages to another site, the link would still work, because the browser would do the same sum again with the new address.",
            },
            {
              type: "paragraph",
              text: "That is the great advantage of relative links, and it shows up most clearly on your own computer. While you build a site, you open files straight from a folder, and there is no website address at all. A relative link works there, because the browser needs only the folder. An absolute link to your future website would send you out to the live site, or fail, while you are still working.",
            },
            {
              type: "paragraph",
              text: "As a rule, use an absolute URL when the page you are linking to belongs to somebody else, or to a different site of yours. Use a relative URL for the pages that make up the site you are building. Mixing them up leads to two common problems: a site that cannot be moved without editing every link, and links that jump to the live site when you meant to test the local copy.",
            },
            {
              type: "paragraph",
              text: "A word about the `https` scheme. It means that the connection is encrypted, and almost every site uses it today. Copy addresses from the browser's address bar, and check that they begin with `https`. The next lesson shows how relative paths work across folders.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "relative-paths-in-folders",
          kind: "learn",
          title: "Relative paths and folders",
          summary: "How ./, ../ and a leading slash move you around a site's folders.",
          minutes: 8,
          concept: {
            description: "A relative URL is a **path** from the current page to another file. When the files are in different folders, the path says which way to go. A folder name moves into that folder, `../` goes up one folder, and a leading `/` starts from the top of the site.",
            why: "Real sites have folders, such as one for walks, one for images and one for downloads. If you get a path wrong, the link breaks, and the browser shows a \"not found\" page. Reading a path correctly is a skill you will use for links, images, stylesheets and scripts.",
            mentalModel: "Picture the folders on your computer. To open a file in a folder next to the one you are in, you first go up to the parent, then back down. A path is the same journey, written out.",
          },
          body: [
            {
              type: "paragraph",
              text: "Imagine a small site laid out like this. We will write links from a page called `mill-creek.html`, which sits in the `walks` folder.",
            },
            {
              type: "code",
              language: "html",
              code: `site/
      index.html
      about.html
      walks/
        mill-creek.html
        ridge.html
      images/
        map.png`,
            },
            {
              type: "paragraph",
              text: "The first case is the easy one. To link to another page in the same folder, you use only its name, as in `ridge.html`. You can also write `./ridge.html`, where the single dot means \"this folder\". Both mean the same, and most people leave the dot out.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="ridge.html">Ridge walk</a>
    <a href="./ridge.html">Ridge walk again</a>`,
            },
            {
              type: "paragraph",
              text: "To reach `about.html`, which lives one level up, the path starts with two dots and a slash. That means \"go up to the parent folder\", and then the file name follows. For the map in the `images` folder, you go up, and then down into `images`.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="../about.html">About the park</a>
    <a href="../images/map.png">See the map</a>`,
            },
            {
              type: "paragraph",
              text: "You can chain `../` more than once to climb several levels, so `../../index.html` goes up two folders. To go down into a folder, you write its name followed by a slash, as in `images/map.png`, when the images folder is next to your page.",
            },
            {
              type: "paragraph",
              text: "The third style starts with a slash. A path like `/index.html` is relative to the top of the site, whatever folder the current page is in. It is handy on a big site, because the link is the same on every page, but it only works when the site is served from a web server. If you open files straight from a folder on your computer, a leading slash points at the top of the whole drive instead.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"/index.html\">Home</a>",
            },
            {
              type: "paragraph",
              text: "When a link fails, check three things. Is the file name spelt exactly right, including capital letters, because many servers treat `Ridge.html` and `ridge.html` as different files? Did you count the folders correctly, going up as many levels as you need? And are there spaces in the name? Spaces cause trouble, so use hyphens in file names, like `mill-creek.html`, and your paths will stay simple. Once you can read one path, you can read them all, so draw the folder tree whenever a link misbehaves.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-path",
          kind: "predict",
          title: "Predict the path",
          summary: "A page sits in a folder, with links that go up, down and across. Work out which file each one reaches.",
          minutes: 7,
          mode: "html",
          intro: "This code is the page `walks/mill-creek.html`. The site has `index.html` and `about.html` at the top, a `walks` folder with `mill-creek.html` and `ridge.html`, and an `images` folder with `map.png`. Decide where each link goes, then run the code to look at the markup.",
          code: {
            html: `<p><a href="ridge.html">Ridge walk</a></p>
    <p><a href="../about.html">About the park</a></p>
    <p><a href="/index.html">Home</a></p>
    <p><a href="../images/map.png">Map</a></p>
    <p><a href="https://example.com/forecast">Forecast</a></p>`,
            css: "",
          },
          questions: [
            {
              prompt: "Where does `href=\"ridge.html\"` go?",
              options: [
                "`images/ridge.html`",
                "`ridge.html` at the top of the site",
                "`walks/ridge.html`, the file next to this page",
                "Nowhere, it needs `https://`",
              ],
              answerIndex: 2,
              hint: "A bare file name means the same folder as the current page.",
              explanation: "A path with no folder in it is resolved from the folder that the current page is in, so it reaches `walks/ridge.html`.",
              proves: [
                {
                  type: "attribute",
                  selector: "a[href=\"ridge.html\"]",
                  attribute: "href",
                  message: "The link is a bare file name.",
                  expected: "ridge.html",
                },
              ],
            },
            {
              prompt: "Where does `href=\"../about.html\"` go?",
              options: [
                "`about.html` at the top of the site, one folder up",
                "`walks/about.html`",
                "`images/about.html`",
                "`about.html` two folders up",
              ],
              answerIndex: 0,
              hint: "What does `../` do to the folder you start in?",
              explanation: "The two dots go up one level, from `walks` to the top, and then the file name follows.",
              proves: [
                {
                  type: "attribute",
                  selector: "a[href=\"../about.html\"]",
                  attribute: "href",
                  message: "The link starts with `../`.",
                  expected: "../about.html",
                },
              ],
            },
            {
              prompt: "Where does `href=\"/index.html\"` go, when the site is on a web server?",
              options: [
                "`walks/index.html`",
                "The page it is on",
                "`images/index.html`",
                "`index.html` at the top of the site, whichever folder the page is in",
              ],
              answerIndex: 3,
              hint: "A leading slash starts from the top.",
              explanation: "A path that starts with a slash is measured from the top of the site, so it is the same on every page.",
              proves: [
                {
                  type: "attribute",
                  selector: "a[href=\"/index.html\"]",
                  attribute: "href",
                  message: "The link starts with a slash.",
                  expected: "/index.html",
                },
              ],
            },
            {
              prompt: "How many of the five links use an absolute URL?",
              options: ["None", "One", "Three", "All five"],
              answerIndex: 1,
              hint: "An absolute URL starts with a scheme such as `https:`.",
              explanation: "Only the forecast link has a scheme and a host. The other four are relative, and depend on the page they sit on.",
              proves: [
                {
                  type: "count",
                  selector: "a[href^=\"https://\"]",
                  message: "Exactly one link starts with `https://`.",
                  min: 1,
                  max: 1,
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "fragment-links",
          kind: "learn",
          title: "Links within a page",
          summary: "Giving an element an id and linking to it with #, including a back-to-top link.",
          minutes: 8,
          concept: {
            description: "A **fragment link** takes the visitor to a spot on a page, rather than to a new page. You give an element an `id`, and then link to it with a hash sign and that id, such as `href=\"#safety\"`. The browser scrolls straight to the element.",
            why: "On a long page, a list of jump links near the top lets people go straight to the part they want. They are also a gift to keyboard users and screen reader users, who would otherwise have to move through everything above it. A good page makes a long document feel short.",
            mentalModel: "Picture the tabs sticking out of a notebook. Each tab is a link, and each page it points at is an element with an id. Flicking to a tab takes you to the right page at once.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the two halves of the pattern.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Jump to <a href="#safety">safety</a>.</p>
    
    <h2>Weather</h2>
    <p>Check the forecast before you leave.</p>
    
    <h2 id="safety">Safety</h2>
    <p>Stay on the marked path.</p>`,
            },
            {
              type: "paragraph",
              text: "The destination is the heading with `id=\"safety\"`. The id is a name you give the element, and it has to be unique on the page. The link says `href=\"#safety\"`, and the hash sign means \"on this page, find the element with this id\". Notice that the id is written without the hash sign in the heading, and with it in the link. That is easy to mix up, and it is a classic cause of a link that does nothing.",
            },
            {
              type: "paragraph",
              text: "Choose ids that are short, lowercase, and use hyphens between words, such as `packing-list`. Ids are case sensitive, so `#Safety` does not find `id=\"safety\"`, and they must not contain spaces. If you copy and paste a link, check that the id matches letter for letter, because the browser will not tell you when it finds nothing. It simply stays where it is.",
            },
            {
              type: "paragraph",
              text: "You can use the same idea to link to a section of another page. Add the hash and the id after the page's address, and the browser opens the page and scrolls to that spot.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"ridge-trail.html#parking\">Parking at the Ridge Trail</a>",
            },
            {
              type: "paragraph",
              text: "A tidy way to finish a long page is a link that takes people back to the start. Give your top heading an id, such as `id=\"top\"`, and link to `#top` at the bottom. Browsers also treat a link to `#` on its own, or to `#top`, as a request to go to the top of the page, but a named id is clearer and works everywhere.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1 id="top">Trail guide</h1>
    <!-- a long page goes here -->
    <p><a href="#top">Back to the top</a></p>`,
            },
            {
              type: "paragraph",
              text: "One last point for people who use a keyboard. When you follow a fragment link, the browser treats the target as the place to carry on from, so the next press of Tab moves on from there instead of from the top of the page. That makes jump links much more useful than plain scrolling, and it is another reason to use real links and not scripts for this job.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-jump-navigation",
          kind: "lab",
          title: "Lab: jump navigation",
          mode: "html",
          summary: "Give three headings ids, link to them from a jump list, and add a link that returns to the top.",
          minutes: 9,
          starter: {
            html: `<h1>Trail guide</h1>
    <p>Jump to: Packing, Weather, Safety</p>
    <h2>Packing</h2>
    <p>Boots, water and a jacket.</p>
    <h2>Weather</h2>
    <p>Check the forecast before you leave.</p>
    <h2>Safety</h2>
    <p>Stay on the marked path.</p>
    <p>Back to the top</p>`,
            css: "",
          },
          challenge: {
            title: "Link within the page",
            description: "Give the three `h2` headings the ids `packing`, `weather` and `safety`. Turn each word in the `Jump to` line into a link to its heading. Then give the `h1` the id `top`, and make `Back to the top` a link to it. Ids have no hash sign, and links do.",
            hints: [
              "Add `id=\"packing\"` to the opening `h2` tag, and so on. Then write `href=\"#packing\"` in the matching link.",
              "The top of the page is the `h1`, so give it `id=\"top\"` and link to `#top`.",
              "`<a href=\"#packing\">Packing</a>` and `<h2 id=\"packing\">Packing</h2>`",
            ],
            checks: [
              {
                type: "exists",
                selector: "h2#packing",
                message: "The three headings have the ids `packing`",
              },
              {
                type: "exists",
                selector: "h2#weather",
                message: "...`weather`",
              },
              {
                type: "exists",
                selector: "h2#safety",
                message: "...and `safety`",
              },
              {
                type: "count",
                selector: "a[href=\"#packing\"], a[href=\"#weather\"], a[href=\"#safety\"]",
                message: "...each jump word is a link to its heading",
                min: 3,
                max: 3,
              },
              {
                type: "exists",
                selector: "h1#top",
                message: "...the `h1` has the id `top`",
              },
              {
                type: "text",
                selector: "a[href=\"#top\"]",
                includes: "Back to the top",
                message: "...and `Back to the top` links to it.",
              },
            ],
            solution: {
              html: `<h1 id="top">Trail guide</h1>
    <p>Jump to: <a href="#packing">Packing</a>, <a href="#weather">Weather</a>, <a href="#safety">Safety</a></p>
    <h2 id="packing">Packing</h2>
    <p>Boots, water and a jacket.</p>
    <h2 id="weather">Weather</h2>
    <p>Check the forecast before you leave.</p>
    <h2 id="safety">Safety</h2>
    <p>Stay on the marked path.</p>
    <p><a href="#top">Back to the top</a></p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-dead-links",
          kind: "debug",
          title: "Debug: the dead links",
          mode: "html",
          summary: "Four links look fine and do nothing, or go nowhere. Find the small mistake behind each one.",
          minutes: 8,
          broken: {
            html: `<h1 id="trail-guide">Trail guide</h1>
    <p>Jump to <a href="#Safety">safety</a>, <a href="#weather">weather</a> or <a href="#packing">packing</a>.</p>
    <h2 id="safety">Safety</h2>
    <p>Stay on the marked path.</p>
    <h2 id="weather">Weather</h2>
    <p>Check the forecast before you leave.</p>
    <h2 id="packing-list">Packing</h2>
    <p>Boots, water and a jacket.</p>
    <p><a hef="ridge-trail.html">Ridge Trail page</a></p>
    <p><a href="walks/mill creek.html">Mill Creek walk</a></p>`,
            css: "",
          },
          challenge: {
            title: "Bring the links back to life",
            description: "Four links in this guide are broken. One has the wrong letter case, one points at an id that does not exist, one has a misspelt attribute, and one has a space in its file name. Fix the links only, and leave the ids as they are: the headings are right, the links are wrong.",
            hints: [
              "Ids are case sensitive, and a link must match its id letter for letter. Compare each `#` link with the `id` it should reach.",
              "One anchor has no `href` at all, because the word is misspelt. Another has a space where a hyphen should be, in the file name.",
              "`#safety`, `#packing-list`, `href=\"ridge-trail.html\"` and `walks/mill-creek.html`",
            ],
            checks: [
              {
                type: "exists",
                selector: "a[href=\"#safety\"]",
                message: "The safety link matches its id exactly",
              },
              {
                type: "exists",
                selector: "a[href=\"#packing-list\"]",
                message: "...the packing link points at `#packing-list`",
              },
              {
                type: "count",
                selector: "a:not([href])",
                message: "...every `a` has an `href`",
                max: 0,
              },
              {
                type: "exists",
                selector: "a[href=\"ridge-trail.html\"]",
                message: "...the Ridge Trail link is spelt correctly",
              },
              {
                type: "exists",
                selector: "a[href=\"walks/mill-creek.html\"]",
                message: "...and the Mill Creek link has no space in it.",
              },
            ],
            solution: {
              html: `<h1 id="trail-guide">Trail guide</h1>
    <p>Jump to <a href="#safety">safety</a>, <a href="#weather">weather</a> or <a href="#packing-list">packing</a>.</p>
    <h2 id="safety">Safety</h2>
    <p>Stay on the marked path.</p>
    <h2 id="weather">Weather</h2>
    <p>Check the forecast before you leave.</p>
    <h2 id="packing-list">Packing</h2>
    <p>Boots, water and a jacket.</p>
    <p><a href="ridge-trail.html">Ridge Trail page</a></p>
    <p><a href="walks/mill-creek.html">Mill Creek walk</a></p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "writing-good-link-text",
          kind: "learn",
          title: "Writing good link text",
          summary: "Why \"click here\" fails, and how to make link text say where it goes.",
          minutes: 8,
          concept: {
            description: "**Link text** is the words between the opening and closing `a` tags. Good link text says where the link goes or what it does, and it makes sense even when it is read on its own, out of the sentence around it.",
            why: "Screen reader users often pull up a list of all the links on a page and move through it, without reading the text in between. Sighted users skim for links too. If the list says \"click here\", \"read more\" and \"link\", nobody learns anything. Good link text makes the page quicker for everyone.",
            mentalModel: "Imagine a street with every sign reading \"this way\". You would have to read the whole map to know which way to go. Signs that name the place, such as \"Station\" and \"Harbour\", are useful at a glance.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's compare two versions of the same sentence. Open the example in the Playground and read just the underlined words in each.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Our trail rules have changed. <a href="rules.html">Click here</a> to read them.</p>
    
    <p>Our trail rules have changed. <a href="rules.html">Read the new trail rules</a>.</p>`,
            },
            {
              type: "paragraph",
              text: "Read only the link in the first sentence, and all you get is \"Click here\". It does not say where the link goes. Read only the link in the second, and you know exactly what you will find. The second sentence is also shorter, and it does not tell the visitor how to operate a link, which they already know, and which is wrong on a touchscreen anyway.",
            },
            {
              type: "paragraph",
              text: "A few habits help. Start with the important words, such as `Trail rules` or `Download the map`, and not with a filler like \"Here\" or \"This\". Keep the text short, because a link that is a whole sentence is tiring to hear. And make sure that two links with the same text point to the same place, because a list with five identical \"Read more\" links is useless.",
            },
            {
              type: "paragraph",
              text: "Avoid using a bare address as link text, unless the address itself is what you are showing. A long string such as `https://example.com/trails/2026/ridge-closure-notice` is read out character by character by some screen readers, and it tells people less than a name would. Prefer a short description, and keep the address in the `href`.",
            },
            {
              type: "code",
              language: "html",
              code: "<p>Read the <a href=\"https://example.com/closure\">notice about the ridge closure</a>.</p>",
            },
            {
              type: "paragraph",
              text: "When a link needs more explanation than a few words, put the detail in the surrounding text, and keep the link itself short. If a link goes to a file, say so in the text, as in \"Trail map (PDF, 2 MB)\", so people are not surprised by a download. If it opens in a new tab, it is kind to say that too, and you will see how soon.",
            },
            {
              type: "paragraph",
              text: "A good test is to read through your page and cover everything except the links. If you can still tell what each one does, the text is good. If you cannot, rewrite the words, because a small change there pays off for every person who uses the page.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "new-tabs-and-rel",
          kind: "learn",
          title: "New tabs and the rel attribute",
          summary: "target=\"_blank\", why it needs rel=\"noopener noreferrer\", and when to leave it out.",
          minutes: 8,
          concept: {
            description: "The `target` attribute tells the browser where to open a link. The value `_blank` opens it in a new tab. The `rel` attribute describes the relationship between your page and the one you link to, and for links that open in a new tab, it should include `noopener` and `noreferrer`.",
            why: "Opening a link in a new tab keeps the visitor on your page, but it also takes control from them, and it can create security problems if you do it carelessly. Knowing the safe pattern, and when to skip it, avoids both.",
            mentalModel: "Think of handing a visitor a leaflet for another shop. If you hold on to the end of the leaflet, you could pull it back, and the other shop could tug at you in return. `noopener` means you let go completely.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at how a link that opens in a new tab is written.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="https://example.com/forecast"
       target="_blank"
       rel="noopener noreferrer">Weather forecast</a>`,
            },
            {
              type: "paragraph",
              text: "The `target=\"_blank\"` part opens the link in a new tab. The `rel` attribute holds two keywords separated by a space. The first, `noopener`, stops the new page from reaching back to yours through the browser's `window.opener` object. The second, `noreferrer`, stops the browser telling the new site which page the visitor came from. Modern browsers already treat `_blank` links as `noopener`, but writing it out makes your intent clear, and it protects people with older browsers.",
            },
            {
              type: "paragraph",
              text: "There is another `rel` keyword worth knowing. The value `nofollow` asks search engines not to count a link as a recommendation, which matters for links you were paid to include, or links added by visitors in comments. You can combine keywords in one attribute, such as `rel=\"nofollow noopener noreferrer\"`.",
            },
            {
              type: "paragraph",
              text: "Now the harder question: should you open links in a new tab at all? The general advice is to let visitors choose. People who want a new tab can open one with a right click or a modifier key, but people who do not want one have no easy way to close it, and a screen reader user may not even notice the tab has changed. As a result, most links should open in the same tab, which is the default, and need no `target` at all.",
            },
            {
              type: "paragraph",
              text: "There are some good reasons to use `_blank`. A visitor in the middle of filling in a form might need to check a policy page without losing their answers. A document that is meant to be read alongside the current page is another case. When you do open a new tab, tell people, with a few words in the link text, such as \"(opens in a new tab)\", so it does not come as a surprise.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="https://example.com/terms"
       target="_blank"
       rel="noopener noreferrer">Terms of use (opens in a new tab)</a>`,
            },
            {
              type: "paragraph",
              text: "If you take away one rule, make it this: every `target=\"_blank\"` link gets a `rel` with `noopener noreferrer`, and almost every other link has no `target` at all. That habit is easy to keep, and it covers nearly everything.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-link-the-guide",
          kind: "lab",
          title: "Lab: link the guide",
          mode: "html",
          summary: "Turn three phrases into three different kinds of link: a relative page link, an external link in a new tab, and an email link.",
          minutes: 9,
          starter: {
            html: `<h1>Park guide</h1>
    <p>Read the full Ridge Trail page. Check the weather forecast on the weather service site. Email the rangers at rangers@example.com.</p>`,
            css: "",
          },
          challenge: {
            title: "Three links, three addresses",
            description: "Make `Ridge Trail page` a link to `ridge-trail.html`, in the same folder. Make `weather service site` a link to `https://example.com/forecast` that opens in a new tab and has the safe `rel` value. Make the email address a link that starts a message to `rangers@example.com`. Keep the words as they are.",
            hints: [
              "Three `a` elements, each with its own `href`. Only the forecast link needs `target` and `rel`.",
              "The new tab link needs `target=\"_blank\"` and `rel=\"noopener noreferrer\"`. The email link needs `mailto:` before the address.",
              "`<a href=\"mailto:rangers@example.com\">rangers@example.com</a>`",
            ],
            checks: [
              {
                type: "exists",
                selector: "a[href=\"ridge-trail.html\"]",
                message: "`Ridge Trail page` links to `ridge-trail.html`",
              },
              {
                type: "attribute",
                selector: "a[href=\"https://example.com/forecast\"]",
                attribute: "target",
                message: "...the forecast link opens in a new tab",
                expected: "_blank",
              },
              {
                type: "attribute",
                selector: "a[href=\"https://example.com/forecast\"]",
                attribute: "rel",
                message: "...with `rel=\"noopener noreferrer\"`",
                expected: "noopener noreferrer",
              },
              {
                type: "text",
                selector: "a[href=\"mailto:rangers@example.com\"]",
                includes: "rangers@example.com",
                message: "...the email address is a `mailto:` link",
              },
              {
                type: "count",
                selector: "a",
                message: "...and there are exactly three links.",
                min: 3,
                max: 3,
              },
            ],
            solution: {
              html: `<h1>Park guide</h1>
    <p>Read the full <a href="ridge-trail.html">Ridge Trail page</a>. Check the weather forecast on the <a href="https://example.com/forecast" target="_blank" rel="noopener noreferrer">weather service site</a>. Email the rangers at <a href="mailto:rangers@example.com">rangers@example.com</a>.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "mailto-tel-and-schemes",
          kind: "learn",
          title: "Email, phone and other links",
          summary: "mailto: and tel:, and how a scheme changes what a link does.",
          minutes: 8,
          concept: {
            description: "The first part of an address, the **scheme**, tells the browser what kind of thing it points at. `https:` opens a web page, `mailto:` opens the visitor's email program with a new message, and `tel:` offers to start a phone call. You use them in an `href`, just like any other address.",
            why: "Contact details are among the most common reasons people visit a page. A link that starts a message or a call in one step is much easier than copying an address by hand, and especially on a phone, where the dial pad is one tap away.",
            mentalModel: "Picture a business card with a small button next to the email and another next to the phone number. Pressing a button does the job for you, and which button it is decides the job.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with email. Open the example in the Playground and look at the address.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"mailto:rangers@example.com\">Email the rangers</a>",
            },
            {
              type: "paragraph",
              text: "After `mailto:` comes the address. When a visitor selects the link, their email program opens with a new message addressed to the rangers. If they have no email program set up, nothing may happen, so it is a good idea to show the address in the link text, or near it, so they can copy it by hand. You can add a subject, with a question mark and `subject=`, and spaces in it are written as `%20`.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="mailto:rangers@example.com?subject=Trail%20question">
      Ask the rangers a question
    </a>`,
            },
            {
              type: "paragraph",
              text: "Phone links work the same way. After `tel:` you write the number, ideally in international form, beginning with a plus sign and the country code, and without spaces. That way, the link works wherever the visitor is calling from. The text can show the number however you like, with spaces or dashes for readability.",
            },
            {
              type: "code",
              language: "html",
              code: "<a href=\"tel:+15550142\">Call 555 0142</a>",
            },
            {
              type: "paragraph",
              text: "On a phone, selecting that link offers to call. On a laptop, it may open a calling app, or do nothing, so as with email, put the number in the text so people can read it. There is a similar `sms:` scheme that opens a text message, though support varies between devices, so use it with care.",
            },
            {
              type: "paragraph",
              text: "A warning about email addresses on a public page. Programs that scan the web for addresses can collect them for spam, and a `mailto:` link is easy for them to find. If that worries you, use a contact form instead, which you will meet in the forms topic. For a small public notice, such as a park's information address, a plain `mailto:` link is usually fine.",
            },
            {
              type: "paragraph",
              text: "One mistake to avoid is forgetting the scheme. An `href` of `rangers@example.com` has no `mailto:`, so the browser treats it as a relative path to a file with that name, and the visitor sees a \"not found\" page. If a contact link goes to an error, the missing scheme is the first thing to check.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-what-a-click-does",
          kind: "predict",
          title: "Predict what a click does",
          summary: "Four links, four different behaviours. Predict what the browser does when each one is selected.",
          minutes: 7,
          mode: "html",
          intro: "Each link below has an address that tells the browser what to do. Read the `href` and the other attributes, decide what will happen, then run the code to see the markup in the Playground.",
          code: {
            html: `<h1 id="top">Park guide</h1>
    <p><a href="#safety">Jump</a>
    <a href="mailto:rangers@example.com">Email</a>
    <a href="https://example.com/forecast" target="_blank" rel="noopener noreferrer">Forecast</a>
    <a href="files/map.pdf" download>Map</a></p>
    <h2 id="safety">Safety</h2>
    <p>Stay on the marked path.</p>`,
            css: "",
          },
          questions: [
            {
              prompt: "What happens when the `Jump` link is selected?",
              options: [
                "The browser loads a new page",
                "The page scrolls to the element with `id=\"safety\"`",
                "An email opens",
                "A file is saved",
              ],
              answerIndex: 1,
              hint: "What does a hash at the start of an address mean?",
              explanation: "A fragment link stays on the same page and scrolls to the element whose id matches the name after the hash.",
              proves: [
                {
                  type: "exists",
                  selector: "a[href=\"#safety\"]",
                  message: "The link points at `#safety`.",
                },
                {
                  type: "exists",
                  selector: "h2#safety",
                  message: "...and a heading has that id.",
                },
              ],
            },
            {
              prompt: "What happens when the `Email` link is selected?",
              options: [
                "The browser looks for a file called `mailto:rangers@example.com`",
                "The address is saved to a file",
                "A phone call starts",
                "The visitor's email program opens a new message to that address",
              ],
              answerIndex: 3,
              hint: "Look at the scheme at the start of the address.",
              explanation: "The `mailto:` scheme hands the address to the email program. Without the scheme, the browser would treat it as a file path.",
              proves: [
                {
                  type: "exists",
                  selector: "a[href^=\"mailto:\"]",
                  message: "The link uses the `mailto:` scheme.",
                },
              ],
            },
            {
              prompt: "What does the `Forecast` link do, and what does its `rel` add?",
              options: [
                "Opens in a new tab, and `rel` stops the new page reaching back to this one",
                "Opens in the same tab, and `rel` has no effect",
                "Downloads a file, and `rel` names it",
                "Scrolls down the page, and `rel` hides the address",
              ],
              answerIndex: 0,
              hint: "`target=\"_blank\"` is the first clue.",
              explanation: "The `_blank` value opens a new tab. The `noopener noreferrer` keywords stop the new page controlling this one and stop the browser sharing where the visitor came from.",
              proves: [
                {
                  type: "attribute",
                  selector: "a[target=\"_blank\"]",
                  attribute: "rel",
                  message: "The new-tab link has `rel=\"noopener noreferrer\"`.",
                  expected: "noopener noreferrer",
                },
              ],
            },
            {
              prompt: "What does the `download` attribute on the `Map` link ask for?",
              options: [
                "To open the file in a new tab",
                "To scroll to the map",
                "To save the file to the visitor's device",
                "To email the file",
              ],
              answerIndex: 2,
              hint: "The word is in the attribute's name.",
              explanation: "The `download` attribute asks the browser to save the file, and it can suggest a file name as its value.",
              proves: [
                {
                  type: "exists",
                  selector: "a[download]",
                  message: "The map link has the `download` attribute.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "download-links",
          kind: "learn",
          title: "Download links",
          summary: "The download attribute, linking to files, and telling people what to expect.",
          minutes: 8,
          concept: {
            description: "A link can point at a file instead of a page, such as a PDF, a spreadsheet or a map image. By default, the browser decides what to do: it may show the file, or save it. The `download` attribute asks the browser to save it, and it can suggest a file name.",
            why: "Visitors who need a map, a form or a price list want it on their device, quickly. Linking to it clearly, and saying what it is, saves them from guessing, and from opening a file that is much larger than they expected.",
            mentalModel: "Think of a counter at a tourist office. One leaflet is for reading on the spot, and another is for taking away. The `download` attribute is the sign that says \"take one\".",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the two links.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><a href="files/ridge-map.pdf">View the trail map</a></p>
    <p><a href="files/ridge-map.pdf" download>Download the trail map</a></p>`,
            },
            {
              type: "paragraph",
              text: "The first link points at the PDF with no extra instructions. Most browsers open a PDF in a tab, so the visitor reads it right there, and they can save it from the viewer if they want. The second link has the `download` attribute, which has no value, and a click saves the file to the device, without opening it first.",
            },
            {
              type: "paragraph",
              text: "You can give the attribute a value, to suggest the name the file is saved under, such as `download=\"ridge-trail-map.pdf\"`. The visitor can still change it, and the browser may ignore your suggestion in some cases. One thing to know is that `download` only works for files on your own site. For a file on another website, browsers ignore the attribute, and either open the file or save it, as they see fit.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="files/map.pdf" download="ridge-trail-map.pdf">
      Download the trail map (PDF, 2 MB)
    </a>`,
            },
            {
              type: "paragraph",
              text: "Look at the link text in that example. It names the file, and then says the format and the size in brackets. That is the most useful thing you can do for a download link, because people on a slow connection, or with limited data, can decide whether to go ahead. Format matters too, because someone without a spreadsheet program may not want an Excel file.",
            },
            {
              type: "paragraph",
              text: "Should you use `download` at all? For files that browsers show inline, such as PDFs and images, it is your choice, and it depends on whether you want people to read or to keep. For files a browser cannot show, such as a ZIP archive, the browser downloads them anyway, so the attribute is redundant, though harmless, and it documents your intent.",
            },
            {
              type: "paragraph",
              text: "Finally, think about the file itself. Give it a plain name with hyphens, keep its size reasonable, and make sure it is accessible: a scanned page that is only a picture of text cannot be read by a screen reader. A link is only as good as what is at the other end of it.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "links-or-buttons",
          kind: "learn",
          title: "Links or buttons?",
          summary: "When something should be an a element, and when it should be a button.",
          minutes: 8,
          concept: {
            description: "A **link** takes the visitor to somewhere else: another page, another place on the page, or a file. A **button** does something on the current page, such as opening a menu, sending a form or switching a setting. The first uses the `a` element with an `href`, and the second uses the `button` element.",
            why: "The two look similar, and it is tempting to style either one to look like the other. But they behave differently for keyboards, screen readers and browsers, and picking the wrong one breaks things people take for granted, such as opening a link in a new tab with a right click.",
            mentalModel: "Think of a door and a light switch. You walk through a door to get to another room, which is a link. You flip a switch to change something in the room you are in, which is a button.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and compare the two. The first goes somewhere, and the second does something.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><a href="rules.html">Read the trail rules</a></p>
    <p><button type="button">Show the map legend</button></p>`,
            },
            {
              type: "paragraph",
              text: "Both can be reached with the Tab key, but they respond to different keys. A link is followed with Enter, while a button is pressed with Enter or with the Space bar. A screen reader announces the first as a \"link\" and the second as a \"button\", and that tells the user what to expect before they press anything. If the announcement is wrong, they are confused.",
            },
            {
              type: "paragraph",
              text: "Links have extra powers that buttons lack. You can open one in a new tab, copy its address, bookmark it, and see where it goes at the bottom of the window. These abilities all depend on the `href`. A `button` has no address, so none of that works, and a visitor who tries it gets nothing.",
            },
            {
              type: "paragraph",
              text: "That is why one common shortcut is a mistake. Developers sometimes write `<a href=\"#\">` and attach a script to make it open a menu. The `#` goes nowhere, so the page may jump to the top, and the element is announced as a link when it is really a button. If it does something on the page, use a `button`, and style it however you like.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- Avoid: a link that is really a button -->
    <a href="#">Open the menu</a>
    
    <!-- Better -->
    <button type="button">Open the menu</button>`,
            },
            {
              type: "paragraph",
              text: "The opposite mistake happens too. A `button` with a script that sets the page address pretends to be a link, but it cannot be opened in a new tab, and it does not show a destination. If the result is a different page, write a real link, and style it like a button if the design calls for it.",
            },
            {
              type: "paragraph",
              text: "You will meet the `button` element properly in the forms topic, along with its `type` attribute, where `submit` sends a form and `button` does nothing on its own. For now, remember the simple test: if the answer to \"where does this take me?\" makes sense, use a link, and if the answer is \"nowhere, it just does something\", use a button.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "images-and-cards-as-links",
          kind: "learn",
          title: "Images and cards as links",
          summary: "Wrapping an image or a block of content in a link, and keeping the text meaningful.",
          minutes: 8,
          concept: {
            description: "An `a` element can wrap more than text. You can put an image inside it, and the picture becomes the link. In modern HTML, an `a` can also wrap larger pieces, such as a heading and a paragraph together, as long as they do not contain another link or button.",
            why: "Logos, thumbnails and cards are links on nearly every site. The risk is that the visitor, and especially a screen reader user, needs words to know where the link goes. A picture alone has none, so you must provide them.",
            mentalModel: "Think of a postcard on a shop wall that you can pull to open a drawer. A person can see the picture, but a person who cannot see it needs a label that says what is inside.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's start with an image link. Open the example in the Playground. The picture file does not exist in the Playground, so you will see its alt text in place of the image, and that is exactly what a screen reader would announce.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="ridge-trail.html">
      <img src="ridge.jpg" alt="Ridge Trail guide">
    </a>`,
            },
            {
              type: "paragraph",
              text: "The `img` element, which you will meet in the images topic, has an `alt` attribute that describes the picture. When an image is the only content of a link, its alt text becomes the link text. So the alt should say where the link goes, \"Ridge Trail guide\", and not what the picture shows, \"A hill in the sun\". If the image is a logo that links to the home page, the alt might be \"Park home page\".",
            },
            {
              type: "paragraph",
              text: "If the link also contains text, you do not need the picture to repeat it. In that case, an empty `alt=\"\"` tells screen readers to skip the image, so the link is not read twice. This is common in cards, where a photo sits beside a title that is also part of the link.",
            },
            {
              type: "paragraph",
              text: "Now a card. Modern HTML allows an `a` to wrap block content, and that makes the whole card clickable. Open the next example.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="ridge-trail.html">
      <h3>Ridge Trail</h3>
      <p>Seven kilometres of views.</p>
    </a>`,
            },
            {
              type: "paragraph",
              text: "That works, but there is a catch. A screen reader reads the entire card as one long link, \"Ridge Trail Seven kilometres of views\", which is wordy. A neater pattern is to put the link around the heading only, and let CSS stretch its clickable area over the whole card. You will learn how in the positioning topic. The result is a short, clear link that looks like a big target.",
            },
            {
              type: "paragraph",
              text: "Two rules keep cards safe. First, never put a link inside another link, because HTML does not allow it, and browsers repair the markup in ways you did not plan. Second, never put a button, or another interactive element, inside a link. If your card needs a \"Save\" button as well as a link, keep them side by side, and not nested.",
            },
            {
              type: "paragraph",
              text: "Whatever you wrap, ask the same question as before: if someone heard only the link, would they know where it goes? If the answer is yes, the structure is sound, and the visual design can be as bold as you like.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "link-states-and-focus",
          kind: "learn",
          title: "Link states and focus",
          summary: "How links change when visited, hovered and focused, and why you must keep them recognisable.",
          minutes: 8,
          concept: {
            description: "A link has several **states**. It can be unvisited, visited, hovered by the pointer, focused by the keyboard, or being pressed. CSS can style each one with a pseudo-class: `:link`, `:visited`, `:hover`, `:focus-visible` and `:active`.",
            why: "States are feedback. They tell visitors where they have already been, what they are about to select, and where the keyboard is. A page with no visible focus is almost unusable for someone who does not use a mouse.",
            mentalModel: "Think of a trail with markers. A marker looks different once you have passed it, and a torch lights the one in front of you. States do the same for links.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and press Tab to move through the links while you watch their appearance change.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      a:link { color: #0b57d0; }
      a:visited { color: #6b21a8; }
      a:hover { text-decoration-thickness: 3px; }
      a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
      a:active { color: #b91c1c; }
    </style>
    
    <p><a href="#one">First link</a> and <a href="#two">second link</a>.</p>`,
            },
            {
              type: "paragraph",
              text: "The browser gives you a decent set of defaults: blue for unvisited, purple for visited, and a focus ring. The CSS above changes each one. The order matters, because the rules have equal weight, so later ones win when two states apply at once. A common way to remember it is \"love and hate\", for link, visited, hover, active, with focus placed with them.",
            },
            {
              type: "paragraph",
              text: "Of all the states, focus matters most. The `:focus-visible` pseudo-class applies when the browser decides focus should be shown, which is mainly for keyboard users. Never remove the ring with `outline: none` unless you replace it with something just as clear. A focus style needs good contrast against the background, and it must not be hidden by a neighbouring element.",
            },
            {
              type: "paragraph",
              text: "Your links should still look like links. Colour on its own is not enough, because some people cannot tell colours apart, so keep the underline, or add another cue such as weight. The default underline is there for a reason. If you remove it in the body text, make sure links are otherwise obvious, with a strong colour difference from the text around them.",
            },
            {
              type: "paragraph",
              text: "The `:visited` state has a limit. For privacy, browsers only let you change a few things about visited links, mostly colours, so a page cannot discover which sites a visitor has seen. Do not rely on it for important design, and make sure that the visited colour is still readable, because a faint purple on a dark background can vanish.",
            },
            {
              type: "paragraph",
              text: "Finally, a small link with a big effect: the skip link. It is the first link on a page, and it jumps over the navigation to the main content, so a keyboard user does not have to tab through dozens of links on every page. It is hidden until it receives focus.",
            },
            {
              type: "code",
              language: "html",
              code: `<a class="skip" href="#content">Skip to content</a>
    <!-- navigation goes here -->
    <h1 id="content">Trail guide</h1>`,
            },
            {
              type: "paragraph",
              text: "You now have the full picture of how a link looks and feels. In the last lesson of this topic, you will see how to keep your links working as a site grows and changes.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "link-look-explorer",
          kind: "visualizer",
          title: "Link look explorer",
          summary: "Restyle the links in a paragraph and find out how little it takes to make them stop looking like links.",
          minutes: 8,
          concept: {
            description: "A short paragraph has three links in it. Controls change the colour, the underline and the weight of every link. The links keep working however you style them, but they only look like links while something sets them apart from the words around them.",
            why: "It is easy to remove the underline because it looks tidier, and then find that nobody can tell where the links are. Dragging a control until the links vanish into the text makes the cost of that choice plain, and shows how much a colour and an underline are doing.",
            mentalModel: "Imagine a street sign painted the same colour as the wall behind it. It still says where to go, but nobody sees it, so it might as well not be there.",
          },
          stage: {
            html: "<p class=\"text\">Read the <a class=\"link\" href=\"#rules\">trail rules</a>, then <a class=\"link\" href=\"#map\">download the map</a> and <a class=\"link\" href=\"#email\">email the rangers</a> before you set off.</p>",
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .text { margin: 16px; max-width: 32rem; font-size: 16px; line-height: 1.7; color: #e2e8f0; }`,
            annotate: "none",
            target: ".text",
            items: ".text",
            itemCount: 1,
          },
          starter: `.text .link {
      color: #38bdf8;
      text-decoration: underline;
      font-weight: 400;
    }
    `,
          controls: [
            {
              id: "color",
              label: "link colour",
              selector: ".text .link",
              property: "color",
              fallback: "#38bdf8",
              type: "options",
              options: ["#38bdf8", "#fbbf24", "#4ade80", "#e2e8f0"],
              help: "The last colour matches the text around it.",
            },
            {
              id: "decoration",
              label: "text-decoration",
              selector: ".text .link",
              property: "text-decoration",
              fallback: "underline",
              type: "options",
              options: ["underline", "none"],
              help: "Colour alone is not enough for everyone to spot a link.",
            },
            {
              id: "weight",
              label: "font-weight",
              selector: ".text .link",
              property: "font-weight",
              fallback: "400",
              type: "options",
              options: ["400", "600", "700"],
              help: "Weight is one more cue that sets a link apart.",
            },
          ],
          presets: [
            {
              id: "vanish",
              label: "Invisible links",
              description: "same colour, no underline",
              css: ".text .link { color: #e2e8f0; text-decoration: none; font-weight: 400; }",
            },
            {
              id: "colour",
              label: "Colour only",
              description: "no underline, not enough for everyone",
              css: ".text .link { color: #4ade80; text-decoration: none; }",
            },
            {
              id: "clear",
              label: "Clear links",
              description: "colour, underline and weight",
              css: ".text .link { color: #fbbf24; text-decoration: underline; font-weight: 700; }",
            },
          ],
          challenge: {
            title: "Make the links unmistakable",
            description: "Give the links the amber colour `#fbbf24`, keep them underlined and make them bold, with a `font-weight` of `700`. They should stand out from the paragraph in three ways at once.",
            hints: [
              "Three declarations in the one `.text .link` rule: `color`, `text-decoration` and `font-weight`.",
              "Amber is `#fbbf24`, and bold is `700`.",
              "`.text .link { color: #fbbf24; text-decoration: underline; font-weight: 700; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".text .link",
                property: "color",
                expected: ["#fbbf24", "rgb(251, 191, 36)"],
                message: "The links are amber",
              },
              {
                type: "computedStyle",
                selector: ".text .link",
                property: "text-decoration",
                expected: ["underline", "underline solid rgb(251, 191, 36)"],
                message: "...still underlined",
              },
              {
                type: "computedStyle",
                selector: ".text .link",
                property: "font-weight",
                expected: ["700", "bold"],
                message: "...and bold.",
              },
            ],
            solution: `.text .link {
      color: #fbbf24;
      text-decoration: underline;
      font-weight: 700;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "click-area-explorer",
          kind: "visualizer",
          title: "Click area explorer",
          summary: "Three links in a row, each with a visible box. Change their display and padding to see how large the clickable area really is.",
          minutes: 8,
          concept: {
            description: "Each link has a dashed outline that shows the area a finger or a pointer can hit. By default a link is only as big as its words. Controls change its `display` and its `padding`, and the outline grows, so you can see how the clickable area follows the box and not the text.",
            why: "Small links are hard to tap, especially on a phone. People often assume the link is just the words, when the whole box around them is clickable. Seeing the area grow as padding grows shows how to build a comfortable target without changing the text.",
            mentalModel: "Think of a light switch with a large plate around it. The switch itself is small, but the plate gives your hand room, and pressing anywhere on it works.",
          },
          stage: {
            html: "<p class=\"menu\"><a class=\"link\" href=\"#trails\">Trails</a> <a class=\"link\" href=\"#contact\">Contact</a> <a class=\"link\" href=\"#downloads\">Downloads</a></p>",
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .menu { margin: 16px; line-height: 1.6; }
    .link { color: #38bdf8; background: #1e293b; border: 1px dashed #64748b; text-decoration: none; }`,
            annotate: "box",
            target: ".link",
            items: ".link",
            itemCount: 3,
          },
          starter: `.link {
      display: inline;
      padding: 0px;
    }
    `,
          controls: [
            {
              id: "display",
              label: "display",
              selector: ".link",
              property: "display",
              fallback: "inline",
              type: "options",
              options: ["inline", "inline-block", "block"],
              help: "A block link fills the whole row.",
            },
            {
              id: "padding",
              label: "padding",
              selector: ".link",
              property: "padding",
              fallback: "0px",
              type: "range",
              min: 0,
              max: 24,
              step: 4,
              unit: "px",
              help: "Space between the words and the border.",
            },
          ],
          presets: [
            {
              id: "tight",
              label: "Tight",
              description: "just the words",
              css: ".link { display: inline; padding: 0px; }",
            },
            {
              id: "tap",
              label: "Tap friendly",
              description: "padded inline blocks",
              css: ".link { display: inline-block; padding: 12px; }",
            },
            {
              id: "row",
              label: "Full rows",
              description: "block links with padding",
              css: ".link { display: block; padding: 12px; }",
            },
          ],
          challenge: {
            title: "Build a comfortable target",
            description: "Make each link an `inline-block` with `12px` of padding, so the clickable area is a roomy box and not just the words.",
            hints: [
              "Two declarations in the `.link` rule: `display` and `padding`.",
              "The display value that keeps links in a row but lets padding grow is `inline-block`.",
              "`.link { display: inline-block; padding: 12px; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".link",
                property: "display",
                expected: ["inline-block"],
                message: "The links are `inline-block`",
              },
              {
                type: "computedStyle",
                selector: ".link",
                property: "padding",
                expected: ["12px"],
                message: "...with `12px` of padding.",
              },
            ],
            solution: `.link {
      display: inline-block;
      padding: 12px;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "keeping-links-healthy",
          kind: "learn",
          title: "Keeping links healthy",
          summary: "Broken links, redirects, link rot, and the habits that keep a site working.",
          minutes: 8,
          concept: {
            description: "A link is **broken** when its destination no longer exists, or never did. The visitor sees an error page, usually with the code 404, which means \"not found\". Over time, even working links fail as pages are renamed, moved or deleted, a decay known as link rot.",
            why: "A broken link wastes a visitor's time and makes a site look neglected. It also hurts search engines' trust in your pages. Most broken links come from small, avoidable mistakes, so a few habits prevent nearly all of them.",
            mentalModel: "Picture a library that moves its shelves without updating the catalogue. The catalogue still says where a book used to be, and every reader ends up at an empty shelf.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's look at the usual causes. Open the example in the Playground, and read each link's address carefully against the list below it.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><a href="Ridge-Trail.html">Wrong capital letters</a></p>
    <p><a href="ridge trail.html">A space in the name</a></p>
    <p><a href="walks/ridge.htm">Wrong extension</a></p>
    <p><a href="#Safety">Wrong id case</a></p>`,
            },
            {
              type: "paragraph",
              text: "Each of these has a different cause. Many servers treat upper and lower case letters as different, so the first link may fail when the file is `ridge-trail.html`. The second has a space, which the browser turns into `%20`, and it is a poor habit. The third uses an extension that does not match the real file, and the fourth has an id with the wrong case. All four are typing mistakes, and all four fail silently.",
            },
            {
              type: "paragraph",
              text: "The simplest defence is to test. Before you share a page, click every link on it. Check them on a phone too, because tap targets and tel and mailto links behave differently there. For a larger site, free link-checking tools can scan every page and report the ones that return an error.",
            },
            {
              type: "paragraph",
              text: "The second defence is to change addresses as rarely as you can. If a page must move, leave a redirect behind: a rule on the server that sends visitors from the old address to the new one. Redirects keep old bookmarks, old search results and links from other sites alive, and your host's documentation will say how to set them up.",
            },
            {
              type: "paragraph",
              text: "Links to other sites are the hardest to control, because you do not own the destination. Link to stable pages, such as an organisation's main page, and not to a news item that may vanish. For anything essential, name the source in your text, so readers can find it again if the address dies.",
            },
            {
              type: "code",
              language: "html",
              code: "<p>Read the <a href=\"https://example.com/forecast\">forecast from the national weather service</a>.</p>",
            },
            {
              type: "paragraph",
              text: "You may be tempted to add a `title` attribute to every link to explain it. Use it sparingly. Tooltips do not appear on touchscreens, and keyboard users may not see them, so anything important belongs in the visible text. If a link needs a note, write the note beside it, in plain words.",
            },
            {
              type: "paragraph",
              text: "To sum up the topic, a good link has a working address, text that says where it goes, a safe `rel` when it opens a new tab, a clear look and a visible focus. Write each one with care, and test the result. A site made of reliable links is a site people trust and come back to.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-risky-links",
          kind: "debug",
          title: "Debug: the risky links",
          mode: "html",
          summary: "These links all work, or almost work, but each one has a habit that causes trouble. Make them safe and clear.",
          minutes: 8,
          broken: {
            html: `<h1>Contact and links</h1>
    <p>Read the <a href="https://example.com/forecast" target="_blank">forecast</a>.</p>
    <p>For the rules, <a href="rules.html">click here</a>.</p>
    <p>Email us at <a href="rangers@example.com">rangers@example.com</a>.</p>`,
            css: "",
          },
          challenge: {
            title: "Make the links safe and clear",
            description: "Three links have problems. The new-tab link is missing the safe `rel` value, the rules link says `click here`, and the email link has no scheme, so the browser treats it as a file. Fix each one, and keep the addresses of the forecast and rules links as they are.",
            hints: [
              "A link with `target=\"_blank\"` also needs `rel=\"noopener noreferrer\"`.",
              "Link text should say where the link goes, so rewrite `click here` as a short description of the rules.",
              "An email link starts with `mailto:`, as in `mailto:rangers@example.com`.",
            ],
            checks: [
              {
                type: "attribute",
                selector: "a[target=\"_blank\"]",
                attribute: "rel",
                message: "The new-tab link has `rel=\"noopener noreferrer\"`",
                expected: "noopener noreferrer",
              },
              {
                type: "text",
                selector: "a[href=\"rules.html\"]",
                includes: "rules",
                message: "...the rules link says what it is, not `click here`",
              },
              {
                type: "exists",
                selector: "a[href=\"mailto:rangers@example.com\"]",
                message: "...and the email link uses `mailto:`.",
              },
            ],
            solution: {
              html: `<h1>Contact and links</h1>
    <p>Read the <a href="https://example.com/forecast" target="_blank" rel="noopener noreferrer">forecast</a>.</p>
    <p>For the rules, <a href="rules.html">read the trail rules</a>.</p>
    <p>Email us at <a href="mailto:rangers@example.com">rangers@example.com</a>.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    buildATrailDirectory,

    /* ------------------------------------------------------------------ */
    {
          id: "links-quiz",
          kind: "quiz",
          title: "Quiz: links",
          summary: "Seventeen questions on the a element, URLs, paths, fragments, link text, new tabs, special schemes, downloads, buttons, focus and healthy links.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "Which attribute of the `a` element holds the address that the link goes to?",
              options: ["`src`", "`href`", "`link`", "`target`"],
              answerIndex: 1,
              explanation: "The `href` attribute, short for hypertext reference, holds the destination. An `a` without it is only a placeholder.",
            },
            {
              prompt: "What happens with `<a hef=\"page.html\">Page</a>`?",
              options: [
                "It works like a normal link",
                "It opens in a new tab",
                "The browser corrects the spelling",
                "It is not a link, because the attribute name is misspelt",
              ],
              answerIndex: 3,
              explanation: "Browsers ignore attributes they do not recognise, so the anchor has no destination and nobody is warned.",
            },
            {
              prompt: "Which of these is an absolute URL?",
              options: ["`https://example.com/ridge.html`", "`../about.html`", "`/index.html`", "`ridge.html`"],
              answerIndex: 0,
              explanation: "An absolute URL carries its own scheme and host, so it points at exactly one place from anywhere.",
            },
            {
              prompt: "Why do developers prefer relative links between the pages of their own site?",
              options: [
                "They load faster",
                "They are required by HTML",
                "They keep working when the site moves to a new address",
                "They hide the address from visitors",
              ],
              answerIndex: 2,
              explanation: "The browser works out the full address from the page the link is on, so moving the whole site does not break them.",
            },
            {
              prompt: "A page is in the `walks` folder. What does `../about.html` reach?",
              options: [
                "`walks/about.html`",
                "`about.html` in the folder above `walks`",
                "`about.html` inside `images`",
                "Nothing, `..` is not allowed",
              ],
              answerIndex: 1,
              explanation: "The two dots go up one folder, and then the file name follows.",
            },
            {
              prompt: "What does `href=\"#safety\"` do?",
              options: [
                "Loads a page called safety",
                "Downloads a file",
                "Opens an email",
                "Scrolls to the element with `id=\"safety\"` on the same page",
              ],
              answerIndex: 3,
              explanation: "The hash means \"on this page\", and the name after it must match an element's id.",
            },
            {
              prompt: "A link says `href=\"#Safety\"` and the heading has `id=\"safety\"`. What happens?",
              options: [
                "It works, because case does not matter",
                "The browser fixes it",
                "Nothing, because ids are case sensitive",
                "The page reloads",
              ],
              answerIndex: 2,
              explanation: "Ids match letter for letter, including case. When nothing matches, the page simply stays where it is.",
            },
            {
              prompt: "Which link text is best?",
              options: ["`Read the new trail rules`", "`Read more`", "`Click here`", "`https://example.com/rules`"],
              answerIndex: 0,
              explanation: "Good link text says where the link goes and makes sense when read on its own.",
            },
            {
              prompt: "What should a link that opens in a new tab include?",
              options: [
                "`target=\"_blank\"` only",
                "`target=\"_blank\"` and `rel=\"noopener noreferrer\"`",
                "`rel=\"new\"`",
                "`href=\"_blank\"`",
              ],
              answerIndex: 1,
              explanation: "The `rel` keywords stop the new page reaching back to yours and stop the referrer being shared.",
            },
            {
              prompt: "Which is the usual advice about opening links in new tabs?",
              options: [
                "Do it for every link",
                "Never do it, for any reason",
                "Only do it for email",
                "Let visitors choose, and use it only when there is a good reason",
              ],
              answerIndex: 3,
              explanation: "Visitors who want a new tab can open one. Those who do not have no easy way to undo the choice.",
            },
            {
              prompt: "What is missing from `<a href=\"rangers@example.com\">Email</a>`?",
              options: ["The `mailto:` scheme", "The `target` attribute", "A closing slash", "The `download` attribute"],
              answerIndex: 0,
              explanation: "Without the scheme, the browser treats the value as a file path, and the visitor lands on a \"not found\" page.",
            },
            {
              prompt: "What does the `download` attribute ask the browser to do?",
              options: ["Open the file in a new tab", "Hide the file", "Save the file to the visitor's device", "Compress the file"],
              answerIndex: 2,
              explanation: "It asks for the file to be saved, and its value can suggest a file name. It only works for files on your own site.",
            },
            {
              prompt: "Which element should open a menu on the current page when pressed?",
              options: ["`<a href=\"#\">`", "`<button type=\"button\">`", "`<span>`", "`<h2>`"],
              answerIndex: 1,
              explanation: "A button does something on the page. A link goes somewhere, and its address is what lets it open in a new tab or be bookmarked.",
            },
            {
              prompt: "An image is the only content of a link. What does a screen reader use as the link text?",
              options: ["The file name", "Nothing", "The `title` of the page", "The image's `alt` text"],
              answerIndex: 3,
              explanation: "The alt text becomes the link text, so it should say where the link goes.",
            },
            {
              prompt: "Which is not allowed in HTML?",
              options: ["A link around an image", "A link around a heading", "A link inside another link", "A link inside a paragraph"],
              answerIndex: 2,
              explanation: "Links cannot be nested, and browsers repair the markup in ways you did not plan.",
            },
            {
              prompt: "Why must you not remove the focus outline from links without a replacement?",
              options: [
                "Keyboard users could not see where they are on the page",
                "It breaks the link",
                "It makes the page slower",
                "It changes the address",
              ],
              answerIndex: 0,
              explanation: "The focus style tells keyboard users which link they are about to follow.",
            },
            {
              prompt: "What is a redirect for?",
              options: [
                "Making a link open in a new tab",
                "Sending visitors from an old address to the new one after a page moves",
                "Hiding a link from search engines",
                "Styling a visited link",
              ],
              answerIndex: 1,
              explanation: "Redirects keep old bookmarks, search results and outside links working after you move a page.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "links-review",
          kind: "review",
          title: "Review: links",
          summary: "The anatomy of a link, URLs and paths, fragments, link text, new tabs, schemes, downloads, buttons, states and upkeep.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "A link is an `a` element with an `href`, and the text between the tags is what people see. Use an absolute URL, with a scheme and host, for other sites. Use a relative path for the pages of your own site: a bare name for the same folder, `../` to go up, a folder name to go down, and a leading slash to start from the top.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="https://example.com/forecast">Forecast</a>
    <a href="ridge.html">Same folder</a>
    <a href="../about.html">One folder up</a>
    <a href="#safety">Same page, id safety</a>`,
            },
            {
              type: "paragraph",
              text: "An id has no hash, and the link to it has one, matching letter for letter. Write link text that says where the link goes, and that still makes sense read on its own, so never use \"click here\". Open a new tab only for a good reason, and give that link `rel=\"noopener noreferrer\"`.",
            },
            {
              type: "code",
              language: "html",
              code: `<a href="mailto:rangers@example.com">Email the rangers</a>
    <a href="tel:+15550142">Call 555 0142</a>
    <a href="files/map.pdf" download>Trail map (PDF, 2 MB)</a>`,
            },
            {
              type: "paragraph",
              text: "The scheme decides what a link does: `mailto:` writes an email, `tel:` starts a call, and a link to a file can carry `download`. If a link goes somewhere, use `a`, and if it does something on the page, use `button`. When an image is the only content of a link, its alt text is the link text, and links never nest.",
            },
            {
              type: "paragraph",
              text: "Keep links recognisable, with an underline or another cue beyond colour, and always keep a clear focus style. Test every link, leave redirects when pages move, and avoid depending on a `title` for anything important. If you can cover everything except the links and still tell what each one does, the page is in good shape.",
            },
          ],
        },
  ],
};

export default content;
