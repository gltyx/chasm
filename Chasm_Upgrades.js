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
	upgrade_first					= 0x0000;

	// Upgrade list
	upgrade_steel_toed_boots 		= 0x0000;	// 2x Earth density (4x4)
	upgrade_tamping_rod				= 0x0001;	// 2x Earth density (8x8)
	upgrade_trash_compactor			= 0x0002;	// 2x Earth density (16x16)
	upgrade_macrosonic_agitator		= 0x0003;	// 2x Earth density (32x32)
	upgrade_gravity_well			= 0x0004;	// 2x Earth density (64x64)

	upgrade_ant_farm				= 0x0005;
	upgrade_catapult				= 0x0006;
	upgrade_water_storage			= 0x0007;
	upgrade_rain_barrels			= 0x0008;
	upgrade_sprinkler				= 0x0009;
	upgrade_prospectors_tools		= 0x000a;

	upgrade_count					= 0x000b;
} var uid = new _UPGRADE_ID();

class _CHASM_UPGRADE {
	unlocked = false;
	cost = new currency_value_map([]);

	constructor(cost) {
		this.cost = new currency_value_map(cost);
	}

	buy() {
		for (let i = 0; i < cid.currency_count; i++) {
			if (chasm_currency[i].resource.current.lt(this.cost.map[i])) {
				return false;
			}
		}

		for (let i = 0; i < cid.currency_count; i++) {
			chasm_currency[i].resource.spend(this.cost.map[i]);
		}

		return true;
	}

	unlock() {
		this.unlocked = true;
	}

	lock() {
		this.unlocked = false;
	}
}

var chasm_upgrades = new Array(uid.upgrade_count);
var research_tab_hidden = true;

function initUpgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		switch(i) {
			case uid.upgrade_steel_toed_boots:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					0.4,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_tamping_rod:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					1,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_trash_compactor:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					2,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_macrosonic_agitator:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_gravity_well:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					4,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_ant_farm:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					0.8,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_catapult:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					1.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_water_storage:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_rain_barrels:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_sprinkler:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					1,		// Particles
					1,		// Strands
					1,		// Spirit
					1,		// Soul
				]);
				break;
			
			case uid.upgrade_prospectors_tools:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			default:
				chasm_upgrades[i] = new _CHASM_UPGRADE([
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
		}
	}

	drawResearchMap();
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

		case "upgrade_tamping_rod":
			if (chasm_upgrades[uid.upgrade_tamping_rod].unlocked == false && chasm_upgrades[uid.upgrade_tamping_rod].buy()) {
				chasm_upgrades[uid.upgrade_tamping_rod].unlock();
				$("#upgrade_tamping_rod").addClass("disabled");

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_trash_compactor":
			if (chasm_upgrades[uid.upgrade_trash_compactor].unlocked == false && chasm_upgrades[uid.upgrade_trash_compactor].buy()) {
				chasm_upgrades[uid.upgrade_trash_compactor].unlock();
				$("#upgrade_trash_compactor").addClass("disabled");

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_macrosonic_agitator":
			if (chasm_upgrades[uid.upgrade_macrosonic_agitator].unlocked == false && chasm_upgrades[uid.upgrade_macrosonic_agitator].buy()) {
				chasm_upgrades[uid.upgrade_macrosonic_agitator].unlock();
				$("#upgrade_macrosonic_agitator").addClass("disabled");

				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));

				earth_storage.clear();
			}
			break;

		case "upgrade_gravity_well":
			if (chasm_upgrades[uid.upgrade_gravity_well].unlocked == false && chasm_upgrades[uid.upgrade_gravity_well].buy()) {
				chasm_upgrades[uid.upgrade_gravity_well].unlock();
				$("#upgrade_gravity_well").addClass("disabled");

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
				
				$("#earth_gather_menu").fadeIn(400);
			}
			break;
		
		case "upgrade_catapult":
			if (chasm_upgrades[uid.upgrade_catapult].unlocked == false && chasm_upgrades[uid.upgrade_catapult].buy()) {
				chasm_upgrades[uid.upgrade_catapult].unlock();
				$("#upgrade_catapult").addClass("disabled");
				
				$("#earth_drop_menu").fadeIn(400);
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
				
				$("#water_gather_menu").fadeIn(400);
			}
			break;
			
		case "upgrade_sprinkler":
			if (chasm_upgrades[uid.upgrade_sprinkler].unlocked == false && chasm_upgrades[uid.upgrade_sprinkler].buy()) {
				chasm_upgrades[uid.upgrade_sprinkler].unlock();
				$("#upgrade_sprinkler").addClass("disabled");
				
				$("#water_drop_menu").fadeIn(400);
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

class _TILE_ID {
	tile_first						= 0x0000;

	// Tile list
	tile_none 						= 0x0000;
	tile_connect_ud 				= 0x0001;	// up down
	tile_connect_ur 				= 0x0002;	// up right
	tile_connect_ul 				= 0x0003;	// up left
	tile_connect_lr 				= 0x0004;	// left right
	tile_connect_ld 				= 0x0005;	// left down
	tile_connect_rd 				= 0x0006;	// right down
	tile_connect_ulr				= 0x0007;	// up left right
	tile_connect_uld				= 0x0008;	// up left down
	tile_connect_urd				= 0x0009;	// up right down
	tile_connect_lrd				= 0x000a;	// left right down
	tile_connect_ulrd				= 0x000b;	// up left right down

	tile_count						= 0x000c;
} var tid = new _TILE_ID();

function drawResearchMap() {
	let map = generateResearchMap();
	let out;

	for (let i = 0; i < map.length; i++) {
		out += "<div class = 'upgrade_tile' style = 'background-color: ";

		switch (map[i]) {
			case tid.tile_connect_ud:
				out += "AliceBlue";
				break;

			case tid.tile_connect_ur:
				out += "AntiqueWhite";
				break;
				
			case tid.tile_connect_ul:
				out += "Aqua";
				break;
				
			case tid.tile_connect_lr:
				out += "Silver";
				break;
				
			case tid.tile_connect_ld:
				out += "Aquamarine";
				break;
				
			case tid.tile_connect_rd:
				out += "Azure";
				break;
				
			case tid.tile_connect_ulr:
				out += "Beige";
				break;
				
			case tid.tile_connect_uld:
				out += "Bisque";
				break;
				
			case tid.tile_connect_urd:
				out += "Black";
				break;
				
			case tid.tile_connect_lrd:
				out += "Blue";
				break;
				
			case tid.tile_connect_ulrd:
				out += "Maroon";
				break;
				
			default:
				out += "Coral";
		}

		out += "'></div>";
	}

	$("#research_map").html(out);
}

function generateResearchMap() {
	let out = [];

	for (let i = tid.tile_first; i < tid.tile_count; i++) {
		out.push(i);
	}

	return out;
}