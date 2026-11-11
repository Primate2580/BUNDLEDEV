import type { TopicContent } from "@/engine/types";
import buildADayOutGuide from "./lists/workshops/build-a-day-out-guide/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-list",
          kind: "learn",
          title: "What is a list?",
          summary: "Why HTML has list elements, and the three kinds you will use.",
          minutes: 8,
          concept: {
            description: "A **list** is a group of related items that belong together. HTML has three kinds: an unordered list, for items where the order does not matter, an ordered list, for steps or rankings, and a description list, for pairs of a term and its explanation. Each one uses its own set of elements.",
            why: "Lists are everywhere on the web: menus, steps in a recipe, the things on a packing list, the links in a footer. When you mark a list up properly, browsers and screen readers know that the items belong together, and they can say \"list, four items\" before reading them out.",
            mentalModel: "Think of a shopping list on a fridge. The items are separate, but they belong to one piece of paper, and the paper tells you how many there are. A list element is that piece of paper, and each item sits on its own line.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's start with the simplest one. Open the example in the Playground and look at the markup before you read on.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>Boots</li>
      <li>Water bottle</li>
      <li>Rain jacket</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "The `ul` element stands for unordered list, and it wraps the whole group. Each item sits in its own `li` element, which stands for list item. The browser puts a bullet in front of every item and indents the list a little, and those are only default looks. What matters is that the list itself has a clear start, a clear end, and a number of items.",
            },
            {
              type: "paragraph",
              text: "You may be tempted to build the same thing with a paragraph and a few line breaks, or with dashes at the start of each line. It looks similar on the screen, but it carries none of the meaning. A screen reader cannot tell people how many items there are, a visitor cannot jump from item to item, and the markup is harder to style. Real lists cost nothing extra to write, so use them.",
            },
            {
              type: "paragraph",
              text: "The second kind is the ordered list. It looks almost the same, but the `ol` element tells the browser that the order matters, so it numbers the items for you.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol>
      <li>Park at the old mill.</li>
      <li>Follow the creek path.</li>
      <li>Cross the wooden bridge.</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "Use it for steps in a process, or for a ranking, where moving an item would change the meaning. If you add a new step between the first and the second, the numbers update by themselves, and you never have to renumber anything by hand.",
            },
            {
              type: "paragraph",
              text: "The third kind is different in shape. A description list pairs each term with its description, using `dl`, `dt` and `dd`. You will meet it in a later lesson, and you will see that it suits glossaries and details such as a name and a value.",
            },
            {
              type: "paragraph",
              text: "A good way to choose is to ask three questions. Is this a group of related items? If it is, then use a list. Does the order matter? If so, it is an ordered list, and if not, an unordered one. Is each item a term with an explanation? Then a description list is likely the best fit.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "unordered-lists",
          kind: "learn",
          title: "Unordered lists",
          summary: "ul and li: bullets, items, and what belongs inside them.",
          minutes: 8,
          concept: {
            description: "An **unordered list** is a group of items where the order does not change the meaning. You write it with a `ul` element, and each item goes in an `li` element inside it. Browsers draw a bullet beside each item by default.",
            why: "Most lists on a page are unordered: things to pack, features of a product, links in a menu, names of the team. They are the list you will write most often, so it pays to know exactly what is allowed inside one, and what is not.",
            mentalModel: "Picture a bag of groceries. You can take things out in any order, and the shopping is the same. Nothing in the bag comes first.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at how the elements are nested.",
            },
            {
              type: "code",
              language: "html",
              code: `<h2>What to bring</h2>
    <ul>
      <li>Sturdy boots</li>
      <li>Two litres of water</li>
      <li>A light rain jacket</li>
      <li>A paper map</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "The `ul` has only `li` elements as its direct children, and that is a rule worth remembering. You cannot put a paragraph or a heading straight into a `ul`, because browsers expect only items there. If you want a paragraph, put it inside an `li`. Everything that belongs to one item goes inside that one `li`.",
            },
            {
              type: "paragraph",
              text: "The text of each item can be as short as a word or as long as a few sentences. Short items are easier to scan, so when a list item grows into a paragraph, ask whether you really need a list. A good list item is often a phrase or a single sentence, and several items share a similar shape, such as all beginning with a noun.",
            },
            {
              type: "paragraph",
              text: "You can put more than text in an item. A link, a bold word, an image or even a second list can sit inside an `li`, and the next lesson shows how nested lists work. For now, notice that the `li` is the container, and whatever you put in it travels with the item.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li><a href="boots.html">Sturdy boots</a></li>
      <li><strong>Two litres</strong> of water</li>
      <li>A light rain jacket</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "If an item needs a comment, such as a reason, keep it short and put it after the main words, so a reader scanning the first words of each line still understands the list. Avoid a list with a single item, because there is nothing to group.",
            },
            {
              type: "paragraph",
              text: "One more practical point: the order you write the items is the order they appear, so even an unordered list has an order on the page. The word unordered means only that the order carries no meaning. Many people put items in a sensible sequence anyway, such as the most important first, because readers tend to read from the top.",
            },
            {
              type: "paragraph",
              text: "A final habit: write each list as a single `ul`, and never close it and open another one just to add a bullet. Two lists next to each other are announced as two lists, which would confuse listeners. Keep related items in one group, and the page makes sense.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "ordered-lists",
          kind: "learn",
          title: "Ordered lists",
          summary: "ol and li: numbered steps, and the cases where order really matters.",
          minutes: 8,
          concept: {
            description: "An **ordered list** is a group of items whose order matters, such as steps in a method or places in a ranking. You write it with an `ol` element, with each item in an `li`, just like an unordered list. The browser numbers the items automatically, starting from 1.",
            why: "Instructions only work in the right order. If the numbers are typed by hand, they go wrong the moment someone adds or removes a step. An `ol` keeps the numbers right for you, and it tells assistive tools that the sequence is part of the meaning.",
            mentalModel: "Think of a recipe card. The steps are numbered because you must do them in order, and if the writer adds a new step, every later number moves along by one.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. Read it as a set of directions, and notice that the numbers do not appear anywhere in the code.",
            },
            {
              type: "code",
              language: "html",
              code: `<h2>Getting to the bridge</h2>
    <ol>
      <li>Park at the old mill.</li>
      <li>Follow the creek path for one kilometre.</li>
      <li>Turn left at the stone marker.</li>
      <li>Cross the wooden bridge.</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "The browser draws 1, 2, 3 and 4 beside the items. Those numbers belong to the browser's default styling, not to your text, so you should never type them yourself. If you wrote \"1.\" at the start of an item, you would see the number twice, and the numbers would not move when the list changes.",
            },
            {
              type: "paragraph",
              text: "A useful test for choosing `ol` is to ask whether swapping two items would change the meaning. If it would, as in \"turn left\" and then \"cross the bridge\", use an ordered list. If it would not, as in a list of items to pack, use an unordered one. Rankings count too, such as \"the five best views\", where the position carries the message.",
            },
            {
              type: "paragraph",
              text: "Each step should do one thing, and begin with a verb where possible. A step that says \"Park, then walk to the creek, and then turn left\" is three steps hiding in one. Splitting it makes the list easier to follow, and gives people a clear place to stop and check where they are. If a list of steps runs past eight or ten items, think about splitting it under headings, so each part has a clear goal. That small effort pays off when someone follows the steps with muddy hands.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol>
      <li>Park at the old mill.</li>
      <li>Walk to the creek.</li>
      <li>Turn left at the stone marker.</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "You can still put other things in an item, such as a note, a link or a picture, and a step can even contain another list. The numbers belong to the `li` elements that are direct children of the `ol`, so a nested list starts its own count. You will practise that when you reach nested lists.",
            },
            {
              type: "paragraph",
              text: "In the next lesson you will see the attributes that let you start from a different number, count backwards, or change the style of the numbers. For now, remember the basic rule: when order matters, write `ol`, and let the browser do the counting.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "ordered-list-attributes",
          kind: "learn",
          title: "Ordered list attributes",
          summary: "start, reversed, type and value: changing how a list is numbered.",
          minutes: 8,
          concept: {
            description: "The `ol` element has three attributes that change its numbering. `start` sets the first number, `reversed` counts down instead of up, and `type` changes the style of the markers, such as letters or Roman numerals. The `li` element also has a `value` attribute that sets its own number.",
            why: "Sometimes a list continues from an earlier one, counts down to a launch, or follows a style such as the clauses of a contract. These attributes let you describe that in the HTML, so the numbers stay correct and keep their meaning, whatever the stylesheet does.",
            mentalModel: "Think of numbered pages in a book. A chapter may begin on page 5 because earlier chapters came first, and an appendix may use Roman numerals. The attributes are the instructions that tell the printer how to number each part.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with `start`. Open the example in the Playground. The list picks up at 5, as if it continued an earlier list.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol start="5">
      <li>Change your boots.</li>
      <li>Sign the visitor book.</li>
      <li>Return the map.</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "The value is a plain number, and the following items count on from it, so you see 5, 6 and 7. This is useful when you interrupt a numbered list with a paragraph, a picture or a heading, and then carry on. Always use `start` rather than typing numbers into the text.",
            },
            {
              type: "paragraph",
              text: "Now `reversed`. It is a boolean attribute, which means you write it with no value, and its presence is enough. The items count down, so the first item shows the highest number.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol reversed>
      <li>Third place: Mill Creek</li>
      <li>Second place: Heron Lake</li>
      <li>First place: Ridge Trail</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "The browser works out how many items there are and starts from that number, so this list shows 3, 2 and 1. It suits countdowns and top-ten lists written from the bottom up. You can combine it with `start`, if you want the countdown to begin from a number of your own.",
            },
            {
              type: "paragraph",
              text: "The `type` attribute changes the markers. The value `1` gives numbers, `a` and `A` give lower and upper case letters, and `i` and `I` give Roman numerals. It is useful when the marker is part of the meaning, as in the clauses of a legal text. If the style is only a matter of taste, CSS is the better tool, and you will see how in the lesson on styling lists.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol type="A" start="3">
      <li>Choose a route</li>
      <li>Check the weather</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "That list shows C and D, because `start` is a number, even when the markers are letters, and the third letter is C. Finally, the `value` attribute on an `li` resets the count from that item on, so a later item can jump to a new number, and the items after it continue from there. You will rarely need it, but it is good to know that it exists. Check your pages in the browser after using any of these attributes, since a number that looks wrong is an easy mistake to miss.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-numbers",
          kind: "predict",
          title: "Predict the numbers",
          summary: "Four ordered lists with start, reversed, value and type. Work out which marker each chosen item gets.",
          minutes: 7,
          mode: "html",
          intro: "Each ordered list uses a different attribute. Work out the marker beside the item you are asked about, then run the code to look at the lists.",
          code: {
            html: `<ol start="5">
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ol>
    <ol reversed>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
    </ol>
    <ol>
      <li>H</li>
      <li value="10">I</li>
      <li>J</li>
    </ol>
    <ol type="A" start="3">
      <li>K</li>
      <li>L</li>
      <li>M</li>
    </ol>`,
            css: "",
          },
          questions: [
            {
              prompt: "In the first list, which uses `start=\"5\"`, what marker is beside `C`?",
              options: ["3", "5", "7", "C"],
              answerIndex: 2,
              hint: "The first item gets 5. What comes next?",
              explanation: "The numbering starts at 5, so `A` is 5, `B` is 6 and `C` is 7.",
              proves: [
                {
                  type: "attribute",
                  selector: "ol[start=\"5\"]",
                  attribute: "start",
                  message: "The first list starts at 5.",
                  expected: "5",
                },
              ],
            },
            {
              prompt: "The second list has the `reversed` attribute and four items. What number is beside `D`?",
              options: ["1", "4", "0", "3"],
              answerIndex: 1,
              hint: "Reversed lists count down from the number of items.",
              explanation: "The browser counts down from the number of items, so `D` is 4, `E` is 3, `F` is 2 and `G` is 1.",
              proves: [
                {
                  type: "exists",
                  selector: "ol[reversed]",
                  message: "The second list is reversed.",
                },
              ],
            },
            {
              prompt: "In the third list, `I` has `value=\"10\"`. What number is beside `J`?",
              options: ["11", "10", "3", "1"],
              answerIndex: 0,
              hint: "Counting carries on from the item with the value.",
              explanation: "`H` is 1 and `I` is forced to 10, and the count carries on from there, so `J` is 11.",
              proves: [
                {
                  type: "attribute",
                  selector: "li[value=\"10\"]",
                  attribute: "value",
                  message: "One item has `value=\"10\"`.",
                  expected: "10",
                },
              ],
            },
            {
              prompt: "The fourth list has `type=\"A\"` and `start=\"3\"`. What marker is beside `M`?",
              options: ["C", "M", "5", "E"],
              answerIndex: 3,
              hint: "The start is a number, even for letters. Which letter is third?",
              explanation: "`start` is always a number, and the third letter is C, so `K` is C, `L` is D and `M` is E.",
              proves: [
                {
                  type: "exists",
                  selector: "ol[type=\"A\"][start=\"3\"]",
                  message: "The fourth list uses upper-case letters, starting at 3.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-make-a-packing-list",
          kind: "lab",
          title: "Lab: make a packing list",
          mode: "html",
          summary: "Turn a paragraph full of line breaks into a real list, with one item for each thing to pack.",
          minutes: 8,
          starter: {
            html: `<h1>Packing list</h1>
    <p>Boots<br>Water bottle<br>Rain jacket<br>Map</p>`,
            css: "",
          },
          challenge: {
            title: "Make it a real list",
            description: "This packing list is a paragraph with line breaks, which looks like a list but is not one. Replace it with an unordered list that has one `li` for each item: `Boots`, `Water bottle`, `Rain jacket` and `Map`. The order does not matter, and no line breaks should be left.",
            hints: [
              "You need one `ul` and four `li` elements, and the paragraph and its breaks go away.",
              "Each thing to pack gets its own `li`, with only the words of the item inside.",
              "`<ul><li>Boots</li> ... </ul>`",
            ],
            checks: [
              {
                type: "count",
                selector: "ul > li",
                message: "The items are four `li` elements inside a `ul`",
                min: 4,
                max: 4,
              },
              {
                type: "text",
                selector: "ul li",
                includes: "Water bottle",
                message: "...including `Water bottle`",
              },
              {
                type: "count",
                selector: "br",
                message: "...with no line breaks left",
                max: 0,
              },
              {
                type: "count",
                selector: "p",
                message: "...and no paragraph standing in for the list.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Packing list</h1>
    <ul>
      <li>Boots</li>
      <li>Water bottle</li>
      <li>Rain jacket</li>
      <li>Map</li>
    </ul>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "description-lists",
          kind: "learn",
          title: "Description lists",
          summary: "dl, dt and dd: pairing terms with their descriptions.",
          minutes: 8,
          concept: {
            description: "A **description list** is a group of terms and their descriptions. You write it with a `dl` element. Each term goes in a `dt` element, and its description goes in one or more `dd` elements that follow it. Browsers show the descriptions indented below their terms.",
            why: "Many things on the web are pairs: a word and its meaning, a label and its value, a question and its answer. A description list tells browsers and assistive tools that each description belongs to its term, which a pair of plain paragraphs cannot do.",
            mentalModel: "Think of a dictionary. Each entry has a word in bold, and the meaning underneath. The word is the `dt`, and the meaning is the `dd`.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the pairs.",
            },
            {
              type: "code",
              language: "html",
              code: `<dl>
      <dt>Switchback</dt>
      <dd>A sharp turn that lets a path climb a steep slope.</dd>
    
      <dt>Cairn</dt>
      <dd>A pile of stones that marks the way.</dd>
    </dl>`,
            },
            {
              type: "paragraph",
              text: "The `dl` wraps the whole list. Every `dt` is a term, which stands for description term, and every `dd` is its description, which stands for description details. The browser indents each `dd` by default so that the pairs are easy to see, but that is only a default look, and you can restyle it however you like.",
            },
            {
              type: "paragraph",
              text: "The relationship between terms and descriptions is more flexible than it looks. One term can have several descriptions, and several terms can share a description. That makes the list suit more than glossaries.",
            },
            {
              type: "code",
              language: "html",
              code: `<dl>
      <dt>Opening hours</dt>
      <dd>Weekdays, 9am to 5pm</dd>
      <dd>Weekends, 10am to 4pm</dd>
    
      <dt>Phone</dt>
      <dt>Mobile</dt>
      <dd>555 0142</dd>
    </dl>`,
            },
            {
              type: "paragraph",
              text: "In the first pair, one term has two descriptions. In the second, two terms, `Phone` and `Mobile`, share one description. Typical uses include a glossary, the details of a product such as size and colour, the metadata of an article such as author and date, and a short list of facts. Some people also use them for questions and answers, though a list of headings with paragraphs is often just as clear.",
            },
            {
              type: "paragraph",
              text: "Description lists are easy to forget, but they suit any content that is naturally a label and a value. Compare them with a table: a table is for several values in each row, while a description list gives one value, or a few, for each label. Pick whichever matches the shape of your data.",
            },
            {
              type: "paragraph",
              text: "If you need to style each term and description together, you may wrap one group in a `div` inside the `dl`. This is allowed, and it gives you a single element to attach a border or a layout to, without changing the meaning of the list.",
            },
            {
              type: "code",
              language: "html",
              code: `<dl>
      <div>
        <dt>Length</dt>
        <dd>7 km</dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>Two hours</dd>
      </div>
    </dl>`,
            },
            {
              type: "paragraph",
              text: "Be careful not to use a description list just for layout. If you only want text indented, or two things beside each other, CSS can do that. Use `dl` when the content truly is a set of terms and their descriptions, and the structure will carry meaning for everyone who meets your page. Remember that `dt` and `dd` can only be used inside a `dl`.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-steps-and-terms",
          kind: "lab",
          title: "Lab: steps and terms",
          mode: "html",
          summary: "Turn numbered paragraphs into an ordered list, and term and meaning paragraphs into a description list.",
          minutes: 9,
          starter: {
            html: `<h1>Walk notes</h1>
    <h2>Route</h2>
    <p>1. Park at the old mill.</p>
    <p>2. Follow the creek path.</p>
    <p>3. Cross the wooden bridge.</p>
    <h2>Glossary</h2>
    <p>Switchback: a sharp turn that helps a path climb.</p>
    <p>Cairn: a pile of stones that marks the way.</p>`,
            css: "",
          },
          challenge: {
            title: "Choose the right list for each part",
            description: "The route is a set of steps in order, so make it an ordered list with three `li` elements, and delete the typed numbers. The glossary is two terms with their meanings, so make it a description list, with a `dt` and a `dd` for each, and delete the colons. Leave no paragraphs standing in for either list.",
            hints: [
              "The route needs `ol` and `li`, and the glossary needs `dl`, `dt` and `dd`.",
              "The browser numbers an ordered list for you, so the typed `1.`, `2.` and `3.` go away.",
              "`<dt>Switchback</dt>` and `<dd>A sharp turn that helps a path climb.</dd>`",
            ],
            checks: [
              {
                type: "count",
                selector: "ol > li",
                message: "The route is an ordered list of three items",
                min: 3,
                max: 3,
              },
              {
                type: "text",
                selector: "ol li",
                includes: "Park at the old mill",
                message: "...with its steps in the items",
              },
              {
                type: "count",
                selector: "dl > dt",
                message: "...the glossary has two terms",
                min: 2,
                max: 2,
              },
              {
                type: "count",
                selector: "dl > dd",
                message: "...and two descriptions",
                min: 2,
                max: 2,
              },
              {
                type: "text",
                selector: "dt",
                includes: "Switchback",
                message: "...including `Switchback`",
              },
              {
                type: "count",
                selector: "p",
                message: "...and no paragraphs are left.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Walk notes</h1>
    <h2>Route</h2>
    <ol>
      <li>Park at the old mill.</li>
      <li>Follow the creek path.</li>
      <li>Cross the wooden bridge.</li>
    </ol>
    <h2>Glossary</h2>
    <dl>
      <dt>Switchback</dt>
      <dd>A sharp turn that helps a path climb.</dd>
      <dt>Cairn</dt>
      <dd>A pile of stones that marks the way.</dd>
    </dl>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "nesting-lists",
          kind: "learn",
          title: "Nesting lists",
          summary: "Putting a list inside a list item, and the most common mistake with it.",
          minutes: 8,
          concept: {
            description: "A **nested list** is a list inside another list. It always lives inside an `li` of the outer list, never directly inside the `ul` or `ol`. Nested lists show that some items have sub-items, such as categories with entries beneath them.",
            why: "Many real lists have levels: a menu with sub-menus, an outline with sub-points, a packing list with sections. Nesting lets you show that structure, and screen readers can announce which level a listener is on. Getting the nesting right is the main thing to learn about it.",
            mentalModel: "Think of a set of folders on a computer. A folder holds files, and it can also hold another folder with its own files. A nested list works the same way, and the inner list belongs to one item of the outer list.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. Find the inner `ul` and see which `li` contains it.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>Food
        <ul>
          <li>Sandwiches</li>
          <li>Fruit</li>
        </ul>
      </li>
      <li>Drink</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "The word `Food` and the inner `ul` are both inside the same `li`, and the inner list ends before that `li` closes. This is the rule that people most often get wrong. The inner list is part of the item `Food`, so it must be inside it, and the closing `</li>` comes after the inner `</ul>`.",
            },
            {
              type: "paragraph",
              text: "Browsers help you see the levels. By default, a nested unordered list switches its bullets from discs to circles, and the next level down uses squares. Indentation grows at each level too. If you nest ordered lists, each inner list starts counting from 1 again, unless you use `start`.",
            },
            {
              type: "paragraph",
              text: "Now see the mistake. In the next example, the inner list sits directly inside the outer `ul`, beside the `li`, and not inside it.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>Food</li>
      <ul>
        <li>Sandwiches</li>
      </ul>
      <li>Drink</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "Most browsers still draw something that looks like a nested list, but the markup is invalid. The inner list has no parent item, so assistive tools may not understand which item it belongs to, and the structure may be announced wrongly. A quick way to catch it is to ask what the `ul` has inside it: only `li` elements should be there.",
            },
            {
              type: "paragraph",
              text: "When you edit a nested list, check the closing tags carefully, because it is easy to close an `li` too early. Indenting the code, as in these examples, makes the levels visible and the mistakes easier to spot, and many editors can fold each level for you.",
            },
            {
              type: "paragraph",
              text: "You can mix types, too. An ordered list can contain an unordered one, and the other way round, whenever the content calls for it. A recipe might have numbered steps, and a bulleted list of ingredients inside one of them.",
            },
            {
              type: "code",
              language: "html",
              code: `<ol>
      <li>Pack your bag
        <ul>
          <li>Water</li>
          <li>Snacks</li>
        </ul>
      </li>
      <li>Lock the door</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "Try not to go too deep. Two levels are easy to follow, and three begin to strain the reader, especially someone listening to it. If you find yourself at four levels, the content probably wants headings, or a different structure.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-nesting",
          kind: "predict",
          title: "Predict the nesting",
          summary: "A list with a list inside it. Work out how many items there are, which one owns the inner list and how the browser draws it.",
          minutes: 7,
          mode: "html",
          intro: "Read the markup carefully, paying attention to where each `ul` and `li` opens and closes. Answer from the structure, and then run the code to check the default look.",
          code: {
            html: `<ul>
      <li>Fruit
        <ul>
          <li>Apple</li>
          <li>Pear</li>
        </ul>
      </li>
      <li>Bread</li>
    </ul>`,
            css: "",
          },
          questions: [
            {
              prompt: "How many `li` elements does this markup contain in total?",
              options: ["2", "3", "4", "5"],
              answerIndex: 2,
              hint: "Count the inner ones as well as the outer ones.",
              explanation: "The outer list has `Fruit` and `Bread`, and the inner list has `Apple` and `Pear`. That is four list items in all.",
              proves: [
                {
                  type: "count",
                  selector: "li",
                  message: "There are exactly four `li` elements.",
                  min: 4,
                  max: 4,
                },
              ],
            },
            {
              prompt: "Which item does the inner list belong to?",
              options: ["`Bread`", "`Fruit`", "Neither, it belongs to the outer `ul`", "`Apple`"],
              answerIndex: 1,
              hint: "Which `li` is open when the inner `ul` starts?",
              explanation: "The inner `ul` sits inside the `li` that contains the word `Fruit`, so it is part of that item.",
              proves: [
                {
                  type: "exists",
                  selector: "li > ul > li",
                  message: "The inner list is a child of an `li`.",
                },
              ],
            },
            {
              prompt: "How many direct children does the outer `ul` have?",
              options: ["Four", "Three", "One", "Two"],
              answerIndex: 3,
              hint: "Only count the elements that sit straight inside the outer `ul`.",
              explanation: "The outer `ul` has two direct children, the `Fruit` item and the `Bread` item. The other two items are inside the inner list.",
              proves: [
                {
                  type: "count",
                  selector: "body > ul > li",
                  message: "The outer list has two direct items.",
                  min: 2,
                  max: 2,
                },
              ],
            },
            {
              prompt: "What marker does the browser draw by default beside `Apple` and `Pear`?",
              options: ["A hollow circle", "A filled disc, like the outer list", "A number", "No marker"],
              answerIndex: 0,
              hint: "Browsers change the bullet at each level.",
              explanation: "By default, a nested unordered list uses hollow circles, and the next level down uses squares, so the levels are easy to tell apart.",
              proves: [
                {
                  type: "exists",
                  selector: "ul ul li",
                  message: "The inner items are inside a nested `ul`.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-broken-lists",
          kind: "debug",
          title: "Debug: the broken lists",
          mode: "html",
          summary: "The page looks almost right, but the list markup is invalid in three places. Find the paragraph, the stray item and the misplaced inner list.",
          minutes: 8,
          broken: {
            html: `<h1>Trail kit</h1>
    <ul>
      <li>Boots</li>
      <p>Water bottle</p>
      <li>Map</li>
      <ul>
        <li>Paper copy</li>
        <li>Phone copy</li>
      </ul>
    </ul>
    <li>Rain jacket</li>`,
            css: "",
          },
          challenge: {
            title: "Repair the structure",
            description: "This kit list should be one list with four main items: `Boots`, `Water bottle`, `Map` and `Rain jacket`. The `Map` item has two sub-items, `Paper copy` and `Phone copy`. Fix the markup so that only `li` elements sit directly in a list, every `li` is in a list, and the inner list belongs to the `Map` item.",
            hints: [
              "Look for a paragraph directly inside the `ul`, an `li` after the closing `</ul>`, and a `ul` directly inside a `ul`.",
              "Each of these belongs inside an `li`, or becomes one.",
              "The inner `ul` goes inside the `Map` item, before its closing `</li>`.",
            ],
            checks: [
              {
                type: "count",
                selector: "ul > p",
                message: "No paragraph sits directly inside a list",
                max: 0,
              },
              {
                type: "count",
                selector: "ul > ul",
                message: "...no list sits directly inside another",
                max: 0,
              },
              {
                type: "count",
                selector: "body > li",
                message: "...no `li` is outside a list",
                max: 0,
              },
              {
                type: "count",
                selector: "body > ul > li",
                message: "...the outer list has four items",
                min: 4,
                max: 4,
              },
              {
                type: "exists",
                selector: "li > ul",
                message: "...and the inner list is inside an `li`.",
              },
            ],
            solution: {
              html: `<h1>Trail kit</h1>
    <ul>
      <li>Boots</li>
      <li>Water bottle</li>
      <li>Map
        <ul>
          <li>Paper copy</li>
          <li>Phone copy</li>
        </ul>
      </li>
      <li>Rain jacket</li>
    </ul>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lists-of-links",
          kind: "learn",
          title: "Lists of links and menus",
          summary: "Why navigation menus are lists, and how to mark one up.",
          minutes: 8,
          concept: {
            description: "A menu of links is a list of items, so it belongs in a `ul`. Each link goes inside an `li`. Websites use this pattern for main menus, footers, tables of contents and lists of related pages, and it is one of the most common uses of lists on the web.",
            why: "A list of links tells a screen reader how many links there are, and lets a listener jump past the whole group. That matters for menus that appear on every page. It also gives you a clean structure that CSS can turn into a horizontal bar, a sidebar or a grid.",
            mentalModel: "Think of the signposts at a crossroads, fixed on one post. The post is the list, each sign is an item, and a traveller can see at a glance how many ways there are.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at how each link sits inside its own list item.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="trails.html">Trails</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "The browser shows this as a bulleted list, which is rarely how a menu should look, but it is a good starting point for the markup. In the CSS track you will turn it into a bar by removing the bullets and arranging the items side by side. The structure stays the same, which is the point: markup says what it is, and CSS says how it looks.",
            },
            {
              type: "paragraph",
              text: "To tell the browser and assistive tools that this list is the main navigation of the page, wrap it in a `nav` element. You will meet `nav` properly in the semantic layout topic, but it is simple enough to use already. People using a screen reader can then jump straight to the navigation, or skip over it.",
            },
            {
              type: "code",
              language: "html",
              code: `<nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="trails.html">Trails</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>`,
            },
            {
              type: "paragraph",
              text: "One benefit of the list shows when a style fails to load or a visitor turns CSS off. The page still shows a tidy, readable set of links, in order, with no layout tricks. Plain, meaningful markup is the best safety net you have.",
            },
            {
              type: "paragraph",
              text: "A visitor often wants to know which page they are on. The convention is to mark the current page's link with `aria-current=\"page\"`. Screen readers announce it as the current page, and CSS can style it with an attribute selector. You do not link to the current page for navigation, but keeping the link in the list preserves the structure.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="trails.html" aria-current="page">Trails</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "Lists of links are not only for menus. A table of contents for a long page, a list of related articles, and a row of social media links are all lists. Whenever you have several links of equal standing in a group, a list is usually the right shape. Keep the link text short and distinct, since the items sit side by side. A list is easy to extend too, because adding a page means adding one line.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "whats-inside-a-list-item",
          kind: "learn",
          title: "What goes inside a list item",
          summary: "Text, links, images and several paragraphs in one li, and what cannot sit directly in a list.",
          minutes: 8,
          concept: {
            description: "An `li` is a container, and it can hold much more than a line of text. It can contain inline elements such as links and emphasis, block elements such as paragraphs, images, and even other lists. What cannot happen is the reverse: only `li` elements can be direct children of a `ul` or `ol`.",
            why: "Real list items are rarely a bare word. A packing list may have a link to a shop, a recipe step may have a note and a picture, and a menu entry may have a sub-menu. Knowing what is allowed lets you build them without breaking the structure.",
            mentalModel: "Think of a drawer organiser with compartments. The organiser only holds compartments, and each compartment can hold whatever you like, from a single pin to a small box of its own.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at what sits inside each item.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li><strong>Boots</strong>: sturdy, with a good grip.</li>
      <li><a href="shop.html">Rain jacket</a> (waterproof)</li>
      <li>
        <p>Map</p>
        <p>Paper copy preferred, since phones can lose signal.</p>
      </li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "The first item mixes bold text with plain text. The second wraps part of its text in a link. The third holds two paragraphs, which is allowed because an `li` can contain block content. All three are still single items, and the list reports three items to a screen reader, whatever is inside.",
            },
            {
              type: "paragraph",
              text: "Images work too. Putting a small picture beside each entry is a common design, and the `img` simply sits inside the `li`, along with its text. Remember to give each image an `alt`, as you learned in the images topic, and consider whether the picture adds anything the text does not.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>
        <img src="images/bridge.jpg" alt="Wooden bridge" width="80" height="60">
        Mill Creek bridge
      </li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "Now the limit. A `ul` or `ol` may contain only `li` elements as direct children, plus a few invisible ones such as `script` and `template`. If you put a paragraph, a heading or a `div` straight inside the list, the markup is invalid, even though the browser may still draw it. Everything that belongs to an item has to be inside an `li`.",
            },
            {
              type: "paragraph",
              text: "A related rule is that an `li` must always be inside a `ul`, an `ol` or a `menu`. A stray `li` on its own, outside a list, is also invalid, and screen readers may not treat it as a list item. If you see an `li` floating in your code, find the list it belongs to, or replace it with a paragraph.",
            },
            {
              type: "paragraph",
              text: "Keep each item focused on one idea. If an item needs several paragraphs, a heading and a picture, it is probably a section of the page, and a list is the wrong shape for it. Lists work best when the items are short and alike, so the reader can scan them quickly. If you are unsure, read the list aloud: items that sound like one thought belong together, while items that need their own heading do not.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "choosing-the-right-list",
          kind: "learn",
          title: "Choosing the right list",
          summary: "A quick way to decide between ul, ol, dl, a table or a plain paragraph.",
          minutes: 8,
          concept: {
            description: "Choosing a list means matching the markup to the content. Use `ul` for related items with no order, `ol` for items where order matters, `dl` for terms with descriptions, and something else when the content is not a list at all. A little thought here saves a lot of fixing later.",
            why: "Picking the wrong element still produces something on the screen, so the mistake is easy to miss. But the result confuses assistive tools, makes restyling harder, and gives the wrong message. A short checklist makes the right choice quick.",
            mentalModel: "Imagine sorting your belongings into containers. A jar is for small loose things, a box with dividers is for things in a fixed order, and a labelled envelope is for a name and a note. The best container depends on what you put in it.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try the checklist on a few pieces of content. Open the example in the Playground and look at each one.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- Things to pack: no order -->
    <ul>
      <li>Boots</li>
      <li>Water</li>
    </ul>
    
    <!-- Directions: order matters -->
    <ol>
      <li>Park at the mill</li>
      <li>Cross the bridge</li>
    </ol>
    
    <!-- Terms and meanings -->
    <dl>
      <dt>Cairn</dt>
      <dd>A pile of stones that marks the way.</dd>
    </dl>`,
            },
            {
              type: "paragraph",
              text: "The first is a set of things that could be in any order, so it is an unordered list. The second is a set of directions that only work in sequence, so it is an ordered one. The third pairs a word with its meaning, which is exactly what a description list is for.",
            },
            {
              type: "paragraph",
              text: "Now the cases that are not lists. A single item is not a list, because there is nothing to group, so write a paragraph. A run of sentences that make one argument is not a list either, because the items flow into each other, so write paragraphs. And a grid of data with rows and columns, such as times and prices, belongs in a table, which you will meet in the next topic.",
            },
            {
              type: "paragraph",
              text: "Here is a fast way to test yourself. Imagine reading the content aloud, with the words \"item one\", \"item two\" in between. If that sounds natural, you probably have a list. If it sounds odd, because the pieces depend on each other, you probably have prose. And if you would need to say \"row\" and \"column\", you have a table.",
            },
            {
              type: "paragraph",
              text: "A last distinction is between a list and a set of sections. If each item has a heading and several paragraphs, it is a set of sections, and you should use headings and paragraphs. A list item is usually short, so when each entry grows to a paragraph or more, headings are a better choice, and they appear in the page's outline.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- Each entry is long: use headings, not a list -->
    <h2>Mill Creek walk</h2>
    <p>A gentle two-hour walk beside the creek.</p>
    
    <h2>Ridge Trail</h2>
    <p>A steeper climb with wide views.</p>`,
            },
            {
              type: "paragraph",
              text: "When you are unsure, start with the content and ask what it really is. The right element will usually be clear, and when it is not, a short list is rarely a bad choice. It is much easier to turn a list into paragraphs later than to fix a page where everything is a paragraph.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "styling-lists",
          kind: "learn",
          title: "Styling lists",
          summary: "list-style-type, list-style-position, the default indent, and removing bullets safely.",
          minutes: 8,
          concept: {
            description: "Browsers give lists default styles: bullets or numbers, and an indent on the left. CSS can change all of it. The `list-style-type` property chooses the marker, `list-style-position` puts it inside or outside the text, and `padding-left` and `margin` control the space around the list.",
            why: "Lists are often restyled, for example into menus with no bullets, or into checklists with their own markers. Knowing the properties, and the safe way to remove bullets, lets you change how a list looks without breaking what it means.",
            mentalModel: "Think of the default as a plain notebook with ruled lines and a margin. You can change the margin, the symbol at the start of each line, or the ruling, and it is still a notebook.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with the marker. Open the example in the Playground, and look at the CSS in the `style` element.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      .square { list-style-type: square; }
      .roman  { list-style-type: upper-roman; }
    </style>
    
    <ul class="square">
      <li>Boots</li>
      <li>Water</li>
    </ul>
    
    <ol class="roman">
      <li>Park</li>
      <li>Walk</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "The value `square` gives square bullets, and `upper-roman` gives Roman numerals. Other values include `disc`, `circle`, `decimal`, `lower-alpha` and `none`. The marker is part of how the list looks, so changing it with CSS is the right way to choose a style that is a matter of taste. The earlier `type` attribute is for cases where the marker is part of the meaning.",
            },
            {
              type: "paragraph",
              text: "The `list-style-position` property decides where the marker sits. The default, `outside`, hangs the bullet in the margin, so wrapped lines of text line up neatly. With `inside`, the marker moves into the text, and the second line wraps beneath the bullet.",
            },
            {
              type: "paragraph",
              text: "Then there is the space around the list. Browsers add a left padding, usually around 40 pixels, to make room for the markers, and a margin above and below. When you remove the bullets, as for a menu, you usually remove the padding too, or the items stay indented.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      .menu { list-style: none; padding: 0; margin: 0; }
    </style>
    
    <ul class="menu">
      <li><a href="index.html">Home</a></li>
      <li><a href="trails.html">Trails</a></li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "That three-line rule is the standard reset for a menu. There is one caution. In some browsers, notably Safari with VoiceOver, a list with `list-style: none` may no longer be announced as a list. If the list matters to a screen reader user, such as a navigation menu, you can add `role=\"list\"` to the `ul`, which restores the announcement. It looks redundant, but it is a known workaround.",
            },
            {
              type: "paragraph",
              text: "Spacing between the items is controlled by margins on the `li` elements, such as `margin-bottom: 0.5rem`, and by the line height of the text. Resist the temptation to add empty `li` elements or line breaks for space, because they would be announced as items. Space belongs in the stylesheet.",
            },
            {
              type: "paragraph",
              text: "You can go much further, with custom markers, counters and `::marker` styling, and the CSS track covers those. For now, remember the two ideas from this lesson: use the properties to change the look, and keep the list in the HTML even when its bullets are gone. That way, the structure survives any redesign.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "list-marker-explorer",
          kind: "visualizer",
          title: "List marker explorer",
          summary: "A list with one long item. Change the marker style and position and watch how the bullets and the wrapped text move.",
          minutes: 8,
          concept: {
            description: "A short list of three items, one of them long enough to wrap onto a second line. Controls change the marker with `list-style-type`, decide whether it hangs outside the text or sits inside it with `list-style-position`, and change the indent with `padding-left`. The list stays a list, whatever it looks like.",
            why: "Bullets, numbers and indents are only the browser's defaults. Seeing a square, a Roman numeral or no marker at all on the very same markup shows that the look belongs to CSS, and that the wrapped line is the place where `inside` and `outside` differ.",
            mentalModel: "Think of a notice board with pins. The pin is the marker, and you can swap it for another shape, or push it inside the card, without changing what is written on the card.",
          },
          stage: {
            html: `<ul class="kit">
      <li>Boots</li>
      <li>Water bottle</li>
      <li>A light rain jacket that folds into its own pocket for the walk home</li>
    </ul>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .kit { width: 16rem; margin: 16px; color: #e2e8f0; }
    .kit li { background: #1e293b; margin: 4px 0; padding: 4px 8px; line-height: 1.4; }`,
            annotate: "none",
            target: ".kit",
            items: ".kit",
            itemCount: 1,
          },
          starter: `.kit {
      list-style-type: disc;
      list-style-position: outside;
      padding-left: 40px;
    }
    `,
          controls: [
            {
              id: "type",
              label: "list-style-type",
              selector: ".kit",
              property: "list-style-type",
              fallback: "disc",
              type: "options",
              options: ["disc", "circle", "square", "decimal", "lower-alpha", "upper-roman", "none"],
              help: "The marker drawn before each item.",
            },
            {
              id: "pos",
              label: "list-style-position",
              selector: ".kit",
              property: "list-style-position",
              fallback: "outside",
              type: "options",
              options: ["outside", "inside"],
              help: "Inside moves the marker into the text, so wrapped lines go underneath it.",
            },
            {
              id: "pad",
              label: "padding-left",
              selector: ".kit",
              property: "padding-left",
              fallback: "40px",
              type: "range",
              min: 0,
              max: 48,
              step: 4,
              unit: "px",
              help: "The space the browser reserves for the markers.",
            },
          ],
          presets: [
            {
              id: "square",
              label: "Square bullets",
              description: "a different marker",
              css: ".kit { list-style-type: square; }",
            },
            {
              id: "roman",
              label: "Roman numerals",
              description: "a numbered look on a ul",
              css: ".kit { list-style-type: upper-roman; }",
            },
            {
              id: "inside",
              label: "Markers inside",
              description: "wrapped lines go underneath",
              css: ".kit { list-style-position: inside; padding-left: 8px; }",
            },
          ],
          challenge: {
            title: "Square markers, set inside the text",
            description: "Give the list square markers, and place them inside the text, so the wrapped line of the long item sits under its marker.",
            hints: [
              "Two declarations in the `.kit` rule: `list-style-type` and `list-style-position`.",
              "The marker is `square`, and the position is `inside`.",
              "`.kit { list-style-type: square; list-style-position: inside; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".kit",
                property: "list-style-type",
                expected: ["square"],
                message: "The markers are squares",
              },
              {
                type: "computedStyle",
                selector: ".kit",
                property: "list-style-position",
                expected: ["inside"],
                message: "...set inside the text.",
              },
            ],
            solution: `.kit {
      list-style-type: square;
      list-style-position: inside;
      padding-left: 40px;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "menu-reset-explorer",
          kind: "visualizer",
          title: "Menu reset explorer",
          summary: "A list of links with the browser's default bullets and indent. Remove them step by step and watch the box shrink to a clean menu.",
          minutes: 8,
          concept: {
            description: "A menu of four links, written as a list. The dashed box is the list itself. Controls remove the bullets with `list-style-type`, take away the left padding, and change the space between items, so you can see how much room a list reserves for its markers before any styling.",
            why: "The usual first step in styling a menu is to remove the bullets and the indent. Doing it by hand, one property at a time, shows that the indent is padding the browser added for the markers, and that it stays even after the bullets are gone.",
            mentalModel: "Think of a coat rack with a row of hooks. Taking away the coats, which are the bullets, leaves the rack just as wide, and you have to move the rack itself to reclaim the space.",
          },
          stage: {
            html: `<ul class="menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#trails">Trails</a></li>
      <li><a href="#walks">Walks</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .menu { width: 12rem; margin: 16px; border: 1px dashed #64748b; }
    .menu a { color: #38bdf8; text-decoration: none; }`,
            annotate: "box",
            target: ".menu",
            items: ".menu",
            itemCount: 1,
          },
          starter: `.menu {
      list-style-type: disc;
      padding-left: 40px;
    }
    `,
          controls: [
            {
              id: "type",
              label: "list-style-type",
              selector: ".menu",
              property: "list-style-type",
              fallback: "disc",
              type: "options",
              options: ["disc", "none"],
              help: "none removes the bullets.",
            },
            {
              id: "pad",
              label: "padding-left",
              selector: ".menu",
              property: "padding-left",
              fallback: "40px",
              type: "range",
              min: 0,
              max: 48,
              step: 4,
              unit: "px",
              help: "The indent the browser adds for the markers.",
            },
            {
              id: "gap",
              label: "item spacing",
              selector: ".menu li",
              property: "margin-bottom",
              fallback: "0px",
              type: "range",
              min: 0,
              max: 16,
              step: 4,
              unit: "px",
              help: "Space between menu items.",
            },
          ],
          presets: [
            {
              id: "bullets-off",
              label: "Bullets off",
              description: "the indent stays",
              css: ".menu { list-style-type: none; }",
            },
            {
              id: "reset",
              label: "Full reset",
              description: "no bullets, no indent",
              css: ".menu { list-style-type: none; padding-left: 0px; }",
            },
            {
              id: "airy",
              label: "Airy menu",
              description: "reset plus spacing",
              css: `.menu { list-style-type: none; padding-left: 0px; }
    .menu li { margin-bottom: 12px; }`,
            },
          ],
          challenge: {
            title: "Reset the menu",
            description: "Make the menu a clean list: remove the bullets, and remove the left padding so the items line up with the edge of the box.",
            hints: [
              "Two declarations in the `.menu` rule.",
              "`list-style-type` should be `none`, and `padding-left` should be `0px`.",
              "`.menu { list-style-type: none; padding-left: 0px; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".menu",
                property: "list-style-type",
                expected: ["none"],
                message: "The bullets are gone",
              },
              {
                type: "computedStyle",
                selector: ".menu",
                property: "padding-left",
                expected: ["0px", "0"],
                message: "...and the indent is gone.",
              },
            ],
            solution: `.menu {
      list-style-type: none;
      padding-left: 0px;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lists-and-accessibility",
          kind: "learn",
          title: "Lists and accessibility",
          summary: "What a screen reader says about a list, and how to keep real lists real.",
          minutes: 8,
          concept: {
            description: "When a screen reader reaches a proper list, it announces that it is a list and how many items it has. It also lets the listener move from item to item, and skip the whole list at once. Those benefits only exist when the markup is a real `ul`, `ol` or `dl`.",
            why: "People who cannot see the screen depend on structure to know how a page is organised. A list gives them a count, a boundary and a way to move through the items. A fake list, built from line breaks or dashes, gives them none of that, and reads as one long, confusing run of text.",
            mentalModel: "Imagine hearing a shopping list read aloud. If the reader says \"list of four items\" first, you know when to expect it to end. If they simply start reading, you cannot tell whether you have heard half or all of it.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's compare a real list with a fake one. Open the example in the Playground and look at how they are written.",
            },
            {
              type: "code",
              language: "html",
              code: `<!-- Fake -->
    <p>- Boots<br>- Water<br>- Map</p>
    
    <!-- Real -->
    <ul>
      <li>Boots</li>
      <li>Water</li>
      <li>Map</li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "Both look much the same on the screen. The first is a paragraph with dashes typed in, so a screen reader would read out \"dash boots dash water dash map\", with no sense of items. The second is announced as a list of three items, and each item is a separate stop. The second also gives you far better control, because CSS can style the markers and spacing of each item.",
            },
            {
              type: "paragraph",
              text: "The advice goes both ways. Do not fake lists, and do not turn things into lists that are not lists. A single sentence in a list wrapper, or a layout built from `ul` elements, adds noise for listeners, who are told about a list that has one item. Reserve lists for groups of related items.",
            },
            {
              type: "paragraph",
              text: "Also take care with long lists. A list of three hundred items is tiring to move through, even with good markup. Consider splitting it under headings, adding a way to jump to a section, or offering a search. The markup can help, but it cannot make an enormous list pleasant on its own.",
            },
            {
              type: "paragraph",
              text: "Link lists deserve a word. If a navigation list is wrapped in a `nav` element, a screen reader user can find it from a list of landmarks, and skip it. Giving the `nav` an `aria-label` such as \"Main menu\" helps when a page has more than one. You will meet landmarks and labels properly in the accessibility topics.",
            },
            {
              type: "code",
              language: "html",
              code: `<nav aria-label="Main menu">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="trails.html">Trails</a></li>
      </ul>
    </nav>`,
            },
            {
              type: "paragraph",
              text: "To check your own pages, use a screen reader for a few minutes, or look at the accessibility tree in your browser's tools. You should hear \"list\" and a count where a list begins. If you do not, look for a list that has been built from something else.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-fake-lists",
          kind: "debug",
          title: "Debug: the fake lists",
          mode: "html",
          summary: "Two lists built from dashes, typed numbers and line breaks. Replace them with the real elements.",
          minutes: 8,
          broken: {
            html: `<h1>Before you go</h1>
    <p>- Check the forecast<br>- Charge your phone<br>- Tell someone your route</p>
    <p>1. Park at the mill<br>2. Follow the signs<br>3. Cross the bridge</p>`,
            css: "",
          },
          challenge: {
            title: "Replace fakes with real lists",
            description: "The first block is a set of things to do, in no particular order, and the second is a set of steps in order. Both are paragraphs with typed dashes or numbers and line breaks. Rewrite the first as an unordered list and the second as an ordered list, each with three items. Delete the dashes, the numbers and the breaks.",
            hints: [
              "The dashes and numbers belong to the browser now, so they must not be in the text.",
              "Use `ul` for the first block and `ol` for the second, with one `li` per line.",
              "`<li>Check the forecast</li>` has no dash in it.",
            ],
            checks: [
              {
                type: "count",
                selector: "ul > li",
                message: "The first block is a `ul` with three items",
                min: 3,
                max: 3,
              },
              {
                type: "count",
                selector: "ol > li",
                message: "...the second is an `ol` with three items",
                min: 3,
                max: 3,
              },
              {
                type: "count",
                selector: "br",
                message: "...no line breaks are left",
                max: 0,
              },
              {
                type: "count",
                selector: "p",
                message: "...and no paragraphs stand in for the lists.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Before you go</h1>
    <ul>
      <li>Check the forecast</li>
      <li>Charge your phone</li>
      <li>Tell someone your route</li>
    </ul>
    <ol>
      <li>Park at the mill</li>
      <li>Follow the signs</li>
      <li>Cross the bridge</li>
    </ol>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "common-list-mistakes",
          kind: "learn",
          title: "Common list mistakes",
          summary: "The errors beginners make with lists, how to spot them and how to fix them.",
          minutes: 8,
          concept: {
            description: "Lists are simple, and still they attract a handful of familiar mistakes: items outside a list, paragraphs directly inside one, a nested list in the wrong place, numbers typed by hand and lists built from line breaks. Knowing them helps you spot them in your own code.",
            why: "Most of these mistakes still display something sensible, so they slip through. They only show up for people using assistive tools, or later, when you try to restyle the page. A short list of what to look for gives you a quick way to review any list you write.",
            mentalModel: "Think of an inspector's checklist for a building. Each item is small, and none looks serious alone, but together they catch the problems that would otherwise show up much later.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. It has five mistakes in a short piece of code, so read it slowly, and try to find them before you read on.",
            },
            {
              type: "code",
              language: "html",
              code: `<li>Boots</li>
    <ul>
      <li>Water</li>
      <p>Map</p>
      <ul>
        <li>Paper</li>
      </ul>
    </ul>
    <ol>
      <li>1. Park</li>
      <li>2. Walk</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "The first line is an `li` with no list around it, which is invalid. The `p` inside the `ul` is also invalid, since only `li` elements may be direct children. The inner `ul` sits directly inside another `ul`, beside the items, when it should be inside an `li`. And in the `ol`, the numbers are typed into the text, so the browser draws them a second time.",
            },
            {
              type: "paragraph",
              text: "Fixing them follows a pattern. Every `li` goes inside a `ul` or `ol`. Everything inside a list that is not an `li` moves into one. A nested list goes inside the `li` that it belongs to. And the numbers are left to the browser. Here is the repaired version.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>Boots</li>
      <li>Water</li>
      <li>Map
        <ul>
          <li>Paper</li>
        </ul>
      </li>
    </ul>
    <ol>
      <li>Park</li>
      <li>Walk</li>
    </ol>`,
            },
            {
              type: "paragraph",
              text: "Two more mistakes are about intent. One is using `ol` just to get numbers, when the order does not matter. Another is using `ul` for steps that must be done in order, which loses the numbers. If swapping two items would change the meaning, you need `ol`.",
            },
            {
              type: "paragraph",
              text: "There is also the habit of using lists for layout, such as stacking boxes in a `ul` because they sit in a row. A row of cards can be a list, if the cards are really a group of related items. But if the only reason is the look, a `div` with CSS is the more honest choice.",
            },
            {
              type: "paragraph",
              text: "A good way to review a list is to read the code from the top, and for each line ask which element it belongs to. If every `li` has a list parent, every list has only `li` children, and every nested list sits in an item, you have caught almost everything. The next lessons give you practice at doing it. Reviewing your own earlier pages, line by line, is the quickest way to build the habit.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    buildADayOutGuide,

    /* ------------------------------------------------------------------ */
    {
          id: "lists-quiz",
          kind: "quiz",
          title: "Quiz: lists",
          summary: "Seventeen questions on ul, ol, dl, nesting, link lists, styling, accessibility and common mistakes.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "Which element makes a bulleted list?",
              options: ["`ol`", "`ul`", "`dl`", "`li`"],
              answerIndex: 1,
              explanation: "The `ul` element is an unordered list. The `ol` element is ordered, and `li` is a single item.",
            },
            {
              prompt: "Which element holds one item of a list?",
              options: ["`item`", "`dd`", "`ul`", "`li`"],
              answerIndex: 3,
              explanation: "Each item of a `ul` or `ol` goes in an `li` element.",
            },
            {
              prompt: "When should you use an ordered list?",
              options: ["When the order of the items matters", "Whenever you want numbers", "For menus", "For a list with one item"],
              answerIndex: 0,
              explanation: "Use `ol` when swapping two items would change the meaning, as with steps in a method.",
            },
            {
              prompt: "Why should you not type the numbers into the items of an `ol`?",
              options: [
                "It is against the HTML rules",
                "It makes the list unordered",
                "The browser numbers them already, so you would see each number twice",
                "It hides the list",
              ],
              answerIndex: 2,
              explanation: "The browser draws the numbers, and keeps them right if you add or remove an item.",
            },
            {
              prompt: "What does the `start` attribute on an `ol` do?",
              options: ["It starts the list on a new page", "It sets the number of the first item", "It makes the list start with a bullet", "It sets the number of items"],
              answerIndex: 1,
              explanation: "`start=\"5\"` makes the first item show 5, and the rest carry on from there.",
            },
            {
              prompt: "What does the `reversed` attribute do?",
              options: ["Reverses the order of the code", "Hides the list", "Moves the markers to the right", "Makes the items count down"],
              answerIndex: 3,
              explanation: "A reversed list counts down from the number of items, so a list of four starts at 4.",
            },
            {
              prompt: "Which elements make up a description list?",
              options: ["`ul`, `ol` and `li`", "`table`, `tr` and `td`", "`dl`, `dt` and `dd`", "`list`, `term` and `item`"],
              answerIndex: 2,
              explanation: "A `dl` holds terms in `dt` elements and their descriptions in `dd` elements.",
            },
            {
              prompt: "Which is a good use of a description list?",
              options: ["A glossary of terms and meanings", "A set of steps", "A navigation bar of equal links", "A single sentence"],
              answerIndex: 0,
              explanation: "A description list pairs terms with descriptions, as a glossary does.",
            },
            {
              prompt: "Where must a nested list go?",
              options: ["Directly inside the outer `ul`", "Inside an `li` of the outer list", "After the outer list closes", "Inside a `p` element"],
              answerIndex: 1,
              explanation: "A nested list is part of one item, so it sits inside that `li`, before its closing tag.",
            },
            {
              prompt: "What can be a direct child of a `ul`?",
              options: ["Any element", "Only links", "Only `p` elements", "Only `li` elements"],
              answerIndex: 3,
              explanation: "Only `li` elements, apart from a few invisible ones such as `script`, may sit directly inside a list.",
            },
            {
              prompt: "A menu of links is best marked up as…",
              options: ["A `ul` with a link inside each `li`", "A paragraph with `br` elements", "A `dl`", "A `table` with one row"],
              answerIndex: 0,
              explanation: "A list of links tells assistive tools how many links there are, and gives CSS a clean structure to restyle.",
            },
            {
              prompt: "How do you mark the link of the page that the visitor is on?",
              options: ["`class=\"here\"`", "`current=\"true\"`", "`aria-current=\"page\"`", "`target=\"_self\"`"],
              answerIndex: 2,
              explanation: "The `aria-current=\"page\"` attribute tells assistive tools which link is the current page, and CSS can style it.",
            },
            {
              prompt: "Which CSS property removes the bullets from a list?",
              options: ["`display: none`", "`list-style-type: none`", "`bullets: off`", "`text-decoration: none`"],
              answerIndex: 1,
              explanation: "`list-style-type: none`, or the `list-style: none` shorthand, removes the markers. The left padding stays unless you remove it too.",
            },
            {
              prompt: "What is a known side effect of `list-style: none` in some browsers?",
              options: [
                "The list is deleted",
                "The page loses its style",
                "The items become links",
                "The list may no longer be announced as a list by some screen readers",
              ],
              answerIndex: 3,
              explanation: "Safari with VoiceOver may drop the list announcement, and adding `role=\"list\"` restores it.",
            },
            {
              prompt: "Why is `<p>- Boots<br>- Water</p>` a poor list?",
              options: [
                "It has too few items",
                "Dashes are not allowed",
                "A screen reader cannot tell it is a list or count the items",
                "Paragraphs cannot hold text",
              ],
              answerIndex: 2,
              explanation: "A real list gives structure to assistive tools, while a paragraph with dashes is one run of text.",
            },
            {
              prompt: "Which content is not a list?",
              options: ["A single sentence of advice", "A group of related links", "Steps in a recipe", "A set of things to pack"],
              answerIndex: 0,
              explanation: "A single item has nothing to group, so a paragraph is the right element.",
            },
            {
              prompt: "A table of times and prices with rows and columns belongs in…",
              options: ["A `ul`", "A `table`", "A `dl`", "An `ol`"],
              answerIndex: 1,
              explanation: "Data with rows and columns is a table, which comes next in the course.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lists-review",
          kind: "review",
          title: "Review: lists",
          summary: "The three kinds of list, their attributes, nesting, menus, styling, accessibility and the usual mistakes.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "A list is a group of related items. Use `ul` when the order does not matter, `ol` when it does, and `dl` for terms with descriptions. Only `li` elements may sit directly inside a `ul` or `ol`, and every `li` must be inside one. Never type bullets, dashes or numbers into the text, because the browser draws them.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul><li>Boots</li><li>Water</li></ul>
    
    <ol start="5" reversed type="A">
      <li>Counts down from five, in letters</li>
    </ol>
    
    <dl>
      <dt>Cairn</dt>
      <dd>A pile of stones that marks the way.</dd>
    </dl>`,
            },
            {
              type: "paragraph",
              text: "`ol` takes `start`, `reversed` and `type`, and an `li` takes `value`. A nested list goes inside the `li` that owns it, and two levels are usually enough. A menu of links is a `ul` of `li` elements that each hold an `a`, often wrapped in a `nav`, with `aria-current=\"page\"` on the current link.",
            },
            {
              type: "code",
              language: "html",
              code: `<ul>
      <li>Food
        <ul>
          <li>Fruit</li>
        </ul>
      </li>
    </ul>`,
            },
            {
              type: "paragraph",
              text: "Style lists with CSS: `list-style-type` and `list-style-position` change the markers, and `padding-left` and margins change the space. For a menu, remove the bullets and the padding, and remember that some screen readers stop announcing a list with `list-style: none`, which `role=\"list\"` fixes.",
            },
            {
              type: "paragraph",
              text: "Before you choose a list, ask whether the content is a group of related items, whether order matters, and whether each item is a term with a description. If there is only one item, use a paragraph. If it has rows and columns, use a table. If each entry needs a heading and paragraphs, use sections.",
            },
          ],
        },
  ],
};

export default content;
