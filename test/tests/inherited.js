/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*global QUnit,MathArray*/

QUnit.module('inherited');

QUnit.test('qunit', function(assert) {
	assert.equal(2, 2, "obviously false");
});


QUnit.test('every', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var r = m.every(function(v) {
		return v > 0;
	});

	assert.equal(r, false, 'Some match');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal(m.every(function(v) {
		return v > 100;
	}), false, 'None match');

	assert.equal(m.every(function(v) {
		return v < 100;
	}), true, 'All match');
});

QUnit.test('isArray', function(assert) {
	assert.ok(MathArray.isArray([]), 'MathArray.isArray(Array)');
	assert.ok(MathArray.isArray(new MathArray()), 'MathArray.isArray(MathArray)');
	assert.notOk(MathArray.isArray(1), 'MathArray.isArray(1)');
	assert.notOk(MathArray.isArray({}), 'MathArray.isArray(Object)');
});

QUnit.test('indexOf', function(assert) {
	var m = new MathArray(1, 2, 3, 2);

	var r = m.indexOf(2);

	assert.equal(r, 1, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal(m.indexOf(2, 1), 1, 'From first');
	assert.equal(m.indexOf(2, 2), 3, 'From second');
	assert.equal(m.indexOf(2, 3), 3, 'From last');
	assert.equal(m.indexOf(2, 4), -1, 'Beyond last');
	assert.equal(m.indexOf(4), -1, 'Not found');
});

QUnit.test('join', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var r = m.join();

	assert.equal(r, '-1,0,1', 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal(m.join(''), '-101', 'Empty separator');
	assert.equal(m.join(' and '), '-1 and 0 and 1', 'Long separator');
});


QUnit.test('lastIndexOf', function(assert) {
	var m = new MathArray(1, 2, 3, 2);

	var r = m.lastIndexOf(2);

	assert.equal(r, 3, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal(m.lastIndexOf(2, 0), -1, 'From zero');
	assert.equal(m.lastIndexOf(2, 1), 1, 'From first');
	assert.equal(m.lastIndexOf(2, 2), 1, 'From second');
	assert.equal(m.lastIndexOf(2, 3), 3, 'From last');
	assert.equal(m.lastIndexOf(2, 4), 3, 'Beyond last');
	assert.equal(m.lastIndexOf(4), -1, 'Not found');
});

QUnit.test('reverse', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var m2 = m.reverse();

	assert.equal(m2, m, 'Return self');
	assert.deepEqual(m, [1, 0, -1], 'Operation');
});

QUnit.test('pop', function(assert) {
	var m = new MathArray(0, 1, 2);

	var v = m.pop();

	assert.equal(v, 2, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');
	assert.deepEqual(m, [0, 1], 'Operation');
});

QUnit.test('push', function(assert) {
	var m = new MathArray(0);

	var l = m.push(1, 2);

	assert.equal(l, 3, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');
	assert.deepEqual(m, [0, 1, 2], 'Operation');
});

QUnit.test('shift', function(assert) {
	var m = new MathArray(0, 1, 2);

	var v = m.shift();

	assert.equal(v, 0, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');
	assert.deepEqual(m, [1, 2], 'Operation');
});

QUnit.test('some', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var r = m.some(function(v) {
		return v > 0;
	});

	assert.equal(r, true, 'Some match');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal(m.some(function(v) {
		return v > 100;
	}), false, 'None match');

	assert.equal(m.some(function(v) {
		return v < 100;
	}), true, 'All match');
});

QUnit.test('toString', function(assert) {
	var m = new MathArray(-1, 0, 1);

	var r = m.toString();

	assert.equal(r, '-1,0,1', 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');

	assert.equal('test' + m, 'test-1,0,1', 'Automatic');
});

QUnit.test('unshift', function(assert) {
	var m = new MathArray(0);

	var l = m.unshift(1, 2);

	assert.equal(l, 3, 'Return value');
	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');
	assert.deepEqual(m, [1, 2, 0], 'Operation');
});

//test('values', function(assert) {
//	var m = new MathArray(0, 1, 2);
//
//	var i = m.values();
//
//	assert.equal(i, 3, 'Return value');
//
//	assert.ok(m instanceof MathArray, 'MathArray', 'Is a MathArray');
//	assert.deepEqual(m, [1, 2, 0], 'Operation');
//});