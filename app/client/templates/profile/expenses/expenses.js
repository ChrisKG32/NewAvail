/*****************************************************************************/
/* Expenses: Event Handlers */
/*****************************************************************************/
Template.Expenses.events({
});

/*****************************************************************************/
/* Expenses: Helpers */
/*****************************************************************************/
Template.Expenses.helpers({
	userExpenses:function(){
		var currentUser = Meteor.userId();
		var expenseList = Expenses.find({createdBy: currentUser},{sort: {date: -1}}).fetch();
		return expenseList
	}
});

/*****************************************************************************/
/* Expenses: Lifecycle Hooks */
/*****************************************************************************/
Template.Expenses.onCreated(function () {
});

Template.Expenses.onRendered(function () {
});

Template.Expenses.onDestroyed(function () {
});
