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

Router.route('/expense', {
  name: 'newExpense',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/play', {
  name: 'play',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/admin', {
  name: 'addGame',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/login', {
  name: 'login',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/profile', {
  name: 'profile',
  controller: 'HomeController',
  where: 'client'
});