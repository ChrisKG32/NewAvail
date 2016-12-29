/*****************************************************************************/
/* Dealers: Event Handlers */
/*****************************************************************************/
Template.Dealers.events({
	'change #casino-name':function(e, tmpl){
		tmpl.selectedCasino.set($(e.currentTarget).val());
	},
	'change #dealer-name':function(e, tmpl){
		tmpl.selectedDealer.set($(e.currentTarget).val());
	},
	'click .new-casino':function(e, tmpl){
		var inputValue = prompt('Enter casino name');
		if (inputValue) {
			const conflict = Casinos.findOne({name: {$regex: inputValue, $options: 'i'}});
			if (!conflict){
				Meteor.call('newCasino', inputValue, function(e, r){
					if (e){
						alert('error');
					} else {
						console.log('successfully added new casino');
						$('#casino-name').val(inputValue);
						tmpl.selectedCasino.set(inputValue);
					}
				});
			} else {
				console.log('Casino already exists');
			}
		}
	},
	'click .new-dealer':function(e, tmpl){
		
		var casinoName = tmpl.selectedCasino.get();
		if (!casinoName) {
			alert('Enter casino name first');
		} else {
			var inputValue = prompt('Enter dealer name');

			if (inputValue){

				var data = {name: inputValue, casino: casinoName};
				const conflict = Dealers.findOne({name: {$regex: inputValue, $options: 'i'}, casino: {$regex: casinoName, $options: 'i'}});
				if (!conflict){
					Meteor.call('newDealer', data, function(e, r){
						if (e){
							alert('error');
						} else {
							console.log('successfully added new dealer');
							var bestSeat = prompt('Enter best seat');
							if (bestSeat){
								var dealerData = {name: inputValue, casino: casinoName, seat: bestSeat};
								Meteor.call('dealerSeat', dealerData, function(error, result){
									if (error){
										alert('error');
									} else {
										console.log('successfully updated dealer seat');
									}
								});
							}
						}
					});
				} else {
					console.log('Dealer already exists');
				}
			}
		}
	},
});

/*****************************************************************************/
/* Dealers: Helpers */
/*****************************************************************************/
Template.Dealers.helpers({
	casinoList:function(){
		return Casinos.find({})
	},
	dealerList:function(){
		var selectedCasino = Template.instance().selectedCasino.get();
		if (selectedCasino){
			return Dealers.find({casino: selectedCasino});
		} else {
			return []
		}
	},
	dealerFri:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
				console.log('derp');
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Fri'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray

			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}

		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerSat:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();
			if (dealerSessions && dealerSessions.length > 0){
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Sat'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}
		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerSun:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Sun'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}

		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerMon:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
				
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Mon'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}
		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerTue:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Tue'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}

		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerWed:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Wed'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}
			
		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	},
	dealerThu:function(){
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedDealer){
			var dealerSessions = Sessions.find({dealer: selectedDealer }).fetch();

			if (dealerSessions && dealerSessions.length > 0){
			
				var timeArray = [99, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
				var TFArray = [];
				for(var i = 0; i < 25; i++){
					var timeStamp = dealerSessions && dealerSessions[i] && dealerSessions[i].createdAt;
					var day = moment(timeStamp).format('ddd');
					if (day === 'Thu'){
						var time = moment(timeStamp).format('H');
						if (time == timeArray[i + 2]) {
							TFArray.push(true);
						} else {
							TFArray.push(false);
						}
					} else {
						TFArray.push(false);
					}
				}
				return TFArray
			} else {
				return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
			}
			
		} else {
			return ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']
		}
	}


});

/*****************************************************************************/
/* Dealers: Lifecycle Hooks */
/*****************************************************************************/
Template.Dealers.onCreated(function () {
	this.selectedCasino = new ReactiveVar(false);
	this.selectedDealer = new ReactiveVar(false);
});

Template.Dealers.onRendered(function () {
});

Template.Dealers.onDestroyed(function () {
});
