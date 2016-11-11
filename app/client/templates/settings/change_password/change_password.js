/*****************************************************************************/
/* ChangePassword: Event Handlers */
/*****************************************************************************/
Template.ChangePassword.events({
	'click .submit-password-change':function(e){
		var password1 = $('#password1').val();
		var password2 = $('#password2').val();
		var confirmPassword1 = $('#new-password1').val();
		var confirmPassword2 = $('#new-password2').val();

		var data = {
			password1: password1,
			password2: password2,
			confirmPassword1: confirmPassword1,
			confirmPassword2: confirmPassword2
		}

		var confirmTest = confirm('Do you want to permanently change your password?');

		if (confirmTest) {
			Meteor.call('passChange', data, function(){
				console.log('Password change completed');
				$('#password1').val('');
				$('#password2').val('');
				$('#new-password1').val('');
				$('#new-password2').val('');

			});
		} else {
			console.log('Password not changed.');
		}
	}
});

/*****************************************************************************/
/* ChangePassword: Helpers */
/*****************************************************************************/
Template.ChangePassword.helpers({
});

/*****************************************************************************/
/* ChangePassword: Lifecycle Hooks */
/*****************************************************************************/
Template.ChangePassword.onCreated(function () {
});

Template.ChangePassword.onRendered(function () {
});

Template.ChangePassword.onDestroyed(function () {
});
