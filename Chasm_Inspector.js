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
	currency_capital							= cid.currency_capital						+ this.offset_currency;
	currency_singularity						= cid.currency_singularity					+ this.offset_currency;
	currency_mass								= cid.currency_mass							+ this.offset_currency;
	currency_workers							= cid.currency_workers						+ this.offset_currency;
	currency_machinery							= cid.currency_machinery					+ this.offset_currency;

	offset_elements								= 0x0600;	// 0x06xx Start elements section
	element_earth 								= eid.element_earth							+ this.offset_elements;
	element_stone 								= eid.element_stone							+ this.offset_elements;
	element_coal								= eid.element_coal							+ this.offset_elements;
	element_copper								= eid.element_copper						+ this.offset_elements;
	element_iron								= eid.element_iron							+ this.offset_elements;
	element_lead								= eid.element_lead							+ this.offset_elements;
	element_gold								= eid.element_gold							+ this.offset_elements;
	element_fossil								= eid.element_fossil						+ this.offset_elements;
	element_emerald								= eid.element_emerald						+ this.offset_elements;
	element_sapphire							= eid.element_sapphire						+ this.offset_elements;
	element_ruby								= eid.element_ruby							+ this.offset_elements;
	element_diamond								= eid.element_diamond						+ this.offset_elements;
	element_magma								= eid.element_magma							+ this.offset_elements;
	element_water 								= eid.element_water							+ this.offset_elements;
	element_fish								= eid.element_fish							+ this.offset_elements;

	offset_upgrades								= 0xa100;	// 0xa1xx Start upgrade section
	upgrade_earth_density_1 					= uid.upgrade_earth_density_1				+ this.offset_upgrades;
	upgrade_earth_density_2						= uid.upgrade_earth_density_2				+ this.offset_upgrades;
	upgrade_earth_density_3						= uid.upgrade_earth_density_3				+ this.offset_upgrades;
	upgrade_earth_density_4						= uid.upgrade_earth_density_4				+ this.offset_upgrades;
	upgrade_earth_density_5						= uid.upgrade_earth_density_5				+ this.offset_upgrades;
	upgrade_earth_value_1						= uid.upgrade_earth_value_1					+ this.offset_upgrades;
	upgrade_earth_value_2						= uid.upgrade_earth_value_2					+ this.offset_upgrades;
	upgrade_earth_value_3						= uid.upgrade_earth_value_3					+ this.offset_upgrades;
	upgrade_earth_value_4						= uid.upgrade_earth_value_4					+ this.offset_upgrades;
	upgrade_earth_gather_speed_1				= uid.upgrade_earth_gather_speed_1			+ this.offset_upgrades;
	upgrade_earth_drop_speed_1					= uid.upgrade_earth_drop_speed_1			+ this.offset_upgrades;
	upgrade_earth_metals_1						= uid.upgrade_earth_metals_1				+ this.offset_upgrades;
	upgrade_earth_depth_1						= uid.upgrade_earth_depth_1					+ this.offset_upgrades;
	upgrade_earth_depth_2						= uid.upgrade_earth_depth_2					+ this.offset_upgrades;
	upgrade_earth_depth_3						= uid.upgrade_earth_depth_3					+ this.offset_upgrades;
	upgrade_earth_depth_4						= uid.upgrade_earth_depth_4					+ this.offset_upgrades;
	upgrade_earth_depth_5						= uid.upgrade_earth_depth_5					+ this.offset_upgrades;
	upgrade_earth_depth_6						= uid.upgrade_earth_depth_6					+ this.offset_upgrades;
	upgrade_earth_depth_7						= uid.upgrade_earth_depth_7					+ this.offset_upgrades;
	upgrade_mining_rig_1						= uid.upgrade_mining_rig_1					+ this.offset_upgrades;
	upgrade_water_storage						= uid.upgrade_water_storage					+ this.offset_upgrades;
	upgrade_workers_1							= uid.upgrade_workers_1						+ this.offset_upgrades;
	upgrade_workers_2							= uid.upgrade_workers_2						+ this.offset_upgrades;
	upgrade_workers_3							= uid.upgrade_workers_3						+ this.offset_upgrades;
	upgrade_workers_4							= uid.upgrade_workers_4						+ this.offset_upgrades;
	upgrade_workers_5							= uid.upgrade_workers_5						+ this.offset_upgrades;
	upgrade_workers_6							= uid.upgrade_workers_6						+ this.offset_upgrades;
	upgrade_workers_7							= uid.upgrade_workers_7						+ this.offset_upgrades;
	upgrade_workers_8							= uid.upgrade_workers_8						+ this.offset_upgrades;
	upgrade_workers_9							= uid.upgrade_workers_9						+ this.offset_upgrades;

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
	$(".currency_capital").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_capital);});});
	$(".currency_singularity").each(function(){	$(this).mouseenter(function(){showInspector(iid.currency_singularity);});});
	$(".currency_mass").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_mass);});});
	$(".currency_workers").each(function(){		$(this).mouseenter(function(){showInspector(iid.currency_workers);});});
	$(".currency_machinery").each(function(){	$(this).mouseenter(function(){showInspector(iid.currency_machinery);});});

	$(".element_earth_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_earth);});});
	$(".element_stone_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_stone);});});
	$(".element_coal_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_coal);});});
	$(".element_copper_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_copper);});});
	$(".element_iron_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_iron);});});
	$(".element_lead_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_lead);});});
	$(".element_gold_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_gold);});});
	$(".element_fossil_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_fossil);});});
	$(".element_emerald_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_emerald);});});
	$(".element_sapphire_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_sapphire);});});
	$(".element_ruby_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_ruby);});});
	$(".element_diamond_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_diamond);});});
	$(".element_magma_inspector").each(function(){$(this).mouseenter(function(){showInspector(iid.element_magma);});});

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
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When matter is dropped into the Chasm, it releases small clouds of nothing. Not nothing... Something? Something that is nothing.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_strands:
			$("#inspector_title")	.html(chasm_currency[cid.currency_strands].inspector_symbol + "Gravity Strands");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When dense matter is dropped into the Chasm, it releases gossamer strands of gravity. Our researchers say gravity has no carrying particle, but here it is.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_spirit:
			$("#inspector_title")	.html(chasm_currency[cid.currency_spirit].inspector_symbol + "Spirit Sand");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When living matter is dropped into the Chasm, it sprays grains of silver-green sand. Our researchers are convinced this sand has something to do with a metaphysical 'life-force'.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_soul:
			$("#inspector_title")	.html(chasm_currency[cid.currency_soul].inspector_symbol + "Pitfire");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When energy-rich matter is dropped into the Chasm, it belches sulpherous clouds of pitfire. Our researchers are using this as a super-dense fuel, and our daredevils are jumping over it for sick motorcycle stunts.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_capital:
			$("#inspector_title")	.html(chasm_currency[cid.currency_capital].inspector_symbol + "Anticapital");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("\"We, who pay dearly for every breath of pure, fresh air, must guard against the tendency to fetter the future. If we succeed in clearing the soil from the rubbish of the past and present, we will leave to posterity the greatest and safest heritages of all ages.\"<br><br>Our researchers seem to be feeling a bit revolutionary. You should probably put this somewhere out of the way before they seize it and establish a democratic mode of production.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_singularity:
			$("#inspector_title")	.html(chasm_currency[cid.currency_singularity].inspector_symbol + "Singularity Marbles");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("You found these at the bottom of the Chasm. Each marble contains enough matter to break the fundamental laws of the universe. They will allow you to build permanent structures in the Chasm, in the space between worlds.<br><br>You feel compelled to put the marbles in your mouth.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_mass:
			$("#inspector_title")	.html(chasm_currency[cid.currency_mass].inspector_symbol + "Total Mass");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("You have kept a meticulous count of every bit of mass that has been dropped in the Chasm. How much more until it is satisfied?");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_workers:
			$("#inspector_title")	.html(chasm_currency[cid.currency_workers].inspector_symbol + "Workers");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			if (chasm_currency[cid.currency_workers].resource.alltime.lte(1)) {
				$("#inspector_text")	.html("Labor makes the world go round.<br>Right now it's just you.");
			} else {
				$("#inspector_text")	.html("Labor makes the world go round.<br>The crew is busy filling up the Chasm.");
			}
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.currency_machinery:
			$("#inspector_title")	.html(chasm_currency[cid.currency_machinery].inspector_symbol + "Heavy Machinery");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("When you think about it, forklifts and front loaders are basically the same thing. And you are basically certified to operate a forklift. These things should help you with industrial construction.");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;

		// Elements
		case iid.element_earth:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_earth]++;
				$("#inspector_title")	.html(ElementSample(eid.element_earth) + "<div style = 'width: 6px;'></div>Dirt");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("The most readily available resource near the mouth of the Chasm. It doesn't seem to do anything special, but you sure can shovel a lot of it.");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Shallow earth gathering");
			}
			break;
		case iid.element_stone:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_stone]++;
				$("#inspector_title")	.html(ElementSample(eid.element_stone) + "<div style = 'width: 6px;'></div>Stone");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_coal:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_coal]++;
				$("#inspector_title")	.html(ElementSample(eid.element_coal) + "<div style = 'width: 6px;'></div>Coal");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_copper:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_copper]++;
				$("#inspector_title")	.html(ElementSample(eid.element_copper) + "<div style = 'width: 6px;'></div>Copper");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_iron:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_iron]++;
				$("#inspector_title")	.html(ElementSample(eid.element_iron) + "<div style = 'width: 6px;'></div>Iron");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_lead:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_lead]++;
				$("#inspector_title")	.html(ElementSample(eid.element_lead) + "<div style = 'width: 6px;'></div>Lead");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_gold:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_gold]++;
				$("#inspector_title")	.html(ElementSample(eid.element_gold) + "<div style = 'width: 6px;'></div>Gold");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_fossil:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_fossil]++;
				$("#inspector_title")	.html(ElementSample(eid.element_fossil) + "<div style = 'width: 6px;'></div>Fossil");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_emerald:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_emerald]++;
				$("#inspector_title")	.html(ElementSample(eid.element_emerald) + "<div style = 'width: 6px;'></div>Emerald");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_sapphire:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_sapphire]++;
				$("#inspector_title")	.html(ElementSample(eid.element_sapphire) + "<div style = 'width: 6px;'></div>Sapphire");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_ruby:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_ruby]++;
				$("#inspector_title")	.html(ElementSample(eid.element_ruby) + "<div style = 'width: 6px;'></div>Ruby");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_diamond:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_diamond]++;
				$("#inspector_title")	.html(ElementSample(eid.element_diamond) + "<div style = 'width: 6px;'></div>Diamond");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_magma:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_magma]++;
				$("#inspector_title")	.html(ElementSample(eid.element_magma) + "<div style = 'width: 6px;'></div>Magma");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Deep earth gathering");
			}
			break;
		case iid.element_water:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_water]++;
				$("#inspector_title")	.html(ElementSample(eid.element_water) + "<div style = 'width: 6px;'></div>Water");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Water gathering");
			}
			break;
		case iid.element_fish:
			{
				let element_count = new Array(eid.element_count);
				for (let i = 0; i < eid.element_count; i++) {
					element_count[i] = 0;
				}
				element_count[eid.element_fish]++;
				$("#inspector_title")	.html(ElementSample(eid.element_fish) + "<div style = 'width: 6px;'></div>Fish");
				$("#inspector_cost")	.css("display", "flex");
				$("#inspector_cost")	.html(stringifyValue(elementValue(element_count)));
				$("#inspector_text")	.html("");
				$("#inspector_divider")	.css("display", "block");
				$("#inspector_subtext")	.html("Source: Has a chance to spawn when water storage is full");
			}
			break;
		
		// Upgrades
		case iid.upgrade_earth_density_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Steel-toed Boots");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_1].cost.stringify());
			$("#inspector_text")	.html("You can fit a lot more dirt into your storage with a few well-placed stomps");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_2:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Tamping Rod");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_2].cost.stringify());
			$("#inspector_text")	.html("A long stick with a flat metal plate at one end. The perfect tool for squishing dirt or less lethal jousting.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_3:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Trash Compactor");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_3].cost.stringify());
			$("#inspector_text")	.html("A repurposed trash compactor can smash earth into a dense cube. Ignore the stench and raccoons.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_4:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Macrosonic Agitator");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_4].cost.stringify());
			$("#inspector_text")	.html("A marvel of modern science. Vibrates the earth at incredible frequencies to squeeze out every last bit of empty space.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_density_5:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Gravity Well");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_density_5].cost.stringify());
			$("#inspector_text")	.html("A miniature black hole which can compact earth to a ridiculous degree. You can also say it ate your homework.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("2x Earth density");
			break;
		case iid.upgrade_earth_value_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Dustbusting");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_value_1].cost.stringify());
			$("#inspector_text")	.html("By filtering out some of the lighter dust you can make your earth particles more valuable.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+100% earth particle value");
			break;
		case iid.upgrade_earth_value_2:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Industrial Waste Handling");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_value_2].cost.stringify());
			$("#inspector_text")	.html("Our operation is starting to produce a good amount of oily waste water... Might as well dump that stuff right into the ground!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+50% earth particle value<br>+100% copper particle value");
			break;
		case iid.upgrade_earth_value_3:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Heavy Metal Poisoning");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_value_3].cost.stringify());
			$("#inspector_text")	.html("Bad news, you all have symptoms of heavy metal poisoning. Good news, you can now find even heavier metals!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+50% metal particle value");
			break;
		case iid.upgrade_earth_value_4:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Marble Quarry");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_value_4].cost.stringify());
			$("#inspector_text")	.html("This is the perfect spot for finding greek statues, kitchen counters, or food for the unquenchable cosmic maw.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+30% stone particle value");
			break;
		case iid.upgrade_earth_gather_speed_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Shovel Lotion");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_gather_speed_1].cost.stringify());
			$("#inspector_text")	.html("Keeping your handle slippery helps to prevent blisters. It's shovel scented.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+25% earth gathering speed");
			break;
		case iid.upgrade_earth_drop_speed_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Pulley System");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_drop_speed_1].cost.stringify());
			$("#inspector_text")	.html("A pulley system is much better than the pushy system you were using before.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+20% earth dropping speed");
			break;
		case iid.upgrade_earth_metals_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Surveying Tools");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_metals_1].cost.stringify());
			$("#inspector_text")	.html("A pickaxe, some charts, and a metal detector. Just barely better than guessing where metal ore deposits are in the ground.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Unlock the Surveying job");
			break;
		case iid.upgrade_earth_depth_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_1].cost.stringify());
			$("#inspector_text")	.html("It feels a bit silly to dig next to the yawning mouth of the Chasm, but there's some really good stuff down there.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Unlock deep mining<br>+1 Heavy Machinery");
			break;
		case iid.upgrade_earth_depth_2:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Notarized Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_2].cost.stringify());
			$("#inspector_text")	.html("Your old mining permit was a bit... forged. This one should stand up to even moderate scrutiny!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_earth_depth_3:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Bloodpact Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_3].cost.stringify());
			$("#inspector_text")	.html("The Fringe Researcher insists that a document signed in blood will allow you to dig much deeper. That doesn't sound real, but you've got plenty of blood. Might as well try!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_earth_depth_4:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Double Notarized Bloodpact");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_1].cost.stringify());
			$("#inspector_text")	.html("This document is now so laden with ink, blood, and wax seals that it is barely legible. Your legal team is thrilled.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_earth_depth_5:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Royal Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_1].cost.stringify());
			$("#inspector_text")	.html("The Fringe Researcher has spent his free time tracing the lineage of the royal family who used to own the land around the Chasm. The heir is willing to sell you ancient land rights, for a price.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_earth_depth_6:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Deep Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_1].cost.stringify());
			$("#inspector_text")	.html("You had your lawyers add in a few clauses protecting you from any liability for \"accidental plate shattering, geo-terrorism, and/or volcanic armageddon\"");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_earth_depth_7 :
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Blessed Mining Rights");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_earth_depth_1].cost.stringify());
			$("#inspector_text")	.html("Apparently the only way to dig \"all the way to Hell\" is to get your documentation blessed. Luckily, the Intern's uncle is a priest, and he is willing to do it on the cheap.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("max depth +1");
			break;
		case iid.upgrade_mining_rig_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>There Will Be Dirt");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_mining_rig_1].cost.stringify());
			$("#inspector_text")	.html("This giant industrial mining rig will speed up your gathering as long as you keep it fueled. Hopefully unrelenting greed won't result in your ultimate downfall. I drink your milkshake!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("Unlock the Mining Rig");
			break;
		case iid.upgrade_water_storage:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Water storage");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_water_storage].cost.stringify());
			$("#inspector_text")	.html("Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first");
			$("#inspector_subtext")	.html("Unlock Water");
			$("#inspector_divider")	.css("display", "block");
			break;
		case iid.upgrade_workers_1:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Fringe Researcher");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_1].cost.stringify());
			$("#inspector_text")	.html("You know a guy who would be very interested in studying the exotic materials coming out of the Chasm. He is a bit of a conspiracy nut, but you can probably convince him to shovel dirt.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker");
			break;
		case iid.upgrade_workers_2:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Internship Program");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_2].cost.stringify());
			$("#inspector_text")	.html("Filling the Chasm is exhausting—just get a college student to do it. All the labor of an employee with none of the pay!");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker");
			break;
		case iid.upgrade_workers_3:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Gig Worker");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_3].cost.stringify());
			$("#inspector_text")	.html("You found an app where you can hire manual labor for cheap! Hopefully the regulators don't catch on.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker");
			break;
		case iid.upgrade_workers_4:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Old Timey Prospector");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_4].cost.stringify());
			$("#inspector_text")	.html("This old coot is willing to help you fill the Chasm, but first you must prove that there is ore in them there hills.");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker");
			break;
		case iid.upgrade_workers_5:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Creepy Twins");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_5].cost.stringify());
			$("#inspector_text")	.html("The Fringe Researcher has reported a pair of creepy children haunting the dark corners of the worksite... Is it even child labor if the children are ghosts?");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+2 Workers");
			break;
		case iid.upgrade_workers_6:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>HR Department");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_6].cost.stringify());
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker<br>+10% Worker Efficiency");
			break;
		case iid.upgrade_workers_7:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Survey Crew");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_7].cost.stringify());
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+2 Workers<br>+50% Survey Efficiency");
			break;
		case iid.upgrade_workers_8:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Monocle Guy");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_8].cost.stringify());
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker<br>+20% Jewel Value");
			break;
		case iid.upgrade_workers_9:
			$("#inspector_title")	.html("<img src = '" + chasm_upgrades[id - iid.offset_upgrades].upgrade_image + "' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Jackhammer Jockey");
			$("#inspector_cost")	.css("display", "flex");
			$("#inspector_cost")	.html(chasm_upgrades[uid.upgrade_workers_9].cost.stringify());
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "block");
			$("#inspector_subtext")	.html("+1 Worker<br>+10% Earth Gather Speed");
			break;

		// Achievements
		case iid.achievement_unknown:
			$("#inspector_title")	.html("???");
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("Achievement unknown");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
			break;
		case iid.achievement_babys_first_block:
			if (chasm_achievements[aid.achievement_babys_first_block].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_babys_first_block.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Baby's First Block");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("You still remember dropping your first block into the Chasm... Things were simpler back then.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_babys_first_block.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Baby's First Block");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Drop 1 block of earth into the Chasm");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_reality_sprang_a_leak:
			if (chasm_achievements[aid.achievement_reality_sprang_a_leak].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_reality_sprang.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Reality Sprang a Leak");
				$("#inspector_cost")	.css("display", "none");
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
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("How much nothing can there be, anyway?");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_nothing_to_worry_about.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Nothing to Worry About");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 100 total void particles");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_minor_case_of_wormhole:
			if (chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_minor_case_of_wormhole.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>A Minor Case of Wormhole");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Worms? In MY hole??");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_minor_case_of_wormhole.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>A Minor Case of Wormhole");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("Collect 10,000 total void particles");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			}
			break;
		case iid.achievement_eye_feel_extremely_unwell:
			if (chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
				$("#inspector_title")	.html("<img src = 'images/a_eye_feel_extremely_unwell.png' class = 'pixelart' width = '25' height = '25' style = 'margin-right: 6px;'>Eye Feel Extremely Unwell");
				$("#inspector_cost")	.css("display", "none");
				$("#inspector_cost")	.html("");
				$("#inspector_text")	.html("If you gaze long enough into the abyss... The abyss will sprout creepy eyes and wink at you.");
				$("#inspector_divider")	.css("display", "none");
				$("#inspector_subtext")	.html("");
			} else {
				$("#inspector_title")	.html("<img src = 'images/a_eye_feel_extremely_unwell.png' class = 'pixelart locked_tile' width = '25' height = '25' style = 'margin-right: 6px;'>Eye Feel Extremely Unwell");
				$("#inspector_cost")	.css("display", "none");
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
			$("#inspector_cost")	.css("display", "none");
			$("#inspector_cost")	.html("");
			$("#inspector_text")	.html("");
			$("#inspector_divider")	.css("display", "none");
			$("#inspector_subtext")	.html("");
	}

	current_inspector_id = id;
	let inspector_height = "-=" + $("#inspector_box").height() + "px";
	$("#log_box").css("height", "100%").css("height", "-=49px").css("height", inspector_height);
}