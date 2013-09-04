impact-interpolation
====================

#### Smoothly tween numbers in ImpactJS. ####

### Example ###
`new ig.Interpolation(start, end, duration[, ease])`
```
// Create a new instance...
var start = 0;
var end = 10;
var duration = 3;
var ease = ig.Interpolation.EASE.OUT;
var interpolation = new ig.Interpolation(
    start, end, duration, ease);

// When 0 seconds have past...
console.log(interpolation.value); // 0
console.log(interpolation.done); // false

// When between 0 and 10 seconds have past...
console.log(interpolation.value); // number between 0-10
console.log(interpolation.done); // false

// When 10 or more seconds have past...
console.log(interpolation.value); // 10
console.log(interpolation.done); // true
```

### Ease Functions ###
- `ig.Interpolation.EASE.IN`
- `ig.Interpolation.EASE.OUT`
- `ig.Interpolation.EASE.SMOOTHSTEP`

### Properties ###

##### .start #####
The initial number to start counting from.

##### .end #####
The target number to end on.

##### .duration #####
The time in seconds from `start` to `end`.

##### .value #####
The current interpolation value.

##### .done #####
Boolean that is `true` after `duration` elapses.
