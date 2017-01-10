let template;
let _getFileFromInput = (event) => event.target.files[0];
//let _setPlaceholderText = (string = 'Click or Drag a file here to upload') => {
//	template.find('.alert span').innerText = string;
//}

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, "warning" );
      //_setPlaceholderText();
    } else {
      Bert.alert( "File uploaded to Amazon S3!", "success" );
      //_setPlaceholderText();
    }

    return url
  });
};


let _uploadFileToAmazon = (file) => {
	const uploader = new Slingshot.Upload('uploadToAmazonS3');

	uploader.send(file, (error, url) => {
		if (error){
			Bert.alert(error.message, "warning");
			//_setPlaceholderText();
		} else {
			//Bert.alert( "Image upload successfully.", "success" );
			_addUrlToDatabase(url);
			Session.set('fileUploaded', url);
			console.log(url);
		}
	});
};

let dataURItoBlob = function(dataURI) {
	var byteString, i, ia, mimeString;
	byteString = void 0;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1]);
	} else {
		byteString = unescape(dataURI.split(',')[1]);
	}
	mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	ia = new Uint8Array(byteString.length);
	i = 0;
	while (i < byteString.length) {
		ia[i] = byteString.charCodeAt(i);
		i++;
	}
	return new Blob([ia], {
		type: mimeString
	});
}

let blobToFile = function (theBlob, fileName){
	//A Blob() is almost a File() - it's just missing the two properties below which we will add
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}

let upload = (image) => {

	var blob = dataURItoBlob(image);

	let file = blobToFile(blob, Random.id() + '.jpg');

	
	/*
	template = options.template;
	let file = _getFileFromInput(options.event);

	//_setPlaceholderText('Uploading ' + file.name + '...');
	*/
	_uploadFileToAmazon(file);
	
};

Modules.client.uploadToAmazonS3 = upload;