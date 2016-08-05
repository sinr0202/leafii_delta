'use strict';

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base'; 
import template from './signin.html';

class Signin {
	constructor($scope, $reactive, $state, $rootScope, $timeout){
		'ngInject';

		$reactive(this).attach($scope);
		this.state = $state;
		this.rootScope = $rootScope;
		this.wait = false;
		this.timeout = $timeout;
		this.rootScope.$broadcast('disableSearch');
	}

	login(email, pass){

		this.wait = true;

		Meteor.loginWithPassword(email, pass, function(error){
			if (error){
				Bert.alert(error.reason, 'danger', 'growl-top-right');
				this.timeout(function(){this.wait = false;}.bind(this), 1300);
			}
			else {
				this.boot();
				this.wait = false;
				this.state.go('profile');
			}
			
		}.bind(this));
	}

	boot(){
		if(this.rootScope.currentUser){this.state.go('profile');}
	}
}

const name = 'signin';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template,
	controllerAs: name,
	controller: Signin
}).config(config);
 
function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('signin', {
			url: '/signin',
			template: '<signin></signin>'
		});
}
//window.prerenderReady = true;