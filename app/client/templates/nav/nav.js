/*****************************************************************************/
/* Nav: Event Handlers */
/*****************************************************************************/
Template.Nav.events({
	'click .navbar-toggle':function(e, tmpl){
		var dropdown = $('.navbar-nav');
		if (dropdown.hasClass('hidden')){
			dropdown.removeClass('hidden');
		} else {
			dropdown.addClass('hidden');
		}
	},
	'click .navbar-nav a':function(e, tmpl){
		var dropdown = $('.navbar-nav');
		dropdown.addClass('hidden');
	}
});

/*****************************************************************************/
/* Nav: Helpers */
/*****************************************************************************/
Template.Nav.helpers({
});

/*****************************************************************************/
/* Nav: Lifecycle Hooks */
/*****************************************************************************/
Template.Nav.onCreated(function () {
});

Template.Nav.onRendered(function () {
});

Template.Nav.onDestroyed(function () {
});
