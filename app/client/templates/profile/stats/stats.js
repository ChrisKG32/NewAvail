/*****************************************************************************/
/* Stats: Event Handlers */
/*****************************************************************************/
Template.Stats.events({
	'change .game-select':function(e, tmpl){
		var gameName = ($('.game-select').val()).toLowerCase();
		if (gameName == 'all games') {
			tmpl.selectedGame.set('all games');
		} else {
			tmpl.selectedGame.set(gameName);
		}

		initiateChart();
	},
	'change .player-select':function(e, tmpl){
		var playerName = ($('.player-select').val()).toLowerCase();
		if (playerName == 'all players') {
			tmpl.selectedPlayer.set(false);
		} else {
			var playerId = Users.findOne({username: playerName})._id;
			tmpl.selectedPlayer.set(playerId);
		}

		initiateChart();
	}
});

/*****************************************************************************/
/* Stats: Helpers */
/*****************************************************************************/
Template.Stats.helpers({
	gameNames:function(){
		var selectedPlayer = Template.instance().selectedPlayer.get();
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
		var selectedPlayer = Template.instance().selectedPlayer.get();
		var selectedGame = Template.instance().selectedGame.get();
		var currentUser = Meteor.userId();

		if (selectedGame === 'all games') {
			if (selectedPlayer){
				var userSessions = Sessions.find({createdBy: selectedPlayer, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
			} else {
				var userSessions = Sessions.find({$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
			}
			
		} else {
			var games = Games.find({name: selectedGame}).fetch();
			gameIds = [];
			_.each(games, function(entry){
				gameIds = gameIds.concat({game: entry._id});
			})
			
			if (selectedPlayer){
				var userSessions = Sessions.find({createdBy: selectedPlayer,  $or: gameIds, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
			} else {
				var userSessions = Sessions.find({$or: gameIds, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
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
		var playerList = Players.find().fetch();
		var fakeList = [
			{username: 'Bob'}, 
			{username: 'Jerry'}, 
			{username: 'John'},
			{username: 'Tim'},
			{username: 'Matt'}
		];
		return fakeList
	}
});

/*****************************************************************************/
/* Stats: Lifecycle Hooks */
/*****************************************************************************/
Template.Stats.onCreated(function () {
	var currentUser = Meteor.userId();

	this.selectedPlayer = new ReactiveVar(currentUser);
	this.selectedGame = new ReactiveVar('all games');
});

Template.Stats.onRendered(function () {
	initiateChart = function(){
		
		var setOrNot = typeof myLineChart !== typeof undefined ? true : false;
		if (setOrNot){
			myLineChart.destroy();
		}

    	var ctx  = document.getElementById("playingStats").getContext("2d");

    	var options = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: false,

            //Adds $ sign and commas
            scaleLabel: function(label){
                return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },

            maintainAspectRatio: false,
            responsive: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: false,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: false,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            legend: {
            	display: false,
            	labels: {
            		display: false
            	}
            },

            hover: {
            	display: false
            },

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };

        var selectedGame = Template.instance().selectedGame.get();
        var selectedPlayer = Template.instance().selectedPlayer.get();

        var currentUser = Meteor.userId();
        if (selectedGame === 'all games'){
        	if (selectedPlayer){
        		var userSessions = Sessions.find({createdBy: selectedPlayer, 
        			$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]
        		}).fetch();
        	} else {
        		var userSessions = Sessions.find({
        			$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]
        		}).fetch();
        	}
        	
        } else {
        	var games = Games.find({name: selectedGame}).fetch();
			gameIds = [];
			_.each(games, function(entry){
				gameIds = gameIds.concat({game: entry._id});
			})
			
			if (selectedPlayer){
				var userSessions = Sessions.find({createdBy: selectedPlayer, $or: gameIds, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
			} else {
				var userSessions = Sessions.find({$or: gameIds, 
					$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: true}}]}).fetch();
			}
			
        }
        

        var combinedData = {
        	hands: 0,
        	bet: 0,
        	dev: 0,
        	adv: 0,
        	result: 0,
        	ev: 0
        };
        var latestUpdate;
        var graphData = [];
        var evData = [];
        var graphLabels = [];
        var posDev = [];
        var negDev = [];

        _.each(userSessions, function(entry){
        	if (entry.game){
	        	var game = Games.findOne({_id: entry.game});
	        	var speed = Number(game && game.speed);
	        	var duration = entry.completedAt - entry.createdAt;
	        	var hands = (duration / 3600000) * speed;
	        	var bet = entry.denomination * hands;
	        	var dev = Math.sqrt(Number(game && game.variance)) * hands;
	        	var adv = (Number(game && game.edge))/100 * hands;
	        	var result = entry.colored - entry.bought;
	        	var ev = ((bet/hands)*(adv/hands))*hands;

	        /////////////////////////////////////////////////////////////

		        combinedData.hands += hands;
		        combinedData.bet += bet,
		        combinedData.dev += dev,
		        combinedData.adv += adv,
		        combinedData.result += result,
		        combinedData.ev += ev

		        graphData.push((combinedData.result + /*something investest*/0));
		        evData.push(combinedData.ev + 0);
		       
		        //calc variances
		        var stdDev = (( (combinedData.dev / combinedData.hands) * 
		        	(combinedData.bet / combinedData.hands) ) * 
		        	(Math.sqrt(combinedData.hands)));
		         
		        var goodDev = (stdDev*2) + combinedData.ev;

		        var badDev = combinedData.ev - (stdDev*2);

		        posDev.push(goodDev + 0);
		        negDev.push(badDev + 0);



		        var timeStamp = entry.completedAt;
		        if (timeStamp > latestUpdate){
		        	latestUpdate = timeStamp;
		        }

		        //Labels
		        var entryDate = entry.completedAt;
		        graphLabels.push(' ');
		    }

        })


        var data = {
            labels: graphLabels,
            datasets: [{
                label: "Positive Variance",
                fillColor: "rgba(74, 191, 133,0.2)",
                strokeColor: "rgba(74, 191, 133,1)",
                pointColor: "rgba(74, 191, 133,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: posDev
            }, {
                label: "Player Results",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: graphData
            }, {
                label: "Negative Variance",
                fillColor: "rgba(209, 97, 97,0.2)",
                strokeColor: "rgba(209, 97, 97,1)",
                pointColor: "rgba(209, 97, 97,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,0.7)",
                data: negDev
            }, {
                label: "Expected Value",
                fillColor: "rgba(217, 217, 217,0.2)",
                strokeColor: "rgba(217, 217, 217,1)",
                pointColor: "rgba(217, 217, 217,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,0.7)",
                data: evData
            }]
        };
        myLineChart = new Chart(ctx).Line(data, options);
    }

    
    initiateChart();

	
});

Template.Stats.onDestroyed(function () {
});


	
