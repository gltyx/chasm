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

// Upgrades
var upgrade_steel_toed_boots = false;
var upgrade_ant_farm = false;
var upgrade_catapult = false;
var upgrade_rain_barrels = false;
var upgrade_sprinkler = false;

// Achievements
var achievement_babys_first_block = false;
var achievement_reality_sprang_a_leak = false;

// Transient globals (not saved across sessions)
var earth_gather_progress = 0;
var earth_drop_progress = 0;
var water_gather_progress = 0;
var water_drop_progress = 0;

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
	chasm_timing_add_process_to_scheduler(achievement_tick, 700, chasm_process_flag_disable_multitick);
	chasm_timing_init(animation_tick);
	
	// Register Events
	register_events();
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
	if (upgrade_ant_farm) {
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
	if (upgrade_catapult) {
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
	if (upgrade_rain_barrels) {
		water_gather_progress += (5 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		gather(water)
	}

	// Water Drop
	if (upgrade_sprinkler) {
		water_drop_progress += (0.8 * scalar);
	}
	if (water_gather_progress > 100) {
		water_gather_progress = 0;
		drop(water_storage);
	}
}

function achievement_tick() {
	if (achievement_reality_sprang_a_leak == false && particles.alltime >= 1) {
		achievement_reality_sprang_a_leak = true;
		$("#achievement_reality_sprang_a_leak").html("true");
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

function buy_upgrade(upgrade) {
	switch (upgrade) {
		case "upgrade_steel_toed_boots":
			if (upgrade_steel_toed_boots == false) {
				$("#upgrade_steel_toed_boots").addClass("disabled");
				upgrade_steel_toed_boots = true;

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_ant_farm":
			if (upgrade_ant_farm == false) {
				$("#upgrade_ant_farm").addClass("disabled");
				upgrade_ant_farm = true;
			}
			break;
		
		case "upgrade_catapult":
			if (upgrade_catapult == false) {
				$("#upgrade_catapult").addClass("disabled");
				upgrade_catapult = true;
			}
			break;
			
		case "upgrade_water_storage":
			if (upgrade_water_storage == false) {
				upgrade_water_storage = true;
				$("#upgrade_water_storage").addClass("disabled");

				$("#resource_water").css("display", "flex");
			}
			break;
			
		case "upgrade_rain_barrels":
			if (upgrade_rain_barrels == false) {
				$("#upgrade_rain_barrels").addClass("disabled");
				upgrade_rain_barrels = true;
			}
			break;
			
		case "upgrade_sprinkler":
			if (upgrade_sprinkler == false) {
				$("#upgrade_sprinkler").addClass("disabled");
				upgrade_sprinkler = true;
			}
			break;

		default:
	}
}

// Event handling
function register_events() {
	// Inspector Events
	$("#upgrade_steel_toed_boots").mouseenter(function(){showInspector(iid.steel_toed_boots);});
	$("#upgrade_ant_farm").mouseenter(function(){showInspector(iid.ant_farm);});
	$("#upgrade_catapult").mouseenter(function(){showInspector(iid.catapult);});
	$("#upgrade_water_storage").mouseenter(function(){showInspector(iid.water_storage);});
	$("#upgrade_rain_barrels").mouseenter(function(){showInspector(iid.rain_barrels);});
	$("#upgrade_sprinkler").mouseenter(function(){showInspector(iid.sprinkler);});
}

class inspectorId {
	// Inspector ID's
	none 				= 0x0000;		// 0x0000 Clear inspector
	steel_toed_boots 	= 0xa101;		// 0xa1xx Start upgrade section
	ant_farm			= 0xa102;
	catapult			= 0xa103;
	water_storage		= 0xa104;
	rain_barrels		= 0xa105;
	sprinkler			= 0xa106;
}

var iid = new inspectorId();

function showInspector(id) {
	switch(id) {
		case iid.steel_toed_boots:
			$("#inspector_title").html("Steel-toed Boots");
			$("#inspector_text").html("You can fit a lot more dirt into your storage with a few well-placed stomps");
			$("#inspector_subtext").html("2x Earth density");
			break;
		case iid.ant_farm:
			$("#inspector_title").html("Ant farm");
			$("#inspector_text").html("These little guys can help you move mountains of earth... Very, very slowly");
			$("#inspector_subtext").html("Auto-gather Earth");
			break;
		case iid.catapult:
			$("#inspector_title").html("Catapult");
			$("#inspector_text").html("Flinging dirt into the Chasm is a lot more fun than dumping it in by hand");
			$("#inspector_subtext").html("Auto-drop Earth");
			break;
		case iid.water_storage:
			$("#inspector_title").html("Water storage");
			$("#inspector_text").html("Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first");
			$("#inspector_subtext").html("Unlock Water");
			break;
		case iid.rain_barrels:
			$("#inspector_title").html("Rain barrels");
			$("#inspector_text").html("Your back hurts from carrying so much water. Let the water cycle do some of the work");
			$("#inspector_subtext").html("Auto-gather Water");
			break;
		case iid.sprinkler:
			$("#inspector_title").html("Sprinkler");
			$("#inspector_text").html("Attach a sprinkler system to your water tank to spray directly into the Chasm");
			$("#inspector_subtext").html("Auto-drop Water");
			break;
		case iid.none:
		default:
			$("#inspector_title").html("");
			$("#inspector_text").html("");
			$("#inspector_subtext").html("");
	}
}

// Materialize UI
$(document).ready(function(){
	M.AutoInit();
    $('.tabs-vertical').tabs();
});