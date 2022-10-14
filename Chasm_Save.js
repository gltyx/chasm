// Game Save data
// Need a way to handle save data version change
class saveData {
	saveCount;
	other_stuff;
	morethings;

	constructor() {
		this.saveCount = 1;
		this.other_stuff = 0;
		this.morethings = 3;
	}
}

var chasm;

function loadSave() {
	chasm = JSON.parse(localStorage.getItem("chasm"));
	if (!chasm) {
		// New Game
		chasm = new saveData();
	} else {
		// Load Game
		chasm.saveCount++;
	}
	localStorage.setItem("chasm", JSON.stringify(chasm));
}