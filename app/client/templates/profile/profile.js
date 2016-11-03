/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
	profilePage:function(param1){
		var page = Template.instance().profilePage.get();
		if (param1 === page) {
			return true
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.onCreated(function () {
	this.profilePage = new ReactiveVar('stats');
});

Template.Profile.onRendered(function () {
});

Template.Profile.onDestroyed(function () {
});
