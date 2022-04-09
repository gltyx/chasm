// Storage canvas w/h must be in the set {2^x} for (x >= 0)
//	x 	=	0		1		2		3		4		5		6		7		8		9
//	w/h =	1		2		4		8		16		32		64		128		256		512
var STORAGE_CANVAS_BORDER_OFFSET = 1;
var STORAGE_CANVAS_W_DEFAULT = 64;
var STORAGE_CANVAS_H_DEFAULT = 64;

var STORAGE_FLAGS_ = 1 << 0;

// Resource Storage Class - Represents a resource storage box in the gui
class resource_storage {
	name = "";
	
	canvas;											// Canvas handle for animation
	canvas_w = STORAGE_CANVAS_W_DEFAULT;			// Canvas width
	canvas_h = STORAGE_CANVAS_H_DEFAULT;			// Canvas height
	canvas_border = STORAGE_CANVAS_BORDER_OFFSET;	// Border offset

	storage_flags = 0;								// Flags for different storage types (STORAGE_FLAGS_*)
	brick_w = 1;									// Number of x pixels in a brick
	brick_h = 1;									// Number of y pixels in a brick

	bricks_stored = 0;								// Number of bricks currently stored

	constructor(name) {
		this.name = name;
	}
}

function storage_init(storage) {
	storage.canvas.fillStyle = "#000000";
	storage.canvas.fillRect(
		0,
		0,
		storage.canvas_w + (2 * storage.canvas_border),
		storage.canvas_h + (2 * storage.canvas_border));
	clear_storage(storage);
}

function draw_storage(resource, storage) {
	for (; storage.bricks_stored < Math.floor(resource.current); storage.bricks_stored++) {
		// Calculate brick location
		let bricks_per_w = storage.canvas_w / storage.brick_w;
		let bricks_per_h = storage.canvas_h / storage.brick_h;

		let draw_x = storage.canvas_w - (storage.brick_w * ((storage.bricks_stored % bricks_per_h) + 1));
		let draw_y = storage.canvas_h - (storage.brick_h * (Math.floor(storage.bricks_stored / bricks_per_w) + 1));

		// Choose brick color (currently random, need base off storage color range eventually)
		storage.canvas.fillStyle = "#" + (Math.floor(Math.random() * 0xffffff)).toString(16);

		// Draw brick
		storage.canvas.fillRect(
			draw_x + storage.canvas_border,
			draw_y + storage.canvas_border,
			storage.brick_w,
			storage.brick_h);

		// Debugging: Log brick drawn
		console.log(storage.name + ": Drawing brick #" + (storage.bricks_stored + 1) + " at " + draw_x + "x " + draw_y + "y (" + storage.brick_w + "w, " + storage.brick_h + "h)");
	}
}

function drop_storage(resource, storage) {
	if (resource.spend(storage.bricks_stored)) {
		storage.bricks_stored = 0;
		clear_storage(storage);
	}
}

function clear_storage(storage) {
	storage.canvas.fillStyle = "#FFFFFF";
	storage.canvas.fillRect(
		storage.canvas_border,
		storage.canvas_border,
		storage.canvas_w,
		storage.canvas_h);
}