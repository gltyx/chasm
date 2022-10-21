// Chasm Inspector
	// The Inspector provides information for game elements that the user mouses over.
	// To add a new Inspector panel, do the following:
	//
	// 1. Add Inspector Id for this panel				[_INSPECTOR_ID]
	// 2. Register trigger event for this panel			[registerInspectorEvents]
	// 3. Add panel generation to inspector function	[showInspector]

class _INSPECTOR_ID {
	none 										= 0x0000;	// 0x0000 Clear inspector

	offset_currency								= 0x0100;	// 0x01xx Start currency section
	currency_particles							= cid.currency_particles					+ this.offset_currency;
	currency_strands							= cid.currency_strands						+ this.offset_currency;
	currency_spirit								= cid.currency_spirit						+ this.offset_currency;
	currency_soul								= cid.currency_soul							+ this.offset_currency;

	offset_elements								= 0x0600;	// 0x06xx Start elements section
	element_earth 								= eid.element_earth							+ this.offset_elements;
	element_water 								= eid.element_water							+ this.offset_elements;
	element_coal								= eid.element_coal							+ this.offset_elements;
	element_copper								= eid.element_copper						+ this.offset_elements;
	element_iron								= eid.element_iron							+ this.offset_elements;
	element_fish								= eid.element_fish							+ this.offset_elements;

	offset_upgrades								= 0xa100;	// 0xa1xx Start upgrade section
	upgrade_steel_toed_boots 					= uid.upgrade_steel_toed_boots				+ this.offset_upgrades;
	upgrade_tamping_rod							= uid.upgrade_tamping_rod					+ this.offset_upgrades;
	upgrade_trash_compactor						= uid.upgrade_trash_compactor				+ this.offset_upgrades;
	upgrade_macrosonic_agitator					= uid.upgrade_macrosonic_agitator			+ this.offset_upgrades;
	upgrade_gravity_well						= uid.upgrade_gravity_well					+ this.offset_upgrades;
	upgrade_ant_farm							= uid.upgrade_ant_farm						+ this.offset_upgrades;
	upgrade_catapult							= uid.upgrade_catapult						+ this.offset_upgrades;
	upgrade_water_storage						= uid.upgrade_water_storage					+ this.offset_upgrades;
	upgrade_rain_barrels						= uid.upgrade_rain_barrels					+ this.offset_upgrades;
	upgrade_sprinkler							= uid.upgrade_sprinkler						+ this.offset_upgrades;
	upgrade_prospectors_tools					= uid.upgrade_prospectors_tools				+ this.offset_upgrades;

	offset_achivements							= 0xd100;	// 0xd1xx Start achievement section
	achievement_babys_first_block 				= aid.achievement_babys_first_block 		+ this.offset_achivements;
	achievement_reality_sprang_a_leak 			= aid.achievement_reality_sprang_a_leak 	+ this.offset_achivements;
	achievement_nothing_to_worry_about			= aid.achievement_nothing_to_worry_about 	+ this.offset_achivements;
	achievement_minor_case_of_wormhole			= aid.achievement_minor_case_of_wormhole 	+ this.offset_achivements;
	achievement_eye_feel_extremely_unwell		= aid.achievement_eye_feel_extremely_unwell + this.offset_achivements;
	achievement_unknown			 				= aid.achievement_count 					+ this.offset_achivements;

} var iid = new _INSPECTOR_ID();

function registerInspectorEvents() {
	$(".currency_particles").each(function(){	$(this).mouseenter(function(){showInspector(iid.currency_particles);});});
	$(".currency_strands").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_strands);});});
	$(".currency_spirit").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_spirit);});});
	$(".currency_soul").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_soul);});});

	$("#select_upgrade_steel_toed_boots")		.mouseenter(function(){showInspector(iid.upgrade_steel_toed_boots);});
	$("#select_upgrade_tamping_rod")			.mouseenter(function(){showInspector(iid.upgrade_tamping_rod);});
	$("#select_upgrade_trash_compactor")		.mouseenter(function(){showInspector(iid.upgrade_trash_compactor);});
	$("#select_upgrade_macrosonic_agitator")	.mouseenter(function(){showInspector(iid.upgrade_macrosonic_agitator);});
	$("#select_upgrade_gravity_well")			.mouseenter(function(){showInspector(iid.upgrade_gravity_well);});
	$("#select_upgrade_ant_farm")				.mouseenter(function(){showInspector(iid.upgrade_ant_farm);});
	$("#select_upgrade_catapult")				.mouseenter(function(){showInspector(iid.upgrade_catapult);});
	$("#select_upgrade_water_storage")			.mouseenter(function(){showInspector(iid.upgrade_water_storage);});
	$("#select_upgrade_rain_barrels")			.mouseenter(function(){showInspector(iid.upgrade_rain_barrels);});
	$("#select_upgrade_sprinkler")				.mouseenter(function(){showInspector(iid.upgrade_sprinkler);});
	$("#select_upgrade_prospectors_tools")		.mouseenter(function(){showInspector(iid.upgrade_prospectors_tools);});

	$("#achievement_babys_first_block")			.mouseenter(function(){showInspector(iid.achievement_babys_first_block);});
	$("#achievement_reality_sprang_a_leak")		.mouseenter(function(){showInspector(iid.achievement_reality_sprang_a_leak);});
	$("#achievement_nothing_to_worry_about")	.mouseenter(function(){showInspector(iid.achievement_nothing_to_worry_about);});
	$("#achievement_minor_case_of_wormhole")	.mouseenter(function(){showInspector(iid.achievement_minor_case_of_wormhole);});
	$("#achievement_eye_feel_extremely_unwell")	.mouseenter(function(){showInspector(iid.achievement_eye_feel_extremely_unwell);});
}

var current_inspector_id = iid.none; // Saved id of current inspector panel. Used to redraw inspector.

function showInspector(id) {
	if (id != current_inspector_id) {
		let selector = $("#inspector_content");
		selector.stop().fadeTo(0, 0).fadeTo(300, 1);
	}
	switch(id) {
		// Currency
		case iid.currency_particles:
			$("#inspector_title")	.html(chasm_currency[cid.currency_particles].inspector_symbol + "Void Particles");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When matter is dropped into the Chasm, it releases small clouds of nothing. Not nothing... Something? Something that is nothing.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_strands:
			$("#inspector_title")	.html(chasm_currency[cid.currency_strands].inspector_symbol + "Gravity Strands");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When dense matter is dropped into the Chasm, it releases gossamer strands of gravity. Our researchers say gravity has no carrying particle, but here it is.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_spirit:
			$("#inspector_title")	.html(chasm_currency[cid.currency_spirit].inspector_symbol + "Spirit Sand");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When living matter is dropped into the Chasm, it sprays grains of silver-green sand. Our researchers are convinced this sand has something to do with a metaphysical 'life-force'.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_soul:
			$("#inspector_title")	.html(chasm_currency[cid.currency_soul].inspector_symbol + "Soul Shards");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When human flesh is dropped into the Chasm, it screams. Glassy shards grow around the edge of the pit... It's best not to consider what they are made of.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;

		// Elements
		case iid.element_earth:
			$("#inspector_title")	.html("<div class = 'element_sample' style = 'background-color: SaddleBrown;'></div>Dirt");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("blah blah blah");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("value: x");
			break;
		case iid.element_water:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_coal:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_copper:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_iron:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_fish:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		
		// Upgrades
		case iid.upgrade_steel_toed_boots:
			$("#inspector_title")	.html("Steel-toed Boots");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_steel_toed_boots].cost.stringify());
			$("#inspector_text")	.html("You can fit a lot more dirt into your storage with a few well-placed stomps");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_tamping_rod:
			$("#inspector_title")	.html("Tamping Rod");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_tamping_rod].cost.stringify());
			$("#inspector_text")	.html("A long stick with a flat metal plate at one end. The perfect tool for squishing dirt or less lethal jousting.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_trash_compactor:
			$("#inspector_title")	.html("Steel-toed Boots");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_trash_compactor].cost.stringify());
			$("#inspector_text")	.html("A repurposed trash compactor can smash earth into a dense cube. Ignore the stench and raccoons.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_macrosonic_agitator:
			$("#inspector_title")	.html("Steel-toed Boots");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_macrosonic_agitator].cost.stringify());
			$("#inspector_text")	.html("A marvel of modern science. Vibrates the earth at incredible frequencies to squeeze out every last bit of empty space.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_gravity_well:
			$("#inspector_title")	.html("Steel-toed Boots");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_gravity_well].cost.stringify());
			$("#inspector_text")	.html("A miniature black hole which can compact earth to a ridiculous degree. You can also say it ate your homework.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_ant_farm:
			$("#inspector_title")	.html("Ant farm");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_ant_farm].cost.stringify());
			$("#inspector_text")	.html("These little guys can help you move mountains of earth... Very, very slowly");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Auto-gather Earth");
			break;
		case iid.upgrade_catapult:
			$("#inspector_title")	.html("Catapult");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_catapult].cost.stringify());
			$("#inspector_text")	.html("Flinging dirt into the Chasm is a lot more fun than dumping it in by hand");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Auto-drop Earth");
			break;
		case iid.upgrade_water_storage:
			$("#inspector_title")	.html("Water storage");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_water_storage].cost.stringify());
			$("#inspector_text")	.html("Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first");
			$("#inspector_subtext")	.html("Unlock Water");
			$("#inspector_divider")	.css("display", "block");
			break;
		case iid.upgrade_rain_barrels:
			$("#inspector_title")	.html("Rain barrels");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_rain_barrels].cost.stringify());
			$("#inspector_text")	.html("Your back hurts from carrying so much water. Let mother nature do some of the work herself");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Auto-gather Water");
			break;
		case iid.upgrade_sprinkler:
			$("#inspector_title")	.html("Sprinkler");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_sprinkler].cost.stringify());
			$("#inspector_text")	.html("Attach a sprinkler system to your water tank to spray directly into the Chasm");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Auto-drop Water");
			break;
		case iid.upgrade_prospectors_tools:
			$("#inspector_title")	.html("Prospector's Tools");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_prospectors_tools].cost.stringify());
			$("#inspector_text")	.html("An old prospector offers to sell you a spare pickaxe and shovel so you can gather earth from a little bit deeper");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Small chance of gathering copper ore");
			break;

		// Achievements
		case iid.achievement_unknown:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unkown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.achievement_babys_first_block:
			if (chasm_achievements[aid.achievement_babys_first_block].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_babys_first_block.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Baby's First Block");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("You still remember dropping your first block into the Chasm... Things were simpler back then.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_babys_first_block.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Baby's First Block");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Drop 1 block of earth into the Chasm");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_reality_sprang_a_leak:
			if (chasm_achievements[aid.achievement_reality_sprang_a_leak].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_reality_sprang.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Reality Sprang a Leak");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Dropping things into the Chasm seems to release clouds of nothing. I'm pretty sure the universe isn't supposed to do that.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_reality_sprang.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Reality Sprang a Leak");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 1 total void particle");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_nothing_to_worry_about:
			if (chasm_achievements[aid.achievement_nothing_to_worry_about].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_nothing_to_worry_about.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Nothing to Worry About");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("How much nothing can there be, anyway?");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_nothing_to_worry_about.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Nothing to Worry About");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 100 total void particles");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_minor_case_of_wormhole:
			if (chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_minor_case_of_wormhole.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>A Minor Case of Wormhole");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Worms? In my hole??");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_minor_case_of_wormhole.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>A Minor Case of Wormhole");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 10,000 total void particles");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_eye_feel_extremely_unwell:
			if (chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_eye_feel_extremely_unwell.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Eye Feel Extremely Unwell");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("If you gaze long enough into the abyss... The abyss will sprout creepy eyes and wink at you.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_eye_feel_extremely_unwell.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Eye Feel Extremely Unwell");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 1,000,000 total void particles");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;

		// Clear
		case iid.none:
		default:
			$("#inspector_title")	.html("");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
	}

	current_inspector_id = id;
}