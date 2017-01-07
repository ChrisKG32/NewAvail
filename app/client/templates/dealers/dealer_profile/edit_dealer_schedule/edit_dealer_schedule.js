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
		var timeValues = {
			'6am': 1,
			'7am': 2,
			'8am': 3,
			'9am': 4,
			'10am': 5,
			'11am': 6,
			'12pm': 7,
			'1pm': 8,
			'2pm': 9,
			'3pm': 10,
			'4pm': 11,
			'5pm': 12,
			'6pm': 13,
			'7pm': 14,
			'8pm': 15,
			'9pm': 16,
			'10pm': 17,
			'11pm': 18,
			'12am': 19,
			'1am': 20,
			'2am': 21,
			'3am': 22,
			'4am': 23,
			'5am': 24
		}

		var start = $('#start-time').val();
		var leave = $('#leave-time').val();
		var startValue = timeValues[start];
		var leaveValue = timeValues[leave];
		var dayValues = {
			Mon: 1,
			Tue: 2,
			Wed: 3,
			Thu: 4,
			Fri: 5,
			Sat: 6,
			Sun: 0
		}
		day = day.substr(0,3);
		var data = {
			dealerId: this._id, 
			casino: this.casino, 
			day: day, 
			dayValue:dayValues[day],  
			start: start, 
			startValue: startValue,
			leave: leave,
			leaveValue: leaveValue
		};
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
			{text: '12am', value: 19},
			{text: '1am', value: 20},
			{text: '2am', value: 21},
			{text: '3am', value: 22},
			{text: '4am', value: 23},
			{text: '5am', value: 24},
			{text: '6am', value: 1},
			{text: '7am', value: 2},
			{text: '8am', value: 3},
			{text: '9am', value: 4},
			{text: '10am', value: 5},
			{text: '11am', value: 6},
			{text: '12pm', value: 7},
			{text: '1pm', value: 8},
			{text: '2pm', value: 9},
			{text: '3pm', value: 10},
			{text: '4pm', value: 11},
			{text: '5pm', value: 12},
			{text: '6pm', value: 13},
			{text: '7pm', value: 14},
			{text: '8pm', value: 15},
			{text: '9pm', value: 16},
			{text: '10pm', value: 17},
			{text: '11pm', value: 18}
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
