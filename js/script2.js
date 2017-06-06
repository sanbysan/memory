var rowCount = 5;
var columnCount = 4;

function randomizeElements() {
	var elementsCount = rowCount * columnCount;
	var elements = [];
	for(var i = 0; i < elementsCount / 2; i++) {
		elements.push(i);
		elements.push(i);
	}
	
	// lista elements będzie dla 5 wierszy i 4 kolumn wyglądała tak: [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9]
	
	console.log(elements);
	
	$elements = $("#elements");
	for(var rowNumber = 0; rowNumber < rowCount; rowNumber++) {
		// tworzę diva, który będzie reprezentował jeden wiersz elementów
		$row = $("<div class='row'/>");
		$elements.append($row);
		for(var colNumber = 0; colNumber < columnCount; colNumber++) {
			var randomElementIndex = Math.floor(Math.random() * elements.length);
			var elementValue = elements[randomElementIndex];
			elements.splice(randomElementIndex, 1);
			
			$element = $("<div class='element'>zakryta karta</div>");
			$element.data("value", elementValue);
			
			$row.append($element);
		}
	}
	
	$(".element").click(function() {
		var $element = $(this);
		console.log($element.data("value"));
	});
}

$(document).ready(function() {
	randomizeElements();
});