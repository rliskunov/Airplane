window.addEventListener('keyup', function (event) {
	Key.onKeyUp(event);
}, false);
window.addEventListener('keydown', function (event) {
	Key.onKeyDown(event);
}, false);

var Key = {
	_pressed: {},

	_0: 48,
	_1: 49,
	_2: 50,
	_3: 51,
	_8: 56,
	_9: 57,

	A: 65,
	W: 87,
	D: 68,
	S: 83,
	Q: 81,
	E: 69,
	Z: 90,
	X: 88,
	Y: 89,
	H: 72,
	C: 67,
	V: 86,
	B: 66,
	N: 78,

	Up: 104,
	Down: 98,
	Left: 100,
	Right: 102,
	Depth: 103,
	UnDepth: 105,

	UpArrow: 38,
	DownArrow: 40,
	RightArrow: 39,
	LeftArrow: 37,

	O: 79,
	P: 80,
	U: 85,
	I: 73,

	ENTER: 13,
	SPACE: 32,

	isDown: function (keyCode) {
		return this._pressed[keyCode];
	},

	onKeyDown: function (event) {
		this._pressed[event.keyCode] = true;
	},

	onKeyUp: function (event) {
		delete this._pressed[event.keyCode];
	}
};