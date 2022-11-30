// Chasm Achievements
	// Achievements are used to track player progress throughout the game, as well as offer specific challenges
	// and rewards for player actions.
	//
	// To add a new Achievement, do the following:
	//
	// 1. Generate achievement resources									[xxx.png added to images]
	// 2. Add Achievement Id												[_ACHIEVEMENT_ID]
	// 3. Add achievement resources	to the init function					[init_achievements]
	// 4. Add achievement trigger to tick function or other location		[achievement_tick / wherever you want to handle the unlock]

// Chasm Milestones
	// Milestones are used to track player progress without an entry on the achievement page.
	//
	// To add a new Milestone, do the following:
	//
	// 1. Add Milestone Id													[_MILESTONE_ID]
	// 2. Add milestone to the init function								[init_milestones]
	// 3. Add milestone trigger to tick function or other location			[milestone_tick / wherever you want to handle the unlock]

class _ACHIEVEMENT_ID {
	achievement_first							= 0x0000;

	// Achievement list
	achievement_babys_first_block 				= 0x0000;		// Drop a block into the Chasm
	achievement_reality_sprang_a_leak 			= 0x0001;		// Collect 1 particle alltime
	achievement_nothing_to_worry_about			= 0x0002;		// Collect 100 particles alltime
	achievement_minor_case_of_wormhole			= 0x0003;		// Collect 10000 particles alltime
	achievement_eye_feel_extremely_unwell		= 0x0004;		// Collect 1000000 particles alltime

	achievement_count							= 0x0005;
} var aid = new _ACHIEVEMENT_ID();
	
class _MILESTONE_ID {
	milestone_first								= 0x0000;

	// Milestone list
	milestone_reveal_research					= 0x0000;		// Show research tab once you gather enough currency to buy an upgrade
	milestone_reveal_currency_particles			= 0x0001;		// Show particles after getting some
	milestone_reveal_currency_strands			= 0x0002;		// Show strands after getting some
	milestone_reveal_currency_spirit			= 0x0003;		// Show spirit after getting some
	milestone_reveal_currency_soul				= 0x0004;		// Show soul after getting some
	milestone_reveal_currency_workers			= 0x0005;		// Show workers after getting some

	milestone_count								= 0x0006;
} var mid = new _MILESTONE_ID();

class _ACHIEVEMENT {
	// ID info
	id;							// Index within achievement array
	name;						// Must match ID name for save/load compatibility
	dom_id 			= "";		// HTML DOM ID

	// Log messages
	log_message 	= "";		// Achievement: Achievement Name
	unlock_message 	= "";		// Unlocked: New Feature
	story_message 	= "";		// This is the story explanation for the achievement

	// Save data
	unlocked 		= false; 	// Achievement unlocked state

	constructor(id, name, img_src, log_message, unlock_message, story_message) {
		this.id 				= id;
		this.name 				= name;
		this.log_message 		= log_message;
		this.unlock_message 	= unlock_message;
		this.story_message 		= story_message;

		// Add element to achievement div
		if (img_src != "") {
			$("#achievements_box").append("<img id = '" + name + "' src = '" + img_src + "' class = 'pixelart locked_tile' width = '75' height = '75'  draggable = 'false'></img>");

			// Register events
			this.dom_id = $("#" + name);
			this.dom_id.mouseenter(function(){highlightAchievementTile(id);});
			this.dom_id.mouseleave(function(){resetAchievementTile(id);});
		}
	}

	isMilestone() {
		if (this.dom_id == "") 	return true;
		else 					return false;
	}

	unlock() {
		if (!this.unlocked) {
			this.unlocked = true;

			if (!this.isMilestone()) {
				resetAchievementTile(this.id);
				showInspector(this.id + iid.offset_achievements);
			}
	
			if (this.log_message != "" || this.unlock_message != "" || this.story_message != "" || achievement_tab_hidden) {
				chasm_log.writeSectionDivider();
			}
	
			if (this.story_message != "") {
				chasm_log.writeColor(this.story_message, log_color_story);
			}
	
			if (this.unlock_message != "") {
				chasm_log.writeColor(this.unlock_message, log_color_unlock);
			}
	
			if (!this.isMilestone()) {
				if (achievement_tab_hidden) {
					achievement_tab_hidden = false;
					$("#tab_achievements").fadeIn(400);
					chasm_log.writeColor("Unlocked: Achievements tab", log_color_unlock);
				}
			}
	
			if (this.log_message != "") {
				chasm_log.writeColor("Achievement: " + this.log_message, log_color_achievement);
			}
		}
	}
}

var chasm_achievements 	= new Array(aid.achievement_count);
var chasm_milestones 	= new Array(mid.milestone_count);

var achievement_tab_hidden = true;

function init_achievements() {
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		switch (i) {
			case aid.achievement_babys_first_block:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_babys_first_block",
															"images/a_babys_first_block.png",
															"Baby's First Block",
															"",
															"You drop a block of dirt into the Chasm's maw. A few motes of some mysterious substance float from the depths to the surface.");
				break;

			case aid.achievement_reality_sprang_a_leak:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_reality_sprang_a_leak",
															"images/a_reality_sprang.png",
															"Reality Sprang a Leak",
															"",
															"");
				break;

			case aid.achievement_nothing_to_worry_about:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_nothing_to_worry_about",
															"images/a_nothing_to_worry_about.png",
															"Nothing to Worry About",
															"",
															"");
				break;

			case aid.achievement_minor_case_of_wormhole:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_minor_case_of_wormhole",
															"images/a_minor_case_of_wormhole.png",
															"A Minor Case of Wormhole",
															"",
															"");
				break;

			case aid.achievement_eye_feel_extremely_unwell:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "achievement_eye_feel_extremely_unwell",
															"images/a_eye_feel_extremely_unwell.png",
															"Eye Feel Extremely Unwell",
															"",
															"");
				break;

			default:
				chasm_achievements[i] = new _ACHIEVEMENT(i, "a" + i, "images/a_locked.png", "", "", "");
		}
	}
}

function init_milestones() {
	for (let i = mid.milestone_first; i < mid.milestone_count; i++) {
		switch (i) {
			case mid.milestone_reveal_research:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_research",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;
				
			case mid.milestone_reveal_currency_particles:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_particles",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;
			
			case mid.milestone_reveal_currency_strands:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_strands",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;
		
			case mid.milestone_reveal_currency_spirit:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_spirit",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;
	
			case mid.milestone_reveal_currency_soul:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_soul",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;
	
			case mid.milestone_reveal_currency_workers:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_workers",
														"",
														"",
														"Unlocked: Research tab",
														"You are going need to make some improvements around here if you ever want to fill the Chasm.");
				break;

			default:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "", "", "", "", "");
		}
	}
}

function achievement_tick() {
	// Reality sprang a leak (1 particle)
	if (!chasm_achievements[aid.achievement_reality_sprang_a_leak].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(1)) {
			chasm_achievements[aid.achievement_reality_sprang_a_leak].unlock();
		}
	}

	// Nothing to worry about (100 particles)
	else if (!chasm_achievements[aid.achievement_nothing_to_worry_about].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(100)) {
			chasm_achievements[aid.achievement_nothing_to_worry_about].unlock();
		}
	}

	// Minor Case of Wormhole (10,000 particles)
	else if (!chasm_achievements[aid.achievement_minor_case_of_wormhole].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(10000)) {
			chasm_achievements[aid.achievement_minor_case_of_wormhole].unlock();
		}
	}

	// Eye Feel Extremely Unwell (1,000,000 particles)
	else if (!chasm_achievements[aid.achievement_eye_feel_extremely_unwell].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(1000000)) {
			chasm_achievements[aid.achievement_eye_feel_extremely_unwell].unlock();
		}
	}
}

function milestone_tick() {
	// Reveal currency & particles (> 0 particles)
	if (!chasm_milestones[mid.milestone_reveal_currency_particles].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_particles].unlock();
			if (chasm_currency[cid.currency_particles].hidden) {
				chasm_currency[cid.currency_particles].hidden = false;
				$("#currency_particles_symbol").fadeIn(900);
				$("#currency_particles_value").fadeIn(900);
			}
		}
	}

	// Reveal research (0.4 particles)
	else if (!chasm_milestones[mid.milestone_reveal_research].unlocked) {
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(0.4)) {
			chasm_milestones[mid.milestone_reveal_research].unlock();
			if (research_tab_hidden) {
				research_tab_hidden = false;
				$("#tab_research").fadeIn(400);
			}
		}
	}

	// Reveal strands (> 0 strands)
	if (!chasm_milestones[mid.milestone_reveal_currency_strands].unlocked) {
		if (chasm_currency[cid.currency_strands].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_strands].unlock();
			if (chasm_currency[cid.currency_strands].hidden) {
				chasm_currency[cid.currency_strands].hidden = false;
				$("#currency_strands_symbol").fadeIn(800);
				$("#currency_strands_value").fadeIn(800);
			}
		}
	}

	// Reveal spirit (> 0 spirit)
	if (!chasm_milestones[mid.milestone_reveal_currency_spirit].unlocked) {
		if (chasm_currency[cid.currency_spirit].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_spirit].unlock();
			if (chasm_currency[cid.currency_spirit].hidden) {
				chasm_currency[cid.currency_spirit].hidden = false;
				$("#currency_spirit_symbol").fadeIn(800);
				$("#currency_spirit_value").fadeIn(800);
			}
		}
	}

	// Reveal soul (> 0 soul)
	if (!chasm_milestones[mid.milestone_reveal_currency_soul].unlocked) {
		if (chasm_currency[cid.currency_soul].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_soul].unlock();
			if (chasm_currency[cid.currency_soul].hidden) {
				chasm_currency[cid.currency_soul].hidden = false;
				$("#currency_soul_symbol").fadeIn(800);
				$("#currency_soul_value").fadeIn(800);
			}
		}
	}

	// Reveal workers (> 0 workers)
	if (!chasm_milestones[mid.milestone_reveal_currency_workers].unlocked) {
		if (chasm_currency[cid.currency_workers].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_workers].unlock();
			if (chasm_currency[cid.currency_workers].hidden) {
				chasm_currency[cid.currency_workers].hidden = false;
				$("#currency_workers_symbol").fadeIn(800);
				$("#currency_workers_value").fadeIn(800);
			}
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

function reload_achievements() {
	for (let i = aid.achievement_first; i < aid.achievement_count; i++) {
		resetAchievementTile(i);
	}
}