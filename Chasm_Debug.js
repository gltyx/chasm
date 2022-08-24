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

	return "Five finger discount!"
}