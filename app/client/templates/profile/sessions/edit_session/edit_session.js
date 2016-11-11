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
	$('.input-group.date').datepicker({
		clearBtn: true,
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	});
});

Template.EditSession.onDestroyed(function () {
});
