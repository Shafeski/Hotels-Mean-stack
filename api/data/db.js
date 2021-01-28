var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on("connected", ()=>{
    console.log("mongoose connected to " + dburl);
});

mongoose.connection.on("disconnected", ()=>{

    console.log("mongoose disconncted");
});

mongoose.connection.on("error", (err)=>{

    console.log("error" + err);
});

process.on('SIGINT', ()=>{
    mongoose.connection.close();
    console.log("mongoose connections terminated by user SIGINT");
    process.exit(0);

});



process.once('SIGUSR2', ()=>{
    mongoose.connection.close();
        console.log("mongoose connections terminated by user SIGUSR2");
        process.kill(process.pid, 'SIGUSR2');
    
  

});

require('./hotels.model');
require('./users.model');