/*****************************************************************************/
/* DealerSessions: Event Handlers */
/*****************************************************************************/
Template.DealerSessions.events({
});

/*****************************************************************************/
/* DealerSessions: Helpers */
/*****************************************************************************/
Template.DealerSessions.helpers({
	settings:function(){
		console.log(this._id);
		var thisDealer = Dealers.findOne({_id: this._id});

		return {

			collection: Sessions.find({dealer: (thisDealer.name).toLowerCase()}),
			rowsPerPage: 10,
			showFilter: false,
			fields: [
				{
					key: 'createdAt',
					label: 'Date',
					headerClass:function(){
						return 'text-center col-xs-3'
					},
					cellClass:function(){
						return 'text-center col-xs-3'
					},
					fn: function(value){
						return moment(value).format('M/D/YY');
					}
				},
				{
					key: 'game',
					label: 'Game',
					sortable: false,
					headerClass:function(){
						return 'text-center col-xs-5'
					},
					cellClass:function(){
						return 'text-center col-xs-5'
					},
					fn: function(value){
						var game = Games.findOne(value);
						return game.variant + ' ' + game.name 
					}
				},
				{
					key: 'completedAt',
					label: 'Duration',
					sortable: false,
					headerClass:function(){
						return 'text-center col-xs-3'
					},
					cellClass:function(){
						return 'text-center col-xs-3'
					},
					fn:function(value, object){
						var duration = object.completedAt - object.createdAt;
						duration = duration / 3600000;
						return duration.toFixed(1) + ' hrs'
					}
				}
			]
		}
	}
});

/*****************************************************************************/
/* DealerSessions: Lifecycle Hooks */
/*****************************************************************************/
Template.DealerSessions.onCreated(function () {
});

Template.DealerSessions.onRendered(function () {
});

Template.DealerSessions.onDestroyed(function () {
});
