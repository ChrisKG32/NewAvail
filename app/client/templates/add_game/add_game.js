/*****************************************************************************/
/* AddGame: Event Handlers */
/*****************************************************************************/
Template.AddGame.events({
	'click #submit-game':function(e){
		e.preventDefault();
		var gameName = $('#game-name').val().toLowerCase();
		var variantName = $('#variant-name').val().toLowerCase();
		var edge = $('#edge').val();
		var variance = $('#variance').val();
		var speed = $('#speed').val();

		var data = {
			name: gameName,
			variant: variantName,
			edge: edge,
			variance: variance,
			speed: speed
		}

		var conflict = Games.findOne({name: gameName, variant: variantName});
		if (!conflict){
			Meteor.call('addGame', data);
			console.log('Success');

			$('#game-name').val('');
			$('#variant-name').val('');
			$('#edge').val('');
			$('#variance').val('');
			$('#speed').val('');
		} else {
			console.log('Failed to add game (game already exists)');
		}
		
	}
});

/*****************************************************************************/
/* AddGame: Helpers */
/*****************************************************************************/
Template.AddGame.helpers({
});

/*****************************************************************************/
/* AddGame: Lifecycle Hooks */
/*****************************************************************************/
Template.AddGame.onCreated(function () {
});

Template.AddGame.onRendered(function () {
});

Template.AddGame.onDestroyed(function () {
});
