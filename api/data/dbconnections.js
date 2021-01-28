var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/mean-hotel';

var _connection = null;

/* var open = function(){
    mongoclient.connect(dburl, function(err, db){
        if(err)
        {
            console.log("DB Connections has Failed");
            return;
        }
        _connection  = db;
        console.log("DB Connections made succes..", db);
    })
    //set connections

};

const open1 = () =>{
    MongoClient.connect(dburl,{useNewUrlParser:true})
    .then(client =>{
        _connection = client.db('');

    })
    .catch(err =>console.log(`Connections Failed ${err}`));
};
*/

//open the Connections to use it with get() methode in Ctrls
const open = () => {
    MongoClient.connect(dburl,{useNewUrlParser : true})
       .then(client => {
            _connection = client.db('meanhotel');
            console.log("DB connection open");
       })
       .catch(err => console.log(`DB Connection failed: ${err}`));
};


var get = function(){
    //get connections
    return _connection;
};

module.exports = {
    open: open,
    get: get
};