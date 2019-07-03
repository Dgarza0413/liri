# liri
Having no website of its own. This project uses backend tech node to pass in information into the CLI and retrieve api information using axios and displaying onto the terminal

# Synopsis
liri is a CLI driven project where we utilize node to take in requests with the node `process.argv` and send them using various npm packages such as axios. We will use axios to pull api information from:
     * bands in town
     * spotify
     * ombd

We will then organize the data using cli-table.

# about liri.js
1. To start we first install and require all of our packages to the top of the file that includes table, fs, axios, moment, and our dotenv file.

2. Since this program requires the user to interact with the CLI we splice the process.argv to take in our request that does not discriminate towards spaces the user may use.

3. Give start-to-finish instructions on how to run the app
- This is primarily a node backend application and requires one to being within the folder of the executed file in order to work. By using the following code: node index.js <parameters>. one is able to provide the instructions to recieve information about a song, band, or movie.

4. Include screenshots, gifs or videos of the app functioning
 [link to Demo!](https://drive.google.com/file/d/16DyM-CzdWtvI3yC0jHLL8RQi6jYihhgB/view?usp=sharing)

5. Contain a link to a deployed version of the app
[link to page!](https://dgarza0413.github.io/liri/)

6. Clearly list the technologies used in the app
-Axios for requesting api
-node for runtime javascript
-moment is used for format

7. State your role in the app development
-individual developement of backend tech
