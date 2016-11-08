/*****************************************************************************/
/* Sessions: Event Handlers */
/*****************************************************************************/
Template.Sessions.events({
	'click .sorting':function(e, tmpl){
		var sortSpan = $('.sorting i');
		if (sortSpan.hasClass('recent')){
			sortSpan.removeClass('recent').removeClass('fa-caret-down')
				.addClass('fa-caret-up').addClass('past');
				tmpl.sorting.set('past');

		} else {
			sortSpan.removeClass('past').removeClass('fa-caret-up')
				.addClass('fa-caret-down').addClass('recent');
				tmpl.sorting.set(false);
		}
		$('.sort-result i').removeClass('fa-caret-up').removeClass('fa-caret-down');

	},
	'click .sort-result':function(e, tmpl){
		var sortSpan = $('.sort-result i');

			if (sortSpan.hasClass('fa-caret-down')){
				sortSpan.removeClass('fa-caret-down')
					.addClass('fa-caret-up');
					tmpl.sortResult.set('worst');
			} else if (sortSpan.hasClass('fa-caret-up')) {
				sortSpan.removeClass('fa-caret-up')
					.addClass('fa-caret-down');
					tmpl.sortResult.set('best');
			} else {
				sortSpan.addClass('fa-caret-down')
				tmpl.sortResult.set('best');
			}
			$('.sorting i').removeClass('fa-caret-up').removeClass('fa-caret-down');
	},
	'click .table-content tr':function(e, tmpl){
		tmpl.editSession.set(this);
	},
	'click #cancel-edit':function(e, tmpl){
		tmpl.editSession.set(false);
	}
});

/*****************************************************************************/
/* Sessions: Helpers */
/*****************************************************************************/
Template.Sessions.helpers({
	userSessions:function(){
		var selectedDate = Template.instance().selectedDate.get();
		var sorting = Template.instance().sorting.get();
		var currentUser = Meteor.userId();
		if (!sorting){
			var sortBy = -1;
		} else {
			var sortBy = 1;
		}
	
		if (selectedDate){
			var previousDay = new Date(selectedDate);
			var nextDay = new Date(selectedDate);
			
			previousDay.setDate(selectedDate.getDate()-1);
			nextDay.setDate(selectedDate.getDate()+1);
			var sessionList = Sessions.find({createdBy: currentUser, createdAt: {$gte:selectedDate, $lt: nextDay}},
												{sort: {createdAt: sortBy}}).fetch();
		} else {
			var sessionList = Sessions.find({createdBy: currentUser}, {sort: {createdAt: sortBy}}).fetch();
		}
		
		_.each(sessionList, function(entry){
			var gameId = entry.game;
			var gameDetails = Games.findOne(gameId);
			var gameDate = entry.createdAt;
			var dateFormat = (gameDate.getMonth() + 1) + '/' + gameDate.getDate() + '/' + Number(gameDate.getFullYear().toString().substr(2,4));
			entry.details = {
				name: gameDetails && gameDetails.name,
				variant: gameDetails && gameDetails.variant,
				result: entry.colored - entry.bought,
				date: dateFormat
			}
		});
		return sessionList
	},
	singleDay:function(){
		var selectedDate = Template.instance().selectedDate.get();
		if (selectedDate){
			var nextDay = new Date(selectedDate);
			nextDay.setDate(selectedDate.getDate()+1);
			var currentUser = Meteor.userId();
			var sessionList = Sessions.find(
				{createdBy: currentUser, createdAt: 
					{$gte:selectedDate, $lt: nextDay}
				}).fetch();
			if (sessionList && sessionList.length > 0) {
				var total = 0;
				_.each(sessionList, function(entry){
					total += (entry.colored - entry.bought);
				});
				return total
			} else {
				return false
			}

			
		} else {
			return false
		}
	},
	selectedSession:function(){
		var editSession = Template.instance().editSession.get();

		if (editSession){
			var date = ((editSession.createdAt).getDate()).toString();
			var month = ((editSession.createdAt).getMonth() + 1).toString();
			if (date.length < 2){
				date = '0' + date;
			}
			if (month.length < 2){
				month = '0' + month;
			}
			
			var year = (((editSession.createdAt).getFullYear()).toString()).substr(2,2);
			editSession.date = month + '/' + date + '/' + year;
			editSession.duration = Math.round((editSession.completedAt - editSession.createdAt)/3600000).toFixed(2);

			var game = Games.findOne({_id: editSession.game});
			editSession.gameName = game.name;
			editSession.variant = game.variant;

			return editSession
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* Sessions: Lifecycle Hooks */
/*****************************************************************************/
Template.Sessions.onCreated(function () {
	this.selectedDate = new ReactiveVar(false);
	this.sorting = new ReactiveVar(false);
	this.sortResult = new ReactiveVar(false);
	this.editSession = new ReactiveVar(false);
});

Template.Sessions.onRendered(function () {
	var selfVariable = this;
	$('#datepicker').datepicker({
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	}).on('changeDate', function(e, tmpl){
		var selectedDate = $('#datepicker').datepicker('getFormattedDate');
		var unformattedDate = $('#datepicker').datepicker('getDate');
		var currentDate = selfVariable.selectedDate.get();
		if (currentDate === unformattedDate){
			selfVariable.selectedDate.set(false);
		} else {
			selfVariable.selectedDate.set(unformattedDate);
		}
		
		$('#datepicker').attr('data-date', selectedDate);
	})
	//$('#textfield').datepicker();
});

Template.Sessions.onDestroyed(function () {
});
