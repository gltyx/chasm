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
	upgrade_first						= 0x0000;

	// Earth upgrades
	upgrade_earth_density_1 			= 0x0000;	// 2x Earth density (4x4)
	upgrade_earth_density_2				= 0x0001;	// 2x Earth density (8x8)
	upgrade_earth_density_3				= 0x0002;	// 2x Earth density (16x16)
	upgrade_earth_density_4				= 0x0003;	// 2x Earth density (32x32)
	upgrade_earth_density_5				= 0x0004;	// 2x Earth density (64x64)
	upgrade_earth_value_1				= 0x0005;	// +100% Dirt value
	upgrade_earth_value_2				= 0x0006;	// +50% Dirt value / +100% Copper value
	upgrade_earth_value_3				= 0x0007;	// +50% Metals value
	upgrade_earth_value_4				= 0x0008;	// +50% Stone value
	upgrade_earth_value_5				= 0x0009;	// +50% Emerald value
	upgrade_earth_value_6				= 0x000a;	// +100% Stone value / + 50% Dirt value
	upgrade_earth_value_7				= 0x000b;	// +300% Iron value
	upgrade_earth_value_8				= 0x000c;	// +200% Coal value
	upgrade_earth_value_9				= 0x000d;	// +100% Dirt value / +100% Copper value
	upgrade_earth_value_10				= 0x000e;	// +300% Metal mass
	upgrade_earth_value_11				= 0x000f;	// +300% Jewel mass
	upgrade_earth_value_12				= 0x0010;	// +50% Coal value
	upgrade_earth_chance_1				= 0x0011;	// +2% Emerald chance
	upgrade_earth_chance_2				= 0x0012;	// +2% Copper chance
	upgrade_earth_chance_3				= 0x0013;	// +0.5% Coal chance
	upgrade_earth_chance_4				= 0x0014;	// +5% Stone Chance
	upgrade_earth_chance_5				= 0x0015;	// +0.1% Diamond Chance
	upgrade_earth_gather_speed_1		= 0x0016;	// Gather +25%
	upgrade_earth_gather_speed_2		= 0x0017;	// Gather +10%
	upgrade_earth_drop_speed_1			= 0x0018;	// Drop +20%
	upgrade_earth_drop_speed_2			= 0x0019;	// Drop +20%
	upgrade_earth_metals_1				= 0x001a;	// Unlock surveying
	upgrade_earth_depth_1				= 0x001b;	// Unlock depth
	upgrade_earth_depth_2				= 0x001c;	// Max depth +1
	upgrade_earth_depth_3				= 0x001d;	// Max depth +1
	upgrade_earth_depth_4				= 0x001e;	// Max depth +1
	upgrade_earth_depth_5				= 0x001f;	// Max depth +1
	upgrade_earth_depth_6				= 0x0020;	// Max depth +1
	upgrade_earth_depth_7				= 0x0021;	// Max depth +1
	upgrade_mining_rig_1				= 0x0022;	// Unlock mining rig
	upgrade_mining_rig_2				= 0x0023;	// Unlock mining rig upgrades
	upgrade_mining_rig_3				= 0x0024;	// Heat never drops below 10%
	upgrade_mining_rig_4				= 0x0025;	// 3x Sustain
	
	upgrade_water_storage				= 0x0026;	// Unlock water storage
	upgrade_water_bait_1				= 0x0027;	// Unlock bait
	upgrade_water_survey_1				= 0x0028;	// Unlock fishing report
	upgrade_water_value_1				= 0x0029;	// +100% Water value
	upgrade_water_value_2				= 0x002a;	//
	upgrade_water_value_3				= 0x002b;	//
	upgrade_water_value_4				= 0x002c;	//
	upgrade_water_value_5				= 0x002d;	//
	upgrade_water_value_6				= 0x002e;	//
	upgrade_water_value_7				= 0x002f;	//
	upgrade_water_value_8				= 0x0030;	//
	upgrade_water_depth_1				= 0x0031;	// Unlock depth
	upgrade_water_depth_2				= 0x0032;	// Max depth +1
	upgrade_water_depth_3				= 0x0033;	// Max depth +1
	upgrade_water_depth_4				= 0x0034;	// Max depth +1
	upgrade_water_depth_5				= 0x0035;	// Max depth +1
	upgrade_water_depth_6				= 0x0036;	// Max depth +1
	upgrade_water_depth_7				= 0x0037;	// Max depth +1
	
	upgrade_workers_1					= 0x0038;	// +1 Worker
	upgrade_workers_2					= 0x0039;	// +1 Worker
	upgrade_workers_3					= 0x003a;	// +1 Worker
	upgrade_workers_4					= 0x003b;	// +1 Worker
	upgrade_workers_5					= 0x003c;	// +2 Worker
	upgrade_workers_6					= 0x003d;	// +1 Worker / +20% efficiency
	upgrade_workers_7					= 0x003e;	// +2 Worker / +50% survey efficiency
	upgrade_workers_8					= 0x003f;	// +1 Worker / +20% jewel value
	upgrade_workers_9					= 0x0040;	// +1 Worker / +20% metal value
	upgrade_workers_10					= 0x0041;	// +1 Worker / +30% copper value
	upgrade_workers_11					= 0x0042;	// +1 Worker / +20% metal value
	upgrade_workers_12					= 0x0043;	// +1 Worker
	
	upgrade_challenge_ecocide			= 0x0044;	// Ecocide Challenge
	
	// Singularity upgrades
	upgrade_singularity_workers_1		= 0x0045;	// +1 Worker per reset
	upgrade_singularity_workers_2		= 0x0046;	// +1 Worker
	upgrade_singularity_workers_3		= 0x0047;	// +1 Worker
	upgrade_singularity_workers_4		= 0x0048;	// +1 Worker
	upgrade_singularity_workers_5		= 0x0049;	// +2 Worker
	upgrade_singularity_workers_6		= 0x004a;	// Keep worker upgrades on reset
	upgrade_singularity_workers_7		= 0x004b;	// +0.5 Worker per reset
	upgrade_singularity_workers_8		= 0x004c;	// +0.25 Worker per reset
	upgrade_singularity_earth_value_1	= 0x004d;	// 3x coal particle value
	upgrade_singularity_earth_value_2	= 0x004e;	// 1.5x singularity particle gain
	upgrade_singularity_survey_1		= 0x004f;	// +1 Effective Survey
	upgrade_singularity_survey_2		= 0x0050;	// +base jewel particle chance
	upgrade_singularity_mining_rig_1	= 0x0051;	// Keep Mining Rig upgrades on reset
	upgrade_singularity_mining_rig_2	= 0x0052;	// Mining rig sustain x3
	upgrade_singularity_mining_rig_3	= 0x0053;	// Mining rig decay 50% slower
	upgrade_singularity_ascend_1		= 0x0054;	// Singularity base cost -25%
	
	upgrade_count						= 0x0055;
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
				for (let i = 0; i < cid.currency_max; i++) {
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

			for (let i = 0; i < cid.currency_max; i++) {
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					150,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					2.2,	// Particles
					0.05,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_3",
					"images/tile_research_earth_value_3.png",
					[
					16,		// Particles
					0.5,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_4",
					"images/tile_research_earth_value_4.png",
					[
					16,		// Particles
					0.5,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_5",
					"images/tile_research_earth_value_5.png",
					[
					55,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_6",
					"images/tile_research_earth_value_6.png",
					[
					150,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_7",
					"images/tile_research_earth_value_7.png",
					[
					0,		// Particles
					8,		// Strands
					0,		// Spirit
					0,		// Soul
					6,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_8:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_8",
					"images/tile_research_earth_value_8.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					1,		// Soul
					12,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_9:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_9",
					"images/tile_research_earth_value_9.png",
					[
					0,		// Particles
					40,		// Strands
					0,		// Spirit
					1.5,	// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_10:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_10",
					"images/tile_research_earth_value_10.png",
					[
					0,		// Particles
					50,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_11:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_11",
					"images/tile_research_earth_value_11.png",
					[
					1000,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					75,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_value_12:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_value_12",
					"images/tile_research_upgrade_unknown.png",
					[
					500,	// Particles
					0,		// Strands
					0,		// Spirit
					3,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_1",
					"images/tile_research_earth_chance_1.png",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0.4,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_2",
					"images/tile_research_earth_chance_2.png",
					[
					40,		// Particles
					3,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_3",
					"images/tile_research_earth_chance_3.png",
					[
					0,		// Particles
					200,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_4",
					"images/tile_research_earth_chance_4.png",
					[
					55,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_chance_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_chance_5",
					"images/tile_research_earth_chance_5.png",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0.4,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_gather_speed_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_gather_speed_2",
					"images/tile_research_earth_gather_speed_2.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					3,		// Soul
					25,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_drop_speed_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_drop_speed_1",
					"images/tile_research_upgrade_drop_speed_1.png",
					[
					1.8,	// Particles
					0.15,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_earth_drop_speed_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_earth_drop_speed_2",
					"images/tile_research_upgrade_drop_speed_2.png",
					[
					750,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					1.2,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					2000,	// Particles
					0,		// Strands
					0,		// Spirit
					100,	// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
					30,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_mining_rig_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_1",
					"images/tile_research_upgrade_mining_rig_1.png",
					[
					1.2,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_mining_rig_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_2",
					"images/tile_research_upgrade_mining_rig_2.png",
					[
					25,		// Particles
					0.75,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_mining_rig_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_3",
					"images/tile_research_upgrade_mining_rig_3.png",
					[
					350,	// Particles
					0,		// Strands
					0,		// Spirit
					15,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_mining_rig_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_mining_rig_4",
					"images/tile_research_upgrade_unknown.png",
					[
					750,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_water_bait_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_bait_1",
					"images/tile_research_water_bait_1.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_water_survey_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_survey_1",
					"images/tile_research_water_survey_1.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_water_value_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_1",
					"images/tile_research_water_value_1.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_2",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_3",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_4",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_5",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_6",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_7",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_value_8:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_value_8",
					"images/tile_research_upgrade_unknown.png",
					[
					50,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_1",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_2",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_3",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_4",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_5",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_6",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_water_depth_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_water_depth_7",
					"images/tile_research_upgrade_unknown.png",
					[
					3,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_3",
					"images/tile_research_upgrade_workers_3.png",
					[
					1.2,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_workers_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_4",
					"images/tile_research_upgrade_workers_4.png",
					[
					4,		// Particles
					0.1,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
		
			case uid.upgrade_workers_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_5",
					"images/tile_research_upgrade_workers_5.png",
					[
					8.5,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
		
			case uid.upgrade_workers_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_6",
					"images/tile_research_upgrade_workers_6.png",
					[
					20,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0.20,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					75,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					30,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					2.5,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
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
					0,		// Particles
					6,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_workers_10:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_10",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					1.5,	// Soul
					25,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_workers_11:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_11",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					6,		// Strands
					0,		// Spirit
					0,		// Soul
					1.5,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_workers_12:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_workers_12",
					"images/tile_research_upgrade_unknown.png",
					[
					500,	// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					100,	// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;

			case uid.upgrade_challenge_ecocide:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_challenge_ecocide",
					"images/tile_research_challenge_unknown.png",
					[
					0,		// Particles
					400,	// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
				break;
			
			case uid.upgrade_singularity_workers_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_1",
					"images/tile_research_upgrade_singularity_workers_1.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_workers_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_2",
					"images/tile_research_upgrade_singularity_workers_2.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_workers_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_3",
					"images/tile_research_upgrade_singularity_workers_3.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;
		
			case uid.upgrade_singularity_workers_4:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_4",
					"images/tile_research_upgrade_singularity_workers_4.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;
	
			case uid.upgrade_singularity_workers_5:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_5",
					"images/tile_research_upgrade_singularity_workers_5.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_workers_6:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_6",
					"images/tile_research_upgrade_singularity_workers_6.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_workers_7:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_7",
					"images/tile_research_upgrade_singularity_workers_7.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					5,		// Singularity
					],
					reset_level_all
				);
				break;
		
			case uid.upgrade_singularity_workers_8:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_workers_8",
					"images/tile_research_upgrade_singularity_workers_8.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					8,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_earth_value_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_earth_value_1",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
					],
					reset_level_all
				);
				break;
			
			case uid.upgrade_singularity_earth_value_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_earth_value_2",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_survey_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_survey_1",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_survey_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_survey_2",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_mining_rig_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_mining_rig_1",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_mining_rig_2:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_mining_rig_2",
					"images/tile_research_upgrade_singularity_mining_rig_2.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					2,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_mining_rig_3:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_mining_rig_3",
					"images/tile_research_upgrade_singularity_mining_rig_3.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					1,		// Singularity
					],
					reset_level_all
				);
				break;

			case uid.upgrade_singularity_ascend_1:
				chasm_upgrades[i] = new _CHASM_UPGRADE(
					"upgrade_singularity_ascend_1",
					"images/tile_research_upgrade_unknown.png",
					[
					0,		// Particles
					0,		// Strands
					0,		// Spirit
					0,		// Soul
					0,		// Anticapital
					0,		// Goo
					0,		// Core
					0,		// Bugs
					3,		// Singularity
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
					0,		// Goo
					0,		// Core
					0,		// Bugs
					0,		// Singularity
					],
					reset_level_singularity
				);
		}
	}

	drawResearchMap();
}

function lock_all_upgrades(reset_level) {
	// Reverse loop to lock higher tier upgrades before checking special handling for lower tier upgrades
	for (let i = uid.upgrade_count - 1; i >= uid.upgrade_first; i--) {
		// Special handling for singularity upgrades
		if (chasm_upgrades[uid.upgrade_singularity_mining_rig_1].unlocked) {
			if (i == uid.upgrade_mining_rig_1 || i == uid.upgrade_mining_rig_2) continue;
		}

		// Default lock handling
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

			case uid.upgrade_earth_chance_3:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_earth_chance_4:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_earth_chance_5:
				chasm_storage[sid.storage_earth].refresh_survey();
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
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
		
			case uid.upgrade_earth_depth_3:
				RefreshMaxDepth();
				break;
	
			case uid.upgrade_earth_depth_4:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_5:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_6:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_earth_depth_7:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_mining_rig_1:
				$("#incinerator_box").css("background-color", "#cfd8dc");
				$("#incinerator_box_content").css("visibility", "visible");
				break;

			case uid.upgrade_mining_rig_2:
				$("#incinerator_upgrades_content").css("visibility", "visible");
				break;

			case uid.upgrade_mining_rig_4:
				RefreshMiningRig();
				break;
	
			case uid.upgrade_water_storage:
				$("#water_section").css("display", "block");
				$("#water_upgrades_tab").css("display", "block");
				break;
	
			case uid.upgrade_water_bait_1:
				$("#bait_box").css("background-color", "#cfd8dc");
				$("#bait_box_content").css("visibility", "visible");
				break;

			case uid.upgrade_water_survey_1:
				$("#water_survey").css("background-color", "#cfd8dc");
				$("#water_survey_content").css("visibility", "visible");
				chasm_storage[sid.storage_water].refresh_survey();
				break;
			
			case uid.upgrade_water_depth_1:
				$("#water_depth").css("background-color", "#cfd8dc");
				$("#water_depth_content").css("visibility", "visible");
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
			
			case uid.upgrade_water_depth_2:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
			
			case uid.upgrade_water_depth_3:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
		
			case uid.upgrade_water_depth_4:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;
	
			case uid.upgrade_water_depth_5:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_water_depth_6:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
				break;

			case uid.upgrade_water_depth_7:
				chasm_currency[cid.currency_machinery].resource.gain(1);
				RefreshMaxDepth();
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
				chasm_storage[sid.storage_earth].refresh_survey();
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

			case uid.upgrade_workers_10:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_workers_11:
				chasm_currency[cid.currency_workers].resource.gain(1);
				RefreshMiningRig();
				break;

			case uid.upgrade_workers_12:
				chasm_currency[cid.currency_workers].resource.gain(1);
				break;

			case uid.upgrade_singularity_workers_1:
				let effective_singularity_count = singularity_count;
				if (effective_singularity_count > 5) effective_singularity_count = 5;
				chasm_currency[cid.currency_workers].resource.gain(effective_singularity_count);
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
				chasm_currency[cid.currency_workers].resource.gain(1);
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_singularity_workers_6:
				buy_upgrade(uid.upgrade_workers_1, true);
				buy_upgrade(uid.upgrade_workers_2, true);
				buy_upgrade(uid.upgrade_workers_3, true);
				buy_upgrade(uid.upgrade_workers_4, true);
				buy_upgrade(uid.upgrade_workers_5, true);
				buy_upgrade(uid.upgrade_workers_6, true);
				break;

			case uid.upgrade_singularity_workers_7:
				let effective_singularity_count_2 = singularity_count - 5;
				if (effective_singularity_count_2 < 0) effective_singularity_count_2 = 0;
				if (effective_singularity_count_2 > 10) effective_singularity_count_2 = 10;
				effective_singularity_count_2 = Math.floor(effective_singularity_count_2 / 2);
				chasm_currency[cid.currency_workers].resource.gain(effective_singularity_count_2);
				break;

			case uid.upgrade_singularity_workers_8:
				let effective_singularity_count_3 = singularity_count - 15;
				if (effective_singularity_count_3 < 0) effective_singularity_count_3 = 0;
				if (effective_singularity_count_3 > 20) effective_singularity_count_3 = 20;
				effective_singularity_count_3 = Math.floor(effective_singularity_count_3 / 4);
				chasm_currency[cid.currency_workers].resource.gain(effective_singularity_count_3);
				break;

			case uid.upgrade_singularity_survey_1:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;

			case uid.upgrade_singularity_survey_2:
				chasm_storage[sid.storage_earth].refresh_survey();
				break;
			
			default:
		}
	}
}

function reset_upgrades(reset_level) {
	lock_all_upgrades(reset_level);
	
	if (reset_level >= reset_level_singularity) {
		// upgrade_water_storage
		if (chasm_upgrades[uid.upgrade_water_storage].unlocked) {
			$("#water_section").css("display", "block");
			$("#water_upgrades_tab").css("display", "block");
		}
		else {
			$("#water_section").css("display", "none");
			$("#water_upgrades_tab").css("display", "none");
		}
	
		// upgrade_earth_metals_1
		$("#earth_survey").css("background-color", "transparent");
		$("#earth_survey_content").css("visibility", "hidden");
	
		// upgrade_earth_depth_1
		$("#earth_depth").css("background-color", "transparent");
		$("#earth_depth_content").css("visibility", "hidden");
	
		if (!chasm_upgrades[uid.upgrade_singularity_mining_rig_1].unlocked) {
			// upgrade_mining_rig_1
			$("#incinerator_box").css("background-color", "transparent");
			$("#incinerator_box_content").css("visibility", "hidden");
	
			// upgrade_mining_rig_2
			$("#incinerator_upgrades_content").css("visibility", "hidden");
		}
	
		// upgrade_water_survey_1
		$("#water_survey").css("background-color", "transparent");
		$("#water_survey_content").css("visibility", "hidden");
	
		// upgrade_water_depth_1
		$("#water_depth").css("background-color", "transparent");
		$("#water_depth_content").css("visibility", "hidden");
	}
}

class _CHALLENGE_STATE {
	challenge_failed 				= 0x0000;	// Challenge failed for this run
	challenge_pending 				= 0x0001;	// Challenge pending, not yet completed or failed
	challenge_completed 			= 0x0002;	// Challenge completed for this run
} var cs = new _CHALLENGE_STATE();

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
	tile_challenge					= 0x000d;

	tile_count						= 0x000e;
} var tid = new _TILE_ID();

// Upgrade menu layout
let upgrade_menu_width 				= 600;
let upgrade_tile_width 				= 40;
let upgrade_menu_cols 				= upgrade_menu_width / upgrade_tile_width;

let upgrade_menu_earth_rows 		= 45;
let upgrade_map_earth_size			= upgrade_menu_cols * upgrade_menu_earth_rows;
let upgrade_map_earth 				= new Array(upgrade_map_earth_size);

let upgrade_menu_water_rows			= 32;
let upgrade_map_water_size			= upgrade_menu_cols * upgrade_menu_water_rows;
let upgrade_map_water 				= new Array(upgrade_map_water_size);

let upgrade_menu_singularity_rows	= 28;
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
let image_style_failed = " filter: brightness(0.3);";
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

		// Challenge handling
		if (this.tile_id == tid.tile_challenge) {
			if (chasm_upgrades[this.upgrade_id].unlocked) {
				return image_style_purchased;
			}
			let challenge_state = this.challenge_style();
			if (challenge_state == cs.challenge_completed) {
				if (chasm_upgrades[this.upgrade_id].affordable()) {
					return image_style_affordable;
				} else {
					return "";
				}
			} else if (challenge_state == cs.challenge_failed) {
				return image_style_failed;
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

	challenge_style() {
		if (this.tile_id == tid.tile_challenge) {
			switch (this.upgrade_id) {
				case uid.upgrade_challenge_ecocide:
					if (chasm_upgrades[uid.upgrade_earth_value_2].unlocked) {
						return cs.challenge_failed;
					} else {
						return cs.challenge_completed;
					}
					break;
			}
		}
	}

	generate_tile_frame_header() {
		let out = "";
		out += tile_div_header + this.header_name + "_" + this.coordinate + tile_div_style_core;
		if (this.tile_id == tid.tile_node || this.tile_id == tid.tile_challenge) out += tile_div_style_node;
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

			case tid.tile_challenge:
				out += image_header + chasm_upgrades[this.upgrade_id].upgrade_image + image_style_core + image_footer;
				out += image_header + "images/tile_research_challenge.png'" + image_style_core + this.purchase_style(this.upgrade_triggers_1) + image_footer;
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
		if (upgrade_map_earth[i].tile_id == tid.tile_node || upgrade_map_earth[i].tile_id == tid.tile_challenge) {
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
		if (upgrade_map_water[i].tile_id == tid.tile_node || upgrade_map_water[i].tile_id == tid.tile_challenge) {
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
		if (upgrade_map_singularity[i].tile_id == tid.tile_node || upgrade_map_singularity[i].tile_id == tid.tile_challenge) {
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
	upgrade_map_earth[mapColRow(1, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_5, 		[uid.upgrade_earth_value_3]																		);
	upgrade_map_earth[mapColRow(1, 13)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_chance_5]																	);
	upgrade_map_earth[mapColRow(1, 14)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_2, 		[uid.upgrade_earth_chance_5]																	);
	upgrade_map_earth[mapColRow(1, 15)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_chance_2]																	);
	upgrade_map_earth[mapColRow(1, 16)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_8, 			[uid.upgrade_earth_chance_2]																	);
	upgrade_map_earth[mapColRow(1, 17)]		.assign_tile(tid.tile_connect_urd, 	uid.upgrade_count,					[uid.upgrade_earth_value_8]																		);
	upgrade_map_earth[mapColRow(1, 18)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_9, 			[uid.upgrade_earth_value_8]																		);
	upgrade_map_earth[mapColRow(1, 19)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_9]																		);
	upgrade_map_earth[mapColRow(1, 20)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_3,			[uid.upgrade_earth_value_9]			 															);
	upgrade_map_earth[mapColRow(2, 17)]		.assign_tile(tid.tile_connect_lr, 	uid.upgrade_count,					[uid.upgrade_earth_value_8]																		);
	upgrade_map_earth[mapColRow(3, 17)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_value_8]																		);
	upgrade_map_earth[mapColRow(3, 18)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_gather_speed_2, 	[uid.upgrade_earth_value_8]																		);
	upgrade_map_earth[mapColRow(3, 19)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_gather_speed_2]																);
	upgrade_map_earth[mapColRow(3, 20)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_11, 		[uid.upgrade_earth_gather_speed_2]																);
	upgrade_map_earth[mapColRow(3, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_1,			[uid.upgrade_earth_metals_1] 																	);
	upgrade_map_earth[mapColRow(3, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_depth_1]																		);
	upgrade_map_earth[mapColRow(3, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_1,			[uid.upgrade_earth_depth_1] 																	);
	upgrade_map_earth[mapColRow(7, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_drop_speed_1,		[uid.upgrade_earth_metals_1]																	);
	upgrade_map_earth[mapColRow(7, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_drop_speed_1]																);
	upgrade_map_earth[mapColRow(7, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_4,			[uid.upgrade_earth_drop_speed_1]																);
	upgrade_map_earth[mapColRow(3, 11)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_earth_chance_1]																	);
	upgrade_map_earth[mapColRow(4, 11)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_earth_chance_1],		[uid.upgrade_mining_rig_2]									);
	upgrade_map_earth[mapColRow(5, 11)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_mining_rig_2]																		);
	
	upgrade_map_earth[mapColRow(5, 8)]		.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_1,																 											);
	upgrade_map_earth[mapColRow(5, 9)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_mining_rig_1]																		);
	upgrade_map_earth[mapColRow(5, 10)]		.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_2,			[uid.upgrade_mining_rig_1] 																		);

	upgrade_map_earth[mapColRow(7, 11)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_4]																		);
	upgrade_map_earth[mapColRow(7, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_5,			[uid.upgrade_earth_value_4]						 												);
	upgrade_map_earth[mapColRow(4, 12)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_chance_4,			[uid.upgrade_earth_chance_1, uid.upgrade_mining_rig_2]											);
	upgrade_map_earth[mapColRow(4, 13)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_chance_4]																	);
	upgrade_map_earth[mapColRow(4, 14)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_2,			[uid.upgrade_earth_chance_4] 																	);
	upgrade_map_earth[mapColRow(4, 15)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_earth_depth_2]																		);
	upgrade_map_earth[mapColRow(7, 13)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_5]																		);
	upgrade_map_earth[mapColRow(7, 14)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_7,			[uid.upgrade_earth_value_5]												 						);
	upgrade_map_earth[mapColRow(7, 15)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_7]																		);
	upgrade_map_earth[mapColRow(7, 16)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_7]																		);
	upgrade_map_earth[mapColRow(7, 17)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_value_7]																		);
	upgrade_map_earth[mapColRow(5, 15)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_depth_2]																		);
	upgrade_map_earth[mapColRow(5, 16)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_density_2,		[uid.upgrade_earth_depth_2]													 					);
	upgrade_map_earth[mapColRow(5, 17)]		.assign_tile(tid.tile_connect_ud, 	uid.upgrade_count,					[uid.upgrade_earth_density_2]																	);
	upgrade_map_earth[mapColRow(5, 18)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_10,			[uid.upgrade_earth_density_2]																	);
	upgrade_map_earth[mapColRow(5, 19)]		.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_earth_value_10]																	);
	upgrade_map_earth[mapColRow(6, 19)]		.assign_tile(tid.tile_connect_lrd, 	uid.upgrade_count,					[uid.upgrade_earth_value_10],		[uid.upgrade_earth_value_12]								);
	upgrade_map_earth[mapColRow(7, 18)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_12,			[uid.upgrade_earth_value_7]																		);
	upgrade_map_earth[mapColRow(7, 19)]		.assign_tile(tid.tile_connect_ul, 	uid.upgrade_count,					[uid.upgrade_earth_value_12]																	);
	upgrade_map_earth[mapColRow(6, 20)]		.assign_tile(tid.tile_node, 		uid.upgrade_earth_depth_3,			[uid.upgrade_earth_value_12, uid.upgrade_earth_value_10]										);

	upgrade_map_earth[mapColRow(5, 21)]		.assign_tile(tid.tile_connect_rd, 	uid.upgrade_count,					[uid.upgrade_earth_depth_3]																		);
	upgrade_map_earth[mapColRow(6, 21)]		.assign_tile(tid.tile_connect_ulr, 	uid.upgrade_count,					[uid.upgrade_earth_depth_3]																		);
	upgrade_map_earth[mapColRow(7, 21)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_depth_3]																		);
	
	upgrade_map_earth[mapColRow(2, 22)]		.assign_tile(tid.tile_challenge, 	uid.upgrade_challenge_ecocide,																										);

	upgrade_map_earth[mapColRow(9, 22)]		.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_3,																											);
	
	upgrade_map_earth[mapColRow(11, 16)]	.assign_tile(tid.tile_node, 		uid.upgrade_earth_value_6,						 																					);
	upgrade_map_earth[mapColRow(10, 17)]	.assign_tile(tid.tile_connect_rd, 	uid.upgrade_count,					[uid.upgrade_earth_value_6]																		);
	upgrade_map_earth[mapColRow(11, 17)]	.assign_tile(tid.tile_connect_ulr, 	uid.upgrade_count,					[uid.upgrade_earth_value_6]																		);
	upgrade_map_earth[mapColRow(12, 17)]	.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_earth_value_6]																		);
	upgrade_map_earth[mapColRow(10, 18)]	.assign_tile(tid.tile_node, 		uid.upgrade_mining_rig_4,			[uid.upgrade_earth_value_6]				 														);
	upgrade_map_earth[mapColRow(12, 18)]	.assign_tile(tid.tile_node, 		uid.upgrade_earth_drop_speed_2,		[uid.upgrade_earth_value_6]				 														);
	
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
	upgrade_map_earth[mapColRow(12, 8)]		.assign_tile(tid.tile_connect_ld, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(11, 9)]		.assign_tile(tid.tile_node, 		uid.upgrade_workers_7,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 9)]		.assign_tile(tid.tile_connect_uld, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 10)]	.assign_tile(tid.tile_connect_urd, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(13, 10)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_8,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 11)]	.assign_tile(tid.tile_connect_uld, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 12)]	.assign_tile(tid.tile_connect_urd, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(13, 12)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_9,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(11, 11)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_11,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 13)]	.assign_tile(tid.tile_connect_uld, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(11, 13)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_10,				[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(12, 14)]	.assign_tile(tid.tile_connect_ur, 	uid.upgrade_count,					[uid.upgrade_workers_6]																			);
	upgrade_map_earth[mapColRow(13, 14)]	.assign_tile(tid.tile_node, 		uid.upgrade_workers_12,				[uid.upgrade_workers_6]																			);

	// Testing row
	var test_row = 35;
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
	upgrade_map_water[mapColRow(6, 2)]		.assign_tile(tid.tile_node, 		uid.upgrade_water_value_1,																											);
	upgrade_map_water[mapColRow(6, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_water_bait_1,																											);
	upgrade_map_water[mapColRow(8, 4)]		.assign_tile(tid.tile_node, 		uid.upgrade_water_survey_1,																											);

	// Testing row
	var test_row = 10;
	var test_upgrades = [uid.upgrade_water_value_2, uid.upgrade_water_value_3, uid.upgrade_water_value_4, uid.upgrade_water_value_5, uid.upgrade_water_value_6, uid.upgrade_water_value_7, uid.upgrade_water_value_8, uid.upgrade_water_depth_1, uid.upgrade_water_depth_2, uid.upgrade_water_depth_3, uid.upgrade_water_depth_4, uid.upgrade_water_depth_5, uid.upgrade_water_depth_6, uid.upgrade_water_depth_7];
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

	// Singularity Workers
	upgrade_map_singularity[mapColRow(4, 2)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_1,																						);
	// horizontal connectors
	upgrade_map_singularity[mapColRow(1, 3)]		.assign_tile(tid.tile_connect_rd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(2, 3)]		.assign_tile(tid.tile_connect_lr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(3, 3)]		.assign_tile(tid.tile_connect_lrd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1],	[uid.upgrade_singularity_workers_1]		);
	upgrade_map_singularity[mapColRow(4, 3)]		.assign_tile(tid.tile_connect_ulr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(5, 3)]		.assign_tile(tid.tile_connect_lrd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1],	[uid.upgrade_singularity_workers_1]		);
	upgrade_map_singularity[mapColRow(6, 3)]		.assign_tile(tid.tile_connect_lr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(7, 3)]		.assign_tile(tid.tile_connect_ld, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_1]												);
	// horizontal 4 upgrades
	upgrade_map_singularity[mapColRow(1, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_2,		[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(3, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_3,		[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(5, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_4,		[uid.upgrade_singularity_workers_1]												);
	upgrade_map_singularity[mapColRow(7, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_5,		[uid.upgrade_singularity_workers_1]												);
	// horizontal connectors
	upgrade_map_singularity[mapColRow(1, 5)]		.assign_tile(tid.tile_connect_ur, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_2]												);
	upgrade_map_singularity[mapColRow(2, 5)]		.assign_tile(tid.tile_connect_lrd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_2],	[uid.upgrade_singularity_workers_3]		);
	upgrade_map_singularity[mapColRow(3, 5)]		.assign_tile(tid.tile_connect_ul, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_3]												);
	upgrade_map_singularity[mapColRow(5, 5)]		.assign_tile(tid.tile_connect_ur, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_4]												);
	upgrade_map_singularity[mapColRow(6, 5)]		.assign_tile(tid.tile_connect_lrd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_4],	[uid.upgrade_singularity_workers_5]		);
	upgrade_map_singularity[mapColRow(7, 5)]		.assign_tile(tid.tile_connect_ul, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_5]												);
	// horizontal connectors
	upgrade_map_singularity[mapColRow(2, 6)]		.assign_tile(tid.tile_connect_ur, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_2, uid.upgrade_singularity_workers_3]			);
	upgrade_map_singularity[mapColRow(3, 6)]		.assign_tile(tid.tile_connect_lr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_2, uid.upgrade_singularity_workers_3]			);
	upgrade_map_singularity[mapColRow(4, 6)]		.assign_tile(tid.tile_connect_lrd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_2, uid.upgrade_singularity_workers_3], [uid.upgrade_singularity_workers_4, uid.upgrade_singularity_workers_5]	);
	upgrade_map_singularity[mapColRow(5, 6)]		.assign_tile(tid.tile_connect_lr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_4, uid.upgrade_singularity_workers_5]			);
	upgrade_map_singularity[mapColRow(6, 6)]		.assign_tile(tid.tile_connect_ul, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_4, uid.upgrade_singularity_workers_5]			);
	// hr upgrade
	upgrade_map_singularity[mapColRow(4, 7)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_6,		[uid.upgrade_singularity_workers_2, uid.upgrade_singularity_workers_3, uid.upgrade_singularity_workers_4, uid.upgrade_singularity_workers_5]	);
	// Next connectors
	upgrade_map_singularity[mapColRow(3, 8)]		.assign_tile(tid.tile_connect_rd, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_6]												);
	upgrade_map_singularity[mapColRow(4, 8)]		.assign_tile(tid.tile_connect_ulr, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_6]												);
	upgrade_map_singularity[mapColRow(5, 8)]		.assign_tile(tid.tile_connect_ld, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_6]												);
	// Next upgrades
	upgrade_map_singularity[mapColRow(3, 9)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_7,		[uid.upgrade_singularity_workers_6]												);
	// Next connectors
	upgrade_map_singularity[mapColRow(3, 10)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_workers_7]												);
	// Next upgrades
	upgrade_map_singularity[mapColRow(3, 11)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_workers_8,		[uid.upgrade_singularity_workers_7]												);

	// Qol upgrades
	upgrade_map_singularity[mapColRow(9, 2)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_mining_rig_3,																					);
	upgrade_map_singularity[mapColRow(9, 3)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_mining_rig_3]											);
	upgrade_map_singularity[mapColRow(9, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_mining_rig_2,	[uid.upgrade_singularity_mining_rig_3]											);
	upgrade_map_singularity[mapColRow(9, 5)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_mining_rig_2]											);
	upgrade_map_singularity[mapColRow(9, 6)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_mining_rig_1,	[uid.upgrade_singularity_mining_rig_2]											);
	upgrade_map_singularity[mapColRow(11, 3)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_survey_1,																						);
	upgrade_map_singularity[mapColRow(11, 4)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_survey_1]												);
	upgrade_map_singularity[mapColRow(11, 5)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_survey_2,		[uid.upgrade_singularity_survey_1]												);
	upgrade_map_singularity[mapColRow(11, 6)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_survey_2]												);
	upgrade_map_singularity[mapColRow(11, 7)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_earth_value_1,	[uid.upgrade_singularity_survey_2]												);
	upgrade_map_singularity[mapColRow(13, 4)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_earth_value_2,																					);
	upgrade_map_singularity[mapColRow(13, 5)]		.assign_tile(tid.tile_connect_ud, 		uid.upgrade_count,						[uid.upgrade_singularity_earth_value_2]											);
	upgrade_map_singularity[mapColRow(13, 6)]		.assign_tile(tid.tile_node, 			uid.upgrade_singularity_ascend_1,		[uid.upgrade_singularity_earth_value_2]											);
	
	// Water Upgrades
	upgrade_map_singularity[mapColRow(11, 10)]		.assign_tile(tid.tile_node, 			uid.upgrade_water_storage,																								);

	// Testing row
	var test_row = 16;
	var test_upgrades = [uid.upgrade_earth_depth_7];
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