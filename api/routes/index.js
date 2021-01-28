/* var express = require('express');
var router = express.Router();

router
.route('/json')
.get(function(req,res){
    console.log("Get Json File");
    res.status(200).json({"jsonfile":true});
})
.post(function(req,res){
    console.log("Get Json File");
    res.status(200).json({"jsonfilePost":true});
})

3333
module.exports = router; */

var express = require('express');
var router = express.Router();
var ctrlmovies = require('../controllers/movies.controllers');
var ctrlreviews = require('../controllers/reviews.controllers');
var ctrlUsers = require('../controllers/users.controllers');

router
.route('/hotels')
.get(ctrlmovies.hotelsGetAll)
.post(ctrlmovies.AddOne);

router
.route('/hotels/:hotelsOne')
.get(ctrlmovies.hotelsGetOne)
.put(ctrlmovies.hotelsUpdate)
.delete(ctrlmovies.hoteldelete);


//Reviews Routes 
router
.route('/hotels/:hotelsOne/reviews')
.get(ctrlreviews.reviewsGetAll)
.post(ctrlreviews.Addone);

router
.route('/hotels/:hotelsOne/reviews/:reviewID')
.get(ctrlreviews.reviewsGetOne)
.put(ctrlreviews.reviewsUpdate)
.delete(ctrlreviews.reviewsdelete);

router
 .route('/users/register')
 .post(ctrlUsers.register);

router
 .route('/users/login')
 .post(ctrlUsers.login);



module.exports = router;