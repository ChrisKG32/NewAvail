/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
	'click h4':function(e, tmpl){
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass('sessions')){
			tmpl.profilePage.set('sessions');
		} else if (currentTarget.hasClass('expenses')){
			tmpl.profilePage.set('expenses');
		} else if (currentTarget.hasClass('stats')){
			tmpl.profilePage.set('stats');
		}
	}
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
	},
	activeTab:function(param1){
		var profilePage = Template.instance().profilePage.get();
		if (param1 === profilePage){
			return 'active'
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
