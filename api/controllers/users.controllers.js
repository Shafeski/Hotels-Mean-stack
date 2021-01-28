var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');

module.exports.register = (req, res)=>{
    console.log("registeration...");

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, (err, user)=>{
        if(err){
        console.log(err);
        res.status(400).json(err);
        }else{
             console.log("user Created");
             res.status(200).json(user);
        }
    })


};

module.exports.login = (req, res)=>{

    console.log("Logging user");
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).exec((err, user)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json(err);
        }else{
            if(bcrypt.compareSync(password, user.password))
            {
                console.log("user found", user);
                res.status(200).json(user);

            }else{
                console.log("Unauthenorized");
                res.status(401).json("Unauthenorized")
            }
        }
    })


};