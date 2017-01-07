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
	},
	'click a.casino-id':function(e, tmpl){
		Session.set('redirect', true);
		Session.set('casinoPage', this.casino);
		Router.go('Casinos');
		
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
	},
	casinoName:function(){
		if (this.casino){
			var casinoName = Casinos.findOne({_id: this.casino}).name
			return casinoName
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
