/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

Meteor.methods({
  'lib\method_name': function () {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    // server method logic
  },
  'addGame': function (data) {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    Games.insert(data);
    // server method logic
  },
  'startSession': function (data) {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    Sessions.insert(data);
    // server method logic
  },
  'endSession': function (data) {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    var currentUser = Meteor.userId();
    var completedAt = data.completedAt;
    var currentSession = Sessions.findOne({$and: [{createdAt: {$exists: true}}, {completedAt: {$exists: false}}, {createdBy: currentUser}] })
    var sessionId = currentSession && currentSession._id;
    Sessions.update({_id: sessionId}, {$set: {completedAt: completedAt}});

    var currentSession = Sessions.findOne({_id: sessionId});
    return currentSession
    // server method logic
  },
  'cancelSession': function (currentSession) {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    var sessionId = currentSession && currentSession._id;
    Sessions.remove(sessionId);
    // server method logic
  },
  'sessionDetails': function (data) {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    var game = Games.findOne({$and: [{name: data.name}, {variant: data.variant}]});
    var gameId = game && game._id;
    Sessions.update({_id: data._id}, {$set: 
                        {
                            bought: data.bought, 
                            colored: data.colored, 
                            denomination: data.denomination, 
                            game: gameId
                        }
                    });
    // server method logic
  },
  'newExpense':function(data){

    Expenses.insert(data);
  },
  'createAccount':function(data){



    Accounts.createUser({
        username: data.username,
        password: data.password          
    }, function(error){

        if(error){
            console.log(error.reason);
        } else {
            Router.go('home');
        }
    });


  }
});
