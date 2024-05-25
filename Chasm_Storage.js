// Storage canvas w/h must be in the set {2^x} for (x >= 0)
//	x 	=	0		1		2		3		4		5		6		7		8		9
//	w/h =	1		2		4		8		16		32		64		128		256		512
var STORAGE_CANVAS_BORDER_OFFSET = 1;
var STORAGE_CANVAS_W_DEFAULT = 64;
var STORAGE_CANVAS_H_DEFAULT = 64;

var STORAGE_FLAGS_EARTH = 1 << 0;
var STORAGE_FLAGS_WATER = 1 << 1;

// Resource Initialization
var earth;
var water;

class _STORAGE_ID {
	storage_first		= 0x0000;

	// Storage list
	storage_earth 		= 0x0000;
	storage_water 		= 0x0001;

	storage_count		= 0x0002;
} var sid = new _STORAGE_ID();

var chasm_storage = new Array(sid.storage_count);

class _ELEMENT_ID {
	element_first		= 0x0000;

	// Element list
	element_none 		= 0x0000;
	element_earth 		= 0x0001;
	element_stone 		= 0x0002;
	element_coal		= 0x0003;
	element_copper		= 0x0004;
	element_iron		= 0x0005;
	element_lead		= 0x0006;
	element_gold		= 0x0007;
	element_fossil		= 0x0008;
	element_emerald		= 0x0009;
	element_sapphire	= 0x000a;
	element_ruby		= 0x000b;
	element_diamond		= 0x000c;
	element_magma		= 0x000d;
	element_water 		= 0x000e;
	element_slime		= 0x000f;
	element_oil 		= 0x0010;
	element_helium		= 0x0011;
	element_fish		= 0x0012;

	element_count		= 0x0013;
} var eid = new _ELEMENT_ID();

class ELEMENT_PROBABILITY {
	// Element list
	element_none 		= 0;
	element_earth 		= 0;
	element_stone 		= 0;
	element_coal		= 0;
	element_copper		= 0;
	element_iron		= 0;
	element_lead		= 0;
	element_gold		= 0;
	element_fossil		= 0;
	element_emerald		= 0;
	element_sapphire	= 0;
	element_ruby		= 0;
	element_diamond		= 0;
	element_magma		= 0;
	element_water 		= 0;
	element_slime 		= 0;
	element_oil 		= 0;
	element_helium 		= 0;
	element_fish		= 0;

	zero() {
		this.element_none 		= 0;
		this.element_earth 		= 0;
		this.element_stone 		= 0;
		this.element_coal 		= 0;
		this.element_copper 	= 0;
		this.element_iron 		= 0;
		this.element_lead		= 0;
		this.element_gold 		= 0;
		this.element_fossil 	= 0;
		this.element_emerald 	= 0;
		this.element_sapphire 	= 0;
		this.element_ruby 		= 0;
		this.element_diamond 	= 0;
		this.element_magma 		= 0;
		this.element_water 		= 0;
		this.element_slime 		= 0;
		this.element_oil 		= 0;
		this.element_helium 	= 0;
		this.element_fish 		= 0;
	}

	refresh(storage_flags) {
		this.zero();
		var portion = 1000;

		function srvb(target, slope) {
			// Survey bias
			let effective_workers = chasm_storage[sid.storage_earth].workers_survey;
			if (chasm_upgrades[uid.upgrade_singularity_survey_1].unlocked) {
				effective_workers += 1;
			}
			if (chasm_upgrades[uid.upgrade_workers_6].unlocked) {
				effective_workers = effective_workers * 1.1;
			}
			if (chasm_upgrades[uid.upgrade_workers_7].unlocked) {
				effective_workers = effective_workers * 1.5;
			}
			if (chasm_upgrades[uid.upgrade_singularity_workers_6].unlocked) {
				effective_workers = effective_workers * 1.1;
			}
			return Math.floor(target - (target * (1 / Math.pow(1 + effective_workers, slope))));
		}

		if (storage_flags & STORAGE_FLAGS_EARTH) {
			let depth = chasm_storage[sid.storage_earth].machinery_depth;

			// Diamond chance bias
			let dcb = 0;
			if (chasm_upgrades[uid.upgrade_earth_chance_5].unlocked) dcb += 1;

			// Ruby chance bias
			let rcb = 0;
			if (chasm_upgrades[uid.upgrade_singularity_survey_2].unlocked) rcb += 1;

			// Sapphire chance bias
			let scb = 0;
			if (chasm_upgrades[uid.upgrade_singularity_survey_2].unlocked) scb += 5;

			// Emerald chance bias
			let ecb = 0;
			if (chasm_upgrades[uid.upgrade_earth_chance_1].unlocked) ecb += 20;
			if (chasm_upgrades[uid.upgrade_singularity_survey_2].unlocked) ecb += 10;

			// Copper chance bias
			let ccb = 0;
			if (chasm_upgrades[uid.upgrade_earth_chance_2].unlocked) ccb += 20;

			// Coal chance bias
			let clb = 0;
			if (chasm_upgrades[uid.upgrade_earth_chance_3].unlocked) clb += 5;

			// Sink bias
			let sib = 0;
			if (chasm_upgrades[uid.upgrade_earth_chance_4].unlocked) sib += 0.05;

			//						| Depth 0					| Depth 1					| Depth 2						| Depth 3					| Depth 4					| Depth 5						| Depth 6					| Depth 7
			const p_magma = [		0,							0,							0,								0,							0,							0,								0,							445 + srvb(300, 0.2)		];
			const p_diamond = [		0,							0 + dcb,					0 + dcb,						1 + dcb,					4  + srvb(20, 0.1) + dcb,	20  + srvb(50, 0.15) + dcb,		30  + srvb(60, 0.15) + dcb,	50  + srvb(140, 0.15) + dcb	];
			const p_ruby = [		0,							0,							1 + rcb,						4   + srvb(10, 0.1) + rcb,	20 + srvb(50, 0.1) + rcb,	30  + srvb(80, 0.15) + rcb,		50  + srvb(90, 0.15) + rcb,	0							];
			const p_sapphire = [	0,							0,							3 + scb,						10  + srvb(20, 0.1) + scb,	30 + srvb(80, 0.15) + scb,	20  + srvb(50, 0.2) + scb,		5   + srvb(35, 0.15) + scb,	0							];
			const p_emerald = [		0,							5 + srvb(30, 0.2) + ecb,	6 + srvb(40, 0.15) + ecb,		20  + srvb(40, 0.15) + ecb,	10 + srvb(30, 0.15) + ecb,	5   + srvb(40, 0.2) + ecb,		0,							0							];
			const p_fossil = [		0,							0,							0,								0  + srvb(20, 0.25),		0 + srvb(40, 0.25),			0 + srvb(80, 0.25),				30  + srvb(90, 0.25),		0							];
			const p_gold = [		0,							0,							0,								2,							8  + srvb(30, 0.15),		40  + srvb(80, 0.15),			100 + srvb(140, 0.15),		0							];
			const p_lead = [		0,							0,							0,								10  + srvb(10, 0.1),		40 + srvb(10, 0.1),			80  + srvb(60, 0.1),			30  + srvb(45, 0.1),		0							];
			const p_iron = [		0,							0,							30  + srvb(70, 0.1),			50  + srvb(120, 0.15),		90 + srvb(200, 0.15),		30  + srvb(70, 0.2),			0,							0							];
			const p_copper = [		0 + srvb(250, 0.2) + ccb,	30 + srvb(250, 0.2) + ccb,	80 + srvb(300, 0.15) + ccb,		80 + srvb(200, 0.2) + ccb,	0,							0,								0,							0							];
			const p_coal = [		0,							0,							5 + clb,						20  + srvb(50, 0.15) + clb,	50 + srvb(100, 0.15) + clb,	55  + srvb(170, 0.15) + clb,	60  + srvb(200, 0.2) + clb,	0							];
			const sink_split = [	0 + sib,					0.1 + sib,					0.25 + sib,						0.45 + sib,					0.70 + sib,					0.80 + sib,						1,							1							];

			this.element_magma 		+= p_magma[depth];
			portion 				-= p_magma[depth];
			
			this.element_diamond 	+= p_diamond[depth];
			portion 				-= p_diamond[depth];
			
			this.element_ruby 		+= p_ruby[depth];
			portion 				-= p_ruby[depth];
			
			this.element_sapphire	+= p_sapphire[depth];
			portion 				-= p_sapphire[depth];
			
			this.element_emerald	+= p_emerald[depth];
			portion 				-= p_emerald[depth];
			
			this.element_fossil 	+= p_fossil[depth];
			portion 				-= p_fossil[depth];

			this.element_gold 		+= p_gold[depth];
			portion 				-= p_gold[depth];

			this.element_lead 		+= p_lead[depth];
			portion 				-= p_lead[depth];

			this.element_iron 		+= p_iron[depth];
			portion 				-= p_iron[depth];

			this.element_copper 	+= p_copper[depth];
			portion 				-= p_copper[depth];

			this.element_coal 		+= p_coal[depth];
			portion 				-= p_coal[depth];

			this.element_stone 		+= portion * sink_split[depth];
			portion 				-= portion * sink_split[depth];

			this.element_earth 		= portion;

			this.display(storage_flags);
		}

		else if (storage_flags & STORAGE_FLAGS_WATER) {
			let depth = chasm_storage[sid.storage_water].machinery_depth;

			//						| Depth 0	| Depth 1	| Depth 2	| Depth 3	| Depth 4	| Depth 5	| Depth 6	| Depth 7
			const p_water = 	[	1000,		1000,		1000,		1000,		0,			0,			0,			0		];
			const p_slime = 	[	0,			0,			0,			0,			1000,		0,			0,			0		];
			const p_oil = 		[	0,			0,			0,			0,			0,			1000,		0,			0		];
			const p_helium = 	[	0,			0,			0,			0,			0,			0,			1000,		0		];
			const p_magma_2 =	[	0,			0,			0,			0,			0,			0,			0,			1000	];

			this.element_water 	+= p_water[depth];
			portion 			-= p_water[depth];

			this.element_slime 	+= p_slime[depth];
			portion 			-= p_slime[depth];

			this.element_oil 	+= p_oil[depth];
			portion 			-= p_oil[depth];

			this.element_helium += p_helium[depth];
			portion 			-= p_helium[depth];

			this.element_magma 	+= p_magma_2[depth];
			portion 			-= p_magma_2[depth];

			this.display(storage_flags);
		}
	}

	display(storage_flags) {
		if (storage_flags & STORAGE_FLAGS_EARTH) {
			var out = "";
			out	= "<div style = 'display: block;'>";
			out	+= "<div class = 'vertcenter element_earth' style = 'display: flex;'>" + ElementSample(eid.element_earth) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Dirt:</p></div>";
			out	+= "<div class = 'vertcenter element_stone' style = 'display: flex;'>" + ElementSample(eid.element_stone) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Stone:</p></div>";
			out	+= "<div class = 'vertcenter element_coal' style = 'display: flex;'>" + ElementSample(eid.element_coal) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Coal:</p></div>";
			out	+= "<div class = 'vertcenter element_copper' style = 'display: flex;'>" + ElementSample(eid.element_copper) 	+ "<p style = 'font-size: 12px; padding-left: 4px;'>Copper:</p></div>";
			out	+= "<div class = 'vertcenter element_iron' style = 'display: flex;'>" + ElementSample(eid.element_iron) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Iron:</p></div>";
			out	+= "<div class = 'vertcenter element_lead' style = 'display: flex;'>" + ElementSample(eid.element_lead) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Lead:</p></div>";
			out	+= "<div class = 'vertcenter element_gold' style = 'display: flex;'>" + ElementSample(eid.element_gold) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Gold:</p></div>";
			out	+= "<div class = 'vertcenter element_fossil' style = 'display: flex;'>" + ElementSample(eid.element_fossil) 	+ "<p style = 'font-size: 12px; padding-left: 4px;'>Fossil:</p></div>";
			out	+= "<div class = 'vertcenter element_emerald' style = 'display: flex;'>" + ElementSample(eid.element_emerald) 	+ "<p style = 'font-size: 12px; padding-left: 4px;'>Emerald:</p></div>";
			out	+= "<div class = 'vertcenter element_sapphire' style = 'display: flex;'>" + ElementSample(eid.element_sapphire) + "<p style = 'font-size: 12px; padding-left: 4px;'>Sapphire:</p></div>";
			out	+= "<div class = 'vertcenter element_ruby' style = 'display: flex;'>" + ElementSample(eid.element_ruby) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Ruby:</p></div>";
			out	+= "<div class = 'vertcenter element_diamond' style = 'display: flex;'>" + ElementSample(eid.element_diamond) 	+ "<p style = 'font-size: 12px; padding-left: 4px;'>Diamond:</p></div>";
			out	+= "<div class = 'vertcenter element_magma' style = 'display: flex;'>" + ElementSample(eid.element_magma) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Magma:</p></div>";
			out	+= "</div>";

			out	+= "<div style = 'display: block; text-align: right; width: 100%;'>";
			if (this.element_earth <= 0) {
				out += "<p class = 'element_earth' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_earth' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_earth / 10, 1) 		+ "%</p>";
			}
			if (this.element_stone <= 0) {
				out	+= "<p class = 'element_stone' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_stone' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_stone / 10, 1) 		+ "%</p>";
			}
			if (this.element_coal <= 0) {
				out	+= "<p class = 'element_coal' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_coal' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_coal / 10, 1) 		+ "%</p>";
			}
			if (this.element_copper <= 0) {
				out	+= "<p class = 'element_copper' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_copper' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_copper / 10, 1) 		+ "%</p>";
			}
			if (this.element_iron <= 0) {
				out	+= "<p class = 'element_iron' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_iron' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_iron / 10, 1) 		+ "%</p>";
			}
			if (this.element_lead <= 0) {
				out	+= "<p class = 'element_lead' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_lead' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_lead / 10, 1) 		+ "%</p>";
			}
			if (this.element_gold <= 0) {
				out	+= "<p class = 'element_gold' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_gold' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_gold / 10, 1) 		+ "%</p>";
			}
			if (this.element_fossil <= 0) {
				out	+= "<p class = 'element_fossil' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_fossil' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_fossil / 10, 1) 		+ "%</p>";
			}
			if (this.element_emerald <= 0) {
				out	+= "<p class = 'element_emerald' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_emerald' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_emerald / 10, 1) 	+ "%</p>";
			}
			if (this.element_sapphire <= 0) {
				out	+= "<p class = 'element_sapphire' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_sapphire' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_sapphire / 10, 1) 	+ "%</p>";
			}
			if (this.element_ruby <= 0) {
				out	+= "<p class = 'element_ruby' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_ruby' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_ruby / 10, 1) 		+ "%</p>";
			}
			if (this.element_diamond <= 0) {
				out	+= "<p class = 'element_diamond' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_diamond' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_diamond / 10, 1) 	+ "%</p>";
			}
			if (this.element_magma <= 0) {
				out	+= "<p class = 'element_magma' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out	+= "<p class = 'element_magma' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_magma / 10, 1) 		+ "%</p>";
			}
			out	+= "</div>";

			$("#earth_survey_menu").html(out);
			
			$(".element_earth").each(function(){$(this).mouseenter(function(){showInspector(iid.element_earth);});});
			$(".element_stone").each(function(){$(this).mouseenter(function(){showInspector(iid.element_stone);});});
			$(".element_coal").each(function(){$(this).mouseenter(function(){showInspector(iid.element_coal);});});
			$(".element_copper").each(function(){$(this).mouseenter(function(){showInspector(iid.element_copper);});});
			$(".element_iron").each(function(){$(this).mouseenter(function(){showInspector(iid.element_iron);});});
			$(".element_lead").each(function(){$(this).mouseenter(function(){showInspector(iid.element_lead);});});
			$(".element_gold").each(function(){$(this).mouseenter(function(){showInspector(iid.element_gold);});});
			$(".element_fossil").each(function(){$(this).mouseenter(function(){showInspector(iid.element_fossil);});});
			$(".element_emerald").each(function(){$(this).mouseenter(function(){showInspector(iid.element_emerald);});});
			$(".element_sapphire").each(function(){$(this).mouseenter(function(){showInspector(iid.element_sapphire);});});
			$(".element_ruby").each(function(){$(this).mouseenter(function(){showInspector(iid.element_ruby);});});
			$(".element_diamond").each(function(){$(this).mouseenter(function(){showInspector(iid.element_diamond);});});
			$(".element_magma").each(function(){$(this).mouseenter(function(){showInspector(iid.element_magma);});});
		}

		else if (storage_flags & STORAGE_FLAGS_WATER) {
			var out = "";
			out += "<div style = 'display: flex;'>";
			out	+= "<div style = 'display: block;'>";
			out	+= "<div class = 'vertcenter element_water' style = 'display: flex;'>" 	+ ElementSample(eid.element_water) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Water:</p></div>";
			out	+= "<div class = 'vertcenter element_slime' style = 'display: flex;'>" 	+ ElementSample(eid.element_slime) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Slime:</p></div>";
			out	+= "<div class = 'vertcenter element_oil' style = 'display: flex;'>" 	+ ElementSample(eid.element_oil) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Oil:</p></div>";
			out	+= "<div class = 'vertcenter element_helium' style = 'display: flex;'>" + ElementSample(eid.element_helium) 	+ "<p style = 'font-size: 12px; padding-left: 4px;'>Helium:</p></div>";
			out	+= "<div class = 'vertcenter element_magma_2' style = 'display: flex;'>"+ ElementSample(eid.element_magma) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Magma:</p></div>";
			out	+= "</div>";

			out	+= "<div style = 'display: block; text-align: right; width: 100%;'>";
			if (this.element_water <= 0) {
				out += "<p class = 'element_water' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_water' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_water / 10, 1) 		+ "%</p>";
			}
			if (this.element_slime <= 0) {
				out += "<p class = 'element_slime' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_slime' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_slime / 10, 1) 		+ "%</p>";
			}
			if (this.element_oil <= 0) {
				out += "<p class = 'element_oil' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_oil' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_oil / 10, 1) 		+ "%</p>";
			}
			if (this.element_helium <= 0) {
				out += "<p class = 'element_helium' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_helium' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_helium / 10, 1) 		+ "%</p>";
			}
			if (this.element_magma <= 0) {
				out += "<p class = 'element_magma_2' 	style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_magma_2' 	style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_magma / 10, 1) 		+ "%</p>";
			}

			out	+= "</div>";
			out	+= "</div>";

			out += "<hr>";

			out += "<div style = 'display: flex;'>";
			out	+= "<div style = 'display: block;'>";
			out	+= "<div class = 'vertcenter element_fish' style = 'display: flex;'>" 	+ ElementSample(eid.element_fish) 		+ "<p style = 'font-size: 12px; padding-left: 4px;'>Fish:</p></div>";
			out	+= "</div>";

			out	+= "<div style = 'display: block; text-align: right; width: 100%;'>";
			if (this.element_fish <= 0) {
				out += "<p class = 'element_fish' 		style = 'font-size: 12px;'>-</p>";
			} else {
				out += "<p class = 'element_fish' 		style = 'font-size: 12px;'>" + DisplayNumberFormatter(this.element_fish / 10, 1) 		+ "%</p>";
			}

			out	+= "</div>";
			out	+= "</div>";

			$("#water_survey_menu").html(out);

			$(".element_water").each(function(){$(this).mouseenter(function(){showInspector(iid.element_water);});});
			$(".element_slime").each(function(){$(this).mouseenter(function(){showInspector(iid.element_slime);});});
			$(".element_oil").each(function(){$(this).mouseenter(function(){showInspector(iid.element_oil);});});
			$(".element_helium").each(function(){$(this).mouseenter(function(){showInspector(iid.element_helium);});});
			$(".element_magma_2").each(function(){$(this).mouseenter(function(){showInspector(iid.element_magma);});});
			$(".element_fish").each(function(){$(this).mouseenter(function(){showInspector(iid.element_fish);});});
		}
	}

	roll(storage_flags) {
		var portion = 1000;
		var roll = Math.floor(Math.random() * 1000);

		if (storage_flags & STORAGE_FLAGS_EARTH) {
			if (roll >= portion - this.element_magma) {
				return eid.element_magma;
			} else {
				portion -= this.element_magma;
			}

			if (roll >= portion - this.element_diamond) {
				return eid.element_diamond;
			} else {
				portion -= this.element_diamond;
			}

			if (roll >= portion - this.element_ruby) {
				return eid.element_ruby;
			} else {
				portion -= this.element_ruby;
			}

			if (roll >= portion - this.element_sapphire) {
				return eid.element_sapphire;
			} else {
				portion -= this.element_sapphire;
			}

			if (roll >= portion - this.element_emerald) {
				return eid.element_emerald;
			} else {
				portion -= this.element_emerald;
			}

			if (roll >= portion - this.element_fossil) {
				return eid.element_fossil;
			} else {
				portion -= this.element_fossil;
			}

			if (roll >= portion - this.element_gold) {
				return eid.element_gold;
			} else {
				portion -= this.element_gold;
			}

			if (roll >= portion - this.element_lead) {
				return eid.element_lead;
			} else {
				portion -= this.element_lead;
			}

			if (roll >= portion - this.element_iron) {
				return eid.element_iron;
			} else {
				portion -= this.element_iron;
			}

			if (roll >= portion - this.element_copper) {
				return eid.element_copper;
			} else {
				portion -= this.element_copper;
			}

			if (roll >= portion - this.element_coal) {
				return eid.element_coal;
			} else {
				portion -= this.element_coal;
			}

			if (roll >= portion - this.element_stone) {
				return eid.element_stone;
			} else {
				portion -= this.element_stone;
			}

			return eid.element_earth;
		}

		else if (storage_flags & STORAGE_FLAGS_WATER) {
			if (roll >= portion - this.element_water) {
				return eid.element_water;
			} else {
				portion -= this.element_water;
			}

			if (roll >= portion - this.element_slime) {
				return eid.element_slime;
			} else {
				portion -= this.element_slime;
			}

			if (roll >= portion - this.element_oil) {
				return eid.element_oil;
			} else {
				portion -= this.element_oil;
			}

			if (roll >= portion - this.element_helium) {
				return eid.element_helium;
			} else {
				portion -= this.element_helium;
			}

			if (roll >= portion - this.element_magma) {
				return eid.element_magma;
			} else {
				portion -= this.element_magma;
			}

			return eid.element_water;
		}
	}
}

function initStorage() {
	earth = new chasm_resource_small("earth");
	earth.option_unlocked = true;
	earth.option_cap = true;

	water = new chasm_resource_small("water");
	water.option_unlocked = true;
	water.option_cap = true;

	for (let i = 0; i < sid.storage_count; i++) {
		switch (i) {
			case sid.storage_earth:
				chasm_storage[i] = new resource_storage("storage_earth", earth);
				chasm_storage[i].storage_flags |= STORAGE_FLAGS_EARTH;
				chasm_storage[i].brick_w = 32;
				chasm_storage[i].brick_h = 32;
				earth.setCap((chasm_storage[i].canvas_w * chasm_storage[i].canvas_h) / (chasm_storage[i].brick_w * chasm_storage[i].brick_h));
				chasm_storage[i].gather_dom = "#earth_workers_gather";
				chasm_storage[i].drop_dom 	= "#earth_workers_drop";
				chasm_storage[i].survey_dom = "#earth_workers_survey";
				chasm_storage[i].depth_dom = "#earth_machinery_depth";
				break;

			case sid.storage_water:
				chasm_storage[i] = new resource_storage("storage_water", water);
				chasm_storage[i].storage_flags |= STORAGE_FLAGS_WATER;
				chasm_storage[i].brick_w = 64;
				chasm_storage[i].brick_h = 1;
				water.setCap((chasm_storage[i].canvas_w * chasm_storage[i].canvas_h) / (chasm_storage[i].brick_w * chasm_storage[i].brick_h));
				chasm_storage[i].gather_dom = "#water_workers_gather";
				chasm_storage[i].drop_dom = "#water_workers_drop";
				chasm_storage[i].depth_dom = "#water_machinery_depth";
				break;

			default:
		}
	}
}

function initStorageDisplay() {
	$("#element_earth_earth_sample").html(ElementSample(eid.element_earth));
	$("#element_earth_stone_sample").html(ElementSample(eid.element_stone));
	$("#element_earth_coal_sample").html(ElementSample(eid.element_coal));
	$("#element_earth_copper_sample").html(ElementSample(eid.element_copper));
	$("#element_earth_iron_sample").html(ElementSample(eid.element_iron));
	$("#element_earth_lead_sample").html(ElementSample(eid.element_lead));
	$("#element_earth_gold_sample").html(ElementSample(eid.element_gold));
	$("#element_earth_fossil_sample").html(ElementSample(eid.element_fossil));
	$("#element_earth_emerald_sample").html(ElementSample(eid.element_emerald));
	$("#element_earth_sapphire_sample").html(ElementSample(eid.element_sapphire));
	$("#element_earth_ruby_sample").html(ElementSample(eid.element_ruby));
	$("#element_earth_diamond_sample").html(ElementSample(eid.element_diamond));
	$("#element_earth_magma_sample").html(ElementSample(eid.element_magma));
	$("#element_water_water_sample").html(ElementSample(eid.element_water));
	$("#element_water_slime_sample").html(ElementSample(eid.element_slime));
	$("#element_water_oil_sample").html(ElementSample(eid.element_oil));
	$("#element_water_helium_sample").html(ElementSample(eid.element_helium));
	$("#element_water_magma_sample").html(ElementSample(eid.element_magma));
}

// Resource Storage Class - Represents a resource storage box in the gui
class resource_storage {
	name = "";										// Storage name (must match storage ID)
	resource;										// chasm_resource_small associated with storage
	// todo: move resource completely into the storage class
	
	canvas;											// Canvas handle for animation
	canvas_w = STORAGE_CANVAS_W_DEFAULT;			// Canvas width
	canvas_h = STORAGE_CANVAS_H_DEFAULT;			// Canvas height
	canvas_border = STORAGE_CANVAS_BORDER_OFFSET;	// Border offset
	image_data;										// Canvas image data
	bitmap;											// Storage bitmap

	probability = new ELEMENT_PROBABILITY();

	gather_dom;
	drop_dom;
	survey_dom;
	depth_dom;

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored

	workers_gather = 0;								// Number of workers currently gathering
	workers_drop = 0;								// Number of workers currently dropping
	workers_survey = 0;								// Number of workers currently surveying
	machinery_depth = 0;
	gather_progress = 0;							// Percentage towards next gather action
	drop_progress = 0;								// Percentage towards next drop action

	constructor(name, resource) {
		this.name = name;
		this.resource = resource;
		this.bitmap = new storage_bitmap(this.canvas_w, this.canvas_h);
	}

	init(canvas) {
		this.canvas = canvas;
		this.image_data = this.canvas.createImageData(this.canvas_w, this.canvas_h);
		this.canvas.fillStyle = "#000000";
		this.canvas.fillRect( 0, 0, this.canvas_w + (2 * this.canvas_border), this.canvas_h + (2 * this.canvas_border));
	}

	storage_reset() {
		this.workers_gather = 0;
		this.workers_drop = 0;
		this.workers_survey = 0;
		this.machinery_depth = 0;
		this.gather_progress = 0;
		this.drop_progress = 0;
		this.clear();
	}

	drop() {
		this.update_bitmap();
		if (this.resource.spend(this.resource.cap)) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.resource.set(0);
		this.bricks_stored = 0;
		this.bitmap.clear();
		this.draw();
	}

	update_bitmap() {
		for (; this.bricks_stored < Math.floor(this.resource.current); this.bricks_stored++) {
			// Calculate brick location
			let bricks_per_w = this.canvas_w / this.brick_w;
	
			let draw_x = this.canvas_w - (this.brick_w * ((this.bricks_stored % bricks_per_w) + 1));
			let draw_y = this.canvas_h - (this.brick_h * (Math.floor(this.bricks_stored / bricks_per_w) + 1));

			let color;

			// Choose brick type
			let type;
			if (this.storage_flags & STORAGE_FLAGS_EARTH) {
				type = this.probability.roll(this.storage_flags);
			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
				type = this.probability.roll(this.storage_flags);
			}
	
			// Choose brick color
			if (type == eid.element_earth) {
				color = colorRange_MkII(color_MkII_earth);
			} else if (type == eid.element_stone) {
				color = colorRange_MkII(color_MkII_stone);
			} else if (type == eid.element_coal) {
				color = colorRange_MkII(color_MkII_coal);
			} else if (type == eid.element_copper) {
				color = colorRange_MkII(color_MkII_copper);
			} else if (type == eid.element_iron) {
				color = colorRange_MkII(color_MkII_iron);
			} else if (type == eid.element_lead) {
				color = colorRange_MkII(color_MkII_lead);
			} else if (type == eid.element_gold) {
				color = colorRange_MkII(color_MkII_gold);
			} else if (type == eid.element_fossil) {
				color = colorRange_MkII(color_MkII_fossil);
			} else if (type == eid.element_emerald) {
				color = colorRange_MkII(color_MkII_emerald);
			} else if (type == eid.element_sapphire) {
				color = colorRange_MkII(color_MkII_sapphire);
			} else if (type == eid.element_ruby) {
				color = colorRange_MkII(color_MkII_ruby);
			} else if (type == eid.element_diamond) {
				color = colorRange_MkII(color_MkII_diamond);
			} else if (type == eid.element_magma) {
				if (this.storage_flags & STORAGE_FLAGS_WATER) {
					color_MkII_water_temp = color_MkII_magma_2;
					color_MkII_water_temp.darkness_low = 0.6 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.2;
					color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
					color = colorRange_MkII(color_MkII_water_temp);
				} else {
					color = colorRange_MkII(color_MkII_magma);
				}
			} else if (type == eid.element_water) {
				color_MkII_water_temp = color_MkII_water;
				color_MkII_water_temp.darkness_low = 0.6 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.2;
				color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
				color = colorRange_MkII(color_MkII_water_temp);
			} else if (type == eid.element_slime) {
				color_MkII_water_temp = color_MkII_slime;
				color_MkII_water_temp.darkness_low = 0.6 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.2;
				color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
				color = colorRange_MkII(color_MkII_water_temp);
			} else if (type == eid.element_oil) {
				color_MkII_water_temp = color_MkII_oil;
				color_MkII_water_temp.darkness_low = 0.1 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.0;
				color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
				color = colorRange_MkII(color_MkII_water_temp);
			} else if (type == eid.element_helium) {
				color_MkII_water_temp = color_MkII_helium;
				color_MkII_water_temp.darkness_low = 0.2 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.8;
				color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
				color = colorRange_MkII(color_MkII_water_temp);
			}
	
			// Draw brick
			this.bitmap.fillRect(draw_x, draw_y, this.brick_w, this.brick_h, color);

			// Save brick to bitmap
			if (this.storage_flags & STORAGE_FLAGS_EARTH) {
				this.bitmap.fillRectBits(draw_x, draw_y, 1, 1, type);
			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
				this.bitmap.fillRectBits(draw_x, draw_y, 1, this.brick_h, type);
			}
		}
	}

	draw() {
		this.update_bitmap();
		for (let i = 0; i < this.image_data.data.length; i++) {
			this.image_data.data[i] = this.bitmap.bitcolors[i];
		}
		this.canvas.putImageData(this.image_data, this.canvas_border, this.canvas_border);
	}

	manage_production_resource(resource_id, num, target) {
		if (target == "gather") {
			let out = num;

			// Gain workers
			if (num > 0) {
				if (chasm_currency[resource_id].resource.current.lt(num)) {
					out = chasm_currency[resource_id].resource.current;

					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_gather += out.toNumber();
					}
				} else {
					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_gather += out;
					}
				}

				$(this.gather_dom).html(this.workers_gather);

			// Reduce workers
			} else if (num < 0) {
				if (num < -this.workers_gather) {
					out = this.workers_gather;
				} else {
					out = -out;
				}

				chasm_currency[resource_id].resource.gainUntracked(out);
				this.workers_gather -= out;

				$(this.gather_dom).html(this.workers_gather);
			} else {
				$(this.gather_dom).html(this.workers_gather);
			}

			refreshEarthworksWorkersDisplay();
		} else if (target == "drop") {
			let out = num;

			// Gain workers
			if (num > 0) {
				if (chasm_currency[resource_id].resource.current.lt(num)) {
					out = chasm_currency[resource_id].resource.current;

					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_drop += out.toNumber();
					}
				} else {
					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_drop += out;
					}
				}

				$(this.drop_dom).html(this.workers_drop);

			// Reduce workers
			} else if (num < 0) {
				if (num < -this.workers_drop) {
					out = this.workers_drop;
				} else {
					out = -out;
				}

				chasm_currency[resource_id].resource.gainUntracked(out);
				this.workers_drop -= out;

				$(this.drop_dom).html(this.workers_drop);
			} else {
				$(this.drop_dom).html(this.workers_drop);
			}
		} else if (target == "survey") {
			let out = num;

			// Gain workers
			if (num > 0) {
				if (chasm_currency[resource_id].resource.current.lt(num)) {
					out = chasm_currency[resource_id].resource.current;

					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_survey += out.toNumber();
					}
				} else {
					if (chasm_currency[resource_id].resource.spend(out)) {
						this.workers_survey += out;
					}
				}

				$(this.survey_dom).html(this.workers_survey);

			// Reduce workers
			} else if (num < 0) {
				if (num < -this.workers_survey) {
					out = this.workers_survey;
				} else {
					out = -out;
				}

				chasm_currency[resource_id].resource.gainUntracked(out);
				this.workers_survey -= out;

				$(this.survey_dom).html(this.workers_survey);
			} else {
				$(this.survey_dom).html(this.workers_survey);
			}

			this.refresh_survey();
		} else if (target == "depth") {
			let out = num;

			// Depth limit
			let limit = CalculateMaxDepth() - this.machinery_depth;
			if (out > limit) {
				out = limit;
			}

			// Gain machines
			if (num > 0) {
				if (chasm_currency[resource_id].resource.current.lt(num)) {
					out = chasm_currency[resource_id].resource.current;

					if (chasm_currency[resource_id].resource.spend(out)) {
						this.machinery_depth += out.toNumber();
					}
				} else {
					if (chasm_currency[resource_id].resource.spend(out)) {
						this.machinery_depth += out;
					}
				}

				$(this.depth_dom).html(this.machinery_depth);

			// Reduce machines
			} else if (num < 0) {
				if (num < -this.machinery_depth) {
					out = this.machinery_depth;
				} else {
					out = -out;
				}

				chasm_currency[resource_id].resource.gainUntracked(out);
				this.machinery_depth -= out;

				$(this.depth_dom).html(this.machinery_depth);
			} else {
				$(this.depth_dom).html(this.machinery_depth);
			}

			this.refresh_survey();
			if (this.storage_flags & STORAGE_FLAGS_EARTH) RefreshDepthChart();
			else if (this.storage_flags & STORAGE_FLAGS_WATER) RefreshWaterDepthChart();
		}
	}

	refresh_survey() {
		this.probability.refresh(this.storage_flags);
	}
}

// Storage Bitmap Class - Records contents of a resource storage
class storage_bitmap {
	x;
	y;
	bits = [];
	bitcolors;

	constructor(x, y) {
		this.x = x;
		this.y = y;
		for (let i = 0; i < this.x * this.y; i++) {
			this.bits[i] = new bitmap_bit(eid.element_none);
		}
		this.bitcolors = new Uint8ClampedArray(4 * this.x * this.y);
		this.clear();
	}

	clear() {
		for (let i = 0; i < this.x * this.y; i++) {
			this.bits[i].clear();
			this.bitcolors[(i * 4) + 0] = 0xff; // r
			this.bitcolors[(i * 4) + 1] = 0xff; // g
			this.bitcolors[(i * 4) + 2] = 0xff; // b
			this.bitcolors[(i * 4) + 3] = 0xff; // a
		}
	}

	fillRect(x, y, w, h, color) {
		for (let i = x + (this.x * y); i < (x + w) + (this.x * (y + (h - 1))); i += this.x) {
			for (let j = 0; j < w; j++) {
				this.bitcolors[((i + j) * 4) + 0] = color.r; // r
				this.bitcolors[((i + j) * 4) + 1] = color.g; // g
				this.bitcolors[((i + j) * 4) + 2] = color.b; // b
				this.bitcolors[((i + j) * 4) + 3] = 0xff;	 // a
			}
		}
	}

	fillRectBits(x, y, w, h, type) {
		for (let i = x + (this.x * y); i < (x + w) + (this.x * (y + (h - 1))); i += this.x) {
			for (let j = 0; j < w; j++) {
				this.bits[i + j].type = type;
			}
		}
	}

	element_count() { // Returns count of all elements in a storage
		let element_count = new Array(eid.element_count);
		for (let i = 0; i < eid.element_count; i++) {
			element_count[i] = 0;
		}

		for (let i = 0; i < this.x * this.y; i++) {
			element_count[this.bits[i].type]++;
		}
		return element_count;
	}
}

function elementValue(element_count) { // Returns currency value of all elements in a storage
	let currency_count = new Array(cid.currency_max);
	for (let i = 0; i < cid.currency_max; i++) {
		currency_count[i] = 0;
	}

	// Calculate modifiers
	let mass_modifier = 1;
	if (chasm_upgrades[uid.upgrade_singularity_workers_2].unlocked) mass_modifier = mass_modifier * 1.2;

	let metal_modifier = 1;
	if (chasm_upgrades[uid.upgrade_earth_value_3].unlocked) metal_modifier = metal_modifier * 1.5;
	if (chasm_upgrades[uid.upgrade_singularity_workers_4].unlocked) metal_modifier = metal_modifier * 1.5;

	let metal_mass_modifier = 1;
	if (chasm_upgrades[uid.upgrade_earth_value_10].unlocked) metal_mass_modifier = metal_mass_modifier * 3;

	let jewel_modifier = 1;
	if (chasm_upgrades[uid.upgrade_workers_8].unlocked) jewel_modifier = jewel_modifier * 1.2;

	let jewel_mass_modifier = 1;
	if (chasm_upgrades[uid.upgrade_earth_value_11].unlocked) jewel_mass_modifier = jewel_mass_modifier * 3;

	let particle_modifier = 1;
	if (chasm_upgrades[uid.upgrade_singularity_earth_value_2].unlocked) particle_modifier = particle_modifier * 1.5;

	let anticapital_modifier = 1;
	if (chasm_upgrades[uid.upgrade_singularity_workers_3].unlocked) anticapital_modifier = anticapital_modifier * 1.25;

	for (let i = 0; i < eid.element_count; i++) {
		switch (i) {
			case eid.element_earth:
				let earth_value = 0.01;
				if (chasm_upgrades[uid.upgrade_earth_value_1].unlocked) earth_value = earth_value * 2;
				if (chasm_upgrades[uid.upgrade_earth_value_2].unlocked) earth_value = earth_value * 1.5;
				if (chasm_upgrades[uid.upgrade_earth_value_6].unlocked) earth_value = earth_value * 2;
				if (chasm_upgrades[uid.upgrade_earth_value_9].unlocked) earth_value = earth_value * 2;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_earth] * earth_value * mass_modifier;
				currency_count[cid.currency_particles] 	+= element_count[eid.element_earth] * earth_value * particle_modifier;
				break;
			case eid.element_stone:
				let stone_value = 0.26;
				if (chasm_upgrades[uid.upgrade_earth_value_4].unlocked) stone_value = stone_value * 1.5;
				if (chasm_upgrades[uid.upgrade_earth_value_6].unlocked) stone_value = stone_value * 1.5;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_stone] * stone_value * mass_modifier;
				currency_count[cid.currency_particles] 	+= element_count[eid.element_stone] * stone_value * particle_modifier;
				break;
			case eid.element_coal:
				let coal_value = 1.00
				if (chasm_upgrades[uid.upgrade_earth_value_8].unlocked) coal_value = coal_value * 3;
				if (chasm_upgrades[uid.upgrade_singularity_earth_value_1].unlocked) coal_value = coal_value * 3;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_coal] * coal_value * mass_modifier;
				currency_count[cid.currency_particles] 	+= element_count[eid.element_coal] * coal_value * 0.92 * particle_modifier;
				currency_count[cid.currency_soul] 		+= element_count[eid.element_coal] * coal_value * 0.08;
				break;
			case eid.element_copper:
				let copper_value = 0.01;
				copper_value = copper_value * metal_modifier;
				if (chasm_upgrades[uid.upgrade_earth_value_2].unlocked) copper_value = copper_value * 2;
				if (chasm_upgrades[uid.upgrade_earth_value_9].unlocked) copper_value = copper_value * 2;
				if (chasm_upgrades[uid.upgrade_workers_10].unlocked) copper_value = copper_value * 1.5;
				
				currency_count[cid.currency_mass] 		+= element_count[eid.element_copper] * copper_value * metal_mass_modifier * mass_modifier;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_copper] * copper_value;
				break;
			case eid.element_iron:
				let iron_value = 0.06;
				iron_value = iron_value * metal_modifier;
				if (chasm_upgrades[uid.upgrade_earth_value_7].unlocked) iron_value = iron_value * 4;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_iron] * iron_value * metal_mass_modifier * mass_modifier;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_iron] * iron_value;
				break;
			case eid.element_lead:
				let lead_value = 0.50;
				lead_value = lead_value * metal_modifier;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_lead] * lead_value * metal_mass_modifier * mass_modifier;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_lead] * lead_value;
				break;
			case eid.element_gold:
				let gold_value = 0.90;
				gold_value = gold_value * metal_modifier;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_gold] * gold_value * metal_mass_modifier * mass_modifier;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_gold] * gold_value * 0.66;
				currency_count[cid.currency_capital] 	+= element_count[eid.element_gold] * gold_value * 0.33 * anticapital_modifier;
				break;
			case eid.element_fossil:
				currency_count[cid.currency_mass] 		+= element_count[eid.element_fossil] * 0.44 * mass_modifier;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_fossil] * 0.32;
				currency_count[cid.currency_spirit] 	+= element_count[eid.element_fossil] * 0.12;
				break;
			case eid.element_emerald:
				let emerald_value = 0.04;
				emerald_value = emerald_value * jewel_modifier;
				if (chasm_upgrades[uid.upgrade_earth_value_5].unlocked) emerald_value = emerald_value * 1.5;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_emerald] * emerald_value * jewel_mass_modifier * mass_modifier;
				currency_count[cid.currency_capital] 	+= element_count[eid.element_emerald] * emerald_value * anticapital_modifier;
				break;
			case eid.element_sapphire:
				let sapphire_value = 0.20;
				sapphire_value = sapphire_value * jewel_modifier;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_sapphire] * sapphire_value * jewel_mass_modifier * mass_modifier;
				currency_count[cid.currency_capital] 	+= element_count[eid.element_sapphire] * sapphire_value * anticapital_modifier;
				break;
			case eid.element_ruby:
				let ruby_value = 1.00;
				ruby_value = ruby_value * jewel_modifier;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_ruby] * ruby_value * jewel_mass_modifier * mass_modifier;
				currency_count[cid.currency_capital] 	+= element_count[eid.element_ruby] * ruby_value * anticapital_modifier;
				break;
			case eid.element_diamond:
				let diamond_value = 3.00;
				diamond_value = diamond_value * jewel_modifier;

				currency_count[cid.currency_mass] 		+= element_count[eid.element_diamond] * diamond_value * jewel_mass_modifier * mass_modifier;
				currency_count[cid.currency_capital] 	+= element_count[eid.element_diamond] * diamond_value * anticapital_modifier;
				break;
			case eid.element_magma:
				currency_count[cid.currency_mass] 		+= element_count[eid.element_magma] * 2.48 * mass_modifier;
				currency_count[cid.currency_soul] 		+= element_count[eid.element_magma] * 1.20;
				currency_count[cid.currency_strands] 	+= element_count[eid.element_magma] * 1.28;
				break;
			case eid.element_water:
				let water_value = 0.12;
				currency_count[cid.currency_mass] 		+= element_count[eid.element_water] * water_value * mass_modifier;
				currency_count[cid.currency_particles] 	+= element_count[eid.element_water] * water_value * particle_modifier;
				break;
			case eid.element_slime:
				let slime_value = 0.12;
				currency_count[cid.currency_mass] 		+= element_count[eid.element_slime] * slime_value * mass_modifier;
				currency_count[cid.currency_goo] 		+= element_count[eid.element_slime] * slime_value;
				break;
			case eid.element_oil:
				let oil_value = 0.12;
				currency_count[cid.currency_mass] 		+= element_count[eid.element_oil] * oil_value * mass_modifier;
				currency_count[cid.currency_soul] 		+= element_count[eid.element_oil] * oil_value;
				break;
			case eid.element_helium:
				let helium_value = 0.01;
				currency_count[cid.currency_mass] 		+= element_count[eid.element_helium] * helium_value * mass_modifier;
				currency_count[cid.currency_particles] 	+= element_count[eid.element_helium] * helium_value;
				break;
			case eid.element_none:
			default:
		}
	}

	return currency_count;
}

function stringifyElements(element_count) {
	let out = "Stored: ";

	if (element_count[eid.element_earth] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_earth];
		out 							+= ElementSample(eid.element_earth);
		out								+= "</p>";
	}

	if (element_count[eid.element_stone] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_stone];
		out 							+= ElementSample(eid.element_stone);
		out								+= "</p>";
	}

	if (element_count[eid.element_coal] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_coal];
		out 							+= ElementSample(eid.element_coal);
		out								+= "</p>";
	}

	if (element_count[eid.element_copper] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_copper];
		out 							+= ElementSample(eid.element_copper);
		out								+= "</p>";
	}

	if (element_count[eid.element_iron] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_iron];
		out 							+= ElementSample(eid.element_iron);
		out								+= "</p>";
	}

	if (element_count[eid.element_lead] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_lead];
		out 							+= ElementSample(eid.element_lead);
		out								+= "</p>";
	}

	if (element_count[eid.element_gold] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_gold];
		out 							+= ElementSample(eid.element_gold);
		out								+= "</p>";
	}

	if (element_count[eid.element_fossil] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_fossil];
		out 							+= ElementSample(eid.element_fossil);
		out								+= "</p>";
	}

	if (element_count[eid.element_emerald] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_emerald];
		out 							+= ElementSample(eid.element_emerald);
		out								+= "</p>";
	}

	if (element_count[eid.element_sapphire] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_sapphire];
		out 							+= ElementSample(eid.element_sapphire);
		out								+= "</p>";
	}

	if (element_count[eid.element_ruby] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_ruby];
		out 							+= ElementSample(eid.element_ruby);
		out								+= "</p>";
	}

	if (element_count[eid.element_diamond] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_diamond];
		out 							+= ElementSample(eid.element_diamond);
		out								+= "</p>";
	}

	if (element_count[eid.element_magma] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";
		out 							+= element_count[eid.element_magma];
		out 							+= ElementSample(eid.element_magma);
		out								+= "</p>";
	}

	if (element_count[eid.element_water] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";;
		out 							+= element_count[eid.element_water];
		out 							+= ElementSample(eid.element_water);
		out 							+= "</p>";
	}

	if (element_count[eid.element_slime] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";;
		out 							+= element_count[eid.element_slime];
		out 							+= ElementSample(eid.element_slime);
		out 							+= "</p>";
	}

	if (element_count[eid.element_oil] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";;
		out 							+= element_count[eid.element_oil];
		out 							+= ElementSample(eid.element_oil);
		out 							+= "</p>";
	}

	if (element_count[eid.element_helium] > 0) {
		out 							+= "<p style = 'margin-left: 6px;'>";;
		out 							+= element_count[eid.element_helium];
		out 							+= ElementSample(eid.element_helium);
		out 							+= "</p>";
	}

	return out;
}

function loadEarthElements(element_count) {
	if (element_count[eid.element_earth] > 0) {
		$("#element_earth_earth").show();
		$("#element_earth_earth_amount").html(DisplayNumberFormatter(element_count[eid.element_earth], 0));
	} else {
		$("#element_earth_earth").hide();
	}
	if (element_count[eid.element_stone] > 0) {
		$("#element_earth_stone").show();
		$("#element_earth_stone_amount").html(DisplayNumberFormatter(element_count[eid.element_stone], 0));
	} else {
		$("#element_earth_stone").hide();
	}
	if (element_count[eid.element_coal] > 0) {
		$("#element_earth_coal").show();
		$("#element_earth_coal_amount").html(DisplayNumberFormatter(element_count[eid.element_coal], 0));
	} else {
		$("#element_earth_coal").hide();
	}
	if (element_count[eid.element_copper] > 0) {
		$("#element_earth_copper").show();
		$("#element_earth_copper_amount").html(DisplayNumberFormatter(element_count[eid.element_copper], 0));
	} else {
		$("#element_earth_copper").hide();
	}
	if (element_count[eid.element_iron] > 0) {
		$("#element_earth_iron").show();
		$("#element_earth_iron_amount").html(DisplayNumberFormatter(element_count[eid.element_iron], 0));
	} else {
		$("#element_earth_iron").hide();
	}
	if (element_count[eid.element_lead] > 0) {
		$("#element_earth_lead").show();
		$("#element_earth_lead_amount").html(DisplayNumberFormatter(element_count[eid.element_lead], 0));
	} else {
		$("#element_earth_lead").hide();
	}
	if (element_count[eid.element_gold] > 0) {
		$("#element_earth_gold").show();
		$("#element_earth_gold_amount").html(DisplayNumberFormatter(element_count[eid.element_gold], 0));
	} else {
		$("#element_earth_gold").hide();
	}
	if (element_count[eid.element_fossil] > 0) {
		$("#element_earth_fossil").show();
		$("#element_earth_fossil_amount").html(DisplayNumberFormatter(element_count[eid.element_fossil], 0));
	} else {
		$("#element_earth_fossil").hide();
	}
	if (element_count[eid.element_emerald] > 0) {
		$("#element_earth_emerald").show();
		$("#element_earth_emerald_amount").html(DisplayNumberFormatter(element_count[eid.element_emerald], 0));
	} else {
		$("#element_earth_emerald").hide();
	}
	if (element_count[eid.element_sapphire] > 0) {
		$("#element_earth_sapphire").show();
		$("#element_earth_sapphire_amount").html(DisplayNumberFormatter(element_count[eid.element_sapphire], 0));
	} else {
		$("#element_earth_sapphire").hide();
	}
	if (element_count[eid.element_ruby] > 0) {
		$("#element_earth_ruby").show();
		$("#element_earth_ruby_amount").html(DisplayNumberFormatter(element_count[eid.element_ruby], 0));
	} else {
		$("#element_earth_ruby").hide();
	}
	if (element_count[eid.element_diamond] > 0) {
		$("#element_earth_diamond").show();
		$("#element_earth_diamond_amount").html(DisplayNumberFormatter(element_count[eid.element_diamond], 0));
	} else {
		$("#element_earth_diamond").hide();
	}
	if (element_count[eid.element_magma] > 0) {
		$("#element_earth_magma").show();
		$("#element_earth_magma_amount").html(DisplayNumberFormatter(element_count[eid.element_magma], 0));
	} else {
		$("#element_earth_magma").hide();
	}
}

function loadWaterElements(element_count) {
	if (element_count[eid.element_water] > 0) {
		$("#element_water_water").show();
		$("#element_water_water_amount").html(DisplayNumberFormatter(element_count[eid.element_water], 0));
	} else {
		$("#element_water_water").hide();
	}
	if (element_count[eid.element_slime] > 0) {
		$("#element_water_slime").show();
		$("#element_water_slime_amount").html(DisplayNumberFormatter(element_count[eid.element_slime], 0));
	} else {
		$("#element_water_slime").hide();
	}
	if (element_count[eid.element_oil] > 0) {
		$("#element_water_oil").show();
		$("#element_water_oil_amount").html(DisplayNumberFormatter(element_count[eid.element_oil], 0));
	} else {
		$("#element_water_oil").hide();
	}
	if (element_count[eid.element_helium] > 0) {
		$("#element_water_helium").show();
		$("#element_water_helium_amount").html(DisplayNumberFormatter(element_count[eid.element_helium], 0));
	} else {
		$("#element_water_helium").hide();
	}
	if (element_count[eid.element_magma] > 0) {
		$("#element_water_magma").show();
		$("#element_water_magma_amount").html(DisplayNumberFormatter(element_count[eid.element_magma], 0));
	} else {
		$("#element_water_magma").hide();
	}
}

function stringifyValue(currency_count) {
	let out = "";

	let value_prewrapper 				= "<p style = 'margin-left: 6px;'>";
	let value_postwrapper 				= "</p>";

	for (let i = 0; i < cid.currency_max; i++) {
		if (currency_count[i] > 0) {
			out 							+= value_prewrapper;
			out 							+= DisplayNumberFormatter(currency_count[i], 2);
			out 							+= value_postwrapper + chasm_currency[i].inspector_symbol;
		}
	}

	return out;
}

function loadEarthValue(currency_count) {
	if (currency_count[cid.currency_particles] > 0) {
		$("#value_earth_particles").show();
		$("#value_earth_particles_amount").html(DisplayNumberFormatter(currency_count[cid.currency_particles], 2));
	} else {
		$("#value_earth_particles").hide();
	}
	if (currency_count[cid.currency_strands] > 0) {
		$("#value_earth_strands").show();
		$("#value_earth_strands_amount").html(DisplayNumberFormatter(currency_count[cid.currency_strands], 2));
	} else {
		$("#value_earth_strands").hide();
	}
	if (currency_count[cid.currency_spirit] > 0) {
		$("#value_earth_spirit").show();
		$("#value_earth_spirit_amount").html(DisplayNumberFormatter(currency_count[cid.currency_spirit], 2));
	} else {
		$("#value_earth_spirit").hide();
	}
	if (currency_count[cid.currency_soul] > 0) {
		$("#value_earth_soul").show();
		$("#value_earth_soul_amount").html(DisplayNumberFormatter(currency_count[cid.currency_soul], 2));
	} else {
		$("#value_earth_soul").hide();
	}
	if (currency_count[cid.currency_capital] > 0) {
		$("#value_earth_capital").show();
		$("#value_earth_capital_amount").html(DisplayNumberFormatter(currency_count[cid.currency_capital], 2));
	} else {
		$("#value_earth_capital").hide();
	}
	if (currency_count[cid.currency_mass] > 0) {
		$("#value_earth_mass").show();
		$("#value_earth_mass_amount").html(DisplayNumberFormatter(currency_count[cid.currency_mass], 2));
	} else {
		$("#value_earth_mass").hide();
	}
}

function loadWaterValue(currency_count) {
	if (currency_count[cid.currency_particles] > 0) {
		$("#value_water_particles").show();
		$("#value_water_particles_amount").html(DisplayNumberFormatter(currency_count[cid.currency_particles], 2));
	} else {
		$("#value_water_particles").hide();
	}
	if (currency_count[cid.currency_strands] > 0) {
		$("#value_water_strands").show();
		$("#value_water_strands_amount").html(DisplayNumberFormatter(currency_count[cid.currency_strands], 2));
	} else {
		$("#value_water_strands").hide();
	}
	if (currency_count[cid.currency_spirit] > 0) {
		$("#value_water_spirit").show();
		$("#value_water_spirit_amount").html(DisplayNumberFormatter(currency_count[cid.currency_spirit], 2));
	} else {
		$("#value_water_spirit").hide();
	}
	if (currency_count[cid.currency_soul] > 0) {
		$("#value_water_soul").show();
		$("#value_water_soul_amount").html(DisplayNumberFormatter(currency_count[cid.currency_soul], 2));
	} else {
		$("#value_water_soul").hide();
	}
	if (currency_count[cid.currency_capital] > 0) {
		$("#value_water_capital").show();
		$("#value_water_capital_amount").html(DisplayNumberFormatter(currency_count[cid.currency_capital], 2));
	} else {
		$("#value_water_capital").hide();
	}
	if (currency_count[cid.currency_goo] > 0) {
		$("#value_water_goo").show();
		$("#value_water_goo_amount").html(DisplayNumberFormatter(currency_count[cid.currency_goo], 2));
	} else {
		$("#value_water_goo").hide();
	}
	if (currency_count[cid.currency_core] > 0) {
		$("#value_water_core").show();
		$("#value_water_core_amount").html(DisplayNumberFormatter(currency_count[cid.currency_core], 2));
	} else {
		$("#value_water_core").hide();
	}
	if (currency_count[cid.currency_bugs] > 0) {
		$("#value_water_bugs").show();
		$("#value_water_bugs_amount").html(DisplayNumberFormatter(currency_count[cid.currency_bugs], 2));
	} else {
		$("#value_water_bugs").hide();
	}
	if (currency_count[cid.currency_mass] > 0) {
		$("#value_water_mass").show();
		$("#value_water_mass_amount").html(DisplayNumberFormatter(currency_count[cid.currency_mass], 2));
	} else {
		$("#value_water_mass").hide();
	}
}

// Bitmap Bit Class - Information saved to an individual bit of the bitmap (keep this as small as possible to conserve resources)
class bitmap_bit {
	type;

	constructor(type) {
		this.type = type;
	}

	clear() {
		this.type = eid.element_none;
	}
}

function compress_earth() {
	chasm_storage[sid.storage_earth].brick_h = chasm_storage[sid.storage_earth].brick_h / 2;
	chasm_storage[sid.storage_earth].brick_w = chasm_storage[sid.storage_earth].brick_w / 2;
	earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
	chasm_storage[sid.storage_earth].clear();
}

function reset_earth_compression() {
	chasm_storage[sid.storage_earth].brick_h = 32;
	chasm_storage[sid.storage_earth].brick_w = 32;
	earth.setCap((chasm_storage[sid.storage_earth].canvas_w * chasm_storage[sid.storage_earth].canvas_h) / (chasm_storage[sid.storage_earth].brick_w * chasm_storage[sid.storage_earth].brick_h));
}

function ElementSample(id) {
	switch (id) {
		case eid.element_earth:
			return "<div class = 'element_sample' style = 'background-color: SaddleBrown;'></div>";
			break;
			
		case eid.element_stone:
			return "<div class = 'element_sample' style = 'background-color: #878787;'></div>";
			break;
			
		case eid.element_coal:
			return "<div class = 'element_sample' style = 'background-color: Black;'></div>";
			break;
			
		case eid.element_copper:
			return "<div class = 'element_sample' style = 'background-color: DarkOrange;'></div>";
			break;
			
		case eid.element_iron:
			return "<div class = 'element_sample' style = 'background-color: #8d9ab0;'></div>";
			break;
			
		case eid.element_lead:
			return "<div class = 'element_sample' style = 'background-color: #4d4d4d;'></div>";
			break;
			
		case eid.element_gold:
			return "<div class = 'element_sample' style = 'background-color: #dbb93d;'></div>";
			break;
			
		case eid.element_fossil:
			return "<div class = 'element_sample' style = 'background-color: #baad95;'></div>";
			break;
		
		case eid.element_emerald:
			return "<div class = 'element_sample' style = 'background-color: #20a30b;'></div>";
			break;
	
		case eid.element_sapphire:
			return "<div class = 'element_sample' style = 'background-color: #2a44db;'></div>";
			break;
	
		case eid.element_ruby:
			return "<div class = 'element_sample' style = 'background-color: #d43422;'></div>";
			break;

		case eid.element_diamond:
			return "<div class = 'element_sample' style = 'background-color: #e6ebed;'></div>";
			break;

		case eid.element_magma:
			return "<div class = 'element_sample' style = 'background-color: #ed5113;'></div>";
			break;

		case eid.element_water:
			return "<div class = 'element_sample' style = 'background-color: DodgerBlue;'></div>";
			break;

		case eid.element_slime:
			return "<div class = 'element_sample' style = 'background-color: LimeGreen;'></div>";
			break;

		case eid.element_oil:
			return "<div class = 'element_sample' style = 'background-color: Black;'></div>";
			break;

		case eid.element_helium:
			return "<div class = 'element_sample' style = 'background-color: LightPink;'></div>";
			break;

		case eid.element_fish:
			return "<div class = 'element_sample' style = 'background-color: DodgerBlue;'></div>";
			break;
		
		default:
			return "";
	}
}