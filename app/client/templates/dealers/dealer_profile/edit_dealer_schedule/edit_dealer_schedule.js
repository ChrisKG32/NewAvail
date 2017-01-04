/*****************************************************************************/
/* EditDealerSchedule: Event Handlers */
/*****************************************************************************/
Template.EditDealerSchedule.events({
	'change #schedule-day':function(e, tmpl){
		$('#start-time, #leave-time').val('Time (Select One)');
		if ($(e.currentTarget).val() === 'Day (Select One)'){
			tmpl.selectedDay.set(false);
		} else {
			tmpl.selectedDay.set($(e.currentTarget).val());
		}
	},
	'click .cancel-schedule-edit':function(e, tmpl){
		Session.set('editDealerSchedule', false);
	},
	'click .submit-times':function(e, tmpl){
		var day = $('#schedule-day').val();
		var start = $('#start-time').val();
		var leave = $('#leave-time').val();
		var data = {dealerId: this._id, day: day.substr(0,3), start: start, leave: leave};
		Meteor.call('updateDealerSchedule', data, function(e,r){
			if (e){
				console.log(e.reason);
			} else {
				Session.set('editDealerSchedule', false);
			}
		});
	}
});

/*****************************************************************************/
/* EditDealerSchedule: Helpers */
/*****************************************************************************/
Template.EditDealerSchedule.helpers({
	selectedDay:function(){
		var selectedDay = Template.instance().selectedDay.get();
		if (!!selectedDay) {
			return selectedDay
		} else {
			return false
		}
	},
	timeOfDay:function(){
		return [
			'12am',
			'1am',
			'2am',
			'3am',
			'4am',
			'5am',
			'6am',
			'7am',
			'8am',
			'9am',
			'10am',
			'11am',
			'12pm',
			'1pm',
			'2pm',
			'3pm',
			'4pm',
			'5pm',
			'6pm',
			'7pm',
			'8pm',
			'9pm',
			'10pm',
			'11pm'
		]
	}
});

/*****************************************************************************/
/* EditDealerSchedule: Lifecycle Hooks */
/*****************************************************************************/
Template.EditDealerSchedule.onCreated(function () {
	this.selectedDay = new ReactiveVar(false);
});

Template.EditDealerSchedule.onRendered(function () {
});

Template.EditDealerSchedule.onDestroyed(function () {
});
