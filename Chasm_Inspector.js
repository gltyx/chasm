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
	currency_mass								= cid.currency_mass							+ this.offset_currency;
	currency_workers							= cid.currency_workers						+ this.offset_currency;

	offset_elements								= 0x0600;	// 0x06xx Start elements section
	element_earth 								= eid.element_earth							+ this.offset_elements;
	element_water 								= eid.element_water							+ this.offset_elements;
	element_coal								= eid.element_coal							+ this.offset_elements;
	element_copper								= eid.element_copper						+ this.offset_elements;
	element_iron								= eid.element_iron							+ this.offset_elements;
	element_fish								= eid.element_fish							+ this.offset_elements;

	offset_upgrades								= 0xa100;	// 0xa1xx Start upgrade section
	upgrade_earth_density_1 					= uid.upgrade_earth_density_1				+ this.offset_upgrades;
	upgrade_earth_density_2						= uid.upgrade_earth_density_2				+ this.offset_upgrades;
	upgrade_earth_density_3						= uid.upgrade_earth_density_3				+ this.offset_upgrades;
	upgrade_earth_density_4						= uid.upgrade_earth_density_4				+ this.offset_upgrades;
	upgrade_earth_density_5						= uid.upgrade_earth_density_5				+ this.offset_upgrades;
	upgrade_earth_value_1						= uid.upgrade_earth_value_1					+ this.offset_upgrades;
	upgrade_earth_metals_1						= uid.upgrade_earth_metals_1				+ this.offset_upgrades;
	upgrade_water_storage						= uid.upgrade_water_storage					+ this.offset_upgrades;
	upgrade_workers_1							= uid.upgrade_workers_1						+ this.offset_upgrades;

	offset_achievements							= 0xd100;	// 0xd1xx Start achievement section
	achievement_babys_first_block 				= aid.achievement_babys_first_block 		+ this.offset_achievements;
	achievement_reality_sprang_a_leak 			= aid.achievement_reality_sprang_a_leak 	+ this.offset_achievements;
	achievement_nothing_to_worry_about			= aid.achievement_nothing_to_worry_about 	+ this.offset_achievements;
	achievement_minor_case_of_wormhole			= aid.achievement_minor_case_of_wormhole 	+ this.offset_achievements;
	achievement_eye_feel_extremely_unwell		= aid.achievement_eye_feel_extremely_unwell + this.offset_achievements;
	achievement_unknown			 				= aid.achievement_count 					+ this.offset_achievements;

} var iid = new _INSPECTOR_ID();

function registerInspectorEvents() {
	$(".currency_particles").each(function(){	$(this).mouseenter(function(){showInspector(iid.currency_particles);});});
	$(".currency_strands").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_strands);});});
	$(".currency_spirit").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_spirit);});});
	$(".currency_soul").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_soul);});});
	$(".currency_mass").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_mass);});});
	$(".currency_workers").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_workers);});});

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
		case iid.currency_mass:
			$("#inspector_title")	.html(chasm_currency[cid.currency_mass].inspector_symbol + "Total Mass");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("You have kept a meticulous count of every bit of mass that has been dropped in the Chasm. How much more until it is satisfied?");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_workers:
			$("#inspector_title")	.html(chasm_currency[cid.currency_workers].inspector_symbol + "Workers");
			$("#inspector_cost")	.html("");
			if (chasm_currency[cid.currency_workers].resource.alltime.lte(1)) {
				$("#inspector_text")	.html("Labor makes the world go round.<br>Right now it's just you.");
			} else {
				$("#inspector_text")	.html("Labor makes the world go round.<br>The crew is busy filling up the Chasm.");
			}
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
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_coal:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_copper:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_iron:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.element_fish:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		
		// Upgrades
		case iid.upgrade_earth_density_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Steel-toed Boots");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_1].cost.stringify());
			$("#inspector_text")	.html("You can fit a lot more dirt into your storage with a few well-placed stomps");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_2:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Tamping Rod");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_2].cost.stringify());
			$("#inspector_text")	.html("A long stick with a flat metal plate at one end. The perfect tool for squishing dirt or less lethal jousting.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_3:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Trash Compactor");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_3].cost.stringify());
			$("#inspector_text")	.html("A repurposed trash compactor can smash earth into a dense cube. Ignore the stench and raccoons.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_4:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Macrosonic Agitator");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_4].cost.stringify());
			$("#inspector_text")	.html("A marvel of modern science. Vibrates the earth at incredible frequencies to squeeze out every last bit of empty space.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_5:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Gravity Well");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_5].cost.stringify());
			$("#inspector_text")	.html("A miniature black hole which can compact earth to a ridiculous degree. You can also say it ate your homework.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_value_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Dustbusting");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_value_1].cost.stringify());
			$("#inspector_text")	.html("By filtering out some of the lighter dust particles you can make your earth particles worth more.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+0.01 earth particle value");
			break;
		case iid.upgrade_earth_metals_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Surveying Tools");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_metals_1].cost.stringify());
			$("#inspector_text")	.html("A pickaxe, some charts, and a metal detector. Just barely better than guessing where metal ore deposits are in the ground.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Unlock the Surveying job");
			break;
		case iid.upgrade_water_storage:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Water storage");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_water_storage].cost.stringify());
			$("#inspector_text")	.html("Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first");
			$("#inspector_subtext")	.html("Unlock Water");
			$("#inspector_divider")	.css("display", "block");
			break;
		case iid.upgrade_workers_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Fringe Researcher");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_1].cost.stringify());
			$("#inspector_text")	.html("You know a guy who would be very interested in studying the exotic materials coming out of the Chasm. He is a bit of a conspiracy nut, but you can probably convince him to shovel dirt.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker");
			break;

		// Achievements
		case iid.achievement_unknown:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
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
				$("#inspector_text")	.html("Worms? In MY hole??");
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