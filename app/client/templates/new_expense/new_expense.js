/*****************************************************************************/
/* NewExpense: Event Handlers */
/*****************************************************************************/
Template.NewExpense.events({
  'blur input':function(e){
    var currentTarget = $(e.currentTarget);
    var inputValue = currentTarget.val();
    console.log(inputValue.length);
    if (inputValue.length === 0){
      currentTarget.addClass('warning');
    } else {
      currentTarget.removeClass('warning');
    }
    
  },
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
  		if (dataURI){
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
            fileName: displayPath,
            img: dataURI
          }

  		} else {
  			var data = {
  					createdAt: new Date(),
  					expenseDate: new Date(datepicker.replace(/\//g, '-')),
  					createdBy: currentUser,
  					date: datepicker,
  					method: method,
  					amount: amount,
  					type: type,
  					comments: comments,
  					fileName: displayPath,
  					img: ''
  				}
  		}
      Meteor.call('newExpense', data, function(){
        console.log('Logged Expense Successfully');
      });
    } else {
      //$('#datepicker, #method, #expense-amount, #type').css('border-color', 'red');
      alert('Fill out all required fields before submitting')
    }
		



		

	},
	'click .cancel-expense':function(e){
		e.preventDefault();
	}
});

/*****************************************************************************/
/* NewExpense: Helpers */
/*****************************************************************************/
Template.NewExpense.helpers({
	files:function(){
	 	return S3.collection.find();
	 }
});

/*****************************************************************************/
/* NewExpense: Lifecycle Hooks */
/*****************************************************************************/
Template.NewExpense.onCreated(function () {
	this.currentUpload = new ReactiveVar(false);
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

var knox, bound, client, Request, cfdomain, Collections = {};

if (Meteor.isServer) {
  // Fix CloudFront certificate issue
  // Read: https://github.com/chilts/awssum/issues/164
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  knox    = Npm.require('knox');
  Request = Npm.require('request');
  bound = Meteor.bindEnvironment(function(callback) {
    return callback();
  });
  cfdomain = 'https://d29ukrd5zr1j8t.cloudfront.net'; // <-- Change to your Cloud Front Domain
  client = knox.createClient({
    key: 'xxx',
    secret: 'yyy',
    bucket: 'zzz',
    region: 'jjj'
  });
}

Collections.files = new FilesCollection({
  debug: false, // Change to `true` for debugging
  throttle: false,
  storagePath: 'assets/app/uploads/uploadedFiles',
  collectionName: 'uploadedFiles',
  allowClientCode: false,
  onAfterUpload: function(fileRef) {
    // In onAfterUpload callback we will move file to AWS:S3
    var self = this;
    _.each(fileRef.versions, function(vRef, version) {
      // We use Random.id() instead of real file's _id 
      // to secure files from reverse engineering
      // As after viewing this code it will be easy
      // to get access to unlisted and protected files
      var filePath = "files/" + (Random.id()) + "-" + version + "." + fileRef.extension;
      client.putFile(vRef.path, filePath, function(error, res) {
        bound(function() {
          var upd;
          if (error) {
            console.error(error);
          } else {
            upd = {
              $set: {}
            };
            upd['$set']["versions." + version + ".meta.pipeFrom"] = cfdomain + '/' + filePath;
            upd['$set']["versions." + version + ".meta.pipePath"] = filePath;
            self.collection.update({
              _id: fileRef._id
            }, upd, function(error) {
              if (error) {
                console.error(error);
              } else {
                // Unlink original files from FS
                // after successful upload to AWS:S3
                self.unlink(self.collection.findOne(fileRef._id), version);
              }
            });
          }
        });
      });
    });
  },
  interceptDownload: function(http, fileRef, version) {
    var path, ref, ref1, ref2;
    path = (ref = fileRef.versions) != null ? (ref1 = ref[version]) != null ? (ref2 = ref1.meta) != null ? ref2.pipeFrom : void 0 : void 0 : void 0;
    if (path) {
      // If file is moved to S3
      // We will pipe request to S3
      // So, original link will stay always secure
      Request({
        url: path,
        headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
      }).pipe(http.response);
      return true;
    } else {
      // While file is not yet uploaded to S3
      // We will serve file from FS
      return false;
    }
  }
});

if (Meteor.isServer) {
  // Intercept File's collection remove method
  // to remove file from S3
  var _origRemove = Collections.files.remove;

  Collections.files.remove = function(search) {
    var cursor = this.collection.find(search);
    cursor.forEach(function(fileRef) {
      _.each(fileRef.versions, function(vRef) {
        var ref;
        if (vRef != null ? (ref = vRef.meta) != null ? ref.pipePath : void 0 : void 0) {
          client.deleteFile(vRef.meta.pipePath, function(error) {
            bound(function() {
              if (error) {
                console.error(error);
              }
            });
          });
        }
      });
    });
    // Call original method
    _origRemove.call(this, search);
  };
}