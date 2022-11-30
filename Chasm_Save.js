// Game Save data
class saveData {
	version_major;
	version_minor;
	saveCount;

	achievements = {};
	milestones = {};

	constructor() {
		this.version_major = 0;
		this.version_minor = 1;
		this.saveCount = 0;

		this.achievements = save_pack_achievements();
		this.milestones = save_pack_milestones();
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
		lib_chasm_merge_save(chasm_save, chasm_incoming_save);
		save_unpack_achievements(chasm_save.achievements);
		save_unpack_milestones(chasm_save.milestones);
	}
}

function storeSave() {
	chasm_save.saveCount++;
	chasm_save.achievements = save_pack_achievements();
	chasm_save.milestones = save_pack_milestones();
	lib_chasm_store_save(save_path, chasm_save);
}

function autoSave() {
	storeSave();
}

// Save data population
function save_pack_achievements() {
	var object = {};
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		object[chasm_achievements[i].name] = chasm_achievements[i].unlocked;
	}
	return object;
}

function save_unpack_achievements(object) {
	for (var prop in object) {
		chasm_achievements[aid[prop]].unlocked = object[prop];
	}
}

function save_pack_milestones() {
	var object = {};
	for (let i = mid.milestone_first; i < mid.milestone_count; i++) {
		object[chasm_milestones[i].name] = chasm_milestones[i].unlocked;
	}
	return object;
}

function save_unpack_milestones(object) {
	for (var prop in object) {
		chasm_milestones[mid[prop]].unlocked = object[prop];
	}
}