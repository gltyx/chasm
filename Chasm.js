// Animation Initialization
// Storage canvas w/h must be in the set {2^x}
let storage_canvas_w = 64;
let storage_canvas_h = 64;

// Essay: The Chasm
// The Chasm is a paranormal hole in the Earth that no one has ever been able
// to map or explain. There have been reports of strange phenomenon around the
// chasm. You have decided there is only one way to deal with this gap in reality,
// you must fill it up. The Chasm has a hidden value, HUNGER, representing the
// amount of matter it can consume before filling up completely. This HUNGER is
// represented in BRICKS of earth. By dropping in BLOCKS of matter, composed of
// BRICKS, the Chasm's HUNGER can be sated. The walls of the Chasm are not perfectly
// vertical, and progress towards satiation can be tracked as the Chasm narrows,
// BLOCKS of matter piling up at its edges.
//
// As you feed the Chasm, it will reward you with VOID PARTICLES. PARTICLES are a
// currency which can be used to upgrade your matter harvesting operation. 

// Essay: Matter
// A BLOCK of matter is composed of [density^2] BRICKS.

let earth_storage_canvas;
let earth_stored = 0;					// number of full BRICKS stored in canvas
let earth_density = Math.pow(2, 4);		// density^2 = number of BRICKS per BLOCK

// Resource Initialization
var earth = new chasm_resource_small("earth");
earth.option_unlocked = true;
earth.option_cap = true;
earth.setCap(earth_density * earth_density);

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

function draw_resources() {
	$("#resource_earth_amount").html(Math.floor(earth.current));
}

function draw_earth_storage() {
	let brick_size_w = storage_canvas_w / earth_density;
	let brick_size_h = storage_canvas_h / earth_density;
	for (; earth_stored < Math.floor(earth.current); earth_stored++) {
		earth_storage_canvas.fillStyle = "#" + (Math.floor(Math.random() * 0xffffff)).toString(16);
		earth_storage_canvas.fillRect(
			(storage_canvas_w) - (brick_size_w * ((earth_stored % earth_density) + 1)),
			(storage_canvas_h) - (brick_size_h * (Math.floor(earth_stored / earth_density) + 1)),
			brick_size_w,
			brick_size_h);
	}
}

function drop_earth() {
	if (earth.spend(earth_stored)) {
		earth_stored = 0;
		clear_earth_storage();
	}
}

function clear_earth_storage() {
	earth_storage_canvas.fillStyle = "#FFFFFF";
	earth_storage_canvas.fillRect(
		0,
		0,
		storage_canvas_w,
		storage_canvas_h);
}

function game_tick(scalar) {
	// To do: change 0.3 to calculated earth/sec rate
	earth.gain(5 * scalar);
}