/// <reference path="../../../typings/_custom.d.ts" />
import {Component, View, onInit} from 'angular2/annotations';
import {NgFor} from 'angular2/angular2';
import {SocialItem} from '../social-item/social-item';
import {Feed} from '../../services/FeedService';
import {AccountService} from '../../services/AccountService';
import {Post} from '../../services/PostService';

let styles = require('./feed-column.scss');
let template = require('./feed-column.jade')();
let component = {
  selector: 'feed-column',
  properties: ['feed: feed'],
  lifecycle: [onInit]
};
let view = {
  directives: [SocialItem, NgFor],
  styles: [styles], template: template
};

@Component(component)
@View(view)
export class FeedColumn {
  feed:Feed;

  constructor(private Account:AccountService) {

  }

  onInit() {
    this.feed.fetch();
  }

  addAccount($event) {
    $event.preventDefault();
    this.Account.add();
  }
}
