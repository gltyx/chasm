// Library Info - DO NOT MANUALLY EDIT, BUILT BY buildscript.js
var _CHASM_LOGGING_VERSION_MAJOR = 0;
var _CHASM_LOGGING_VERSION_MINOR = 0;
var _CHASM_LOGGING_VERSION_BUILD = 167;
var _CHASM_LOGGING_BUILD_TIME = new Date(1645485663237);

// Logging Module
	// Enables functionality and formatting for a customizable logging div

class _CHASM_LOG_DIRECTION {
	top 		= 0;
	bottom 		= 1;
} var _CHASM_LD = new _CHASM_LOG_DIRECTION();

class lib_chasm_log {
	#div_id;

	#queue_size;
	#message_queue;
	#color_queue;
	#queue_head = 1;
	#queue_tail = 0;

	#log_direction;

	constructor(div_id, queue_size, log_direction) {
		// todo: add input validation
		this.#div_id = div_id;
		this.#queue_size = queue_size;
		this.#message_queue = new Array(queue_size);
		this.#color_queue = new Array(queue_size);
		this.#log_direction = log_direction;
	}

	write(string) {
		this.#write(string, "");
	}

	writeColor(string, color) {
		this.#write(string, color);
	}

	writeSectionDivider() {
		this.#message_queue[this.#queue_head] = "<hr>";
		this.#color_queue[this.#queue_head] = "";

		this.#queue_head++;
		if (this.#queue_head == this.#queue_size) {
			this.#queue_head = 0;
		}
		if (this.#queue_head == this.#queue_tail) {
			this.#queue_tail++;
		}
		if (this.#queue_tail == this.#queue_size) {
			this.#queue_tail = 0;
		}
		this.update();
	}

	#write(string, color) {
		this.#message_queue[this.#queue_head] = string;
		this.#color_queue[this.#queue_head] = color;

		this.#queue_head++;
		if (this.#queue_head == this.#queue_size) {
			this.#queue_head = 0;
		}
		if (this.#queue_head == this.#queue_tail) {
			this.#queue_tail++;
		}
		if (this.#queue_tail == this.#queue_size) {
			this.#queue_tail = 0;
		}
		this.update();
	}

	update() {
		let out_string = "";

		if (this.#log_direction == _CHASM_LD.top) {
			for (let i = this.#queue_head - 1;; i--) {
				if (i < 0) {
					i = this.#queue_size - 1;
				}

				out_string += "<p style = 'color: " + this.#color_queue[i] + ";'>" + this.#message_queue[i] + "</p>";

				let tailcheck = this.#queue_tail + 1;
				if (tailcheck == this.#queue_size) {
					tailcheck = 0;
				}

				if (i == tailcheck) {
					break;
				}
			}
		} else if(this.#log_direction == _CHASM_LD.bottom) {

		}

		document.getElementById(this.#div_id).innerHTML = out_string;
	}
}