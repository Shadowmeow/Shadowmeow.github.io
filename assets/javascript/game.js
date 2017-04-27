var trivia = [{
	question: "How many different sounds can a cat make?",
    answers: ["100", "5", "15", "3"],
    correctAnswer: 0 
    },{
    question: "Why how long do cats sleep in a day?",
    answers: ["9-13 hours", "12-16 hours", "6-12 hours",
                      "14-18 hours"],
    correctAnswer: 1 
    },{ 
    question: "Who was the Egyptian goddess of cats?",
    answers: ["Li Shou", "Hecate", "Bastet", "Sekhmet"],
    correctAnswer: 2 
    },{ 
    question: "What is a group of kittens called?",
    answers: ["Litter", "Pride", "Pack", "Kindle"],
    correctAnswer: 3 
    },{
    question: "Do cats have more bones than humans?",
    answers: ["Yes", "No", "I dont know"],
    correctAnswer: 0 
    },{ 
    question: "How many species have cats help drive to extinction?",
    answers: ["33", "10", "0", "47"],
    correctAnswer: 0 
    }];
var currentQuestion; 
var correctAnswer;
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	endTime: "Out of time!",
	finished: "Meow!"
}

$("#startBtn").on('click', function(){
	$(this).hide();
	newGame();
});

$("#startOverBtn").on("click", function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#finalMessage").empty();
	$("#correct").empty();
	$("#incorrect").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	answered = true;
	var current = trivia[currentQuestion]
	//sets up new questions & answerList
	$(".question").html("<h2>" + current.question + "</h2>");
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(current.answers[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();
	
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	//clears question
	$(".thisChoice").empty();
	$(".question").empty();

	var current = trivia[currentQuestion];
	var rightAnswerIndex = current.correctAnswer;
	//checks to see correct, incorrect, or unanswered
	if(userSelect === rightAnswerIndex && answered === true){
		correctAnswer++;
	} else if(userSelect != rightAnswerIndex && answered === true){
		incorrectAnswer++;
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		answered = true;
	}
	
	if(currentQuestion === trivia.length - 1){
		setTimeout(scoreboard, 0)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 0);
	}	
}

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#finalMessage").html(messages.finished);
	$("#correct").html("Correct Answers: " + correctAnswer);
	$("#incorrect").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Again?");
}