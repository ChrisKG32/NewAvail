/*****************************************************************************/
/* Settings: Event Handlers */
/*****************************************************************************/
Template.Settings.events({
	'click .games-table .edit-game':function(e, tmpl){
		tmpl.selectedGame.set(this._id);
		console.log(tmpl.selectedGame.get());
	},
	'click #cancel-game':function(e, tmpl){
		tmpl.selectedGame.set(false);
	},
	'click h4.header':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		var span = currentTarget.find('span');
		var sectionWrapper = currentTarget.parent().find('.section-wrapper');
		if (span.hasClass('fa-plus')){
			span.removeClass('fa-plus').addClass('fa-minus');
			sectionWrapper.addClass('hidden');
		} else {
			span.removeClass('fa-minus').addClass('fa-plus');
			sectionWrapper.removeClass('hidden');
		}
	}
});

/*****************************************************************************/
/* Settings: Helpers */
/*****************************************************************************/
Template.Settings.helpers({
	allInvestments:function(){
		var currentUser = Meteor.userId();
		var userProfile = Players.findOne(currentUser);
		if (userProfile && userProfile.admin){
			var investments = Investments.find().fetch();
			_.each(investments, function(entry){

				var dateFormat = (entry.createdAt.getMonth() + 1) + '/' + entry.createdAt.getDate() + '/' + Number(entry.createdAt.getFullYear().toString().substr(2,4));
				entry.createdAt = dateFormat;
			});
		} else {
			var investments = Investments.find({userId: currentUser}).fetch();
			_.each(investments, function(entry){

				var dateFormat = (entry.createdAt.getMonth() + 1) + '/' + entry.createdAt.getDate() + '/' + Number(entry.createdAt.getFullYear().toString().substr(2,4));
				entry.createdAt = dateFormat;
			});
		}
		

		if (investments && investments.length > 0){
			return investments
		} else {
			return false
		}
	},
	gamesList:function(){
		var gamesList = Games.find({},{sort: {name: 1}}).fetch();

		if (gamesList && gamesList.length > 0) {
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
	}
});

/*****************************************************************************/
/* Settings: Lifecycle Hooks */
/*****************************************************************************/
Template.Settings.onCreated(function () {
	this.selectedGame = new ReactiveVar(false);
	this.selectedInvestment = new ReactiveVar(false);
});

Template.Settings.onRendered(function () {
});

Template.Settings.onDestroyed(function () {
});
