// Transient globals (not saved across sessions)
var earth_gather_progress = 0;
var earth_drop_progress = 0;
var water_gather_progress = 0;
var water_drop_progress = 0;

// Log colors
var log_color_story 		= "GhostWhite";
var log_color_achievement 	= "LightGreen";
var log_color_unlock 		= "LightPink";
var log_color_cheat 		= "Plum";

var chasm_log;

// Materialize Colors
var color_disabled = "blue-grey lighten-3";
var color_earth = "brown lighten-1";
var color_water = "blue lighten-2";



// Look into resource sinks. Gacha style storage to recycle high-volume resources for high-rarity resources?


// Game Initialization
function game_init() {
	// Page Initialization
	$("#lib_chasm_version").html(lib_chasm_version());

	// Log Initialization
	chasm_log = new lib_chasm_log("log_box", 35, 0);
	chasm_log.writeColor("You stand in front of a massive, seemingly bottomless Chasm in the middle of nowhere. Some wretched urge inside you insists that you fill it up.", log_color_story);

	// Storage Initialization
	initStorage();

	// Currency Initialization
	initCurrency();

	// Upgrade Initialization
	initUpgrades();

	// Achievement Initialization
	init_achievements();
	init_milestones();

	// Animation Initialization
	chasm_storage[sid.storage_earth].init($("#earth_storage")[0].getContext("2d"));
	chasm_storage[sid.storage_water].init($("#water_storage")[0].getContext("2d"));
	animation_tick();

	// Timing Initialization
	chasm_timing_add_process_to_scheduler(game_tick, 80, 0);
	chasm_timing_add_process_to_scheduler(achievement_tick, 700, chasm_process_flag_disable_multitick);
	chasm_timing_add_process_to_scheduler(milestone_tick, 700, chasm_process_flag_disable_multitick);
	chasm_timing_add_process_to_scheduler(autoSave, 10000, chasm_process_flag_disable_multitick);
	chasm_timing_init(animation_tick);
	
	// Register Events
	registerInspectorEvents();

	// Load Saved Game
	loadSave();

	// Loading finished, reveal the game
	$("#game_box").css("display", "block")
}

function animation_tick() {
	draw_resources();
	showInspector(current_inspector_id);

	// Earth
	chasm_storage[sid.storage_earth].draw();
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
	chasm_storage[sid.storage_water].draw();
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
	$("#currency_particles_amount").html(chasm_currency[cid.currency_particles].resource.current.toFixed(2));
	$("#currency_strands_amount").html(chasm_currency[cid.currency_strands].resource.current.toFixed(2));
	$("#currency_spirit_amount").html(chasm_currency[cid.currency_spirit].resource.current.toFixed(2));
	$("#currency_soul_amount").html(chasm_currency[cid.currency_soul].resource.current.toFixed(2));
	$("#currency_workers_amount").html(chasm_currency[cid.currency_workers].resource.current.toFixed(0));

	// Update resources
	let earth_element_count = chasm_storage[sid.storage_earth].bitmap.element_count();
	let earth_currency_count = chasm_storage[sid.storage_earth].bitmap.value(earth_element_count);
	$("#element_earth_amount").html(chasm_storage[sid.storage_earth].bitmap.stringifyElements(earth_element_count));
	$("#value_earth_amount").html(chasm_storage[sid.storage_earth].bitmap.stringifyValue(earth_currency_count));

	let water_element_count = chasm_storage[sid.storage_water].bitmap.element_count();
	let water_currency_count = chasm_storage[sid.storage_water].bitmap.value(water_element_count);
	$("#element_water_amount").html(chasm_storage[sid.storage_water].bitmap.stringifyElements(water_element_count));
	$("#value_water_amount").html(chasm_storage[sid.storage_water].bitmap.stringifyValue(water_currency_count));
}

function game_tick(scalar) {
	
	// Earth Gather
	if (chasm_storage[sid.storage_earth].workers_gather > 0) {
		earth_gather_progress += chasm_storage[sid.storage_earth].workers_gather * 10 * scalar;
	}
	if (earth_gather_progress > 100) {
		if (earth.current == earth.cap) {
			earth_gather_progress = 100;
		} else {
			let cycles = Math.floor(earth_gather_progress / 100);
			earth_gather_progress -= Math.floor(cycles) * 100;
			for (let i = 0; i < cycles; i++) {
				gather(earth);
			}
		}
	}

	// Earth Drop
	if (chasm_storage[sid.storage_earth].workers_drop > 0) {
		earth_drop_progress += chasm_storage[sid.storage_earth].workers_drop * 10 * scalar;
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
	if ($("#water_gather_checkbox").is(':checked')) {
		water_gather_progress += (5 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		gather(water);
	}

	// Water Drop
	if ($("#water_drop_checkbox").is(':checked')) {
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
			if(chasm_storage[sid.storage_earth].drop()) {
				currency_gain(chasm_storage[sid.storage_earth].bitmap.value(chasm_storage[sid.storage_earth].bitmap.element_count()));
				chasm_storage[sid.storage_earth].clear();

				if (chasm_achievements[aid.achievement_babys_first_block].unlocked == false) {
					chasm_achievements[aid.achievement_babys_first_block].unlock();
				}
			}
			break;

		case "water_storage":
			if (chasm_storage[sid.storage_water].drop()) {
				currency_gain(chasm_storage[sid.storage_water].bitmap.value(chasm_storage[sid.storage_water].bitmap.element_count()));
				chasm_storage[sid.storage_water].clear();
			}
			break;
			
		default:
	}
}

// Materialize UI
$(document).ready(function(){
	M.AutoInit();
    $('.tabs-vertical').tabs();
	var sliders = document.querySelectorAll("input[type=range]");
    M.Range.init(sliders);
});