/*****************************************************************************/
/* Incomplete: Event Handlers */
/*****************************************************************************/
Template.Incomplete.events({
});

/*****************************************************************************/
/* Incomplete: Helpers */
/*****************************************************************************/
Template.Incomplete.helpers({
});

/*****************************************************************************/
/* Incomplete: Lifecycle Hooks */
/*****************************************************************************/
Template.Incomplete.onCreated(function () {
});

Template.Incomplete.onRendered(function () {
	setTimeout(function(){
		$('.incomplete-session').removeClass('hidden');
	},500)
});

Template.Incomplete.onDestroyed(function () {
});
