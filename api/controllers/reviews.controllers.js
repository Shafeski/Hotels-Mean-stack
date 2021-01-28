var mongoose = require('mongoose');
var Hotels = mongoose.model('Hotel');

module.exports.reviewsGetAll = (req, res)=>{
    var hotelID = req.params.hotelsOne;

    Hotels
    .findById(hotelID)
    .select('reviews')
    .exec((err, doc)=>{
        console.log("Find Hotel by id", hotelID);
        res.status(200).json(doc.reviews);
    }) 

};

module.exports.reviewsGetOne = (req, res)=>{
    var hotelID = req.params.hotelsOne;
    var reviewID = req.params.reviewID;
    Hotels
    .findById(hotelID)
    .select('reviews')
    .exec((err, hotel)=>{
        console.log("Find review by id "+ reviewID + " By hotel ID "+ hotelID);

        var review = hotel.reviews.id(reviewID)
        res.status(200).json(review);
        console.log(review);
    })

};

var _addreview = (req, res, hotel)=>{
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });

    hotel.save((err, hotelUp)=>{
        if(err)
        {
            console.log("error in addreview");
            res.status(500).json(err);
        }
        else{

            res.status(201).json(hotelUp.reviews[hotelUp.reviews.length -1]);
            console.log(hotelUp.reviews.length);
        }
    })

};

module.exports.Addone = (req, res)=>{
    var hotelID = req.params.hotelsOne;
    Hotels
    .findById(hotelID)
    .select('reviews')
    .exec((err, doc)=>{
        var response = {
            status: 200,
            message: []
        }
        if(err)
        {
            console.log("Error in add review", err)
            response.status= 500;
            response.message= "Error in add review";
        }else if (!doc){
            console.log("review can't update, Hotel ID Not Fount Error 404");
            response.status= 404;
            response.message= {"message":"Error 404 Not Fount Hotel ID" + id};
        }
        if(doc)
        {
            _addreview(req, res, doc);
            
        }else{
            res.status(response.status).json(response.message);
        };

    });
};

module.exports.reviewsUpdate = (req, res)=>{

    var hotelID = req.params.hotelsOne;
    var reviewID = req.params.reviewID;
    Hotels
    .findById(hotelID)
    .select('reviews')
    .exec((err, hotel)=>{
        console.log("Find review by id "+ reviewID + " By hotel ID "+ hotelID);

        var reviewUp = hotel.reviews.id(reviewID)
        if(err){
            res.status(500).json(err);
        }else{
            reviewUp.name = req.body.name,
            reviewUp.rating = parseInt(req.body.rating),
            reviewUp.review = req.body.review
        }
        hotel.save((err, reviewUpdated)=>{
            if(err)
            {
                res.status(500).json(err);
            }else
            {
                res.status(204).json(reviewUpdated);
            }
        })
    })


};

module.exports.reviewsdelete = (req, res)=>{

    var hotelID = req.params.hotelsOne;
    var reviewID = req.params.reviewID;
    Hotels
    .findById(hotelID)
    .select('reviews')
    .exec((err, hotel)=>{
        console.log("Find review by id "+ reviewID + " By hotel ID "+ hotelID);

        var reviewUp = hotel.reviews.id(reviewID)
        if(err){
            res.status(500).json(err);
        }else{
            hotel.reviews.id(reviewUp).remove();
            hotel.save((err, reviewUpdated)=>{
                if(err)
                {
                    res.status(500).json(err);
                }else
                {
                    res.status(204).json(reviewUpdated);
                }
        })
        }
    })


};