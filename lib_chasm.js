// Library Info - DO NOT MANUALLY EDIT, BUILT BY buildscript.js
var _CHASM_VERSION_MAJOR = 0;
var _CHASM_VERSION_MINOR = 0;
var _CHASM_VERSION_BUILD = 167;
var _CHASM_BUILD_TIME = new Date(1645485663237);

function lib_chasm_version() {
	return (_CHASM_VERSION_MAJOR + "." + _CHASM_VERSION_MINOR + "." + _CHASM_VERSION_BUILD);
}

function lib_chasm_build_time() {
	return _CHASM_BUILD_TIME;
}

// BigNumber.js Configuration
// To do: Make BigNumbers configurable by user
var _CHASM_DEFAULT_BIG_CONFIG = {
	DECIMAL_PLACES: 10,
	ROUNDING_MODE: 3,				//ROUND_FLOOR,
	EXPONENTIAL_AT: 9,
	RANGE: 500,
	CRYPTO: false,
	MODULO_MODE: 1,					//ROUND_DOWN,
	POW_PRECISION: 10,
	FORMAT: {
		prefix: '',
		decimalSeparator: '.',
		groupSeparator: ',',
		groupSize: 3,
		secondaryGroupSize: 0,
		fractionGroupSeparator: ' ',
		fractionGroupSize: 0,
		suffix: ''
	},
	ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyz'
}

BigNumber.config(_CHASM_DEFAULT_BIG_CONFIG);

// Resource Module
	// Chasm Resources are the primary objects for storing player inventory and statistics. Resources are an
	// abstract concept that represent anything the player can generate, collect, or spend.

class _CHASM_RESOURCE_TEMPLATE {
	// Resource Info
	name = "";

	// Resource Options
	option_unlocked = false;
	option_cap = false;

	// Constructor
	constructor(name) {
		this.name = name;
	}
}

class chasm_resource extends _CHASM_RESOURCE_TEMPLATE {
	// Resource Stats
	current = new BigNumber(0);
	cap = new BigNumber(0);
	alltime = new BigNumber(0);

	// Constructor
	constructor(name) {
		super(name);
	}

	// Gain resource
	gain(input) {
		// Input validation
		let amount = new BigNumber(input);
		if (!amount.isNaN()) {
			// Functionality
			if (this.option_unlocked) {

				if (!this.option_cap) {
					this.current = this.current.plus(amount);
				}
				else if (this.option_cap && this.current.lt(this.cap)) {
					this.current = this.current.plus(amount);
					if (this.current.gt(this.cap)) this.current = this.cap;
				}

				this.alltime = this.alltime.plus(amount);

				return true;
			}
			else return false;
		}
		else return false;
	}

	// Spend resource
	spend(input) {
		// Input validation
		let amount = new BigNumber(input);
		if (!amount.isNaN()) {
			// Functionality
			if (this.current.gte(amount)) {
				this.current = this.current.minus(amount);
				return true;
			}
			else return false;
		}
		else return false;
	}

	// Set resource
	set(input) {
		// Input validation
		let amount = BigNumber(input);
		if (!amount.isNaN()) {
			// Functionality
			this.current = amount;
			return true;
		}
		else return false;
	}

	// Set cap
	setCap(input) {
		// Input validation
		let amount = BigNumber(input);
		if (!amount.isNaN()) {
			// Functionality
			this.cap = amount;
			return true;
		}
		else return false;
	}

	// Print resource values. Useful for debugging, less useful for displaying in game.
	// Format:
	// 		[id] name: (current) (cap) (alltime)
	toString() {
		let string = 						this.name + ":";
		string +=							" (current = " + this.current.toFixed(0) + ")";
		if (this.option_cap) string +=		" (cap = " + this.cap.toFixed(0) + ")";
		string +=							" (alltime = " + this.alltime.toFixed(0) + ")";
		return string;
	}
}

class chasm_resource_small extends _CHASM_RESOURCE_TEMPLATE {
	// Resource Stats
	current = 0;
	cap = 0;
	alltime = 0;

	// Constructor
	constructor(name) {
		super(name);
	}

	// Gain resource
	gain(input) {
		// Input validation
		let amount = parseFloat(input);
		if (!Number.isNaN(amount)) {
			// Functionality
			if (this.option_unlocked) {

				if (!this.option_cap) {
					this.current += amount;
				}
				else if (this.option_cap && this.current < this.cap) {
					this.current += amount;
					if (this.current > this.cap) this.current = this.cap;
				}

				this.alltime += amount;

				return true;
			}
			else return false;
		}
		else return false;
	}

	// Spend resource
	spend(input) {
		// Input validation
		let amount = parseFloat(input);
		if (!Number.isNaN(amount)) {
			// Functionality
			if (this.current >= amount) {
				this.current -= amount;
				return true;
			}
			else return false;
		}
		else return false;
	}

	// Set resource
	set(input) {
		// Input validation
		let amount = parseFloat(input);
		if (!Number.isNaN(amount)) {
			// Functionality
			this.current = amount;
			return true;
		}
		else return false;
	}

	// Set cap
	setCap(input) {
		// Input validation
		let amount = parseFloat(input);
		if (!Number.isNaN(amount)) {
			// Functionality
			this.cap = amount;
			return true;
		}
		else return false;
	}

	// Print resource values. Useful for debugging, less useful for displaying in game.
	// Format:
	// 		[id] name: (current) (cap) (alltime)
	// To do: Make small numbers print toString() exponential like BigNumbers? Optionally print decimal places?
	toString() {
		let string = 						this.name + ":";
		string +=							" (current = " + Math.floor(this.current) + ")";
		if (this.option_cap) string +=		" (cap = " + Math.floor(this.cap) + ")";
		string +=							" (alltime = " + Math.floor(this.alltime) + ")";
		return string;
	}
}

// Price Module

// Returns price for one resource
function chasm_price_flat(bnCurrent, bnPriceBase, bnPriceChange) {
	return (bnPriceBase.plus(bnCurrent.times(bnPriceChange)));
}

// Task Module
	// Chasm Tasks are state-driven actions. Tasks are gathered into "Task Stacks", which are groups of tasks
	// that know each other's states. This can be used to implement mutually-exclusive task groups, task flows,
	// and compounding tasks.
class chasm_task {
	// Task Info
	name = "";
	id = 0;
	unlocked = 0;

	constructor(name, id) {
		this.name
	}
}

// Devtools Module
// Tool for graphing exponential progress in relation to upgrades & time