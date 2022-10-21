// Game Save data
// Need a way to handle save data version change
chasm_version_major = 0;
chasm_version_minor = 1;

class saveData {
	version_major;
	version_minor;
	saveCount;

	constructor() {
		this.version_major = chasm_version_major;
		this.version_minor = chasm_version_minor;
		this.saveCount = 1;
	}
}

var chasm_save;

function loadSave() {
	chasm_save = JSON.parse(localStorage.getItem("chasm"));
	if (!chasm_save) {
		// New Game
		chasm_save = new saveData();
	} else {
		// Load Game
	}
}

function storeSave() {
	chasm_save.saveCount++;
	localStorage.setItem("chasm", JSON.stringify(chasm_save));
}

function autoSave() {
	storeSave();
}