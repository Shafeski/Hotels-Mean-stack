var mongoose = require('mongoose');
var Hotels = mongoose.model('Hotel');

var RunQeoQuery = (req,res) =>{
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // Geo Point To Specify The location
    var point = {
        type: "point",
        coordinates: [lng, lat]

    };

   /*  var GeoOptions = {
        spherical: true,
        maxDistance: 100000,
        num: 5

    }; */

    Hotels.aggregate([
        {
            $geoNear: {
                near: point,
                distanceField: "dist.calculated",
                maxDistance: 10000,
                
            }
        }
    ], (err, results, stats)=>{
        console.log("Geo Results ", results);
        console.log("Geo Stats", results.length);
        res.status(200).json(results);

    })

};

module.exports.hotelsGetAll = function(req,res){
    //var db = dbconn.get();
   // var collection = db.collection('hotels');
    var offset = 0;
    var count = 5;
    var maxcount = 10;
    if(req.query && req.query.lng && req.query.lat)
    {
            RunQeoQuery(req,res);
            return;
    }
    if(req.query && req.query.offset)
    {
        offset = parseInt(req.query.offset , 10)

    }
    if(req.query && req.query.count)
    {
        count = parseInt(req.query.count , 10);
    };
    if(isNaN(offset)|| isNaN(count))
    {
        console.log("Bad Request");
        res.status(400).json({"message":"BAD REQUEST... offset and count should be a number"});
        return;
    }
    if(count> maxcount)
    {
        console.log("count Exceed");
        res.status(400).json({"message":"Bad Request.. count exceed"});
        return;
    }
    Hotels
    .find()
    .skip(offset)
    .limit(count)
    .exec((err, hotels)=>{
        if(err)
        {
            console.log("Error in Server: can't find hotels");
            res.status(500).json(err);
        }
        else{
            
            console.log("Hotels Found " , hotels.length);
            res.status(200).json(hotels);
        }
    })

   

}; 


module.exports.hotelsGetOne = function(req,res){
    
    var hotelID = req.params.hotelsOne;

    Hotels
    .findById(hotelID)
    .exec((err, doc)=>{
        var response = {
            status: 200,
            message: doc
        };
      
        if(!doc)
        {
            response.status = 404;
            response.message = {"message": "Hotel ID Not Found .. Error 404"};
        }
         else if(err)
        {
            response.status = 500;
            response.message = {"message":"Error"};
        }
        console.log("Find Hotel by id", hotelID);
        res.status(response.status).json(response.message)
    })  
};

var _splitArray = (input)=>{
    var output;
    if(input && input.length>0)
    {
        output= input.split(";");

    }else{
        output= [];
    }
    return output;

};
module.exports.AddOne = function(req, res){
    
    Hotels
    .create(
        {
            name: req.body.name,
            description: req.body.description,
             stars: parseInt(req.body.stars,10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
              location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }  
        },
        (err, hotel)=>{
            if(err){
                console.log("Error creating new Hotel",err);
                res.status(400).json(err);
            }else{
                console.log(hotel)
                res.status(201).json(hotel);
            }
        }
    )
   

};

module.exports.hotelsUpdate = (req, res)=>{
    var hotelID = req.params.hotelsOne;

    Hotels
    .findById(hotelID)
    .select("-reviews -rooms")
    .exec((err, doc)=>{
        var response = {
            status: 200,
            message: doc
        };
      
        if(!doc)
        {
            response.status = 404;
            response.message = {"message": "Hotel ID Not Found .. Error 404"};
        }
         else if(err)
        {
            response.status = 500;
            response.message = {"message":"Error"};
        }
        
        if(response.status !==200)
        {
            res.status(response.status).json(response.message);
        }else{

            doc.name= req.body.name,
            doc.description= req.body.description,
             doc.stars= parseInt(req.body.stars,10),
            doc.services= _splitArray(req.body.services),
            doc.photos= _splitArray(req.body.photos),
            doc.currency= req.body.currency,
              doc.location= {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }

            doc.save((err, hotelUpdate)=>{
                if(err)
                {
                    res.status(500).json(err);
                }else
                {
                    res.status(204).json();
                }
            })

        }
    })  

};

module.exports.hoteldelete = (req, res) =>{
    var hotelID = req.params.hotelsOne;
    Hotels
    .findByIdAndRemove(hotelID)
    .exec((err, doc)=>{
        var response = {
            status: 204,
            message: doc
        };
      
        if(!doc)
        {
            response.status = 404;
            response.message = {"message": "Hotel ID Not Found .. Error 404"};
        }
         else if(err)
        {
            response.status = 500;
            response.message = {"message":"Error"};
        }
        console.log("Find Hotel by id and Removed", hotelID);
        res.status(response.status).json()
    })  


};

