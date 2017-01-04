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
	'click .view-dealer-profile':function(e, tmpl){
		var selectedCasino = tmpl.selectedCasino.get();
		var selectedDealer = tmpl.selectedDealer.get();
		if (selectedCasino && selectedDealer) {
			var dealer = Dealers.findOne({casino: selectedCasino, name: selectedDealer});
			var dealerId = dealer && dealer._id;
			Router.go('DealerProfile', {_id: dealerId});
		}
	}
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
	selectedDealer:function(){
		var selectedCasino = Template.instance().selectedCasino.get();
		var selectedDealer = Template.instance().selectedDealer.get();
		if (selectedCasino && selectedDealer) {
			return true
		} else {
			return false
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
