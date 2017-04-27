$( document ).ready(function(){
	var answer;
	var crystal1;
	var crystal2;
	var crystal3;
	var crystal4;
	var wins = 0;
	var losses = 0;
	var guess = 0;

	function check() {
		if(guess === answer){
			wins++;
			reset();
		}
		else if(guess > answer) {
			losses++;
			reset();
		}
	}
	
	function reset() {
		crystal1 = randomValue();
		crystal2 = randomValue();
		crystal3 = randomValue();
		crystal4 = randomValue();
		newAnswer();
		guess = 0;
		update();
	}

	function newAnswer() {
		answer = Math.floor(Math.random() * 101) + 19;
		$("#answer").text(answer);
	}

	function randomValue() {
		return Math.floor(Math.random() * 11) + 1;
	}

	function update() {
		$("#guess").text(guess);
		$("#wins").text("Wins: " + wins);
		$("#losses").text("losses: " + losses);
	}

	reset();

	$(".crystal").on("click", function() {
		switch (this.id) {
			case "button-1": guess = guess + crystal1;
				break;
			case "button-2": guess = guess + crystal2;
				break;
			case "button-3": guess = guess + crystal3;
				break;
			case "button-4": guess = guess + crystal4;
				break;
		}
		check();
		update();
	});
});