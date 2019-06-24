console.log("node is successful")

var fs = require("fs");
var title = process.argv[2]
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var axios = require("axios");

// i need to use axios to pull api information from the following
// ========
// spotify
// bands in town
// omdb

// ombd api
// http://www.omdbapi.com/?i=tt3896198&apikey=4554814a
// axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
//     function (response) {
//         console.log("This movie's rating is: " + response.data.imdbRating);
//         console.log("The title is " + response.data.Title)
//         console.log(response.data)
//     })
//     .catch(function (error) {
//         if (error.response) {
//             console.log("----------Data----------");
//             console.log(error.response.data);
//             console.log("---------Status---------");
//             console.log(error.response.status);
//             console.log("---------Status---------");
//             console.log(error.response.headers);
//         } else if (error.request) {
//             console.log(error.request);
//         } else {
//             console.log("Error", error.message);
//         }
//         console.log(error.config);
//     });

// axios.get().then(
//     function (response) {
//         console.log("This bands in town API");
//     }
// )

// axios.get().then(
//     function (response) {
//         console.log("This is spotify API");
//     }
// )

// spotify api
// "https://accounts.spotify.com/api/token"
// `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`
// 388b3ed639db4dd5b087b97ab8411b0b


// bands in town
// ??????

// an else-if statement for when call a certain process.argv[2]

var command = process.argv[2];
var selection = process.argv[3];

switch (command) {
    case "concert-this":
        var artist = process.argv[3]
        console.log("concert this was selected")
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                // console.log(response.data);
                // console.log(response.data.venue)
                // console.log(response.data.venue.name)
                // console.log(response.data.datetime)
                // * Name of the venue
                for (var i = 0; i < response.data.length; i++) {
                    console.log("")
                    console.log("=========Bands in Town========")
                    console.log("")
                    console.log("==========Venue Name==========")
                    console.log(response.data[i].datetime)
                    console.log(response.data[i].venue.name);
                    console.log("")
                    console.log("=========Venue Location=======")
                    console.log("country: " + response.data[i].venue.country)
                    console.log("State: " + response.data[i].venue.region)
                    console.log("city: " + response.data[i].venue.city)
                    console.log("")
                }

                // * Venue location

                // * Date of the Event (use moment to format this as "MM/DD/YYYY")
            }
        )
        break;
    case "spotify-this-song":
        console.log("spotify was selected")
        break;
    case "movie-this":
        var title = process.argv[3]
        console.log("movies were selected")
        axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("The title is " + response.data.Title)
                console.log("Year of Movie: " + response.data.Year)
                console.log("imdb rating: " + response.data.imdbRating);
                console.log("rotten Tomatoes rating: " + response.data.Ratings.Source);
                console.log("")

                console.log(response.data)



                // * Title of the movie.
                // * Year the movie came out.
                // * IMDB Rating of the movie.
                // * Rotten Tomatoes Rating of the movie.
                // * Country where the movie was produced.
                // * Language of the movie.
                // * Plot of the movie.
                // * Actors in the movie.

            })
            .catch(function (error) {
                if (error.response) {
                    console.log("----------Data----------");
                    console.log(error.response.data);
                    console.log("---------Status---------");
                    console.log(error.response.status);
                    console.log("---------Status---------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        break;
    case "do-what-it-says":
        console.log("what it says was selected")
        break;
}
// if (command === "concert-this") {
//     console.log("concert this was selected")
// }

// if (command === "spotify-this-song") {
//     console.log("spotify was selected")
// }

