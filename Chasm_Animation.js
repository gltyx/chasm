function colorRange(r1, r2, g1, g2, b1, b2) {
	let r = Math.floor((Math.random() * (r2 - r1)) + r1);
	let g = Math.floor((Math.random() * (g2 - g1)) + g1);
	let b = Math.floor((Math.random() * (b2 - b1)) + b1);
	return ("#" + ((r * 16 * 16) + (g * 16) + (b)).toString(16));
}