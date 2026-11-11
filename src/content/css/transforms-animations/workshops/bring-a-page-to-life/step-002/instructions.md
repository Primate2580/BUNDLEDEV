The ring is still, even though it has keyframes. Do you remember why? The default animation duration is `0s`, so the animation has no time to run. Let's give it one, and while we are here, choose how it should be played.

A spinner should turn at a constant speed, so we use `linear`, because the default easing would make it slow down at the end of every lap. And it should go round for as long as the page is loading, which is what `infinite` means.

## Task

In the `.spinner` rule, add these three declarations:

```css
animation-duration: 1s;
animation-timing-function: linear;
animation-iteration-count: infinite;
```

## Hints

- Three declarations, all inside `.spinner`.
- Remember the `s` on the duration.
