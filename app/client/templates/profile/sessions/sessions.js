/*****************************************************************************/
/* Sessions: Event Handlers */
/*****************************************************************************/
Template.Sessions.events({
	'click .datepick':function(e, tmpl){
			$('#my-datepicker').datepicker('show');
			
	}
});

/*****************************************************************************/
/* Sessions: Helpers */
/*****************************************************************************/
Template.Sessions.helpers({
	userSessions:function(){
		var currentUser = Meteor.userId();
		var sessionList = Sessions.find({createdBy: currentUser}, {sort: {createdAt: -1}}).fetch();
		_.each(sessionList, function(entry){
			var gameId = entry.game;
			var gameDetails = Games.findOne(gameId);
			var gameDate = entry.completedAt;
			var dateFormat = gameDate.getDate() + '/' + (gameDate.getMonth() + 1) + '/' + Number(gameDate.getFullYear().toString().substr(2,4));
			entry.details = {
				name: gameDetails && gameDetails.name,
				variant: gameDetails && gameDetails.variant,
				result: entry.colored - entry.bought,
				date: dateFormat
			}
		});
		return sessionList
	}
});

/*****************************************************************************/
/* Sessions: Lifecycle Hooks */
/*****************************************************************************/
Template.Sessions.onCreated(function () {
});

Template.Sessions.onRendered(function () {
});

Template.Sessions.onDestroyed(function () {
});
