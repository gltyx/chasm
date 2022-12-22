// Chasm Upgrades
	// The Upgrade shop contains upgrades which the player can purchase.
	// To add a new Upgrade, do the following:
	//
	// 1. Add upgrade to uid table							[_UPGRADE_ID]
	// 2. Add upgrade cost to init function					[initUpgrades]
	// 3. (optional) Add purchase-time functionality		[buy_upgrade]
	// 4. Add upgrade to research map						[generateResearchMap]
	// 5. (optional) Add upgrade handling to game task		[game_tick]

class _UPGRADE_ID {
	upgrade_first					= 0x0000;

	// Upgrade list
	upgrade_earth_density_1 		= 0x0000;	// 2x Earth density (4x4)
	upgrade_earth_density_2			= 0x0001;	// 2x Earth density (8x8)
	upgrade_earth_density_3			= 0x0002;	// 2x Earth density (16x16)
	upgrade_earth_density_4			= 0x0003;	// 2x Earth density (32x32)
	upgrade_earth_density_5			= 0x0004;	// 2x Earth density (64x64)
	upgrade_earth_value_1			= 0x0005;	// Value +0.01
	upgrade_earth_metals_1			= 0x0006;	// Gather copper

	upgrade_water_storage			= 0x0007;	// Unlock water storage

	upgrade_workers_1				= 0x0008;	// +1 Worker

	upgrade_count					= 0x0009;
} var uid = new _UPGRADE_ID();

class _CHASM_UPGRADE {
	name;
	unlocked = false;
	cost = new currency_value_map([]);

	constructor(name, cost) {
		this.name = name;
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

function initUpgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		switch(i) {
			case uid.upgrade_earth_density_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_1",
					[
					0.4,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_earth_density_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_2",
					[
					1,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_earth_density_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_3",
					[
					2,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_earth_density_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_4",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_earth_density_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_5",
					[
					4,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_earth_value_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_1",
					[
					0.08,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			case uid.upgrade_water_storage:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_storage",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;
			
			case uid.upgrade_earth_metals_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_metals_1",
					[
					100,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;
			
			case uid.upgrade_workers_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_1",
					[
					0.08,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
				]);
				break;

			default:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"",
					[
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
			case uid.upgrade_earth_density_1:
				chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
				chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
				earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
				chasm_storage[sid.storage_earth].clear();
				break;

			case uid.upgrade_earth_density_2:
				chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
				chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
				earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
				chasm_storage[sid.storage_earth].clear();
				break;

			case uid.upgrade_earth_density_3:
				chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
				chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
				earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
				chasm_storage[sid.storage_earth].clear();
				break;

			case uid.upgrade_earth_density_4:
				chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
				chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
				earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
				chasm_storage[sid.storage_earth].clear();
				break;

			case uid.upgrade_earth_density_5:
				chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
				chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
				earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
				chasm_storage[sid.storage_earth].clear();
				break;

			case uid.upgrade_water_storage:
				$("#water_box").css("display", "block");
				break;

			case uid.upgrade_earth_metals_1:
				break;

			case uid.upgrade_workers_1:
				$("#water_drop_menu").fadeIn(400);
				chasm_currency[cid.currency_workers].resource.gain(1);
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

	// Earth Starting Tree
	out[mapColRow(2, 2)].assign_tile(tid.tile_node, uid.upgrade_earth_value_1);
	out[mapColRow(4, 2)].assign_tile(tid.tile_node, uid.upgrade_earth_density_1);
	out[mapColRow(2, 3)].assign_tile(tid.tile_connect_ur, uid.upgrade_count);
	out[mapColRow(3, 3)].assign_tile(tid.tile_connect_lrd, uid.upgrade_count);
	out[mapColRow(4, 3)].assign_tile(tid.tile_connect_ul, uid.upgrade_count);
	out[mapColRow(3, 4)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(4, 5)].assign_tile(tid.tile_connect_lr, uid.upgrade_count);
	out[mapColRow(5, 5)].assign_tile(tid.tile_connect_lrd, uid.upgrade_count);
	out[mapColRow(6, 5)].assign_tile(tid.tile_connect_ul, uid.upgrade_count);
	out[mapColRow(5, 6)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 7)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 8)].assign_tile(tid.tile_node, uid.upgrade_earth_density_2);
	out[mapColRow(5, 9)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 10)].assign_tile(tid.tile_node, uid.upgrade_earth_density_3);
	out[mapColRow(5, 11)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 12)].assign_tile(tid.tile_node, uid.upgrade_earth_density_4);
	out[mapColRow(5, 13)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 14)].assign_tile(tid.tile_node, uid.upgrade_earth_density_5);
	out[mapColRow(5, 15)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(5, 16)].assign_tile(tid.tile_node, uid.upgrade_earth_metals_1);

	// Water Starting Tree
	out[mapColRow(18, 2)].assign_tile(tid.tile_node, uid.upgrade_water_storage);
	out[mapColRow(18, 3)].assign_tile(tid.tile_connect_ud, uid.upgrade_count);
	out[mapColRow(18, 4)].assign_tile(tid.tile_connect_ulr, uid.upgrade_count);

	// Workers Starting Tree
	out[mapColRow(8, 2)].assign_tile(tid.tile_node, uid.upgrade_workers_1);

	return out;
}

function mapColRow(col, row) {
	return ((30 * row) + col);
}