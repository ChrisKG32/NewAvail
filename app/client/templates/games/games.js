/*****************************************************************************/
/* Games: Event Handlers */
/*****************************************************************************/
Template.Games.events({
	
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
/* Games: Helpers */
/*****************************************************************************/
Template.Games.helpers({
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
	variantList:function(){
		var games = Games.find().fetch();
		if (games){
			return games
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
/* Games: Lifecycle Hooks */
/*****************************************************************************/
Template.Games.onCreated(function () {
	this.selectedGame = new ReactiveVar('derp');
});

Template.Games.onRendered(function () {

	//var speedSlider = $('input.slider').slider();
});

Template.Games.onDestroyed(function () {
});
