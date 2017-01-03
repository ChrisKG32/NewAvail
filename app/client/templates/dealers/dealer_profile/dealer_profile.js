/*****************************************************************************/
/* DealerProfile: Event Handlers */
/*****************************************************************************/
Template.DealerProfile.events({
});

/*****************************************************************************/
/* DealerProfile: Helpers */
/*****************************************************************************/
Template.DealerProfile.helpers({
	activeTab:function(param1){
		var activeTab = Template.instance().activeTab.get();
		if (activeTab === param1){
			return true
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* DealerProfile: Lifecycle Hooks */
/*****************************************************************************/
Template.DealerProfile.onCreated(function () {
	this.activeTab = new ReactiveVar('schedule');
});

Template.DealerProfile.onRendered(function () {
});

Template.DealerProfile.onDestroyed(function () {
});
