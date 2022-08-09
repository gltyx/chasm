// Storage canvas w/h must be in the set {2^x} for (x >= 0)
//	x 	=	0		1		2		3		4		5		6		7		8		9
//	w/h =	1		2		4		8		16		32		64		128		256		512
var STORAGE_CANVAS_BORDER_OFFSET = 1;
var STORAGE_CANVAS_W_DEFAULT = 64;
var STORAGE_CANVAS_H_DEFAULT = 64;

var STORAGE_FLAGS_EARTH = 1 << 0;
var STORAGE_FLAGS_WATER = 1 << 1;

// Resource Storage Class - Represents a resource storage box in the gui
class resource_storage {
	name = "";										// Storage name (for debugging)
	resource;										// Chasm resource associated with storage
	
	canvas;											// Canvas handle for animation
	canvas_w = STORAGE_CANVAS_W_DEFAULT;			// Canvas width
	canvas_h = STORAGE_CANVAS_H_DEFAULT;			// Canvas height
	canvas_border = STORAGE_CANVAS_BORDER_OFFSET;	// Border offset

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored
	bitmap;											// Storage bitmap

	constructor(name, resource) {
		this.name = name;
		this.resource = resource;
		this.bitmap = new storage_bitmap(this.canvas_w, this.canvas_h);
		this.bitmap.clear();
	}

	drop() {
		if (this.resource.spend(this.bricks_stored)) {
			this.bricks_stored = 0;
			this.clear();
		}
	}

	clear() {
		this.canvas.fillStyle = "#FFFFFF";
		this.canvas.fillRect(
			this.canvas_border,
			this.canvas_border,
			this.canvas_w,
			this.canvas_h);
	}
}

// Storage Bitmap Class - Records contents of a resource storage
class storage_bitmap {
	x;
	y;
	bits = [];

	constructor(x, y) {
		this.x = x;
		this.y = y;
		for (let i = 0; i < x; i++) {
			this.bits[i] = [];
		}
		this.clear();
	}

	clear() {
		for (let i = 0; i < this.x; i++) {
			for (let j = 0; j < this.y; j++) {
				this.bits[i][j] = 0;
			}
		}
	}
}

function storage_init(storage) {
	storage.canvas.fillStyle = "#000000";
	storage.canvas.fillRect(
		0,
		0,
		storage.canvas_w + (2 * storage.canvas_border),
		storage.canvas_h + (2 * storage.canvas_border));
	storage.clear();
}

function draw_storage(resource, storage) {
	for (; storage.bricks_stored < Math.floor(resource.current); storage.bricks_stored++) {
		// Calculate brick location
		let bricks_per_w = storage.canvas_w / storage.brick_w;

		let draw_x = storage.canvas_w - (storage.brick_w * ((storage.bricks_stored % bricks_per_w) + 1));
		let draw_y = storage.canvas_h - (storage.brick_h * (Math.floor(storage.bricks_stored / bricks_per_w) + 1));

		// Choose brick color
		if (storage.storage_flags & STORAGE_FLAGS_EARTH) {
			storage.canvas.fillStyle = colorRange_MkII(color_MkII_earth);
		}
		else if (storage.storage_flags & STORAGE_FLAGS_WATER) {
			color_MkII_water_temp = color_MkII_water;
			color_MkII_water_temp.darkness_low = (((storage.canvas_h - draw_y) / storage.canvas_h) * (color_MkII_water.darkness_high - color_MkII_water.darkness_low)) + color_MkII_water.darkness_low;
			color_MkII_water_temp.darkness_high = color_MkII_water_temp.darkness_low;
			storage.canvas.fillStyle = colorRange_MkII(color_MkII_water_temp);

			//console.log("Water y = " + draw_y + "; color_MkII_water_temp = {" + color_MkII_water_temp.hue_low + ", " + color_MkII_water_temp.hue_high + ", " + color_MkII_water_temp.darkness_low + ", " + color_MkII_water_temp.darkness_high + ", " + color_MkII_water_temp.saturation_low + ", " + color_MkII_water_temp.saturation_high + "}");
		}

		// Draw brick
		storage.canvas.fillRect(
			draw_x + storage.canvas_border,
			draw_y + storage.canvas_border,
			storage.brick_w,
			storage.brick_h);

		// Debugging: Log brick drawn
		//console.log(storage.name + ": Drawing brick #" + (storage.bricks_stored + 1) + " at " + draw_x + "x " + draw_y + "y (" + storage.brick_w + "w, " + storage.brick_h + "h) " + storage.canvas.fillStyle);
	}
}