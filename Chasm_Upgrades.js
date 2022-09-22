// Chasm Upgrades
	// The Upgrade shop contains upgrades which the player can purchase.
	// To add a new Upgrade, do the following:
	//
	// 1. Add upgrade to uid table							[_UPGRADE_ID]
	// 2. Add upgrade cost to init function					[initUpgrades]
	// 3. Add upgrade purchase handling to buy function 	[buy_upgrade]
	// 4. (optional) Add upgrade handling to game task		[game_tick]
	// 5. (todo) Add upgrade unlocked state to save module	[]


class _UPGRADE_ID {
	upgrade_first				= 0x0000;

	// Upgrade list
	upgrade_steel_toed_boots 	= 0x0000;
	upgrade_ant_farm			= 0x0001;
	upgrade_catapult			= 0x0002;
	upgrade_water_storage		= 0x0003;
	upgrade_rain_barrels		= 0x0004;
	upgrade_sprinkler			= 0x0005;
	upgrade_prospectors_tools	= 0x0006;

	upgrade_count				= 0x0007;
} var uid = new _UPGRADE_ID();

class cost_map {
	particles = 0;
	strands = 0;
	spirit = 0;
	soul = 0;

	constructor(particles, strands, spirit, soul) {
		this.particles = particles;
		this.strands = strands;
		this.spirit = spirit;
		this.soul = soul;
	}

	stringify() {
		let out = "";

		let cost_prewrapper 				= "<p style = 'margin-left: 6px;'>";
		let cost_postwrapper 				= "</p>";

		let cost_unaffordable_prewrapper 	= "<span style = 'color: red;'>";
		let cost_unaffordable_postwrapper 	= "<span style = 'color: red;'>";

		if (this.particles > 0) {
			out 												+= cost_prewrapper;
			if (particles.current.lt(this.particles)) out 		+= cost_unaffordable_prewrapper;
			out 												+= this.particles;
			if (particles.current.lt(this.particles)) out 		+= cost_unaffordable_postwrapper;
			out 												+= cost_postwrapper + inspector_symbol_particles;
		}

		if (this.strands > 0) {
			out 												+= cost_prewrapper;
			if (strands.current.lt(this.strands)) out 			+= cost_unaffordable_prewrapper;
			out 												+= this.strands;
			if (strands.current.lt(this.strands)) out 			+= cost_unaffordable_postwrapper;
			out 												+= cost_postwrapper + inspector_symbol_strands;
		}

		if (this.spirit > 0) {
			out 												+= cost_prewrapper;
			if (spirit.current.lt(this.spirit)) out 			+= cost_unaffordable_prewrapper;
			out 												+= this.spirit;
			if (spirit.current.lt(this.spirit)) out 			+= cost_unaffordable_postwrapper;
			out 												+= cost_postwrapper + inspector_symbol_spirit;
		}

		if (this.soul > 0) {
			out 												+= cost_prewrapper;
			if (soul.current.lt(this.soul)) out 				+= cost_unaffordable_prewrapper;
			out 												+= this.soul;
			if (soul.current.lt(this.soul)) out 				+= cost_unaffordable_postwrapper;
			out 												+= cost_postwrapper + inspector_symbol_soul;
		}

		return out;
	}
}

class _CHASM_UPGRADE {
	unlocked = false;
	cost = new cost_map(0, 0, 0, 0);

	constructor(aparticles, strands, spirit, soul) {
		this.cost = new cost_map(aparticles, strands, spirit, soul);
	}

	buy() {
		if (particles.current.gte(this.cost.particles) &&
			strands.current.gte(this.cost.strands) &&
			soul.current.gte(this.cost.soul) &&
			spirit.current.gte(this.cost.spirit)) {
			
			particles.spend(this.cost.particles);
			strands.spend(this.cost.strands);
			soul.spend(this.cost.soul);
			spirit.spend(this.cost.spirit);

			return true;
		} else {
			return false;
		}
			
	}

	unlock() {
		this.unlocked = true;
	}

	lock() {
		this.unlocked = false;
	}
}

var chasm_upgrades = new Array(uid.upgrade_count);

function initUpgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		switch(i) {
			case uid.upgrade_steel_toed_boots:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					0.4,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.upgrade_ant_farm:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					0.8,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.upgrade_catapult:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					1.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.upgrade_water_storage:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.upgrade_rain_barrels:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.upgrade_sprinkler:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					1,		// Particles
					1,		// Strands
					1,		// Spirit
					1,		// Soul
				);
				break;
			
			case uid.upgrade_prospectors_tools:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			default:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
		}
	}
}

function lock_all_upgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		chasm_upgrades[i].lock();
	}
}

function buy_upgrade(upgrade) {
	switch (upgrade) {
		case "upgrade_steel_toed_boots":
			if (chasm_upgrades[uid.upgrade_steel_toed_boots].unlocked == false && chasm_upgrades[uid.upgrade_steel_toed_boots].buy()) {
				chasm_upgrades[uid.upgrade_steel_toed_boots].unlock();
				$("#upgrade_steel_toed_boots").addClass("disabled");

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_ant_farm":
			if (chasm_upgrades[uid.upgrade_ant_farm].unlocked == false && chasm_upgrades[uid.upgrade_ant_farm].buy()) {
				chasm_upgrades[uid.upgrade_ant_farm].unlock();
				$("#upgrade_ant_farm").addClass("disabled");
			}
			break;
		
		case "upgrade_catapult":
			if (chasm_upgrades[uid.upgrade_catapult].unlocked == false && chasm_upgrades[uid.upgrade_catapult].buy()) {
				chasm_upgrades[uid.upgrade_catapult].unlock();
				$("#upgrade_catapult").addClass("disabled");
			}
			break;
			
		case "upgrade_water_storage":
			if (chasm_upgrades[uid.upgrade_water_storage].unlocked == false && chasm_upgrades[uid.upgrade_water_storage].buy()) {
				chasm_upgrades[uid.upgrade_water_storage].unlock();
				$("#upgrade_water_storage").addClass("disabled");

				$("#water_box").css("display", "block");
			}
			break;
			
		case "upgrade_rain_barrels":
			if (chasm_upgrades[uid.upgrade_rain_barrels].unlocked == false && chasm_upgrades[uid.upgrade_rain_barrels].buy()) {
				chasm_upgrades[uid.upgrade_rain_barrels].unlock();
				$("#upgrade_rain_barrels").addClass("disabled");
			}
			break;
			
		case "upgrade_sprinkler":
			if (chasm_upgrades[uid.upgrade_sprinkler].unlocked == false && chasm_upgrades[uid.upgrade_sprinkler].buy()) {
				chasm_upgrades[uid.upgrade_sprinkler].unlock();
				$("#upgrade_sprinkler").addClass("disabled");
			}
			break;

		case "upgrade_prospectors_tools":
			if (chasm_upgrades[uid.upgrade_prospectors_tools].unlocked == false && chasm_upgrades[uid.upgrade_prospectors_tools].buy()) {
				chasm_upgrades[uid.upgrade_prospectors_tools].unlock();
				$("#upgrade_prospectors_tools").addClass("disabled");
			}
			break;

		default:
	}
}