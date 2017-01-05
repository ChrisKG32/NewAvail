/*****************************************************************************/
/* DealerSchedule: Event Handlers */
/*****************************************************************************/
Template.DealerSchedule.events({
	'click .edit-dealer-schedule':function(){
		Session.set('editDealerSchedule', this._id);
	},
	'click .fa-close':function(e, tmpl){
		var data = this;
		var dealerId = tmpl.dealerId.get();
		data.dealerId = dealerId;
		var derp = confirm('Are you sure?');
		if (derp){
			Meteor.call('removeDealerScheduledDay', data, function(e, r){

			});
		}
	}
});

/*****************************************************************************/
/* DealerSchedule: Helpers */
/*****************************************************************************/
Template.DealerSchedule.helpers({
	dealerSchedule:function(){
		var dealerData = this;
		var dealerId = dealerData && dealerData._id;
		/*

		var dotw = [];
		var dealer = Dealers.findOne({_id: this._id});
		var dealerSchedule = dealer.schedule;
		var dealerSchedule = dealerSchedule.filter(function(entry){
			if (entry.present){
				return true
			} else {
				return false
			}
		})
		*/

		return Schedule.find({dealerId: dealerId}, {sort: {dayValue: 1}})
	}
});

/*****************************************************************************/
/* DealerSchedule: Lifecycle Hooks */
/*****************************************************************************/
Template.DealerSchedule.onCreated(function () {
	this.dealerId = new ReactiveVar(this.data._id);
});

Template.DealerSchedule.onRendered(function () {
});

Template.DealerSchedule.onDestroyed(function () {
});
