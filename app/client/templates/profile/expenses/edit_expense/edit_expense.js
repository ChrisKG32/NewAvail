/*****************************************************************************/
/* EditExpense: Event Handlers */
/*****************************************************************************/
Template.EditExpense.events({
});

/*****************************************************************************/
/* EditExpense: Helpers */
/*****************************************************************************/
Template.EditExpense.helpers({
	
});

/*****************************************************************************/
/* EditExpense: Lifecycle Hooks */
/*****************************************************************************/
Template.EditExpense.onCreated(function () {
});

Template.EditExpense.onRendered(function () {
	$('.input-group.date').datepicker({
		clearBtn: true,
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	});
});

Template.EditExpense.onDestroyed(function () {
});
