// https://thinkster.io/mean-stack-tutorial
(function () {
  'use strict';

  var app = angular.module("meanNews", ["ui.router"]);
  app.factory('posts', [function(){
    var o = {
      posts: []
    };
    return o;
  }])


  app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'index.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('index');
  }]);


    app.controller('MainCtrl', [
      "$scope",
      "posts",
      function($scope, posts){
        // create function using scope to post our posts: To begin, we're going to modify our
        // controller to include a new $scope variable that defines a list of post titles.
        // Add the following code inside the controller function in app.js
        $scope.posts = posts.posts
        $scope.posts = [
          {title: "post 1", upvotes: 4},
          {title: "post 2", upvotes: 32},
          {title: "post 3", upvotes: 9},
          {title: "post 4", upvotes: 3},
          {title: "post 5", upvotes: 65}
        ]
        // Create a $scope function that will add an object into the posts array:
        $scope.addPost = function(){
          if(!$scope.title || $scope.title === '') { return; }
          $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0
          });
          $scope.title = '';
          $scope.link = '';
        };
        $scope.incrementUpvotes= function(post){
          post.upvotes += 1;
        };

      }])



    }());
