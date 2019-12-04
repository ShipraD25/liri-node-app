require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./key.js");
const axios = require('axios');
var fs = require("fs");


// get the info from the input (action, topic)


var action = process.argv[2];

// get the topic or loop or slice 
var topic = process.argv.slice(3).join(" ");

// based on the command you execute diferent api, solutions

function actions() {
    switch (action) {
        case `concert-this`:
            concert();
            break;

        case `spotify-this-song`:
            song();
            break;


        case `movie-this`:
            movie();
            break;


        case `do-what-it-says`:
            dodefault();
            break;



    }
}

function concert() {
    var query = `https://rest.bandsintown.com/artists/${topic}/events?app_id=codingbootcamp`

    // var query = "https://rest.bandsintown.com/artists/" + topic + "/events?app_id=codingbootcamp"

    // Make a request for a user with a given ID
    axios.get(query)
        .then(function(response) {
            // handle success
            //console.log(response);
            for (var i = 0; i < response.data.length; i++) {

                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].venue.country);
                console.log(response.data[i].datetime);
                console.log("---------------------------------");
                //  console.log(`At ${response.data[i].venue.name} in ${response.data[i].venue.city} - ${response.data[i].venue.country} in ${response.data[i].datetime}`)
                //  console.log("---------------------------------")
            }
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })


}

function song() {


    var spotify = new Spotify(keys.spotify);
    if (topic === "") {
        topic = "The Sign by Ace of Base"
    };

    spotify.search({ type: 'track', query: topic }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {

            console.log(`Song name: ${data.tracks.items[i].name}\nurl: ${data.tracks.items[i].preview_url},\nalbum: ${data.tracks.items[i].album.name}`);
            console.log(data.tracks.items[i].artists[0].name);
            console.log("\n-----------------------------------\n");
        }

    });
}

function movie() {

    if (topic === "") {
        topic = "Mr.Nobody"
    };
    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + topic + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("***********Movie Info***********");

            console.log("Title of the movie is: " + response.data.Title);
            console.log("Year the movie came out is: " + response.data.Year);
            console.log("The movie's rating on imdb is: " + response.data.imdbRating);
            console.log("The rating of the movie on rotten tomatoes is: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced is: " + response.data.Country);
            console.log("Language of the movie is: " + response.data.Language);
            console.log("Plot of the movie is: " + response.data.Plot);
            console.log("Actors in the movie are: " + response.data.Actors);

        }
    );




}

function dodefault() {
    fs.readFile("random.txt", "utf8", function(err, info) {
        console.log(info)
        action = info.split(",")[0]
        topic = info.split(",")[1]
        actions()
    })

}


actions()