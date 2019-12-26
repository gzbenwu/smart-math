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

function generate() {
	$("#blackboard").html("");
	var start = new Date().getTime();
	for (var i = 0; i < formulaCount; i++) {
		var formula = getFormula();
		while (formula == null) {
			formula = getFormula();
			var now = new Date().getTime();
			if ((start + (3 * 1000)) < now) {
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
