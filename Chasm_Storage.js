// Storage canvas w/h must be in the set {2^x} for (x >= 0)
//	x 	=	0		1		2		3		4		5		6		7		8		9
//	w/h =	1		2		4		8		16		32		64		128		256		512
var STORAGE_CANVAS_BORDER_OFFSET = 1;
var STORAGE_CANVAS_W_DEFAULT = 64;
var STORAGE_CANVAS_H_DEFAULT = 64;

var STORAGE_FLAGS_EARTH = 1 << 0;
var STORAGE_FLAGS_WATER = 1 << 1;

var BIT_TYPE_NONE  = 0;
var BIT_TYPE_EARTH = 1 << 0;
var BIT_TYPE_EARTH = 1 << 1;

// Resource Storage Class - Represents a resource storage box in the gui
class resource_storage {
	name = "";										// Storage name (for debugging)
	resource;										// Chasm resource associated with storage
	
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
			this.clear();
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
			this.bits[i] = new bitmap_bit(BIT_TYPE_NONE);
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
		for (let i = x + (this.x * y); i < (x + w) + (this.x * (y + h)); i += this.x) {
			for (let j = 0; j < w; j++) {
				this.bitcolors[((i + j) * 4) + 0] = color.r; // r
				this.bitcolors[((i + j) * 4) + 1] = color.g; // g
				this.bitcolors[((i + j) * 4) + 2] = color.b; // b
				this.bitcolors[((i + j) * 4) + 3] = 0xff;	 // a
			}
		}
	}
}

// Bitmap Bit Class - Information saved to an individual bit of the bitmap (keep this as small as possible to conserve resources)
class bitmap_bit {
	type;

	constructor(type) {
		this.type = type;
	}

	clear() {
		this.type = BIT_TYPE_NONE;
	}
}
