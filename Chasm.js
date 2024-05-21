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
	loadSave(null);
	calculateAchievementCount();

	// Loading finished, reveal the game
	$("#game_box").css("display", "block")
}

var last_save_time = Date.now();
var last_singularity_time;
var total_playtime = 0;
var total_sing_time = 0;

// +----------------+
// | Task Callbacks |
// +----------------+

function animation_tick() {
	draw_resources();
	showInspector(current_inspector_id);
	animateResearchMap();
	animateOptions();

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
	if (overheat_timer > 0) {
		$("#mining_rig_percent_label").html("Overheat! " + DisplayNumberFormatter(overheat_timer, 1) + "s");
		$("#incinerator_heat").css("background-color","#f4a316");
	} else {
		$("#mining_rig_percent_label").html(DisplayNumberFormatter(incinerator_heat, 1) + "%");
		$("#incinerator_heat").css("background-color","#fa3c0c");
	}

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
	$("#currency_goo_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_goo].resource.current, 2));
	$("#currency_core_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_core].resource.current, 2));
	$("#currency_bugs_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_bugs].resource.current, 2));

	$("#currency_mass_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_mass].resource.current, 2));
	$("#currency_workers_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_workers].resource.current, 0));
	$("#currency_machinery_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_machinery].resource.current, 0));
	
	$("#currency_singularity_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_singularity].resource.current, 0));
	$("#currency_challenge_1_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_1].resource.current, 0));
	$("#currency_challenge_2_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_2].resource.current, 0));
	$("#currency_challenge_3_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_3].resource.current, 0));
	$("#currency_challenge_4_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_4].resource.current, 0));
	$("#currency_challenge_5_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_5].resource.current, 0));
	$("#currency_challenge_6_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_6].resource.current, 0));
	$("#currency_challenge_7_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_7].resource.current, 0));
	$("#currency_challenge_8_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_8].resource.current, 0));
	$("#currency_challenge_9_amount").html(DisplayNumberFormatter(chasm_currency[cid.currency_challenge_9].resource.current, 0));

	// Update resources
	let earth_element_count = chasm_storage[sid.storage_earth].bitmap.element_count();
	let earth_currency_count = elementValue(earth_element_count);
	loadEarthElements(earth_element_count);
	loadEarthValue(earth_currency_count);

	let water_element_count = chasm_storage[sid.storage_water].bitmap.element_count();
	let water_currency_count = elementValue(water_element_count);
	loadWaterElements(water_element_count);
	loadWaterValue(water_currency_count);
}

var singularity_count = 0;
var pending_singularity = 0;
var base_singularity_cost = 2000;

function animateSingularity() {
	// Singularity cost modifiers
	let modified_singularity_cost = base_singularity_cost;
	if (chasm_upgrades[uid.upgrade_singularity_ascend_1].unlocked) modified_singularity_cost *= 0.75;

	let target = chasm_math_exponential_cost(pending_singularity, modified_singularity_cost, 1.5);
	let progress = (chasm_currency[cid.currency_mass].resource.current / target) * 100;
	if (progress > 100) progress = 100;
	let remaining = target - chasm_currency[cid.currency_mass].resource.current.toNumber();
	if (remaining < 0) remaining = 0;
	$("#singularity_percent_label").html("Singularity in " + DisplayNumberFormatter(remaining, 1));
	$("#singularity_progress").width(progress + "%");

	if (chasm_currency[cid.currency_mass].resource.spend(target)) {
		pending_singularity += 1;
	}

	if (pending_singularity > 0) {
		$("#singularity_jump_amount").html(pending_singularity);
		$("#singularity_jump_info").show();
	} else {
		$("#singularity_jump_info").hide();
	}
}

var incinerator_heat = 0;
var incinerator_multi = 1;
var overheat_timer = 0;
var rig_lvl_multi = 0;
var rig_lvl_decay = 0;
var rig_lvl_sustain = 0;

function game_tick(scalar) {
	// Incinerator
	let incinerator_heat_min = 0;
	if (chasm_upgrades[uid.upgrade_mining_rig_3].unlocked) incinerator_heat_min = 20;
	if (overheat_timer > 0) {
		overheat_timer -= scalar;
	} else {
		incinerator_heat -= RigDecayAmount() * scalar;

		if (incinerator_heat < incinerator_heat_min) incinerator_heat = incinerator_heat_min;
	}
	incinerator_multi = 1 + (RigMultiAmount() * (incinerator_heat / 100));
	
	// Earth Gather
	let gather_amount = 0;
	if (chasm_storage[sid.storage_earth].workers_gather > 0) {
		gather_amount += 20;
		if (chasm_upgrades[uid.upgrade_earth_gather_speed_1].unlocked) gather_amount *= 1.25;
		if (chasm_upgrades[uid.upgrade_earth_gather_speed_2].unlocked) gather_amount *= 1.1;
		if (chasm_upgrades[uid.upgrade_workers_6].unlocked) gather_amount *= 1.1;
		if (chasm_upgrades[uid.upgrade_workers_9].unlocked) gather_amount *= 1.1;
		if (chasm_upgrades[uid.upgrade_singularity_workers_6].unlocked) gather_amount *= 1.1;
		gather_amount *= incinerator_multi;
		gather_amount *= chasm_storage[sid.storage_earth].workers_gather;
		chasm_storage[sid.storage_earth].gather_progress +=  gather_amount * scalar;
	}
	$("#earth_gather_speed_label").html(DisplayNumberFormatter((gather_amount / 100), 2) + " /s");
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
		if (chasm_upgrades[uid.upgrade_earth_drop_speed_2].unlocked) drop_amount *= 1.2;
		if (chasm_upgrades[uid.upgrade_workers_6].unlocked) drop_amount *= 1.1;
		if (chasm_upgrades[uid.upgrade_singularity_workers_6].unlocked) drop_amount *= 1.1;
		drop_amount *= drop_speed[depth];
		drop_amount *= chasm_storage[sid.storage_earth].workers_drop;
		chasm_storage[sid.storage_earth].drop_progress += drop_amount * scalar;
	}
	$("#earth_drop_speed_label").html(DisplayNumberFormatter((drop_amount / 100), 2) + " /s");
	if (chasm_storage[sid.storage_earth].drop_progress > 100) {
		if (earth.current == earth.cap) {
			chasm_storage[sid.storage_earth].drop_progress = 0;
			drop("earth_storage");
		} else {
			chasm_storage[sid.storage_earth].drop_progress = 100;
		}
	}

	// Water Gather
	let water_gather_amount = 0;
	if (chasm_storage[sid.storage_water].workers_gather > 0) {
		water_gather_amount += 10;
		water_gather_amount *= chasm_storage[sid.storage_water].workers_gather;
		chasm_storage[sid.storage_water].gather_progress += water_gather_amount * scalar;
	}
	$("#water_gather_speed_label").html(DisplayNumberFormatter((water_gather_amount / 100), 2) + " /s");
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
	let water_drop_amount = 0;
	let water_drop_speed = [1, 0.75, 0.50, 0.30, 0.15, 0.10, 0.05, 0.02];
	let water_depth = chasm_storage[sid.storage_water].machinery_depth;
	if (chasm_storage[sid.storage_water].workers_drop > 0) {
		water_drop_amount += 10;
		water_drop_amount *= water_drop_speed[water_depth];
		water_drop_amount *= chasm_storage[sid.storage_water].workers_drop;
		chasm_storage[sid.storage_water].drop_progress += water_drop_amount * scalar;
	}
	$("#water_drop_speed_label").html(DisplayNumberFormatter((water_drop_amount / 100), 2) + " /s");
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
	overheat_timer = RigSustainAmount();
}

reset_level_singularity = 1;
reset_level_all = 2;

function singularity_reset() {
	if (pending_singularity > 0) {
		// Gain singularity
		singularity_count++;
		chasm_currency[cid.currency_singularity].resource.gain(pending_singularity);
		pending_singularity = 0;

		// Gain challenge tokens
		if (chasm_upgrades[uid.upgrade_challenge_ecocide].unlocked) chasm_currency[cid.currency_challenge_1].resource.gain(1);

		// Reset Upgrades
		reset_upgrades(reset_level_singularity);

		// Reset Currency
		for (let i = cid.currency_first; i < cid.currency_max; i++) {
			// Set workers to 1
			if (i == cid.currency_workers) {
				chasm_currency[i].resource.set(1);
				let effective_singularity_count = singularity_count;
				if (effective_singularity_count > 5) effective_singularity_count = 5;
				console.log("1: " + effective_singularity_count.toString());
				if (chasm_upgrades[uid.upgrade_singularity_workers_1].unlocked) chasm_currency[i].resource.gain(effective_singularity_count);
				if (chasm_upgrades[uid.upgrade_singularity_workers_2].unlocked) chasm_currency[i].resource.gain(1);
				if (chasm_upgrades[uid.upgrade_singularity_workers_3].unlocked) chasm_currency[i].resource.gain(1);
				if (chasm_upgrades[uid.upgrade_singularity_workers_4].unlocked) chasm_currency[i].resource.gain(1);
				if (chasm_upgrades[uid.upgrade_singularity_workers_5].unlocked) chasm_currency[i].resource.gain(2);
				if (chasm_upgrades[uid.upgrade_singularity_workers_6].unlocked) {
					buy_upgrade(uid.upgrade_workers_1, true);
					buy_upgrade(uid.upgrade_workers_2, true);
					buy_upgrade(uid.upgrade_workers_3, true);
					buy_upgrade(uid.upgrade_workers_4, true);
					buy_upgrade(uid.upgrade_workers_5, true);
					buy_upgrade(uid.upgrade_workers_6, true);
					chasm_currency[i].resource.gain(1);
				}

				if (chasm_upgrades[uid.upgrade_singularity_workers_7].unlocked) {
					effective_singularity_count = singularity_count - 5;
					if (effective_singularity_count < 0) effective_singularity_count = 0;
					if (effective_singularity_count > 10) effective_singularity_count = 10;
					effective_singularity_count = Math.floor(effective_singularity_count / 2);
					chasm_currency[i].resource.gain(effective_singularity_count);
					console.log("2: " + effective_singularity_count.toString());
				}

				if (chasm_upgrades[uid.upgrade_singularity_workers_8].unlocked) {
					effective_singularity_count = singularity_count - 15;
					if (effective_singularity_count < 0) effective_singularity_count = 0;
					if (effective_singularity_count > 20) effective_singularity_count = 20;
					effective_singularity_count = Math.floor(effective_singularity_count / 4);
					chasm_currency[i].resource.gain(effective_singularity_count);
					console.log("3: " + effective_singularity_count.toString());
				}
				continue;
			}

			// Ignore prestige currencies
			if (!(i >= cid.prestige_first && i <= cid.prestige_last)) {
				chasm_currency[i].resource.set(0);
			}
		}

		// Reset Mining Rig
		if (!chasm_upgrades[uid.upgrade_singularity_mining_rig_1].unlocked) rigUpgradeClear();
		
		// Reset Storage and UI
		reset_earth_compression();
		chasm_storage[sid.storage_earth].storage_reset();
		chasm_storage[sid.storage_water].storage_reset();
		last_singularity_time = Date.now();
		refresh_ui();
	}
}

function rigUpgradeClear() {
	rig_lvl_multi = 0;
	rig_lvl_decay = 0;
	rig_lvl_sustain = 0;
}

function rigUpgradeMulti() {
	if (chasm_currency[cid.currency_strands].resource.spend(RigMultiCost())) {
		rig_lvl_multi++;
		RefreshMiningRig();
	}
}

function rigUpgradeDecay() {
	if (chasm_currency[cid.currency_soul].resource.spend(RigDecayCost())) {
		rig_lvl_decay++;
		RefreshMiningRig();
	}
}

function rigUpgradeSustain() {
	if (chasm_currency[cid.currency_particles].resource.spend(RigSustainCost())) {
		rig_lvl_sustain++;
		RefreshMiningRig();
	}
}

function RigMultiCost() {
	return chasm_math_exponential_cost(rig_lvl_multi, 1.5, 3);
}

function RigMultiAmount() {
	return 1 + (rig_lvl_multi * 0.2);
}

function RigDecayCost() {
	return chasm_math_exponential_cost(rig_lvl_decay, 1.2, 3);
}

function RigDecayAmount() {
	let base_decay = 24;
	if (chasm_upgrades[uid.upgrade_singularity_mining_rig_3].unlocked) base_decay *= 0.5;
	return chasm_math_exponential_cost(rig_lvl_decay, base_decay, 0.70);
}

function RigSustainCost() {
	return chasm_math_exponential_cost(rig_lvl_sustain, 10, 5);
}

function RigSustainAmount() {
	let sustain = rig_lvl_sustain * 0.5;
	if (chasm_upgrades[uid.upgrade_workers_11].unlocked) sustain += 1;
	if (chasm_upgrades[uid.upgrade_mining_rig_4].unlocked) sustain *= 3;
	if (chasm_upgrades[uid.upgrade_singularity_mining_rig_2].unlocked) sustain *= 3;
	return sustain;
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

// This is for updating UI on game load, UI reveal animations handled by milestones
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

	if (chasm_milestones[mid.milestone_reveal_currency_goo].unlocked) {
		chasm_currency[cid.currency_goo].hidden = false;
		$("#currency_goo_symbol").css("display", "block");
		$("#currency_goo_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_core].unlocked) {
		chasm_currency[cid.currency_core].hidden = false;
		$("#currency_core_symbol").css("display", "block");
		$("#currency_core_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_bugs].unlocked) {
		chasm_currency[cid.currency_bugs].hidden = false;
		$("#currency_bugs_symbol").css("display", "block");
		$("#currency_bugs_value").css("display", "block");
	}
	
	if (chasm_milestones[mid.milestone_reveal_currency_machinery].unlocked) {
		chasm_currency[cid.currency_machinery].hidden = false;
		$("#currency_machinery_symbol").css("display", "block");
		$("#currency_machinery_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_singularity].unlocked) {
		chasm_currency[cid.currency_singularity].hidden = false;
		$("#currency_singularity_symbol").css("display", "block");
		$("#currency_singularity_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_1].unlocked) {
		chasm_currency[cid.currency_challenge_1].hidden = false;
		$("#currency_challenge_1_symbol").css("display", "block");
		$("#currency_challenge_1_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_2].unlocked) {
		chasm_currency[cid.currency_challenge_2].hidden = false;
		$("#currency_challenge_2_symbol").css("display", "block");
		$("#currency_challenge_2_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_3].unlocked) {
		chasm_currency[cid.currency_challenge_3].hidden = false;
		$("#currency_challenge_3_symbol").css("display", "block");
		$("#currency_challenge_3_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_4].unlocked) {
		chasm_currency[cid.currency_challenge_4].hidden = false;
		$("#currency_challenge_4_symbol").css("display", "block");
		$("#currency_challenge_4_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_5].unlocked) {
		chasm_currency[cid.currency_challenge_5].hidden = false;
		$("#currency_challenge_5_symbol").css("display", "block");
		$("#currency_challenge_5_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_6].unlocked) {
		chasm_currency[cid.currency_challenge_6].hidden = false;
		$("#currency_challenge_6_symbol").css("display", "block");
		$("#currency_challenge_6_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_7].unlocked) {
		chasm_currency[cid.currency_challenge_7].hidden = false;
		$("#currency_challenge_7_symbol").css("display", "block");
		$("#currency_challenge_7_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_8].unlocked) {
		chasm_currency[cid.currency_challenge_8].hidden = false;
		$("#currency_challenge_8_symbol").css("display", "block");
		$("#currency_challenge_8_value").css("display", "block");
	}

	if (chasm_milestones[mid.milestone_reveal_currency_challenge_9].unlocked) {
		chasm_currency[cid.currency_challenge_9].hidden = false;
		$("#currency_challenge_9_symbol").css("display", "block");
		$("#currency_challenge_9_value").css("display", "block");
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

	if (chasm_upgrades[uid.upgrade_mining_rig_2].unlocked) {
		$("#incinerator_upgrades_content").css("visibility", "visible");
	}

	if (chasm_upgrades[uid.upgrade_water_storage].unlocked) {
		$("#water_section").css("display", "block");
		$("#water_upgrades_tab").css("display", "block");
	}

	if (chasm_upgrades[uid.upgrade_water_bait_1].unlocked) {
		$("#bait_box").css("background-color", "#cfd8dc");
		$("#bait_box_content").css("visibility", "visible");
	}
	
	if (chasm_upgrades[uid.upgrade_water_survey_1].unlocked) {
		$("#water_survey").css("background-color", "#cfd8dc");
		$("#water_survey_content").css("visibility", "visible");
	}
	
	if (chasm_upgrades[uid.upgrade_water_depth_1].unlocked) {
		$("#water_depth").css("background-color", "#cfd8dc");
		$("#water_depth_content").css("visibility", "visible");
	}

	chasm_storage[sid.storage_earth].refresh_survey();
	RefreshMaxDepth();
	RefreshDepthChart();
	RefreshWaterDepthChart();
	RefreshMiningRig();
}

function RefreshMaxDepth() {
	$("#max_depth_label").html("Max Depth: " + CalculateMaxDepth());
	$("#max_water_depth_label").html("Max Depth: " + CalculateWaterMaxDepth());
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

function RefreshWaterDepthChart() {
	$("#water_depth_chart_0").html("");
	$("#water_depth_chart_1").html("");
	$("#water_depth_chart_2").html("");
	$("#water_depth_chart_3").html("");
	$("#water_depth_chart_4").html("");
	$("#water_depth_chart_5").html("");
	$("#water_depth_chart_6").html("");
	$("#water_depth_chart_7").html("");

	let depth = chasm_storage[sid.storage_water].machinery_depth;
	let out = "<i class = 'material-icons grey-text text-darken-4' style = 'font-size: 14px;'>chevron_left</i>";
	switch (depth) {
		case 0:
			$("#water_depth_chart_0").html(out + "River");
			break;
		case 1:
			$("#water_depth_chart_1").html(out + "Coast");
			break;
		case 2:
			$("#water_depth_chart_2").html(out + "Deep Sea");
			break;
		case 3:
			$("#water_depth_chart_3").html(out + "Arctic");
			break;
		case 4:
			$("#water_depth_chart_4").html(out + "Slime");
			break;
		case 5:
			$("#water_depth_chart_5").html(out + "Oil");
			break;
		case 6:
			$("#water_depth_chart_6").html(out + "Helium");
			break;
		case 7:
			$("#water_depth_chart_7").html(out + "Hell");
			break;
		default:
	}

	let drop_speed = ["100", "75", "50", "30", "15", "10", "5", "2"];
	$("#water_drop_penalty_label").html("Drop Speed: " + drop_speed[depth] + "%");
}

function RefreshMiningRig() {
	$("#mining_rig_multi_cost").html(DisplayNumberFormatter(RigMultiCost(), 1));
	$("#mining_rig_multi_amount").html(DisplayNumberFormatter(RigMultiAmount() + 1, 1));

	$("#mining_rig_decay_cost").html(DisplayNumberFormatter(RigDecayCost(), 1));
	$("#mining_rig_decay_amount").html(DisplayNumberFormatter(RigDecayAmount(), 1));

	$("#mining_rig_sustain_cost").html(DisplayNumberFormatter(RigSustainCost(), 1));
	$("#mining_rig_sustain_amount").html(DisplayNumberFormatter(RigSustainAmount(), 1));
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

function CalculateWaterMaxDepth() {
	let max = 0;
	if (chasm_upgrades[uid.upgrade_water_depth_1].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_2].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_3].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_4].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_5].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_6].unlocked) max++;
	if (chasm_upgrades[uid.upgrade_water_depth_7].unlocked) max++;
	return max;
}

function toFixedFloor(num, precision) {
    let power = Math.pow(10, precision);
    return (Math.floor(num * power) / power).toFixed(precision);
}

function DisplayNumberFormatter(x, fractional) {
    if (BigNumber.isBigNumber(x)) {
        if (x.gte(10000)) {
            return x.toExponential(2).replace('e+', ' e');
        } else if (x.gte(1000)) {
			return toFixedFloor(x, 0);
        } else if (x.gte(100)) {
			if (fractional > 1) return toFixedFloor(x, 1);
            return toFixedFloor(x, fractional);
        } else {
            return toFixedFloor(x, fractional);
        }
    } else {
        if (x >= 10000) {
            return x.toExponential(2).replace('e+', ' e');
        } else if (x >= 1000) {
			return toFixedFloor(x, 0);
        } else if (x >= 100) {
			if (fractional > 1) return toFixedFloor(x, 1);
            return toFixedFloor(x, fractional);
        } else {
            return toFixedFloor(x, fractional);
        }
    }
}

// Materialize UI
$(document).ready(function(){
	M.AutoInit();
    $('.tabs-vertical').tabs();
	var sliders = document.querySelectorAll("input[type=range]");
    M.Range.init(sliders);
});