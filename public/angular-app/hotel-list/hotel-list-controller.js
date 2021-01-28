angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController (hotelDataFactory){
    var vm = this;
    vm.title = 'Mean Hotel App';
    hotelDataFactory.hotelList().then((response)=>{
        
        vm.hotels = response.data;
    })
};
