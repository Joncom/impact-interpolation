impact-interpolation
====================

#### Smoothly tween numbers in ImpactJS. ####

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

// When 0 seconds have past...
console.log(interpolation.value); // 0
console.log(interpolation.done); // false

// When between 0 and 10 seconds have past...
console.log(interpolation.value); // number between 0-10
console.log(interpolation.done); // false

// When 10 seconds have past...
console.log(interpolation.value); // 10
console.log(interpolation.done); // true
```

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

