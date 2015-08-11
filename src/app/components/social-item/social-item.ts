/// <reference path="../../../typings/_custom.d.ts" />
import {Component, View} from 'angular2/annotations';
import {Post} from '../../services/PostService';

let styles = require('./social-item.scss');
let template = require('./social-item.jade')();
let component = {selector: 'social-item', properties: ['post']};
let view = {
  directives: [],
  styles: [styles], template: template
};

@Component(component)
@View(view)
export class SocialItem {
  post:Post;

  constructor () {

  }
}
