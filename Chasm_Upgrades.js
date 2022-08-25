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
	upgrade_first		= 0x0000;

	// Upgrade list
	steel_toed_boots 	= 0x0000;
	ant_farm			= 0x0001;
	catapult			= 0x0002;
	water_storage		= 0x0003;
	rain_barrels		= 0x0004;
	sprinkler			= 0x0005;

	upgrade_count		= 0x0006;
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

		let cost_prewrapper 	= "<p>";
		let cost_postwrapper 	= "</p>";
		
		let symbol_particle 	= "<i class = 'material-icons purple-text text-lighten-3 currency_icon'>blur_circular</i>";
		let symbol_strands 		= "<i class = 'material-icons amber-text text-lighten-1 currency_icon'>gesture</i>";
		let symbol_spirit 		= "<i class = 'material-icons green-text text-lighten-2 currency_icon'>flare</i>";
		let symbol_soul	 		= "<i class = 'material-icons red-text text-lighten-2 currency_icon'>whatshot</i>";

		if (this.particles > 0) {
			out += cost_prewrapper + this.particles + cost_postwrapper + symbol_particle;
		}

		if (this.strands > 0) {
			out += cost_prewrapper + this.strands + cost_postwrapper + symbol_strands;
		}

		if (this.spirit > 0) {
			out += cost_prewrapper + this.spirit + cost_postwrapper + symbol_spirit;
		}

		if (this.soul > 0) {
			out += cost_prewrapper + this.soul + cost_postwrapper + symbol_soul;
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
			
			particles.current.minus(this.cost.particles);
			strands.current.minus(this.cost.strands);
			soul.current.minus(this.cost.soul);
			spirit.current.minus(this.cost.spirit);

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
			case uid.steel_toed_boots:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					1,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.ant_farm:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					5,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.catapult:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					8,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.water_storage:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.rain_barrels:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				);
				break;

			case uid.sprinkler:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					200,	// Particles
					1,		// Strands
					1,		// Spirit
					1,		// Soul
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
			if (chasm_upgrades[uid.steel_toed_boots].unlocked == false && chasm_upgrades[uid.steel_toed_boots].buy()) {
				chasm_upgrades[uid.steel_toed_boots].unlock();
				$("#upgrade_steel_toed_boots").addClass("disabled");

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_ant_farm":
			if (chasm_upgrades[uid.ant_farm].unlocked == false && chasm_upgrades[uid.ant_farm].buy()) {
				chasm_upgrades[uid.ant_farm].unlock();
				$("#upgrade_ant_farm").addClass("disabled");
			}
			break;
		
		case "upgrade_catapult":
			if (chasm_upgrades[uid.catapult].unlocked == false && chasm_upgrades[uid.catapult].buy()) {
				chasm_upgrades[uid.catapult].unlock();
				$("#upgrade_catapult").addClass("disabled");
			}
			break;
			
		case "upgrade_water_storage":
			if (chasm_upgrades[uid.water_storage].unlocked == false && chasm_upgrades[uid.water_storage].buy()) {
				chasm_upgrades[uid.water_storage].unlock();
				$("#upgrade_water_storage").addClass("disabled");

				$("#resource_water").css("display", "flex");
			}
			break;
			
		case "upgrade_rain_barrels":
			if (chasm_upgrades[uid.rain_barrels].unlocked == false && chasm_upgrades[uid.rain_barrels].buy()) {
				chasm_upgrades[uid.rain_barrels].unlock();
				$("#upgrade_rain_barrels").addClass("disabled");
			}
			break;
			
		case "upgrade_sprinkler":
			if (chasm_upgrades[uid.sprinkler].unlocked == false && chasm_upgrades[uid.sprinkler].buy()) {
				chasm_upgrades[uid.sprinkler].unlock();
				$("#upgrade_sprinkler").addClass("disabled");
			}
			break;

		default:
	}
}