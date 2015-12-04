/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*global QUnit,MathArray*/

QUnit.module('overwrites');

test('concat', function(assert) {
	var m = new MathArray(1, 2);

	var m2 = m.concat(3, 4);

	assert.notEqual(m2, m, 'Return different');
	assert.ok(m instanceof MathArray, 'Original is a MathArray');
	assert.ok(m2 instanceof MathArray, 'New is a MathArray');
	assert.deepEqual(m, [1, 2], 'Unchanged');
	assert.deepEqual(m2, [1, 2, 3, 4], 'Operation');
});

test('filter', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.filter(function(value, index) {
		return value >= 0;
	}, 5);

	assert.notEqual(m2, m, 'Return self');
	assert.ok(m2 instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m, [-1, 0, 1], 'Unchanged');
	assert.deepEqual(m2, [0, 1], 'Operation');
});

test('forEach', function(assert) {
	var m = new MathArray(0, 1, 2, 3);

	var v = 0;
	var m2 = m.forEach(function(value, index) {
		return v += value * index;
	});

	assert.equal(m2, m, 'Return self');
	assert.ok(m2 instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m, [0, 1, 2, 3], 'Unchanged');
	assert.equal(v, ( (0*0) + (1*1) + (2*2) + (3*3) ), 'Operation');
});

test('map', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.map(function(value, index) {
		return this + value + index;
	}, 5);

	assert.notEqual(m2, m, 'Return self');
	assert.ok(m2 instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m, [-1, 0, 1], 'Unchanged');
	assert.deepEqual(m2, [5+-1+0, 5+0+1, 5+1+2], 'Operation');
});

test('reduce', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var v = m.reduce(function(previous, value, index) {
		return previous + value + index;
	}, 5);

	assert.ok(m instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m, [-1, 0, 1], 'Unchanged with intial');
	assert.deepEqual(v, 5+0+3, 'Operation with intial');

	v = m.reduce(function(previous, value, index) {
		return previous + value + index;
	});

	assert.deepEqual(m, [-1, 0, 1], 'Unchanged without initial');
	assert.deepEqual(v, 0+0+3, 'Operation without initial');
});

test('slice', function(assert) {
	var m = new MathArray(0, 1, 2, 3, 4);

	var m2 = m.slice(2, -1);

	assert.notEqual(m2, m, 'Not return self');
	assert.ok(m2 instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m2, [2, 3], 'Operation');
});

test('sort', function(assert) {
	var m = new MathArray(5, 1, 3, 4, 2);

	var m2 = m.sort();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [1, 2, 3, 4, 5], 'Operation');
	assert.ok(m instanceof MathArray, 'Is a MathArray');

	assert.deepEqual((new MathArray()).sort(), [], 'Empty');
	assert.deepEqual((new MathArray(1)).sort(), [1], 'Single');
	assert.deepEqual((new MathArray(1, 3, 1)).sort(), [1, 1, 3], 'Duplicate values');
	assert.deepEqual((new MathArray(1.2, 1.4, 1.3)).sort(), [1.2, 1.3, 1.4], 'Float');
	assert.deepEqual((new MathArray(0, 1, -1)).sort(), [-1, 0, 1], 'Negative');
});

test('splice', function(assert) {
	var m = new MathArray(0, 1, 2, 3, 4);

	var m2 = m.splice(2, 2, 10, 11, 12);

	assert.notEqual(m2, m, 'Not return self');
	assert.ok(m2 instanceof MathArray, 'Is a MathArray');
	assert.deepEqual(m2, [2, 3], 'Operation');
	assert.deepEqual(m, [0, 1, 10, 11, 12, 4], 'Operation');
});