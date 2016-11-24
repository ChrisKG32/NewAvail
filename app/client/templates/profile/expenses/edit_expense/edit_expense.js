/*****************************************************************************/
/* EditExpense: Event Handlers */
/*****************************************************************************/
Template.EditExpense.events({
	'click input[type="file"]':function(e){
	    e.preventDefault();
	    if (Meteor.isCordova){
	      MeteorCameraUI.getPicture({
	        quality: 75
	      },function(e, data){
	        $('#img-upload').attr('src', data);
	        //$('#display-path').val();
	        dataURI = data;

	      });
	    }
  	},
	'change .btn-file:file':function(){
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
	},
	'change input[type="file"]':function(e, label){


	    var currentTarget = $(e.currentTarget);
	    $('#display-path').val(currentTarget.val());
	    var files = $('input#imgInp')[0].files;
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
		var imgURL = '';

	    if (datepicker && method && amount && type) {
	  		
	        /*
	  			//var files = $('input#imgInp')[0].files;
	  			S3.upload({
	  				files: fd,
	  				path: '/'
	  			}, function(e, r){
	  				console.log(r);

	  			});
	        */
	        var data = {
	            createdAt: new Date(),
	            expenseDate: new Date(datepicker.replace(/\//g, '-')),
	            createdBy: currentUser,
	            date: datepicker,
	            method: method,
	            amount: amount,
	            type: type,
	            comments: comments,
	            fileName: displayPath
	          }

	        if (typeof dataURI === 'undefined'){
	        	data.img = '';
	  		} else {
	  			data.img = dataURI;
	  		}

	  		var expenseId = $('#expense-amount').attr('expense-id');
	  		var selectedExpense = Expenses.findOne(expenseId);
	  		var data2 = data;
	  		data2._id = expenseId;
	  		data2.createdAt = selectedExpense.createdAt;
	  		data2.expenseDate = new Date(datepicker.replace(/\//g, '-'));
	  		
	  		if (selectedExpense && selectedExpense.edits){
	  			data2.edits = selectedExpense.edits;
	  		}

	  		var noChanges = _.isEqual(selectedExpense, data2);

	  		if (noChanges){
	  			alert('No changes detected');
	  			$('input, select').attr('disabled', 'disabled');
	  		} else if (!noChanges){
	  			var editData = selectedExpense;
	  			editData.editedBy = currentUser;
	  			editData.editedAt = new Date();
	  			selectedExpense = Expenses.findOne(expenseId);
	  			
	  			Meteor.call('editExpense', data2, selectedExpense, editData, function(){
	  				console.log('successful');
	  				$('input, select').attr('disabled', 'disabled');
	  			});
	  			


	  		}
	  		/*
		    Meteor.call('newExpense', data, function(){
		    	console.log('Logged Expense Successfully');
		    });
		    */
	    } else {
	      //$('#datepicker, #method, #expense-amount, #type').css('border-color', 'red');
	      alert('Fill out all required fields before submitting')
	    }
	}
});

/*****************************************************************************/
/* EditExpense: Helpers */
/*****************************************************************************/
Template.EditExpense.helpers({
	
});

/*****************************************************************************/
/* EditExpense: Lifecycle Hooks */
/*****************************************************************************/
Template.EditExpense.onCreated(function () {
});

Template.EditExpense.onRendered(function () {
	$('.input-group.date').datepicker({
		clearBtn: true,
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	});

	setTimeout(function(){
		var methodValue = $('#method').attr('hidden-value');
		var typeValue = $('#type').attr('hidden-value');
		$('#method').val(methodValue);
		$('#type').val(typeValue);
	},500)
});

Template.EditExpense.onDestroyed(function () {
});
