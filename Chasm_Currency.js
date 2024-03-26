// Chasm Currency
	// Currencies are collected by the player in various ways
	// to be spent on upgrades. To add a currency:
	//
	// 1. Add currency to cid table							[_CURRENCY_ID]
	// 2. Add currency to init function						[initCurrency]

class _CURRENCY_ID {
	currency_first			= 0x0000;

	// Standard Currency
	currency_particles 		= 0x0000;
	currency_strands 		= 0x0001;
	currency_spirit 		= 0x0002;
	currency_soul	 		= 0x0003;
	currency_capital		= 0x0004;

	// Prestige Currency
	prestige_first			= 0x0005; // Prestige bounds
	currency_singularity	= 0x0005;
	currency_challenge_1	= 0x0006; // Ecocide Token
	currency_challenge_2	= 0x0007; // Unimplemented
	currency_challenge_3	= 0x0008; // Unimplemented
	currency_challenge_4	= 0x0009; // Unimplemented
	currency_challenge_5	= 0x000a; // Unimplemented
	currency_challenge_6	= 0x000b; // Unimplemented
	currency_challenge_7	= 0x000c; // Unimplemented
	currency_challenge_8	= 0x000d; // Unimplemented
	currency_challenge_9	= 0x000e; // Unimplemented
	prestige_last			= 0x000e; // Prestige bounds

	// Special Currency
	currency_mass 			= 0x000f;
	currency_workers		= 0x0010;
	currency_machinery		= 0x0011;

	currency_max			= 0x0012;
} var cid = new _CURRENCY_ID();

class _CHASM_CURRENCY {
	inspector_symbol;
	hidden = true;

	// Saved data
	resource;

	constructor(name, inspector_symbol) {
		this.resource = new chasm_resource(name); // Must match Currency ID for save/load compatibility
		this.resource.option_unlocked = true;
		this.inspector_symbol = inspector_symbol;
	}
}

var chasm_currency = new Array(cid.currency_max);

function initCurrency() {
	for (let i = cid.currency_first; i < cid.currency_max; i++) {
		switch(i) {
			case cid.currency_particles:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_particles",
														"<i class = 'material-icons purple-text text-lighten-3 currency_icon'>blur_circular</i>");
				break;

			case cid.currency_strands:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_strands",
														"<i class = 'material-icons amber-text text-darken-1 currency_icon'>gesture</i>");
				break;
				
			case cid.currency_spirit:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_spirit",
														"<i class = 'material-icons green-text text-lighten-2 currency_icon'>flare</i>");
				break;

			case cid.currency_soul:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_soul",
														"<i class = 'material-icons red-text text-lighten-2 currency_icon'>whatshot</i>");
				break;

			case cid.currency_capital:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_capital",
														"<i class = 'material-icons light-green-text currency_icon'>money_off</i>");
				break;

			case cid.currency_mass:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_mass",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon'>archive</i>");
				break;

			case cid.currency_workers:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_workers",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon'>face</i>");
				chasm_currency[i].resource.gain(1);
				break;

			case cid.currency_machinery:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_machinery",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon'>toys</i>");
				break;

			case cid.currency_singularity:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_singularity",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>adjust</i>");
				break;

			case cid.currency_challenge_1:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_1",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_challenge_1'>stars</i>");
				break;

			case cid.currency_challenge_2:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_2",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_3:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_3",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_4:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_4",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_5:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_5",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_6:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_6",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_7:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_7",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_8:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_8",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;

			case cid.currency_challenge_9:
				chasm_currency[i] = new _CHASM_CURRENCY("currency_challenge_9",
														"<i class = 'material-icons grey-text text-darken-4 currency_icon gradient_singularity'>stars</i>");
				break;
	
			default:
				chasm_currency[i] = new _CHASM_CURRENCY("error", "");
		}
	}
}

class currency_value_map {
	map;

	constructor(map) {
		this.map = new Array(cid.currency_max);
		let i = 0;
		for (; i < map.length; i++) {
			this.map[i] = map[i];
		}
		for (; i < cid.currency_max; i++) {
			this.map[i] = 0;
		}
	}

	stringify() {
		let out = "";

		let cost_prewrapper 				= "<p style = 'margin-left: 6px; margin-right: 3px;'>";
		let cost_postwrapper 				= "</p>";

		let cost_unaffordable_prewrapper 	= "<span style = 'color: LightPink;'>";
		let cost_unaffordable_postwrapper 	= "</span>";

		for (let i = 0; i < cid.currency_max; i++) {
			if (this.map[i] > 0) {
				let affordable;
				if (chasm_currency[i].resource.current.lt(this.map[i])) affordable = 2;
				else affordable = false;

										out += cost_prewrapper;
				if (affordable)			out += cost_unaffordable_prewrapper;
										out += DisplayNumberFormatter(this.map[i], 2);
				if (affordable)			out += cost_unaffordable_postwrapper;
										out += cost_postwrapper + chasm_currency[i].inspector_symbol;
			}
		}

		return out;
	}
}

function currency_gain(currency_count) {
	for(let i = 0; i < cid.currency_max; i++) {
		chasm_currency[i].resource.gain(currency_count[i]);
	}
}