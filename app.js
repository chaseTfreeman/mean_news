// https://thinkster.io/mean-stack-tutorial
(function () {
  'use strict';

  var app = angular.module("meanNews", ["ui.router"]);
  app.factory('posts', [function(){
    var o = {
      posts: [{title: "post 1", upvotes: 4},
      {title: "post 2", upvotes: 32},
      {title: "post 3", upvotes: 9},
      {title: "post 4", upvotes: 3},
      {title: "post 5", upvotes: 65}]
    };
    return o;
  }])


  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('news', {
        url: "",
        templateUrl: 'js/news.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: 'js/posts.html',
        controller: 'PostsCtrl'
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

        // Create a $scope function that will add an object into the posts array:
        $scope.addPost = function(){
          if(!$scope.title || $scope.title === '') { return; }
          $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
              {author: 'Joe', body: 'Cool post!', upvotes: 0},
              {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
          });
          $scope.title = '';
          $scope.link = '';
        };
        $scope.incrementUpvotes= function(post){
          post.upvotes += 1;
        };

      }])

      app.controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'posts',
        function($scope, $stateParams, posts){
          console.log(posts);
          $scope.post = posts.posts[$stateParams.id];
          console.log($scope.post);
          $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
              body: $scope.body,
              author: 'user',
              upvotes: 0
            });
            $scope.body = '';
          };
        }]);

      }());
