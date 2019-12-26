function getJsonLength(jsonData) {
	var jsonLength = 0;
	for ( var item in jsonData) {
		jsonLength++;
	}
	return jsonLength;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
