// Chasm Currency
	// Currencies are collected by the player in various ways
	// to be spent on upgrades. To add a currency:
	//
	// 1. Add currency to cid table							[_CURRENCY_ID]
	// 2. Add currency to init function						[initCurrency]

class _CURRENCY_ID {
	currency_first		= 0x0000;

	// Standard Currency
	currency_particles 	= 0x0000;
	currency_strands 	= 0x0001;
	currency_spirit 	= 0x0002;
	currency_soul	 	= 0x0003;

	// Prestige Currency

	currency_count		= 0x0004;
} var cid = new _CURRENCY_ID();

class _CHASM_CURRENCY {
	resource;
	inspector_symbol;
	hidden;

	constructor(name, inspector_symbol) {
		this.resource = new chasm_resource(name);
		this.resource.option_unlocked = true;
		this.inspector_symbol = inspector_symbol;
		this.hidden = true;
	}
}

var chasm_currency = new Array(cid.currency_count);

function initCurrency() {
	for (let i = cid.currency_first; i < cid.currency_count; i++) {
		switch(i) {
			case cid.currency_particles:
				chasm_currency[i] = new _CHASM_CURRENCY("Void Particles",
														"<i class = 'material-icons purple-text text-lighten-3 currency_icon'>blur_circular</i>");
				break;

			case cid.currency_strands:
				chasm_currency[i] = new _CHASM_CURRENCY("Gravity Strands",
														"<i class = 'material-icons amber-text text-darken-1 currency_icon'>gesture</i>");
				break;
				
			case cid.currency_spirit:
				chasm_currency[i] = new _CHASM_CURRENCY("Spirit Sand",
														"<i class = 'material-icons green-text text-lighten-2 currency_icon'>flare</i>");
				break;

			case cid.currency_soul:
				chasm_currency[i] = new _CHASM_CURRENCY("Soul Splinters",
														"<i class = 'material-icons red-text text-lighten-2 currency_icon'>whatshot</i>");
				break;

			default:
				chasm_currency[i] = new _CHASM_CURRENCY("error",
														"");
		}
	}
}

class currency_value_map {
	map;

	constructor(map) {
		this.map = new Array(cid.currency_count);
		let i = 0;
		for (; i < map.length; i++) {
			this.map[i] = map[i];
		}
		for (; i < cid.currency_count; i++) {
			this.map[i] = 0;
		}
	}

	stringify() {
		let out = "";

		let cost_prewrapper 				= "<p style = 'margin-left: 6px;'>";
		let cost_postwrapper 				= "</p>";

		let cost_unaffordable_prewrapper 	= "<span style = 'color: red;'>";
		let cost_unaffordable_postwrapper 	= "<span style = 'color: red;'>";

		for (let i = 0; i < cid.currency_count; i++) {
			if (this.map[i] > 0) {
				let affordable;
				if (chasm_currency[i].resource.current.lt(this.map[i])) affordable = true;
				else affordable = false;

										out += cost_prewrapper;
				if (affordable)			out += cost_unaffordable_prewrapper;
										out += this.map[i];
				if (affordable)			out += cost_unaffordable_postwrapper;
										out += cost_postwrapper + chasm_currency[i].inspector_symbol;
			}
		}

		return out;
	}
}

function currency_gain(currency_count) {
	for(let i = 0; i < cid.currency_count; i++) {
		chasm_currency[i].resource.gain(currency_count[i]);
	}
}