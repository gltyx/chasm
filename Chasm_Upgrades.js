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

	// Earth upgrades
	upgrade_earth_density_1 		= 0x0000;	// 2x Earth density (4x4)
	upgrade_earth_density_2			= 0x0001;	// 2x Earth density (8x8)
	upgrade_earth_density_3			= 0x0002;	// 2x Earth density (16x16)
	upgrade_earth_density_4			= 0x0003;	// 2x Earth density (32x32)
	upgrade_earth_density_5			= 0x0004;	// 2x Earth density (64x64)
	upgrade_earth_value_1			= 0x0005;	// +100% Earth value
	upgrade_earth_value_2			= 0x0006;	// +50% Earth value / +100% Copper value
	upgrade_earth_value_3			= 0x0007;	// +50% Metals value
	upgrade_earth_value_4			= 0x0008;	// +25% Stone value
	upgrade_earth_value_5			= 0x0009;	// +50% Emerald value
	upgrade_earth_chance_1			= 0x000a;	// +1% Emerald chance
	upgrade_earth_chance_2			= 0x000b;	// +2% Copper chance
	upgrade_earth_gather_speed_1	= 0x000c;	// Gather +25%
	upgrade_earth_drop_speed_1		= 0x000d;	// Drop +20%
	upgrade_earth_metals_1			= 0x000e;	// Unlock surveying
	upgrade_earth_depth_1			= 0x000f;	// Unlock depth
	upgrade_earth_depth_2			= 0x0010;	// Max depth +1
	upgrade_earth_depth_3			= 0x0011;	// Max depth +1
	upgrade_earth_depth_4			= 0x0012;	// Max depth +1
	upgrade_earth_depth_5			= 0x0013;	// Max depth +1
	upgrade_earth_depth_6			= 0x0014;	// Max depth +1
	upgrade_earth_depth_7			= 0x0015;	// Max depth +1
	upgrade_mining_rig_1			= 0x0016;	// Unlock mining rig
	upgrade_mining_rig_2			= 0x0017;	// Unlock mining rig upgrades

	upgrade_water_storage			= 0x0018;	// Unlock water storage

	upgrade_workers_1				= 0x0019;	// +1 Worker
	upgrade_workers_2				= 0x001a;	// +1 Worker
	upgrade_workers_3				= 0x001b;	// +1 Worker
	upgrade_workers_4				= 0x001c;	// +1 Worker
	upgrade_workers_5				= 0x001d;	// +2 Worker
	upgrade_workers_6				= 0x001e;	// +1 Worker / +20% efficiency
	upgrade_workers_7				= 0x001f;	// +2 Worker / +50% survey efficiency
	upgrade_workers_8				= 0x0020;	// +1 Worker / +20% jewel value
	upgrade_workers_9				= 0x0021;	// +1 Worker / +20% metal value

	// Singularity upgrades
	upgrade_singularity_workers_1	= 0x0022;	// +1 Worker
	upgrade_singularity_workers_2	= 0x0023;	// +1 Worker
	upgrade_singularity_workers_3	= 0x0024;	// +1 Worker
	upgrade_singularity_workers_4	= 0x0025;	// +1 Worker
	upgrade_singularity_workers_5	= 0x0026;	// +2 Worker
	upgrade_singularity_workers_6	= 0x0027;	// Keep worker upgrades on reset

	upgrade_count					= 0x0028;
} var uid = new _UPGRADE_ID();

class _CHASM_UPGRADE {
	name;
	upgrade_image = "images/tile_research_upgrade_unknown.png";
	unlocked = false;
	cost = new currency_value_map([]);
	prerequisites;
	reset_level = reset_level_singularity;

	constructor(name, upgrade_image, cost, reset_level) {
		this.name = name;
		if (upgrade_image !== undefined && upgrade_image != "") {
			this.upgrade_image = upgrade_image;
		}
		this.cost = new currency_value_map(cost);
		this.reset_level = reset_level;
	}

	buy(free) {
		if ((this.affordable() || free) && !this.unlocked) {
			if (!free) {
				for (let i = 0; i < cid.currency_count; i++) {
					chasm_currency[i].resource.spend(this.cost.map[i]);
				}
			}
	
			this.unlock();
			return true;
		}

		return false;
	}

	affordable() {
		if (this.unlocked == false) {
			if (this.prerequisites !== undefined) {
				for (let i = 0; i < this.prerequisites.length; i++) {
					if (!chasm_upgrades[this.prerequisites[i]].unlocked) {
						return false;
					}
				}
			}

			for (let i = 0; i < cid.currency_count; i++) {
				if (chasm_currency[i].resource.current.lt(this.cost.map[i])) {
					return false;
				}
			}

			return true;
		}

		return true;
	}

	unlock() {
		this.unlocked = true;
	}

	lock() {
		this.unlocked = false;
	}

	register_prerequisites(prerequisites) {
		this.prerequisites = prerequisites;
	}
}

var chasm_upgrades = new Array(uid.upgrade_count);

function initUpgrades() {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		switch(i) {
			case uid.upgrade_earth_density_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_1",
					"images/tile_research_earth_density_1.png",
					[
					0.4,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_density_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_2",
					"images/tile_research_earth_density_2.png",
					[
					1,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_density_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_3",
					"images/tile_research_earth_density_3.png",
					[
					2,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_density_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_4",
					"images/tile_research_deprecated.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					7000000,// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_density_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_density_5",
					"images/tile_research_deprecated.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					8000000,// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_1",
					"images/tile_research_earth_value_1.png",
					[
					0.08,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_2",
					"images/tile_research_earth_value_2.png",
					[
					1.2,	// Particles
					0.05,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_3",
					"images/tile_research_upgrade_unknown.png",
					[
					16,		// Particles
					0.5,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_4",
					"images/tile_research_upgrade_unknown.png",
					[
					16,		// Particles
					0.5,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_5",
					"images/tile_research_upgrade_unknown.png",
					[
					55,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_1",
					"images/tile_research_upgrade_unknown.png",
					[
					22,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0.5,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_2",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					4,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_gather_speed_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_gather_speed_1",
					"images/tile_research_earth_gather_speed_1.png",
					[
					0.8,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_drop_speed_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_drop_speed_1",
					"images/tile_research_upgrade_unknown.png",
					[
					1.8,	// Particles
					0.15,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_storage:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_storage",
					"images/tile_research_water_storage.png",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_earth_metals_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_metals_1",
					"images/tile_research_earth_metals_1.png",
					[
					1.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_1",
					"images/tile_research_earth_depth_1.png",
					[
					0,		// Particles
					0.25,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_2",
					"images/tile_research_earth_depth_2.png",
					[
					0,		// Particles
					2.5,	// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_3",
					"images/tile_research_earth_depth_3.png",
					[
					0,		// Particles
					15,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_4",
					"images/tile_research_earth_depth_4.png",
					[
					0,		// Particles
					25,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_5",
					"images/tile_research_earth_depth_5.png",
					[
					0,		// Particles
					35,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_6",
					"images/tile_research_earth_depth_6.png",
					[
					0,		// Particles
					45,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_depth_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_depth_7",
					"images/tile_research_earth_depth_7.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					30,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_mining_rig_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_1",
					"images/tile_research_upgrade_unknown.png",
					[
					1.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_mining_rig_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_2",
					"images/tile_research_upgrade_unknown.png",
					[
					32,		// Particles
					1.5,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_1",
					"images/tile_research_upgrade_workers_1.png",
					[
					0.08,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_2",
					"images/tile_research_upgrade_workers_2.png",
					[
					0.24,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_3",
					"images/tile_research_upgrade_workers_2.png",
					[
					1.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_4",
					"images/tile_research_upgrade_workers_2.png",
					[
					4,		// Particles
					0.1,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
		
			case uid.upgrade_workers_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_5",
					"images/tile_research_upgrade_workers_2.png",
					[
					8.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
		
			case uid.upgrade_workers_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_6",
					"images/tile_research_upgrade_unknown.png",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0.20,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
		
			case uid.upgrade_workers_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_7",
					"images/tile_research_upgrade_unknown.png",
					[
					45,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
	
			case uid.upgrade_workers_8:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_8",
					"images/tile_research_upgrade_unknown.png",
					[
					45,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_workers_9:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_9",
					"images/tile_research_upgrade_unknown.png",
					[
					45,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_singularity_workers_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_1",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					1,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_workers_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_2",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					3,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_workers_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_3",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					5,		// Singularity
					],
					reset_level_all
				);
				break;
		
			case uid.upgrade_singularity_workers_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_4",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					10,		// Singularity
					],
					reset_level_all
				);
				break;
	
			case uid.upgrade_singularity_workers_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_5",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					15,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_workers_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_6",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					30,		// Singularity
					],
					reset_level_all
				);
				break;

			default:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Singularity
					],
					reset_level_singularity
				);
		}
	}

	drawResearchMap();
}

function lock_all_upgrades(reset_level) {
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		if (reset_level >= chasm_upgrades[i].reset_level) {
			chasm_upgrades[i].lock();
		}
	}
}

function buy_upgrade(upgrade_id, free) {
	if (chasm_upgrades[upgrade_id].buy(free)) {
		switch (upgrade_id) {
			case uid.upgrade_earth_density_1:
				compress_earth();
				break;

			case uid.upgrade_earth_density_2:
				compress_earth();
				break;

			case uid.upgrade_earth_density_3:
				compress_earth();
				break;

			case uid.upgrade_earth_density_4:
				compress_earth();
				break;

			case uid.upgrade_earth_density_5:
				compress_earth();
				break;

			case uid.upgrade_earth_chance_1:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_earth_chance_2:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_water_storage:
				$("#water_section").css("display", "block");
				break;

			case uid.upgrade_earth_metals_1:
				$("#earth_survey").css("background-color", "#cfd8dc");
				$("#earth_survey_content").css("visibility", "visible");
				chasm_storage[sid.storage_earth].refresh_survey();
				break;
			
			case uid.upgrade_earth_depth_1:
				$("#earth_depth").css("background-color", "#cfd8dc");
				$("#earth_depth_content").css("visibility", "visible");
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
			
			case uid.upgrade_earth_depth_2:
				RefreshMaxDepth();
				break;
		
			case uid.upgrade_earth_depth_3:
				RefreshMaxDepth();
				break;
	
			case uid.upgrade_earth_depth_4:
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_5:
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_6:
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_7:
				RefreshMaxDepth();
				break;

			case uid.upgrade_mining_rig_1:
				$("#incinerator_box").css("background-color", "#cfd8dc");
				$("#incinerator_box_content").css("visibility", "visible");
				break;

			case uid.upgrade_mining_rig_2:
				$("#incinerator_upgrades_content").css("visibility", "visible");
				break;

			case uid.upgrade_workers_1:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_2:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_3:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_4:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_5:
				chasm_currency[cid.currency_workers].resource.gain(2);
				break;

			case uid.upgrade_workers_6:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_7:
				chasm_currency[cid.currency_workers].resource.gain(2);
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_workers_8:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_9:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_1:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_2:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_3:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_4:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_5:
				chasm_currency[cid.currency_workers].resource.gain(2);
				break;

			case uid.upgrade_singularity_workers_6:
				buy_upgrade(uid.upgrade_workers_1, true);
				buy_upgrade(uid.upgrade_workers_2, true);
				buy_upgrade(uid.upgrade_workers_3, true);
				buy_upgrade(uid.upgrade_workers_4, true);
				buy_upgrade(uid.upgrade_workers_5, true);
				buy_upgrade(uid.upgrade_workers_6, true);
				break;
			
			default:
		}
	}
}

function reset_upgrades(reset_level) {
	lock_all_upgrades(reset_level);
	
	if (reset_level >= reset_level_singularity) {
		// upgrade_water_storage
		$("#water_section").css("display", "none");
	
		// upgrade_earth_metals_1
		$("#earth_survey").css("background-color", "transparent");
		$("#earth_survey_content").css("visibility", "hidden");
	
		// upgrade_earth_depth_1
		$("#earth_depth").css("background-color", "transparent");
		$("#earth_depth_content").css("visibility", "hidden");
	
		// upgrade_mining_rig_1
		$("#incinerator_box").css("background-color", "transparent");
		$("#incinerator_box_content").css("visibility", "hidden");
	
		// upgrade_mining_rig_2
		$("#incinerator_upgrades_content").css("visibility", "hidden");
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

// Upgrade menu layout
let upgrade_menu_width 				= 600;
let upgrade_tile_width 				= 40;
let upgrade_menu_cols 				= upgrade_menu_width / upgrade_tile_width;

let upgrade_menu_earth_rows 		= 30;
let upgrade_map_earth_size			= upgrade_menu_cols * upgrade_menu_earth_rows;
let upgrade_map_earth 				= new Array(upgrade_map_earth_size);

let upgrade_menu_water_rows			= 24;
let upgrade_map_water_size			= upgrade_menu_cols * upgrade_menu_water_rows;
let upgrade_map_water 				= new Array(upgrade_map_water_size);

let upgrade_menu_singularity_rows	= 18;
let upgrade_map_singularity_size	= upgrade_menu_cols * upgrade_menu_singularity_rows;
let upgrade_map_singularity 		= new Array(upgrade_map_singularity_size);

let research_bkg_header_earth = "<div class = 'flex' style = 'width: " + upgrade_menu_width + "px; background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(\"./images/research_bkg.png\");'>";
let research_bkg_header_water = "<div class = 'flex' style = 'width: " + upgrade_menu_width + "px; background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(\"./images/research_bkg_water.png\");'>";
let research_bkg_header_singularity = "<div class = 'flex' style = 'width: " + upgrade_menu_width + "px; background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(\"./images/research_bkg_singularity.png\");'>";
let research_bkg_footer = "</div>";

let tile_div_header 	= "<div id = 'research_tile_";
let tile_div_style_core = "' style = 'position: relative; width: " + upgrade_tile_width + "px; height: " + upgrade_tile_width + "px;";
let tile_div_style_node = " cursor: pointer;";
let tile_div_style_footer = "'>";
let tile_div_footer = "</div>";

let image_header = "<img src = '";
let image_style_core = "' class = 'pixelart' style = 'position: absolute; left: 0px; top: 0px; pointer-events: none;";
let image_style_purchased = " filter: hue-rotate(90deg) brightness(1.5);";
let image_style_affordable = " filter: hue-rotate(65deg) brightness(1.9);";
let image_footer = "' width = '" + upgrade_tile_width + "' height = '" + upgrade_tile_width + "' draggable = 'false'></img>";

class Research_Tile {
	tile_id = tid.tile_none;
	header_name = "";
	upgrade_id = uid.upgrade_count;
	upgrade_triggers_1;
	upgrade_triggers_2;

	coordinate;

	constructor(coordinate, header_name) {
		this.coordinate = coordinate;
		this.header_name = header_name;
	}

	assign_tile(tile_id, upgrade_id, upgrade_triggers_1, upgrade_triggers_2) {
		if (this.tile_id == tid.tile_none && this.upgrade_id) {
			this.tile_id = tile_id;
			this.upgrade_id = upgrade_id;
			this.upgrade_triggers_1 = upgrade_triggers_1;
			this.upgrade_triggers_2 = upgrade_triggers_2;

			if (this.tile_id == tid.tile_node) {
				chasm_upgrades[upgrade_id].register_prerequisites(upgrade_triggers_1);
			}

			return true;
		} else {
			throw new Error("Research map generation collision");
		}
	}

	purchase_style(upgrade_array_1, upgrade_array_2) {
		// Node handling
		if (this.tile_id == tid.tile_node) {
			if (chasm_upgrades[this.upgrade_id].unlocked) {
				return image_style_purchased;
			}
		}

		// Check purchase state
		if (upgrade_array_1 !== undefined) {
			for (let i = 0; i < upgrade_array_1.length; i++) {
				if (!chasm_upgrades[upgrade_array_1[i]].unlocked) {
					return "";
				}
			}

			// Optional second upgrade array
			if (upgrade_array_2 !== undefined) {
				for (let i = 0; i < upgrade_array_2.length; i++) {
					if (!chasm_upgrades[upgrade_array_2[i]].unlocked) {
						return "";
					}
				}
			}

			// Prerequisites purchased, output style modifier
			if (this.tile_id == tid.tile_node) {
				if (chasm_upgrades[this.upgrade_id].affordable()) {
					return image_style_affordable;
				} else {
					return "";
				}
			}

			return image_style_purchased;
		}

		if (this.tile_id == tid.tile_node) {
			if (chasm_upgrades[this.upgrade_id].affordable()) {
				return image_style_affordable;
			} else {
				return "";
			}
		}

		return "";
	}

	generate_tile_frame_header() {
		let out = "";
		out += tile_div_header + this.header_name + "_" + this.coordinate + tile_div_style_core;
		if (this.tile_id == tid.tile_node) out += tile_div_style_node;
		out += tile_div_style_footer;
		return out;
	}

	generate_tile_content() {
		let out = "";

		switch (this.tile_id) {
			case tid.tile_connect_ud:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_ur:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_ul:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_lr:
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_ld:
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_rd:
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_ulr:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_uld:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_urd:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_connect_lrd:
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_2) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1, this.upgrade_triggers_2) + image_footer;
				break;

			case tid.tile_connect_ulrd:
				out += image_header + "images/tile_research_connect_up.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_left.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_right.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				out += image_header + "images/tile_research_connect_down.png" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_node:
				out += image_header + chasm_upgrades[this.upgrade_id].upgrade_image + image_style_core + image_footer;
				out += image_header + "images/tile_research_node.png'" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
				break;

			case tid.tile_none:
			default:
		}

		return out;
	}
}

// Research tabs
// 0 = earth
// 1 = water
// 2 = singularity
var research_map_index = 0;
function change_research_tab(index) {
	if (index == 0) {
		$("#research_map_earth").css("display", "block");
	} else {
		$("#research_map_earth").css("display", "none");
	}
	
	if (index == 1) {
		$("#research_map_water").css("display", "block");
	} else {
		$("#research_map_water").css("display", "none");
	}
	
	if (index == 2) {
		$("#research_map_singularity").css("display", "block");
	} else {
		$("#research_map_singularity").css("display", "none");
	}
}

function drawResearchMap() {
	// Earth
	generateResearchMapEarth();
	let out = "";

	// Background image
	out += research_bkg_header_earth;
	
	// Tiles
	for (let i = 0; i < upgrade_map_earth.length; i++) {
		out += upgrade_map_earth[i].generate_tile_frame_header();
		out += upgrade_map_earth[i].generate_tile_content();
		out += tile_div_footer;
	}

	out += research_bkg_footer;
	$("#research_map_earth").html(out);

	// Register mouse events
	for (let i = 0; i < upgrade_map_earth_size; i++) {
		if (upgrade_map_earth[i].tile_id == tid.tile_node) {
			$("#research_tile_earth_" + i).mouseenter(function(){showInspector(upgrade_map_earth[i].upgrade_id + iid.offset_upgrades);});
			$("#research_tile_earth_" + i).click(function(){buy_upgrade(upgrade_map_earth[i].upgrade_id, false);});
		}
	}

	// Water
	generateResearchMapWater();
	out = "";

	// Background image
	out += research_bkg_header_water;
	
	// Tiles
	for (let i = 0; i < upgrade_map_water.length; i++) {
		out += upgrade_map_water[i].generate_tile_frame_header();
		out += upgrade_map_water[i].generate_tile_content();
		out += tile_div_footer;
	}

	out += research_bkg_footer;
	$("#research_map_water").html(out);

	// Register mouse events
	for (let i = 0; i < upgrade_map_water_size; i++) {
		if (upgrade_map_water[i].tile_id == tid.tile_node) {
			$("#research_tile_water_" + i).mouseenter(function(){showInspector(upgrade_map_water[i].upgrade_id + iid.offset_upgrades);});
			$("#research_tile_water_" + i).click(function(){buy_upgrade(upgrade_map_water[i].upgrade_id, false);});
		}
	}

	// Singularity
	generateResearchMapSingularity();
	out = "";

	// Background image
	out += research_bkg_header_singularity;
	
	// Tiles
	for (let i = 0; i < upgrade_map_singularity.length; i++) {
		out += upgrade_map_singularity[i].generate_tile_frame_header();
		out += upgrade_map_singularity[i].generate_tile_content();
		out += tile_div_footer;
	}

	out += research_bkg_footer;
	$("#research_map_singularity").html(out);

	// Register mouse events
	for (let i = 0; i < upgrade_map_singularity_size; i++) {
		if (upgrade_map_singularity[i].tile_id == tid.tile_node) {
			$("#research_tile_singularity_" + i).mouseenter(function(){showInspector(upgrade_map_singularity[i].upgrade_id + iid.offset_upgrades);});
			$("#research_tile_singularity_" + i).click(function(){buy_upgrade(upgrade_map_singularity[i].upgrade_id, false);});
		}
	}
}

function generateResearchMapEarth() {
	for (let i = 0; i < upgrade_map_earth_size; i++) {
		upgrade_map_earth[i] = new Research_Tile(i, "earth");
	}

	// Upgrade Tree

	upgrade_map_earth[mapColRow(1, 2)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_1,																											);
	upgrade_map_earth[mapColRow(1, 3)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_earth_value_1]																		);

	upgrade_map_earth[mapColRow(3, 2)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_density_1,																										);
	upgrade_map_earth[mapColRow(3, 3)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_earth_density_1]																	);

	upgrade_map_earth[mapColRow(2, 3)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_earth_value_1], 		[uid.upgrade_earth_density_1]								);
	upgrade_map_earth[mapColRow(2, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_gather_speed_1,	[uid.upgrade_earth_value_1, uid.upgrade_earth_density_1]										);

	upgrade_map_earth[mapColRow(2, 5)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_gather_speed_1]																);
	upgrade_map_earth[mapColRow(2, 6)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_metals_1,			[uid.upgrade_earth_gather_speed_1] 																);
	
	upgrade_map_earth[mapColRow(1, 7)]		.assign_tile(tid.tile_connect_rd, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(2, 7)]		.assign_tile(tid.tile_connect_ulr, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(3, 7)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1],		[uid.upgrade_earth_metals_1]								);
	upgrade_map_earth[mapColRow(4, 7)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(5, 7)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(6, 7)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(7, 7)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(1, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_2, 			[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(1, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_2]																		);
	upgrade_map_earth[mapColRow(1, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_3, 			[uid.upgrade_earth_value_2]																		);
	upgrade_map_earth[mapColRow(1, 11)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_3]																		);
	upgrade_map_earth[mapColRow(1, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_2, 		[uid.upgrade_earth_value_3]																		);
	upgrade_map_earth[mapColRow(3, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_1,			[uid.upgrade_earth_metals_1] 																	);
	upgrade_map_earth[mapColRow(3, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_depth_1]																		);
	upgrade_map_earth[mapColRow(3, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_1,			[uid.upgrade_earth_depth_1] 																	);
	upgrade_map_earth[mapColRow(7, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_drop_speed_1,		[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(7, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_drop_speed_1]																);
	upgrade_map_earth[mapColRow(7, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_4,			[uid.upgrade_earth_drop_speed_1]																);
	upgrade_map_earth[mapColRow(3, 11)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_earth_chance_1]																	);
	upgrade_map_earth[mapColRow(4, 11)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_earth_chance_1],		[uid.upgrade_mining_rig_2]									);
	upgrade_map_earth[mapColRow(5, 11)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_mining_rig_2]																		);
	upgrade_map_earth[mapColRow(4, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_2,			[uid.upgrade_earth_chance_1, uid.upgrade_mining_rig_2] 											);
	
	upgrade_map_earth[mapColRow(5, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_1,																 											);
	upgrade_map_earth[mapColRow(5, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_mining_rig_1]																		);
	upgrade_map_earth[mapColRow(5, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_2,			[uid.upgrade_mining_rig_1] 																		);

	upgrade_map_earth[mapColRow(7, 11)]		.assign_tile(tid.tile_connect_urd, 	uid.upgrade_count,					[uid.upgrade_earth_value_4]																		);
	upgrade_map_earth[mapColRow(8, 11)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_earth_value_4]																		);
	upgrade_map_earth[mapColRow(9, 11)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_value_4]																		);
	upgrade_map_earth[mapColRow(7, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_5,			[uid.upgrade_earth_value_4]						 												);
	upgrade_map_earth[mapColRow(4, 14)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_density_2,															 											);
	upgrade_map_earth[mapColRow(7, 14)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_3,															 												);
	
	// Intro Workers Zone
	upgrade_map_earth[mapColRow(10, 2)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_1,																												);
	upgrade_map_earth[mapColRow(7, 3)]		.assign_tile(tid.tile_connect_rd, 	uid.upgrade_count,					[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(8, 3)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(9, 3)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_1],			[uid.upgrade_workers_1]										);
	upgrade_map_earth[mapColRow(10, 3)]		.assign_tile(tid.tile_connect_ulr, 	uid.upgrade_count,					[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(11, 3)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_1],			[uid.upgrade_workers_1]										);
	upgrade_map_earth[mapColRow(12, 3)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(13, 3)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(7, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_2,				[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(9, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_3,				[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(11, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_4,				[uid.upgrade_workers_1]																			);
	upgrade_map_earth[mapColRow(13, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_5,				[uid.upgrade_workers_1]																			);
	
	upgrade_map_earth[mapColRow(7, 5)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_2]																			);
	upgrade_map_earth[mapColRow(8, 5)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_2], 			[uid.upgrade_workers_3]										);
	upgrade_map_earth[mapColRow(9, 5)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_workers_3]																			);
	upgrade_map_earth[mapColRow(11, 5)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_4]																			);
	upgrade_map_earth[mapColRow(12, 5)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_4], 			[uid.upgrade_workers_5]										);
	upgrade_map_earth[mapColRow(13, 5)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_workers_5]																			);
	upgrade_map_earth[mapColRow(8, 6)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_2, uid.upgrade_workers_3]													);
	upgrade_map_earth[mapColRow(9, 6)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_workers_2, uid.upgrade_workers_3]													);
	upgrade_map_earth[mapColRow(10, 6)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_2, uid.upgrade_workers_3], [uid.upgrade_workers_4, uid.upgrade_workers_5]	);
	upgrade_map_earth[mapColRow(11, 6)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_workers_4, uid.upgrade_workers_5]													);
	upgrade_map_earth[mapColRow(12, 6)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_workers_4, uid.upgrade_workers_5]													);
	upgrade_map_earth[mapColRow(10, 7)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_6,				[uid.upgrade_workers_2, uid.upgrade_workers_3, uid.upgrade_workers_4, uid.upgrade_workers_5]	);

	upgrade_map_earth[mapColRow(10, 8)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(11, 8)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 8)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_workers_6],			[uid.upgrade_workers_6]										);
	upgrade_map_earth[mapColRow(13, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_7,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 10)]	.assign_tile(tid.tile_connect_urd, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(13, 10)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_8,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 11)]	.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 12)]	.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(13, 12)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_9,				[uid.upgrade_workers_6]																			);

	// Testing row
	var test_row = 19;
	var test_upgrades = [uid.upgrade_earth_density_3, uid.upgrade_earth_depth_4, uid.upgrade_earth_depth_5, uid.upgrade_earth_depth_6, uid.upgrade_earth_density_4, uid.upgrade_earth_density_5];
	for (let i = 0, col = 1, row = test_row; i < test_upgrades.length; i++) {
		upgrade_map_earth[mapColRow(col, row)].assign_tile(tid.tile_node, test_upgrades[i]);
		col += 2;
		if (col > upgrade_menu_cols - 1) {
			col = 1;
			row += 2;
		}
	}
}

function generateResearchMapWater() {
	for (let i = 0; i < upgrade_map_water_size; i++) {
		upgrade_map_water[i] = new Research_Tile(i, "water");
	}

	// Upgrade Tree

	// Testing row
	var test_row = 6;
	var test_upgrades = [uid.upgrade_water_storage];
	for (let i = 0, col = 1, row = test_row; i < test_upgrades.length; i++) {
		upgrade_map_water[mapColRow(col, row)].assign_tile(tid.tile_node, test_upgrades[i]);
		col += 2;
		if (col > upgrade_menu_cols - 1) {
			col = 1;
			row += 2;
		}
	}
}

function generateResearchMapSingularity() {
	for (let i = 0; i < upgrade_map_singularity_size; i++) {
		upgrade_map_singularity[i] = new Research_Tile(i, "singularity");
	}

	// Upgrade Tree
	upgrade_map_singularity[mapColRow(1, 2)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_7,																									);

	// Testing row
	var test_row = 6;
	var test_upgrades = [uid.upgrade_singularity_workers_1, uid.upgrade_singularity_workers_2, uid.upgrade_singularity_workers_3, uid.upgrade_singularity_workers_4, uid.upgrade_singularity_workers_5, uid.upgrade_singularity_workers_6];
	for (let i = 0, col = 1, row = test_row; i < test_upgrades.length; i++) {
		upgrade_map_singularity[mapColRow(col, row)].assign_tile(tid.tile_node, test_upgrades[i]);
		col += 2;
		if (col > upgrade_menu_cols - 1) {
			col = 1;
			row += 2;
		}
	}
}

function mapColRow(col, row) {
	return ((upgrade_menu_cols * row) + col);
}

function animateResearchMap() {
	for (let i = 0; i < upgrade_map_earth_size; i++) {
		if (upgrade_map_earth[i].tile_id != tid.tile_none) {
			let dom_target = "#research_tile_earth_" + i;
			$(dom_target).html(upgrade_map_earth[i].generate_tile_content());
		}
	}

	for (let i = 0; i < upgrade_map_water_size; i++) {
		if (upgrade_map_water[i].tile_id != tid.tile_none) {
			let dom_target = "#research_tile_water_" + i;
			$(dom_target).html(upgrade_map_water[i].generate_tile_content());
		}
	}

	for (let i = 0; i < upgrade_map_singularity_size; i++) {
		if (upgrade_map_singularity[i].tile_id != tid.tile_none) {
			let dom_target = "#research_tile_singularity_" + i;
			$(dom_target).html(upgrade_map_singularity[i].generate_tile_content());
		}
	}
}