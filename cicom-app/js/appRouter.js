(function(){
  'use strict';
  angular
  .module('appRoutes', ['ui.router', 'oc.lazyLoad'])
  .config(configuration);

  configuration.$inject = ['$stateProvider','$urlRouterProvider'];

  function configuration($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('login',{
      url : '/login', //ruta del url del estado
      templateUrl : 'components/login/login.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/login/login.controller.js')
        }]
      },
      controller: 'LoginController',
      controllerAs:'login'
    })
    .state('candidates',{
      url : '/candidates', //ruta del url del estado
      templateUrl : 'components/candidates/candidates.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/candidates/candidates.controller.js')
        }]
      },
      controller: 'CandidatesController',
      controllerAs:'candidate'
    })
    .state('news',{
      url : '/news', //ruta del url del estado
      templateUrl : 'components/news/news.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/news/news.controller.js')
        }]
      },
      controller: 'NewsController',
      controllerAs:'news'
    })
    .state('sidenav',{
      url : '/categories', //ruta del url del estado
      templateUrl : 'components/categories/categories.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/categories/categories.controller.js')
        }]
      },
      controller: 'CategoriesController',
      controllerAs:'categories'
    })

    $urlRouterProvider.otherwise('/login');
  }
})();
