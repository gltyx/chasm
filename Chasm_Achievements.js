// Chasm Achievements
	// Achievements are used to track player progress throught the game, as well as offer specific challenges
	// and rewards for player actions.
	//
	// To add a new Achievement, do the following:
	//
	// 1. Generate achievement resources									[xxx.png added to images]
	// 2. Add Achievement Id												[_ACHIEVEMENT_ID]
	// 3. Add achievement resources	to the init function					[init_achivements]
	// 4. Add achievement trigger to tick function or other location		[achievement_tick / wherever you want to handle the unlcok]
	
class _ACHIEVEMENT_ID {
	achievement_first							= 0x0000;

	// Achievement list
	achievement_babys_first_block 				= 0x0000;
	achievement_reality_sprang_a_leak 			= 0x0001;
	achievement_nothing_to_worry_about			= 0x0002;
	achievement_minor_case_of_wormhole			= 0x0003;
	achievement_eye_feel_extremely_unwell		= 0x0004;

	achievement_count							= 0x0005;
} var aid = new _ACHIEVEMENT_ID();

var achievement_log_color = "LightGreen"

class _ACHIEVEMENT {
	id;
	unlocked = false;
	dom_id;

	log_message;

	constructor(id, name, img_src, log_message) {
		this.id = id;

		// Add element to achievement div
		$("#achievements_box").append("<img id = '" + name + "' src = '" + img_src + "' class = 'pixelart locked_tile' width = '75' height = '75'  draggable = 'false'></img>");

		// Register events
		this.dom_id = $("#" + name);
		this.dom_id.mouseenter(function(){highlightAchievementTile(id);});
		this.dom_id.mouseleave(function(){resetAchievementTile(id);});

		this.log_message = log_message;
	}

	unlock() {
		this.unlocked = true;
		resetAchievementTile(this.id);
		showInspector(this.id + iid.offset_achivements);
		chasm_log.writeColor("Achievement: " + this.log_message, achievement_log_color);
	}
}

var chasm_achievements = new Array(aid.achievement_count);

function init_achievements() {
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		switch (i) {
			case aid.achievement_babys_first_block:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_babys_first_block",
															"images/a_babys_first_block.png",
															"Baby's First Block");
				break;

			case aid.achievement_reality_sprang_a_leak:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_reality_sprang_a_leak",
															"images/a_reality_sprang.png",
															"Reality Sprang a Leak");
				break;

			case aid.achievement_nothing_to_worry_about:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_nothing_to_worry_about",
															"images/a_nothing_to_worry_about.png",
															"Nothing to Worry About");
				break;

			case aid.achievement_minor_case_of_wormhole:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_minor_case_of_wormhole",
															"images/a_minor_case_of_wormhole.png",
															"A Minor Case of Wormhole");
				break;

			case aid.achievement_eye_feel_extremely_unwell:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_eye_feel_extremely_unwell",
															"images/a_eye_feel_extremely_unwell.png",
															"Eye Feel Extremely Unwell");
				break;

			default:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "a" + i, "images/a_locked.png");
		}
	}
}

function achievement_tick() {
	// Reality sprang a leak (1 particle)
	if (!chasm_achievements[aid.achievement_reality_sprang_a_leak].unlocked) {
		if (particles.alltime.gte(1)) {
			chasm_achievements[aid.achievement_reality_sprang_a_leak].unlock();
		}
	}

	// Nothing to worry about (100 particles)
	if (!chasm_achievements[aid.achievement_nothing_to_worry_about].unlocked) {
		if (particles.alltime.gte(100)) {
			chasm_achievements[aid.achievement_nothing_to_worry_about].unlock();
		}
	}

	// Minor Case of Wormhole (10,000 particles)
	if (!chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
		if (particles.alltime.gte(10000)) {
			chasm_achievements[aid.achievement_minor_case_of_wormhole].unlock();
		}
	}

	// Eye Feel Extremely Unwell (1,000,000 particles)
	if (!chasm_achievements[aid.achievement_eye_feel_extremely_unwell].unlocked) {
		if (particles.alltime.gte(1000000)) {
			chasm_achievements[aid.achievement_eye_feel_extremely_unwell].unlock();
		}
	}
}

function highlightAchievementTile(id) {
	chasm_achievements[id].dom_id.css("filter", "grayscale(60%)");
}

function resetAchievementTile(id) {
	if (chasm_achievements[id].unlocked) {
		chasm_achievements[id].dom_id.css("filter", "grayscale(0%)");
	} else {
		chasm_achievements[id].dom_id.css("filter", "grayscale(100%)");
	}
}

function load_achivements() {
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		resetAchievementTile(i);
	}
}