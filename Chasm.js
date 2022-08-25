// Resource Initialization
var particles = new chasm_resource("Void Particles");
particles.option_unlocked = true;

var strands = new chasm_resource("Gravity Strands");
strands.option_unlocked = true;

var spirit = new chasm_resource("Spirit Sand");
spirit.option_unlocked = true;

var soul = new chasm_resource("Soul Splinters");
soul.option_unlocked = true;

var earth = new chasm_resource_small("earth");
earth.option_unlocked = true;
earth.option_cap = true;

var water = new chasm_resource_small("water");
water.option_unlocked = true;
water.option_cap = true;

// Storage Initialization
var earth_storage = new resource_storage("earth_storage", earth);
earth_storage.storage_flags |= STORAGE_FLAGS_EARTH;
earth_storage.brick_w = 32;
earth_storage.brick_h = 32;
earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

var water_storage = new resource_storage("water_storage", water);
water_storage.storage_flags |= STORAGE_FLAGS_WATER;
water_storage.brick_w = 64;
water_storage.brick_h = 1;
water.setCap((water_storage.canvas_w * water_storage.canvas_h) / (water_storage.brick_w * water_storage.brick_h));

// Transient globals (not saved across sessions)
var earth_gather_progress = 0;
var earth_drop_progress = 0;
var water_gather_progress = 0;
var water_drop_progress = 0;

// Game Save data
// Need a way to handle save data version change
class saveData {
	saveCount;
	other_stuff;
	morethings;

	constructor() {
		this.saveCount = 1;
		this.other_stuff = 0;
		this.morethings = 3;
	}
}

var chasm;

// Game Initialization
function game_init() {
	// Page Initialization
	$("#lib_chasm_version").html(lib_chasm_version());

	// Animation Initialization
	earth_storage.init($("#earth_storage")[0].getContext("2d"));
	water_storage.init($("#water_storage")[0].getContext("2d"));
	animation_tick();

	// Upgrade Initialization
	initUpgrades();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_add_process_to_scheduler(achievement_tick, 700, chasm_process_flag_disable_multitick);
	chasm_timing_init(animation_tick);
	
	// Register Events
	registerInspectorEvents();

	// Load Saved Game
	chasm = JSON.parse(localStorage.getItem("chasm"));
	if (!chasm) {
		// New Game
		chasm = new saveData();
	} else {
		// Load Game
		chasm.saveCount++;
	}
	localStorage.setItem("chasm", JSON.stringify(chasm));

	// Loading finished, reveal the game
	$("#game_box").css("display", "block")
}

// Materialize Colors
var color_disabled = "blue-grey lighten-3";
var color_earth = "brown lighten-1";
var color_water = "blue lighten-2"

function animation_tick() {
	draw_resources();

	// Earth
	earth_storage.draw();
	if (earth.current == earth.cap) {
		// Disable gather
		$("#earth_gather").addClass("disabled");
		$("#earth_gather_progress").removeClass(color_earth).addClass(color_disabled);

		// Enable drop
		$("#earth_drop").removeClass("disabled");
		$("#earth_drop_progress").removeClass(color_disabled).addClass(color_earth);
	} else {
		// Enable gather
		$("#earth_gather").removeClass("disabled");
		$("#earth_gather_progress").removeClass(color_disabled).addClass(color_earth);

		// Disable drop
		$("#earth_drop").addClass("disabled");
		$("#earth_drop_progress").removeClass(color_earth).addClass(color_disabled);
	}

	$("#earth_gather_progress").width(earth_gather_progress + "%");
	$("#earth_drop_progress").width(earth_drop_progress + "%");

	// Water
	water_storage.draw();
	if (water.current == water.cap) {
		// Disable gather
		$("#water_gather").addClass("disabled");
		$("#water_gather_progress").removeClass(color_water).addClass(color_disabled);

		// Enable drop
		$("#water_drop").removeClass("disabled");
		$("#water_drop_progress").removeClass(color_disabled).addClass(color_water);
	} else {
		// Enable gather
		$("#water_gather").removeClass("disabled");
		$("#water_gather_progress").removeClass(color_disabled).addClass(color_water);

		// Disable drop
		$("#water_drop").addClass("disabled");
		$("#water_drop_progress").removeClass(color_water).addClass(color_disabled);
	}

	$("#water_gather_progress").width(Math.floor(water_gather_progress) + "%");
	$("#water_drop_progress").width(Math.floor(water_drop_progress) + "%");
}

function draw_resources() {
	// Update currency
	$("#currency_particles_amount").html(particles.current.toFixed(2));
	$("#currency_strands_amount").html(strands.current.toFixed(2));
	$("#currency_spirit_amount").html(spirit.current.toFixed(2));
	$("#currency_soul_amount").html(soul.current.toFixed(2));

	// Update resources
	$("#resource_earth_amount").html(Math.floor(earth.current));
	$("#resource_water_amount").html(Math.floor(water.current));
}

function game_tick(scalar) {
	
	// Earth Gather
	if (chasm_upgrades[uid.ant_farm].unlocked) {
		earth_gather_progress += (50 * scalar);
	}
	if (earth_gather_progress > 100) {
		if (earth.current == earth.cap) {
			earth_gather_progress = 100;
		} else {
			earth_gather_progress = 0;
			gather(earth)
		}
	}

	// Earth Drop
	if (chasm_upgrades[uid.catapult].unlocked) {
		earth_drop_progress += (10 * scalar);
	}
	if (earth_drop_progress > 100) {
		if (earth.current == earth.cap) {
			earth_drop_progress = 0;
			drop(earth_storage)
		} else {
			earth_drop_progress = 100;
		}
	}

	// Water Gather
	if (chasm_upgrades[uid.rain_barrels].unlocked) {
		water_gather_progress += (5 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		gather(water)
	}

	// Water Drop
	if (chasm_upgrades[uid.sprinkler].unlocked) {
		water_drop_progress += (0.8 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		drop(water_storage);
	}
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
		case "earth_storage":
			if(earth_storage.drop()) {
				// Base gain
				let particles_out = earth_storage.bitmap.count(BIT_TYPE_EARTH) * 0.01;

				particles.gain(particles_out);
				earth_storage.clear();
			}
			break;

		case "water_storage":
			if (water_storage.drop()) {
				// Base gain
				let particles_out = water_storage.bitmap.count(BIT_TYPE_WATER) * 0.01;

				particles.gain(particles_out);
				water_storage.clear();
			}
			break;
			
		default:
	}
}

// Materialize UI
$(document).ready(function(){
	M.AutoInit();
    $('.tabs-vertical').tabs();
});