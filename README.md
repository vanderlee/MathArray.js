MathArray.js
============
Version 0.1

Copyright (c) 2015 Martijn W. van der Lee

A class inherited from Array, with plenty of extra functions to help you do
mathematical and statistical operations on arrays.

Getting started
------
To start, simply `var mathArray = new MathArray.js` and use the operations.
Call an operation, for instance `abs()`, as such: `mathArray.abs();`.

You can use the MathArray as an Array in most circumstances.
`mathArray instanceof Array` will report `true`.
Common Array operations such as `mathArray.length` and `mathArray[123] = 456`
will work just like a regular Array object.
MathArray supplies it's own `map` and `reduce` implementations, similar to the
soon-to-be-standard Array operations.

Operations like `abs()` and `sort()` change the MathArray and return itself,
so multiple operations can be chained together.
Operations like `min`, `median` and `stdev` will not change the MathArray and
return a value (or, in some cases, a new MathArray).

Operations
----------
## `abs()`
Turn all negative numbers into positive numbers.

Returns self.

## `call(callback, argument)`
Calls a `callback` function on each item, not changing it.

Callback signature is `void function(item, index)`.

If `argument` is supplied, it will be passed to the callback as `this`.

Returns self.

See `map()` and `walk()` for similar functions.

## `ceil()`
Round all numbers up to the nearest integer.

Returns self.

### `clone()`
Creates an exact copy of the MathArray.

Return a new MathArray object.

## `floor()`
Round all numbers down to the nearest integer.

Returns self.

## `histogram()`
Count all repeat occurances of values and returns an object with the values as
keys and the amount of occurances as it's value.

For instance, array `[ 3, 1, 1 ]` would return `{ '3': 1, '1': 2 }`.

Returns the object as described above.

## `last()`
Returns the last item in the array.

## `map(callback, argument)`
Calls a `callback` function on each item, creating a new MathArray with the
values returned by the callback function.

Callback signature is `number function(item, index)`.

If `argument` is supplied, it will be passed to the callback as `this`.

Returns new MathArray object.

See `call()` and `walk()` for similar functions.

## `max()`
Returns the greatest value in the array.

## `mean()`
Returns the mean average.

Returns 0 if array is empty.

## `median()`
Returns the mean average.

Returns 0 if array is empty.

## `min()`
Returns the lowest value in the array.

## `modes()`
Returns an Array object containing the mode(s).

Returns empty Array object if array is empty.

## `multiply(factor)`
Multiply all items by the specified factor (default `100` if not specified).

Returns self.

## `randoms(count, min, max, round)`
Replaces all items with a number of random numbers.

*	`count` Number of random numbers to generate (default `256`).
*	`min` Lowest value possible (default `0`).
*	`max` Greatest value possible (default `1`).
*	`round` rounds all numbers to the nearest integer if true (default `false`).

Returns self.

## `range(min, max, step)`
Replaces all items with a linear range of numbers, starting from `min` and 
ending at or before `max`.

*	`min` Lowest value (default `0`).
*	`max` Greatest value possible (default `255`).
*	`step` The space between numbers in the range (default `1`).

Returns self.

## `reduce(callback, initialValue)`
Calls a `callback` function on each item, creating a new MathArray with the
values returned by the callback function.

Callback signature is `number function(previous, item, index, object)`.

Initially, the value will be either 0 or the value set with `initialValue`.

Returns the reduced value.

## `round()`
Round all numbers up or down to the nearest integer, whichever is closest.

Values exactly in the middle (like 0.5) will be rounded up.

Returns self.

## `sort()`
Sort the values numerically.

Returns self.

## `stddev()`
Returns the population standard deviation.

## `sum()`
Returns the sum of all values.

## `variance()`
Returns the population variance.

## `map(callback, argument)`
Calls a `callback` function on each item, replacing the item values with the
values returned by the callback function.

Callback signature is `number function(item, index)`.

If `argument` is supplied, it will be passed to the callback as `this`.

Returns self.

See `call()` and `map()` for similar functions.

Examples
--------
The following example calculates the standard deviation for a number of random
integers values:

	var array, stddev;

	array = new MathArray();
	array.randoms(10000, 0, 255, true);

	stddev = array.stddev();

	console.log(stddev);

Using chaining, you can shorten this somewhat:

	console.log(new MathArray().randoms(10000, 0, 255, true).stddev());

Take a look at the include unittests for more examples.

Future
------
sqrt, pow, subtract, divide, mod
sigma, stddev_sample, variance_sample, sigma_sample
ceil(digits), floor(digits), round(digits)
round(fractionals)
roundin(digits), roundout(digits)
aliasses
