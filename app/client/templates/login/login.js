/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({
	'click .btn-choose':function(e, tmpl){
		var authorize = tmpl.authorize.get();

		var accountType = authorize;
		tmpl.authorize.set('register4');
	},
	'click .fa-chevron-right':function(e, tmpl){
		var register = tmpl.authorize.get();
		if (register === 'register1'){
			tmpl.authorize.set('register2');
		} else if (register === 'register2'){
			tmpl.authorize.set('register3');
		} else if (register === 'register3'){
			tmpl.authorize.set('register1');
		}
	},
	'click .fa-chevron-left':function(e, tmpl){
		var register = tmpl.authorize.get();
		if (register === 'register1'){
			tmpl.authorize.set('register3');
		} else if (register === 'register2'){
			tmpl.authorize.set('register1');
		} else if (register === 'register3'){
			tmpl.authorize.set('register2');
		}
	},
	'submit form.login':function(e){
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		Meteor.loginWithPassword(username, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				Router.go('Play');
			}
		});
	},
	'submit form.signup':function(e){
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		var confirmPassword = $('#confirm-password').val();
		var duplicateUser = Meteor.users.findOne({'username': username});

		var data = {
			username: username,
			password: password,
			investor: false,
			player: true,
		}

		if (!duplicateUser) {
			if (password !== confirmPassword) {
				alert('Password Mismatch');
			} else {
				
				Meteor.call('createAccount', data, function(){
					console.log('successfully created account');
					
					var account = Users.findOne({username: data.username})._id;
					Players.insert({
						userId: account,
						player: true,
						investor: false
					})
				});
			}
		} else {
			console.log('User already exists');
		}
	},
	'click .create-account':function(e, tmpl){
		var passcode = prompt('Enter Passcode');
		var correctPasscode = 1947;
		if (passcode == correctPasscode){
			tmpl.authorize.set('register1');

		}
	},
	'click .btn-login':function(e, tmpl){	
		tmpl.authorize.set('Login');
	},
	'click .return-login':function(e, tmpl){
		tmpl.authorize.set(false);
	}
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({
	loginForm:function(param1, param2, param3){
		var authorized = Template.instance().authorize.get();
		if (authorized == param1 || authorized === param2 || authorized === param3){
			return true
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function () {
	this.authorize = new ReactiveVar(false);
	this.register = new ReactiveVar(false);
});

Template.Login.onRendered(function () {
});

Template.Login.onDestroyed(function () {
});
