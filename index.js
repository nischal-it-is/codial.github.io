const express=require('express');
const cookieParse=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router

app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');
//app.use('/',require('./routes/user'));
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);
        //return;
    }
    console.log("Server is running");

});