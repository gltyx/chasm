class color_MkII {
	hue_low = 0;
	hue_high = 1;
	darkness_low = 0;
	darkness_high = 1;
	saturation_low = 0;
	saturation_high = 1;

	constructor(a, b, c, d, e, f) {
		this.hue_low = a;
		this.hue_high = b;
		this.darkness_low = c;
		this.darkness_high = d;
		this.saturation_low = e;
		this.saturation_high = f;
	}
}

var color_MkII_earth 		= new color_MkII(0.08, 0.12, 0.11, 0.28, 0.30, 0.47);
var color_MkII_copper 		= new color_MkII(0.07, 0.11, 0.56, 0.68, 0.50, 0.63);
var color_MkII_water 		= new color_MkII(0.62, 0.62, 0.10, 0.95, 0.80, 0.80);
var color_MkII_water_temp 	= new color_MkII(0.62, 0.62, 0.10, 0.95, 0.80, 0.80);

function colorRange(r1, r2, g1, g2, b1, b2) {
	let r = Math.floor((Math.random() * (r2 - r1)) + r1);
	let g = Math.floor((Math.random() * (g2 - g1)) + g1);
	let b = Math.floor((Math.random() * (b2 - b1)) + b1);
	var out = ("#" + ((r << 16) + (g << 8) + (b)).toString(16))
	//console.log("colorRange() Color Generated: " + out);
	return out;
}

// I've invented a new color theorem because it was faster than learning about any of the real ones.
// Yes this code is kind of a hacky joke. Please clap. I only kind of know how it works.
// 		hue = (0 - 1) Range of possible hues (based on google color picker lol)
// 		darkness = (0 - 1) Low is black, high is white
// 		saturation = (0 - 1) Low is grayscale, high is vibrant color
function colorRange_MkII(color) {
	let hue = (Math.random() * (color.hue_high - color.hue_low)) + color.hue_low;
	let darkness = (Math.random() * (color.darkness_high - color.darkness_low)) + color.darkness_low;
	let saturation = (Math.random() * (color.saturation_high - color.saturation_low)) + color.saturation_low;
	
	let colorPoints = darkness * 765;

	let r;
	let g;
	let b;

	if (hue >= 0.33333 && hue <= 0.66666) r = Math.floor(colorPoints * ((1 - saturation) * 0.33333));
	else if (hue < 0.33333) r = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * ((-3) * hue + 1))));
	else r = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * (3 * hue - 2))));

	if (hue >= 0.66666) g = Math.floor(colorPoints * ((1 - saturation) * 0.33333));
	else if (hue < 0.66666 && hue >= 0.33333) g = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * ((-3) * hue + 2))));
	else g = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * (3 * hue + 0))));

	if (hue <= 0.33333) b = Math.floor(colorPoints * ((1 - saturation) * 0.33333));
	else if (hue > 0.66666) b = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * ((-3) * hue + 3))));
	else b = Math.floor(colorPoints * (((1 - saturation) * 0.33333) + (saturation * (3 * hue - 1))));

	if (r < 0) r = 0;
	else if (r > 255) r = 255;
	if (g < 0) g = 0;
	else if (g > 255) g = 255;
	if (b < 0) b = 0;
	else if (b > 255) b = 255;
	
	//console.log("colorRange_MkII() Color Generated: " + r + "r " + g + "g " + b + "b");
	return {r, g, b};
}