/*****************************************************************************/
/* Stats: Event Handlers */
/*****************************************************************************/
Template.Stats.events({
	'change .game-select':function(e, tmpl){
		var gameName = ($('.game-select').val()).toLowerCase();
		if (gameName == 'all games') {
			Session.set('selectedGame', 'all games');
			//tmpl.selectedGame.set('all games');

			initiateChart();
		} else {
			Session.set('selectedGame', gameName);
			//tmpl.selectedGame.set(gameName);

			initiateChart();
		}

		
	},
	'change .player-select':function(e, tmpl){
		var playerName = ($('.player-select').val()).toLowerCase();
		if (playerName == 'all players') {
			Session.set('selectedPlayer', false);
			//tmpl.selectedPlayer.set(false);

			initiateChart();
		} else {
			Session.set('selectedPlayer', Players.findOne({username: playerName}).userId);
			//tmpl.selectedPlayer.set(Players.findOne({username: playerName}).userId);

			initiateChart();
		}

		//initiateChart();
	}
});

/*****************************************************************************/
/* Stats: Helpers */
/*****************************************************************************/
Template.Stats.helpers({
	gameNames:function(){

		var selectedPlayer = Session.get('selectedPlayer');//Template.instance().selectedPlayer.get();
		var currentUser = Meteor.userId();
		var allGames = Games.find().fetch()
		
		var uniqueNames = [];
		_.each(allGames, function(entry){
			if (selectedPlayer){
				var userSession = Sessions.findOne({createdBy: selectedPlayer, game: entry._id, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]});
			} else {
				var userSession = Sessions.findOne({game: entry._id, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]});
			}
			
			if (userSession){
				var conflict = false;
				_.each(uniqueNames, function(game){
					if (game == entry.name) {
						conflict = true
					}
				})
				if (!conflict) {
					uniqueNames.push(entry.name);
				}
			}
		});
		return uniqueNames
	},
	stats:function(){
		var selectedPlayer = Session.get('selectedPlayer');//Template.instance().selectedPlayer.get();
		var selectedGame = Session.get('selectedGame');//Template.instance().selectedGame.get();
		var currentUser = Meteor.userId();

		if (selectedGame === 'all games') {
			if (selectedPlayer){
				var userSessions = Sessions.find({createdBy: selectedPlayer, 
					$and: [
						{colored: {$exists: true}},
						{createdAt: {$exists: true}}, 
						{completedAt: {$exists: true}}
					]}).fetch();
			} else {
				var userSessions = Sessions.find({
					$and: [
						{colored: {$exists: true}},
						{createdAt: {$exists: true}}, 
						{completedAt: {$exists: true}}
					]}).fetch();
			}
			
		} else {
			var games = Games.find({name: selectedGame}).fetch();
			gameIds = [];
			_.each(games, function(entry){
				gameIds = gameIds.concat({game: entry._id});
			})
			
			if (selectedPlayer){
				var userSessions = Sessions.find({createdBy: selectedPlayer,  $or: gameIds, 
					$and: [
						{colored: {$exists: true}},
						{createdAt: {$exists: true}}, 
						{completedAt: {$exists: true}}
					]}).fetch();
			} else {
				var userSessions = Sessions.find({$or: gameIds, 
					$and: [
						{colored: {$exists: true}},
						{createdAt: {$exists: true}}, 
						{completedAt: {$exists: true}}
					]}).fetch();
			}
			
			
		}
		
		
		var result = 0;
		var duration = 0;
		var edges = 0;
		_.each(userSessions, function(entry){
			result += (entry.colored - entry.bought);
			duration += (entry.completedAt - entry.createdAt);

			var game = Games.findOne(entry.game);
			if (game){
				edges += game && game.edge * (entry.completedAt - entry.createdAt);
			}
		})

		var avgEdge = edges/duration;
		var data = {
			result: Math.round(result),
			duration: (duration/3600000).toFixed(2),
			edge: avgEdge.toFixed(2)
		}

		return data
	},
	playerNames:function(){
		var playerList = Players.find({player: true}).fetch();

		return playerList
	}
});

/*****************************************************************************/
/* Stats: Lifecycle Hooks */
/*****************************************************************************/
Template.Stats.onCreated(function () {
	var currentUser = Meteor.userId();

	Session.set('selectedPlayer', false);//this.selectedPlayer = new ReactiveVar(false);
	Session.set('selectedGame', 'all games');//this.selectedGame = new ReactiveVar('all games');

	var self = this;
	this.subscribe('allSessions');
	this.subscribe('Games');
});

Template.Stats.onRendered(function () {

		

		

    

	
});

Template.Stats.onDestroyed(function () {
	
});


	
