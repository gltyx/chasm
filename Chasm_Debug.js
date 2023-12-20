// Chasm Debug
	// Functions for debugging/development of Chasm. Don't use these. Or do; I'm not your dad.
	// Change to a game settings page with hidden developer/cheat menus

function animateOptions() {
	if (last_save_time == null) {
		$("#last_save_time").html("n/a");
	} else {
		let time_delta_s = DisplayNumberFormatter((Date.now() - last_save_time) / 1000, 0);
		$("#last_save_time").html(time_delta_s + "s");
	}

	$("#achievement_count").html(achievements_earned + "/" + parseInt(aid.achievement_count, 10));
}

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
	
	reload_achievements();

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("A sense of pride and accomplishment washes over you.", log_color_cheat);
}

function debug_gain() {
	let amount = parseFloat($("#debug_gain_amount").val());

	if (amount == NaN) {
		return;
	}

	switch ($("#debug_gain_type").val()){
		default:
		case "All":
			for (let i = 0; i < cid.currency_count; i++) {
				chasm_currency[i].resource.gain(amount);
			}
			break;

		case "Particles":
			chasm_currency[cid.currency_particles].resource.gain(amount);
			break;

		case "Strands":
			chasm_currency[cid.currency_strands].resource.gain(amount);
			break;

		case "Spirit":
			chasm_currency[cid.currency_spirit].resource.gain(amount);
			break;

		case "Soul":
			chasm_currency[cid.currency_soul].resource.gain(amount);
			break;

		case "Capital":
			chasm_currency[cid.currency_capital].resource.gain(amount);
			break;

		case "Singularity":
			chasm_currency[cid.currency_singularity].resource.gain(amount);
			break;

		case "Mass":
			chasm_currency[cid.currency_mass].resource.gain(amount);
			break;

		case "Workers":
			chasm_currency[cid.currency_workers].resource.gain(amount);
			break;

		case "Machinery":
			chasm_currency[cid.currency_machinery].resource.gain(amount);
			break;
	}

	chasm_log.writeSectionDivider();
	chasm_log.writeColor("A sense of pride and accomplishment washes over you.", log_color_cheat);
}

function debug_save() {
	storeSave();
}

function debug_clear() {
	if (window.confirm("Are you sure you want to start the game over? You will lose everything.")) {
		clearSave();
		window.location.reload();
	}
}