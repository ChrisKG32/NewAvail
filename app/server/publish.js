Meteor.publish('Players', function(){
	return Players.find();
});

Meteor.publish('Investments', function(){
	return Investments.find();
});

Meteor.publish('Games', function(){
	return Games.find();
});

Meteor.publish('userSessions', function(currentUser){
	return Sessions.find({createdBy: currentUser});
});

Meteor.publish('userExpenses', function(currentUser){
	return Expenses.find({createdBy: currentUser});
});

Meteor.publish('Notifications', function(){
	return Notifications.find();
});


