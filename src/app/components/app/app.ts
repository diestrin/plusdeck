/// <reference path="../../../typings/_custom.d.ts" />
import {Component, View} from 'angular2/annotations';
import {NgFor} from 'angular2/angular2';
import {NgZone} from 'angular2/src/core/zone/ng_zone';
import * as Rx from 'rx';
import {FeedColumn} from '../feed-column/feed-column';
import {FeedService, Feed} from '../../services/FeedService';
import {AccountService} from '../../services/AccountService';
import {appPipes} from '../../pipes/pipes';

let styles = require('./app.scss');
let template = require('./app.jade')();
let component = {selector: 'app', viewInjector: [appPipes]};
let view = {
  directives: [FeedColumn, NgFor],
  styles: [styles], template: template
 };

@Component(component)
@View(view)
export class App {
  feeds:Array<Feed>;

  constructor (private feedService:FeedService, private Account:AccountService,
    private zone:NgZone) {
    this.feeds = feedService.get();
  }

  addAccount($event) {
    $event.preventDefault();

    this.Account.add()
    .subscribe((account) => {
      this.feedService.addInitial(account);
    }, (error) => console.log(error));
  }
}
