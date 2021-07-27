const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
var sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));//sass middleware

app.use(express.urlencoded());//middleware for static files use

app.use(cookieParser());//middleware to parse the cookie

app.use(express.static('./assets'));//middleware telling where to find aassets i.e. static files

app.use(expressLayouts);//middleware to tell use layouts
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware to use passport by sessions
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        { 
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove:'disabled' 
        },
        function(err)
        {
            console.log(err || 'connected mongostore to mongodb');
        }
    )
    
        
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticate);
// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
