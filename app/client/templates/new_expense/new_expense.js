/*****************************************************************************/
/* NewExpense: Event Handlers */
/*****************************************************************************/
Template.NewExpense.events({
	'change .btn-file:file':function(){
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
	},
	'change input[type="file"]':function(e, label){


	    var currentTarget = $(e.currentTarget);
	    $('#display-path').val(currentTarget.val());
	},
	'click #submit-expense':function(e){
		var currentUser = Meteor.userId();

		var currentTarget = $(e.currentTarget);
		var datepicker = $('#datepicker').val();
		var method = $('#method').val();
		var amount = Number($('#expense-amount').val());
		var type = $('#type').val();
		var comments = $('#comments').val();
		var displayPath = $('#display-path').val();

		var data = {
			createdAt: new Date(),
			createdBy: currentUser,
			date: datepicker,
			method: method,
			amount: amount,
			type: type,
			comments: comments,
			fileName: displayPath
		}


		Meteor.call('newExpense', data, function(){
			console.log('Logged Expense Successfully');
		});


	},
	'click .cancel-expense':function(e){
		e.preventDefault();
	}
});

/*****************************************************************************/
/* NewExpense: Helpers */
/*****************************************************************************/
Template.NewExpense.helpers({
});

/*****************************************************************************/
/* NewExpense: Lifecycle Hooks */
/*****************************************************************************/
Template.NewExpense.onCreated(function () {
});

Template.NewExpense.onRendered(function () {
	$('.input-group.date').datepicker({
	    autoclose: true
	});

	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        
	        reader.onload = function (e) {
	            $('#img-upload').attr('src', e.target.result);
	        }
	        
	        reader.readAsDataURL(input.files[0]);
	    }
	}
	$("#imgInp").change(function(){
		    readURL(this);
		});
});

Template.NewExpense.onDestroyed(function () {
});
