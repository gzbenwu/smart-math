function getJsonLength(jsonData) {
	var jsonLength = 0;
	for ( var item in jsonData) {
		jsonLength++;
	}
	return jsonLength;
}
function getJsonValueByIndex(jsonData, idx) {
	var i = 0;
	for ( var item in jsonData) {
		if (i == idx) {
			return jsonData[item];
		}
		i++;
	}
}
function removeJsonValueByIndex(jsonData, idx) {
	var i = 0;
	for ( var item in jsonData) {
		if (i == idx) {
			var val = jsonData[item];
			delete jsonData[item];
			return val;
		}
		i++;
	}
}

function getRndInteger(min, max) {
	if (min >= max) {
		return max;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
