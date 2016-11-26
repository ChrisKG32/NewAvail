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
  'editGame':function(data, existingGame){

    var gameId = existingGame && existingGame._id;
    data._id = gameId;

    Games.update({_id: gameId}, {$set: 
        {
            edge: data.edge,
            name: data.name,
            speed: data.speed,
            variance: data.variance,
            variant: data.variant
        }

    });

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
  'editSession':function(data, sessionCol, editData){
        delete data.createdAt;
        delete data.createdBy;
        delete data._id;

        var colId = editData._id;
        if (sessionCol && !sessionCol.edits){
            sessionCol.edits = [];
        } 
        sessionCol.edits.push(editData);
        data.edits = sessionCol.edits;

        Sessions.update({_id: colId}, {$set: data});
  },
  'newExpense':function(data){

    Expenses.insert(data);
  },
  'editExpense':function(data2, selectedExpense, editData){
        

        delete data2.createdAt;
        delete data2.createdBy;
        delete data2._id;

        var colId = editData._id;
        if (selectedExpense && !selectedExpense.edits){
            selectedExpense.edits = [];
        } 
        selectedExpense.edits.push(editData);
        data2.edits = selectedExpense.edits;

        Expenses.update({_id: colId}, {$set: data2});

  },
  'createAccount':function(data){
    Accounts.createUser({
        username: data.username,
        password: data.password          
    });
  },
  'newInvestment':function(data){

    Investments.insert(data);

  },
  'editInvestment':function(data, existingInvestment, editData){

    var investId = existingInvestment && existingInvestment._id;
    if (existingInvestment && existingInvestment.edits){
        existingInvestment.edits.push(editData);
    } else {
        existingInvestment.edits = [];
        existingInvestment.edits.push(editData);
    }

    Investments.update({_id: investId}, {$set: 
        {
            amount: data.amount,
            userId: data.userId,
            valid: data.valid,
            edits: existingInvestment.edits

        }

    });
  },
  'passChange':function(data){
/*
    if (data.password1 === data.password2) {

        if (data.confirmPassword1 === data.confirmPassword2) {

            var oldPassword = data.password2;
            var newPassword = data.confirmPassword2;

            console.log(oldPassword);
            console.log(newPassword);

            
            
            

        } else {
            console.log('Passwords do not match');
        }

    } else {
        console.log('Passwords do not match');
    }*/


  }
  




});
