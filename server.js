//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
const path = require('path');
var express = require("express");

// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Routes
var userRoute = require('./routes/user');
var bookingRoute = require('./routes/booking');
var studioPartnerRoute = require('./routes/studioPartner');
var mailRoute = require('./routes/mail');
var smsRoute = require('./routes/sms');
var redirectionRoute = require('./routes/redirection');
var contremarqueRoute = require('./routes/contremarque');
var studioRoute = require('./routes/studio');
var musicalprojectRoute = require('./routes/musicalProject');

// var effectsRoute = require('./routes').effects;

// if (process.env.NODE_ENV === 'production') {
//   const Sentry = require('@sentry/node');
//   Sentry.init({dsn: process.env.SENTRY_DSN, environment: process.env.STAGE});
// }

// if (process.env.NODE_ENV === 'production') {
//   const Sentry = require('@sentry/node');
//   Sentry.init({dsn: process.env.SENTRY_DSN, environment: process.env.STAGE});
// }


// Nous définissons ici les paramètres du serveur.
var port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') { 
  process.env.HOST_CLIENT_URL="http://127.0.0.1:3000" 
  // process.env.HOST_NODE_URL=""
}

console.log("process.env", process.env)

// mongodb+srv://rekyou:n@@h95xg4pR*PiQMONGODB@rekyou01db-hbv8l.mongodb.net/test?retryWrites=true&w=majority
// n@@h95xg4pR*PiQMONGODB
// mongodb+srv://rekyou:n%40%40h95xg4pR%2APiQMONGODB@rekyou01db-hbv8l.mongodb.net/test?retryWrites=true&w=majority
// const MONGO_URI_DB = 'mongodb://rekyou:n@@h95xg4pR*PiQMONGODB@rekyou01db-hbv8l.mongodb.net/rekyou-passculture?retryWrites=true&w=majority'
// const MONGODB_URI = 'mongodb+srv://rekyou:n%40%40h95xg4pR%2APiQMONGODB@rekyou01db-hbv8l.mongodb.net/rekyou-passculture?retryWrites=true&w=majority'


// Nous connectons l'API à notre base de données
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/rekyou-passculture", {
// mongoose.connect(MONGODB_URI, {

// mongoose.connect(MONGO_URI_DB, {

  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true

})
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected !')
})

// Express configuration
// Nous créons un objet de type Express.
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {

  var cors = require("cors");

  app.use(cors());

  //Définition des CORS
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
}

//Définition du router
app.use('/api/user', userRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/studioPartner', studioPartnerRoute);
app.use('/api/studio', studioRoute);
app.use('/api/mail', mailRoute);
app.use('/api/sms', smsRoute);
app.use('/api/redirection', redirectionRoute);
app.use('/api/contremarque', contremarqueRoute);
app.use('/api/musicalproject', musicalprojectRoute);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
// }

  var cors = require("cors");

  app.use(cors());

  //Définition des CORS
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


// if (process.env.NODE_ENV === 'production') {
//   const reactClient = (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
//   }

  app.get('*', (req, res) => {
    //   const reactClient = (req, res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
  // app.get('/', reactClient);
  // app.get('/studiosbycity', reactClient);
  // app.get('/studio', reactClient);
  // app.get('/booking', reactClient);
  // app.get('/validation', reactClient);
  // app.get('/login', reactClient);
  // app.get('/signup', reactClient);
  // app.get('/passwordf', reactClient);
  // app.get('/passwordres', reactClient);
  // app.get('/listing', reactClient);
  // app.get('/admin', reactClient);
  // app.get('/dashboard', reactClient);
}


// app.disable('etag');

app.listen(port, () => {
  console.log('Server started on port', port);
});
