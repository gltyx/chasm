// Chasm Achievements
	// Achievements are used to track player progress throughout the game, as well as offer specific challenges
	// and rewards for player actions. Milestones are hidden achievements which do not appear on the achievement page.
	//
	// To add a new Achievement, do the following:
	//
	// 1. (optional) Generate achievement resources							[xxx.png added to images]
	// 2. Add Achievement Id												[_ACHIEVEMENT_ID / _MILESTONE_ID]
	// 3. Add achievement resources	to the init function					[init_achievements / init_milestones]
	// 4. Add achievement trigger to tick function or other location		[achievement_tick / wherever you want to handle the unlock]

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
	milestone_reveal_currency_capital			= 0x0005;		// Show capital after getting some
	milestone_reveal_currency_goo				= 0x0006;		// Show goo after getting some
	milestone_reveal_currency_core				= 0x0007;		// Show cores after getting some
	milestone_reveal_currency_bugs				= 0x0008;		// Show bugs after getting some
	milestone_reveal_currency_machinery			= 0x0009;		// Show machinery after getting some
	milestone_reveal_currency_singularity		= 0x000a;		// Show singularity after getting some
	milestone_reveal_currency_challenge_1		= 0x000b;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_2		= 0x000c;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_3		= 0x000d;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_4		= 0x000e;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_5		= 0x000f;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_6		= 0x0010;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_7		= 0x0011;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_8		= 0x0012;		// Show challenge token after getting some
	milestone_reveal_currency_challenge_9		= 0x0013;		// Show challenge token after getting some

	milestone_count								= 0x0014;
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

	// Saved data
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

				calculateAchievementCount();
			}
	
			if (this.log_message != "") {
				chasm_log.writeColor("Achievement: " + this.log_message, log_color_achievement);
			}
		}
	}
}

function calculateAchievementCount() {
	let earn_count = 0;
	for (let i = 0; i < aid.achievement_count; i++) {
		if (chasm_achievements[i].unlocked) earn_count++;
	}
	achievements_earned = earn_count;
}

var chasm_achievements 	= new Array(aid.achievement_count);
var chasm_milestones 	= new Array(mid.milestone_count);
var achievements_earned = 0;

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
														"",
														"");
				break;
			
			case mid.milestone_reveal_currency_strands:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_strands",
														"",
														"",
														"",
														"");
				break;
		
			case mid.milestone_reveal_currency_spirit:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_spirit",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_soul:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_soul",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_capital:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_capital",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_goo:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_goo",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_core:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_core",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_bugs:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_bugs",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_machinery:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_machinery",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_singularity:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_singularity",
														"",
														"",
														"",
														"");
				break;
	
			case mid.milestone_reveal_currency_challenge_1:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_1",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_2:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_2",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_3:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_3",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_4:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_4",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_5:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_5",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_6:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_6",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_7:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_7",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_8:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_8",
														"",
														"",
														"",
														"");
				break;

			case mid.milestone_reveal_currency_challenge_9:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "milestone_reveal_currency_challenge_9",
														"",
														"",
														"",
														"");
				break;

			default:
				chasm_milestones[i] = new _ACHIEVEMENT(i, "", "", "", "", "");
		}
	}
}

function achievement_tick() {
	// ACHIEVEMENTS
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

	// MILESTONES
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
		if (chasm_currency[cid.currency_particles].resource.alltime.gte(0.08)) {
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

	// Reveal capital (> 0 capital)
	if (!chasm_milestones[mid.milestone_reveal_currency_capital].unlocked) {
		if (chasm_currency[cid.currency_capital].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_capital].unlock();
			if (chasm_currency[cid.currency_capital].hidden) {
				chasm_currency[cid.currency_capital].hidden = false;
				$("#currency_capital_symbol").fadeIn(800);
				$("#currency_capital_value").fadeIn(800);
			}
		}
	}

	// Reveal goo (> 0 goo)
	if (!chasm_milestones[mid.milestone_reveal_currency_goo].unlocked) {
		if (chasm_currency[cid.currency_goo].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_goo].unlock();
			if (chasm_currency[cid.currency_goo].hidden) {
				chasm_currency[cid.currency_goo].hidden = false;
				$("#currency_goo_symbol").fadeIn(800);
				$("#currency_goo_value").fadeIn(800);
			}
		}
	}

	// Reveal core (> 0 core)
	if (!chasm_milestones[mid.milestone_reveal_currency_core].unlocked) {
		if (chasm_currency[cid.currency_core].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_core].unlock();
			if (chasm_currency[cid.currency_core].hidden) {
				chasm_currency[cid.currency_core].hidden = false;
				$("#currency_core_symbol").fadeIn(800);
				$("#currency_core_value").fadeIn(800);
			}
		}
	}

	// Reveal bugs (> 0 bugs)
	if (!chasm_milestones[mid.milestone_reveal_currency_bugs].unlocked) {
		if (chasm_currency[cid.currency_bugs].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_bugs].unlock();
			if (chasm_currency[cid.currency_bugs].hidden) {
				chasm_currency[cid.currency_bugs].hidden = false;
				$("#currency_bugs_symbol").fadeIn(800);
				$("#currency_bugs_value").fadeIn(800);
			}
		}
	}

	// Reveal machinery (> 0 machinery)
	if (!chasm_milestones[mid.milestone_reveal_currency_machinery].unlocked) {
		if (chasm_currency[cid.currency_machinery].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_machinery].unlock();
			if (chasm_currency[cid.currency_machinery].hidden) {
				chasm_currency[cid.currency_machinery].hidden = false;
				$("#currency_machinery_symbol").fadeIn(800);
				$("#currency_machinery_value").fadeIn(800);
			}
		}
	}

	// Reveal singularity (> 0 capital)
	if (!chasm_milestones[mid.milestone_reveal_currency_singularity].unlocked) {
		if (chasm_currency[cid.currency_singularity].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_singularity].unlock();
			if (chasm_currency[cid.currency_singularity].hidden) {
				chasm_currency[cid.currency_singularity].hidden = false;
				$("#currency_singularity_symbol").fadeIn(800);
				$("#currency_singularity_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 1 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_1].unlocked) {
		if (chasm_currency[cid.currency_challenge_1].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_1].unlock();
			if (chasm_currency[cid.currency_challenge_1].hidden) {
				chasm_currency[cid.currency_challenge_1].hidden = false;
				$("#currency_challenge_1_symbol").fadeIn(800);
				$("#currency_challenge_1_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 2 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_2].unlocked) {
		if (chasm_currency[cid.currency_challenge_2].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_2].unlock();
			if (chasm_currency[cid.currency_challenge_2].hidden) {
				chasm_currency[cid.currency_challenge_2].hidden = false;
				$("#currency_challenge_2_symbol").fadeIn(800);
				$("#currency_challenge_2_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 3 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_3].unlocked) {
		if (chasm_currency[cid.currency_challenge_3].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_3].unlock();
			if (chasm_currency[cid.currency_challenge_3].hidden) {
				chasm_currency[cid.currency_challenge_3].hidden = false;
				$("#currency_challenge_3_symbol").fadeIn(800);
				$("#currency_challenge_3_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 4 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_4].unlocked) {
		if (chasm_currency[cid.currency_challenge_4].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_4].unlock();
			if (chasm_currency[cid.currency_challenge_4].hidden) {
				chasm_currency[cid.currency_challenge_4].hidden = false;
				$("#currency_challenge_4_symbol").fadeIn(800);
				$("#currency_challenge_4_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 5 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_5].unlocked) {
		if (chasm_currency[cid.currency_challenge_5].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_5].unlock();
			if (chasm_currency[cid.currency_challenge_5].hidden) {
				chasm_currency[cid.currency_challenge_5].hidden = false;
				$("#currency_challenge_5_symbol").fadeIn(800);
				$("#currency_challenge_5_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 6 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_6].unlocked) {
		if (chasm_currency[cid.currency_challenge_6].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_6].unlock();
			if (chasm_currency[cid.currency_challenge_6].hidden) {
				chasm_currency[cid.currency_challenge_6].hidden = false;
				$("#currency_challenge_6_symbol").fadeIn(800);
				$("#currency_challenge_6_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 7 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_7].unlocked) {
		if (chasm_currency[cid.currency_challenge_7].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_7].unlock();
			if (chasm_currency[cid.currency_challenge_7].hidden) {
				chasm_currency[cid.currency_challenge_7].hidden = false;
				$("#currency_challenge_7_symbol").fadeIn(800);
				$("#currency_challenge_7_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 8 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_8].unlocked) {
		if (chasm_currency[cid.currency_challenge_8].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_8].unlock();
			if (chasm_currency[cid.currency_challenge_8].hidden) {
				chasm_currency[cid.currency_challenge_8].hidden = false;
				$("#currency_challenge_8_symbol").fadeIn(800);
				$("#currency_challenge_8_value").fadeIn(800);
			}
		}
	}

	// Reveal challenge 9 token (> 0 tokens)
	if (!chasm_milestones[mid.milestone_reveal_currency_challenge_9].unlocked) {
		if (chasm_currency[cid.currency_challenge_9].resource.alltime.gt(0)) {
			chasm_milestones[mid.milestone_reveal_currency_challenge_9].unlock();
			if (chasm_currency[cid.currency_challenge_9].hidden) {
				chasm_currency[cid.currency_challenge_9].hidden = false;
				$("#currency_challenge_9_symbol").fadeIn(800);
				$("#currency_challenge_9_value").fadeIn(800);
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