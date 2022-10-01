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

// Log colors
var log_color_story 		= "GhostWhite";
var log_color_achievement 	= "LightGreen";
var log_color_unlock 		= "LightPink";
var log_color_cheat 		= "Plum";

var chasm;
var chasm_log;

// Game Initialization
function game_init() {
	// Page Initialization
	$("#lib_chasm_version").html(lib_chasm_version());

	// Animation Initialization
	earth_storage.init($("#earth_storage")[0].getContext("2d"));
	water_storage.init($("#water_storage")[0].getContext("2d"));
	animation_tick();

	// Log Initialization
	chasm_log = new lib_chasm_log("log_box", 35, 0);
	chasm_log.writeColor("You stand in front of a massive, seemingly bottomless Chasm in the middle of nowhere. Some wretched urge inside you insists that you fill it up.", log_color_story);

	// Upgrade Initialization
	initUpgrades();

	// Achievement Initialization
	init_achievements();
	init_milestones();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_add_process_to_scheduler(achievement_tick, 700, chasm_process_flag_disable_multitick);
	chasm_timing_add_process_to_scheduler(milestone_tick, 700, chasm_process_flag_disable_multitick);
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
	showInspector(current_inspector_id);

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
	let earth_element_count = earth_storage.bitmap.element_count();
	let earth_currency_count = earth_storage.bitmap.value(earth_element_count);
	$("#element_earth_amount").html(earth_storage.bitmap.stringifyElements(earth_element_count));
	$("#value_earth_amount").html(earth_storage.bitmap.stringifyValue(earth_currency_count));

	let water_element_count = water_storage.bitmap.element_count();
	let water_currency_count = water_storage.bitmap.value(water_element_count);
	$("#element_water_amount").html(water_storage.bitmap.stringifyElements(water_element_count));
	$("#value_water_amount").html(water_storage.bitmap.stringifyValue(water_currency_count));
}

function game_tick(scalar) {
	
	// Earth Gather
	if (chasm_upgrades[uid.upgrade_ant_farm].unlocked && $("#earth_gather_checkbox").is(':checked')) {
		earth_gather_progress += (50 * scalar);
	}
	if (earth_gather_progress > 100) {
		if (earth.current == earth.cap) {
			earth_gather_progress = 100;
		} else {
			earth_gather_progress = 0;
			gather(earth);
		}
	}

	// Earth Drop
	if (chasm_upgrades[uid.upgrade_catapult].unlocked && $("#earth_drop_checkbox").is(':checked')) {
		earth_drop_progress += (10 * scalar);
	}
	if (earth_drop_progress > 100) {
		if (earth.current == earth.cap) {
			earth_drop_progress = 0;
			drop("earth_storage");
		} else {
			earth_drop_progress = 100;
		}
	}

	// Water Gather
	if (chasm_upgrades[uid.upgrade_rain_barrels].unlocked && $("#water_gather_checkbox").is(':checked')) {
		water_gather_progress += (5 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		gather(water);
	}

	// Water Drop
	if (chasm_upgrades[uid.upgrade_sprinkler].unlocked && $("#water_drop_checkbox").is(':checked')) {
		water_drop_progress += (0.8 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		drop("water_storage");
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
				currency_gain(earth_storage.bitmap.value(earth_storage.bitmap.element_count()));
				earth_storage.clear();

				if (chasm_achievements[aid.achievement_babys_first_block].unlocked == false) {
					chasm_achievements[aid.achievement_babys_first_block].unlock();
				}
			}
			break;

		case "water_storage":
			if (water_storage.drop()) {
				currency_gain(water_storage.bitmap.value(water_storage.bitmap.element_count()));
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