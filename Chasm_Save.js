// Game Save data
// Need a way to handle save data version change
class saveData {
	version_major;
	version_minor;
	saveCount;

	//achievements = chasm_achievements;

	constructor() {
		this.version_major = 0;
		this.version_minor = 1;
		this.saveCount = 0;
	}
}

var chasm_save;
var chasm_incoming_save;
const save_path = "chasm";

function loadSave() {
	chasm_save = new saveData();
	chasm_incoming_save = lib_chasm_load_save(save_path);
	if (!chasm_incoming_save) {
		// New Game
	} else {
		// Load Game
		lib_chasm_match_save_classes(chasm_save, chasm_incoming_save);
		lib_chasm_merge_save(chasm_save, chasm_incoming_save);
	}
}

function storeSave() {
	chasm_save.saveCount++;
	lib_chasm_store_save(save_path, chasm_save);
}

function autoSave() {
	storeSave();
}