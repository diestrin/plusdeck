interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
  observe(target: any, callback: Function, acceptList?: Array<any>): void;
}

interface Array<T> {
  find(predicate: (T) => boolean) : T;
  findIndex(predicate: (T) => boolean) : number;
}

interface Element {
  shadowRoot:any;
}

declare var gapi:any;
