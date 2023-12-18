// Game Save data
class saveData {
	version_major;
	version_minor;
	saveCount;

	achievements 	= {};
	milestones 		= {};
	currency 		= {};
	upgrades		= {};
	storage			= {};
	etc				= {};

	constructor() {
		this.version_major 	= 0;
		this.version_minor 	= 1;
		this.saveCount 		= 0;

		this.achievements 	= save_pack_achievements();
		this.milestones 	= save_pack_milestones();
		this.currency 		= save_pack_currency();
		this.upgrades 		= save_pack_upgrades();
		this.storage		= save_pack_storage();
		this.etc			= save_pack_etc();
	}
}

var chasm_save;
var chasm_incoming_save;
const save_path = "chasm";
var last_save_time;

function loadSave() {
	chasm_save = new saveData();
	chasm_incoming_save = lib_chasm_load_save(save_path);

	if (chasm_incoming_save) {
		// Merge Save
		lib_chasm_merge_save(chasm_save, chasm_incoming_save);

		// Load Game
		save_unpack_achievements(chasm_save.achievements);
		save_unpack_milestones(chasm_save.milestones);
		save_unpack_currency(chasm_save.currency);
		save_unpack_upgrades(chasm_save.upgrades);
		save_unpack_storage(chasm_save.storage);
		save_unpack_etc(chasm_save.etc);
	}

	// Update UI elements
	refresh_ui();
}

function storeSave() {
	chasm_save.saveCount++;
	chasm_save.achievements 	= save_pack_achievements();
	chasm_save.milestones 		= save_pack_milestones();
	chasm_save.currency 		= save_pack_currency();
	chasm_save.upgrades 		= save_pack_upgrades();
	chasm_save.storage			= save_pack_storage();
	chasm_save.etc				= save_pack_etc();

	// Save to Local Storage
	lib_chasm_store_save(save_path, chasm_save);
	last_save_time = Date.now();
}

function autoSave() {
	//storeSave();
}

function clearSave() {
	lib_chasm_delete_save(save_path);
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

function save_pack_currency() {
	var object = {};
	for (let i = cid.currency_first; i < cid.currency_count; i++) {
		object[chasm_currency[i].resource.name] = lib_chasm_pack_resource(chasm_currency[i].resource);
	}
	return object;
}

function save_unpack_currency(object) {
	for (var prop in object) {
		chasm_currency[cid[prop]].resource = lib_chasm_unpack_resource(prop, object[prop]);
	}
}

function save_pack_upgrades() {
	var object = {};
	for (let i = uid.upgrade_first; i < uid.upgrade_count; i++) {
		object[chasm_upgrades[i].name] = chasm_upgrades[i].unlocked;
	}
	return object;
}

function save_unpack_upgrades(object) {
	for (var prop in object) {
		chasm_upgrades[uid[prop]].unlocked = object[prop];
	}
}

function save_pack_storage() {
	var object = {};
	for (let i = sid.storage_first; i < sid.storage_count; i++) {
		object[chasm_storage[i].name] = {};
		object[chasm_storage[i].name].workers_gather 	= chasm_storage[i].workers_gather;
		object[chasm_storage[i].name].workers_drop 		= chasm_storage[i].workers_drop;
		object[chasm_storage[i].name].workers_survey	= chasm_storage[i].workers_survey;
		object[chasm_storage[i].name].machinery_depth	= chasm_storage[i].machinery_depth;
		object[chasm_storage[i].name].gather_progress	= chasm_storage[i].gather_progress;
		object[chasm_storage[i].name].drop_progress		= chasm_storage[i].drop_progress;
	}
	return object;
}

function save_unpack_storage(object) {
	for (var storage in object) {
		chasm_storage[sid[storage]].workers_gather 		= object[storage].workers_gather;
		chasm_storage[sid[storage]].workers_drop 		= object[storage].workers_drop;
		chasm_storage[sid[storage]].workers_survey 		= object[storage].workers_survey;
		chasm_storage[sid[storage]].machinery_depth		= object[storage].machinery_depth;
		chasm_storage[sid[storage]].gather_progress 	= object[storage].gather_progress;
		chasm_storage[sid[storage]].drop_progress 		= object[storage].drop_progress;
	}
}

function save_pack_etc() {
	var object = {};
	object.pending_singularity 	= pending_singularity;
	object.rig_lvl_multi 		= rig_lvl_multi;
	object.rig_lvl_decay 		= rig_lvl_decay;
	object.rig_lvl_sustain 		= rig_lvl_sustain;
	return object;
}

function save_unpack_etc(object) {
	pending_singularity = object.pending_singularity;
	rig_lvl_multi 		= object.rig_lvl_multi;
	rig_lvl_decay 		= object.rig_lvl_decay;
	rig_lvl_sustain 	= object.rig_lvl_sustain;
}