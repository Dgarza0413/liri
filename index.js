console.log("node is successful")

var fs = require("fs");
var axios = require("axios");
var spotify = require('node-spotify-api');
var command = process.argv[2];
var selection = process.argv[3];

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "388b3ed639db4dd5b087b97ab8411b0b",
    secret: "f817cab19893451098d14132ba67325b"
});




switch (command) {
    case "concert-this":
        var artist = process.argv[3]
        console.log("concert this was selected")
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                console.log("=========Bands in Town========")
                for (var i = 0; i < response.data.length; i++) {
                    console.log("")
                    console.log("----------Venue Name----------")
                    console.log(response.data[i].datetime)
                    console.log(response.data[i].venue.name);
                    console.log("")
                    console.log("---------Venue Location-------")
                    console.log("country: " + response.data[i].venue.country)
                    console.log("State: " + response.data[i].venue.region)
                    console.log("city: " + response.data[i].venue.city)
                    console.log("")
                    console.log("=============================")
                }

                // * Venue location

                // * Date of the Event (use moment to format this as "MM/DD/YYYY")
            }
        )
        break;
    case "spotify-this-song":
        spotify
            .request('https://api.spotify.com/v1/search?q=' + process.argv[3] + '&type=track')
            .then(function (data) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log(data.tracks.items[i])
                    // console.log(data.tracks.items[i].album.name)
                    // console.log(data.tracks.items[i].album.external_urls.sportify)

                }
                console.log("=========Artists=========")
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("")
                    console.log("=========album name===========")

                    // console.log(data.tracks.items[i].album.artists)
                    for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
                        console.log("artist Name: " + data.tracks.items[i].album.artists[j].name)
                    }
                    console.log("Track Name: " + data.tracks.items[i].name)
                    console.log("Open to album " + data.tracks.items[i].album.external_urls.spotify)
                    console.log("Preview Song " + data.tracks.items[i].preview_url)
                    console.log("album Name: " + data.tracks.items[i].album.name)
                    console.log("")

                }
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
        break;
    case "movie-this":
        var title = process.argv[3]
        console.log("movies were selected")
        axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("")
                console.log("==============OMDB===============")
                console.log("Title: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("imdb rating: " + response.data.imdbRating);
                console.log("rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country)
                console.log("language: " + response.data.Language)
                console.log("plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                console.log("=================================")
                console.log("")
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
