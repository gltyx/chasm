// Chasm Inspector
	// The Inspector provides information for game elements that the user mouses over.
	// To add a new Inspector panel, do the following:
	//
	// 1. Add Inspector Id for this panel				[_INSPECTOR_ID]
	// 2. Register trigger event for this panel			[registerInspectorEvents]
	// 3. Add panel generation to inspector function	[showInspector]

class _INSPECTOR_ID {
	none 									= 0x0000;	// 0x0000 Clear inspector

	particles								= 0xa001;	// 0xa0xx Start currency section
	strands									= 0xa002;
	spirit									= 0xa003;
	soul									= 0xa004;

	upgrade_steel_toed_boots 				= 0xa101;	// 0xa1xx Start upgrade section
	upgrade_ant_farm						= 0xa102;
	upgrade_catapult						= 0xa103;
	upgrade_water_storage					= 0xa104;
	upgrade_rain_barrels					= 0xa105;
	upgrade_sprinkler						= 0xa106;

	achievement_unknown			 			= 0xd100;	// 0xd1xx Start achievement section
	achievement_babys_first_block 			= 0xd101;
	achievement_reality_sprang_a_leak 		= 0xd102;
} var iid = new _INSPECTOR_ID();

function registerInspectorEvents() {
	$(".currency_particles")				.mouseenter(function(){showInspector(iid.particles);});
	$(".currency_strands")					.mouseenter(function(){showInspector(iid.strands);});
	$(".currency_spirit")					.mouseenter(function(){showInspector(iid.spirit);});
	$(".currency_soul")						.mouseenter(function(){showInspector(iid.soul);});

	$("#select_upgrade_steel_toed_boots")	.mouseenter(function(){showInspector(iid.upgrade_steel_toed_boots);});
	$("#select_upgrade_ant_farm")			.mouseenter(function(){showInspector(iid.upgrade_ant_farm);});
	$("#select_upgrade_catapult")			.mouseenter(function(){showInspector(iid.upgrade_catapult);});
	$("#select_upgrade_water_storage")		.mouseenter(function(){showInspector(iid.upgrade_water_storage);});
	$("#select_upgrade_rain_barrels")		.mouseenter(function(){showInspector(iid.upgrade_rain_barrels);});
	$("#select_upgrade_sprinkler")			.mouseenter(function(){showInspector(iid.upgrade_sprinkler);});

	$("#achievement_babys_first_block")		.mouseenter(function(){showInspector(iid.achievement_babys_first_block);});
	$("#achievement_reality_sprang_a_leak")	.mouseenter(function(){showInspector(iid.achievement_reality_sprang_a_leak);});
}

var current_inspector_id = iid.none; // Saved id of current inspector panel. Used to redraw inspector.

var inspector_symbol_particles 	= "<i class = 'material-icons purple-text text-lighten-3 currency_icon'>blur_circular</i>";
var inspector_symbol_strands 	= "<i class = 'material-icons amber-text text-darken-1 currency_icon'>gesture</i>";
var inspector_symbol_spirit 	= "<i class = 'material-icons green-text text-lighten-2 currency_icon'>flare</i>";
var inspector_symbol_soul 		= "<i class = 'material-icons red-text text-lighten-2 currency_icon'>whatshot</i>";

function showInspector(id) {
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
			if (chasm_achievements[aid.achievement_babys_first_block]) {
				$("#inspector_title")	.html("Baby's First Block");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("You still remember dropping your first block into the Chasm... Things were simpler back then.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				showInspector(iid.achievement_unknown);
			}
			break;
		case iid.achievement_reality_sprang_a_leak:
			if (chasm_achievements[aid.achievement_reality_sprang_a_leak]) {
				$("#inspector_title")	.html("<img src = 'images/a_reality_sprang.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Reality Sprang a Leak");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Dropping things into the Chasm seems to release clouds of nothing. I'm pretty sure the universe isn't supposed to do that.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				showInspector(iid.achievement_unknown);
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