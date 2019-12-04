# liri-node-app

## Summary


Liri is a language Interpretation and Recognition Interface. 
Liri is a command line node app that takes in parameters and gives you back data from Bands in Town, Spotify and OMDB APIs.

The user can have these four commands(listed below) in conjuction with assosciated parameter for this app to work.
Commands that can be used are-
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

## HOW IT WORKS

1. Open your terminal for example gitbash.

2. Navigate to the folder that has liri.js file.

3. Depending on whatever command you want to run after typing node and file name the output will vary.

For example: if you want to run the concert-this command, type in as follows-
```
node liri.js concert-this <artist/band name here>

```
What this will do is search the Bands in Town Artist Events API for an artist and render the information about each event's venu name, venue location and date of the event to the terminal:

```
function concert() {
    var query = `https://rest.bandsintown.com/artists/${topic}/events?app_id=codingbootcamp`


    // Make a request for a user with a given ID
    axios.get(query)
        .then(function(response) {
            // handle success
            //console.log(response);
            for (var i = 0; i < response.data.length; i++) {

                console.log("Name of the Venue: " + response.data[i].venue.name);
                console.log("Location Of the Venue: " + response.data[i].venue.city);
                console.log("Date of the event: " + response.data[i].datetime);
                console.log("---------------------------------");
                
            }
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })

}
```
Output will look something like this on the terminal-

![image](https://user-images.githubusercontent.com/54960706/70172165-fb8c6e00-1684-11ea-8dd4-cca7fe40e0f4.png)












