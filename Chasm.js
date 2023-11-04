// Todo:
// Look into resource sinks. Gacha style storage to recycle high-volume resources for high-rarity resources?

// +---------------------+
// | Game Initialization |
// +---------------------+

function game_init() {
	// Page Initialization
	$("#lib_chasm_version").html(lib_chasm_version());

	// Log Initialization
	chasm_log = new lib_chasm_log("log_box", 45, 0);
	chasm_log.writeColor("You stand in front of a massive, seemingly bottomless Chasm in the middle of nowhere. Some wretched urge inside you insists that you fill it up.", log_color_story);

	// Storage Initialization
	initStorage();
	initStorageDisplay();

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
	chasm_timing_add_task_to_scheduler(game_tick, 			80, 	0);
	chasm_timing_add_task_to_scheduler(achievement_tick, 	200, 	chasm_task_flag_disable_multitick);
	chasm_timing_add_task_to_scheduler(autoSave, 			30000, 	chasm_task_flag_disable_multitick);
	chasm_timing_init(animation_tick);
	
	// Register Events
	registerInspectorEvents();

	// Load Saved Game
	loadSave();

	// Loading finished, reveal the game
	$("#game_box").css("display", "block")
}

// +----------------+
// | Task Callbacks |
// +----------------+

function animation_tick() {
	draw_resources();
	showInspector(current_inspector_id);
	animateResearchMap();

	// Singularity
	animateSingularity();

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

	$("#earth_gather_progress").width(chasm_storage[sid.storage_earth].gather_progress + "%");
	$("#earth_drop_progress").width(chasm_storage[sid.storage_earth].drop_progress + "%");

	$("#incinerator_heat").width(incinerator_heat + "%");
	$("#mining_rig_speed_label").html("Gather speed: " + DisplayNumberFormatter(incinerator_multi, 2) + "x");
	$("#mining_rig_percent_label").html(DisplayNumberFormatter(incinerator_heat, 1) + "%");

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

	$("#water_gather_progress").width(chasm_storage[sid.storage_water].gather_progress + "%");
	$("#water_drop_progress").width(chasm_storage[sid.storage_water].drop_progress + "%");
}

function draw_resources() {
	// Update currency
	$("#currency_particles_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_particles].resource.current, 2));
	$("#currency_strands_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_strands].resource.current, 2));
	$("#currency_spirit_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_spirit].resource.current, 2));
	$("#currency_soul_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_soul].resource.current, 2));
	$("#currency_capital_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_capital].resource.current, 2));

	$("#currency_mass_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_mass].resource.current, 2));
	$("#currency_workers_amount").html(chasm_currency[cid.currency_workers].resource.current.toFixed(0));
	$("#currency_machinery_amount").html(chasm_currency[cid.currency_machinery].resource.current.toFixed(0));
	
	$("#currency_singularity_amount").html(chasm_currency[cid.currency_singularity].resource.current.toFixed(0));

	// Update resources
	let earth_element_count = chasm_storage[sid.storage_earth].bitmap.element_count();
	let earth_currency_count = elementValue(earth_element_count);
	$("#element_earth_amount").html();
	loadEarthElements(earth_element_count);
	loadEarthValue(earth_currency_count);

	let water_element_count = chasm_storage[sid.storage_water].bitmap.element_count();
	let water_currency_count = elementValue(water_element_count);
	$("#element_water_amount").html(stringifyElements(water_element_count));
	$("#value_water_amount").html("Value: " + stringifyValue(water_currency_count));
}

function animateSingularity() {
	let progress = singularity_progress(chasm_currency[cid.currency_mass].resource.current)
	$("#singularity_percent_label").html("Singularity: " + DisplayNumberFormatter(progress, 1) + "%");
	$("#singularity_progress").width(progress + "%");
}

var incinerator_heat = 0;
var incinerator_multi = 1;

function game_tick(scalar) {
	// Incinerator
	incinerator_multi = 1;
	if (incinerator_heat > 0) {
		heat_decay = 35;
		incinerator_heat -= heat_decay * scalar;

		if (incinerator_heat < 0) incinerator_heat = 0;
	}
	incinerator_multi += 1 * (incinerator_heat / 100)
	
	// Earth Gather
	let gather_amount = 0;
	if (chasm_storage[sid.storage_earth].workers_gather > 0) {
		gather_amount += 20;
		if (chasm_upgrades[uid.upgrade_earth_gather_speed_1].unlocked) gather_amount *= 1.25;
		if (chasm_upgrades[uid.upgrade_workers_6].unlocked) gather_amount *= 1.1;
		if (chasm_upgrades[uid.upgrade_workers_9].unlocked) gather_amount *= 1.1;
		gather_amount *= incinerator_multi;
		gather_amount *= chasm_storage[sid.storage_earth].workers_gather;
		chasm_storage[sid.storage_earth].gather_progress +=  gather_amount * scalar;
	}
	$("#gather_speed_label").html(DisplayNumberFormatter((gather_amount / 100), 2) + " /s");
	if (chasm_storage[sid.storage_earth].gather_progress > 100) {
		if (earth.current == earth.cap) {
			chasm_storage[sid.storage_earth].gather_progress = 100;
		} else {
			let cycles = Math.floor(chasm_storage[sid.storage_earth].gather_progress / 100);
			chasm_storage[sid.storage_earth].gather_progress -= Math.floor(cycles) * 100;
			for (let i = 0; i < cycles; i++) {
				gather(earth);
			}
		}
	}

	// Earth Drop
	let drop_amount = 0;
	let drop_speed = [1, 0.75, 0.50, 0.30, 0.15, 0.10, 0.05, 0.02];
	let depth = chasm_storage[sid.storage_earth].machinery_depth;
	if (chasm_storage[sid.storage_earth].workers_drop > 0) {
		drop_amount += 10;
		if (chasm_upgrades[uid.upgrade_earth_drop_speed_1].unlocked) drop_amount *= 1.2;
		if (chasm_upgrades[uid.upgrade_workers_6].unlocked) drop_amount *= 1.1;
		drop_amount *= drop_speed[depth];
		drop_amount *= chasm_storage[sid.storage_earth].workers_drop;
		chasm_storage[sid.storage_earth].drop_progress += drop_amount * scalar;
	}
	$("#drop_speed_label").html(DisplayNumberFormatter((drop_amount / 100), 2) + " /s");
	if (chasm_storage[sid.storage_earth].drop_progress > 100) {
		if (earth.current == earth.cap) {
			chasm_storage[sid.storage_earth].drop_progress = 0;
			drop("earth_storage");
		} else {
			chasm_storage[sid.storage_earth].drop_progress = 100;
		}
	}

	// Water Gather
	if (chasm_storage[sid.storage_water].workers_gather > 0) {
		chasm_storage[sid.storage_water].gather_progress += chasm_storage[sid.storage_water].workers_gather * 10 * scalar;
	}
	if (chasm_storage[sid.storage_water].gather_progress > 100) {
		if (water.current == water.cap) {
			chasm_storage[sid.storage_water].gather_progress = 100;
		} else {
			let cycles = Math.floor(chasm_storage[sid.storage_water].gather_progress / 100);
			chasm_storage[sid.storage_water].gather_progress -= Math.floor(cycles) * 100;
			for (let i = 0; i < cycles; i++) {
				gather(water);
			}
		}
	}

	// Water Drop
	if (chasm_storage[sid.storage_water].workers_drop > 0) {
		chasm_storage[sid.storage_water].drop_progress += chasm_storage[sid.storage_water].workers_drop * 10 * scalar;
	}
	if (chasm_storage[sid.storage_water].drop_progress > 100) {
		if (water.current == water.cap) {
			chasm_storage[sid.storage_water].drop_progress = 0;
			drop("water_storage");
		} else {
			chasm_storage[sid.storage_water].drop_progress = 100;
		}
	}
}

// +-----------------+
// | Button Handling |
// +-----------------+

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
				currency_gain(elementValue(chasm_storage[sid.storage_earth].bitmap.element_count()));
				chasm_storage[sid.storage_earth].clear();

				if (chasm_achievements[aid.achievement_babys_first_block].unlocked == false) {
					chasm_achievements[aid.achievement_babys_first_block].unlock();
				}
			}
			break;

		case "water_storage":
			if (chasm_storage[sid.storage_water].drop()) {
				currency_gain(elementValue(chasm_storage[sid.storage_water].bitmap.element_count()));
				chasm_storage[sid.storage_water].clear();
			}
			break;
			
		default:
	}
}

function incinerator_stoke() {
	incinerator_heat += 100;
	if (incinerator_heat > 100) {
		incinerator_heat = 100;
	}
}

// +---------------+
// | UI Management |
// +---------------+

// Chasm log
var chasm_log;

// Log colors
const log_color_story 			= "GhostWhite";
const log_color_achievement 	= "LightGreen";
const log_color_unlock 			= "LightPink";
const log_color_cheat 			= "Plum";

// Materialize Colors
const color_disabled 			= "blue-grey lighten-3";
const color_earth 				= "brown lighten-1";
const color_water 				= "blue lighten-2";

// UI Progression
var achievement_tab_hidden 		= true;
var research_tab_hidden 		= true;

// This is for instantly updating UI on game load, UI reveal animations handled by milestones
function refresh_ui() {
	// Achievements
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		if (chasm_achievements[i].unlocked) {
			achievement_tab_hidden = false;
			$("#tab_achievements").css("display", "block")
			break;
		}
	}
	reload_achievements();

	// Research
	if (chasm_milestones[mid.milestone_reveal_research].unlocked) {
		$("#tab_research").css("display", "block")
	}
	drawResearchMap();

	// Currency
	if (chasm_milestones[mid.milestone_reveal_currency_particles].unlocked) {
		chasm_currency[cid.currency_particles].hidden = false;
		$("#currency_particles_symbol").css("display", "block");
		$("#currency_particles_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_strands].unlocked) {
		chasm_currency[cid.currency_strands].hidden = false;
		$("#currency_strands_symbol").css("display", "block");
		$("#currency_strands_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_spirit].unlocked) {
		chasm_currency[cid.currency_spirit].hidden = false;
		$("#currency_spirit_symbol").css("display", "block");
		$("#currency_spirit_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_soul].unlocked) {
		chasm_currency[cid.currency_soul].hidden = false;
		$("#currency_soul_symbol").css("display", "block");
		$("#currency_soul_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_capital].unlocked) {
		chasm_currency[cid.currency_capital].hidden = false;
		$("#currency_capital_symbol").css("display", "block");
		$("#currency_capital_value").css("display", "block");
	}
	if (chasm_milestones[mid.milestone_reveal_currency_machinery].unlocked) {
		chasm_currency[cid.currency_machinery].hidden = false;
		$("#currency_machinery_symbol").css("display", "block");
		$("#currency_machinery_value").css("display", "block");
	}

	// Storage
	for (let i = sid.storage_first; i < sid.storage_count; i++) {
		chasm_storage[i].manage_production_resource(cid.currency_workers, 0, "gather");
		chasm_storage[i].manage_production_resource(cid.currency_workers, 0, "drop");
		chasm_storage[i].manage_production_resource(cid.currency_workers, 0, "survey");
		chasm_storage[i].manage_production_resource(cid.currency_machinery, 0, "depth");
	}
	
	if (chasm_upgrades[uid.upgrade_earth_density_1].unlocked) {
		compress_earth();
	}
	
	if (chasm_upgrades[uid.upgrade_earth_density_2].unlocked) {
		compress_earth();
	}
	
	if (chasm_upgrades[uid.upgrade_earth_density_3].unlocked) {
		compress_earth();
	}
	
	if (chasm_upgrades[uid.upgrade_earth_density_4].unlocked) {
		compress_earth();
	}
	
	if (chasm_upgrades[uid.upgrade_earth_density_5].unlocked) {
		compress_earth();
	}
	
	if (chasm_upgrades[uid.upgrade_earth_metals_1].unlocked) {
		$("#earth_survey").css("background-color", "#cfd8dc");
		$("#earth_survey_content").css("visibility", "visible");
	}
	
	if (chasm_upgrades[uid.upgrade_earth_depth_1].unlocked) {
		$("#earth_depth").css("background-color", "#cfd8dc");
		$("#earth_depth_content").css("visibility", "visible");
	}

	if (chasm_upgrades[uid.upgrade_mining_rig_1].unlocked) {
		$("#incinerator_box").css("background-color", "#cfd8dc");
		$("#incinerator_box_content").css("visibility", "visible");
	}

	if (chasm_upgrades[uid.upgrade_water_storage].unlocked) {
		$("#water_section").css("display", "block");
	}

	chasm_storage[sid.storage_earth].refresh_survey();
	RefreshMaxDepth();
	RefreshDepthChart();
}

function RefreshMaxDepth() {
	$("#max_depth_label").html("Max Depth: " + CalculateMaxDepth());
}

function RefreshDepthChart() {
	$("#depth_chart_0").html("");
	$("#depth_chart_1").html("");
	$("#depth_chart_2").html("");
	$("#depth_chart_3").html("");
	$("#depth_chart_4").html("");
	$("#depth_chart_5").html("");
	$("#depth_chart_6").html("");
	$("#depth_chart_7").html("");

	let depth = chasm_storage[sid.storage_earth].machinery_depth;
	let out = "<i class = 'material-icons grey-text text-darken-4' style = 'font-size: 14px;'>chevron_left</i>";
	switch (depth) {
		case 0:
			$("#depth_chart_0").html(out + "Surface");
			break;
		case 1:
			$("#depth_chart_1").html(out + "Shallow");
			break;
		case 2:
			$("#depth_chart_2").html(out + "Deep");
			break;
		case 3:
			$("#depth_chart_3").html(out + "Megadeep");
			break;
		case 4:
			$("#depth_chart_4").html(out + "Hyperdeep");
			break;
		case 5:
			$("#depth_chart_5").html(out + "Abyssal");
			break;
		case 6:
			$("#depth_chart_6").html(out + "Bedrock");
			break;
		case 7:
			$("#depth_chart_7").html(out + "Hell");
			break;
		default:
	}

	let drop_speed = ["100", "75", "50", "30", "15", "10", "5", "2"];
	$("#drop_penalty_label").html("Drop Speed: " + drop_speed[depth] + "%");
}

function CalculateMaxDepth() {
	let max = 0;
	if (chasm_upgrades[uid.upgrade_earth_depth_1].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_2].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_3].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_4].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_5].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_6].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_earth_depth_7].unlocked) max++;
	return max;
}

function DisplayNumberFormatter(x, fractional) {
	if (BigNumber.isBigNumber(x)) {
		if (x.gte(10000)) {
			return x.toExponential(2).replace('e+', ' e');
		} else {
			return x.toFixed(fractional);
		}
	} else {
		if (x >= 10000) {
			return x.toExponential(2).replace('e+', ' e');
		} else {
			return x.toFixed(fractional);
		}
	}
}

function singularity_progress(current) {
	let target = 200;
	let progress = (current / target) * 100;
	if (progress > 100) progress = 100;
	return progress;
}

// Materialize UI
$(document).ready(function(){
	M.AutoInit();
    $('.tabs-vertical').tabs();
	var sliders = document.querySelectorAll("input[type=range]");
    M.Range.init(sliders);
});