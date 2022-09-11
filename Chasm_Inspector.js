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
	particles									= 0x0101;	// 0x01xx Start currency section
	strands										= 0x0102;
	spirit										= 0x0103;
	soul										= 0x0104;

	offset_elements								= 0x0600;	// 0x06xx Start elements section
	element_earth 								= eid.element_earth							+ this.offset_elements;
	element_water 								= eid.element_water							+ this.offset_elements;
	element_coal								= eid.element_coal							+ this.offset_elements;
	element_copper								= eid.element_copper						+ this.offset_elements;
	element_iron								= eid.element_iron							+ this.offset_elements;
	element_fish								= eid.element_fish							+ this.offset_elements;

	offset_upgrades								= 0xa100;	// 0xa1xx Start upgrade section
	upgrade_steel_toed_boots 					= 0xa101;
	upgrade_ant_farm							= 0xa102;
	upgrade_catapult							= 0xa103;
	upgrade_water_storage						= 0xa104;
	upgrade_rain_barrels						= 0xa105;
	upgrade_sprinkler							= 0xa106;

	offset_achivements							= 0xd100;	// 0xd1xx Start achievement section
	achievement_babys_first_block 				= aid.achievement_babys_first_block 		+ this.offset_achivements;
	achievement_reality_sprang_a_leak 			= aid.achievement_reality_sprang_a_leak 	+ this.offset_achivements;
	achievement_nothing_to_worry_about			= aid.achievement_nothing_to_worry_about 	+ this.offset_achivements;
	achievement_minor_case_of_wormhole			= aid.achievement_minor_case_of_wormhole 	+ this.offset_achivements;
	achievement_eye_feel_extremely_unwell		= aid.achievement_eye_feel_extremely_unwell + this.offset_achivements;
	achievement_unknown			 				= aid.achievement_count 					+ this.offset_achivements;

} var iid = new _INSPECTOR_ID();

function registerInspectorEvents() {
	$(".currency_particles")					.mouseenter(function(){showInspector(iid.particles);});
	$(".currency_strands")						.mouseenter(function(){showInspector(iid.strands);});
	$(".currency_spirit")						.mouseenter(function(){showInspector(iid.spirit);});
	$(".currency_soul")							.mouseenter(function(){showInspector(iid.soul);});

	$("#select_upgrade_steel_toed_boots")		.mouseenter(function(){showInspector(iid.upgrade_steel_toed_boots);});
	$("#select_upgrade_ant_farm")				.mouseenter(function(){showInspector(iid.upgrade_ant_farm);});
	$("#select_upgrade_catapult")				.mouseenter(function(){showInspector(iid.upgrade_catapult);});
	$("#select_upgrade_water_storage")			.mouseenter(function(){showInspector(iid.upgrade_water_storage);});
	$("#select_upgrade_rain_barrels")			.mouseenter(function(){showInspector(iid.upgrade_rain_barrels);});
	$("#select_upgrade_sprinkler")				.mouseenter(function(){showInspector(iid.upgrade_sprinkler);});

	$("#achievement_babys_first_block")			.mouseenter(function(){showInspector(iid.achievement_babys_first_block);});
	$("#achievement_reality_sprang_a_leak")		.mouseenter(function(){showInspector(iid.achievement_reality_sprang_a_leak);});
	$("#achievement_nothing_to_worry_about")	.mouseenter(function(){showInspector(iid.achievement_nothing_to_worry_about);});
	$("#achievement_minor_case_of_wormhole")	.mouseenter(function(){showInspector(iid.achievement_minor_case_of_wormhole);});
	$("#achievement_eye_feel_extremely_unwell")	.mouseenter(function(){showInspector(iid.achievement_eye_feel_extremely_unwell);});
}


var current_inspector_id = iid.none; // Saved id of current inspector panel. Used to redraw inspector.

var inspector_symbol_particles 	= "<i class = 'material-icons purple-text text-lighten-3 currency_icon'>blur_circular</i>";
var inspector_symbol_strands 	= "<i class = 'material-icons amber-text text-darken-1 currency_icon'>gesture</i>";
var inspector_symbol_spirit 	= "<i class = 'material-icons green-text text-lighten-2 currency_icon'>flare</i>";
var inspector_symbol_soul 		= "<i class = 'material-icons red-text text-lighten-2 currency_icon'>whatshot</i>";

function showInspector(id) {
	if (id != current_inspector_id) {
		let selector = $("#inspector_content");
		selector.stop().fadeTo(0, 0).fadeTo(300, 1);
	}
	switch(id) {
		// Currency
		case iid.particles:
			$("#inspector_title")	.html(inspector_symbol_particles + "Void Particles");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When matter is dropped into the Chasm, it releases small clouds of nothing. Our researchers say this is supposed to be impossible.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.strands:
			$("#inspector_title")	.html(inspector_symbol_strands + "Gravity Strands");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When dense matter is dropped into the Chasm, it releases gossamer strands of gravity. Our researchers say gravity has no carrying particle, but here it is.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.spirit:
			$("#inspector_title")	.html(inspector_symbol_spirit + "Spirit Sand");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When living matter is dropped into the Chasm, it sprays grains of silver-green sand. Our researchers are conivinced this sand has something to do with a metaphysical 'life-force'.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.soul:
			$("#inspector_title")	.html(inspector_symbol_soul + "Soul Shards");
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