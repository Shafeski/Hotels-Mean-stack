angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http){
    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview

    }

    function hotelList(){

        return $http.get('/api/hotels?count=10').then(compelet).catch(faild);
    };

    function hotelDisplay(id){

        return $http.get('/api/hotels/' + id).then(compelet).catch(faild);
    };
    function postReview(id, review)
    {
        return $http.post('/api/hotels/' + id + '/reviews', review).then(compelet).catch(faild)
    };


    function compelet(response){
        return response;

    }

    function faild(err){

        console.log(err.statusText);
    }

    


}