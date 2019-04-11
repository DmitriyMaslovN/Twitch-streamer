// init project
const express = require('express');
const app = express();
const fetch = require('cross-fetch');
const cors = require('cors');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(cors());
app.use(express.urlencoded({ extended: true }));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/streams', (request, response) => {
  const guys =  ["ESL_SC2", 
                 "OgamingSC2", 
                 "cretetion", 
                 "freecodecamp", 
                 "storbeck", 
                 "habathcx", 
                 "RobotCaleb", 
                 "noobs2ninjas"];

 let arr = [];
  const twitch = () => {
      for(let key of guys){
      const promises = fetch(`https://wind-bow.glitch.me/twitch-api/streams/${key}`)
                  .then(res => res.json())
                  .then(result => result)
                  .catch(err => console.error(err));
       arr.push(promises);
      }
    Promise.all(arr).then(function(values) {
      response.send(values);
    });
    
  }
  twitch();
  
});

app.get('/channels', (request, response) => {
  const guys =  ["ESL_SC2", 
                 "OgamingSC2", 
                 "cretetion", 
                 "freecodecamp", 
                 "storbeck", 
                 "habathcx", 
                 "RobotCaleb", 
                 "noobs2ninjas"];

 let arr = [];
  const twitch = () => {
      for(let key of guys){
      const promises = fetch(`https://wind-bow.glitch.me/twitch-api/channels/${key}`)
                  .then(res => res.json())
                  .then(result => result)
                  .catch(err => console.error(err));
       arr.push(promises);
      }
    Promise.all(arr).then(function(values) {
      response.send(values);
    });
    
  }
  twitch();
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
