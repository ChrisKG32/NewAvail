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
	this.profilePage = new ReactiveVar('sessions');
});

Template.Profile.onRendered(function () {

	

	//swipe functionality
		var profileStage = document.getElementById('profile');
		var selfVar = this;
		var hammertime = new Hammer(profileStage);

		hammertime.on('pan', function(e){
			var direction = e.direction;
			var deltaX = e.deltaX;
			var distance = e.distance;
			var velocity = Math.abs(e.velocityX);

			var profilePage = selfVar.profilePage.get();
			if (profilePage === 'stats'){
				if (direction === 2 && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('expenses');
				} else if (direction === 4 && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('sessions');
				}
			} else if (profilePage === 'sessions'){
				//$('.sessions .container.col-xs-12')[0].style.transform = 'translate(' + deltaX/5 + 'px)';
				if (direction === 2  && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('stats');
				} else if (direction === 4  && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('expenses');
				}
			} else if (profilePage === 'expenses'){
				if (direction === 2 && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('sessions');
				} else if (direction === 4 && (distance > 220 || velocity > 1)){
					selfVar.profilePage.set('stats');
				}
			}
		});

		hammertime.on('press', function(e){
			var direction = e.direction;

			var profilePage = selfVar.profilePage.get();

			if ((profilePage === 'sessions') || (profilePage === 'expenses')){
				var target = $(e.target);
				if (target.hasClass('form-control')){
					if (target.is('#game-name') || 
						target.is('#game-variant') || 
						target.is('#game-date')){

					} else {
						target.removeProp('disabled');
					}
					
				}
			}
			
		})

});

Template.Profile.onDestroyed(function () {
});
