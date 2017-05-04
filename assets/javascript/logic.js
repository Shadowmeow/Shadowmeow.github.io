var startingButtons = ["Kitten", "Puppy", "Panda", "Bunny",
  "Chinchilla"];

function makeButton(search){
  var button = $("<button type='button'>" + search + "</button>")
      .addClass("btn btn-warning").attr("data",search);
  $("#buttons").append(button);
}

$("#buttons").on("click", ".btn", function(){
  //empty gifs so no gifs overlap
  $("#display").empty();

  var selected = $(this).attr("data");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    selected + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET" 
  }).done(function(response){
      console.log(response);
      var result = response.data;
      for (var i = 0; i < result.length; i++) {
        var gifDiv = $("<div id='gifs'>");
        var p = $("<p>").text("Rating: " + result[i].rating);
        var topicImage = $("<img>");
        var imageLocation = result[i].images;
        //assign attributes to image div
        topicImage.attr("src", imageLocation.fixed_height_still.url);
        topicImage.attr("data-still", imageLocation.fixed_height_still.url);
        topicImage.attr("data-animate", imageLocation.fixed_height.url)
        topicImage.attr("data-state", "still")
        topicImage.addClass("gif");

        gifDiv.append(p);     
        gifDiv.append(topicImage);
            
        $("#display").prepend(gifDiv);
      }
    })
  });

$("#display").on("click", ".gif", function(event){
  event.preventDefault();
  // gets the current state of the clicked gif 
  var state = $(this).data("state");
  
  // toggle gif between animate and still
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).data("state", "animate");
  } 
  else if(state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).data("state", "still");
  }
})

$("#run-search").on("click", function(event){
  event.preventDefault();
  var term = $("#search-term").val().trim();
  if(term === "") {
    console.log("invalid search term");
  }
  else {
    // make new button
    makeButton(term);
    document.getElementById("form").reset();
  }
});

//make startingButtons on page opening
for(i = 0; i < startingButtons.length; i++) {
     makeButton(startingButtons[i]);
};