// Library Info - DO NOT MANUALLY EDIT, BUILT BY buildscript.js
var _CHASM_SAVE_VERSION_MAJOR = 0;
var _CHASM_SAVE_VERSION_MINOR = 0;
var _CHASM_SAVE_VERSION_BUILD = 167;
var _CHASM_SAVE_BUILD_TIME = new Date(1645485663237);

// Save Module
	// Useful functions for saving game data and migrating save files across versions
function lib_chasm_store_save(file, object) {
	localStorage.setItem(file, JSON.stringify(object));
}

function lib_chasm_load_save(file) {
	return JSON.parse(localStorage.getItem(file));
}

function lib_chasm_merge_save(base_save, incoming_save) {
	Object.assign(base_save, incoming_save);
}

function lib_chasm_match_save_classes(base_save, incoming_save) {
	for (var prop in incoming_save) {
		if (!base_save.hasOwnProperty(prop)) {
			delete incoming_save[prop];
		}
	}
}