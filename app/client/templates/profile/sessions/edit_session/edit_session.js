/*****************************************************************************/
/* EditSession: Event Handlers */
/*****************************************************************************/
Template.EditSession.events({
	'change select':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		e.preventDefault();
		if (currentTarget.is('#game-name')){
			var gameName = currentTarget.val();
		tmpl.selectedGame.set(gameName);
		}
	},
	'click #submit-session':function(e, tmpl){
		var currentUser = Meteor.userId();
		var datepicker = $('#createdAt')
		var duration = $('#duration').val();
		var denom = Number($('#denom').val());
		var bought = Number($('#bought').val());
		var colored = Number($('#colored').val());
		var sessionId = $('#game-name').attr('session-id');

		if (datepicker && duration && denom && bought && colored){
			var sessionCol = Sessions.findOne(sessionId);
			var data = sessionCol;
			data.bought = bought;
			data.colored = colored;
			data.denomination = denom;
			sessionCol = Sessions.findOne(sessionId);
		}
		if (sessionCol && sessionCol.edits){
  			data.edits = sessionCol.edits;
  		}
		var noChanges = _.isEqual(data, sessionCol);

		if (noChanges) {
			alert('No changes detected.');
			var enabledInputs = $('input:not([disabled])');
			enabledInputs.attr('disabled', 'disabled');
		} else {
			var editData = sessionCol;
  			editData.editedBy = currentUser;
  			editData.editedAt = new Date();
  			sessionCol = Sessions.findOne(sessionId);
  			
  			Meteor.call('editSession', data, sessionCol, editData, function(){
  				console.log('successful');
  				var enabledInputs = $('input:not([disabled])');
				enabledInputs.attr('disabled', 'disabled');
  			});
		}



	}
});

/*****************************************************************************/
/* EditSession: Helpers */
/*****************************************************************************/
Template.EditSession.helpers({
	gamesList:function(){
		var games = Games.find().fetch();
		var uniques = [];
		_.each(games, function(entry){
			var conflict = false;
			_.each(uniques, function(item){
				if (item.name === entry.name) {
					conflict = true;
				}
			});
			if (!conflict){
				uniques.push(entry);
			}
		});
		if (uniques && uniques.length > 0){
			return uniques
		} else {
			return []
		}
	},
	selectedGame:function(){
		var selectedGame = Template.instance().selectedGame.get();
		
		var selectedVariants = Games.find({name: selectedGame}).fetch();
		if (selectedVariants && selectedVariants.length > 0) {
			console.log(selectedGame);
			return selectedVariants
		} else {
			return []
		}
	}
});

/*****************************************************************************/
/* EditSession: Lifecycle Hooks */
/*****************************************************************************/
Template.EditSession.onCreated(function () {
	this.selectedGame = new ReactiveVar('mississippi stud');	
});

Template.EditSession.onRendered(function () {

});

Template.EditSession.onDestroyed(function () {
});
