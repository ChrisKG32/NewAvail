/*****************************************************************************/
/* Settings: Event Handlers */
/*****************************************************************************/
Template.Settings.events({
	'click .table .edit':function(e, tmpl){
		var currentTarget = $(e.currentTarget);

		if (currentTarget.hasClass('edit-game')){
			tmpl.selectedGame.set(this._id);
		} else if (currentTarget.hasClass('edit-invest')){
			tmpl.selectedInvestment.set(this._id);
		}

		



	},
	'click .cancel':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('cancel-game')){
			tmpl.selectedGame.set(false);
		} else if (currentTarget.hasClass('cancel-invest')){
			tmpl.selectedInvestment.set(false);
		}
		
	},
	'click h4.header':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		var span = currentTarget.find('span');
		var sectionWrapper = currentTarget.parent().find('.section-wrapper');

		if (span.hasClass('fa-minus')){
			span.removeClass('fa-minus').addClass('fa-plus');
			sectionWrapper.addClass('hidden');
		} else {
			span.removeClass('fa-plus').addClass('fa-minus');
			sectionWrapper.removeClass('hidden');
		}
	},
	'click .cp':function(e, tmpl){
		tmpl.changePassword.set(true);

	},
	'click .cancel-password-change':function(e, tmpl){
		tmpl.changePassword.set(false);
	}
});

/*****************************************************************************/
/* Settings: Helpers */
/*****************************************************************************/
Template.Settings.helpers({
	allInvestments:function(){
		var currentUser = Meteor.userId();
		var userProfile = Players.findOne({userId: currentUser});
		if (userProfile && userProfile.admin){
			var investments = Investments.find().fetch();
			_.each(investments, function(entry){

				var dateFormat = (entry.valid.getMonth() + 1) + '/' + entry.valid.getDate() + '/' + Number(entry.valid.getFullYear().toString().substr(2,4));
				entry.valid = dateFormat;
			});
		} else {
			var investments = Investments.find({userId: currentUser}).fetch();
			_.each(investments, function(entry){

				var dateFormat = (entry.valid.getMonth() + 1) + '/' + entry.valid.getDate() + '/' + Number(entry.valid.getFullYear().toString().substr(2,4));
				entry.valid = dateFormat;
			});
		}
		

		if (investments && investments.length > 0){
			return investments
		} else {
			return false
		}
	},
	gamesList:function(){
		var currentUser = Meteor.userId();
		var userProfile = Players.findOne({userId: currentUser});
		var gamesList = Games.find({},{sort: {name: 1}}).fetch();

		if (userProfile && userProfile.admin && (gamesList && gamesList.length > 0)) {
			return gamesList
		} else {
			return false
		}
	},
	selectedGame:function(){
		var selectedGame = Template.instance().selectedGame.get();
		if (selectedGame){
			var gameCol = Games.findOne({_id: selectedGame});
			return gameCol
		} else {
			return false
		}
	},
	selectedInvest:function(){
		var selectedInvest = Template.instance().selectedInvestment.get();
		if (selectedInvest){
			var investCol = Investments.findOne({_id: selectedInvest});
			var date = investCol.valid;
			var dateFormat = (date.getMonth() + 1) + '/' + date.getDate() + '/' + Number(date.getFullYear().toString().substr(2,4));
			investCol.valid = dateFormat;

			return investCol
		} else {
			return false
		}
	},
	admin:function(){
		var currentUser = Meteor.userId();
		var userProfile = Players.findOne({userId: currentUser});
		if (userProfile && userProfile.admin){
			return true
		} else {
			return false
		}
	},
	changePassword:function(){
		var cp = Template.instance().changePassword.get();
		if (cp){
			return true
		} else {
			return false
		}
	},
	notifications:function(){
		return false
	}
});

/*****************************************************************************/
/* Settings: Lifecycle Hooks */
/*****************************************************************************/
Template.Settings.onCreated(function () {
	this.selectedGame = new ReactiveVar(false);
	this.selectedInvestment = new ReactiveVar(false);
	this.changePassword = new ReactiveVar(false);
});

Template.Settings.onRendered(function () {
});

Template.Settings.onDestroyed(function () {
});
