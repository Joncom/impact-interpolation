impact-interpolation
====================

### Properties ###

##### .start #####
The initial number to start counting from.

##### .end #####
The target number to end on.

##### .duration #####
The time in seconds from start to end.

##### .value #####
The current interpolation value.

##### .done #####
Boolean that is `true` after duration elapses.

### Example ###

```
// You can set properties directly...
var interpolation = new ig.Interpolation();
interpolation.start = 0;
interpolation.end = 10;
interpolation.duration = 3;

// Or you can pass them as an object...
var settings = { start: 0, end: 10, duration: 3 };
var interpolation = new ig.Interpolation(settings);

// After 0 seconds have past...
console.log(interpolation.value); // 0
console.log(interpolation.done); // false

// After 10 seconds have past...
console.log(interpolation.value); // 10
console.log(interpolation.done); // true
```