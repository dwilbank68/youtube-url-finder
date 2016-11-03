angular
    .module('app', [])
    .controller('YTController', YTControllerFn);



function YTControllerFn($scope, $http){

    $scope.processTitles  = function(data){
        var vm = this;
        vm.titlesArr = data.split('\n');
        vm.titlesArr = vm.titlesArr.map( title => title.replace('.mp4', '') );
        vm.titlesArr = vm.titlesArr.map( title => title.replace('ën', "‘n") );
        vm.titlesArr = vm.titlesArr.map( title => title.replace('ís', "’s") );
        vm.titlesArr = vm.titlesArr.map( title => title.replace('ñ', ":") );
        vm.titlesArr = vm.titlesArr.map( title => title.replace('_', ":") );
        vm.count = vm.titlesArr.length;
        vm.dataObj = {};

        angular
            .forEach(vm.titlesArr, function (title, idx) {
                vm.dataObj[idx] = title;
            })

        $http
            .post( '/titles', vm.dataObj)
            .then(function (res) {
                vm.urlsArr = res.data;
            })
            .catch(function (err) {
                console.log('error',err);
            })


    }
}

