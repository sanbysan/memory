var rowCount = 5;
var columnCount = 2;
var movesCount = 5;
var comparisonCount;
var gameEnded;
var playersScore;
var currentPlayerIndex;
var playersNames;


function startGame() {
	gameEnded = false;
	comparisonCount = 0;
	currentPlayerIndex = 0;
	
	
	var playersCount = $('#players').val();
	playersScore = [];
	playersNames = [];
	$('.playersScore').remove();
	for(var i = 0; i < playersCount; i++) {
		playersScore.push(0);

		var name = prompt("What's the name of the player " + (i+1) + " ?", "Player " + (i+1));
		if (name == null){
			name = "Player " + (i+1);
		}
		playersNames.push(name);
		$('#playersScoreContainer').append('<div class="playersScore"><h5> ' + name +  ' score: </h5><p id="player' + i + 'score">0</p></div>');
	}
	
	showCurrentPlayer();
	$('#movesLeft').text(movesCount);
	$('#gameEnded').text("")
	
	var elementsCount = rowCount * columnCount;
	var elements = [];
	for ( var i = 0; i < elementsCount / 2; i++) {
		elements.push(i);
		elements.push(i);
	} 
	
	
	console.log(elements);
	
	var $elements = $('#elements');
	$elements.empty();
	for (var rowNumber = 0; rowNumber < rowCount; rowNumber++ ) {
		var $row = $('<div class="row"/>');
		$elements.append($row);
		for (var columnNumber = 0; columnNumber < columnCount; columnNumber++) {
			var randomElementIndex = Math.floor(Math.random() * elements.length);
					
			var elementValue = elements[randomElementIndex];
			elements.splice(randomElementIndex, 1);
			
			var $element = $('<div class="element hidden"><img src="img/zakryta.png"></div>');
			$element.data('value', elementValue);
			
			$row.append($element);
		}
	}
	
	$(".element").click(function() {
		if(!gameEnded) {
			var $element = $(this);
			var $shownElements = $(".element:not(.hidden):not(.permantentlyRevealed)");
			console.log($shownElements);
			if($shownElements.length === 2) {
				$shownElements.addClass("hidden");
				$shownElements.find("img").attr("src", "img/zakryta.png");
			}
			
			if ($element.hasClass("hidden")) {
				$element.find("img").attr("src", "img/" + $element.data("value") + ".jpg");
				$element.removeClass("hidden");
				
				if($shownElements.length === 1) {
					comparisonCount++;
					
					if(comparisonCount === movesCount) {
						console.log('koniec gry');
						gameEnded = true;
						$('#gameEnded').text("Game Ended")
					}
					if($shownElements.data("value") === $element.data("value")) {
						playersScore[currentPlayerIndex]++;
						$('#player' + currentPlayerIndex + 'score').text(playersScore[currentPlayerIndex]);
						
						$shownElements.addClass("permantentlyRevealed");
						$element.addClass("permantentlyRevealed");
					}
					else { // jeżeli odktyliśmy kartę, która nie jest równa pierwszej odkrytej
						currentPlayerIndex++;
						if(currentPlayerIndex == playersScore.length) {
							currentPlayerIndex = 0; // wracamy do pierwszego gracza
						}
						showCurrentPlayer();
					}
					if($('.hidden').length === 0) {
						console.log('koniec gry');
						gameEnded = true;
						$('#gameEnded').text("Game Ended")
					}
				}
				var comparisonLeft = movesCount - comparisonCount;
				$('#movesLeft').text(comparisonLeft);
				$('#scoreCount').text(score);
			}
		}
	});
}

function showCurrentPlayer (){
	$('.playersScore > p').css("border-style", "none");
	$('#player' + currentPlayerIndex + 'score').css("border", "2px solid #eee");
	$('#name').text(playersNames[currentPlayerIndex]);
}


function onStartButtonClick(){

	var wybranyLevel = $('#level').val();
	if (wybranyLevel == 1) {
		rowCount = 4;
		columnCount = 4;
		movesCount = 20;
	}
	else if (wybranyLevel == 2) {
		rowCount = 7;
		columnCount = 4;
		movesCount = 45;
	}
	else if (wybranyLevel == 3) {
		rowCount = 8;
		columnCount = 5;
		movesCount = 70;
	}
	startGame();
}

$('#score_button').click(function(){
	$('#score, #score1').toggleClass('visible');
})

$(document).ready(function() {
	$('#start').click(onStartButtonClick);
});
