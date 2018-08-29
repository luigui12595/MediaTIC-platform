(function (){
  'use strict';

  angular
  .module('cmsApp')
  .controller('CandidatesController', CandidatesController)
  .controller('SideNavController', SideNavController);
  
    function SideNavController($http, $cookies, $location, $scope) {
      var vm = this;
  
  
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      }init();

      vm.setActive = function(index){
        if(index == 0){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
        }else if(index == 1){
          var myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
        }else if(index == 2){
          var myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
        }else if(index == 3){
          var myEl = angular.element( document.querySelector( '#files' ) );
          myEl.removeClass('active')
        }else if(index == 4){
          var myEl = angular.element( document.querySelector( '#users' ) );
          myEl.addClass('active')
        }
      };
  
      vm.getOut = function(index){
        if(index == 0){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#files' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#users' ) );
          myEl.removeClass('active')
          $location.path('/news');
        } else if(index == 1){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#files' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#users' ) );
          myEl.removeClass('active')
          $location.path('/candidates');
        } else if(index == 2){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#files' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#users' ) );
          myEl.removeClass('active')
          $location.path('/categories');
        } else if(index == 3){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#files' ) );
          myEl.addClass('active')
          myEl = angular.element( document.querySelector( '#users' ) );
          myEl.removeClass('active')
          $location.path('/files');
        }else if(index == 4){
          var myEl = angular.element( document.querySelector( '#news' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#candidates' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#categories' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#files' ) );
          myEl.removeClass('active')
          myEl = angular.element( document.querySelector( '#users' ) );
          myEl.addClass('active')
          $location.path('/users');
        }
      };
      
      vm.logout = function(){
        //$cookies.remove('currentUserActive');
        //console.log($cookies.get('currentUserActive'));
        //vm.loginCorrect = false;
        alert("ITS WORKING!");
        $location.path('/login');
      }
      function cloneObject(object){
        var clone = {};
        for(var key in object){
          if(object.hasOwnProperty(key))
            clone[key] = object[key];
        }
        return clone;
      };
    }
  function CandidatesController($http, $cookies, $location, $scope) {
    var vm = this;


    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      var myEl = angular.element( document.querySelector( '#news' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#candidates' ) );
        myEl.addClass('active')
        myEl = angular.element( document.querySelector( '#files' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#users' ) );
        myEl.removeClass('active')
        myEl = angular.element( document.querySelector( '#categories' ) );
        myEl.removeClass('active')
    }init();

    function cloneObject(object){
      var clone = {};
      for(var key in object){
        if(object.hasOwnProperty(key))
          clone[key] = object[key];
      }
      return clone;
    };
  }
})();
