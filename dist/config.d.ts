/// <reference types="node" />
import type arg from "arg";
declare class Config {
  private module;
  private data;
  constructor(module: string);
  inject(options: object): void;
  load(): void;
  openDir(dir: string): void;
  open(file: string): void;
  save(file: string, data: object): void;
  set(key: string, value: any): void;
  has(key: string): any;
  private normalize;
  get(key: string, fallback?: any): any;
  typeOf(
    key: string
  ):
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
    | "null";
  str(key: string, fallback?: any): any;
  int(key: any, fallback?: any): any;
  uint(key: any, fallback?: any): any;
  float(key: any, fallback?: any): any;
  ufloat(key: any, fallback?: any): any;
  fixed(key: any, exp: any, fallback?: any): any;
  ufixed(key: any, exp: any, fallback?: any): any;
  bool(key: any, fallback?: any): any;
  buf(key: string, fallback?: any, enc?: BufferEncoding): any;
  array(key: string, fallback?: any): any;
  obj(key: string, fallback?: any): any;
  func(key: string, fallback?: any): any;
  mb(key: string, fallback?: any): any;
  parseArg(args: arg.Result<any>): void;
  parseEnv(env?: object): void;
}
export default Config;
//# sourceMappingURL=config.d.ts.map
