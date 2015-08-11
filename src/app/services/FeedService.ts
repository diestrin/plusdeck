/// <reference path="../../typings/_custom.d.ts" />
import {bind, Inject, Injectable} from 'angular2/di';
import {NgZone} from 'angular2/src/core/zone/ng_zone';
import {Account, AccountService} from './AccountService';
import {IPost, Post} from './PostService';
import {GooglePlus} from './GooglePlusService';
import Guid = require('guid');
import * as Rx from 'rx';

export interface IFeed {
  id?:string;
  account:Account;
  label:string;
  method:string;
  params:Object;
  stream?:Array<Post>;
}

export class Feed implements IFeed {
  id:string;
  account:Account;
  label:string;
  method:string;
  params:Object;
  stream:Array<Post>;

  private lastResponse:any;

  constructor(feed:IFeed, private Plus:GooglePlus, private Zone:NgZone) {
    this.id = Guid.raw();
    this.account = feed.account;
    this.label = feed.label;
    this.method = feed.method;
    this.params = feed.params;
    this.stream = [];
  }

  fetch() {
    this.Plus.getStream(this)
    .subscribe((data:any) => {
      this.lastResponse = data;

      Rx.Observable.from(data.items)
      .map((item:any) => {
        let attachment = item.object.attachments[0];

        return new Post({
          id: item.id,
          displayName: item.actor.displayName,
          content: item.object.content,
          createdAt: new Date(item.published),
          profilePicture: item.actor.image.url,
          image: (attachment.image) ?
            attachment.image.url :
            ''
        })
      })
      .subscribe(item => {
        this.Zone.run(_ => this.stream.push(item));
      });
    });
  }
}

@Injectable()
export class FeedService {
  private feeds:Array<Feed>;

  constructor(private Account:AccountService, private Plus:GooglePlus, private Zone:NgZone) {
    this.feeds = [];
    // this.load();
  }

  get():Array<Feed>;
  get(id:string):Feed;
  get(id?:string):any {
    return (id) ? this.feeds.find((feed:Feed) => feed.id === id) : this.feeds;
  }

  add(feed:IFeed) {
    this.Zone.run(_ => {
      this.feeds.push(new Feed(feed, this.Plus, this.Zone));
    });

    this.save();
  }

  addInitial(account:Account):Feed {
    let feed = new Feed({
      account,
      label: 'Home',
      method: 'plusActivitiesList',
      params: {
        userId: 'me',
        collection: 'public'
      }
    }, this.Plus, this.Zone);

    this.Zone.run(_ => this.feeds.push(feed));
    this.save();
    return feed;
  }

  save() {
    localStorage.setItem('FeedServiceData', JSON.stringify(this.feeds,
      (name, item) => {
        if (name === 'Plus' || name === 'Zone' || name === 'stream') {
          return undefined;
        }
        return item;
      }));
  }

  load () {
    let oldData = JSON.parse(localStorage.getItem('FeedServiceData'));
    if (!oldData) return;

    oldData = oldData.map((item) => {return new Feed(item, this.Plus, this.Zone)});
    this.Zone.run(_ => this.feeds.push.apply(this.feeds, oldData));
  }
}

export var feedInjectables: Array<any> = [
  bind(FeedService).toClass(FeedService)
];
