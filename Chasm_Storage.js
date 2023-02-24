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
	element_water 		= 0x0002;
	element_coal		= 0x0003;
	element_copper		= 0x0004;
	element_iron		= 0x0005;
	element_fish		= 0x0006;

	element_count		= 0x0007;
} var eid = new _ELEMENT_ID();

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
				chasm_storage[i].drop_dom = "#earth_workers_drop";
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

	gather_dom;
	drop_dom;

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored

	workers_gather = 0;								// Number of workers currently gathering
	workers_drop = 0;								// Numeber of workers currently dropping
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
				if (chasm_upgrades[uid.upgrade_earth_metals_1].unlocked) {
					if (Math.random() > 0.975) {
						type = eid.element_copper;
					} else {
						type = eid.element_earth;
					}
				} else {
					type = eid.element_earth;
				}
			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
				type = eid.element_water;
			}
	
			// Choose brick color
			if (type == eid.element_earth) {
				color = colorRange_MkII(color_MkII_earth);
			} else if (type == eid.element_copper) {
				color = colorRange_MkII(color_MkII_copper);
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

	manage_workers(num, target) {
		if (target == "gather") {
			let out = num;

			// Gain workers
			if (num > 0) {
				if (chasm_currency[cid.currency_workers].resource.current.lt(num)) {
					out = chasm_currency[cid.currency_workers].resource.current;

					if (chasm_currency[cid.currency_workers].resource.spend(out)) {
						this.workers_gather += out.toNumber();
					}
				} else {
					if (chasm_currency[cid.currency_workers].resource.spend(out)) {
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

				chasm_currency[cid.currency_workers].resource.gainUntracked(out);
				this.workers_gather -= out;

				$(this.gather_dom).html(this.workers_gather);
			} else {
				$(this.gather_dom).html(this.workers_gather);
			}
		} else if (target == "drop") {
			let out = num;

			// Gain workers
			if (num > 0) {
				if (chasm_currency[cid.currency_workers].resource.current.lt(num)) {
					out = chasm_currency[cid.currency_workers].resource.current;

					if (chasm_currency[cid.currency_workers].resource.spend(out)) {
						this.workers_drop += out.toNumber();
					}
				} else {
					if (chasm_currency[cid.currency_workers].resource.spend(out)) {
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

				chasm_currency[cid.currency_workers].resource.gainUntracked(out);
				this.workers_drop -= out;

				$(this.drop_dom).html(this.workers_drop);
			} else {
				$(this.drop_dom).html(this.workers_drop);
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
					let value = 0.01;
					if (chasm_upgrades[uid.upgrade_earth_value_1].unlocked) value += 0.01;

					currency_count[cid.currency_mass] += element_count[eid.element_earth] * value;
					currency_count[cid.currency_particles] += element_count[eid.element_earth] * value;
					break;
				case eid.element_copper:
					currency_count[cid.currency_mass] += element_count[eid.element_copper] * 0.01;
					currency_count[cid.currency_strands] += element_count[eid.element_copper] * 0.01;
					break;
				case eid.element_water:
					currency_count[cid.currency_mass] += element_count[eid.element_water] * 0.01;
					currency_count[cid.currency_particles] += element_count[eid.element_water] * 0.01;
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

		if (element_count[eid.element_copper] > 0) {
			out 							+= "<p style = 'margin-left: 6px;'>";
			out 							+= element_count[eid.element_copper];
			out 							+= "<div class = 'element_sample' style = 'background-color: DarkOrange;'></div>";
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
				out 							+= currency_count[i];
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
