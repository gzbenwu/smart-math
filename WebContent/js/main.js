var stat_mark = "(?)";

var rangeMinOfDigital = 0;
var rangeMaxOfDigital = 20;
var rangeMinOfResult = 0;
var rangeMaxOfResult = 20;
var formulaCount = 5;
var digitalCount = 3;

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

	var valueResult = formula;
	for (var i = 0; i < getJsonLength(sMap); i++) {
		var key = "S" + i;
		var blank = "S(" + i + ")";
		valueResult = valueResult.replace(blank, sMap[key]);
	}
	for (var i = 0; i < getJsonLength(pMap); i++) {
		var key = "P" + i;
		var blank = "P(" + i + ")";
		valueResult = valueResult.replace(blank, pMap[key]);
	}
	valueResult += "=" + result[0];

	var f = [];
	f[0] = valueResult;
	return f;
}
