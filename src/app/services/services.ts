/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/di';
import {feedInjectables} from './FeedService';
import {googlePlusInjectables} from './GooglePlusService';
import {accountInjectables} from './AccountService';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  feedInjectables,
  googlePlusInjectables,
  accountInjectables
];
