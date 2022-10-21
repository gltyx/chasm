// Library Info - DO NOT MANUALLY EDIT, BUILT BY buildscript.js
var _CHASM_TIMING_VERSION_MAJOR = 0;
var _CHASM_TIMING_VERSION_MINOR = 0;
var _CHASM_TIMING_VERSION_BUILD = 167;
var _CHASM_TIMING_BUILD_TIME = new Date(1645485663237);

// Chasm Timing Module
// 		The Chasm Timing Module allows you to enroll functions in a simple scheduler which will execute them efficiently
// 		based on animation frames and timestamps.

let _CHASM_TIMING_CALLBACK = 0;
let _CHASM_TIMING_SCHEDULER = new Array();
let _CHASM_TIMING_LAST_TIMESTAMP = 0;

const chasm_process_flag_disable_multitick = 1 << 0;	// Only run process max once per animation frame, even if multiple ticks have accrued

class _CHASM_TIMING_PROCESS {
	function_callback = 0;
	tick_time = 100;
	tick_accrued = 0;
	
	// Process flags
	flags = 0;

	constructor(function_callback, tick_time, flags) {
		this.function_callback = function_callback;
		this.tick_time = tick_time;
		this.flags = flags;
	}
}

function chasm_timing_add_process_to_scheduler(function_callback, tick_time, flags) {
	if (typeof function_callback === "function" && tick_time > 0) {
		return _CHASM_TIMING_SCHEDULER.push(new _CHASM_TIMING_PROCESS(function_callback, tick_time, flags))
	}

	return 0;
}

function chasm_timing_remove_process_from_scheduler() {
	// stub
	return 0;
}

function chasm_timing_modify_process_in_scheduler() {
	// stub
	return 0;
}

function chasm_timing_init(animationCallback) {
	if (!_CHASM_TIMING_CALLBACK && typeof animationCallback === "function") {
		_CHASM_TIMING_CALLBACK = animationCallback;
		_CHASM_TIMING_LAST_TIMESTAMP = performance.now();
		window.requestAnimationFrame(_CHASM_TIMING_MODULE);
	} else {
		// Replace with error logging function later
		console.log("ERROR: Chasm Timing Module already initialized");
	}
}

function _CHASM_TIMING_MODULE(timestamp) {
	// Call animation function once every frame
	_CHASM_TIMING_CALLBACK();
	
	let time_delta = timestamp - _CHASM_TIMING_LAST_TIMESTAMP;
	let scalar = 0;

	// Loop through scheduler, running every function which has accrued at least one full tick
	for (let i = 0; i < _CHASM_TIMING_SCHEDULER.length; i++) {
		
		// Add accrued tick time
		_CHASM_TIMING_SCHEDULER[i].tick_accrued += time_delta;

		// Handle flags and set scalar
		if (_CHASM_TIMING_SCHEDULER[i].flags & chasm_process_flag_disable_multitick) {
			if (_CHASM_TIMING_SCHEDULER[i].tick_accrued > _CHASM_TIMING_SCHEDULER[i].tick_time) {
				_CHASM_TIMING_SCHEDULER[i].tick_accrued = _CHASM_TIMING_SCHEDULER[i].tick_time;
			}
		}
		
		scalar = _CHASM_TIMING_SCHEDULER[i].tick_time / 1000; 

		// Run process until accrued ticks run out
		while (_CHASM_TIMING_SCHEDULER[i].tick_accrued >= _CHASM_TIMING_SCHEDULER[i].tick_time) {
			_CHASM_TIMING_SCHEDULER[i].tick_accrued -= _CHASM_TIMING_SCHEDULER[i].tick_time;
			_CHASM_TIMING_SCHEDULER[i].function_callback(scalar);
		}
	}

	_CHASM_TIMING_LAST_TIMESTAMP = timestamp;
	window.requestAnimationFrame(_CHASM_TIMING_MODULE);
}