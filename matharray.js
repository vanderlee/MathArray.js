/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */

/*!
 * MathArray.js
 * Copyright (c) 2015 Martijn W. van der Lee
 * Released under the MIT license (https://opensource.org/licenses/MIT)
 */

function MathArray() {
	"use strict";

	var construct = (function() {
			function F(args) {
				return MathArray.apply(this, args);
			}
			F.prototype = MathArray.prototype;

			return function(args) {
				return new F(args);
			}
		})(),
		name,
		array = [],
		functions = {
			abs: function() {
				this.walk(function(v) {
					return Math.abs(v);
				});

				return this;
			},

			add: function(amount) {
				amount = amount || 1;

				this.walk(function(v) {
					return v + amount;
				});

				return this;
			},

			call: function(callback, thisArg) {
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}

				var O = Object(this),
					len = O.length >>> 0,
					T = arguments.length > 1 ? thisArg : undefined,
					k = 0;

				while (k < len) {
					if (k in O) {
						callback.call(T, O[k], k, O);
					}
					++k;
				}

				return this;
			},

			ceil: function() {
				return this.walk(Math.ceil);
			},

			clone: function() {
				var O = Object(this),
					len = O.length >>> 0,
					A = new MathArray(len),
					k = 0;

				while (k < len) {
					if (k in O) {
						A[k] = O[k];
					}
					++k;
				}

				return A;
			},

			divide: function(factor) {
				factor = factor || 100;

				this.walk(function(v) {
					return v / factor;
				});

				return this;
			},

			floor: function() {
				return this.walk(Math.floor);
			},

			histogram: function() {
				var tallies = {};

				this.call(function(v) {
					if (tallies[v]) {
						++tallies[v];
					} else {
						tallies[v] = 1;
					}
				});

				return tallies;
			},

			last: function() {
				return this[this.length - 1];
			},

			map: function(callback, thisArg) {
				if (this === null || typeof this === 'undefined') {
					throw new TypeError(' this is null or not defined');
				}

				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}

				var O = Object(this),
					len = O.length >>> 0,
					T = arguments.length > 1 ? thisArg : undefined,
					A = new MathArray(len),
					k = 0,
					kValue,
					mappedValue;

				while (k < len) {
					if (k in O) {
						kValue = O[k];
						mappedValue = callback.call(T, kValue, k, O);
						A[k] = mappedValue;
					}
					++k;
				}

				return A;
			},

			max: function() {
				return Math.max.apply(Math, this);
			},

			mean: function() {
				return this.length > 0 ? this.sum() / this.length : 0;
			},

			median: function() {
				if (this.length === 0) {
					return 0;
				}
				
				var sorted = this.slice(0).sort(function(a, b) {
							return a - b;
						}),
					middle = (sorted.length * 0.5) >>> 0;
			
				if (sorted.length % 2) {
					return sorted[middle];
				} else {
					return (sorted[middle--] + sorted[middle]) * 0.5;
				}
			},

			min: function() {
				return Math.min.apply(Math, this);
			},

			modes: function() {
				var histogram = this.histogram(),
					modes = [],
					max = 0;

				for (var property in histogram) {
					if (histogram.hasOwnProperty(property)) {
						if (histogram[property] > max) {
							max = histogram[property];
							modes = [];
						}
						if (histogram[property] === max) {
							modes.push(parseFloat(property));
						}
					}
				}

				return modes;
			},

			multiply: function(factor) {
				factor = factor || 100;

				this.walk(function(v) {
					return v * factor;
				});

				return this;
			},
		
			randoms: function(count, min, max, round) {
				var range,
					value,
					i;

				count = count || 256;
				min = min || 0;
				max = max || 1;
				range = max - min;
				
				this.length = 0;
				if (round) {
					range += 1;
					for (i = 0; i < count; ++i) {
						this.push(Math.floor(min + (Math.random() * range)));
					}
				} else {
					for (i = 0; i < count; ++i) {
						this.push(min + (Math.random() * range));
					}
				}

				return this;
			},

			range: function(min, max, step) {
				var i,
					lowest,
					greatest;

				min = min || 0;
				max = max || 255;
				step = Math.abs(step || 1);

				lowest = Math.min(min, max);
				greatest = Math.max(min, max);

				this.length = 0;
				if (min <= max) {
					for (i = lowest; i <= greatest; i += step) {
						this.push(i);
					}
				} else {
					for (i = greatest; i >= lowest; i -= step) {
						this.push(i);
					}
				}

				return this;
			},

			reduce: function(callback /*, initialValue*/) {
				if (this === null || typeof this === 'undefined') {
					throw new TypeError('Array.prototype.reduce called on null or undefined');
				}

				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}

				var t = Object(this),
					len = t.length >>> 0,
					k = 0,
					value;

				if (arguments.length === 2) {
					value = arguments[1];
				} else {
					while (k < len && !(k in t)) {
						++k;
					}
					if (k >= len) {
						throw new TypeError('Reduce of empty array with no initial value');
					}
					value = t[k++];
				}
				for (; k < len; k++) {
					if (k in t) {
						value = callback(value, t[k], k, t);
					}
				}
				return value;
			},

			round: function() {
				return this.walk(Math.round);
			},

			slice: function(begin, end) {
				return construct(Array.prototype.slice.apply(this, arguments));
			},

			sort: function() {
				return Array.prototype.sort.call(this, function(a, b) {
					return a - b;
				});
			},

			splice: function(start, deleteCount) {
				return construct(Array.prototype.splice.apply(this, arguments));
			},

			sqrt: function() {
				this.walk(function(v) {
					return Math.sqrt(v);
				});

				return this;
			},

			stddev: function() {
				return Math.sqrt(this.variance());
			},

			subtract: function(amount) {
				amount = amount || 1;

				this.walk(function(v) {
					return v - amount;
				});

				return this;
			},

			sum: function() {
				return this.reduce(function(a, b) {
					return a + b;
				}, 0);
			},

			variance: function() {
				if (this.length === 0) {
					return 0;
				}

				var mean = this.mean(),
					sum = 0,
					diff;

				this.call(function(v) {
					diff = v - mean;
					sum += diff * diff;
				});

				return sum / this.length;
			},

			walk: function(callback, thisArg) {
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}

				var O = Object(this),
					len = O.length >>> 0,
					T = arguments.length > 1 ? thisArg : undefined,
					k = 0,
					kValue,
					mappedValue;

				while (k < len) {
					if (k in O) {
						kValue = O[k];
						mappedValue = callback.call(T, kValue, k, O);
						this[k] = mappedValue;
					}
					++k;
				}

				return this;
			}
		};

	array.push.apply(array, arguments);

	if (array.__proto__) {
		array.__proto__ = MathArray.prototype;
		if (!MathArray.prototype.__extended__) {
			MathArray.prototype.__extended__ = true;
			for (name in functions) {
				if (functions.hasOwnProperty(name)) {
					MathArray.prototype[name] = functions[name];
				}
			}
		}
	} else {
		for (name in functions) {
			if (functions.hasOwnProperty(name)) {
				array[name] = functions[name];
			}
		}
	}

	return array;
}
if (MathArray.__proto__) {
	MathArray.prototype = [];
}