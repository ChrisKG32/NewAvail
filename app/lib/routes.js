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
  where: 'client',
  subscriptions: function() {
    
  },
  waitOn:function(){
    var currentUser = Meteor.userId();
     Meteor.subscribe('userSessions', currentUser);
     Meteor.subscribe('Games');
  }
});

Router.route('/new-game', {
  name: 'addGame',
  controller: 'HomeController',
  where: 'client',
  subscriptions: function() {
    
  },
  waitOn:function(){
     Meteor.subscribe('Games');
  }
});

Router.route('/login', {
  name: 'login',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/profile', {
  name: 'profile',
  controller: 'HomeController',
  where: 'client',
  subscriptions: function(){
    
  },
  waitOn:function(){
    var currentUser = Meteor.userId();
     Meteor.subscribe('userExpenses', currentUser);
     Meteor.subscribe('Games');
     Meteor.subscribe('userSessions', currentUser);
  }
});

Router.route('/settings', {
  name: 'settings',
  controller: 'HomeController',
  where: 'client',
  subscriptions:function(){
    
  },
  waitOn:function(){
    var currentUser = Meteor.userId();
     Meteor.subscribe('Investments');
     Meteor.subscribe('Games');
  }
});

Router.route('/new-investment', {
  name: 'newInvestment',
  controller: 'HomeController',
  where: 'client'
});