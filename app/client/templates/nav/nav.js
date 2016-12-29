/*****************************************************************************/
/* Nav: Event Handlers */
/*****************************************************************************/
Template.Nav.events({
	'click .navbar-toggle':function(e, tmpl){
		var dropdown = $('.navbar-nav');
		if (dropdown.hasClass('hidden')){
			dropdown.removeClass('hidden');
		} else {
			dropdown.addClass('hidden');
		}
	},
	'click .navbar-nav a':function(e, tmpl){
		var dropdown = $('.navbar-nav');
		dropdown.addClass('hidden');
	},
	'click .log-out':function(e, tmpl){
		Meteor.logout();
	}
});

/*****************************************************************************/
/* Nav: Helpers */
/*****************************************************************************/
Template.Nav.helpers({
	investorOnly:function(param1){
		var currentUser = Meteor.userId();
		var playerProfile = Players.findOne({userId: currentUser});
		var investor = playerProfile && playerProfile.investor;
		var player = playerProfile && playerProfile.player;

		if (investor && (!player)){
			return true
		} else {
			return false
		}
	},
	fullPlayer:function(param1){
		var currentUser = Meteor.userId();
		var playerProfile = Players.findOne({userId: currentUser});
		var investor = playerProfile && playerProfile.investor;
		var player = playerProfile && playerProfile.player;

		if (investor && player){
			return true
		} else {
			return false
		}
	},
	player:function(param1){
		var currentUser = Meteor.userId();
		var playerProfile = Players.findOne({userId: currentUser});
		var investor = playerProfile && playerProfile.investor;
		var player = playerProfile && playerProfile.player;

		if ((!investor) && player){
			return true
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* Nav: Lifecycle Hooks */
/*****************************************************************************/
Template.Nav.onCreated(function () {
});

Template.Nav.onRendered(function () {
});

Template.Nav.onDestroyed(function () {
});
