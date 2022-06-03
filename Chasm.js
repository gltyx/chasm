// Storage Initialization
var earth_storage = new resource_storage("earth_storage");
earth_storage.storage_flags |= STORAGE_FLAGS_EARTH;
earth_storage.brick_w = 8;
earth_storage.brick_h = 8;

var water_storage = new resource_storage("water_storage");
water_storage.storage_flags |= STORAGE_FLAGS_WATER;
water_storage.brick_w = 64;
water_storage.brick_h = 1;

// Resource Initialization
var particles = new chasm_resource("Void Particles");
particles.option_unlocked = true;

var earth = new chasm_resource_small("earth");
earth.option_unlocked = true;
earth.option_cap = true;
earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

var water = new chasm_resource_small("water");
water.option_unlocked = true;
water.option_cap = true;
water.setCap((water_storage.canvas_w * water_storage.canvas_h) / (water_storage.brick_w * water_storage.brick_h));

// Game Initialization
function game_init() {
	// Animation Initialization
	earth_storage.canvas = $("#earth_storage")[0].getContext("2d");
	water_storage.canvas = $("#water_storage")[0].getContext("2d");
	storage_init(earth_storage);
	storage_init(water_storage);
	animation_tick();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_init(animation_tick);
}

function animation_tick() {
	draw_resources();
	draw_storage(earth, earth_storage);
	draw_storage(water, water_storage);
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
	earth.gain(2 * scalar);
	water.gain(4 * scalar);
}