import type { TopicContent } from "@/engine/types";
import buildAWalkTimetable from "./tables/workshops/build-a-walk-timetable/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-table",
          kind: "learn",
          title: "What is a table?",
          summary: "When data belongs in rows and columns, and the elements that build a table.",
          minutes: 8,
          concept: {
            description: "A **table** shows data in rows and columns, so that every value can be read against its labels. You make one with the `table` element, and fill it with rows, written as `tr`, which in turn hold cells, written as `td` for data and `th` for headings.",
            why: "Some information only makes sense in a grid: timetables, prices, scores, comparisons. A table lets a reader run an eye down a column or across a row. It also lets a screen reader tell a listener which heading a value belongs to, which no amount of spacing or layout tricks can do.",
            mentalModel: "Think of a train timetable on a station wall. The stations run down the side, the times run across the top, and you find your train by following a row and a column until they meet.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's build the smallest useful table. Open the example in the Playground, and look at how the elements nest.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <tr>
        <th>Walk</th>
        <th>Length</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The `table` wraps everything. Each `tr`, which stands for table row, is one horizontal line. Inside a row, every `th` or `td` is one cell. The first row holds heading cells, which browsers draw in bold and centred, and the other rows hold data cells. Together, they make a grid of three rows and two columns, though you never write the word column anywhere.",
            },
            {
              type: "paragraph",
              text: "That last point is the key idea. HTML tables are built row by row, and the columns appear by themselves, because the cells in each row line up beneath the cells in the row above. The first `td` of every row forms the first column, the second forms the second, and so on. That is why each row needs the same number of cells.",
            },
            {
              type: "paragraph",
              text: "The test for using a table is simple. Ask whether the content has rows and columns of related values, with labels for them. If it does, use a table. If it is a plain list of things, use a list. If you are only trying to place boxes on the page, use CSS, because a table is not a layout tool, and a later lesson explains why.",
            },
            {
              type: "paragraph",
              text: "You will notice that the default table has no borders, and that its cells sit close together. Browsers draw only the structure, and leave the decoration to you. In a later lesson, you will use CSS to add borders, spacing and stripes, and it is worth knowing that these are choices of style, not part of the table's meaning.",
            },
            {
              type: "paragraph",
              text: "Over the next lessons you will learn headings, row groups, captions, joined cells and small screens. Each of them builds on the small grid you have just seen.",
            },
            {
              type: "paragraph",
              text: "One practical tip before you move on: type tables with careful indentation, as in the example, with each cell on its own line. A table of many cells is easy to get wrong, and indentation makes a missing closing tag or an extra cell much easier to spot.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "rows-and-cells",
          kind: "learn",
          title: "Rows and cells",
          summary: "How tr, td and th fit together, and why every row needs the same number of cells.",
          minutes: 8,
          concept: {
            description: "A table is a stack of **rows**, and each row is a line of **cells**. The `tr` element is a row. Inside it, a `td` element is a data cell and a `th` element is a heading cell. Cells can hold text, links, images, or almost anything else you can put in a page.",
            why: "Most table problems are problems with rows and cells: a row with a missing cell, a cell outside a row, a heading made from a data cell. Knowing exactly what goes where lets you write tables that work the first time, and spot the mistake quickly when they do not.",
            mentalModel: "Picture a spreadsheet. Each row is a line of boxes, and the boxes line up with the ones above and below. A row in HTML is the line, and a cell is one box.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and count the cells in each row before you read on.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <tr>
        <th>Walk</th>
        <th>Length</th>
        <th>Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "Every row has three cells, so the table has three columns. The browser works out the width of each column from the widest content in it, so `Ridge Trail` makes the first column wider than `Walk` would. You do not set widths in HTML. If you want to change them, CSS is the tool.",
            },
            {
              type: "paragraph",
              text: "Now see what happens when a row is short. In the next example, the second row has only two cells, and the browser has to cope.",
            },
            {
              type: "code",
              language: "html",
              code: `<table border="1">
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The second row stops early, and the third column simply has nothing under `2 hours`. The browser does not complain or repair it, so the table looks lopsided, and a screen reader user may hear a column with a gap. When a value is truly missing, it is better to write a cell with a short dash or `n/a`, so the grid is complete and the reader knows the gap is intentional.",
            },
            {
              type: "paragraph",
              text: "Cells can hold more than words. A link, a bold word, a picture or even a short list can sit in a `td`, and the cell grows to fit it. Be careful, though, with large amounts of content. A cell that holds paragraphs of text is a sign that the data is not really tabular, and a list or a set of headed sections may serve better.",
            },
            {
              type: "paragraph",
              text: "Notice that a `td` or `th` must always be inside a `tr`, and a `tr` must be inside a table, or one of its groups, which you will meet shortly. A stray `td` outside a row is invalid, and browsers will quietly move it around, which changes your layout in ways you did not plan.",
            },
            {
              type: "paragraph",
              text: "Finally, keep the cell text short and consistent. Write numbers with the same format and units down a column, and put the unit in the heading when it is the same for every row, such as `Length (km)`. That way each cell holds only the value, which is easier to read and to compare.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-build-a-timetable",
          kind: "lab",
          title: "Lab: build a timetable",
          mode: "html",
          summary: "Turn a paragraph of comma-separated lines into a real table, with a heading row and three data rows.",
          minutes: 9,
          starter: {
            html: `<h1>Walk times</h1>
    <p>Walk, Length, Time<br>Mill Creek, 5 km, 2 hours<br>Ridge Trail, 7 km, 3 hours<br>Heron Lake, 4 km, 1.5 hours</p>`,
            css: "",
          },
          challenge: {
            title: "Make it a real table",
            description: "The walk times are written as a paragraph with line breaks and commas. Replace it with a table: a heading row of three `th` cells, each with `scope=\"col\"`, and three data rows of three `td` cells. Keep the words, and leave no paragraph or line break behind.",
            hints: [
              "One `table`, four `tr` rows, and in each row three cells.",
              "The first row uses `th`, with `scope=\"col\"`, and the other three rows use `td`.",
              "`<tr><td>Mill Creek</td><td>5 km</td><td>2 hours</td></tr>`",
            ],
            checks: [
              {
                type: "count",
                selector: "table tr",
                message: "The table has four rows",
                min: 4,
                max: 4,
              },
              {
                type: "count",
                selector: "th",
                message: "...three heading cells",
                min: 3,
                max: 3,
              },
              {
                type: "attribute",
                selector: "th",
                attribute: "scope",
                message: "...which are column headings",
                expected: "col",
              },
              {
                type: "count",
                selector: "td",
                message: "...and nine data cells",
                min: 9,
                max: 9,
              },
              {
                type: "count",
                selector: "p",
                message: "...and no paragraph is left",
                max: 0,
              },
              {
                type: "count",
                selector: "br",
                message: "...or line break.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Walk times</h1>
    <table>
      <tr>
        <th scope="col">Walk</th>
        <th scope="col">Length</th>
        <th scope="col">Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
      <tr>
        <td>Heron Lake</td>
        <td>4 km</td>
        <td>1.5 hours</td>
      </tr>
    </table>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "header-cells",
          kind: "learn",
          title: "Header cells and scope",
          summary: "th, and how scope tells a screen reader what each heading labels.",
          minutes: 8,
          concept: {
            description: "A **header cell**, written with the `th` element, is a label for a row or a column. Browsers draw it bold and centred, but its real job is meaning: assistive tools read it out as the label for the cells it covers. The `scope` attribute says whether it labels a column, a row, or a wider group.",
            why: "A grid of numbers without labels is meaningless. A sighted reader looks up at the top of a column to see what a value means. A screen reader user cannot see the layout, so the markup must say which heading belongs to which cell. That is what `th` and `scope` do.",
            mentalModel: "Picture the labels on a set of drawers. Each label tells you what is in the drawer beneath it, or beside it. A header cell is the label, and `scope` says which way to look.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the first row and the first column.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <tr>
        <th scope="col">Walk</th>
        <th scope="col">Length</th>
        <th scope="col">Time</th>
      </tr>
      <tr>
        <th scope="row">Mill Creek</th>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <th scope="row">Ridge Trail</th>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The top row uses `scope=\"col\"`, which means each of those headings labels the column beneath it. The first cell of each other row uses `scope=\"row\"`, which means that heading labels the rest of its row. When a screen reader lands on `5 km`, it can announce \"Mill Creek, Length, 5 km\", which gives the listener the full context.",
            },
            {
              type: "paragraph",
              text: "The row headings are an extra step that people often skip. If the first cell of each row identifies the row, as the name of a walk does here, then it is a header, and it should be a `th`. If the first cell is just another piece of data, it stays a `td`. The question is always whether the cell is a label.",
            },
            {
              type: "paragraph",
              text: "Browsers help you see the difference by drawing `th` in bold, but never choose it for the look. Do not use `th` to get bold text in a data cell, and do not use `td` with bold styling for a heading. If you need a different look, restyle the element with CSS, and keep the element that matches the meaning.",
            },
            {
              type: "paragraph",
              text: "The `scope` attribute can also take the values `colgroup` and `rowgroup`, for headings that cover several columns or several rows. They are used with grouped headings and spanning cells, which you will meet in a later lesson. For a simple table, `col` and `row` are all you need.",
            },
            {
              type: "paragraph",
              text: "Modern screen readers can often work out simple headers without `scope`, but they cannot always do so. Adding the attribute costs a few characters, makes the intention clear to every tool, and documents your own thinking for the next person who reads the code. It is a good habit to keep, and it pays off every time someone new reads your table, whether that person is a colleague or you, six months from now.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-table-shape",
          kind: "predict",
          title: "Predict the table's shape",
          summary: "A table with a caption, heading cells in a row and a column, and two data rows. Count its parts and work out what a screen reader would announce.",
          minutes: 7,
          mode: "html",
          intro: "Look at which cells are headings and which are data. Then answer the questions, and run the code to look at the markup.",
          code: {
            html: `<table>
      <caption>Walk times</caption>
      <thead>
        <tr><th scope="col">Walk</th><th scope="col">Length</th><th scope="col">Time</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Mill Creek</th><td>5 km</td><td>2 h</td></tr>
        <tr><th scope="row">Ridge Trail</th><td>7 km</td><td>3 h</td></tr>
      </tbody>
    </table>`,
            css: "",
          },
          questions: [
            {
              prompt: "How many `td` data cells does the table contain?",
              options: ["Two", "Four", "Six", "Eight"],
              answerIndex: 1,
              hint: "The first cell of each body row is a heading.",
              explanation: "Each body row has two `td` cells, `5 km` and `2 h` in the first, `7 km` and `3 h` in the second. That gives four. The row names are `th` cells.",
              proves: [
                {
                  type: "count",
                  selector: "td",
                  message: "There are exactly four `td` cells.",
                  min: 4,
                  max: 4,
                },
              ],
            },
            {
              prompt: "How many `th` heading cells does the table contain in total?",
              options: ["Three", "Two", "Five", "Six"],
              answerIndex: 2,
              hint: "Count both the column headings and the row headings.",
              explanation: "There are three column headings in `thead`, and two row headings in `tbody`, which makes five.",
              proves: [
                {
                  type: "count",
                  selector: "th",
                  message: "There are exactly five `th` cells.",
                  min: 5,
                  max: 5,
                },
              ],
            },
            {
              prompt: "A screen reader reaches the cell `7 km`. Which headings can it announce for it?",
              options: ["Only `Length`", "Only `Ridge Trail`", "None", "`Ridge Trail` and `Length`"],
              answerIndex: 3,
              hint: "Each cell has a column heading above it and a row heading beside it.",
              explanation: "The `scope=\"col\"` on `Length` labels the column and the `scope=\"row\"` on `Ridge Trail` labels the row, so both apply to `7 km`.",
              proves: [
                {
                  type: "exists",
                  selector: "th[scope=\"row\"]",
                  message: "The row headings use `scope=\"row\"`.",
                },
                {
                  type: "exists",
                  selector: "th[scope=\"col\"]",
                  message: "...and the column headings use `scope=\"col\"`.",
                },
              ],
            },
            {
              prompt: "Where must the `caption` element go, and what does it do?",
              options: [
                "As the first child of the table, to name it",
                "Anywhere inside the table, to style it",
                "After the last row, to summarise it",
                "Inside `thead`, to label the headings",
              ],
              answerIndex: 0,
              hint: "Think about the first thing a reader should learn.",
              explanation: "The caption must be the first child of the `table`. It gives the table a name, which readers and assistive tools use to know what it is for.",
              proves: [
                {
                  type: "exists",
                  selector: "table > caption:first-child",
                  message: "The caption is the first child of the table.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "table-sections",
          kind: "learn",
          title: "Head, body and foot",
          summary: "thead, tbody and tfoot: grouping rows by their job.",
          minutes: 8,
          concept: {
            description: "A table can group its rows into three kinds of section. The `thead` element holds the heading rows, the `tbody` element holds the main data rows, and the `tfoot` element holds summary rows such as totals. They do not change how a basic table looks, but they give it structure.",
            why: "Sections tell browsers and assistive tools which rows are headings, which are data, and which are totals. They also give CSS something to aim at, so you can style the header differently from the body. And when a long table is printed, browsers can repeat the header on every page.",
            mentalModel: "Think of a printed report with a title strip at the top, pages of detail, and a summary at the end. The three sections are the strip, the pages and the summary.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at how each group of rows is wrapped.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <thead>
        <tr>
          <th scope="col">Walk</th>
          <th scope="col">Length</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mill Creek</th>
          <td>5 km</td>
        </tr>
        <tr>
          <th scope="row">Ridge Trail</th>
          <td>7 km</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>12 km</td>
        </tr>
      </tfoot>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The header row goes in `thead`, the data rows go in `tbody`, and the totals go in `tfoot`. Each section holds `tr` elements, and each `tr` holds cells as usual. The order in the markup is the order on the page, with the head first, then the body, then the foot, and that is the order screen readers read them in.",
            },
            {
              type: "paragraph",
              text: "Here is a fact that surprises many beginners. If you leave out `tbody` and write rows straight inside the `table`, the browser adds a `tbody` for you in its internal model. You will not see it in your own code, but you will see it if you inspect the page, and it matters for CSS: a selector such as `table > tr` will not match, because the rows are really children of the `tbody`.",
            },
            {
              type: "paragraph",
              text: "A table can have more than one `tbody`, which is useful when the rows fall into groups, such as walks by region. Each group can then have its own heading row inside, using a `th` with `scope=\"rowgroup\"`. You will rarely need that, but it is good to know the option exists.",
            },
            {
              type: "paragraph",
              text: "Do not worry if the footer comes last in the markup but you want totals to feel like part of the data. The `tfoot` is still the right place for a summary, and you can style it however you like. What matters is that the row is a summary of the rows above it, and not another entry. Remember that sections are structure, not decoration, so choose them by the job a row does and not by how it looks.",
            },
            {
              type: "paragraph",
              text: "A good rule is to use `thead` and `tbody` on every table that has headings, and to add `tfoot` only when a summary row exists. The extra elements cost very little, and they make your tables easier to style, easier to read aloud and easier to maintain.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-caption-and-sections",
          kind: "lab",
          title: "Lab: caption and sections",
          mode: "html",
          summary: "Give a plain table a caption, a header group, a body group and row headings.",
          minutes: 9,
          starter: {
            html: `<table>
      <tr>
        <th>Walk</th>
        <th>Length</th>
        <th>Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
    </table>`,
            css: "",
          },
          challenge: {
            title: "Add structure to the table",
            description: "This table works, but it has no name and no groups. Add a `caption` that says `Walk times` as the first thing in the table. Wrap the heading row in a `thead` and the data rows in a `tbody`. Give the three heading cells `scope=\"col\"`. Then turn the first cell of each data row into a `th` with `scope=\"row\"`, since it names the row.",
            hints: [
              "The caption goes first, before `thead`.",
              "`thead` holds one row, and `tbody` holds the other two.",
              "The walk names are labels, so they become `<th scope=\"row\">`.",
            ],
            checks: [
              {
                type: "text",
                selector: "table > caption:first-child",
                includes: "Walk times",
                message: "The table opens with the caption `Walk times`",
              },
              {
                type: "exists",
                selector: "table > thead > tr > th[scope=\"col\"]",
                message: "...the heading row is in a `thead`, with column scopes",
              },
              {
                type: "count",
                selector: "table > tbody > tr",
                message: "...the data rows are in a `tbody`",
                min: 2,
                max: 2,
              },
              {
                type: "count",
                selector: "tbody th[scope=\"row\"]",
                message: "...and each row starts with a row heading.",
                min: 2,
                max: 2,
              },
            ],
            solution: {
              html: `<table>
      <caption>Walk times</caption>
      <thead>
        <tr>
          <th scope="col">Walk</th>
          <th scope="col">Length</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mill Creek</th>
          <td>5 km</td>
          <td>2 hours</td>
        </tr>
        <tr>
          <th scope="row">Ridge Trail</th>
          <td>7 km</td>
          <td>3 hours</td>
        </tr>
      </tbody>
    </table>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "captions-and-descriptions",
          kind: "learn",
          title: "Captions and descriptions",
          summary: "The caption element, and how to tell people what a table is for.",
          minutes: 8,
          concept: {
            description: "A **caption** is a title for a table, written with the `caption` element. It must be the first thing inside the `table`. It tells every reader, and every assistive tool, what the table is about before they reach its rows, and it is the table's accessible name.",
            why: "A table dropped into a page with no title leaves readers to guess what it shows. A screen reader user hears \"table with four rows and three columns\" and nothing else, unless there is a caption. A sentence of description costs nothing, and makes a table far easier to use.",
            mentalModel: "Think of the title above a chart in a newspaper. You glance at it, and at once you know whether the chart is the one you want.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at where the caption sits.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <caption>Walk times and lengths</caption>
      <thead>
        <tr>
          <th scope="col">Walk</th>
          <th scope="col">Length</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mill Creek</th>
          <td>5 km</td>
          <td>2 hours</td>
        </tr>
      </tbody>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The caption is the very first child of the `table`, before `thead`. Browsers draw it above the table and centre it by default. If you prefer it below the table, the CSS property `caption-side` can move it, and the text can be styled like any other text. What matters for the markup is the position, as the first child, and the words themselves.",
            },
            {
              type: "paragraph",
              text: "Write captions that say what the table shows, in a few words, such as \"Walk times and lengths\". Avoid captions that merely say \"Table\" or \"Table 1\", since they add nothing. If the page refers to the table by a number, include the number and a description together, as in \"Table 1: walk times and lengths\".",
            },
            {
              type: "paragraph",
              text: "Sometimes a table needs more than a title. A complex table might need a sentence about how to read it, or a summary of the main finding. Put that in a paragraph before or after the table, where everyone can read it, and not in a hidden attribute. Everyone benefits from a plain sentence that says, for example, \"The Ridge Trail is the longest walk\".",
            },
            {
              type: "paragraph",
              text: "You can also wrap a table in a `figure`, with a `figcaption`, when the table is referred to from the text and has a caption that belongs to the figure. In that case, the `figure` carries the caption, and you can skip the `caption` element, or use both if the table's title and the figure's caption are different things.",
            },
            {
              type: "code",
              language: "html",
              code: `<figure>
      <table>
        <caption>Walk times</caption>
        <!-- rows here -->
      </table>
      <figcaption>Times assume a steady pace.</figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "Decide how to name each table when you create it, and not afterwards. A caption written at the start tends to be clear, because you know exactly what the table is for, and it helps you notice a table that has no clear purpose and may not need to exist. A table that is hard to name is often trying to say too many things, and splitting it in two can help.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "spanning-cells",
          kind: "learn",
          title: "Spanning cells",
          summary: "colspan and rowspan, and how to count the grid when cells are joined.",
          minutes: 8,
          concept: {
            description: "Sometimes one cell needs to cover several columns or rows. The `colspan` attribute makes a cell stretch across columns, and the `rowspan` attribute makes it stretch down rows. They are useful for grouped headings and for totals, but they make a table harder to read, so use them with care.",
            why: "Real data has groups: two columns under one heading, or a label that applies to several rows. Spans let you show that. But every span changes the count of cells in a row, and mistakes with them are the commonest cause of crooked tables.",
            mentalModel: "Think of merging cells in a spreadsheet. A merged cell covers the space of several, and the cells around it have to leave room for it.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with `colspan`. Open the example in the Playground, and look at the first row.",
            },
            {
              type: "code",
              language: "html",
              code: `<table border="1">
      <tr>
        <th colspan="2" scope="colgroup">Walk</th>
        <th scope="col">Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The first heading has `colspan=\"2\"`, so it takes up the width of two columns. The first row has only two cells in the markup, but it fills three columns, since one of its cells counts as two. The second row has three cells, so both rows add up to three columns. That is the rule for counting: add up the spans in each row, and every row must come to the same total.",
            },
            {
              type: "paragraph",
              text: "Now `rowspan`, which stretches a cell down. The rows beneath it must leave out a cell, because the spanning cell is already there. Open the next example and count the cells in each row.",
            },
            {
              type: "code",
              language: "html",
              code: `<table border="1">
      <tr>
        <th scope="col">Walk</th>
        <th scope="col">Region</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td rowspan="2">North</td>
      </tr>
      <tr>
        <td>Heron Lake</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The cell `North` has `rowspan=\"2\"`, so it covers its own row and the next one. That is why the last row has only one cell: the second column of that row is occupied by `North`. If you wrote a second cell there, the table would grow an extra column, and the grid would be misaligned.",
            },
            {
              type: "paragraph",
              text: "A good habit is to draw the grid on paper before you write a table with spans. Mark which boxes are joined, then write each row, leaving out the cells that a span already covers. After that, check each row's total, and look at the result in the browser, where a crooked table is easy to see.",
            },
            {
              type: "paragraph",
              text: "Use spans sparingly. A screen reader user can navigate a simple grid by moving up, down, left and right. With spans, the grid has gaps in its logic, and the listener can lose track of where they are. If you can avoid a span by repeating a label, or by splitting one table into two, the result is often easier for everyone.",
            },
            {
              type: "paragraph",
              text: "The `scope` values `colgroup` and `rowgroup` exist for headings that span several columns or rows, as in the first example. They tell assistive tools that the heading covers a group, and not just one cell. For anything more complicated than that, you will need the `headers` attribute, which a later lesson introduces.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-spans",
          kind: "predict",
          title: "Predict the spans",
          summary: "A small table with one colspan and one rowspan. Count the columns and the cells, remembering that a span takes up room in the grid.",
          minutes: 8,
          mode: "html",
          intro: "Read the three rows carefully. The heading cell `Walk` spans two columns, and the cell `2 h` spans two rows. Answer from counting, then run the code to see the grid.",
          code: {
            html: `<table border="1">
      <tr>
        <th colspan="2">Walk</th>
        <th>Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td rowspan="2">2 h</td>
      </tr>
      <tr>
        <td>Heron Lake</td>
        <td>4 km</td>
      </tr>
    </table>`,
            css: "",
          },
          questions: [
            {
              prompt: "How many columns does the grid have?",
              options: ["Two", "Three", "Four", "Five"],
              answerIndex: 1,
              hint: "Add up the spans in the second row, where nothing is left out.",
              explanation: "The second row has three cells with no spans, so the grid is three columns wide. In the first row, `Walk` counts as two columns, plus `Time`, which is also three.",
              proves: [
                {
                  type: "count",
                  selector: "tr:nth-child(2) > td, tr:nth-child(2) > th",
                  message: "The second row has three cells.",
                  min: 3,
                  max: 3,
                },
              ],
            },
            {
              prompt: "How many cell elements does the first row contain in the markup?",
              options: ["Two", "Three", "Four", "One"],
              answerIndex: 0,
              hint: "Count elements, not columns.",
              explanation: "The first row has two `th` elements, `Walk` and `Time`. The first of them covers two columns, so two elements fill three columns.",
              proves: [
                {
                  type: "count",
                  selector: "tr:first-child > th",
                  message: "The first row has two `th` elements.",
                  min: 2,
                  max: 2,
                },
              ],
            },
            {
              prompt: "The cell `2 h` has `rowspan=\"2\"`. Which rows does it cover?",
              options: [
                "Only the row it is written in",
                "The row above and the row it is written in",
                "The row it is written in, and the one below it",
                "All three rows",
              ],
              answerIndex: 2,
              hint: "A rowspan stretches a cell downwards.",
              explanation: "A `rowspan` runs from the row in which the cell is written, downwards. So `2 h` covers the second and third rows.",
              proves: [
                {
                  type: "attribute",
                  selector: "td[rowspan=\"2\"]",
                  attribute: "rowspan",
                  message: "One cell has `rowspan=\"2\"`.",
                  expected: "2",
                },
              ],
            },
            {
              prompt: "How many cell elements does the last row contain in the markup?",
              options: ["Three", "Four", "One", "Two"],
              answerIndex: 3,
              hint: "One position in the last row is already taken by a cell from above.",
              explanation: "The last row has `Heron Lake` and `4 km`. The third position is covered by `2 h`, which came from the row above, so the row has two cell elements and fills three columns.",
              proves: [
                {
                  type: "count",
                  selector: "tr:last-child > td",
                  message: "The last row has two `td` elements.",
                  min: 2,
                  max: 2,
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-broken-table",
          kind: "debug",
          title: "Debug: the broken table",
          mode: "html",
          summary: "A table with no headings and a short row. Repair the headings and complete the grid.",
          minutes: 8,
          broken: {
            html: `<table>
      <tr>
        <td>Walk</td>
        <td>Length</td>
        <td>Time</td>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
    </table>`,
            css: "",
          },
          challenge: {
            title: "Repair the grid",
            description: "This table has two problems. Its first row is made of `td` cells, so nothing marks them as headings, and its second row is missing the time for Mill Creek, which is `2 hours`. Make the first row three `th` cells with `scope=\"col\"`, and add the missing cell, so every row has three.",
            hints: [
              "Change the three cells of the first row from `td` to `th`, and add the scope.",
              "The second row stops after `5 km`. It needs one more cell.",
              "`<td>2 hours</td>` goes after `<td>5 km</td>`.",
            ],
            checks: [
              {
                type: "count",
                selector: "th",
                message: "The first row has three heading cells",
                min: 3,
                max: 3,
              },
              {
                type: "attribute",
                selector: "th",
                attribute: "scope",
                message: "...which are column headings",
                expected: "col",
              },
              {
                type: "count",
                selector: "td",
                message: "...and the table has six data cells",
                min: 6,
                max: 6,
              },
              {
                type: "count",
                selector: "tr",
                message: "...in three rows.",
                min: 3,
                max: 3,
              },
            ],
            solution: {
              html: `<table>
      <tr>
        <th scope="col">Walk</th>
        <th scope="col">Length</th>
        <th scope="col">Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
      </tr>
    </table>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "column-groups",
          kind: "learn",
          title: "Column groups",
          summary: "colgroup and col: styling or labelling whole columns.",
          minutes: 8,
          concept: {
            description: "Rows are easy to style, because each row is an element. Columns are not elements, because a table is written row by row. The `colgroup` and `col` elements fill the gap. They sit at the top of the table and describe its columns, so that you can apply one style to a whole column.",
            why: "Highlighting a column, giving it a width or shading the one that matters is a very common need. Without `col`, you would have to add a class to every cell in the column, and keep it up to date as rows are added. With `col`, you write the rule once.",
            mentalModel: "Imagine laying a strip of coloured tape down one column of a printed spreadsheet. Every cell in the column sits under the tape, however many rows there are.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the second `col` element.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <caption>Walk times</caption>
      <colgroup>
        <col>
        <col class="highlight">
        <col>
      </colgroup>
      <tr>
        <th scope="col">Walk</th>
        <th scope="col">Length</th>
        <th scope="col">Time</th>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
        <td>2 hours</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The `colgroup` goes after the caption and before the rows. Inside it, there is one `col` for each column, in order. The second `col` has a class, so a rule such as `.highlight { background: #fef3c7; }` shades every cell in the second column. The `col` elements are empty, and have no content of their own, because they only describe a column.",
            },
            {
              type: "paragraph",
              text: "If several columns should share a style, you can use the `span` attribute, as in `<col span=\"2\">`, which covers two columns with one element. You can also group columns with several `colgroup` elements, each holding its own `col` elements, when sets of columns are meant to read together.",
            },
            {
              type: "paragraph",
              text: "There is a limit to what CSS can do with a column. Only a handful of properties apply to columns, such as `background`, `border`, `width` and `visibility`. You cannot set text colour or padding on a `col` and expect it to reach the cells, because cells inherit from rows, not from columns. For those, you need a selector such as `td:nth-child(2)`.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      td:nth-child(2) { text-align: right; }
    </style>`,
            },
            {
              type: "paragraph",
              text: "That rule right-aligns every second cell of every row, which is a good fit for a column of numbers. A pattern worth remembering is to use `col` for background and width, and `:nth-child` for everything else.",
            },
            {
              type: "paragraph",
              text: "A final detail concerns width. Setting `width` on a `col` is the cleanest way to give columns fixed widths, and it works best together with `table-layout: fixed` on the table, which tells the browser to take the widths from the first row instead of measuring all the content. That makes large tables render faster and keeps the columns steady.",
            },
            {
              type: "paragraph",
              text: "You will not need `colgroup` on every table. But when you do need column-wide styling, it keeps the HTML tidy, and it is the only way to set the width of a column without touching each cell. It is a small element that is very useful when it fits.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "styling-tables",
          kind: "learn",
          title: "Styling tables",
          summary: "border-collapse, padding, alignment and stripes: turning a bare grid into a readable table.",
          minutes: 8,
          concept: {
            description: "Browsers draw tables with no borders and tight cells, and leave the design to you. A few CSS properties do most of the work: `border-collapse` joins the borders, `padding` gives cells room, `text-align` lines up the text, and `:nth-child` can stripe the rows so the eye follows them across.",
            why: "A well-styled table is far easier to read than a bare one. Good spacing, clear borders and aligned numbers help people find their value quickly, and the same markup can look many different ways, depending on your stylesheet.",
            mentalModel: "Think of ruled paper. The lines and margins do not change what you write, but they make it much easier to read it back.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the CSS in the `style` element.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: 0.5rem 0.75rem; border: 1px solid #cbd5e1; }
      th { background: #f1f5f9; text-align: left; }
      td:nth-child(2), td:nth-child(3) { text-align: right; }
      tbody tr:nth-child(even) { background: #f8fafc; }
    </style>
    
    <table>
      <thead>
        <tr><th>Walk</th><th>Length</th><th>Time</th></tr>
      </thead>
      <tbody>
        <tr><td>Mill Creek</td><td>5 km</td><td>2 h</td></tr>
        <tr><td>Ridge Trail</td><td>7 km</td><td>3 h</td></tr>
        <tr><td>Heron Lake</td><td>4 km</td><td>1.5 h</td></tr>
      </tbody>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The first rule, `border-collapse: collapse`, is the one to learn first. By default, each cell has its own border, with a gap between them, which looks like a double line. Collapsing merges the borders into one. The `width: 100%` makes the table fill its container, which is usually what you want.",
            },
            {
              type: "paragraph",
              text: "The second rule gives every cell padding and a border. Padding is the biggest single improvement you can make to a table, since text pressed against a border is hard to read. The heading rule adds a background and aligns the text to the left, and the next rule right-aligns the columns of numbers.",
            },
            {
              type: "paragraph",
              text: "Aligning numbers to the right matters more than it seems. When the digits line up, a reader can compare values at a glance, because units, tens and hundreds sit in the same columns. For columns of numbers with different lengths, `font-variant-numeric: tabular-nums` makes every digit the same width.",
            },
            {
              type: "paragraph",
              text: "The last rule stripes the even rows, using `tbody tr:nth-child(even)`. The stripe is limited to the body, so the header is not affected. Stripes help the eye follow a row across a wide table, but keep the colours subtle, and make sure the text stays easy to read against them.",
            },
            {
              type: "paragraph",
              text: "Two more properties are worth knowing. `border-spacing` sets the gap between cells when borders are not collapsed, and `caption-side` moves the caption below the table. For rows that respond to the pointer, `tbody tr:hover` can shade the row under the mouse, though you should not rely on hover alone, because touch screens do not have it.",
            },
            {
              type: "paragraph",
              text: "Notice that the CSS never changed the HTML. You could restyle the same table with a new look in a minute, by changing the stylesheet. That is the benefit of clean, meaningful markup, and why you should never use extra cells or spacer images to get a design. Check the table with longer words and bigger numbers than your sample data, since real data is rarely as tidy.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "table-style-explorer",
          kind: "visualizer",
          title: "Table style explorer",
          summary: "A bare table with browser-default borders. Collapse the borders, add padding and stripe the rows, and watch it become readable.",
          minutes: 8,
          concept: {
            description: "A small table of walks, with a border on every cell. By default, each cell keeps its own border and there is a gap between them, which looks like a double line. Controls change `border-collapse`, the gap with `border-spacing`, the cell `padding` and a stripe on the even rows.",
            why: "The first thing most people do to a table is fix the double borders and give the cells room. Seeing the double line vanish with one property, and the text relax with a little padding, shows how much of a table's readability comes from three or four declarations.",
            mentalModel: "Picture a grid of small cardboard boxes. By default, each box has its own walls and a gap between neighbours. Collapsing the borders makes neighbours share one wall, and padding is the soft packing inside each box.",
          },
          stage: {
            html: `<table class="grid">
      <thead>
        <tr><th>Walk</th><th>Length</th><th>Time</th></tr>
      </thead>
      <tbody>
        <tr><td>Mill Creek</td><td>5 km</td><td>2 h</td></tr>
        <tr><td>Ridge Trail</td><td>7 km</td><td>3 h</td></tr>
        <tr><td>Heron Lake</td><td>4 km</td><td>1.5 h</td></tr>
      </tbody>
    </table>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .grid { margin: 16px; color: #e2e8f0; }
    .grid th, .grid td { border: 1px solid #64748b; text-align: left; }
    .grid th { background: #1e293b; }`,
            annotate: "none",
            target: ".grid",
            items: ".grid",
            itemCount: 1,
          },
          starter: `.grid {
      border-collapse: separate;
      border-spacing: 2px;
    }
    
    .grid td {
      padding: 1px;
    }
    `,
          controls: [
            {
              id: "collapse",
              label: "border-collapse",
              selector: ".grid",
              property: "border-collapse",
              fallback: "separate",
              type: "options",
              options: ["separate", "collapse"],
              help: "collapse merges neighbouring borders into one line.",
            },
            {
              id: "spacing",
              label: "border-spacing",
              selector: ".grid",
              property: "border-spacing",
              fallback: "2px",
              type: "range",
              min: 0,
              max: 12,
              step: 2,
              unit: "px",
              help: "The gap between cells. It only has an effect when borders are separate.",
            },
            {
              id: "padding",
              label: "cell padding",
              selector: ".grid td",
              property: "padding",
              fallback: "1px",
              type: "range",
              min: 0,
              max: 16,
              step: 2,
              unit: "px",
              help: "The room between a cell's text and its border.",
            },
            {
              id: "stripe",
              label: "even-row stripe",
              selector: ".grid tbody tr:nth-child(even) td",
              property: "background",
              fallback: "transparent",
              type: "options",
              options: ["transparent", "#1e293b", "#334155"],
              help: "Subtle stripes help the eye follow a row.",
            },
          ],
          presets: [
            {
              id: "collapsed",
              label: "Collapsed",
              description: "one line between cells",
              css: ".grid { border-collapse: collapse; }",
            },
            {
              id: "roomy",
              label: "Roomy",
              description: "collapsed with padding",
              css: `.grid { border-collapse: collapse; }
    .grid td { padding: 10px; }`,
            },
            {
              id: "striped",
              label: "Striped",
              description: "roomy with stripes",
              css: `.grid { border-collapse: collapse; }
    .grid td { padding: 10px; }
    .grid tbody tr:nth-child(even) td { background: #1e293b; }`,
            },
          ],
          challenge: {
            title: "Collapse the borders and give the cells room",
            description: "Make the table's borders collapse into single lines, and give each `td` `8px` of padding.",
            hints: [
              "One declaration in the `.grid` rule, and one in the `.grid td` rule.",
              "`border-collapse` should be `collapse`, and `padding` should be `8px`.",
              "`.grid { border-collapse: collapse; }` and `.grid td { padding: 8px; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".grid",
                property: "border-collapse",
                expected: ["collapse"],
                message: "The borders collapse into single lines",
              },
              {
                type: "computedStyle",
                selector: ".grid td",
                property: "padding",
                expected: ["8px"],
                message: "...and each cell has `8px` of padding.",
              },
            ],
            solution: `.grid {
      border-collapse: collapse;
      border-spacing: 2px;
    }
    
    .grid td {
      padding: 8px;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "tables-and-accessibility",
          kind: "learn",
          title: "Tables and accessibility",
          summary: "How a screen reader moves through a table, and what the markup must provide.",
          minutes: 8,
          concept: {
            description: "A screen reader treats a table as a grid. It announces the size, lets the listener move from cell to cell, and reads the heading for each cell as it goes. That only works when the markup says which cells are headings, so the structure you write is what the listener hears.",
            why: "For a person who cannot see the table, the markup is the whole table. A table built from `td` cells alone, with the headings styled bold, reads as a stream of unrelated values. A table with proper headers lets a listener ask \"which walk, which length?\" for every number.",
            mentalModel: "Imagine someone reading a timetable to you over the phone. If they read only the numbers, you could not follow. If they say \"Mill Creek, length, five kilometres\", every value comes with its labels.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's look at a table that gives a screen reader what it needs. Open the example in the Playground and check each part.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <caption>Walk times</caption>
      <thead>
        <tr>
          <th scope="col">Walk</th>
          <th scope="col">Length</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mill Creek</th>
          <td>5 km</td>
          <td>2 hours</td>
        </tr>
      </tbody>
    </table>`,
            },
            {
              type: "paragraph",
              text: "Each part does a job. The caption gives the table a name, so the listener knows what it is. The `th` cells with `scope` say which cells are headings, and whether they label a column or a row. And the `thead` and `tbody` groups tell the reader where the headings end. Together they let a screen reader announce a full path for every data cell.",
            },
            {
              type: "paragraph",
              text: "Keep tables simple where you can. A grid with one row of column headings, and perhaps one column of row headings, is easy to move through. Every extra layer, such as merged cells and groups of headings, makes it harder for a listener to keep track. When you meet a very complicated table, ask whether you can split it into two simple ones.",
            },
            {
              type: "paragraph",
              text: "For tables that cannot be simple, the `headers` attribute gives exact control. You give each heading cell an `id`, and each data cell lists, in `headers`, the ids of every heading that applies to it. It is rarely needed, and easy to get wrong, so use it only when `scope` cannot express the relationships.",
            },
            {
              type: "code",
              language: "html",
              code: `<th id="walk">Walk</th>
    <th id="length">Length</th>
    <td headers="walk length">5 km</td>`,
            },
            {
              type: "paragraph",
              text: "Empty cells deserve a note. A blank cell leaves a listener unsure whether the data is zero, missing or lost. When a value is genuinely not available, write a word such as `n/a` or a dash, perhaps with a short note in a paragraph, so the grid is complete and the intention clear.",
            },
            {
              type: "paragraph",
              text: "Do not use a table for anything that is not tabular data, since the listener is told they have entered a table, and expects rows and columns. And avoid nesting one table inside another, which is very hard to follow. If you test your tables with a screen reader, even briefly, you will quickly learn what a good one sounds like.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "responsive-tables",
          kind: "learn",
          title: "Responsive tables",
          summary: "Keeping a wide table usable on a small screen with a scrolling wrapper.",
          minutes: 8,
          concept: {
            description: "A table with many columns is wider than a phone screen, and it does not wrap like text does. The browser squeezes the columns until they cannot shrink any further, and then the table overflows the page. A common fix is to wrap the table in a container that scrolls sideways.",
            why: "A table that spills off the page can break the whole layout, forcing the visitor to scroll the entire page sideways. Containing the overflow to the table itself keeps the page tidy and the data readable.",
            mentalModel: "Think of a long strip of paper in a small window. You cannot make the strip narrower without cutting it, but you can let the window slide along it.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the `div` around the table.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      .scroll { overflow-x: auto; }
      .scroll table { min-width: 36rem; border-collapse: collapse; }
    </style>
    
    <div class="scroll" role="region" aria-label="Walk times" tabindex="0">
      <table>
        <!-- a wide table here -->
      </table>
    </div>`,
            },
            {
              type: "paragraph",
              text: "The wrapper has `overflow-x: auto`, which adds a horizontal scrollbar only when the content is wider than the box. The table has a `min-width`, so it keeps a readable width and does not squash its columns, and the wrapper takes care of the overflow. On a wide screen, nothing scrolls, and the table looks normal.",
            },
            {
              type: "paragraph",
              text: "The three attributes on the wrapper matter for people who use a keyboard. A scrolling region is not reachable by Tab unless it can take focus, so `tabindex=\"0\"` adds it to the tab order, and the arrow keys then scroll it. The `role=\"region\"` and the `aria-label` give it a name, so a screen reader can announce what the focused area is.",
            },
            {
              type: "paragraph",
              text: "Keep the most important column visible when you can. A common trick is to make the first column sticky, so it stays in view while the rest scrolls. That way, the reader never loses track of which row they are on. You will learn how in the positioning topic, using `position: sticky`.",
            },
            {
              type: "paragraph",
              text: "Some designs turn each row into a small stacked card on narrow screens. It can work well for short tables, but it needs care. If you change the `display` of table elements, some browsers and screen readers stop treating them as a table, and the headings can be lost. If you use this approach, test it with a screen reader, and keep the cell labels in the visible text.",
            },
            {
              type: "paragraph",
              text: "Before you reach for a clever trick, ask whether the table needs all its columns. Often a phone-sized view needs only two or three, and the others can move to a detail page. Sometimes the best responsive table is a shorter table.",
            },
            {
              type: "paragraph",
              text: "In every case, test on a real narrow screen, or with your browser's device tools. Look for sideways scrolling of the page itself, columns squeezed into unreadable strips, and text that has been cut off. A little testing shows quickly which approach your table needs.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "scroll-wrapper-explorer",
          kind: "visualizer",
          title: "Scroll wrapper explorer",
          summary: "A wide table in a narrow wrapper. Change the wrapper's overflow to see the table spill out, get clipped or scroll.",
          minutes: 8,
          concept: {
            description: "A six-column table keeps a minimum width and sits in a wrapper only as wide as a small phone. The dashed border is the wrapper. Controls change its `overflow-x` and its width, so you can see the table spill over the edge, get cut off, or scroll sideways inside the box.",
            why: "A wide table does not wrap like text, so on a small screen it either breaks the page or hides its data. Putting the scroll inside a wrapper is the standard fix, and seeing the three values side by side makes it clear which one keeps everything reachable.",
            mentalModel: "Think of a long scroll of paper seen through a window. With the window wide open, the paper hangs out. With the window blocked, you lose the ends. With a sliding window, you can see all of it, a piece at a time.",
          },
          stage: {
            html: `<div class="wrap">
      <table class="wide">
        <thead>
          <tr><th>Walk</th><th>Region</th><th>Length</th><th>Time</th><th>Climb</th><th>Difficulty</th></tr>
        </thead>
        <tbody>
          <tr><td>Mill Creek</td><td>North</td><td>5 km</td><td>2 h</td><td>80 m</td><td>Easy</td></tr>
          <tr><td>Ridge Trail</td><td>East</td><td>7 km</td><td>3 h</td><td>420 m</td><td>Hard</td></tr>
        </tbody>
      </table>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .wrap { margin: 16px; border: 2px dashed #64748b; }
    .wide { border-collapse: collapse; min-width: 34rem; color: #e2e8f0; }
    .wide th, .wide td { padding: 6px 10px; border: 1px solid #475569; text-align: left; white-space: nowrap; }`,
            annotate: "none",
            target: ".wrap",
            items: ".wrap",
            itemCount: 1,
          },
          starter: `.wrap {
      overflow-x: visible;
      max-width: 18rem;
    }
    `,
          controls: [
            {
              id: "overflow",
              label: "overflow-x",
              selector: ".wrap",
              property: "overflow-x",
              fallback: "visible",
              type: "options",
              options: ["visible", "hidden", "auto"],
              help: "visible spills over, hidden cuts off, auto adds a scrollbar when needed.",
            },
            {
              id: "maxw",
              label: "wrapper max-width",
              selector: ".wrap",
              property: "max-width",
              fallback: "18rem",
              type: "range",
              min: 12,
              max: 40,
              step: 2,
              unit: "rem",
              help: "Narrow it to imitate a small screen.",
            },
          ],
          presets: [
            {
              id: "spill",
              label: "Spills out",
              description: "visible overflow",
              css: ".wrap { overflow-x: visible; max-width: 18rem; }",
            },
            {
              id: "clipped",
              label: "Clipped",
              description: "hidden overflow",
              css: ".wrap { overflow-x: hidden; max-width: 18rem; }",
            },
            {
              id: "scrolls",
              label: "Scrolls",
              description: "auto overflow",
              css: ".wrap { overflow-x: auto; max-width: 18rem; }",
            },
          ],
          challenge: {
            title: "Let the table scroll",
            description: "Make the wrapper scroll sideways only when it needs to, by giving `.wrap` an `overflow-x` of `auto`.",
            hints: [
              "One declaration in the `.wrap` rule.",
              "The value that adds a scrollbar only when the content is too wide is `auto`.",
              "`.wrap { overflow-x: auto; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".wrap",
                property: "overflow-x",
                expected: ["auto"],
                message: "The wrapper scrolls sideways when the table is too wide.",
              },
            ],
            solution: `.wrap {
      overflow-x: auto;
      max-width: 18rem;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "tables-versus-layout",
          kind: "learn",
          title: "Tables are not for layout",
          summary: "Why a table should hold data and not page structure, and what to use instead.",
          minutes: 8,
          concept: {
            description: "In the early days of the web, designers used tables to place boxes on the page, because nothing else could. Those days are over. A table now means exactly one thing: data in rows and columns. For positioning content, use CSS, with Flexbox or Grid.",
            why: "Layout tables cause real problems. Screen readers announce them as data tables, so a listener hears \"table, three columns\" for what is only a page design. They also resist change, because the page structure is tied to the markup, and they behave badly on small screens.",
            mentalModel: "Imagine using a spreadsheet to lay out a poster. It can be done, but every cell is a data cell in the eyes of the software, and you would fight it at every step.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. It is a page header laid out with a table, which was once common practice.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <tr>
        <td><h1>Trail guide</h1></td>
        <td><a href="trails.html">Trails</a> <a href="contact.html">Contact</a></td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The title and the links are not related as rows and columns. There is no heading for the cells, and no sense in which the links are values of the title. The table is only there to put two things side by side, which is a job for CSS. A listener, though, is told they have entered a table, and has to work out that it means nothing.",
            },
            {
              type: "paragraph",
              text: "Here is the same header with proper elements. The structure says what each part is, and CSS decides how they sit next to each other.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      .site-header { display: flex; justify-content: space-between; align-items: center; }
    </style>
    
    <div class="site-header">
      <h1>Trail guide</h1>
      <ul>
        <li><a href="trails.html">Trails</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>`,
            },
            {
              type: "paragraph",
              text: "The title is a heading, the links are a list, and Flexbox puts them on one line. On a narrow screen, you can change the layout with a single CSS rule, without touching the markup. A table could not do that, because its cells always sit in rows.",
            },
            {
              type: "paragraph",
              text: "How do you decide? Ask whether the content is data with row and column headings. A timetable, a price list and a set of results are tables. A header, a sidebar or a row of cards is a layout. If you could swap rows and columns and the data would still make sense, it is almost certainly a table.",
            },
            {
              type: "paragraph",
              text: "A tricky case is a list of items shown in a grid, such as product cards. They look like a table, but each card is a separate item, with no column headings, so they belong in a list, laid out with CSS Grid. If a comparison truly has attributes that line up, such as price, size and rating, then a table is the right choice.",
            },
            {
              type: "paragraph",
              text: "In short, use tables for tabular data and nothing else. You will meet Flexbox and Grid in the CSS track, and they will give you better tools for every layout job a table was ever used for. A little thought at the start saves a lot of rework later.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-layout-table",
          kind: "debug",
          title: "Debug: the layout table",
          mode: "html",
          summary: "A page header laid out with a table. Replace it with elements that say what the content is.",
          minutes: 8,
          broken: {
            html: `<table>
      <tr>
        <td><h1>Trail guide</h1><p>Welcome to the park.</p></td>
        <td><a href="trails.html">Trails</a><br><a href="contact.html">Contact</a></td>
      </tr>
    </table>`,
            css: "",
          },
          challenge: {
            title: "Replace the layout table",
            description: "This table is only there to put a title and two links side by side. It holds no rows and columns of related data, so it should not be a table. Remove the table, and keep the content: a heading, a paragraph, and the two links as a list, without a line break between them.",
            hints: [
              "Nothing here is tabular, so there should be no `table`, `tr` or `td` left.",
              "The two links belong together, so they make a list of two items.",
              "`<ul><li><a href=\"trails.html\">Trails</a></li> ... </ul>`",
            ],
            checks: [
              {
                type: "count",
                selector: "table",
                message: "There is no table",
                max: 0,
              },
              {
                type: "exists",
                selector: "h1",
                message: "...the title is a heading",
              },
              {
                type: "exists",
                selector: "p",
                message: "...the welcome text is a paragraph",
              },
              {
                type: "count",
                selector: "ul > li > a",
                message: "...the two links are items of a list",
                min: 2,
                max: 2,
              },
              {
                type: "count",
                selector: "br",
                message: "...with no line break.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Trail guide</h1>
    <p>Welcome to the park.</p>
    <ul>
      <li><a href="trails.html">Trails</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "common-table-mistakes",
          kind: "learn",
          title: "Common table mistakes",
          summary: "The errors beginners make with tables, and a quick way to review any table you write.",
          minutes: 8,
          concept: {
            description: "Tables are tidy structures, and yet the same few mistakes appear again and again: headings made from data cells, rows with different numbers of cells, missing captions, cells outside rows, spans that break the grid, and tables used for layout. Knowing them helps you catch them early.",
            why: "Many table mistakes still display something reasonable, so they slip through. They show up for screen reader users, on small screens, or when someone changes the data. A checklist gives you a fast way to review any table you write.",
            mentalModel: "Think of a pilot's pre-flight checklist. None of the items is difficult, and each one catches a problem that would be hard to fix in the air.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. It has several mistakes in a short table, so read it slowly, and try to find them before you read on.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <tr>
        <td><b>Walk</b></td>
        <td><b>Length</b></td>
        <td><b>Time</b></td>
      </tr>
      <tr>
        <td>Mill Creek</td>
        <td>5 km</td>
      </tr>
      <tr>
        <td>Ridge Trail</td>
        <td>7 km</td>
        <td>3 hours</td>
        <td>Hard</td>
      </tr>
    </table>`,
            },
            {
              type: "paragraph",
              text: "The first row uses `td` with bold text, so nothing tells a screen reader that these are headings. The second row has two cells, and the third has four, when the table has three columns. There is no caption, and no `thead` or `tbody`. Each of these still displays something, which is why they are easy to miss.",
            },
            {
              type: "paragraph",
              text: "The fixes follow a pattern. Headings become `th` elements with `scope`. Every row gets the same number of cells, with a dash for a missing value. The table gets a caption, and the rows are grouped. Here is the repaired version.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <caption>Walk times</caption>
      <thead>
        <tr>
          <th scope="col">Walk</th>
          <th scope="col">Length</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mill Creek</th>
          <td>5 km</td>
          <td>2 hours</td>
        </tr>
        <tr>
          <th scope="row">Ridge Trail</th>
          <td>7 km</td>
          <td>3 hours</td>
        </tr>
      </tbody>
    </table>`,
            },
            {
              type: "paragraph",
              text: "Other mistakes are about intent. One is using a table for layout, which the last lesson covered. Another is nesting tables, which is hard to follow and rarely needed. A third is putting a whole paragraph in a cell, when a list or a set of headed sections would read better. A fourth is leaving cells empty, instead of writing `n/a`.",
            },
            {
              type: "paragraph",
              text: "Styling can hide problems, too. If you add borders and spacing, a table with missing headings may look perfect, while still being unusable for a listener. Do not judge a table only by its look. Read through the markup, and check that every heading is a `th`, every row is complete, and every table has a caption.",
            },
            {
              type: "paragraph",
              text: "One more habit helps: change the data and see what breaks. Add a row, remove a column, make a value much longer. If the table still reads clearly, and nothing needs editing in three places, the structure is sound. If a change forces edits everywhere, a span or a hand-made layout is probably hiding in the markup.",
            },
            {
              type: "paragraph",
              text: "A good review has four questions. Is every heading a `th`, with a scope? Does every row have the same number of cells once spans are counted? Does the table have a caption, and does it need one more sentence of explanation? Is it really tabular data? If all four have good answers, your table is in good shape.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    buildAWalkTimetable,

    /* ------------------------------------------------------------------ */
    {
          id: "tables-quiz",
          kind: "quiz",
          title: "Quiz: tables",
          summary: "Seventeen questions on rows, cells, headings, sections, captions, spans, columns, styling, accessibility and layout.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "Which element is a row of a table?",
              options: ["`td`", "`tr`", "`th`", "`row`"],
              answerIndex: 1,
              explanation: "The `tr` element is a table row. It holds cells, written as `td` or `th`.",
            },
            {
              prompt: "What is the difference between `th` and `td`?",
              options: [
                "There is no difference",
                "`th` is bold and `td` is plain, and nothing more",
                "`th` is for rows and `td` is for columns",
                "`th` is for headings and `td` is for data",
              ],
              answerIndex: 3,
              explanation: "A `th` is a heading cell, which labels others. The bold look is only the default style.",
            },
            {
              prompt: "A table has three columns. How many cells should each row have, if there are no spans?",
              options: ["Three", "One", "It does not matter", "As many as the longest cell"],
              answerIndex: 0,
              explanation: "Every row should add up to the same number of columns, so each has three cells here.",
            },
            {
              prompt: "What does `scope=\"col\"` on a `th` tell a screen reader?",
              options: [
                "The heading is hidden",
                "The heading labels the row beside it",
                "The heading labels the column below it",
                "The heading is a link",
              ],
              answerIndex: 2,
              explanation: "`scope` says which direction the heading applies to, so assistive tools can announce it with each cell.",
            },
            {
              prompt: "Where does the `caption` element go?",
              options: ["After the last row", "As the first child of the `table`", "Inside `thead`", "Anywhere inside a `td`"],
              answerIndex: 1,
              explanation: "The caption must be the first child of the table, and it names the table.",
            },
            {
              prompt: "Which elements group a table's rows into sections?",
              options: ["`header`, `main` and `footer`", "`head`, `body` and `foot`", "`top`, `middle` and `bottom`", "`thead`, `tbody` and `tfoot`"],
              answerIndex: 3,
              explanation: "The three section elements are `thead`, `tbody` and `tfoot`.",
            },
            {
              prompt: "A table has rows written straight inside the `table`, with no `tbody`. What does the browser do?",
              options: [
                "Refuses to display it",
                "Moves the rows into `thead`",
                "Adds a `tbody` itself in its internal model",
                "Removes the rows",
              ],
              answerIndex: 2,
              explanation: "Browsers add the `tbody` automatically, which is why a selector such as `table > tr` does not match.",
            },
            {
              prompt: "What does `colspan=\"2\"` do?",
              options: ["Makes the cell two columns wide", "Makes the cell two rows tall", "Repeats the cell twice", "Splits the cell in two"],
              answerIndex: 0,
              explanation: "It stretches the cell across two columns, so the row needs one fewer cell elements.",
            },
            {
              prompt: "A cell has `rowspan=\"2\"`. What must the next row do?",
              options: [
                "Repeat the cell",
                "Leave out one cell, because the spanning cell already occupies that position",
                "Add one more cell",
                "Nothing",
              ],
              answerIndex: 1,
              explanation: "The spanning cell takes a place in the next row, so that row needs one fewer cell.",
            },
            {
              prompt: "What are `colgroup` and `col` for?",
              options: [
                "Merging cells",
                "Sorting the data",
                "Adding a caption",
                "Describing columns so you can style or size a whole column",
              ],
              answerIndex: 3,
              explanation: "A table is built by rows, so `col` is the only element that stands for a column, and it supports a few styles such as background and width.",
            },
            {
              prompt: "Which CSS property joins the borders of neighbouring cells into single lines?",
              options: ["`border-collapse: collapse`", "`border-join: yes`", "`cell-border: single`", "`table-border: 1px`"],
              answerIndex: 0,
              explanation: "By default, each cell keeps its own border, which looks like double lines. `border-collapse: collapse` merges them.",
            },
            {
              prompt: "Why align a column of numbers to the right?",
              options: [
                "It is required by HTML",
                "It makes the table smaller",
                "The digits line up, so values are easy to compare",
                "It helps screen readers",
              ],
              answerIndex: 2,
              explanation: "Right-aligned numbers put units, tens and hundreds in the same columns, which makes comparison quick.",
            },
            {
              prompt: "What is a good fix for a table that is too wide for a phone?",
              options: [
                "Reduce the font until it fits",
                "Wrap it in a container with `overflow-x: auto`",
                "Hide the table",
                "Use a smaller screen",
              ],
              answerIndex: 1,
              explanation: "A scrolling wrapper keeps the page tidy, and the data stays complete and readable.",
            },
            {
              prompt: "Why does a scrolling wrapper need `tabindex=\"0\"`?",
              options: [
                "To make it scroll",
                "To make the table sortable",
                "To hide the scrollbar",
                "So that keyboard users can focus it and scroll with the arrow keys",
              ],
              answerIndex: 3,
              explanation: "A scrolling region is not reachable by keyboard unless it can take focus.",
            },
            {
              prompt: "Which content should be a table?",
              options: [
                "A page header with a logo and links",
                "A row of product cards",
                "A timetable of walks with lengths and times",
                "A sidebar",
              ],
              answerIndex: 2,
              explanation: "A table is for data with row and column headings, such as a timetable. The others are layouts.",
            },
            {
              prompt: "A table has no empty value for a missing time. What is best to write in the cell?",
              options: ["A short word such as `n/a`, or a dash", "Nothing", "A line break", "The previous value"],
              answerIndex: 0,
              explanation: "A blank cell leaves a listener unsure whether the data is zero, missing or lost.",
            },
            {
              prompt: "Which is a mistake in `<td><b>Walk</b></td>` used as a heading?",
              options: ["It should be a `caption`", "It should be a `th`, with `scope`", "It should be a `colgroup`", "Nothing, it is fine"],
              answerIndex: 1,
              explanation: "Bold text in a `td` looks like a heading, but nothing tells assistive tools that it is one.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "tables-review",
          kind: "review",
          title: "Review: tables",
          summary: "Rows and cells, headings and scope, sections, captions, spans, columns, styling, accessibility, responsive tables and mistakes.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "A table is for data in rows and columns. It is built row by row: a `table` holds `tr` rows, and each row holds `th` heading cells and `td` data cells. Every row should add up to the same number of columns, and the columns appear by themselves. Never use a table for layout, since a screen reader will announce it as data.",
            },
            {
              type: "code",
              language: "html",
              code: `<table>
      <caption>Walk times</caption>
      <thead>
        <tr><th scope="col">Walk</th><th scope="col">Length</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Mill Creek</th><td>5 km</td></tr>
      </tbody>
    </table>`,
            },
            {
              type: "paragraph",
              text: "Headings are `th`, with `scope` set to `col` or `row`, so assistive tools can announce the labels for every cell. Group rows with `thead`, `tbody` and `tfoot`, and give the table a `caption` as its first child. Browsers add a `tbody` themselves when you leave it out, which matters for CSS selectors.",
            },
            {
              type: "paragraph",
              text: "`colspan` and `rowspan` join cells. Count the grid by adding the spans in each row, and remember that a `rowspan` leaves out a cell in the rows below it. Use spans sparingly, because they make a table harder to follow. `colgroup` and `col` describe columns, and take only a few styles such as background and width.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      table { border-collapse: collapse; }
      th, td { padding: 0.5rem; border: 1px solid #cbd5e1; }
      td:nth-child(2) { text-align: right; }
    </style>`,
            },
            {
              type: "paragraph",
              text: "Style tables with `border-collapse`, padding, alignment and stripes, and align numbers to the right. For a table that is too wide, wrap it in a container with `overflow-x: auto`, `tabindex=\"0\"`, a `role` of region and an `aria-label`. Use `n/a` for missing values, avoid empty cells, and check every table with four questions: are the headings `th`, does every row have the same count, is there a caption, and is it really tabular data?",
            },
          ],
        },
  ],
};

export default content;
