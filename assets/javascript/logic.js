$(document).ready(function(){
	var config = {
    apiKey: "AIzaSyB_Y0UChYLmzDYDOfebKJ7CJi_NGEYqDQc",
    authDomain: "practice-app-a32d1.firebaseapp.com",
    databaseURL: "https://practice-app-a32d1.firebaseio.com",
    projectId: "practice-app-a32d1",
    storageBucket: "practice-app-a32d1.appspot.com",
    messagingSenderId: "288062333834"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var frequency;

	$("#add-train").on("click", function(){

		var train = $("#name-input").val().trim();
		var destination = $("#train-input").val().trim();
		var arrivalTime = $("#arrival-input").val().trim();
		var trainNumber = $("#number-input").val();
	  frequency = $('#frequency-input').val();
	  console.log(train);

    database.ref().push({
   		name: train,
   		destination: destination,
     	firstTrainTime: arrivalTime, 
     	frequency: frequency,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    });
     	// Clear inputs
      $(".form-control").empty();
	});

	$("#empty-all").on("click", function(){

	})

  database.ref().on("child_added", function(snapshot) {
		$("#trainName").append(snapshot.val().name + "<br>");
		$("#destination").append(snapshot.val().destination + "<br>");
		$("#frequency").append(snapshot.val().frequency + " minutes <br>");
		$("#arrivalTime").append(snapshot.val().firstTrainTime + "<br>");
		$("#timeToArrival").append(frequencyChecker(snapshot.val().firstTrainTime,
				snapshot.val().frequency) + " minutes <br>");
		// Handle the errors
		}, function(errorObject){
	});
  //Find the time left before next train arrives
	function findTimeLeft(arrival) {
		var currentTime = moment().format("HH:mm");
		console.log(currentTime);
		var trainTime = arrival;
		console.log(trainTime);
		var difference = moment(trainTime, "HH:mm")
			.diff(moment(currentTime, "HH:mm"), "minutes");
		console.log(difference);
		return difference;
	}

	function frequencyChecker(check, frequency) {
		var checkTime = findTimeLeft(check);
		var change = parseInt(frequency);
		while(checkTime < 0) {
			checkTime = change + checkTime;
		}
		return checkTime;
	}
});