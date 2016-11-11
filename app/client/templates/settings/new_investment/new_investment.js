/*****************************************************************************/
/* NewInvestment: Event Handlers */
/*****************************************************************************/
Template.NewInvestment.events({
	'click .submit-investment':function(e, tmpl){
		var username = ($('#user-select').val()).toLowerCase();
		var investAmt = Number($('#invest-amt').val());
		var investDate = ($('#invest-date').val()).toLowerCase();

		var formattedDate = investDate.replace(/\//g, '-');
		var userId = Meteor.users.findOne({username: username})._id;
		var currentUser = Meteor.userId();

		var data = {
			userId: userId,
			createdBy: currentUser,
			amount: investAmt,
			createdAt: new Date(),
			valid: new Date(formattedDate)
		};
		var userProfile = Meteor.users.findOne({_id: userId});
		var profileUsername = userProfile && userProfile.username;

		var investId = $('#invest-amt').attr('invest-id');
		var investCol = Investments.findOne(investId);
		if (investCol){
			var editData = investCol;
			editData.editedBy = currentUser;
			editData.editedAt = new Date();
		}
		

		if (!investCol){
			Meteor.call('newInvestment', data, function(r){
				console.log('Added investment successfully');
				$('#user-select').val('');
				$('#invest-amt').val('');
				$('#invest-date').val('');
			});

			console.log('Successfully added investment for ' + profileUsername);

		} else {
			var answer = confirm('Do you want to change this investment?');

			if (answer){

				var existingInvestment = investCol;


				Meteor.call('editInvestment', data, existingInvestment, editData, function(){
					console.log('Successfully edited existing investment');
				});

			} else {
				console.log('Investment not changed.');
			}
		}
	},
	'click .cancel-invest':function(e){
		Router.go('settings');
	}
});

/*****************************************************************************/
/* NewInvestment: Helpers */
/*****************************************************************************/
Template.NewInvestment.helpers({
	userList:function(){
		var playerList = Players.find().fetch();
		_.each(playerList, function(entry){
			var userId = entry.userId;
			var userLookup = Meteor.users.findOne(userId);
			entry.username = userLookup && userLookup.username;
		});
		if (playerList){
			return playerList
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* NewInvestment: Lifecycle Hooks */
/*****************************************************************************/
Template.NewInvestment.onCreated(function () {
});

Template.NewInvestment.onRendered(function () {
	$('.input-group.date').datepicker({
		clearBtn: true,
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	});
});

Template.NewInvestment.onDestroyed(function () {
});
