angular
    .module('app', [])
    .controller('YTController', YTControllerFn);



function YTControllerFn($scope, $http){
    $scope.titles = 'paste list here';

    $scope.processTitles  = function(data){
        console.log('happenin', data);
        // var vm = this;
        // $http
        //     .post( '/titles', data)
        //     .then(function (res) {
        //         console.log('response');
        //         console.log(res);
        //     })
        //     .catch(function (err) {
        //         console.log('error',err);
        //     })
        // vm.titlesArr = data.split('\n');
        // vm.titlesArr = vm.titlesArr.map( title => title.replace('.mp4', '') );
        // $scope.count = vm.titlesArr.length;
        // angular
        //     .forEach(vm.titlesArr, (title) => {
        //         var searchObj = {
        //             key: '',
        //             term: title
        //         }
        //         YTSearch(searchObj, function(data){
        //             console.log(data.video.id.videoId);
        //         })
        //     });

    }
}
//
