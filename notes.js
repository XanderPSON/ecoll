npm init
npm install --save express
npm install --save chrono-node

var chrono = rquire('chrono-node')

flock.events.on('client.slashCommand', function(event, callback){
  ...
  r = parseDate(event.text)
  alarm = {
    userId = event.userId...
    event.text.sliece(r.end).trim()
  }
  addAlarm(alarm)
  if
  callback(null, { text: 'Alarm added '})
  else
  callback(null, { text: 'Alarm notadded '})
})

# make multiple method calls to talk to multiple users


sendAlarm = function(alarm) {
  flock.chat.sendMessage(config.botToken, {
    to: alarm.userId,
    text: alarm.text
  })
}

get text
GoogleTranslate(text, language)
response
