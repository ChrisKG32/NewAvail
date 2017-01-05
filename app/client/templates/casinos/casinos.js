/*****************************************************************************/
/* Casinos: Event Handlers */
/*****************************************************************************/
Template.Casinos.events({
	'click .new-casino':function(e, tmpl){
		var inputValue = prompt('Enter casino name');
		if (inputValue) {
			const conflict = Casinos.findOne({name: {$regex: inputValue, $options: 'i'}});
			if (!conflict){
				Meteor.call('newCasino', inputValue, function(e, r){
					if (e){
						alert('error');
					} else {
						console.log('successfully added new casino');
						$('#casino-name').val(inputValue);
						tmpl.selectedCasino.set(inputValue);
					}
				});
			} else {
				console.log('Casino already exists');
			}
		}
	},
	'change #casino-name':function(e, tmpl){
		var casino = Casinos.findOne({name: $(e.currentTarget).val()});
		var casinoId = casino && casino._id;
		Session.set('casinoPage', casinoId);
	}
});

/*****************************************************************************/
/* Casinos: Helpers */
/*****************************************************************************/
Template.Casinos.helpers({
	casinoList:function(){
		return Casinos.find({}, {sort: {name: 1}});
	}
});

/*****************************************************************************/
/* Casinos: Lifecycle Hooks */
/*****************************************************************************/
Template.Casinos.onCreated(function () {
	Session.set('casinoPage', false);

});

Template.Casinos.onRendered(function () {

});

Template.Casinos.onDestroyed(function () {
});
