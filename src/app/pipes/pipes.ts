/// <reference path="../../typings/_custom.d.ts" />
import {bind} from 'angular2/di';
import {PipeRegistry, Pipes, defaultPipes} from 'angular2/change_detection';
import {Moment} from './MomentPipe';

export var appPipes = [
  Pipes.append({
    moment: Moment
  })
];
