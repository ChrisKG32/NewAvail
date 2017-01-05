/*****************************************************************************/
/* CasinoSchedule: Event Handlers */
/*****************************************************************************/
Template.CasinoSchedule.events({
	'click .day-header':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		var dayId = currentTarget.attr('day-id');
		var dealerList = $('.dealer-list[day-id="' + dayId + '"]');
		if (dealerList.hasClass('hidden')){
			dealerList.removeClass('hidden');
		} else {
			dealerList.addClass('hidden');
		}
	}
});

/*****************************************************************************/
/* CasinoSchedule: Helpers */
/*****************************************************************************/
Template.CasinoSchedule.helpers({
	casinoPage:function(){
		var casinoData = Session.get('casinoPage');
		if (casinoData){
			return true
		} else {
			return false
		}
	},
	scheduleDays:function(){
		var casinoData = Session.get('casinoPage');
		var dotw = [

			{day: 'Sun', dayValue: 0, text: 'Sundays'},
			{day: 'Mon', dayValue: 1, text: 'Mondays'},
			{day: 'Tue', dayValue: 2, text: 'Tuesdays'},
			{day: 'Wed', dayValue: 3, text: 'Wednesdays'},
			{day: 'Thu', dayValue: 4, text: 'Thursdays'},
			{day: 'Fri', dayValue: 5, text: 'Fridays'},
			{day: 'Sat', dayValue: 6, text: 'Saturdays'}
		]
		dotw = dotw.filter(function(entry){
			var dealersPresent = Schedule.find({casinoId: casinoData, day: entry.day}).fetch();
			if (dealersPresent && dealersPresent.length > 0){
				entry.number = dealersPresent.length;
				return true
			} else {
				return false
			}
		});

		return dotw
	},
	casinoSchedule:function(){
		var day = this.day;
		var casinoData = Session.get('casinoPage');
		var data = Schedule.find({casinoId: casinoData, day: this.day}, {sort: {startValue: 1}}).fetch();

		if (data){
			_.each(data, function(entry){
				var dealerData = Dealers.findOne({_id: entry.dealerId});
				var dealerName = dealerData && dealerData.name;
				var dealerQuality = dealerData && dealerData.details && dealerData.quality;

				entry.dealerName = dealerName;
				entry.dealerQuality = dealerQuality;
			});
		}
		return data
	}
});

/*****************************************************************************/
/* CasinoSchedule: Lifecycle Hooks */
/*****************************************************************************/
Template.CasinoSchedule.onCreated(function () {
});

Template.CasinoSchedule.onRendered(function () {
});

Template.CasinoSchedule.onDestroyed(function () {
});
