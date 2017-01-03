/*****************************************************************************/
/* DealerSchedule: Event Handlers */
/*****************************************************************************/
Template.DealerSchedule.events({
});

/*****************************************************************************/
/* DealerSchedule: Helpers */
/*****************************************************************************/
Template.DealerSchedule.helpers({
	dealerDays:function(){
		var dealerName = this.name;

		//Math.floor(Math.abs(DATE.completedAt - DATE.createdAt) / 36e5);

		var dotw = {
			Mon: [],
			Tue: [],
			Wed: [],
			Thu: [],
			Fri: [],
			Sat: [],
			Sun: []
		};
		var scheduleArr = [];
		_.each(Sessions.find({dealer: dealerName}).fetch(), function(entry){
			var startDay = moment(entry.createdAt).format('ddd');
			var endDay = moment(entry.completedAt).format('ddd');
			if (startDay != endDay) {
				dotw[startDay].push({start: moment(entry.createdAt).format('H'), end: false});
				dotw[endDay].push({start: false, end: moment(entry.completedAt).format('H')});
			} else {
				dotw[startDay].push({start:moment(entry.createdAt).format('H'), end: moment(entry.completedAt).format('H')})
			}
			var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
			var scheduleObj = {};
			_.each(days, function(thisDay){
				scheduleObj[thisDay] = {
					day: thisDay,
					start: false,
					end: false
				}
			});
			for(var i = 0; i < days.length; i++){
				var smallest = false;
				var largest = false;
				_.each(dotw[days[i]], function(items){
					if (!items.start) {
						smallest = 'none';
					}
					if (!items.end){
						largest = 'none';
					}
					if (smallest !== 'none'){
						if (!smallest && !!items.start){
							smallest = items.start;
						} else if (smallest && !!items.start && items.start < smallest){
							smallest = items.start;
						}
					}
					if (largest !== 'none'){
						if (!largest && !!items.end){
							largest = items.end;
						} else if (largest && !!items.end && items.end < largest){
							largest = items.end;
						}
					}
				});
				scheduleObj[days[i]].start = smallest;
				scheduleObj[days[i]].end = largest;
			}
			
			_.each(days, function(entry){
				if (scheduleObj[entry].start || scheduleObj[entry].end){
					scheduleArr.push(scheduleObj[entry]);
				} 
			});
			
		});
		return scheduleArr
	}
});

/*****************************************************************************/
/* DealerSchedule: Lifecycle Hooks */
/*****************************************************************************/
Template.DealerSchedule.onCreated(function () {
});

Template.DealerSchedule.onRendered(function () {
});

Template.DealerSchedule.onDestroyed(function () {
});
