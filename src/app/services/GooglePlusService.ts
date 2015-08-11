/// <reference path="../../typings/_custom.d.ts" />
import {bind, Injectable} from 'angular2/di';
import {Http} from 'angular2/http';
import * as Rx from 'rx';
import {Feed} from './FeedService';

@Injectable()
export class GooglePlus {
  clientId:string = '659348902137-uuamqjqloj1p102kklbme5v8po1o1ni5.apps.googleusercontent.com';

  constructor(private http:Http) {
    gapi.load('auth2', _ => {
      this.plus = gapi.client.load('plus', 'v1');
      this.api = gapi.auth2.init({
        client_id: this.clientId
      });
    });
  }

  authenticate() {
    let options = new gapi.auth2.SigninOptionsBuilder();
    options
      .setScope('profile')
      .setScope('email');

    return Rx.Observable.fromPromise(this.api.signIn(options))
    .map((data:any) => {
      let profile = data.getBasicProfile();

      return {
        id: profile.getId(),
        user: profile.getEmail(),
        userName: profile.getName(),
        profilePicture: profile.getImageUrl()
      };
    });
  }

  getStream(feed:Feed) {
    return Rx.Observable.fromPromise(this[feed.method](feed.params));
  }

  plusActivitiesList(params) {
    return this.plus.then(_ => {
      return gapi.client.plus.activities.list(params);
    })
    .then(data => {
      return data.result
    });;
  }
}

export var googlePlusInjectables: Array<any> = [
  bind(GooglePlus).toClass(GooglePlus)
];
