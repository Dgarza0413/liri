// console.log("node is successful")
//i ran into trouble collecting from keys.js for the env
//instead i found a way using a config method to the env path
require("dotenv").config({ path: './.env' })
var Table = require('cli-table');
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
search()
function search() {
    switch (command) {
        case "concert-this":
            var nodeArgs = process.argv;
            // var search = "";
            var search = process.argv.slice(3).join("");
            // for (var i = 3; i < nodeArgs.length; i++) {
            //     if (i > 3 && i < nodeArgs.length) {
            //         search = search + " " + nodeArgs[i];
            //     } else {
            //         search += nodeArgs[i]
            //     }
            // }
            if (search === "") {
                search += "the killers"
            }
            console.log(search)
            console.log("concert this was selected")
            axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
                function (response) {
                    var table = new Table({
                        head: ['date', 'Venue', 'Country', 'region', 'city']
                        , colWidths: []
                    });
                    for (var i = 0; i < response.data.length; i++) {
                        table.push(
                            [
                                `${moment(response.data[i].datetime).format('MM/DD/YYYY')}`,
                                `${response.data[i].venue.name}`,
                                `${response.data[i].venue.country}`,
                                `${response.data[i].venue.region}`,
                                `${response.data[i].venue.city}`
                            ]
                        )
                    }
                    console.log(table.toString())
                }
            )
            break;
        case "spotify-this-song":
            var nodeArgs = process.argv;
            var search = "";
            for (var i = 2; i < nodeArgs.length; i++) {
                if (i > 2 && i < nodeArgs.length) {
                    search = search + nodeArgs[i] + " ";
                }
            }
            if (search === "") {
                search += "The Sign"
            }
            console.log(search)
            spotify
                .request('https://api.spotify.com/v1/search?q=' + search + '&type=track')
                .then(function spotify(data) {

                    for (var i = 0; i < data.tracks.items.length; i++) {
                        console.log("")
                        console.log("=========Spotify===========")
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
            // }
            break;
        case "movie-this":
            movieThis()
            function movieThis() {
                var nodeArgs = process.argv;
                var search = "";
                for (var i = 3; i < nodeArgs.length; i++) {
                    if (i > 3 && i < nodeArgs.length) {
                        search = search + " " + nodeArgs[i];
                    } else {
                        search += nodeArgs[i]
                    }
                }
                if (search === "") {
                    search += "mr nobody"
                }
                console.log("movies were selected")
                axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
                    function movie(response) {
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
            }
            break;
        case "do-what-it-says":
            console.log("what it says was selected")
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                var output = data.split(",")
                if (output[0] === "spotify-this-song") {
                    spotify
                        .request('https://api.spotify.com/v1/search?q=' + output[1] + '&type=track')
                        .then(function spotify(data) {

                            for (var i = 0; i < data.tracks.items.length; i++) {
                                console.log("")
                                console.log("=========Spotify===========")
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
                } else if (output[0] === "movie-this") {
                    axios.get("http://www.omdbapi.com/?t=" + output[1] + "&y=&plot=short&apikey=trilogy").then(
                        function movie(response) {
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

                } else if (output[0] === "concert-this") {
                    axios.get("https://rest.bandsintown.com/artists/" + output[1] + "/events?app_id=codingbootcamp").then(
                        function (response) {
                            console.log("==============================")
                            console.log("=========Bands in Town========")
                            console.log("==============================")
                            for (var i = 0; i < response.data.length; i++) {
                                console.log("")
                                console.log("----------Venue Name----------")
                                console.log(moment(response.data[i].datetime).format('MM/DD/YYYY'))
                                console.log(response.data[i].venue.name);
                                console.log("")
                                console.log("---------Venue Location-------")
                                console.log("country: " + response.data[i].venue.country)
                                console.log("State: " + response.data[i].venue.region)
                                console.log("city: " + response.data[i].venue.city)
                                console.log("")
                                console.log("=============================")
                            }
                        }
                    )

                }
            })
            break;
    }
}
