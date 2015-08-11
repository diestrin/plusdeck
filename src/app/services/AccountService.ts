/// <reference path="../../typings/_custom.d.ts" />
import {bind, Inject, Injectable} from 'angular2/di';
import {GooglePlus} from './GooglePlusService';

interface IAccount {
  id:string;
  user:string;
  userName:string;
  profilePicture:string;
}

export class Account implements IAccount {
  id:string;
  user:string;
  userName:string;
  profilePicture:string;

  constructor(account:IAccount) {
    this.id = account.id;
    this.user = account.user;
    this.userName = account.userName;
    this.profilePicture = account.profilePicture;
  }
}

@Injectable()
export class AccountService {
  private accounts:Array<Account>;

  constructor(private Plus:GooglePlus) {
    this.accounts = [];
  }

  get():Array<Account>;
  get(user?:string):Account;
  get(user?:string):any {
    return (user) ? this.accounts.find((account) => account.user === user) : this.accounts;
  }

  add() {
    return this.Plus.authenticate()
    .map((profile:IAccount) => {
      let account = new Account(profile);
      this.accounts.push(account);
      return account;
    });
  }
}

export var accountInjectables: Array<any> = [
  bind(AccountService).toClass(AccountService)
];
