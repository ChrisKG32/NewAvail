/*****************************************************************************/
/* DealerProfile: Event Handlers */
/*****************************************************************************/
Template.DealerProfile.events({
	'click li.dealer-tabs':function(e, tmpl){
		var activeTab = $(e.currentTarget).attr('id');
		if (!$(e.currentTarget).hasClass('active')){
			$('.dealer-tabs').removeClass('active');
			$(e.currentTarget).addClass('active');
		}
		tmpl.activeTab.set(activeTab)
	}
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
	},
	editSchedule:function(){
		var dealerId = this._id;
		return Session.get('editDealerSchedule') === dealerId
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
