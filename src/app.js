// This file is meant to be used as a starting point for a sense-hat application
// using node-sense-hat. It first sets up a ball to be drawn, at a specific
// position with a specific color.
// A function to draw the said ball is the created, and also setup to be called
// once every 500ms.
// We then register for events on the joystick, and use the information passed
// into the event handlers to move the ball in the same direction that the
// joystick is pressed.
SenseHat = require('node-sense-hat');

// Let's pull out the joystick library
JoystickLib = SenseHat.Joystick;

// And the handle to the LED matrix
matrix = SenseHat.Leds;


// Let's create something to draw
ball = {
	// Let's draw a red ball (this is an RGB array)
	color: [ 255, 0, 0 ],
	// And let's start it off in the top left corner
	x: 0,
	y: 0
};

// Now let's create a function which will draw the ball to the screen
function drawBall() {
	// First let's clear the led matrix
	Matrix.clear();

	// Now let's draw the ball at the correct location
	Matrix.setPixel(ball.x, ball.y, ball.color);
}

// We want the ball to be constantly redrawn, it will be changing
// location after all!

// Call our drawing function every 500ms
interval = 500;
setInterval(drawBall, interval);

// Now that we have setup our drawing function, let's get a "handle" to the
// joystick on the sense-hat, which is a way to receive events when the
// joystick is used
JoystickLib.getJoystick()
	.then(function(joystick) {
		// The joystick handle is defined inside of this function

		// Given a direction, return the vector of change that this direction
		// corresponds to
		function directionToVector(direction) {
			switch(direction) {
				case 'up':
					return { x: 0, y: -1 };
				case 'down':
					return { x: 0, y: 1 };
				case 'left':
					return { x: -1, y: 0 };
				case 'right':
					return { x: 1, y: 0 };
			}
		}

		// Let's register for some events

		// When the joystick is pressed, the below function will execute,
		// with the direction variable being one of 'up', 'down', 'left' or 'right'
		joystick.on('press', function(direction) {
			console.log('The joystick was pressed ' + direction);
			// Let's move the ball in the correct direction
			vector = directionToVector(direction);
			ball.x += vector.x;
			ball.y += vector.y;
		});

		joystick.on('release', function(direction) {
			console.log('The joystick was released from ' + direction);
			// We don't need to move the ball when the direction is released
		});

		joystick.on('hold', function(direction) {
			console.log('The joystick is being held ' + direction);

			vector = directionToVector(direction);
			ball.x += vector.x;
			ball.y += vector.y;
		});

	});