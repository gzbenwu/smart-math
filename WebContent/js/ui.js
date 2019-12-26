$(document).on("click", ".show-page-loading-msg", function() {
	var $this = $(this), theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme, msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text, textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible, textonly = !!$this.jqmData("textonly");
	html = $this.jqmData("html") || "";
	$.mobile.loading("show", {
		text : msgText,
		textVisible : textVisible,
		theme : theme,
		textonly : textonly,
		html : html
	});
}).on("click", ".hide-page-loading-msg", function() {
	$.mobile.loading("hide");
});

$(document).ready(function() {
	$("#select-formulaCount").val(formulaCount);
	$("#select-digitalCount").val(digitalCount);
	$("#hid-result").val("" + hidResult);
	$("#hid-digital").val(hidDigitalCount);
	$("#hid-sign").val(hidSignCount);

	$("#rangeMinOfDigital").attr("value", rangeMinOfDigital);
	$("#rangeMinOfDigital").attr("min", minOfMinDigital);
	$("#rangeMinOfDigital").attr("max", maxOfMinDigital);
	$("#rangeMinOfDigital").attr("step", stepOfMinDigital);

	$("#rangeMaxOfDigital").attr("value", rangeMaxOfDigital);
	$("#rangeMaxOfDigital").attr("min", minOfMaxDigital);
	$("#rangeMaxOfDigital").attr("max", maxOfMaxDigital);
	$("#rangeMaxOfDigital").attr("step", stepOfMaxDigital);

	$("#rangeMinOfResult").attr("value", rangeMinOfResult);
	$("#rangeMinOfResult").attr("min", minOfMinResult);
	$("#rangeMinOfResult").attr("max", maxOfMinResult);
	$("#rangeMinOfResult").attr("step", stepOfMinResult);

	$("#rangeMaxOfResult").attr("value", rangeMaxOfResult);
	$("#rangeMaxOfResult").attr("min", minOfMaxResult);
	$("#rangeMaxOfResult").attr("max", maxOfMaxResult);
	$("#rangeMaxOfResult").attr("step", stepOfMaxResult);
});

function generate() {
	$("#blackboard").html("");
	for (var i = 0; i < formulaCount; i++) {
		var formula = getFormula();
		var newItem = $("#basic-item").clone();
		newItem.css("display", "block");
		newItem.html(formula == null ? "出题耗时太长！请检查并放宽参数组合条件！" : (formula[0] + "|" + formula[1]));
		$("#blackboard").append(newItem);
		if (formula == null) {
			break;
		}
	}
	$('#loadingoff').click();
}

function display() {
	$('#loadingon').click();
	setTimeout(generate, 10);
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
	digitalCount = 1 * $("#select-digitalCount").val();
	rangeMinOfDigital = 1 * $("#rangeMinOfDigital").val();
	rangeMaxOfDigital = 1 * $("#rangeMaxOfDigital").val();
	rangeMinOfResult = 1 * $("#rangeMinOfResult").val();
	rangeMaxOfResult = 1 * $("#rangeMaxOfResult").val();
	hidResult = $("#hid-result").val() == "true";
	hidDigitalCount = 1 * $("#hid-digital").val();
	hidSignCount = 1 * $("#hid-sign").val();
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
