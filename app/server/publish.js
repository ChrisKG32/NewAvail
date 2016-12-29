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

Meteor.publish('allSessions', function(){
	return Sessions.find();
});

Meteor.publish('userExpenses', function(currentUser){
	return Expenses.find({createdBy: currentUser});
});

Meteor.publish('allExpenses', function(){
	return Expenses.find();
});

Meteor.publish('Notifications', function(){
	return Notifications.find();
});

Meteor.publish('casinoList', function(){
	return Casinos.find();
});

Meteor.publish('dealerList', function(){
	return Dealers.find();
});
