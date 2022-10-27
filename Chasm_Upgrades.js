// Chasm Upgrades
	// The Upgrade shop contains upgrades which the player can purchase.
	// To add a new Upgrade, do the following:
	//
	// 1. Add upgrade to uid table							[_UPGRADE_ID]
	// 2. Add upgrade cost to init function					[initUpgrades]
	// 3. Add upgrade purchase handling to buy function 	[buy_upgrade]
	// 4. Add upgrade to research map						[generateResearchMap]
	// 5. (optional) Add upgrade handling to game task		[game_tick]
	// 6. (todo) Add upgrade unlocked state to save module	[]

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
		if (this.unlocked == false) {
			for (let i = 0; i < cid.currency_count; i++) {
				if (chasm_currency[i].resource.current.lt(this.cost.map[i])) {
					return false;
				}
			}
	
			for (let i = 0; i < cid.currency_count; i++) {
				chasm_currency[i].resource.spend(this.cost.map[i]);
			}
	
			this.unlock();
			drawResearchMap();
			return true;
		}

		return false;
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

function buy_upgrade(upgrade_id) {
	if (chasm_upgrades[upgrade_id].buy()) {
		switch (upgrade_id) {
			case uid.upgrade_steel_toed_boots:
				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));
				earth_storage.clear();
				break;

			case uid.upgrade_tamping_rod:
				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));
				earth_storage.clear();
				break;

			case uid.upgrade_trash_compactor:
				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));
				earth_storage.clear();
				break;

			case uid.upgrade_macrosonic_agitator:
				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));
				earth_storage.clear();
				break;

			case uid.upgrade_gravity_well:
				earth_storage.brick_h = earth_storage.brick_h / 2;
				earth_storage.brick_w = earth_storage.brick_w / 2;
				earth.setCap((earth_storage.canvas_w * earth_storage.canvas_h) / (earth_storage.brick_w * earth_storage.brick_h));
				earth_storage.clear();
				break;

			case uid.upgrade_ant_farm:
				$("#earth_gather_menu").fadeIn(400);
				break;

			case uid.upgrade_catapult:
				$("#earth_drop_menu").fadeIn(400);
				break;

			case uid.upgrade_water_storage:
				$("#water_box").css("display", "block");
				break;

			case uid.upgrade_rain_barrels:
				$("#water_gather_menu").fadeIn(400);
				break;

			case uid.upgrade_sprinkler:
				$("#water_drop_menu").fadeIn(400);
				break;

			case uid.upgrade_prospectors_tools:
				break;
			
			default:
		}
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
	tile_node						= 0x000c;

	tile_count						= 0x000d;
} var tid = new _TILE_ID();

class Research_Tile {
	tile_id = tid.tile_none;
	upgrade_id = uid.upgrade_count;

	constructor() {
	}

	assign_tile(tile_id, upgrade_id) {
		if (this.tile_id == tid.tile_none && this.upgrade_id) {
			this.tile_id = tile_id;
			this.upgrade_id = upgrade_id;
			return true;
		} else {
			throw new Error("Research map generation collision");
		}
	}
}

function drawResearchMap() {
	let map = generateResearchMap();
	let out;

	let image_header = "<img src = '";
	let image_footer = "' class = 'pixelart' width = '20' height = '20' draggable = 'false'></img>";
	
	// Background image
	out += "<div class = 'flex' style = 'width: 600px; background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(\"./images/research_bkg.png\");'>";
	
	// Tiles
	for (let i = 0; i < map.length; i++) {
		switch (map[i].tile_id) {
			case tid.tile_connect_ud:
				out += image_header + "images/tile_research_connect_ud.png" + image_footer;
				break;

			case tid.tile_connect_ur:
				out += image_header + "images/tile_research_connect_ur.png" + image_footer;
				break;

			case tid.tile_connect_ul:
				out += image_header + "images/tile_research_connect_ul.png" + image_footer;
				break;

			case tid.tile_connect_lr:
				out += image_header + "images/tile_research_connect_lr.png" + image_footer;
				break;

			case tid.tile_connect_ld:
				out += image_header + "images/tile_research_connect_ld.png" + image_footer;
				break;

			case tid.tile_connect_rd:
				out += image_header + "images/tile_research_connect_rd.png" + image_footer;
				break;

			case tid.tile_connect_ulr:
				out += image_header + "images/tile_research_connect_ulr.png" + image_footer;
				break;

			case tid.tile_connect_uld:
				out += image_header + "images/tile_research_connect_uld.png" + image_footer;
				break;

			case tid.tile_connect_urd:
				out += image_header + "images/tile_research_connect_urd.png" + image_footer;
				break;

			case tid.tile_connect_lrd:
				out += image_header + "images/tile_research_connect_lrd.png" + image_footer;
				break;

			case tid.tile_connect_ulrd:
				out += image_header + "images/tile_research_connect_ulrd.png" + image_footer;
				break;

			case tid.tile_node:
				out += image_header + "images/tile_research_node.png' id = 'upgrade_node_" + map[i].upgrade_id + "'";
				if (chasm_upgrades[map[i].upgrade_id].unlocked) {
					out += " style = 'cursor: pointer; filter: hue-rotate(180deg);'";
				} else {
					out += " style = 'cursor: pointer;'";
				}
				out += " onclick = 'buy_upgrade(" + map[i].upgrade_id + ")" + image_footer;
				break;

			case tid.tile_none:
			default:
				out += "<div style = 'width: 20px; height: 20px;'></div>";
		}
	}

	out += "</div>";
	$("#research_map").html(out);

	// Register mouse events
	for (let i = 0; i < uid.upgrade_count; i++) {
		$("#upgrade_node_" + i).mouseenter(function(){showInspector(i + iid.offset_upgrades);});
	}
}

function generateResearchMap() {
	let mapHeight 	= 60;
	let mapSize		= mapHeight * 30;
	let out 		= new Array(30 * mapHeight);

	for (let i = 0; i < mapSize; i++) {
		out[i] = new Research_Tile();
	}

	for (let i = 0; i < tid.tile_count - 1; i++) {
		out[i].assign_tile(i, uid.upgrade_count);
	}

	out[mapRowCol(5, 5)].assign_tile(tid.tile_node, uid.upgrade_steel_toed_boots);
	out[mapRowCol(6, 5)].assign_tile(tid.tile_node, uid.upgrade_tamping_rod);
	out[mapRowCol(7, 5)].assign_tile(tid.tile_node, uid.upgrade_trash_compactor);
	out[mapRowCol(8, 5)].assign_tile(tid.tile_node, uid.upgrade_macrosonic_agitator);
	out[mapRowCol(9, 5)].assign_tile(tid.tile_node, uid.upgrade_gravity_well);
	out[mapRowCol(10, 5)].assign_tile(tid.tile_node, uid.upgrade_ant_farm);
	out[mapRowCol(11, 5)].assign_tile(tid.tile_node, uid.upgrade_catapult);
	out[mapRowCol(5, 8)].assign_tile(tid.tile_node, uid.upgrade_water_storage);
	out[mapRowCol(6, 8)].assign_tile(tid.tile_node, uid.upgrade_rain_barrels);
	out[mapRowCol(7, 8)].assign_tile(tid.tile_node, uid.upgrade_sprinkler);
	out[mapRowCol(8, 8)].assign_tile(tid.tile_node, uid.upgrade_prospectors_tools);

	return out;
}

function mapRowCol(row, col) {
	return ((30 * row) + col);
}