

// Achievements
var achievement_babys_first_block = false;
var achievement_reality_sprang_a_leak = false;

function achievement_tick() {
	if (achievement_reality_sprang_a_leak == false && particles.alltime >= 1) {
		achievement_reality_sprang_a_leak = true;
		$("#achievement_reality_sprang_a_leak").html("true");
	}
}