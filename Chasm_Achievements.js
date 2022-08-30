class _ACHIEVEMENT_ID {
	achievement_first					= 0x0000;

	// Element list
	achievement_babys_first_block 		= 0x0000;
	achievement_reality_sprang_a_leak 	= 0x0001;

	achievement_count					= 0x0002;
} var aid = new _ACHIEVEMENT_ID();

var chasm_achievements = new Array(aid.achievement_count);

function achievement_tick() {
	if (chasm_achievements[aid.achievement_reality_sprang_a_leak] != true) {
		if (particles.alltime.gte(1)) {
			chasm_achievements[aid.achievement_reality_sprang_a_leak] = true;
			load_achivements();
		}
	}
}

function load_achivements() {
	if (chasm_achievements[aid.achievement_reality_sprang_a_leak]) {
		$("#achievement_reality_sprang_a_leak").attr("src", "images/a_reality_sprang.png");
	} else {
		$("#achievement_reality_sprang_a_leak").attr("src", "images/a_locked.png");
	}
}