/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*global QUnit,MathArray*/

module('operations');

test('abs', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.abs();

	assert.equal(m2, m, 'Return self');	
	assert.deepEqual(m, [1, 0, 1], 'Integer');
	
	assert.deepEqual((new MathArray(-1.23, 0, 1.23)).abs(), [1.23, 0, 1.23], 'Float');
});

test('add', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.add();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [0, 1, 2], 'Integer default');

	assert.deepEqual((new MathArray(0, 1.2)).add(), [1, 2.2], 'Float default');
	assert.deepEqual((new MathArray(0, 1.2)).add(1.2), [1.2, 2.4], 'Float');
});

test('call', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var sum = 0;
	var m2 = m.call(function(value, index) {
		sum += this + value + index;
		return 99; // ignored
	}, 5);

	assert.equal(m2, m, 'Return self');
	assert.equal(sum, 15+0+3, 'Call result');
	assert.deepEqual(m, [-1, 0, 1], 'Unchanged');
});

test('ceil', function(assert) {
	var m = new MathArray(-0.5, 0, 0.1, 0.5, 0.9, 1);

	var m2 = m.ceil();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [0, 0, 1, 1, 1, 1], 'Operation');
});

test('clone', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.clone();

	assert.notEqual(m2, m, 'Return self');
	assert.deepEqual(m, [-1, 0, 1], 'Unchanged original');
	assert.deepEqual(m2, [-1, 0, 1], 'Exact clone');
});

test('divide', function(assert) {
	var m = new MathArray(-100, 0, 100);

	var m2 = m.divide();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [-1, 0, 1], 'Integer default');

	assert.deepEqual((new MathArray(-1234, 0, 1234)).divide(), [-12.34, 0, 12.34], 'Float default');
	assert.deepEqual((new MathArray(-1234, 0, 1234)).divide(2), [-617, 0, 617], 'Float');
});

test('floor', function(assert) {
	var m = new MathArray(-0.5, 0, 0.1, 0.5, 0.9, 1);

	var m2 = m.floor();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [-1, 0, 0, 0, 0, 1], 'Operation');
});

test('histogram', function(assert) {
	var m = new MathArray(0, 1, 1, 3, 3, 3);

	var h = m.histogram();

	assert.deepEqual(h, {0: 1, 1: 2, 3: 3}, 'Operation');
	assert.deepEqual(m, [0, 1, 1, 3, 3, 3], 'Unchanged');
});

test('last', function(assert) {
	var m = new MathArray(0, 1, 2);

	assert.deepEqual(m.last(), 2, 'Operation');
	assert.deepEqual(m, [0, 1, 2], 'Unchanged');
});

test('max', function(assert) {
	var m = new MathArray(-1, 0, 1);
	assert.equal(m.max(), 1, 'Operation');
});

test('mean', function(assert) {
	assert.equal((new MathArray()).mean(), 0, 'Operation');
	assert.equal((new MathArray(1)).mean(), 1, 'Operation');
	assert.equal((new MathArray(3, 1, 2)).mean(), 6/3, 'Operation');
	assert.equal((new MathArray(4, 1, 3, 2)).mean(), 10/4, 'Operation');
	assert.equal((new MathArray(1, 10, 1, 1)).mean(), 13/4, 'Operation');
});

test('median', function(assert) {
	assert.equal((new MathArray()).median(), 0, 'Operation');
	assert.equal((new MathArray(1)).median(), 1, 'Operation');
	assert.equal((new MathArray(3, 1, 2)).median(), 2, 'Operation');
	assert.equal((new MathArray(4, 1, 3, 2)).median(), 2.5, 'Operation');
	assert.equal((new MathArray(1, 10, 1, 1)).median(), 1, 'Operation');
});

test('min', function(assert) {
	var m = new MathArray(-1, 0, 1);
	assert.equal(m.min(), -1, 'Operation');
});

test('modes', function(assert) {
	assert.deepEqual((new MathArray()).modes(), [], 'None');
	assert.deepEqual((new MathArray(1)).modes(), [1], 'Modal');
	assert.deepEqual((new MathArray(1, 2, 3)).modes(), [1, 2, 3], 'multimodal ');
	assert.deepEqual((new MathArray(1, 2, 3, 4, 5, 5)).modes(), [5], 'Modal');
	assert.deepEqual((new MathArray(1, 1, 2, 3, 4, 5, 5)).modes(), [1, 5], 'Bimodal');
});

test('multiply', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.multiply();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [-100, 0, 100], 'Integer default');

	assert.deepEqual((new MathArray(-1.234, 0, 1.234)).multiply(), [-123.4, 0, 123.4], 'Float default');
	assert.deepEqual((new MathArray(-1.234, 0, 1.234)).multiply(2), [-2.468, 0, 2.468], 'Float');
});

test('randoms', function(assert) {
	var m1 = (new MathArray()).randoms();
	var m2 = (new MathArray()).randoms();
	var m3 = (new MathArray()).randoms();

	assert.notDeepEqual(m1, m2, 'Random');
	assert.notDeepEqual(m2, m3, 'Random');
	assert.notDeepEqual(m1, m3, 'Random');
});

test('range', function(assert) {
	var m = new MathArray();

	var m2 = m.range();

	assert.equal(m2, m, 'Return self');
	assert.equal(m.length, 256, 'Default');

	assert.deepEqual(m.range(253), [253, 254, 255], 'Min');
	assert.deepEqual(m.range(253, 256), [253, 254, 255, 256], 'Min/max');
	assert.deepEqual(m.range(253, 256, 2), [253, 255], 'Exclude max');
	assert.deepEqual(m.range(253, 257, 2), [253, 255, 257], 'Include max');
	assert.deepEqual(m.range(5, 1, -1), [5, 4, 3, 2, 1], 'Negative step');

	assert.deepEqual(m.range(5, 1, 1), [5, 4, 3, 2, 1], 'Positive swapped');
	assert.deepEqual(m.range(1, 5, -1), [1, 2, 3, 4, 5], 'Negative swapped');

	assert.deepEqual(m.range(3, 3, 1), [3], 'Zero range');
});

test('round', function(assert) {
	var m = new MathArray(-0.5, 0, 0.1, 0.5, 0.9, 1);

	var m2 = m.round();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [0, 0, 0, 1, 1, 1], 'Operation');
});

test('sqrt', function(assert) {
	var m = new MathArray(0, 1, 25, 110.25);

	var m2 = m.sqrt();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [0, 1, 5, 10.5], 'Operation');
});

test('stddev', function(assert) {
	assert.equal((new MathArray()).stddev(), 0, 'Empty');
	assert.equal((new MathArray(1)).stddev(), 0, 'Single');
	assert.equal((new MathArray(1, 2, 3)).stddev().toFixed(10), '0.8164965809', 'Integer');
	assert.equal((new MathArray(1.2, 1.4, 1.3)).stddev().toFixed(10), '0.0816496581', 'Float');
	assert.equal((new MathArray(0, 1, -1)).stddev().toFixed(10), '0.8164965809', 'Negative');
});

test('subtract', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.subtract();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [-2, -1, 0], 'Integer default');

	assert.deepEqual((new MathArray(0)).subtract(), [-1], 'Float default');
	assert.deepEqual((new MathArray(0)).subtract(1.2), [-1.2], 'Float');
});

test('sum', function(assert) {
	assert.equal((new MathArray()).sum(), 0, 'Empty');
	assert.equal((new MathArray(1)).sum(), 1, 'Single');
	assert.equal((new MathArray(1, 2, 3)).sum(), 6, 'Integer');
	assert.equal((new MathArray(1.1, 1.2, 1.3)).sum().toFixed(2), '3.60', 'Float');
	assert.equal((new MathArray(0, 1, -1)).sum(), 0, 'Negative');
});

test('variance', function(assert) {
	assert.equal((new MathArray()).variance(), 0, 'Empty');
	assert.equal((new MathArray(1)).variance(), 0, 'Single');
	assert.equal((new MathArray(1,2,3)).variance().toFixed(10), '0.6666666667', 'Integer');
	assert.equal((new MathArray(1.2,1.4,1.3)).variance().toFixed(10), '0.0066666667', 'Float');
	assert.equal((new MathArray(0, 1, -1)).variance().toFixed(10), '0.6666666667', 'Negative');
});
