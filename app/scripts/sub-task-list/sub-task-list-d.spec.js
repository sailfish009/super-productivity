'use strict';

describe('Directive: subTaskList', function() {

    // load the directive's module
    beforeEach(module('superProductivity'));
    beforeEach(module('templates'));

    var element,
        scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function($compile) {
        element = $compile('<sub-task-list></sub-task-list>')(scope);
        scope.$digest();
        expect(true).toBe(true);
    }));
});