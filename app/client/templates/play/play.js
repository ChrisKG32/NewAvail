/*****************************************************************************/
/* Play: Event Handlers */
/*****************************************************************************/
Template.Play.events({
	'blur .inputs input':function(e){
		var currentTarget = $(e.currentTarget);
		var inputValue = currentTarget.val();
		console.log(inputValue.length);
		if (inputValue.length === 0){
			currentTarget.addClass('warning');
		} else {
			currentTarget.removeClass('warning');
		}
		
	},
	'click .begin':function(e, tmpl){
		var currentUser = Meteor.userId();
		var incompleteSession = Sessions.findOne({$and: [
				{createdBy: currentUser},
				{createdAt: {$exists: true}},
				{completedAt: {$exists: true}},
				{bought: {$exists: false}}
			]
		});
		if (!incompleteSession){
			
			var data = {
				createdBy: currentUser,
				createdAt: new Date()
			}
			Meteor.call('startSession', data);
		}
		

	},
	'click .complete':function(e, tmpl){
		var currentUser = Meteor.userId();
		var data = {
			completedAt: new Date()
		}
		Meteor.call('endSession', data, function(error, result){
			if (error){
				alert('error');
			} else {
				tmpl.currentSession.set(result);
			}
		});
	},
	'click .cancel':function(e, tmpl){
		var currentSession = tmpl.currentSession.get();
		Meteor.call('cancelSession', currentSession, function(error, result){
			if (error){
				alert('error');
			} else {
				console.log('canceled session');
			}
		});
		tmpl.currentSession.set(false);
	},
	'click .submit':function(e, tmpl){
		var bought = Number($('#bought').val());
		var colored = Number($('#colored').val());
		var denomination = Number($('#denom').val());
		var gameName = $('#game-name').val().toLowerCase();
		var gameVariant = $('#game-variant').val().toLowerCase();
		var currentSession = tmpl.currentSession.get();
		if (!bought || !colored || !denomination || !gameName || !gameVariant){
			alert('Fill all empty fields');
			$('')
		} else {
			var data = {
				_id: currentSession._id,
				bought: bought,
				colored: colored,
				denomination: denomination,
				name: gameName,
				variant: gameVariant
			}
			Meteor.call('sessionDetails', data, function(error, result){
				if (error){
					console.log(error);
				} else {
					console.log('updated Session Details');
					tmpl.currentSession.set(false);
				}
			});
		}
	},
	'click .remove-session':function(e, tmpl){
		var currentUser = Meteor.userId();
		var incompleteSession = Sessions.findOne({$and: [
				{createdBy: currentUser},
				{createdAt: {$exists: true}},
				{completedAt: {$exists: true}},
				{bought: {$exists: false}}
			]
		});
		Meteor.call('cancelSession', incompleteSession, function(error, result){
			if (error){
				alert('error');
			} else {
				console.log('canceled session');
			}
		});
		tmpl.currentSession.set(false);
	},
	'click .update-session':function(e, tmpl){
		var currentUser = Meteor.userId();
		var incompleteSession = Sessions.findOne({$and: [
				{createdBy: currentUser},
				{createdAt: {$exists: true}},
				{completedAt: {$exists: true}},
				{bought: {$exists: false}}
			]
		});
		tmpl.currentSession.set(incompleteSession);
	}
});

/*****************************************************************************/
/* Play: Helpers */
/*****************************************************************************/
Template.Play.helpers({
	/*
	display:function(param1){
		
		var currentUser = Meteor.userId();
		var incompleteSession = Sessions.findOne({$and: [
				{createdBy: currentUser},
				{createdAt: {$exists: true}},
				{completedAt: {$exists: true}},
				{bought: {$exists: false}}
			]
		});
		var currentSession = Template.instance().currentSession.get();
		if ((!currentSession && incompleteSession) && param1 === 'incomplete'){
			return true
			//Template.instance().currentSession.set(incompleteSession)
		} else {
			var currentSession = Template.instance().currentSession.get();

			if (currentSession && param1 === 'completed'){
				return true
			} else {
				var active = Sessions.findOne({ $and: 
					[
						{createdBy: currentUser},
						{createdAt: {$exists: true}}, 
						{completedAt: {$exists: false}}
					]
				});
				if (!active && param1 === 'inactive') {
					return true
				} else {
					return false
				}
			}
		}
	},*/
	display:function(param1){
		var currentUser = Meteor.userId();
		var currentSession = Template.instance().currentSession.get();
		var incomplete = Sessions.findOne({
			$and: [
				{createdBy: currentUser},
				{createdAt: {$exists: true}},
				{completedAt: {$exists: true}},
				{bought: {$exists: false}}
			]
		});
		//No incomplete session
		if (!incomplete){
			var started = Sessions.findOne({
				$and: [
					{createdBy: currentUser},
					{createdAt: {$exists: true}},
					{completedAt: {$exists: false}}
				]
			});
			if (!started && (param1 === 'play')) {
				return true
			} else if (started && (param1 === 'stop')){
				return true
			} else {
				return false
			}
		} else if (currentSession){
			if (incomplete && (param1 === 'details')){
				return true
			} else {
				return false
			}
		} else if (!currentSession) {
			if (incomplete && (param1 === 'error')){
				return true
			} else {
				return false
			}
		}		
	}
});

/*****************************************************************************/
/* Play: Lifecycle Hooks */
/*****************************************************************************/
Template.Play.onCreated(function () {
	this.currentSession = new ReactiveVar(false);
});

Template.Play.onRendered(function () {
});

Template.Play.onDestroyed(function () {
});
