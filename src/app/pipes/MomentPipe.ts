/// <reference path="../../typings/_custom.d.ts" />
import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/change_detection';
import moment = require('moment');

export function isDate(date):boolean {
  return date instanceof Date;
}

export class DatePipe implements Pipe {
  supports(date):boolean {
    return isDate(date);
  }

  transform(input:Date, args?:string[]):string {
    let method:string;
    let params:string[];

    [method, ...params] = args;
    let time = moment(input);

    return (method) ? time[method](...params) : time.format();
  }
}

export class DateFactory implements PipeFactory {

  supports(date):boolean {
    return isDate(date);
  }

  create(cdRef):Pipe {
    return new DatePipe();
  }
}

export var Moment = [ new DateFactory(), new NullPipeFactory() ];
