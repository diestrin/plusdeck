/// <reference path="../../src/typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';
import {App} from './app';

@Component({selector: 'test-cmp'})
@View({directives: [App]})
class TestComponent {}

describe('App', () => {
  var app;

  beforeEach(() => {
    app = new App();
  });

  it('should work', () => {
    expect(app).toBeDefined();
  });

});

