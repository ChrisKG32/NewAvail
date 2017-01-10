Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 10 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "availbucket",
  acl: "public-read",
  authorize: function () {
    // let userFileCount = Files.find( { "userId": this.userId } ).count();
    //return userFileCount < 3 ? true : false;
    return true
  },
  key: function ( file ) {
   // var user = Meteor.users.findOne( this.userId );
    return ("images/" + file.name)//user.emails[0].address + "/" + file.name;
  }
});