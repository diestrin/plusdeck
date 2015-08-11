declare module "guid" {
  export interface IGuid {
    equals(guid:IGuid|string):boolean;
    value:string;
  }

  export function raw():string;
  export function create():IGuid;
  export function isGuid(guid:IGuid):boolean;
  export var EMPTY:string;
}
