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
	var start = new Date().getTime();
	for (var i = 0; i < formulaCount; i++) {
		var formula = getFormula();
		while (formula == null) {
			formula = getFormula();
			var now = new Date().getTime();
			if ((start + (2 * 1000)) < now) {
				break;
			}
		}
		var newItem = $("#basic-item").clone();
		newItem.css("display", "block");
		newItem.html(formula == null ? "无法出题！请检查参数组合是否有问题！" : formula);
		$("#blackboard").append(newItem);
		if (formula == null) {
			break;
		}
	}
}

function setupConfirm() {
	if (1 * $("#rangeMinOfDigital").val() >= 1 * $("#rangeMaxOfDigital").val()) {
		alert("数字范围数值不对！" + $("#rangeMinOfDigital").val() + " > " + $("#rangeMaxOfDigital").val() + "?!");
		return;
	}
	if (1 * $("#rangeMinOfResult").val() >= 1 * $("#rangeMaxOfResult").val()) {
		alert("结果范围数值不对！" + $("#rangeMinOfResult").val() + " > " + $("#rangeMaxOfResult").val() + "?!");
		return;
	}

	formulaCount = 1 * $("#select-formulaCount").val();
	rangeMinOfDigital = 1 * $("#rangeMinOfDigital").val();
	rangeMaxOfDigital = 1 * $("#rangeMaxOfDigital").val();
	rangeMinOfResult = 1 * $("#rangeMinOfResult").val();
	rangeMaxOfResult = 1 * $("#rangeMaxOfResult").val();
	// if (rangeMaxOfDigital < rangeMinOfResult) {
	// alert("数字范围与结果范围数值相差太大，无法出题！");
	// return;
	// }
	// if (rangeMaxOfResult < rangeMinOfDigital) {
	// alert("数字范围与结果范围数值相差太大，无法出题！");
	// return;
	// }
	// $("#disp-rangeOfResult").val($("#rangeMinOfResult").val() + " ~ " +
	// $("#rangeMaxOfResult").val());
	// $("#disp-rangeOfResult").button("refresh");
	$('#ref-page-main').click();
}

function clearBoard() {
	$("#blackboard").html("");
}
