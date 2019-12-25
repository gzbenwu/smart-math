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
	var p3 = getRndInteger(rangeMinOfDigital, rangeMaxOfDigital);
	var m1 = getRndInteger(0, 1);
	var m2 = getRndInteger(0, 1);

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

	return p1 + (m1 == 0 ? "-" : "+") + p2 + (m2 == 0 ? "-" : "+") + p3 + "=";
}

function display() {
	$("#blackboard").html("");
	for (var i = 0; i < formulaCount; i++) {
		var formula = getFormula();
		while (formula == null) {
			formula = getFormula();
		}
		var newItem = $("#basic-item").clone();
		newItem.css("display", "block");
		newItem.html(formula);
		$("#blackboard").append(newItem);
	}
}

function reflushParams() {
	formulaCount = 1*$("#select-formulaCount").val();
	rangeMinOfResult = 1*$("#rangeMinOfResult").val();
	rangeMaxOfResult = 1*$("#rangeMaxOfResult").val();

	if (rangeMaxOfDigital < rangeMinOfResult) {
		return true;
	}
	return false;
}

function generate() {
	if (reflushParams()) {
		alert("数字范围太小，无法计算出设定的结果范围值！");
		return;
	}
	display();
}

function setRangeOfResult() {
	if (1*$("#rangeMinOfResult").val() >= 1*$("#rangeMaxOfResult").val()) {
		alert("数值不对！"+ $("#rangeMinOfResult").val() + " - " + $("#rangeMaxOfResult").val());
		return;
	}
	$("#disp-rangeOfResult").val($("#rangeMinOfResult").val() + " ~ " + $("#rangeMaxOfResult").val());
	$("#disp-rangeOfResult").button("refresh");
	$('#ref-page-main').click();
}
