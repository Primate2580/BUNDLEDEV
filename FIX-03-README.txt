FIX-03: fix for the test:content failure reported after batch 14
Applies on top of: batch 14 (Links). Copy the contents of this zip over your css-lab-main folder.

WHAT WAS WRONG
html/links/link-look-explorer: the SOLUTION failed its first check ("The links are amber"): "a" still had color: rgb(0, 0, 238), which is the
browser-default link blue. My diagnosis: jsdom's built-in style for links (a:link) is more specific than a bare `a` rule, and jsdom picks the winner by
specificity without treating your stylesheet as the stronger origin, so the default blue beat the amber. (I cannot run jsdom, so this diagnosis comes from
your output, not from reproducing it.)
THE FIX: the three links in the stage now carry class="link", and the starter, controls, presets, solution and checks all use the selector `.text .link`,
which is more specific than the built-in rule. The behaviour in a real browser is unchanged.

FILE (complete contents, same path as your project)
  src/content/html/links.ts

COMMANDS (PowerShell, from the css-lab-main folder)
  npm run build:content
  npm run typecheck
  npm run test:content

CHECKLIST
  [ ] test:content shows no problem list for html/links
  [ ] Link look explorer: the sliders and presets still restyle the three links, and the challenge completes with amber, underline and 700

VERIFIED IN MY SANDBOX
  Static rules, all 44 Links browser cases in Chromium at 375, 800 and 1400 px, and my jsdom approximation pass.
NOT VERIFIED
  Real jsdom, so you are the check. Least certain: whether this diagnosis is the whole story. If the same check still fails, paste the message.
