// Storage canvas w/h must be in the set {2^x} for (x >= 0)
//	x 	=	0		1		2		3		4		5		6		7		8		9
//	w/h =	1		2		4		8		16		32		64		128		256		512
var STORAGE_CANVAS_BORDER_OFFSET = 1;
var STORAGE_CANVAS_W_DEFAULT = 64;
var STORAGE_CANVAS_H_DEFAULT = 64;

var STORAGE_FLAGS_EARTH = 1 << 0;
var STORAGE_FLAGS_WATER = 1 << 1;

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

class _CURRENCY_ID {
	currency_first		= 0x0000;

	// Currency list
	currency_particles 	= 0x0000;
	currency_strands 	= 0x0001;
	currency_spirit 	= 0x0002;
	currency_soul	 	= 0x0003;

	currency_count		= 0x0004;
} var cid = new _CURRENCY_ID();

// Resource Storage Class - Represents a resource storage box in the gui
class resource_storage {
	name = "";										// Storage name (for debugging)
	resource;										// chasm_resource_small associated with storage
	
	canvas;											// Canvas handle for animation
	canvas_w = STORAGE_CANVAS_W_DEFAULT;			// Canvas width
	canvas_h = STORAGE_CANVAS_H_DEFAULT;			// Canvas height
	canvas_border = STORAGE_CANVAS_BORDER_OFFSET;	// Border offset
	image_data;										// Canvas image data
	bitmap;											// Storage bitmap

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored

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
				type = eid.element_earth;
			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
				type = eid.element_water;
			}
	
			// Choose brick color
			if (this.storage_flags & STORAGE_FLAGS_EARTH) {
				color = colorRange_MkII(color_MkII_earth);

			} else if (this.storage_flags & STORAGE_FLAGS_WATER) {
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

	element_count() { // Returns count of all elements
		let element_count = new Array(eid.element_count);
		for (let i = 0; i < element_count.length; i++) {
			element_count[i] = 0;
		}

		for (let i = 0; i < this.x * this.y; i++) {
			element_count[this.bits[i].type]++;
		}
		return element_count;
	}

	value(element_count) {

		let currency_count = new Array(cid.currency_count);
		for (let i = 0; i < currency_count.length; i++) {
			currency_count[i] = 0;
		}

		for (let i = 0; i < element_count.length; i++) {
			switch (i) {
				case eid.element_earth:
					currency_count[cid.currency_particles] += element_count[eid.element_earth] * 0.01;
					break;
				case eid.element_water:
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

		let value_prewrapper 				= "<p style = 'margin-left: 6px;'>";
		let value_postwrapper 				= "</p>";

		if (element_count[eid.element_earth] > 0) {
			out 							+= value_prewrapper;
			out 							+= element_count[eid.element_earth];
			out 							+= "earth" + value_postwrapper;
		}

		if (element_count[eid.element_water] > 0) {
			out 							+= value_prewrapper;
			out 							+= element_count[eid.element_water];
			out 							+= "water" + value_postwrapper;
		}

		return out;
	}

	stringifyValue(currency_count) {
		let out = "Value: ";

		let value_prewrapper 				= "<p style = 'margin-left: 6px;'>";
		let value_postwrapper 				= "</p>";

		if (currency_count[cid.currency_particles] > 0) {
			out 							+= value_prewrapper;
			out 							+= currency_count[cid.currency_particles];
			out 							+= value_postwrapper + inspector_symbol_particles;
		}

		if (currency_count[cid.currency_strands] > 0) {
			out 							+= value_prewrapper;
			out 							+= currency_count[cid.currency_strands];
			out 							+= value_postwrapper + inspector_symbol_strands;
		}

		if (currency_count[cid.currency_spirit] > 0) {
			out 							+= value_prewrapper;
			out 							+= currency_count[cid.currency_spirit];
			out 							+= value_postwrapper + inspector_symbol_spirit;
		}

		if (currency_count[cid.currency_soul] > 0) {
			out 							+= value_prewrapper;
			out 							+= currency_count[cid.currency_soul];
			out 							+= value_postwrapper + inspector_symbol_soul;
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

function currency_gain(currency_map) {
	for(let i = 0; i < currency_map.length; i++) {
		switch (i) {
			case cid.currency_particles:
				particles.gain(currency_map[cid.currency_particles]);
				break;
			case cid.currency_strands:
				strands.gain(currency_map[cid.currency_strands]);
				break;
			case cid.currency_spirit:
				spirit.gain(currency_map[cid.currency_spirit]);
				break;
			case cid.currency_soul:
				soul.gain(currency_map[cid.currency_soul]);
				break;
			default:
		}
	}
}