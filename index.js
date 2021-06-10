//attempt to add mongoose
//https://ta03-cse341.herokuapp.com/ 
//https://github.com/hstratton22/cse341TA03
// Our initial setup (package requires, port number setup)
require('dotenv').config({ encoding: 'UTF-8' })
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const User = require('./routes/proveRoutes/prove05/models/user');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//const csrf = require('csurf');
//const flash = require('connect-flash');
const cors = require('cors');
//const PRIVATE = require('./private');
const corsOptions = {
  origin: "https://ta03-cse341.herokuapp.com/",
  optionsSuccessStatus: 200
};
const MONGODB_URL = process.env.MONGODB_URL || PRIVATE.dbURL; 
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});
//const csrfProtection  = csrf();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');///pokemon/1//lockdown to specific domains 'codepen.io'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 's3Cur3',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);//secret: 'my secret'
//, cookie: {maxAge: date, expires: date}
//app.use(csrfProtection);//not here?
//app.use(flash());//not here?

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

//to other index.js?
// app
//   .use((req, res, next) => {
//     //throw new Error('Sync Dummy');
//     if (!req.session.user) {
//       return next();
//     }
//     User.findById(req.session.user._id)//('609583ea3f161a723a332044')//("60947956b893eb8bf3e04661")
//       .then(user => {
//         //throw new Error('Dummy!);
//         if (!user) {
//           return next();
//         }
//         req.user = user; //new User(user.name, user.email, user.cart, user._id);
//         next();
//       })
//       .catch(err => {
//         //console.log(err))
//       //next();
//       //throw new Error(err);
//       next(new Error(err));
//       });
//   });
app.disable('x-powered-by');//good or bad?
app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(cors(corsOptions))
  .use('/', routes);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'me',
    //       email: 'me@me.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });

    app.listen(PORT);
    //console.log(PRIVATE.dbURL);
  })
  .catch(err => {
    console.log(err);
  });


  /*************************** */
//prior to wk4 mongoose etc
//https://github.com/hstratton22/CSE341class
//  https://cse341class.herokuapp.com/
// Our initial setup (package requires, port number setup)
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const routes = require('./routes');
// //const { use } = require('./routes');
// const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
// const app = express();
// app.use(express.static(path.join(__dirname, 'public')))
//    .set('views', path.join(__dirname, 'views'))
//    .set('view engine', 'ejs')
//    .use('/', routes)
//    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  /*************************** */
   //.listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*
// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const prove01Routes = require('./routes/prove01');
*/

   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   //?may need again
   //.use(bodyParser({extended: false})) // For parsing the body of a POST

/*
.use('/ta01', ta01Routes)
.use('/ta02', ta02Routes)
.use('/ta03', ta03Routes)
.use('/ta04', ta04Routes)
.use('/prove01', prove01Routes)
.get('/', (req, res, next) => {
  // This is the primary index, always handled last.
  res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
 })
.use((req, res, next) => {
  // 404 page
  res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
})*/


/* previously working code
//https://github.com/hstratton22/cse341TA03
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
//const { use } = require('./routes');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use('/', routes)
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*
// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const prove01Routes = require('./routes/prove01');
*/

   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   //?may need again
   //.use(bodyParser({extended: false})) // For parsing the body of a POST

/*
.use('/ta01', ta01Routes)
.use('/ta02', ta02Routes)
.use('/ta03', ta03Routes)
.use('/ta04', ta04Routes)
.use('/prove01', prove01Routes)
.get('/', (req, res, next) => {
  // This is the primary index, always handled last.
  res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
 })
.use((req, res, next) => {
  // 404 page
  res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
})*/

