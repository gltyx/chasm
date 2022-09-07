// Chasm Debug
	// Functions for debugging/development of Chasm. Don't use these. Or do; I'm not your dad.

function debug_free_upgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		chasm_upgrades[i].cost = new cost_map(
			0,		// Particles
			0,		// Strands
			0,		// Spirit
			0,		// Soul
		);
	}

	$("#debug_reprice_upgrades").removeClass("disabled");
	$("#debug_free_upgrades").addClass("disabled");
	showInspector(current_inspector_id);
	return "Five finger discount!";
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
	return "It's like un-cheating.";
}

function debug_unlock_upgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		chasm_upgrades[i].unlock;
	}

	return "It's not cheating if you made the game.";
}

function debug_unlock_achievements() {
	$("#debug_unlock_achievements").addClass("disabled");

	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		chasm_achievements[i].unlocked = true;
	}
	
	load_achivements();

	return "A sense of pride and acomplisment washes over you.";
}