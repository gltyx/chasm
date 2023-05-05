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
	element_fish		= 0x000f;

	element_count		= 0x0010;
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
		this.element_fish 		= 0;
	}

	refresh(storage_flags) {
		this.zero();
		var portion = 1000;

		if (storage_flags & STORAGE_FLAGS_EARTH) {
			this.element_magma 		+= 50;
			portion 				-= 50;
			
			this.element_diamond 	+= 50;
			portion 				-= 50;
			
			this.element_ruby 		+= 50;
			portion 				-= 50;
			
			this.element_sapphire	+= 50;
			portion 				-= 50;
			
			this.element_emerald	+= 50;
			portion 				-= 50;
			
			this.element_fossil 	+= 50;
			portion 				-= 50;

			this.element_gold 		+= 50;
			portion 				-= 50;

			this.element_lead 		+= 50;
			portion 				-= 50;

			this.element_iron 		+= 50;
			portion 				-= 50;
			
			this.element_copper 	+= Math.floor(300 - (300 * (1 / Math.pow(1 + chasm_storage[sid.storage_earth].workers_survey, 0.1))));
			portion 				-= Math.floor(300 - (300 * (1 / Math.pow(1 + chasm_storage[sid.storage_earth].workers_survey, 0.1))));

			this.element_coal 		+= Math.floor(500 - (500 * (1 / Math.pow(1 + chasm_storage[sid.storage_earth].workers_survey, 0.1))));
			portion 				-= Math.floor(500 - (500 * (1 / Math.pow(1 + chasm_storage[sid.storage_earth].workers_survey, 0.1))));

			this.element_stone 		+= 50;
			portion 				-= 50;

			this.element_earth 		= portion;

			this.display(storage_flags);
		}
	}

	display(storage_flags) {
		if (storage_flags & STORAGE_FLAGS_EARTH) {
			var out = "";
			out	= "<div style = 'display: block;'>";
			out	+= "<p style = 'font-size: 12px;'>Dirt:</p>";
			out	+= "<p style = 'font-size: 12px;'>Stone:</p>";
			out	+= "<p style = 'font-size: 12px;'>Coal:</p>";
			out	+= "<p style = 'font-size: 12px;'>Copper:</p>";
			out	+= "<p style = 'font-size: 12px;'>Iron:</p>";
			out	+= "<p style = 'font-size: 12px;'>Lead:</p>";
			out	+= "<p style = 'font-size: 12px;'>Gold:</p>";
			out	+= "<p style = 'font-size: 12px;'>Fossil:</p>";
			out	+= "<p style = 'font-size: 12px;'>Emerald:</p>";
			out	+= "<p style = 'font-size: 12px;'>Sapphire:</p>";
			out	+= "<p style = 'font-size: 12px;'>Ruby:</p>";
			out	+= "<p style = 'font-size: 12px;'>Diamond:</p>";
			out	+= "<p style = 'font-size: 12px;'>Magma:</p>";
			out	+= "</div>";

			out	+= "<div style = 'display: block; text-align: right; width: 100%;'>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_earth / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_stone / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_coal / 10) 		+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_copper / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_iron / 10) 		+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_lead / 10) 		+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_gold / 10) 		+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_fossil / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_emerald / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_sapphire / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_ruby / 10) 		+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_diamond / 10) 	+ "%</p>";
			out	+= "<p style = 'font-size: 12px;'>" 	+ (this.element_magma / 10) 	+ "%</p>";
			out	+= "</div>";

			$("#earth_survey_menu").html(out);
		}
	}

	roll(storage_flags) {
		if (storage_flags & STORAGE_FLAGS_EARTH) {
			var portion = 1000;
			var roll = Math.floor(Math.random() * 1000);

			if (roll > portion - this.element_magma) {
				return eid.element_magma;
			} else {
				portion -= this.element_magma;
			}

			if (roll > portion - this.element_diamond) {
				return eid.element_diamond;
			} else {
				portion -= this.element_diamond;
			}

			if (roll > portion - this.element_ruby) {
				return eid.element_ruby;
			} else {
				portion -= this.element_ruby;
			}

			if (roll > portion - this.element_sapphire) {
				return eid.element_sapphire;
			} else {
				portion -= this.element_sapphire;
			}

			if (roll > portion - this.element_emerald) {
				return eid.element_emerald;
			} else {
				portion -= this.element_emerald;
			}

			if (roll > portion - this.element_fossil) {
				return eid.element_fossil;
			} else {
				portion -= this.element_fossil;
			}

			if (roll > portion - this.element_gold) {
				return eid.element_gold;
			} else {
				portion -= this.element_gold;
			}

			if (roll > portion - this.element_lead) {
				return eid.element_lead;
			} else {
				portion -= this.element_lead;
			}

			if (roll > portion - this.element_iron) {
				return eid.element_iron;
			} else {
				portion -= this.element_iron;
			}

			if (roll > portion - this.element_copper) {
				return eid.element_copper;
			} else {
				portion -= this.element_copper;
			}

			if (roll > portion - this.element_coal) {
				return eid.element_coal;
			} else {
				portion -= this.element_coal;
			}

			if (roll > portion - this.element_stone) {
				return eid.element_stone;
			} else {
				portion -= this.element_stone;
			}

			return eid.element_earth;
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
				chasm_storage[i].machinery_1_dom = "#earth_machinery_1";
				break;

			case sid.storage_water:
				chasm_storage[i] = new resource_storage("storage_water", water);
				chasm_storage[i].storage_flags |= STORAGE_FLAGS_WATER;
				chasm_storage[i].brick_w = 64;
				chasm_storage[i].brick_h = 1;
				water.setCap((chasm_storage[i].canvas_w * chasm_storage[i].canvas_h) / (chasm_storage[i].brick_w * chasm_storage[i].brick_h));
				chasm_storage[i].gather_dom = "#water_workers_gather";
				chasm_storage[i].drop_dom = "#water_workers_drop";
				break;

			default:
		}
	}
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
	machinery_1_dom;

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored

	workers_gather = 0;								// Number of workers currently gathering
	workers_drop = 0;								// Number of workers currently dropping
	workers_survey = 0;								// Number of workers currently surveying
	machinery_1 = 0;
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
				type = eid.element_water;
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
				color = colorRange_MkII(color_MkII_magma);
			} else if (type == eid.element_water) {
				color_MkII_water_temp = color_MkII_water;
				color_MkII_water_temp.darkness_low = 0.6 * ((this.canvas_h - draw_y) / this.canvas_h) + 0.2;
				color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
				color = colorRange_MkII(color_MkII_water_temp);
			}
	
			// Draw brick
			this.bitmap.fillRect(draw_x, draw_y, this.brick_w, this.brick_h, color);

			// Save brick to bitmap
			if (this.storage_flags & STORAGE_FLAGS_EARTH) {
				this.bitmap.fillRectBits(draw_x, draw_y, 1, 1, type);
			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
				this.bitmap.fillRectBits(draw_x, draw_y, this.brick_w, this.brick_h, type);
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

			chasm_storage[sid.storage_earth].probability.refresh(chasm_storage[sid.storage_earth].storage_flags);
		} else if (target == "machinery_1") {
			let out = num;

			// Gain machines
			if (num > 0) {
				if (chasm_currency[resource_id].resource.current.lt(num)) {
					out = chasm_currency[resource_id].resource.current;

					if (chasm_currency[resource_id].resource.spend(out)) {
						this.machinery_1 += out.toNumber();
					}
				} else {
					if (chasm_currency[resource_id].resource.spend(out)) {
						this.machinery_1 += out;
					}
				}

				$(this.machinery_1_dom).html(this.machinery_1);

			// Reduce machines
			} else if (num < 0) {
				if (num < -this.machinery_1) {
					out = this.machinery_1;
				} else {
					out = -out;
				}

				chasm_currency[resource_id].resource.gainUntracked(out);
				this.machinery_1 -= out;

				$(this.machinery_1_dom).html(this.machinery_1);
			} else {
				$(this.machinery_1_dom).html(this.machinery_1);
			}
		}
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

	value(element_count) { // Returns currency value of all elements in a storage
		let currency_count = new Array(cid.currency_count);
		for (let i = 0; i < cid.currency_count; i++) {
			currency_count[i] = 0;
		}

		for (let i = 0; i < eid.element_count; i++) {
			switch (i) {
				case eid.element_earth:
					let earth_value = 0.01;
					if (chasm_upgrades[uid.upgrade_earth_value_1].unlocked) earth_value += 0.01;

					currency_count[cid.currency_mass] 		+= element_count[eid.element_earth] * earth_value;
					currency_count[cid.currency_particles] 	+= element_count[eid.element_earth] * earth_value;
					break;
				case eid.element_stone:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_coal] * 0.08;
					currency_count[cid.currency_particles] 	+= element_count[eid.element_coal] * 0.08;
					break;
				case eid.element_coal:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_coal] * 0.08;
					currency_count[cid.currency_particles] 	+= element_count[eid.element_coal] * 0.02;
					currency_count[cid.currency_soul] 		+= element_count[eid.element_coal] * 0.06;
					break;
				case eid.element_copper:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_copper] * 0.01;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_copper] * 0.01;
					break;
				case eid.element_iron:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_iron] * 0.04;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_iron] * 0.04;
					break;
				case eid.element_lead:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_lead] * 0.16;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_lead] * 0.16;
					break;
				case eid.element_gold:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_gold] * 0.42;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_gold] * 0.32;
					currency_count[cid.currency_capital] 	+= element_count[eid.element_gold] * 0.10;
					break;
				case eid.element_fossil:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_fossil] * 0.44;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_fossil] * 0.32;
					currency_count[cid.currency_spirit] 	+= element_count[eid.element_fossil] * 0.12;
					break;
				case eid.element_emerald:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_emerald] * 0.04;
					currency_count[cid.currency_capital] 	+= element_count[eid.element_emerald] * 0.04;
					break;
				case eid.element_sapphire:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_sapphire] * 0.20;
					currency_count[cid.currency_capital] 	+= element_count[eid.element_sapphire] * 0.20;
					break;
				case eid.element_ruby:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_ruby] * 1.00;
					currency_count[cid.currency_capital] 	+= element_count[eid.element_ruby] * 1.00;
					break;
				case eid.element_diamond:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_diamond] * 3.00;
					currency_count[cid.currency_capital] 	+= element_count[eid.element_diamond] * 3.00;
					break;
				case eid.element_magma:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_magma] * 2.48;
					currency_count[cid.currency_soul] 		+= element_count[eid.element_magma] * 1.20;
					currency_count[cid.currency_strands] 	+= element_count[eid.element_magma] * 1.28;
					break;
				case eid.element_water:
					currency_count[cid.currency_mass] 		+= element_count[eid.element_water] * 0.01;
					currency_count[cid.currency_particles] 	+= element_count[eid.element_water] * 0.01;
					break;
				case eid.element_none:
				default:
			}
		}

		return currency_count;
	}

	stringifyElements(element_count) {
		let out = "Stored: ";

		if (element_count[eid.element_earth] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_earth];
			out 							+= "<div class = 'element_sample' style = 'background-color: SaddleBrown;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_stone] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_stone];
			out 							+= "<div class = 'element_sample' style = 'background-color: #878787;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_coal] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_coal];
			out 							+= "<div class = 'element_sample' style = 'background-color: Black;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_copper] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_copper];
			out 							+= "<div class = 'element_sample' style = 'background-color: DarkOrange;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_iron] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_iron];
			out 							+= "<div class = 'element_sample' style = 'background-color: #8d9ab0;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_lead] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_lead];
			out 							+= "<div class = 'element_sample' style = 'background-color: #4d4d4d;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_gold] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_gold];
			out 							+= "<div class = 'element_sample' style = 'background-color: #dbb93d;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_fossil] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_fossil];
			out 							+= "<div class = 'element_sample' style = 'background-color: #baad95;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_emerald] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_emerald];
			out 							+= "<div class = 'element_sample' style = 'background-color: #20a30b;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_sapphire] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_sapphire];
			out 							+= "<div class = 'element_sample' style = 'background-color: #2a44db;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_ruby] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_ruby];
			out 							+= "<div class = 'element_sample' style = 'background-color: #d43422;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_diamond] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_diamond];
			out 							+= "<div class = 'element_sample' style = 'background-color: #e6ebed;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_magma] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_magma];
			out 							+= "<div class = 'element_sample' style = 'background-color: #ed5113;'></div>";
			out								+= "</p>";
		}

		if (element_count[eid.element_water] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";;
			out 							+= element_count[eid.element_water];
			out 							+= "<div class = 'element_sample' style = 'background-color: DodgerBlue;'></div>";
			out 							+= "</p>";
		}

		return out;
	}

	stringifyValue(currency_count) {
		let out = "Value: ";

		let value_prewrapper 				= "<p style = 'margin-left: 6px;'>";
		let value_postwrapper 				= "</p>";

		for (let i = 0; i < cid.currency_count; i++) {
			if (currency_count[i] > 0) {
				out 							+= value_prewrapper;
				out 							+= DisplayNumberFormatter(currency_count[i], true);
				out 							+= value_postwrapper + chasm_currency[i].inspector_symbol;
			}
		}

		return out;
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