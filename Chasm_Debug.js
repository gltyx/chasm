// Chasm Debug
	// Functions for debugging/development of Chasm. Don't use these. Or do; I'm not your dad.

function debug_free_upgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		chasm_upgrades[i].cost = new currency_value_map([
			0,		// Particles
			0,		// Strands
			0,		// Spirit
			0,		// Soul
		]);
	}

	$("#debug_reprice_upgrades").removeClass("disabled");
	$("#debug_free_upgrades").addClass("disabled");
	showInspector(current_inspector_id);

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("Five finger discount!", log_color_cheat);
}

function debug_reprice_upgrades() {
	var upgrades_backup = new Array(uid.upgrade_count);
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		upgrades_backup[i] = chasm_upgrades[i].unlocked;
	}

	initUpgrades();
	
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		console.log("resetting to " + upgrades_backup[i]);
		chasm_upgrades[i].unlocked = upgrades_backup[i];
	}

	$("#debug_free_upgrades").removeClass("disabled");
	$("#debug_reprice_upgrades").addClass("disabled");
	showInspector(current_inspector_id);

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("It's like un-cheating.", log_color_cheat);
}

function debug_unlock_upgrades() {
	if (research_tab_hidden) {
		research_tab_hidden = false;
		$("#tab_research").fadeIn(400);
	}

	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		chasm_upgrades[i].unlock;
	}

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("It's not cheating if you made the game.", log_color_cheat);
}

function debug_unlock_achievements() {
	$("#debug_unlock_achievements").addClass("disabled");

	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		chasm_achievements[i].unlocked = true;
	}
	
	load_achivements();

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("A sense of pride and acomplishment washes over you.", log_color_cheat);
}

function debug_gain_100_each() {
	for (let i = 0; i < cid.currency_count; i++) {
		chasm_currency[i].resource.gain(100);
	}

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("A sense of pride and acomplishment washes over you.", log_color_cheat);
}

function debug_save() {
	storeSave();
}