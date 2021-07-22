const express=require('express');
const app=express();
const port=8000;
//use express router
app.use('/',require('./routes/index'));
//app.use('/',require('./routes/user'));
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);
        //return;
    }
    console.log("Server is running");

});