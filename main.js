const express = require('express');
const firebase = require('firebase-admin');
const body_parser = require('body-parser');

var serviceAccount = require('./firebase.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://alirin-e54db.firebaseio.com'
});

const app = express();

//middleware
app.use(body_parser.json());

app.get('/', function(req, res, next){
   res.send('ok');
});

app.use('/report', require('./routes/report'));

app.use(function(err, res, res, next){
   console.error(err);

   res.status(500).send({
      succes: false,
      error: err.message
   });
});

app.listen(process.env.PORT || 5008, function(){
   var port = process.env.PORT || 5008;

   console.log('app ready di port ' + port);
});