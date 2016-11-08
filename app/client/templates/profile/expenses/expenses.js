/*****************************************************************************/
/* Expenses: Event Handlers */
/*****************************************************************************/
Template.Expenses.events({
	'click .sorting':function(e, tmpl){
		var sortSpan = $('.sorting i');
		if (sortSpan.hasClass('recent')){
			sortSpan.removeClass('recent').removeClass('fa-caret-down')
				.addClass('fa-caret-up').addClass('past');
				tmpl.sorting.set('past');
		} else {
			sortSpan.removeClass('past').removeClass('fa-caret-up')
				.addClass('fa-caret-down').addClass('recent');
				tmpl.sorting.set(false);
		}

	},
	'click .table-content tr':function(e, tmpl){
		tmpl.editExpense.set(this);
	},
	'click #cancel-edit':function(e, tmpl){
		tmpl.editExpense.set(false);
	}
});

/*****************************************************************************/
/* Expenses: Helpers */
/*****************************************************************************/
Template.Expenses.helpers({
	userExpenses:function(){
		var selectedDate = Template.instance().selectedDate.get();
		var sorting = Template.instance().sorting.get();
		var currentUser = Meteor.userId();
		if (!sorting){
			var sortBy = -1;
		} else {
			var sortBy = 1;
		}
	
		if (selectedDate){
			var previousDay = new Date(selectedDate);
			var nextDay = new Date(selectedDate);
			
			previousDay.setDate(selectedDate.getDate()-1);
			nextDay.setDate(selectedDate.getDate()+1);
			var expenseList = Expenses.find({createdBy: currentUser, createdAt: {$gte:selectedDate, $lt: nextDay}},
												{sort: {createdAt: sortBy}}).fetch();
		} else {
			var expenseList = Expenses.find({createdBy: currentUser}, {sort: {createdAt: sortBy}}).fetch();
		}
		
		return expenseList
	},
	singleDay:function(){
		var selectedDate = Template.instance().selectedDate.get();
		if (selectedDate){
			var nextDay = new Date(selectedDate);
			nextDay.setDate(selectedDate.getDate()+1);
			var currentUser = Meteor.userId();
			var expenseList = Expenses.find(
				{createdBy: currentUser, createdAt: 
					{$gte:selectedDate, $lt: nextDay}
				}).fetch();
			if (expenseList && expenseList.length > 0) {
				var total = 0;
				_.each(expenseList, function(entry){
					total += (entry.amount);
				});
				return total
			} else {
				return false
			}

			
		} else {
			return false
		}
	},
	selectedExpense:function(){
		var editExpense = Template.instance().editExpense.get();
		if (editExpense){
			return editExpense
		} else {
			return false
		}
	}
});

/*****************************************************************************/
/* Expenses: Lifecycle Hooks */
/*****************************************************************************/
Template.Expenses.onCreated(function () {
	this.selectedDate = new ReactiveVar(false);
	this.sorting = new ReactiveVar(false);
	this.editExpense = new ReactiveVar(false);
});

Template.Expenses.onRendered(function () {
	var selfVariable = this;
	$('#exp-datepicker').datepicker({
		autoclose: true,
		toggleActive:true,
		todayHighlight: true
	}).on('changeDate', function(e, tmpl){
		var selectedDate = $('#exp-datepicker').datepicker('getFormattedDate');
		var unformattedDate = $('#exp-datepicker').datepicker('getDate');
		var currentDate = selfVariable.selectedDate.get();
		if (currentDate === unformattedDate){
			selfVariable.selectedDate.set(false);
		} else {
			selfVariable.selectedDate.set(unformattedDate);
		}
		
		$('#exp-datepicker').attr('data-date', selectedDate);
	})
});

Template.Expenses.onDestroyed(function () {
});