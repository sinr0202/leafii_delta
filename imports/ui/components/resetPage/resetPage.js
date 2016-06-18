import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './resetPage.html';

class resetPage {

  constructor($scope, $reactive, $state, $timeout){
    'ngInject';

    $reactive(this).attach($scope);
    this.state = $state;
    this.wait = false;
    this.timeout = $timeout;
  }

  forgotPass(email){

    this.wait = true;

    Accounts.forgotPassword({email: email}, function(error){

      if(error){
        Bert.alert(error.reason, 'danger');
        this.timeout(function(){this.wait = false;}.bind(this), 1300);
      }
      else {
        Bert.alert('Email Sent! Please check your email to reset password', 'success');
        this.wait = false;
        this.email = '';
      }

    }.bind(this));
  }
}

const name = 'resetpage';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
]).component(name, {
  template,
  controllerAs: name,
  controller: resetPage
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('resetpage', {
      url: '/reset-password',
      template: '<resetpage></resetpage>'
    });
}