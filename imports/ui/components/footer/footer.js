import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './footer.html';

class Footer {

	constructor($scope, $reactive){
	    'ngInject';
	    $reactive(this).attach($scope);
	}
}

const name = 'footer';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs: name,
	controller: Footer
});
