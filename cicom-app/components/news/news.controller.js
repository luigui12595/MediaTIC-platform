(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('NewsController', NewsController)
  .controller('SideNavController', SideNavController)
  .directive('expand', function () {
    function link(scope, element, attrs) {
        scope.$on('onExpandAll', function (event, args) {
            scope.expanded = args.expanded;
        });
    }
    return {
        link: link
    };
  });;
  
  function SideNavController($http, $cookies, $location) {
    var vm = this;
    vm.userAccess = true;
    function init(){ 
      vm.currentUserActive = $cookies.getObject('currentUserActive');
        if(vm.currentUserActive == null){
          $location.path('/login');
        }
      if(!vm.currentUserActive.isAdmin){
        vm.userAccess = false; 
      }
    }init();

    vm.getOut = function(index){
      if(index == 0){
        $location.path('/news');
      } else if(index == 1){
        $location.path('/comments');
      } else if(index == 2){
        $location.path('/categories');
      } else if(index == 3){
        $location.path('/files');
      }else if(index == 4){
        $location.path('/users');
      }
    };
    
    vm.logout = function(){
      $cookies.remove('currentUserActive');
      console.log($cookies.get('currentUserActive'));
      //vm.loginCorrect = false;
      
      $location.path('/login');
    }
  }

  function NewsController($http, $cookies, $location, $filter, $scope, $log, $templateCache) {
    var vm = this;
    vm.showLoader = false;
    vm.selectedNews = false;
    vm.news;
    //LOCAL
    //vm.sqlServer = 'http://localhost:8081';
    //vm.mongoServer = 'http://localhost:8082';
    //PROD
    vm.sqlServer = 'http://cluster.cenat.ac.cr:8081';
    vm.mongoServer = 'http://cluster.cenat.ac.cr:8082';
    vm.newsIndex;
    vm.categoryArray;
    vm.categorySelected={};
    vm.subcategorySelected={};
    vm.mediaSelected = "0";
    vm.sinceDate;
    vm.untilDate;
    vm.searchInterest="";
    vm.searchSubject="";
    vm.searchWords="";
    vm.keysArray;
    vm.originalCommentsArray;
    vm.commentKeysArray;
    vm.newsCreationDate;
    vm.newsUpdateDate;
    vm.newsArray;
    vm.sortType     = 'created_time'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchNews   = '';  //Filter news
    vm.commentSortType = 'comment_position';
    vm.commentSortReverse = false;
    vm.searchComments = '';
    vm.media;
    vm.filteredData;
    vm.currentUserActive;

    vm.expandAll = function(expanded) {
      // $scope is required here, hence the injection above, even though we're using "controller as" syntax
      $scope.$broadcast('onExpandAll', {
        expanded: expanded
      });
    };

    var headers =
    {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }

    $scope.$watch(function() {
      return vm.searchNews;
    }, function(current, original) {
      if(current == '' || /^\s+$/.test(current)){
        vm.filteredData = vm.newsArray;
      }else{
        vm.filteredData = $filter("filter")(vm.newsArray, current);
       }
    });
    
    vm.selectNews = function(newsChoice){
      vm.showLoader = true;
      vm.news = newsChoice;
      vm.newsIndex = vm.newsArray.indexOf(newsChoice);
      vm.selectedNews = true;
      var url_req = vm.mongoServer+'/getComments';
      var config = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      }
      $http({url: url_req, method: 'GET', params:{"post_id":vm.news.post_id, "by_post":"true"}}).
        then(function(response) {
          var commentsArray = response.data;
          vm.originalCommentsArray = commentsArray;
          var resultArray = [];
          var responseComments = [];
          for (var i = 0; i < commentsArray.length; i++){
            if(commentsArray[i].is_reply == 0){
              if(responseComments.length>0){
                commentsArray[i].commentsResponse=responseComments;
                responseComments = [];
              }else{
                commentsArray[i].commentsResponse=[];
              }
              resultArray.push(commentsArray[i]);
            }else{
              responseComments.push(commentsArray[i]);
            }
          }
          for (var i = 0; i < resultArray.length; i++){
            resultArray[i].comment_count = resultArray[i].commentsResponse.length;
          }
          vm.news.commentArray = resultArray;
          if(!vm.originalCommentsArray === undefined||vm.originalCommentsArray.length>0){
            vm.commentKeysArray = Object.keys(vm.originalCommentsArray[0]);
          }
          if(vm.news.category){
            for (var i = 0; i < vm.categoryArray.length; i++) {
              var cat = vm.categoryArray[i];
              if(cat.category_name == vm.news.category){
                vm.categorySelected = cat
                break;
              }
            }
          }
          if(vm.news.subcategory){
              if(vm.news.subcategory != "N/A"){
              for (var i = 0; i < vm.categorySelected.sub_categories.length; i++) {
                var subcat = vm.categorySelected.sub_categories[i];
                if(subcat.sub_category_name == vm.news.subcategory){
                  vm.subcategorySelected = subcat
                  break;
                }
              }
            }
          }
          vm.showLoader = false;
        }, function(response) {
          console.log(response);
          vm.showLoader = false;
      });
    };


    vm.saveNews = function(){
      vm.showLoader = true;
      delete vm.news.commentArray;
      vm.newsArray[vm.newsIndex] = vm.news ;
      if(!angular.equals(vm.categorySelected, {})){
        if(vm.categorySelected.hasOwnProperty("category_name")){
          vm.news.category = vm.categorySelected.category_name 
        }else{
          vm.news.category = vm.categorySelected
        }
      }
      if(!angular.equals(vm.subcategorySelected, {})){
        if(vm.subcategorySelected.hasOwnProperty("sub_category_name")){
          vm.news.subcategory = vm.subcategorySelected.sub_category_name 
        }else{
          vm.news.subcategory = vm.subcategorySelected
        }
      }
      var headers = {
            'Content-Type': 'application/json'
      }
      
      $http.put(vm.mongoServer+'/updatePost', vm.news, headers)
           .then(function(response,headers){
            var results = response.data;
            if(results.matched == 1){
              alert('Post actualizado exitosamente')
              vm.selectedNews = false;
            }else{
              alert('Post no tuvo cambios')
              vm.selectedNews = false;
            }
            vm.showLoader = false;
      }).then(function (obj) {  
        console.log(obj); 
        vm.showLoader = false;
    });
    };
    vm.return = function(){
      delete vm.newsArray[vm.newsIndex].commentArray;
      vm.selectedNews = false;
    }
    
    vm.findNews = function(){
      vm.showLoader = true;
      var since_date = new Date(vm.sinceDate); // some mock date
      var until_date = new Date(vm.untilDate);
      var since_secs = (since_date.getTime())/1000;
      var until_secs = (until_date.getTime())/1000;
      if(since_secs > until_secs && since_secs && until_secs){
        alert("La fecha inicial debe de ser anterior a la fecha final");
        return;
      }
      var url_req = vm.mongoServer+'/getPosts';
      var paramsBody = {};
      if(vm.mediaSelected != 0){
        paramsBody.medio = vm.mediaSelected;
      }
      if(since_secs){
        paramsBody.finicio = Math.trunc(since_secs);
      }
      if(until_secs){
        paramsBody.ffinal = Math.trunc(until_secs);
      }
      if(vm.searchInterest != ""){
        paramsBody.interes = vm.searchInterest
      }
      if(vm.searchWords != ""){
        paramsBody.text = vm.searchWords
      }
      if(vm.searchSubject != ""){
        paramsBody.subject = vm.searchSubject
      }
      $http({url: url_req, method: 'GET', params:paramsBody})
        .then(function(response, headers){
          var commentsArray = response.data;
          vm.newsArray = commentsArray;
          if(vm.newsArray.length > 0){
            vm.keysArray = Object.keys(vm.newsArray[0]);
          }else{
            alert('No se encontraron posts del medio buscado en las fechas requeridas');
          }
          vm.showLoader = false;
        })
      }
    
    

    function init(){
      vm.currentUserActive = $cookies.getObject('currentUserActive');
      vm.sinceDate = new Date();
      vm.untilDate = new Date();
      if(vm.currentUserActive == null){
        $location.path('/login');
      }
      $http.get(vm.sqlServer+'/Media/getMedia')
      .then(function(response, headers){
        vm.media = response.data.data;
      })
      $http.get(vm.sqlServer+'/category/getCategory/')
      .then(function(response, headers){
        vm.categoryArray = response.data.data;
      })
    }init();
  }
})();
