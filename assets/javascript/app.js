var cartoons = ["Superman", "Archies", "Tom & Jerry", "Batman"];

$(document).ready(function () {
	renderButtons();
});


function renderButtons() {

	$("#button-area").empty();
	for (var i = 0; i < cartoons.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("cartoon-button");
		newButton.text(cartoons[i]);
		var attribute = cartoons[i].replace(/ /g, "%20");
		newButton.attr("data-label", attribute);
		$("#button-area").append(newButton);
	}
}

$(document).on("click", "#add-cartoon", function () {

	event.preventDefault();
	var newCartoon = $("#cartoon-input").val().trim();
	cartoons.push(newCartoon);
	renderButtons();
	$("#cartoon-input").val("");
});

$(document).on("click", ".cartoon-button", function () {
	var fetchCartoon = $(this).attr("data-label");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		fetchCartoon + "&api_key=8KywPRRB7vHprT6Kvg5d8vmF7RLNGoY4&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		var results = response.data;
		// ========================
		$("#gif-area").empty();

		for (var i = 0; i < results.length; i++) {

			var cartoonDiv = $("<div>");
			cartoonDiv.attr("id","gif-div");
			var gifRating = $("<p>");
			gifRating.text("Rating: " + results[i].rating);
			var cartoonImage = $("<img>")
			cartoonImage.attr("src", results[i].images.fixed_height_still.url);
			cartoonImage.attr("data-state","still");
			cartoonImage.attr("data-still",results[i].images.fixed_height_still.url);
			cartoonImage.attr("data-animate",results[i].images.fixed_height.url);
			cartoonImage.addClass("gif");

			cartoonDiv.append(gifRating);
			cartoonDiv.append(cartoonImage);
			$("#gif-area").prepend(cartoonDiv);
		}

	});
});

$(document).on("click", ".gif", function () {
	var dataState = $(this).attr("data-state");
	if (dataState === "still"){
		$(this).attr("src",$(this).attr("data-animate"));
		$(this).attr("data-state","animate")
	} else {
		$(this).attr("src",$(this).attr("data-still"));
		$(this).attr("data-state","still")
	}
});




