import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';
 
import { Meteor } from 'meteor/meteor';
 
import template from './uploader.html';
import { upload } from '../../../api/images';

class ImageUploader {
	constructor($scope, $reactive, $rootScope) {
		'ngInject';

		$reactive(this).attach($scope);
		this.rootScope = $rootScope;
		this.editing = false;

		this.uploaded = [];
	}

	addImages(files) {

		if (files.length) {
			this.currentFile = files[0];

			this.editing = true;
			this.rootScope.$broadcast('editImg');

			const reader = new FileReader;

			reader.onload = this.$bindToContext((e) => {
				this.cropImgSrc = e.target.result;
				this.myCroppedImage = '';
			});
			reader.readAsDataURL(files[0]);
		} else {
			this.cropImgSrc = undefined;
		}
	}


	save() {

		upload(this.myCroppedImage, this.currentFile.name, this.$bindToContext((file) => {
				secureUrl = 'https://' + file.url.replace(/https:|http:|\/\//gi, "");
				secureUrl = secureUrl.replace(/:3000/gi, "");
				Meteor.users.update(Meteor.userId(), {$set: {"profile.image": secureUrl}}, false, false);
				Meteor.call('saveThumb', file._id);
				this.uploaded.push(file);
				this.reset();
				this.rootScope.$broadcast('editDone');
				this.editing = false;
				Bert.alert('Image successfully uploaded', 'success', 'growl-top-right');
			}), (err) => {
				Bert.alert('Image failed to upload', 'danger', 'growl-top-right');
			}
		);
	}

	reset() {
		this.cropImgSrc = undefined;
		this.myCroppedImage = '';
		this.rootScope.$broadcast('editDone');
		this.editing = false;
	}
}
 
const name = 'imageUploader';
 
// create a module
export default angular.module(name, [
	angularMeteor,
	ngFileUpload,
	'ngImgCrop'
]).component(name, {
	template,
	controllerAs: name,
	controller: ImageUploader
});