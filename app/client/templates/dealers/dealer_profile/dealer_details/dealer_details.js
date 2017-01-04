/*****************************************************************************/
/* DealerDetails: Event Handlers */
/*****************************************************************************/
Template.DealerDetails.events({
	'click .edit-fields':function(e, tmpl){
		tmpl.editFields.set(this._id);
	},
	'click .cancel-edit-fields':function(e, tmpl){
		tmpl.editFields.set(false);
	},
	'click .update-fields':function(e, tmpl){
		var sex = $('#sex').val();
		var race = $('#race').val();
		var age = $('#age').val();
		var height = $('#height').val();
		var hairLength = $('#hair-length').val();
		var hairColor = $('#hair-color').val();
		var bestSeat = $('#seat').val();
		var quality = $('#quality').val();
		var glasses = $('#glasses').is(':checked');
		var blackjack = $('#blackjack').is(':checked');
		var comments = $('#comments').val();

		var data = {
			dealerId: tmpl.editFields.get(),
			sex: sex,
			race: race,
			age: age,
			height: height,
			hairLength: hairLength,
			hairColor: hairColor,
			bestSeat: bestSeat,
			quality: quality,
			glasses: glasses,
			blackjack: blackjack,
			comments: comments
		}
		console.log(data);

		Meteor.call('updateDealerDetails', data, function(e,r){
		});
	}
});

/*****************************************************************************/
/* DealerDetails: Helpers */
/*****************************************************************************/
Template.DealerDetails.helpers({
	checked:function(param1){
		if (this.details.glasses && param1 === 'glasses'){
			return 'checked'
		} else if (this.details.blackjack && param1 === 'blackjack'){
			return 'checked'
		} else {
			return false
		}
	},
	editFields:function(){
		return Template.instance().editFields.get()
	}
});

/*****************************************************************************/
/* DealerDetails: Lifecycle Hooks */
/*****************************************************************************/
Template.DealerDetails.onCreated(function () {
	this.editFields = new ReactiveVar(false);
});

Template.DealerDetails.onRendered(function () {

		var detailsStage = document.getElementById('dealer-details-edit');
		var selfVar = this;
		var detailsHammer = new Hammer(detailsStage);
		detailsHammer.on('press', function(e){

			var editFields = selfVar.editFields.get();

			if (editFields){
				var target = $(e.target);
				if (target.hasClass('form-control')){
					target.removeProp('disabled');
				} else if (target.hasClass('checkbox-inline')){
					target.find('input[type="checkbox"]').removeProp('disabled');
				}
			}
			
		})
});

Template.DealerDetails.onDestroyed(function () {
});
