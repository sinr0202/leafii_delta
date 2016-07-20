import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './team.html';

class Team {

	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);
	}
}

const name = 'team';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs: name,
	controller: Team
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('team', {
      url: '/team',
      template: '<team></team>'
    });
}