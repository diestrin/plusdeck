/// <reference path="../../typings/_custom.d.ts" />
import {bind, Inject, Injectable} from 'angular2/di';
import Guid = require('guid');

export interface IPost {
  id:string;
  displayName:string;
  content:any;
  createdAt:Date;
  image?:string;
  profilePicture:string;
}

export class Post implements IPost {
  id:string;
  displayName:string;
  content:any;
  createdAt:Date;
  image:string;
  profilePicture:string;

  constructor (post:IPost) {
    this.id = post.id;
    this.displayName = post.displayName;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.image = post.image;
    this.profilePicture = post.profilePicture;
  }
}
