MathArray.js
============
Version 0.2.2

[![Build Status](https://travis-ci.org/vanderlee/MathArray.js.svg?branch=master)](https://travis-ci.org/vanderlee/MathArray.js)

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

New operations
--------------
## `abs()`
Turn all negative numbers into positive numbers.

Returns self.

## `add([amount = 1])`
Add the specified amount to all items (default `1` if not specified).

Returns self.

## `ceil()`
Round all numbers up to the nearest integer.

Returns self.

### `clone()`
Creates an exact copy of the MathArray.

Return a new MathArray object.

## `divide([factor = 100])`
Divide all items by the specified factor (default `100` if not specified).

Returns self.

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

## `modulo([divider = 100])`
Return the remainder of a division by the specified divider (default `100` if
not specified).

Returns self.

## `multiply([factor = 100])`
Multiply all items by the specified factor (default `100` if not specified).

Returns self.

## `power([power = 100])`
Raise all items to the specified power (default `2` if not specified).

Returns self.

## `randoms([count[, min[, max[, round]]]])`
Replaces all items with a number of random numbers.

*	`count` Number of random numbers to generate (default `256`).
*	`min` Lowest value possible (default `0`).
*	`max` Greatest value possible (default `1`).
*	`round` rounds all numbers to the nearest integer if true (default `false`).

Returns self.

## `range([min[, max[, step]]])`
Replaces all items with a linear range of numbers, starting from `min` and 
ending at or before `max`.

*	`min` Lowest value (default `0`).
*	`max` Greatest value possible (default `255`).
*	`step` The space between numbers in the range (default `1`).

Returns self.

## `round()`
Round all numbers up or down to the nearest integer, whichever is closest.

Values exactly in the middle (like 0.5) will be rounded up.

Returns self.

## `sigma()`
Changes all items to the number of population standard deviations they differ
from the mean average. Items that are below average will be negative.

Returns self.

## `sqrt()`
Take the square root of every item.

Returns self.

## `stddev()`
Returns the population standard deviation.

## `subtract([amount = 1])`
Subtracts the specified amount to all items (default `1` if not specified).

Returns self.

## `sum()`
Returns the sum of all values.

## `toArray()`
Returns an Array of all the elements of the MathArray.

## `variance()`
Returns the population variance.

## `walk(callback[, argument])`

Calls a `callback` function on each item, replacing the item values with the
values returned by the callback function.

Callback signature is `number function(item, index)`.

If `argument` is supplied, it will be passed to the callback as `this`.

Returns self.

See `forEach()` and `map()` for similar functions.

Array operations
----------------
The following operations are inherited from Array and are tested to work for the
MathArray.

*	`every(callback[, argument])`
*	`indexOf(searchElement[, fromIndex = 0])`
*	`isArray(obj)`
*	`join([separator = ','])`
*	`lastIndexOf(searchElement[, fromIndex = length - 1])`
*	`reverse()`
*	`pop()`
*	`push(element1[, ..., elementN])`
*	`shift()`
*	`some(callback[, argument])`
*	`toString()` Including automatic conversion.
*	`unshift([element1[, ...[, elementN]]])`

A number of Array methods have been overwritten to use and return MathArray
objects instead of Array objects. These are otherwise identical.

*	`concat(value1[, value2[, ...[, valueN]]])`
*	`filter(callback[, thisArg])`
*	`forEach(callback[, thisArg])`
*	`map(callback[, argument])`
*	`reduce(callback[, initialValue])`
*	`reduceRight(callback[, initialValue])`
*	`slice(begin[, end])`
*	`sort()` Sorts numerically.
*	`splice(start, deleteCount[, item1[, item2[, ...]]])`

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
*	Non-prototype array: from, isArray, observe, of
*	Experimental Array methods: fill
*	stddev_sample, variance_sample, sigma_sample
*	covariance, pierson's r
*	ceil(digits), floor(digits), round(digits)
*	round(fractionals)
*	roundin(digits), roundout(digits)
*	Math ops with arrays
*	Matrix support
*	Bignumber support
*	Aliasses
