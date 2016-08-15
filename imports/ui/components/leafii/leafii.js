import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import loadingBar from 'angular-loading-bar';
import ngFileUpload from 'ng-file-upload';

import template from "./leafii.html"

// COMPONENTS
import { name as About } from '../about/about';
import { name as Feedback } from '../feedback/feedback';
import { name as Footer } from '../footer/footer';
import { name as Forgot } from '../forgot/forgot';
import { name as Header } from '../header/header';
import { name as Landing } from '../landing/landing';
import { name as Potato } from '../potato/potato';
import { name as Profile } from '../profile/profile';
import { name as Reset } from '../reset/reset';
import { name as Search } from '../search/search';
import { name as Signin } from '../signin/signin';
import { name as Signup } from '../signup/signup';
import { name as Term } from '../term/term';
import { name as Verify } from '../verify/verify';
import { name as Welcome } from '../welcome/welcome';


class Leafii{
	constructor($scope, $reactive, $state){
    'ngInject';
    	$reactive(this).attach($scope);
    	 $scope.$on('$viewContentLoaded', function(){
    	 	//window.prerenderReady = true;
  		});
  	}
}

const name = "leafii";

export default angular.module(name,[
	angularMeteor,
	'angular-meteor.auth',
	ngAnimate,
	uiRouter,
	loadingBar,
	ngMaterial,
	ngFileUpload,
	About,
	Potato,
	Feedback,
	Footer,
	Forgot,
	Header,
	Landing,
	Profile,
	Reset,
	Search,
	Signin,
	Signup,
	Welcome,
	Term,
	Verify,
	Welcome
])
.component(name, {
	template,
	controllerAs: name,
	controller: Leafii
})
.config(config);

function config($locationProvider, $urlRouterProvider) {
	'ngInject';
	$locationProvider.html5Mode({'enabled': true, 'requireBase': false});
	$urlRouterProvider.otherwise('/');
}
