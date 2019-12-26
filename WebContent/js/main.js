var stat_mark = "(?)";

var rangeMinOfDigital = 0;
var rangeMaxOfDigital = 20;
var rangeMinOfResult = 0;
var rangeMaxOfResult = 20;
var formulaCount = 5;
var digitalCount = 3;

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextFormula(lastDgital, lastSign, lastResult) {
	var s = getRndInteger(0, 1);
	if (s == lastSign) {
		if (getRndInteger(0, 1) == 0) {
			s = getRndInteger(0, 1);
		}
	}

	var p = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	if (p == lastDgital) {
		if (getRndInteger(0, 1) == 0) {
			p = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
		}
	}

	var tmp;
	if (s == 0) {
		tmp = lastResult - p;
	} else {
		tmp = lastResult + p;
	}
	if (!(tmp >= rangeMinOfResult && tmp <= rangeMaxOfResult)) {
		return [ "B" ];
	}

	var result = [];
	result[0] = tmp;
	result[1] = p;
	result[2] = s;
	result[3] = (s == 0 ? "-" : "+") + p;
	return result;
}
function getFormula() {
	var start = new Date().getTime();
	var p = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	var s = null;
	var r = p;
	var formula = "" + p;
	for (var i = 0; i < digitalCount - 1; i++) {
		var result = getNextFormula(p, s, r);
		while (result[0] == "B") {
			var now = new Date().getTime();
			if ((start + ((2 * digitalCount) * 1000)) < now) {
				break;
			}
			result = getNextFormula(p, s, r);
		}
		if (result[0] == "B") {
			return;
		} else {
			formula += result[3];
		}
		p = result[1];
		s = result[2];
		r = result[0];
	}

	return formula + "=" + result[0];
}
