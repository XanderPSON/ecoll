var flock = require('flockos');
var config = require('./config.js');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var translate = require('google-translate-api');

flock.setAppId(config.appId);
flock.setAppSecret(config.appSecret);

var app = express();
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/script'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Listen for events on /events, and verify event tokens using the token verifier.
app.use(flock.events.tokenVerifier);
app.post('/events', flock.events.listener);

var reqQuery = null

app.get('/sidebar', function (req, res) {
  reqQuery = req.query
  // console.log(req.query.flockEvent)
  //'{"chatName":"Lobby","chat":"g:107053_lobby",
  // "userName":"Xander Peterson","userId":"u:pnxk9angp3k5knp5",
  // "name":"client.pressButton","button":"appLauncherButton"}

  res.sendFile(__dirname + '/views/side-widget.html')
  // return res.json({'hello world': 'asdas'})
});


app.post('/message', function (req, res) {
  var flockEvent = JSON.parse(reqQuery.flockEvent)

  if (flockEvent.chat == 'g:107053_lobby') {
    for (var i = 0; i < users.length; i++) {
      translatedText = translateText(req.body)
      flock.callMethod('chat.sendMessage', tokens['u:pnxk9angp3k5knp5'], {
          to: users[i]['id'],
          text: 'hello people!'
      }, function (error, response) {
          if (!error) {
              console.log(response);
          }
      });
    }
  }
  else {
    flock.callMethod('chat.sendMessage', tokens[flockEvent.userId], {
          to: 'g:107053_lobby',
          text: 'hello lobby!'
      }, function (error, response) {
          if (!error) {
              console.log(response);
          }
      });
  }
  res.sendFile(__dirname + '/views/side-widget.html')
})

function translateText(text, fromL, toL) {
  translate(text, {from: fromL, to: toL}).then(res => {
    res.text
  }).catch(err => {
      console.error(err);
  });
}

// Read tokens from a local file, if possible.
var tokens;
try {
    tokens = require('./tokens.json');
} catch (e) {
    tokens = {};
}

// save tokens on app.install
flock.events.on('app.install', function (event) {
    tokens[event.userId] = event.token;
});

// delete tokens on app.uninstall
flock.events.on('app.uninstall', function (event) {
    delete tokens[event.userId];
});

// Start the listener after reading the port from config
var port = config.port || 8080;
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});

// exit handling -- save tokens in token.js before leaving
process.on('SIGINT', process.exit);
process.on('SIGTERM', process.exit);
process.on('exit', function () {
    fs.writeFileSync('./tokens.json', JSON.stringify(tokens));
});

var users = [
  {
    'name': 'xander',
    'id': 'u:pnxk9angp3k5knp5',
    'receivingLanguage': 'English',
    'sendingLanguage': 'English'
  },
  {
    'name': 'natalie',
    'id': 'u:qb5lqogelb5eeo0i',
    'receivingLanguage': 'French',
    'sendingLanguage': 'French'
  },
  {
    'name': 'sharon',
    'id': 'u:yfrfzz8wwr8r8tmy',
    'receivingLanguage': 'Cantonese',
    'sendingLanguage': 'Cantonese'
  },
  {
    'name': 'ashwin',
    'id': 'u:m8oqmjquzhjmh088',
    'receivingLanguage': 'Tamil',
    'sendingLanguage': 'Tamil'
  },
]