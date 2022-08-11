// Resource Initialization
var particles = new chasm_resource("Void Particles");
particles.option_unlocked = true;

var earth = new chasm_resource_small("earth");
earth.option_unlocked = true;
earth.option_cap = true;

var water = new chasm_resource_small("water");
water.option_unlocked = true;
water.option_cap = true;

// Storage Initialization
var earth_storage = new resource_storage("earth_storage", earth);
earth_storage.storage_flags |= STORAGE_FLAGS_EARTH;
earth_storage.brick_w = 16;
earth_storage.brick_h = 16;
earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

var water_storage = new resource_storage("water_storage", water);
water_storage.storage_flags |= STORAGE_FLAGS_WATER;
water_storage.brick_w = 64;
water_storage.brick_h = 1;
water.setCap((water_storage.canvas_w * water_storage.canvas_h) / (water_storage.brick_w * water_storage.brick_h));

// Game Initialization
function game_init() {
	// Page Initialization
	$("#lib_chasm_version").html(lib_chasm_version());

	// Animation Initialization
	earth_storage.init($("#earth_storage")[0].getContext("2d"));
	water_storage.init($("#water_storage")[0].getContext("2d"));
	animation_tick();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_init(animation_tick);
}

function animation_tick() {
	draw_resources();

	// Earth
	earth_storage.draw();
	if (earth.current == earth.cap) $("#earth_drop").removeClass("disabled");
	else $("#earth_drop").addClass("disabled")

	// Water
	water_storage.draw();
	if (earth.current == earth.cap) $("#water_drop").removeClass("disabled");
	else $("#water_drop").addClass("disabled")
}

function draw_resources() {
	// Update currency
	$("#currency_particles_amount").html(particles.current.toFixed(0));

	// Update resources
	$("#resource_earth_amount").html(Math.floor(earth.current));
	$("#resource_water_amount").html(Math.floor(water.current));
}

function game_tick(scalar) {
	// To do: change to calculated earth/sec rate
	//earth.gain(2 * scalar);
	//water.gain(4 * scalar);
}

// Button handling
function gather(resource) {
	switch (resource) {
		case earth:
			resource.gain(1);
			break;
		case water:
			resource.gain(1);
			break;
		default:
	}
}

function drop(storage) {
	switch (storage) {
		case earth_storage:
			storage.drop();
			break;
		case water_storage:
			storage.drop();
			break;
		default:
	}
}

// Materialize UI
$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.tabs').tabs();
});