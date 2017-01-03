Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'Home',
  template: 'Home',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  }
});

Router.route('/expense', {
  name: 'NewExpense',
  template: 'NewExpense',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/play', {
  name: 'Play',
  template: 'Play',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },
  waitOn:function(){
    var currentUser = Meteor.userId();
    return [
      Meteor.subscribe('dealerList'),
      Meteor.subscribe('casinoList'),
      Meteor.subscribe('userSessions', currentUser),
      Meteor.subscribe('Games')
    ]
  }
});

Router.route('/new-game', {
  name: 'AddGame',
  template: 'AddGame',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },
  waitOn:function(){
    return Meteor.subscribe('Games')
  }
});

Router.route('/login', {
  name: 'Login',
  template: 'Login',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  }
});

Router.route('/register', {
  name: 'Register',
  template: 'Register',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  }
});

Router.route('/profile', {
  name: 'Profile',
  template: 'Profile',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },/*
  waitOn:function(){
    
      var currentUser = Meteor.userId();
      return [
        Meteor.subscribe('Games'),
        Meteor.subscribe('allSessions', currentUser)
      ]
      
  }*/
});

Router.route('/settings', {
  name: 'Settings',
  template: 'Settings',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },
  waitOn:function(){
    var currentUser = Meteor.userId();
    return [
      Meteor.subscribe('Investments'),
      Meteor.subscribe('Games')
    ]
  }
});

Router.route('/new-investment', {
  name: 'NewInvestment',
  template: 'NewInvestment',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  }
});

Router.route('/dealers', {
  name: 'Dealers',
  template: 'Dealers',
  controller: 'HomeController',
  where: 'client',
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },
  waitOn:function(){
    return [
      Meteor.subscribe('allSessions'),
      Meteor.subscribe('dealerList'),
      Meteor.subscribe('casinoList')
    ]
  }
});

Router.route('/dealers/:_id', {
  name: 'DealerProfile',
  template: 'DealerProfile',
  controller: 'HomeController',
  where: 'client',
  data: function(){
    var currentDealer = this.params._id;
    return Dealers.findOne(currentDealer)
  },
  onBeforeAction: function () {
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('Login');
    }
  },
  waitOn:function(){
    return [
      Meteor.subscribe('allSessions'),
      Meteor.subscribe('dealerList'),
      Meteor.subscribe('casinoList')
    ]
  }
});