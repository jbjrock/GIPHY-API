// Button Array
var topics = ['lebron james', 'space jam', 'waterboy', 'the sandlot', 'above the rim', 'love & basketball', 'longest yard'];



// Button Creation
var app = {
    createButton: function () {
        for (var i = 0; i < topics.length; i++) {
            app.newButton(topics[i]);
        }
        app.setButtonClick();
    },  

    addBtn: function () {
        var userInput = $("input").val().toLowerCase();
        topics.push(userInput);
        app.newButton(userInput);
        app.setButtonClick();
    },

    newButton: function (topics) {
        $("#buttons").append(
            "<button type='button' class='btn btn-primary movieBtn mr-2' data-movie=" +
            topics +
            "'>" +
            topics +
            "</button>"
        );
    },

    setButtonClick: function () {
        $(".movieBtn").unbind("click");
        $(".movieBtn").on("click", function (event) {
            var movie = $(this).attr("data-movie");
            app.getGiphy(movie);
        });
    },

    // API Call

    getGiphy: function (movie) {
        $(".results").html(" ");
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            movie +
            "&api_key=YDTuE5JAKlMTWx8IVuIQGzg0stonowgF&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var movieImage = $("<img class='gif' data-state='still'>");
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(movieImage);

                $(".results").prepend(gifDiv);
            }

            $(".gif").on("click", function () {
                var gif = $(this);
                app.animation(gif);
            });
        });
    },

    animation: function (gif) {
        if (gif.attr("data-state") === "still") {
            gif.attr("src", gif.attr("data-animate"));
            gif.attr("data-state", "animate");
        } else {
            gif.attr("src", gif.attr("data-still"));
            gif.attr("data-state", "still");
        }
    }
};

$(document).ready(function () {
    app.createButton();

    $(".searchBtn").on("click", app.addBtn);
    $("input").keydown(function (e) {
        if (e.keyCode == 13) {
            app.addBtn();
        }
    });
});
