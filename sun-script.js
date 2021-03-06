var params = define();
main();

function main() {
	// main function, kicks off the functions
	params['sky'].onload = run;
	params['sky'].src = 'bg-sun-01.jpg';
}

function define() {
	// defines the context in the canvas, gradient and sky returned as an object
	var context = document.getElementById('sky-canvas').getContext('2d'),
			grad = context.createLinearGradient(0, 0, 0, context.canvas.height),
			sky = new Image();
	// add colours
	grad.addColorStop(0, '#F4E9BE');
	grad.addColorStop(0.75, '#F4E9BE');
	grad.addColorStop(1, '#E5AF67');
	context.shadowColor = '#ffffff';
	return {context: context, grad: grad, sky: sky}
}

function run() {
	// runs the main functions and main loop
	var context = params['context'];
	var grad = params['grad'];
	var sky = params['sky'];

	// init position vars
	var arc_centre = context.canvas.width * 0.5,
			arc_bottom = context.canvas.height + 15,
			vert_radius = context.canvas.height * 0.8,
			horit_radius = context.canvas.width * 0.50;

	var time = getRealTime(); // gets real time from function
	var sunrise = 7;          // default, but will obtain from Yahoo Weather API
	var sunset = 18;          // default, but will obtain from Yahoo Weather API

	mainloop();

	function mainloop() {
		// main loop that creates the animation
		var time = getDemoTime();
		var angle = getAngle(time);
		var horit = arc_centre + horit_radius * Math.cos(angle);
		var vert = arc_bottom + vert_radius * Math.sin(angle);
		generateSky(time);
		generateSun(horit, vert);
		requestAnimationFrame(mainloop);
	}

	function getRealTime() {
		// returns real time as a number 
		var date = new Date();
		return Number(date.getHours() + '.' + Math.round(date.getMinutes()*1.66));
	}

	function getDemoTime() {
		// returns a demo time that passes fast
		time += 0.033;
		if (time > 23.59) time = 0;
		return (time - sunrise) / (sunset - sunrise);
	}

	function getAngle(time) {
		// returns angle for sun position
		return Math.PI + Math.PI * time;
	}

	function generateSky(time) {
		// generates the background
		time = Math.max(0, Math.min(1, time));
		context.drawImage(sky, (60 + (sky.width - 120) * time), 0, 1, sky.height, 0, 0, context.canvas.width, context.canvas.height);
	}

	function generateSun(h, v) {
		// generates the sun
		context.beginPath();
		context.moveTo(h + 15, v);
		context.arc(h, v, 15, 0, 6);
		context.fillStyle = grad;
		context.shadowBlur = 20;
		context.fill();
	}
}