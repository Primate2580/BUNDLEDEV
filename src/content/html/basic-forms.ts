import type { TopicContent } from "@/engine/types";
import buildABookingForm from "./basic-forms/workshops/build-a-booking-form/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-form",
          kind: "learn",
          title: "What is a form?",
          summary: "The form element, its controls, and what happens when a visitor presses Send.",
          minutes: 8,
          concept: {
            description: "A **form** collects information from a visitor and sends it somewhere. You build one with the `form` element, which wraps a set of **controls** such as text boxes, menus and buttons. When the visitor submits it, the browser gathers what they entered and sends it to the address in the form's `action`.",
            why: "Forms are how the web listens. Sign-ups, searches, orders, comments and contact messages all travel through them. They are also where accessibility problems pile up, because a form asks a person to do something, so a confusing one stops them. Learning the basics well makes everything later easier.",
            mentalModel: "Think of a paper form at a clinic. It has labelled boxes to fill in, a few choices to tick, and a place to hand it in. The `form` element is the clipboard that holds the whole thing together.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at how the pieces are nested. The preview will not send anything anywhere, but you can type into it.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/subscribe" method="post">
      <p>
        <label for="email">Email address</label>
        <input type="email" id="email" name="email">
      </p>
      <button type="submit">Subscribe</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "The `form` has two attributes. The `action` is the address that receives the data, and the `method` is how the data is sent, either `get` or `post`. Inside it are the controls: a `label` that names a field, an `input` where the visitor types, and a `button` that sends the form. The paragraph around the label and input is only there to give them a line of their own.",
            },
            {
              type: "paragraph",
              text: "When the visitor selects the button, the browser reads each control that has a `name`, builds a list of name and value pairs, and sends them to the `action`. Here the pair would be `email` and whatever the visitor typed. A server, or a script, then reads the pairs and does something with them. Writing that server is outside this course, but the pairs are exactly what the form's HTML decides.",
            },
            {
              type: "paragraph",
              text: "Notice what the form does not do on its own. It does not check that an address looks real, beyond what the `type` allows, and it does not store anything. HTML only collects and sends. Checking and saving belong to code on the server, and also to the browser's built-in checks, which you will meet in the next topic.",
            },
            {
              type: "paragraph",
              text: "A form can also have no `action` at all. Then it sends the data to the address of the page it is on. And a form can be handled entirely by JavaScript, which listens for the submit and does its own work. You will see that in the JavaScript course, and in either case, the HTML structure you learn here stays the same.",
            },
            {
              type: "paragraph",
              text: "Over the following lessons, you will add the controls one kind at a time: text fields, menus, checkboxes, radio buttons and buttons. You will also learn how to group them, label them so everybody can use them, and lay them out clearly. Keep the small subscribe form in mind, because every form is that same shape, with more controls inside.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "labels-and-inputs",
          kind: "learn",
          title: "Labels and inputs",
          summary: "How label and input are joined, and why a placeholder is not a label.",
          minutes: 8,
          concept: {
            description: "A **label** is the visible name of a form control, and the **input** element is the control itself. They are joined by an attribute pair: the label's `for` must match the input's `id`. Once joined, clicking the label focuses the input, and a screen reader announces the label when the input is reached.",
            why: "An input with no label is a box with no name. Sighted users guess from nearby text, and screen reader users hear only \"edit text\". A proper label fixes both, and it also enlarges the area you can click, which helps everyone on a touch screen.",
            mentalModel: "Think of a name tag stuck beside a coat hook. The tag is only useful if it is clearly attached to one hook, and `for` and `id` are the string that ties them together.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. Click the word `Name` and see what happens in the box.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="name">Name</label>
    <input type="text" id="name" name="name">`,
            },
            {
              type: "paragraph",
              text: "The label has `for=\"name\"`, and the input has `id=\"name\"`. The two values must match exactly. When you click the label, the browser puts the cursor in the input, which shows that the two are properly joined. If you mistype one of them, the click does nothing, and a screen reader no longer links them, which is a common bug.",
            },
            {
              type: "paragraph",
              text: "There is a second way to join them. You can wrap the input inside the label, and then no `for` or `id` is needed, because the nesting makes the connection. Both ways are valid, and many developers prefer the first because it gives more freedom in layout.",
            },
            {
              type: "code",
              language: "html",
              code: `<label>
      Name
      <input type="text" name="name">
    </label>`,
            },
            {
              type: "paragraph",
              text: "A tempting shortcut is to skip the label and use a `placeholder`, the grey hint text inside the box. Do not. The placeholder vanishes as soon as someone types, so a person who looks away forgets what the field was for. It is often low in contrast, and not every screen reader announces it. A placeholder is a hint about the format, such as `name@example.com`, and the label is the name.",
            },
            {
              type: "paragraph",
              text: "Keep labels short and clear, written in plain words that say what to enter, such as `Email address`, not `Enter your email address in this box`. Put the label where people expect it, above the box on a small screen or beside it on a wide one, and keep it visible all the time.",
            },
            {
              type: "paragraph",
              text: "Each `id` on a page must be unique, and the `for` of a label should point to exactly one control. If two inputs share an `id`, the label links to the first, and the second is left without a name. When a form has many fields, read through the ids once, and make sure that each one is used only once.",
            },
            {
              type: "paragraph",
              text: "The `name` attribute is separate from `id`. The `id` links a label to an input, and the `name` tells the browser what to call the value when it sends the form. You will see more of `name` in a later lesson, and it is worth getting used to writing both on every field.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-label-the-fields",
          kind: "lab",
          title: "Lab: label the fields",
          mode: "html",
          summary: "A contact form that uses only placeholders. Give every control a real label and a name.",
          minutes: 9,
          starter: {
            html: `<form action="/contact" method="post">
      <p><input type="text" placeholder="Your name"></p>
      <p><input type="email" placeholder="Email address"></p>
      <p><textarea placeholder="Your message"></textarea></p>
      <button type="submit">Send</button>
    </form>`,
            css: "",
          },
          challenge: {
            title: "Label every control",
            description: "This form relies on placeholders, so none of its controls has a label or a name. Give the three controls the ids `name`, `email` and `message`, the same words as their `name` attributes, and a `label` for each, joined with `for`. Use the old placeholder words as the label text, and remove the placeholders.",
            hints: [
              "For each control: an `id`, a `name`, and a `label` whose `for` matches the `id`.",
              "Keep the `type` of each input as it is. The message box is a `textarea`.",
              "`<label for=\"name\">Your name</label>` and `<input type=\"text\" id=\"name\" name=\"name\">`",
            ],
            checks: [
              {
                type: "a11y",
                rule: "label-for-input",
                message: "Every form control has a label",
              },
              {
                type: "exists",
                selector: "label[for=\"name\"] + input#name[name=\"name\"]",
                message: "The name field has a label, an id and a name",
              },
              {
                type: "exists",
                selector: "label[for=\"email\"] + input#email[type=\"email\"][name=\"email\"]",
                message: "...the email field too",
              },
              {
                type: "exists",
                selector: "label[for=\"message\"] + textarea#message[name=\"message\"]",
                message: "...and the message box.",
              },
            ],
            solution: {
              html: `<form action="/contact" method="post">
      <p>
        <label for="name">Your name</label>
        <input type="text" id="name" name="name">
      </p>
      <p>
        <label for="email">Email address</label>
        <input type="email" id="email" name="email">
      </p>
      <p>
        <label for="message">Your message</label>
        <textarea id="message" name="message"></textarea>
      </p>
      <button type="submit">Send</button>
    </form>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "input-types",
          kind: "learn",
          title: "Input types",
          summary: "text, email, password, number, tel, url and search, and what the type changes.",
          minutes: 8,
          concept: {
            description: "The `input` element changes its behaviour with its `type` attribute. The default is `text`, a plain one-line box. Other types, such as `email`, `password`, `number`, `tel`, `url` and `search`, tell the browser what kind of value to expect, and it adapts the keyboard, the checks and the display.",
            why: "Picking the right type is a small decision that helps a lot. On a phone, an `email` field shows a keyboard with an at sign, and a `tel` field shows a dial pad. Browsers can also check the format, and password managers recognise a `password` field. The type does the work for you.",
            mentalModel: "Think of choosing the right tool from a drawer. A screwdriver and a wrench both turn things, but each fits a particular job, and the right one saves effort.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the type of each field.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><label for="n1">Name</label>
       <input type="text" id="n1" name="name"></p>
    
    <p><label for="e1">Email</label>
       <input type="email" id="e1" name="email"></p>
    
    <p><label for="p1">Password</label>
       <input type="password" id="p1" name="password"></p>`,
            },
            {
              type: "paragraph",
              text: "The `text` type is the plain box, good for names and short answers. The `email` type expects an address, so a browser can show a keyboard with an at sign and warn when one is missing. The `password` type hides what is typed behind dots. Each is the same `input` element, and only the `type` differs.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><label for="t1">Phone</label>
       <input type="tel" id="t1" name="phone"></p>
    
    <p><label for="u1">Website</label>
       <input type="url" id="u1" name="website"></p>
    
    <p><label for="s1">Search</label>
       <input type="search" id="s1" name="q"></p>`,
            },
            {
              type: "paragraph",
              text: "The `tel` type brings up a dial pad on phones. It does not check the format, because phone numbers vary a lot from place to place. The `url` type expects a full web address, and `search` looks like a text box but may add a clear button. In all three, the type is a hint to the browser, and it makes entry easier.",
            },
            {
              type: "paragraph",
              text: "The `number` type shows a box that accepts digits, with small arrows to step up and down. It suits quantities, such as how many people are coming. It does not suit values that are not really numbers, such as a phone number, a postcode or a card number, because they may start with zero or include spaces, and the arrows would be useless.",
            },
            {
              type: "paragraph",
              text: "There are more types, such as `date`, `time`, `range`, `color` and `file`. They are covered in the next topic, together with the checks that go with them. For now, remember the rule: choose the type that matches what the visitor enters, and if nothing fits, `text` is always safe.",
            },
            {
              type: "paragraph",
              text: "A good habit is to add the `autocomplete` attribute as well, which lets the browser fill in known values such as a name or an email address. You will meet it in the lesson on hints and defaults, but it is worth knowing that the type and the autocomplete value work together to save visitors typing.",
            },
            {
              type: "paragraph",
              text: "Browsers that do not know a type simply treat it as `text`, so using a newer type never breaks a form. It only misses out on the extras, and the visitor can still type in the box. That is a good reason to use the specific types freely.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-unlabelled-form",
          kind: "debug",
          title: "Debug: the unlabelled form",
          mode: "html",
          summary: "A sign-up form where one label points at nothing, one field has only a placeholder, and one field would never be sent.",
          minutes: 8,
          broken: {
            html: `<form action="/signup" method="post">
      <label for="user-name">Name</label>
      <input type="text" id="username" name="username">
      <input type="email" placeholder="Email">
      <label>Password <input type="password"></label>
      <button type="submit">Join</button>
    </form>`,
            css: "",
          },
          challenge: {
            title: "Join the labels and names",
            description: "This form has three problems. The `Name` label points at an id that does not exist, the email field has only a placeholder, and the password field has no `name`, so it would never be sent. Fix them: join the name label to its input, give the email field a label, an `id` and the name `email`, and give the password field the name `password`.",
            hints: [
              "Compare the label's `for` with the input's `id`, letter by letter.",
              "The email input needs an `id`, a `name` and a `label` that points at the `id`.",
              "A field with no `name` is not sent, so add `name=\"password\"`.",
            ],
            checks: [
              {
                type: "a11y",
                rule: "label-for-input",
                message: "Every form control has a label",
              },
              {
                type: "exists",
                selector: "label[for=\"username\"] + input#username",
                message: "The name label is joined to its input",
              },
              {
                type: "exists",
                selector: "label[for=\"email\"] + input#email[name=\"email\"]",
                message: "...the email field has a label, an id and a name",
              },
              {
                type: "exists",
                selector: "input[type=\"password\"][name=\"password\"]",
                message: "...and the password field has a name.",
              },
            ],
            solution: {
              html: `<form action="/signup" method="post">
      <label for="username">Name</label>
      <input type="text" id="username" name="username">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label>Password <input type="password" name="password"></label>
      <button type="submit">Join</button>
    </form>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "names-and-submitting",
          kind: "learn",
          title: "Names, values and submitting",
          summary: "How the name attribute decides what is sent, and the difference between GET and POST.",
          minutes: 8,
          concept: {
            description: "When a form is submitted, the browser sends a list of **name and value pairs**. The name comes from each control's `name` attribute, and the value is what the visitor entered or chose. A control with no `name` is not sent at all. The form's `method` decides whether the pairs travel in the address or in the body of the request.",
            why: "Many form bugs come down to a missing or misspelt `name`. The field looks perfect, the visitor fills it in, and nothing arrives. Knowing exactly what gets sent, and how, lets you debug a form by thinking, without a server.",
            mentalModel: "Think of posting a parcel with a packing list. Each line has an item's name and quantity, and anything not written on the list does not get packed.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. It is a search form that sends its data in the address.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/search" method="get">
      <label for="q">Search walks</label>
      <input type="text" id="q" name="q">
      <button type="submit">Search</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "If a visitor types `creek` and presses the button, the browser goes to `/search?q=creek`. The part after the question mark is the **query string**, and it holds the name `q` and the value `creek`. With several fields, the pairs are joined by ampersands, as in `q=creek&sort=time`. Spaces become plus signs, and special characters are encoded.",
            },
            {
              type: "paragraph",
              text: "That is the `get` method. The data is visible in the address, which makes it easy to bookmark and share, so it suits searches and filters. It is a poor choice for private or large data, because the address ends up in history, and may be logged. For anything that changes something or holds a secret, use `post`.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/signup" method="post">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <button type="submit">Join</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "With `post`, the same pairs travel in the body of the request, so they do not appear in the address. This is the method for sign-ups, logins, orders and messages. Notice that it does not make the data secure on its own: for that, the site must use `https`, so the connection is encrypted.",
            },
            {
              type: "paragraph",
              text: "A few more rules decide what is sent. A control that is `disabled` is skipped. A checkbox or radio button is sent only if it is checked. A button is sent only if it was the one pressed, and only if it has a `name`. Controls outside the `form` are not sent, unless they use the `form` attribute to join one.",
            },
            {
              type: "paragraph",
              text: "When a field seems to vanish, work through a short list. Does the control have a `name`? Is it inside the right form? Is it disabled? Is it a checkbox that was not ticked? These four questions solve most of the missing-data bugs you will meet, and they take seconds to check. Reading a form as a list of pairs, line by line, is also the best way to review one, and each name should be clear enough for a developer on the server side to use.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-submission",
          kind: "predict",
          title: "Predict the submission",
          summary: "A search form with a text box, two checkboxes, a menu and one unnamed box. Work out which name and value pairs it sends.",
          minutes: 8,
          mode: "html",
          intro: "Imagine pressing the Search button without changing anything. Decide which pairs the browser sends, and in what form, then run the code to look at the markup.",
          code: {
            html: `<form action="/search" method="get">
      <input type="text" name="q" value="mill creek">
      <input type="checkbox" name="easy" value="yes" checked>
      <input type="checkbox" name="hard" value="yes">
      <select name="sort">
        <option value="length">Length</option>
        <option value="time" selected>Time</option>
      </select>
      <input type="text" value="ignored">
      <button type="submit">Search</button>
    </form>`,
            css: "",
          },
          questions: [
            {
              prompt: "The last text box has `value=\"ignored\"` but no `name`. Is it sent?",
              options: [
                "Yes, as `value=ignored`",
                "Yes, as an empty pair",
                "No, a control without a name is left out",
                "Only if the visitor edits it",
              ],
              answerIndex: 2,
              hint: "What does the browser use to label each value?",
              explanation: "The browser builds pairs from each control's `name`. A control without one has nothing to be sent under, so it is left out.",
              proves: [
                {
                  type: "count",
                  selector: "input:not([name])",
                  message: "Exactly one input has no `name`.",
                  min: 1,
                  max: 1,
                },
              ],
            },
            {
              prompt: "The checkbox `hard` is not ticked. What does the form send for it?",
              options: ["`hard=no`", "Nothing at all", "`hard=` with an empty value", "`hard=off`"],
              answerIndex: 1,
              hint: "Think about what a server can learn from an unticked box.",
              explanation: "An unticked checkbox contributes nothing. The server knows the box was unticked only because the pair is missing.",
              proves: [
                {
                  type: "exists",
                  selector: "input[name=\"hard\"]:not([checked])",
                  message: "The `hard` checkbox is not ticked.",
                },
              ],
            },
            {
              prompt: "Which value is sent for `sort`?",
              options: ["`time`", "`Time`", "`length`", "Nothing, because it is a menu"],
              answerIndex: 0,
              hint: "Compare the visible text with the `value` attribute of the selected option.",
              explanation: "The visitor sees `Time`, but the browser sends the option's `value`, which is `time`, in lower case.",
              proves: [
                {
                  type: "exists",
                  selector: "option[value=\"time\"][selected]",
                  message: "The `time` option is selected.",
                },
              ],
            },
            {
              prompt: "What does the address look like after the browser submits the form with the `get` method?",
              options: [
                "`/search?easy=yes&hard=yes`",
                "`/search?q=mill creek&easy&hard&sort=Time`",
                "`/search` with no extra part",
                "`/search?q=mill+creek&easy=yes&sort=time`",
              ],
              answerIndex: 3,
              hint: "Pairs are joined with ampersands, and spaces become plus signs.",
              explanation: "Only named controls that carry a value are sent: the text box, the ticked checkbox and the menu. The pairs are joined by ampersands, and the space in `mill creek` becomes a plus sign.",
              proves: [
                {
                  type: "attribute",
                  selector: "form",
                  attribute: "method",
                  message: "The form uses the `get` method.",
                  expected: "get",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "textareas-and-selects",
          kind: "learn",
          title: "Text areas and menus",
          summary: "textarea for long text, and select with option for a choice from a list.",
          minutes: 8,
          concept: {
            description: "The `textarea` element is a multi-line text box, for messages and comments. The `select` element is a drop-down menu, and each choice in it is an `option`. Both are form controls with a `name`, a `label` and a value, just like an `input`.",
            why: "A single-line input is too small for a message, and a free-text box is the wrong tool when the answer must be one of a few known values. These two controls cover those cases, and they are everywhere on the web, from contact forms to country pickers.",
            mentalModel: "Think of a notepad and a menu in a restaurant. One gives you room to write anything, and the other gives you a fixed list from which to pick.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with the notepad. Open the example in the Playground and type several lines into the box.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="notes">Anything we should know?</label>
    <textarea id="notes" name="notes" rows="4" cols="40"></textarea>`,
            },
            {
              type: "paragraph",
              text: "The `textarea` is not an empty element, so it has a closing tag, and anything you write between the tags becomes its starting text. The `rows` and `cols` attributes set the starting size, and CSS can change it later. Browsers let visitors drag a corner to resize it, which you can allow or turn off with the `resize` property.",
            },
            {
              type: "paragraph",
              text: "Now the menu. Open the next example and look at how the choices are written.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="walk">Which walk?</label>
    <select id="walk" name="walk">
      <option value="mill-creek">Mill Creek</option>
      <option value="ridge-trail" selected>Ridge Trail</option>
      <option value="heron-lake">Heron Lake</option>
    </select>`,
            },
            {
              type: "paragraph",
              text: "Each `option` has a `value` and a visible text. The value is what is sent to the server, and the text is what the visitor reads, so they can differ: the visitor sees `Mill Creek`, and the form sends `mill-creek`. The `selected` attribute makes an option the starting choice. If no option has it, the first one is chosen.",
            },
            {
              type: "paragraph",
              text: "A common pattern is a first option with an empty value that acts as a prompt, such as `Choose a walk`. It makes the visitor choose on purpose, instead of sending a default they did not notice. Combined with `required`, which you will meet shortly, the form will not submit until a real choice is made.",
            },
            {
              type: "code",
              language: "html",
              code: `<select id="walk2" name="walk2" required>
      <option value="">Choose a walk</option>
      <option value="mill-creek">Mill Creek</option>
    </select>`,
            },
            {
              type: "paragraph",
              text: "For long lists, `optgroup` groups the options under a heading, as in `<optgroup label=\"North\">`, and the `multiple` attribute lets visitors choose more than one. A multiple-choice menu is clumsy to use, though, so for a handful of choices, checkboxes are usually kinder. You will meet them in the next lesson.",
            },
            {
              type: "paragraph",
              text: "Whatever you choose, make sure the control has a label and a `name`. A `select` or a `textarea` without a label is as much of a problem as an input without one, and the same `for` and `id` pairing fixes it.",
            },
            {
              type: "paragraph",
              text: "Whenever a visitor must pick one of a few, ask how many options there are. For two or three, radio buttons show everything at a glance. For four to about ten, a `select` is compact. For many more, consider a search box. The right control depends on the number of choices.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "checkboxes-and-radios",
          kind: "learn",
          title: "Checkboxes and radio buttons",
          summary: "Choosing several, or exactly one: type checkbox, type radio and the name that groups them.",
          minutes: 8,
          concept: {
            description: "A **checkbox** is a box that is either ticked or not, and several can be ticked at once. A **radio button** is one of a group of round buttons, and choosing one clears the others. Both are `input` elements, with `type=\"checkbox\"` or `type=\"radio\"`.",
            why: "Visitors often need to say yes or no, or pick one option from a few. These controls show every choice at a glance, and make the default clear. They also have rules about names, values and groups, which are easy to get wrong.",
            mentalModel: "Think of a paper form. A checkbox is a square for \"tick if it applies\", and radio buttons are the old car radio presets, where pressing one pops the others out.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with checkboxes. Open the example in the Playground and tick both boxes.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>
      <input type="checkbox" id="reminder" name="reminder" value="yes">
      <label for="reminder">Send me a reminder</label>
    </p>
    <p>
      <input type="checkbox" id="news" name="news" value="yes" checked>
      <label for="news">Send me the newsletter</label>
    </p>`,
            },
            {
              type: "paragraph",
              text: "Each checkbox is independent, with its own `name`. The `checked` attribute ticks it from the start. When the form is sent, a ticked box contributes its name and value, such as `news=yes`, and an unticked box contributes nothing at all, so the server cannot tell it was ever there. That is why the `value` matters: if you leave it out, the browser sends `on`.",
            },
            {
              type: "paragraph",
              text: "The label is on the right of the box here, which is the convention, and it is joined with `for` and `id` as before. Because the whole label is clickable, the target is much bigger than the tiny square, which helps a lot on a phone.",
            },
            {
              type: "paragraph",
              text: "Radio buttons work differently. They are grouped by sharing the same `name`, and only one in the group can be chosen. Open the next example, and try choosing each size.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>
      <input type="radio" id="small" name="size" value="small" checked>
      <label for="small">Small (1 to 4 people)</label>
    </p>
    <p>
      <input type="radio" id="large" name="size" value="large">
      <label for="large">Large (5 or more)</label>
    </p>`,
            },
            {
              type: "paragraph",
              text: "Both inputs have `name=\"size\"`, which makes them a group. The `id` values are different, so each label can point at its own button, and the `value` is what is sent for the chosen one, such as `size=large`. If the names are different, the buttons stop being a group, and visitors can choose both, which is a very common mistake.",
            },
            {
              type: "paragraph",
              text: "Always give one radio button in a group a `checked` attribute, unless having no choice is meaningful. A group with nothing chosen can be left that way by accident, and once someone picks a radio button, they cannot unpick it, except by reloading. If the answer is optional, add a \"No preference\" choice, instead of leaving the group empty.",
            },
            {
              type: "paragraph",
              text: "To decide between the two, ask whether the choices exclude each other. If the visitor may pick any number, such as extras for an order, use checkboxes. If they must pick exactly one, such as a size, use radio buttons. If it is a single yes or no, one checkbox is the neatest answer. Write its label as a statement the visitor agrees with, such as `Send me a reminder`, so that a ticked box clearly means yes.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-radio-groups",
          kind: "predict",
          title: "Predict the radio groups",
          summary: "Three sets of radio buttons: one properly grouped, one left untouched and one with different names. Work out how each behaves.",
          minutes: 8,
          mode: "html",
          intro: "Look at the `name` of every radio button. It decides which buttons form a group. Answer the questions, and then run the code and click the buttons to check.",
          code: {
            html: `<form>
      <fieldset>
        <legend>Size</legend>
        <input type="radio" id="s" name="size" value="s"> <label for="s">Small</label>
        <input type="radio" id="m" name="size" value="m" checked> <label for="m">Medium</label>
        <input type="radio" id="l" name="size" value="l"> <label for="l">Large</label>
      </fieldset>
      <fieldset>
        <legend>Route</legend>
        <input type="radio" id="ra" name="route" value="a"> <label for="ra">Mill Creek</label>
        <input type="radio" id="rb" name="route" value="b"> <label for="rb">Ridge Trail</label>
      </fieldset>
      <fieldset>
        <legend>Two lone radio buttons</legend>
        <input type="radio" id="x" name="x" value="1"> <label for="x">One</label>
        <input type="radio" id="y" name="y" value="1"> <label for="y">Two</label>
      </fieldset>
    </form>`,
            css: "",
          },
          questions: [
            {
              prompt: "In the `size` group, how many buttons can be chosen at the same time?",
              options: ["None", "Two", "All three", "One"],
              answerIndex: 3,
              hint: "What do the three buttons share?",
              explanation: "All three have `name=\"size\"`, so they form a group, and choosing one clears the others.",
              proves: [
                {
                  type: "count",
                  selector: "input[type=\"radio\"][name=\"size\"]",
                  message: "Three radio buttons share the name `size`.",
                  min: 3,
                  max: 3,
                },
              ],
            },
            {
              prompt: "A visitor chooses `Large` and submits. Which pair is sent for the group?",
              options: ["`size=Large`", "`size=l`", "`l=size`", "`m=size`"],
              answerIndex: 1,
              hint: "The browser sends the name and the value of the chosen button.",
              explanation: "The pair is the group's `name` and the chosen button's `value`, so it is `size=l`. The label text is never sent.",
              proves: [
                {
                  type: "exists",
                  selector: "input#l[value=\"l\"]",
                  message: "The `Large` button has the value `l`.",
                },
              ],
            },
            {
              prompt: "A visitor never touches the `route` group. What is sent for it?",
              options: ["Nothing, because no button is chosen", "`route=` with an empty value", "`route=a`, the first button", "`route=none`"],
              answerIndex: 0,
              hint: "Neither button has the `checked` attribute.",
              explanation: "With nothing chosen, the group contributes no pair at all. If the answer matters, give one button `checked`, or add a required check.",
              proves: [
                {
                  type: "count",
                  selector: "input[name=\"route\"][checked]",
                  message: "No button in the `route` group is checked.",
                  max: 0,
                },
              ],
            },
            {
              prompt: "In the last set, the two buttons have different names. Can both be chosen?",
              options: [
                "No, radio buttons always allow one choice",
                "Only if the visitor holds a key",
                "Yes, because they are not in the same group",
                "No, the browser merges them",
              ],
              answerIndex: 2,
              hint: "Grouping depends on the `name`, not on the position on the page.",
              explanation: "Radio buttons are grouped only by sharing a `name`. Different names mean two groups of one button each, so both can be chosen, which is a common mistake.",
              proves: [
                {
                  type: "exists",
                  selector: "input[name=\"x\"]",
                  message: "One lone button is named `x`.",
                },
                {
                  type: "exists",
                  selector: "input[name=\"y\"]",
                  message: "...and the other is named `y`.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-radio-group",
          kind: "debug",
          title: "Debug: the radio group",
          mode: "html",
          summary: "Two radio buttons that are not a group, share an id, and have a question that is not attached to them.",
          minutes: 8,
          broken: {
            html: `<form action="/book" method="post">
      <p>Group size</p>
      <input type="radio" id="size" name="size-small" value="small">
      <label for="size">Small</label>
      <input type="radio" id="size" name="size-large" value="large">
      <label for="size">Large</label>
      <button type="submit">Send</button>
    </form>`,
            css: "",
          },
          challenge: {
            title: "Make it a proper group",
            description: "These two radio buttons have different names, so both can be chosen. They also share the id `size`, so the second label points at the first button. And the question, `Group size`, is a plain paragraph. Give the buttons the same name, `size`, and the unique ids `small` and `large`, with labels that point at them, and replace the paragraph with a `fieldset` and a `legend`.",
            hints: [
              "Radio buttons are grouped by sharing a `name`, and ids must be unique.",
              "Each `label` needs a `for` that matches exactly one `id`.",
              "`<fieldset><legend>Group size</legend> ... </fieldset>`",
            ],
            checks: [
              {
                type: "a11y",
                rule: "label-for-input",
                message: "Every form control has a label",
              },
              {
                type: "count",
                selector: "input[type=\"radio\"][name=\"size\"]",
                message: "The two radio buttons share the name `size`",
                min: 2,
                max: 2,
              },
              {
                type: "exists",
                selector: "input#small + label[for=\"small\"]",
                message: "...the first has its own id and label",
              },
              {
                type: "exists",
                selector: "input#large + label[for=\"large\"]",
                message: "...so does the second",
              },
              {
                type: "exists",
                selector: "fieldset > legend",
                message: "...and the question is a legend.",
              },
            ],
            solution: {
              html: `<form action="/book" method="post">
      <fieldset>
        <legend>Group size</legend>
        <input type="radio" id="small" name="size" value="small">
        <label for="small">Small</label>
        <input type="radio" id="large" name="size" value="large">
        <label for="large">Large</label>
      </fieldset>
      <button type="submit">Send</button>
    </form>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "fieldset-and-legend",
          kind: "learn",
          title: "Fieldset and legend",
          summary: "Grouping related controls and giving the group a name.",
          minutes: 8,
          concept: {
            description: "The `fieldset` element groups related form controls, and the `legend` element gives the group a name. Browsers draw a thin box around the group, with the legend written along its top edge, but the main job is meaning: assistive tools announce the legend together with each control inside.",
            why: "A radio group on its own is a set of options with no question. \"Small\" and \"Large\" mean little unless you know that they answer \"Group size\". A `legend` attaches the question to every option, so a listener hears it as they move through the group.",
            mentalModel: "Think of a multiple-choice test. The question is printed once above the options, and every option belongs to it. The legend is the question, and the fieldset holds the options.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at how the legend and the radio buttons sit inside the fieldset.",
            },
            {
              type: "code",
              language: "html",
              code: `<fieldset>
      <legend>Group size</legend>
    
      <p>
        <input type="radio" id="small" name="size" value="small">
        <label for="small">Small (1 to 4)</label>
      </p>
      <p>
        <input type="radio" id="large" name="size" value="large">
        <label for="large">Large (5 or more)</label>
      </p>
    </fieldset>`,
            },
            {
              type: "paragraph",
              text: "The `legend` must be the first child of the `fieldset`. A screen reader will announce something like \"Group size, group. Small, radio button, one of two\", so the listener always knows both the question and the choice. Each radio button still keeps its own label, since the legend names the group and the labels name the options.",
            },
            {
              type: "paragraph",
              text: "Use a `fieldset` for any group of radio buttons, and for any set of checkboxes that answer the same question, such as \"Which extras do you want?\". You can also use one for related text fields, such as the lines of an address, though a plain heading may do just as well when the group is large.",
            },
            {
              type: "paragraph",
              text: "Browsers give the fieldset a border and some padding, and the legend sits on the border. Many designers dislike this look, and restyle it. You can remove the border with CSS, and style the legend as ordinary text, without losing any of the meaning, because the markup is what assistive tools read.",
            },
            {
              type: "code",
              language: "html",
              code: `<style>
      fieldset { border: 0; padding: 0; margin: 0 0 1rem; }
      legend { font-weight: 600; padding: 0; }
    </style>`,
            },
            {
              type: "paragraph",
              text: "One more feature is worth knowing. If you add `disabled` to a `fieldset`, every control inside it becomes disabled at once. That is handy for a section that depends on an earlier answer, since you switch the whole group on and off with a single attribute.",
            },
            {
              type: "paragraph",
              text: "Think about the words in a legend, because they are read before every option in the group. A short question or noun phrase works best, such as \"Group size\" or \"How would you like to be contacted?\". Avoid long legends, since a listener hears them again for each option, and avoid ending one with a colon, which the screen reader may read out.",
            },
            {
              type: "paragraph",
              text: "Do not wrap every control in its own fieldset. A single text field already has a label, and a fieldset around it adds noise. Use the element when a question has several controls, and the question itself needs a name. That is the rule, and it covers almost every case.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "buttons",
          kind: "learn",
          title: "Buttons",
          summary: "button and input types, and the default that surprises everybody.",
          minutes: 8,
          concept: {
            description: "A **button** lets the visitor do something. The `button` element has three types: `submit` sends the form, `reset` puts every field back to its starting value, and `button` does nothing by itself, and is for use with scripts. Inside a form, a button with no `type` is a submit button.",
            why: "The button is the last step of every form, and the one the visitor presses with the most care. Getting its type right avoids accidental submissions, and a clear label tells people exactly what will happen when they press it.",
            mentalModel: "Think of the buttons on a lift. One sends it to a floor, one opens the door, and one raises the alarm. Each has a clear label, because pressing the wrong one has a cost.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and look at the three buttons.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/book" method="post">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
    
      <button type="submit">Book a place</button>
      <button type="reset">Clear the form</button>
      <button type="button">Show help</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "The first button sends the form. The second resets it, which wipes every field, and is rarely a good idea, since a visitor can lose everything with one slip. The third does nothing on its own, and you would give it behaviour with JavaScript. Always write the `type`, so the intention is plain.",
            },
            {
              type: "paragraph",
              text: "Here is the default that surprises everybody. Inside a form, `<button>` without a `type` acts as `submit`. A button meant for something else, such as opening a help panel, then sends the form by accident. Whenever a button is not meant to submit, give it `type=\"button\"`.",
            },
            {
              type: "paragraph",
              text: "There is an older way to make a button: `<input type=\"submit\" value=\"Send\">`. It does the same job, and many forms use it. The `button` element is more flexible, because it can contain other elements, such as an icon or bold text, and it is the one to use in new code.",
            },
            {
              type: "code",
              language: "html",
              code: `<input type="submit" value="Send">
    <button type="submit">
      Send <strong>now</strong>
    </button>`,
            },
            {
              type: "paragraph",
              text: "The label of a button should say what will happen, in a verb, such as `Book a place`, `Send message` or `Subscribe`. Avoid `Submit` and `OK`, which tell the visitor nothing. If the button has only an icon, give it text that is hidden visually, or an `aria-label`, so that people who cannot see the icon still know what it does.",
            },
            {
              type: "paragraph",
              text: "You can disable a button with the `disabled` attribute, for example while a form is being sent, so a double click does not submit twice. A disabled button is skipped by the keyboard, so use it with care, and tell people why it is disabled whenever you can.",
            },
            {
              type: "paragraph",
              text: "Finally, make buttons big enough to press. A target of around 44 pixels on a side is comfortable on a touch screen, and CSS padding makes that easy. A form is often the main reason a visitor came, so a button that is easy to find and easy to press matters more than it seems.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-build-a-booking-form",
          kind: "lab",
          title: "Lab: build a booking form",
          mode: "html",
          summary: "Start with an empty form and add a text field, a menu, a group of radio buttons and a button, all properly labelled.",
          minutes: 10,
          starter: {
            html: `<h1>Book a walk</h1>
    <form action="/book" method="post">
    </form>`,
            css: "",
          },
          challenge: {
            title: "Build the form",
            description: "Fill the empty form. Add a text field named `name`, with a label. Add a menu named `walk` with three options: `Mill Creek`, `Ridge Trail` and `Heron Lake`, with a label. Add two radio buttons named `size`, `Small` and `Large`, each labelled, inside a `fieldset` whose `legend` is `Group size`. Finish with a button of type `submit`.",
            hints: [
              "Four parts: a text field, a `select` with three `option` elements, a `fieldset` with two radio buttons, and a `button`.",
              "Every control needs an `id` and a `label` joined with `for`. The radio buttons share one `name`.",
              "`<fieldset><legend>Group size</legend> ... </fieldset>` goes around the radio buttons.",
            ],
            checks: [
              {
                type: "a11y",
                rule: "label-for-input",
                message: "Every form control has a label",
              },
              {
                type: "exists",
                selector: "form input[type=\"text\"][name=\"name\"]",
                message: "The form has a text field named `name`",
              },
              {
                type: "count",
                selector: "select[name=\"walk\"] > option",
                message: "...a menu of three walks",
                min: 3,
                max: 3,
              },
              {
                type: "count",
                selector: "input[type=\"radio\"][name=\"size\"]",
                message: "...two radio buttons that share the name `size`",
                min: 2,
                max: 2,
              },
              {
                type: "exists",
                selector: "fieldset > legend",
                message: "...in a fieldset with a legend",
              },
              {
                type: "exists",
                selector: "button[type=\"submit\"]",
                message: "...and a submit button.",
              },
            ],
            solution: {
              html: `<h1>Book a walk</h1>
    <form action="/book" method="post">
      <p>
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
      </p>
      <p>
        <label for="walk">Which walk?</label>
        <select id="walk" name="walk">
          <option value="mill-creek">Mill Creek</option>
          <option value="ridge-trail">Ridge Trail</option>
          <option value="heron-lake">Heron Lake</option>
        </select>
      </p>
      <fieldset>
        <legend>Group size</legend>
        <input type="radio" id="small" name="size" value="small">
        <label for="small">Small</label>
        <input type="radio" id="large" name="size" value="large">
        <label for="large">Large</label>
      </fieldset>
      <button type="submit">Book</button>
    </form>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "hints-and-autocomplete",
          kind: "learn",
          title: "Hints, defaults and autocomplete",
          summary: "placeholder, value, help text and autocomplete: helping people fill in the form.",
          minutes: 8,
          concept: {
            description: "A good form helps the visitor along. The `placeholder` shows a sample of the format, the `value` attribute sets a starting answer, a line of **help text** explains what is expected, and the `autocomplete` attribute lets the browser fill in answers it already knows, such as a name or an address.",
            why: "Typing is the slowest part of a form, and the part where people make mistakes. Hints reduce errors, and autocomplete removes typing altogether. These small details decide whether a form feels easy or tiresome, especially on a phone.",
            mentalModel: "Think of a friendly assistant at a counter. They show an example of what you need to write, fill in what they already know, and quietly explain anything that is not obvious.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. The placeholder disappears as soon as you type.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="phone">Phone number</label>
    <input type="tel" id="phone" name="phone"
           placeholder="07700 900123">`,
            },
            {
              type: "paragraph",
              text: "The placeholder is a hint about the format. It is not a substitute for the label, which stays above the box. It fades when the visitor types, and is often pale, so never put important information in it. If you need to say \"include the country code\", write it as help text that stays visible.",
            },
            {
              type: "paragraph",
              text: "Help text is just a paragraph beside the field. To link it to the input for screen readers, give it an `id`, and add `aria-describedby` to the input with that id. The listener then hears the help text after the label, whenever the field is reached.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="pw">Password</label>
    <input type="password" id="pw" name="password"
           aria-describedby="pw-help">
    <p id="pw-help">Use at least eight characters.</p>`,
            },
            {
              type: "paragraph",
              text: "The `value` attribute sets what is in the box when the page loads. It is useful when editing existing data, such as the name already stored for a returning visitor. Do not put an example in `value`, since the visitor would need to delete it first, and an example belongs in the placeholder.",
            },
            {
              type: "paragraph",
              text: "Now `autocomplete`. Browsers keep names, emails and addresses, and offer them when a field asks. The attribute tells the browser exactly what a field is for, using a fixed list of words, so it can fill in the right thing. Without it, the browser has to guess from the name, and often cannot.",
            },
            {
              type: "code",
              language: "html",
              code: `<input type="text" name="name" autocomplete="name">
    <input type="email" name="email" autocomplete="email">
    <input type="text" name="zip" autocomplete="postal-code">`,
            },
            {
              type: "paragraph",
              text: "Useful values include `name`, `email`, `tel`, `street-address`, `postal-code`, `country` and `username`. For passwords, `current-password` and `new-password` help password managers decide whether to fill in or to suggest a new one. This is not only a convenience. It is part of making forms accessible, because it spares people who find typing hard.",
            },
            {
              type: "paragraph",
              text: "Use these tools together. A clear label, a short placeholder if the format is not obvious, help text for rules, and the right autocomplete value for personal details. The visitor then has what they need, where they need it, and the form feels short, even when it has many fields. That combination is worth building into every form you write.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "required-disabled-readonly",
          kind: "learn",
          title: "Required, disabled and read-only",
          summary: "Three attributes that change whether a field must be filled, can be used, or can be edited.",
          minutes: 8,
          concept: {
            description: "Three boolean attributes change how a control behaves. `required` says the visitor must fill it in before the form can be sent. `disabled` switches it off completely, so it cannot be used and is not sent. `readonly` shows a value that cannot be edited but is still sent.",
            why: "Forms often have rules: some fields are essential, some are not available yet, and some show a value that must not change. These attributes tell the browser about those rules, so it can enforce them, and tell assistive tools about them too.",
            mentalModel: "Think of a paper form. Some boxes are marked with a star because you must fill them in, some are greyed out, and some are pre-printed, and you may read them but not write over them.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with `required`. Open the example in the Playground, leave the box empty, and try to press the button.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/subscribe" method="post">
      <label for="email">Email address (required)</label>
      <input type="email" id="email" name="email" required>
      <button type="submit">Subscribe</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "The browser refuses to send the form, and shows a short message near the empty field, such as \"Please fill out this field\". You did not write any script. The attribute is also announced by screen readers, so the listener knows that the field is required. The next topic shows how to customise the checks.",
            },
            {
              type: "paragraph",
              text: "Remember that the browser's check is a convenience and not a guarantee. A determined or confused client can still send anything, so a server must check the data again. The attribute improves the visitor's experience, while the real protection always lives on the server.",
            },
            {
              type: "paragraph",
              text: "Tell visitors in the label, too. A common way is to write the word `required` in the label, or to explain at the top of the form that all fields are required. A red asterisk alone is not enough, since it relies on colour and some people cannot see it. If most fields are required, mark the optional ones instead.",
            },
            {
              type: "paragraph",
              text: "Now `disabled`. A disabled control is greyed out, cannot be focused, and is left out when the form is sent. It is useful for something that depends on an earlier choice, though a visitor does not learn why the control is off, so say so in nearby text.",
            },
            {
              type: "code",
              language: "html",
              code: `<label for="code">Discount code</label>
    <input type="text" id="code" name="code" disabled>
    
    <label for="ref">Booking reference</label>
    <input type="text" id="ref" name="ref" value="MC-2041" readonly>`,
            },
            {
              type: "paragraph",
              text: "The second field is `readonly`. It looks like any other box, but the visitor cannot change the text. It can still be focused and selected, so someone can copy the reference, and, unlike a disabled field, it is sent with the form. Use it for values that the visitor should see and submit, but not edit.",
            },
            {
              type: "paragraph",
              text: "Choose carefully between them. If a value must be sent and cannot be edited, use `readonly`. If a control should not be used at all, use `disabled`. And if a value is only for display, a plain paragraph is often better than a box that looks like an input but does nothing.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "form-layout-and-styling",
          kind: "learn",
          title: "Form layout and styling",
          summary: "A simple, readable layout: labels above fields, one column, and room to tap.",
          minutes: 8,
          concept: {
            description: "A form is easiest to use when its layout is plain: one column, each label above its field, related controls grouped, and generous space between them. A few lines of CSS achieve it, and they matter more than any decoration, because people only fill in forms they can understand at a glance.",
            why: "Most abandoned forms are abandoned because they are confusing or tiring. A layout that keeps the label next to its field, avoids side-by-side boxes on small screens, and offers big targets removes friction. Good layout is also good accessibility, since it helps people who zoom in or use a keyboard.",
            mentalModel: "Think of a well-designed paper form. The questions run down the page in one column, each with its own space to answer, and nothing is crowded together.",
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
      .field { margin-bottom: 1rem; }
      .field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
      .field input, .field select, .field textarea {
        width: 100%; max-width: 24rem; padding: 0.6rem;
        font: inherit; box-sizing: border-box;
      }
    </style>
    
    <form>
      <div class="field">
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
      </div>
    </form>`,
            },
            {
              type: "paragraph",
              text: "Each label and field live in a `div` with the class `field`, which gives them a shared margin. The label is a block, so it sits above its box. The input takes the full width, up to a limit, and has padding, so it is easy to tap. And `font: inherit` is important, because form controls do not use the page's font by default, and look out of place.",
            },
            {
              type: "paragraph",
              text: "The size of the text in a field matters on phones. On some, including iPhones, the browser zooms into a field when you focus on it, if its text is smaller than 16 pixels. A `font-size` of at least `1rem` avoids that jump, which can disorient people and knock the layout sideways.",
            },
            {
              type: "paragraph",
              text: "Keep to a single column unless the fields are truly short and related, such as a day, month and year. Two columns make the eye zigzag, and on a narrow screen they have to stack anyway. Put the button last, aligned with the fields, and make it stand out, using a clear colour and enough padding.",
            },
            {
              type: "paragraph",
              text: "Do not remove the focus outline unless you replace it with something better. The outline shows a keyboard user which field is active. A visible focus style, such as a thick coloured outline or a strong border, makes the form usable without a mouse, and you can restyle it freely, as long as it stays obvious.",
            },
            {
              type: "paragraph",
              text: "Group related fields with `fieldset`, and leave a little more space between the groups than inside them. That spacing tells the reader where one question ends and the next begins. Finally, test the form on a small screen, with the keyboard, and with the page zoomed in, because layout problems show up quickly there. A form that works well at 320 pixels wide will work at any width. Fix whatever you find, and test again after each change.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "form-layout-explorer",
          kind: "visualizer",
          title: "Form layout explorer",
          summary: "Two labelled fields side by side with their labels. Move the labels above the boxes, widen the boxes and add space between fields.",
          minutes: 8,
          concept: {
            description: "A small form with two fields. Each label and its input sit in a `div` called `.field`. By default, a label is inline, so it sits beside its box and the two run together. Controls change the label's `display`, the width of the input and the margin below each field.",
            why: "A plain, one-column layout is the most usable form there is, and it takes only a few declarations to get. Seeing the label drop above its box, and the boxes line up at the same width, shows how much clarity comes from CSS, and none of it touches the HTML.",
            mentalModel: "Think of a paper form. The question is printed on a line of its own, and the answer box sits underneath, with a gap before the next question. Block labels and a bottom margin make the same arrangement.",
          },
          stage: {
            html: `<form class="form" action="#">
      <div class="field"><label for="n">Name</label><input type="text" id="n" name="name"></div>
      <div class="field"><label for="e">Email</label><input type="email" id="e" name="email"></div>
      <button type="submit">Send</button>
    </form>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .form { margin: 16px; max-width: 22rem; color: #e2e8f0; }
    .field input { box-sizing: border-box; font-family: inherit; background: #1e293b; color: #f8fafc; border: 1px solid #64748b; border-radius: 6px; }
    .form button { margin-top: 8px; font: inherit; padding: 8px 16px; }`,
            annotate: "box",
            target: ".field",
            items: ".field",
            itemCount: 2,
          },
          starter: `.field {
      margin-bottom: 0px;
    }
    
    .field label {
      display: inline;
    }
    
    .field input {
      width: auto;
    }
    `,
          controls: [
            {
              id: "display",
              label: "label display",
              selector: ".field label",
              property: "display",
              fallback: "inline",
              type: "options",
              options: ["inline", "block"],
              help: "A block label sits on its own line, above the box.",
            },
            {
              id: "width",
              label: "input width",
              selector: ".field input",
              property: "width",
              fallback: "auto",
              type: "options",
              options: ["auto", "100%"],
              help: "100% makes the box fill the form's width.",
            },
            {
              id: "gap",
              label: "space below a field",
              selector: ".field",
              property: "margin-bottom",
              fallback: "0px",
              type: "range",
              min: 0,
              max: 32,
              step: 4,
              unit: "px",
              help: "Space between one question and the next.",
            },
          ],
          presets: [
            {
              id: "stacked",
              label: "Labels above",
              description: "block labels",
              css: ".field label { display: block; }",
            },
            {
              id: "full",
              label: "Full-width boxes",
              description: "labels above, boxes fill the form",
              css: `.field label { display: block; }
    .field input { width: 100%; }`,
            },
            {
              id: "roomy",
              label: "Roomy form",
              description: "labels above, wide boxes and gaps",
              css: `.field label { display: block; margin-bottom: 4px; }
    .field input { width: 100%; padding: 8px; }
    .field { margin-bottom: 16px; }`,
            },
          ],
          challenge: {
            title: "Stack the form",
            description: "Put each label on its own line above its box, and leave `16px` of space below each field.",
            hints: [
              "Two declarations: one for the label's `display` and one for the field's `margin-bottom`.",
              "A label that sits on its own line is a `block`.",
              "`.field label { display: block; }` and `.field { margin-bottom: 16px; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".field label",
                property: "display",
                expected: ["block"],
                message: "The labels sit above their boxes",
              },
              {
                type: "computedStyle",
                selector: ".field",
                property: "margin-bottom",
                expected: ["16px"],
                message: "...with `16px` below each field.",
              },
            ],
            solution: `.field {
      margin-bottom: 16px;
    }
    
    .field label {
      display: block;
    }
    
    .field input {
      width: auto;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "input-size-explorer",
          kind: "visualizer",
          title: "Input size explorer",
          summary: "One text box with tiny defaults. Add padding, enlarge the text and round the corners to make it comfortable to use.",
          minutes: 8,
          concept: {
            description: "A text field starts with small text and almost no padding, which makes it a tiny target on a phone. Controls change the input's `padding`, its `font-size` and its `border-radius`. The box grows around the same text, and becomes easier to tap and to read.",
            why: "Forms are used with thumbs, in poor light, on small screens. Padding is the quickest way to make a field easy to hit, and a text size of at least 16 pixels stops some phones from zooming in. Seeing both change together shows what a comfortable field looks like.",
            mentalModel: "Think of a light switch with a large plate around it. The switch itself is small, but the plate gives your hand room, and a bigger plate means fewer mistakes.",
          },
          stage: {
            html: `<form class="form" action="#">
      <div class="field"><label for="n">Name</label><input type="text" id="n" name="name" value="Ridge Walker"></div>
      <button type="submit">Send</button>
    </form>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .form { margin: 16px; max-width: 22rem; color: #e2e8f0; }
    .field input { box-sizing: border-box; width: 100%; font-family: inherit; background: #1e293b; color: #f8fafc; border: 1px solid #64748b; }
    .field label { display: block; margin-bottom: 4px; }
    .form button { margin-top: 8px; font: inherit; padding: 8px 16px; }`,
            annotate: "box",
            target: ".field input",
            items: ".field input",
            itemCount: 1,
          },
          starter: `.field input {
      padding: 2px;
      font-size: 0.75rem;
      border-radius: 0px;
    }
    `,
          controls: [
            {
              id: "padding",
              label: "padding",
              selector: ".field input",
              property: "padding",
              fallback: "2px",
              type: "range",
              min: 2,
              max: 20,
              step: 2,
              unit: "px",
              help: "Room between the text and the border.",
            },
            {
              id: "font",
              label: "font-size",
              selector: ".field input",
              property: "font-size",
              fallback: "0.75rem",
              type: "range",
              min: 0.75,
              max: 1.5,
              step: 0.125,
              unit: "rem",
              help: "16 pixels, which is 1rem, is the smallest size that does not make some phones zoom in.",
            },
            {
              id: "radius",
              label: "border-radius",
              selector: ".field input",
              property: "border-radius",
              fallback: "0px",
              type: "range",
              min: 0,
              max: 16,
              step: 2,
              unit: "px",
              help: "Rounded corners soften the box.",
            },
          ],
          presets: [
            {
              id: "tiny",
              label: "Tiny default",
              description: "hard to tap",
              css: ".field input { padding: 2px; font-size: 0.75rem; }",
            },
            {
              id: "comfy",
              label: "Comfortable",
              description: "padded, 16px text",
              css: ".field input { padding: 12px; font-size: 1rem; border-radius: 6px; }",
            },
            {
              id: "big",
              label: "Large",
              description: "generous and rounded",
              css: ".field input { padding: 16px; font-size: 1.25rem; border-radius: 10px; }",
            },
          ],
          challenge: {
            title: "Make the field comfortable",
            description: "Give the text box `12px` of padding and a `font-size` of `1rem`, which is 16 pixels, so that it is easy to tap and does not trigger a zoom on phones.",
            hints: [
              "Two declarations in the `.field input` rule.",
              "The padding is `12px`, and the font size is `1rem`.",
              "`.field input { padding: 12px; font-size: 1rem; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".field input",
                property: "padding",
                expected: ["12px"],
                message: "The box has `12px` of padding",
              },
              {
                type: "computedStyle",
                selector: ".field input",
                property: "font-size",
                expected: ["1rem", "16px"],
                message: "...and its text is `1rem`.",
              },
            ],
            solution: `.field input {
      padding: 12px;
      font-size: 1rem;
      border-radius: 0px;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "common-form-mistakes",
          kind: "learn",
          title: "Common form mistakes",
          summary: "The errors beginners make with forms, and a quick review checklist.",
          minutes: 8,
          concept: {
            description: "Forms are simple to start and easy to get subtly wrong. The same mistakes appear again and again: fields with no label, a `for` that does not match an `id`, controls with no `name`, radio buttons that are not grouped, buttons that submit by accident, and placeholders used as labels.",
            why: "Most of these mistakes still show a form that looks right, so they slip past you. They are found by visitors, when a field is not announced, or when data never arrives. A short checklist lets you find them first.",
            mentalModel: "Think of a pilot's pre-flight checklist. Each check is quick, none looks serious alone, and together they catch what would otherwise be found in the air.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. It has five mistakes in a very short form, so read it slowly, and try to find them before you read on.",
            },
            {
              type: "code",
              language: "html",
              code: `<form>
      <input type="text" placeholder="Name">
      <label for="mail">Email</label>
      <input type="email" id="email">
      <input type="radio" name="a" value="s"> Small
      <input type="radio" name="b" value="l"> Large
      <button>Send</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "The name field has only a placeholder, so it has no label. The email label points to `mail`, but the input is `email`, so they are not joined, and the input has no `name`, so its value would never be sent. The radio buttons have different names, so both can be chosen, and they have no labels either. The final button has no `type`, which works here but is not stated.",
            },
            {
              type: "paragraph",
              text: "Here is the repaired version. Every control has a label joined by `for` and `id`, every control has a `name`, the radio buttons share one name inside a `fieldset`, and the button says what it is.",
            },
            {
              type: "code",
              language: "html",
              code: `<form>
      <p>
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
      </p>
      <p>
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
      </p>
      <fieldset>
        <legend>Group size</legend>
        <input type="radio" id="small" name="size" value="small">
        <label for="small">Small</label>
        <input type="radio" id="large" name="size" value="large">
        <label for="large">Large</label>
      </fieldset>
      <button type="submit">Send</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "A few more mistakes are worth watching for. Duplicate `id` values make labels point at the wrong control. Controls placed outside the `form` are not sent. A `reset` button invites accidents. A `select` with no prompt option sends a default the visitor did not notice. And a `div` styled to look like a button cannot be reached by keyboard.",
            },
            {
              type: "paragraph",
              text: "To review any form, read it from the top and ask five questions of every control. Does it have a visible label, joined with `for` and `id`? Does it have a `name`? Is its type right for the data? If it is a radio or a checkbox, is it grouped and given a value? Is the button's type stated? A form that passes all five is in good shape.",
            },
            {
              type: "paragraph",
              text: "The next topic goes further, with validation, more input types and error messages. Those features build on what you have just learned, so it pays to be sure the basics are sound. A form with proper labels, names and groups is a good foundation, and it is already usable by far more people than many forms on the web. If you ever feel stuck on a form, go back to the five questions.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    buildABookingForm,

    /* ------------------------------------------------------------------ */
    {
          id: "basic-forms-quiz",
          kind: "quiz",
          title: "Quiz: basic forms",
          summary: "Eighteen questions on forms, labels, input types, names and submitting, menus, checkboxes, radios, fieldsets, buttons and attributes.",
          minutes: 13,
          passPercent: 70,
          questions: [
            {
              prompt: "What does the `action` attribute of a form hold?",
              options: ["The label of the button", "The address that receives the data", "The type of the first field", "The method used to send"],
              answerIndex: 1,
              explanation: "The `action` is the address the browser sends the data to when the form is submitted.",
            },
            {
              prompt: "How is a label joined to an input?",
              options: [
                "The label's `name` matches the input's `for`",
                "The label's `id` matches the input's `name`",
                "They must be next to each other",
                "The label's `for` matches the input's `id`",
              ],
              answerIndex: 3,
              explanation: "The `for` of the label and the `id` of the input must match exactly. You can also wrap the input inside the label.",
            },
            {
              prompt: "Why is a `placeholder` not a good replacement for a label?",
              options: [
                "It disappears as soon as someone types, and is not reliably announced",
                "It is not allowed in HTML",
                "It makes the form slower",
                "It cannot hold text",
              ],
              answerIndex: 0,
              explanation: "A placeholder is a hint about the format. The label is the permanent name of the field.",
            },
            {
              prompt: "Which input type shows an email-friendly keyboard on a phone and checks for an at sign?",
              options: ["`text`", "`mail`", "`email`", "`url`"],
              answerIndex: 2,
              explanation: "The `email` type adapts the keyboard and lets the browser check the format.",
            },
            {
              prompt: "A field has no `name` attribute. What happens when the form is submitted?",
              options: ["It is sent with an empty name", "It is left out of the data", "The form refuses to send", "The browser invents a name"],
              answerIndex: 1,
              explanation: "The browser builds pairs from each control's `name`, so a control without one is not sent.",
            },
            {
              prompt: "Which method puts the data in the address as a query string?",
              options: ["`post`", "`send`", "`put`", "`get`"],
              answerIndex: 3,
              explanation: "With `get`, the pairs appear after a question mark in the address, which suits searches.",
            },
            {
              prompt: "Which method is the better choice for a sign-up form with a password?",
              options: ["`get`", "`link`", "`post`", "Either, there is no difference"],
              answerIndex: 2,
              explanation: "With `post`, the data travels in the body of the request, not in the address and the history.",
            },
            {
              prompt: "What does the `value` attribute of an `option` do?",
              options: [
                "It is what is sent if the option is chosen",
                "It is the text the visitor reads",
                "It marks the option as chosen",
                "It sets the option's colour",
              ],
              answerIndex: 0,
              explanation: "The visible text and the sent value can differ, so `Mill Creek` can send `mill-creek`.",
            },
            {
              prompt: "What does a ticked checkbox with `name=\"news\"` and `value=\"yes\"` send?",
              options: ["`yes=news`", "`news=yes`", "Nothing", "`news=on` always"],
              answerIndex: 1,
              explanation: "A ticked checkbox sends its name and value. An unticked one sends nothing.",
            },
            {
              prompt: "How do you make several radio buttons into one group?",
              options: ["Give them the same `value`", "Give them the same `id`", "Put them in a `div`", "Give them the same `name`"],
              answerIndex: 3,
              explanation: "Radio buttons are grouped by sharing a `name`, and only one in a group can be chosen.",
            },
            {
              prompt: "Which element gives a group of radio buttons a question that a screen reader announces?",
              options: ["`legend` inside a `fieldset`", "`label` around the group", "`caption`", "`title`"],
              answerIndex: 0,
              explanation: "A `legend` is the first child of a `fieldset`, and it names the whole group.",
            },
            {
              prompt: "What does a `button` with no `type` do inside a form?",
              options: ["Nothing", "It resets the form", "It acts as a submit button", "It is invalid"],
              answerIndex: 2,
              explanation: "The default type is `submit`, so a button meant for something else needs `type=\"button\"`.",
            },
            {
              prompt: "Which is the best text for a button?",
              options: ["`Submit`", "`Book a place`", "`OK`", "`Click`"],
              answerIndex: 1,
              explanation: "A button should say what will happen, in a verb, so the visitor knows before pressing it.",
            },
            {
              prompt: "What does the `required` attribute do?",
              options: [
                "Hides the field",
                "Makes the field read-only",
                "Sends the field twice",
                "Stops the form being sent while the field is empty",
              ],
              answerIndex: 3,
              explanation: "The browser blocks the submission and shows a message. The server must still check the data.",
            },
            {
              prompt: "How does a `readonly` field differ from a `disabled` one?",
              options: [
                "There is no difference",
                "A disabled value is sent and a readonly one is not",
                "A readonly value is sent and can be focused, but not edited",
                "Readonly fields are hidden",
              ],
              answerIndex: 2,
              explanation: "A `readonly` field is still sent with the form. A `disabled` field is skipped completely.",
            },
            {
              prompt: "Why should text in an input be at least 16 pixels?",
              options: [
                "Some phones zoom into the page if it is smaller",
                "It is a rule of HTML",
                "It makes the form faster",
                "It improves search ranking",
              ],
              answerIndex: 0,
              explanation: "Some phones zoom in on focus when the text is smaller than 16 pixels, which can disorient people.",
            },
            {
              prompt: "Which is a mistake in `<input type=\"radio\" name=\"a\"> Small <input type=\"radio\" name=\"b\"> Large`?",
              options: [
                "Radio buttons need a `src`",
                "The names differ, so they are not a group",
                "The type must be `checkbox`",
                "There is no mistake",
              ],
              answerIndex: 1,
              explanation: "Different names make two groups of one, so both can be chosen. They also have no proper labels.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "basic-forms-review",
          kind: "review",
          title: "Review: basic forms",
          summary: "The form element, labels, input types, names and submission, menus, checkboxes and radios, fieldsets, buttons, hints, attributes and layout.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "A form collects data and sends it to its `action`, using its `method`. Each control needs a `label` joined by `for` and `id`, and a `name`, because only named controls are sent. Use `get` for searches and `post` for anything private or that changes something.",
            },
            {
              type: "code",
              language: "html",
              code: `<form action="/subscribe" method="post">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" required>
      <button type="submit">Subscribe</button>
    </form>`,
            },
            {
              type: "paragraph",
              text: "Pick the input `type` to fit the data: `text`, `email`, `password`, `tel`, `url`, `search` or `number`. Use `textarea` for long text and `select` with `option` for a choice from a list, where the option's `value` is what is sent. Checkboxes send their name and value only when ticked, and radio buttons form a group by sharing a `name`.",
            },
            {
              type: "code",
              language: "html",
              code: `<fieldset>
      <legend>Group size</legend>
      <input type="radio" id="small" name="size" value="small" checked>
      <label for="small">Small</label>
      <input type="radio" id="large" name="size" value="large">
      <label for="large">Large</label>
    </fieldset>`,
            },
            {
              type: "paragraph",
              text: "A `fieldset` and `legend` name a group of related controls. A `button` with no `type` submits, so give every button a type, and word it as a verb. Use `placeholder` only for a format hint, put rules in help text linked with `aria-describedby`, and use `autocomplete` to let browsers fill in known answers.",
            },
            {
              type: "paragraph",
              text: "`required` blocks an empty submission, `disabled` switches a control off and leaves it out, and `readonly` keeps a value uneditable but still sends it. For layout, use one column with labels above the fields, text of at least 16 pixels, generous padding and a visible focus style. Before you finish, check that every control has a label, a name and the right type.",
            },
          ],
        },
  ],
};

export default content;
