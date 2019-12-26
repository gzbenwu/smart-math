var stat_mark = "(?)";

var formulaCount = 5;
var digitalCount = 3;
var hidResult = true;
var hidDigitalCount = 1;
var hidSignCount = 0;
var rangeMinOfDigital = 0;
var rangeMaxOfDigital = 20;
var rangeMinOfResult = 1;
var rangeMaxOfResult = 30;

var minOfMinDigital = 0;
var maxOfMinDigital = 100;
var stepOfMinDigital = 1;
var minOfMaxDigital = 0;
var maxOfMaxDigital = 100;
var stepOfMaxDigital = 1;
var minOfMinResult = 0;
var maxOfMinResult = 100;
var stepOfMinResult = 1;
var minOfMaxResult = 0;
var maxOfMaxResult = 100;
var stepOfMaxResult = 1;

function getNextFormula(pMap, sMap, lastDgital, lastSign, lastResult) {
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

	var pIdx = getJsonLength(pMap);
	var sIdx = getJsonLength(sMap);
	pMap["P" + pIdx] = p;
	sMap["S" + sIdx] = s == 0 ? "-" : "+";
	var result = [];
	result[0] = tmp;
	result[1] = p;
	result[2] = s;
	result[3] = "S(" + sIdx + ")" + "P(" + pIdx + ")";
	return result;
}
function getFormula() {
	var start = new Date().getTime();
	var p = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	var s = null;
	var r = p;
	var formula = "P(0)";
	var pMap = {
		"P0" : p
	};
	var sMap = {};
	for (var i = 0; i < digitalCount - 1; i++) {
		var result = getNextFormula(pMap, sMap, p, s, r);
		while (result[0] == "B") {
			var now = new Date().getTime();
			if ((start + ((2 * digitalCount) * 1000)) < now) {
				break;
			}
			result = getNextFormula(pMap, sMap, p, s, r);
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
	pMap["P" + getJsonLength(pMap)] = result[0];
	var formula = formula + "=P(" + (getJsonLength(pMap) - 1) + ")";

	var valueResult = fillIn(formula, pMap, sMap);
	var hidFormula = fillIn(formula, pMap, sMap);

	var f = [];
	f[0] = hidFormula;
	f[1] = valueResult;
	return f;
}

function fillIn(formula, pMap, sMap) {
	var f = formula;
	var pIdx = getJsonLength(pMap);
	var sIdx = getJsonLength(sMap);
	for (var i = 0; i < sIdx; i++) {
		var key = "S" + i;
		var blank = "S(" + i + ")";
		f = f.replace(blank, sMap[key]);
	}
	for (var i = 0; i < pIdx; i++) {
		var key = "P" + i;
		var blank = "P(" + i + ")";
		f = f.replace(blank, pMap[key]);
	}
	return f;
}