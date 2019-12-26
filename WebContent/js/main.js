var stat_mark = "(?)";
var rangeMinOfDigital = 0;
var rangeMaxOfDigital = 20;
var rangeMinOfResult = 0;
var rangeMaxOfResult = 20;

var formulaCount = 5;

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFormula() {
	var p1 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	var p2 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	if (p2 == p1) {
		if (getRndInteger(0, 1) == 0) {
			p2 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
		}
	}

	var p3 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	if (p3 == p2) {
		if (getRndInteger(0, 1) == 0) {
			p3 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
		}
	}

	var m1 = getRndInteger(0, 1);
	var m2 = getRndInteger(0, 1);
	if (m2 == m1) {
		if (getRndInteger(0, 1) == 0) {
			m2 = getRndInteger(0, 1);
		}
	}

	var tmp;
	if (m1 == 0) {
		tmp = p1 - p2;
	} else {
		tmp = p1 + p2;
	}
	if (!(tmp >= rangeMinOfResult && tmp <= rangeMaxOfResult)) {
		return null;
	}

	var result;
	if (m2 == 0) {
		result = tmp - p3;
	} else {
		result = tmp + p3;
	}
	if (!(result >= rangeMinOfResult && result <= rangeMaxOfResult)) {
		return null;
	}

	return p1 + (m1 == 0 ? "-" : "+") + p2 + (m2 == 0 ? "-" : "+") + p3 + "=" + stat_mark;
}
