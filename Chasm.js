// Animation Initialization
let storage_canvas_w = 40;
let storage_canvas_y = 40;

var earth_storage_canvas;
let earth_stored = 0;

// Resource Initialization
var earth = new chasm_resource_small("earth");
earth.option_unlocked = true;
earth.option_cap = true;
earth.setCap(1600);

function game_init() {
	// Animation Initialization
	earth_storage_canvas = $("#earth_storage")[0].getContext("2d");
	animation_tick();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_init(animation_tick);
}

function animation_tick() {
	draw_resources();
	draw_earth_storage();
}

function game_tick(scalar) {
	earth.gain(200 * scalar);
}

function draw_resources() {
	$("#resource_earth_amount").html(earth.current.toFixed(0));
}

function draw_earth_storage() {
	for (; earth_stored < earth.current; earth_stored++) {
		earth_storage_canvas.fillStyle = "#" + (Math.floor(Math.random() * 0xffffff)).toString(16);
		earth_storage_canvas.fillRect(
			(storage_canvas_w - 1) - (earth_stored % storage_canvas_w),
			(storage_canvas_y - 1) - Math.floor((earth_stored / storage_canvas_y)),
			1, 1);
	}
}