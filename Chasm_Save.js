// Game Save data
// Need a way to handle save data version change
chasm_version_major = 0;
chasm_version_minor = 1;

class saveData {
	version_major;
	version_minor;
	saveCount;

	//achievements = chasm_achievements;

	constructor() {
		this.version_major = chasm_version_major;
		this.version_minor = chasm_version_minor;
		this.saveCount = 0;
	}
}

var chasm_save;
var chasm_incoming_save;

function loadSave() {
	chasm_save = new saveData();
	chasm_incoming_save = JSON.parse(localStorage.getItem("chasm"));
	if (!chasm_incoming_save) {
		// New Game
	} else {
		// Load Game
		for (var prop in chasm_incoming_save) {
			if (!chasm_save.hasOwnProperty(prop)) {
				delete chasm_incoming_save[prop];
			}
		}
		Object.assign(chasm_save, chasm_incoming_save);
	}
}

function storeSave() {
	chasm_save.saveCount++;
	localStorage.setItem("chasm", JSON.stringify(chasm_save));
}

function autoSave() {
	storeSave();
}