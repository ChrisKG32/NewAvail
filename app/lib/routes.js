Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/games', {
  name: 'games',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/add-game', {
  name: 'addGame',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/login', {
  name: 'login',
  controller: 'HomeController',
  where: 'client'
});