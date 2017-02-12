var flock = require('flockos');
var config = require('./config.js');
var express = require('express');
var fs = require('fs');

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
    'id': '',
    'receivingLanguage': 'English',
    'sendingLanguage': 'English'
  },
]

flock.setAppId(config.appId);
flock.setAppSecret(config.appSecret);

var app = express();

// Listen for events on /events, and verify event tokens using the token verifier.
app.use(flock.events.tokenVerifier);
app.post('/events', flock.events.listener);

app.get('/app_launcher', function (event, res) {
  console.log('*' * 50)
  console.log(event.query.flockEvent)
  console.log('query:' * 2, event.query)
  // fs.readFile('side-widget.html',function (err, data){
  //   res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
  //   res.write(data);
  //   res.end();
  // });
  // if (event.query.flockEvent.chat == 'g:107053_lobby') {
  //   for (var i = 0; i < users.length; i++) {
  //     flock.callMethod('chat.sendMessage', tokens['u:pnxk9angp3k5knp5'], {
  //         to: users[i]['id'],
  //         text: 'hello people!'
  //     }, function (error, response) {
  //         if (!error) {
  //             console.log(response);
  //         }
  //     });
  //   }
  // }
  // else {
  //   flock.callMethod('chat.sendMessage', tokens[event.query.flockEvent.userId], {
  //         to: 'g:107053_lobby',
  //         text: 'hello lobby!'
  //     }, function (error, response) {
  //         if (!error) {
  //             console.log(response);
  //         }
  //     });
  // }
});


//currently sends message to people
flock.events.on('client.messageAction', function(event, callback){
  if (event.query.flockEvent.chat == 'g:107053_lobby') {
    for (var i = 0; i < users.length; i++) {
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
    flock.callMethod('chat.sendMessage', tokens[event.query.flockEvent.userId], {
          to: 'g:107053_lobby',
          text: 'hello lobby!'
      }, function (error, response) {
          if (!error) {
              console.log(response);
          }
      });
  }
});

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
