// Chasm Inspector
	// The Inspector provides information for game elements that the user mouses over.
	// To add a new Inspector panel, do the following:
	//
	// 1. Add Inspector Id for this panel				[_INSPECTOR_ID]
	// 2. Register trigger event for this panel			[registerInspectorEvents]
	// 3. Add panel generation to inspector function	[showInspector]

class _INSPECTOR_ID {
	none 				= 0x0000;		// 0x0000 Clear inspector
	steel_toed_boots 	= 0xa101;		// 0xa1xx Start upgrade section
	ant_farm			= 0xa102;
	catapult			= 0xa103;
	water_storage		= 0xa104;
	rain_barrels		= 0xa105;
	sprinkler			= 0xa106;
} var iid = new _INSPECTOR_ID();

function registerInspectorEvents() {
	$("#upgrade_steel_toed_boots")	.mouseenter(function(){showInspector(iid.steel_toed_boots);});
	$("#upgrade_ant_farm")			.mouseenter(function(){showInspector(iid.ant_farm);});
	$("#upgrade_catapult")			.mouseenter(function(){showInspector(iid.catapult);});
	$("#upgrade_water_storage")		.mouseenter(function(){showInspector(iid.water_storage);});
	$("#upgrade_rain_barrels")		.mouseenter(function(){showInspector(iid.rain_barrels);});
	$("#upgrade_sprinkler")			.mouseenter(function(){showInspector(iid.sprinkler);});
}

var current_inspector_id;

function showInspector(id) {
	switch(id) {
		case iid.steel_toed_boots:
			$("#inspector_title")	.html("Steel-toed Boots");
			$("#inspector_text")	.html("You can fit a lot more dirt into your storage with a few well-placed stomps");
			$("#inspector_cost")	.html(chasm_upgrades[uid.steel_toed_boots].cost.stringify());
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.ant_farm:
			$("#inspector_title")	.html("Ant farm");
			$("#inspector_text")	.html("These little guys can help you move mountains of earth... Very, very slowly");
			$("#inspector_cost")	.html(chasm_upgrades[uid.ant_farm].cost.stringify());
			$("#inspector_subtext")	.html("Auto-gather Earth");
			break;
		case iid.catapult:
			$("#inspector_title")	.html("Catapult");
			$("#inspector_text")	.html("Flinging dirt into the Chasm is a lot more fun than dumping it in by hand");
			$("#inspector_cost")	.html(chasm_upgrades[uid.catapult].cost.stringify());
			$("#inspector_subtext")	.html("Auto-drop Earth");
			break;
		case iid.water_storage:
			$("#inspector_title")	.html("Water storage");
			$("#inspector_text")	.html("Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first");
			$("#inspector_cost")	.html(chasm_upgrades[uid.water_storage].cost.stringify());
			$("#inspector_subtext")	.html("Unlock Water");
			break;
		case iid.rain_barrels:
			$("#inspector_title")	.html("Rain barrels");
			$("#inspector_text")	.html("Your back hurts from carrying so much water. Let mother nature do some of the work herself");
			$("#inspector_cost")	.html(chasm_upgrades[uid.rain_barrels].cost.stringify());
			$("#inspector_subtext")	.html("Auto-gather Water");
			break;
		case iid.sprinkler:
			$("#inspector_title")	.html("Sprinkler");
			$("#inspector_text")	.html("Attach a sprinkler system to your water tank to spray directly into the Chasm");
			$("#inspector_cost")	.html(chasm_upgrades[uid.sprinkler].cost.stringify());
			$("#inspector_subtext")	.html("Auto-drop Water");
			break;
		case iid.none:
		default:
			$("#inspector_title")	.html("");
			$("#inspector_text")	.html("");
			$("#inspector_cost")	.html("");
			$("#inspector_subtext")	.html("");
	}

	current_inspector_id = id;
}