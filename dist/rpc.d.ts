/// <reference types="node" />
/// <reference types="node" />
import type EventEmitter from "events";
export interface RPCRequest {
  module: string;
  method: string;
  data: any;
}
export interface ClientRPCRequest extends RPCRequest {
  bypassCache?: boolean;
}
export interface RPCResponse {
  updated?: number;
  data?: any | RPCResponse;
  error?: string;
  signature?: string;
  signedField?: string;
}
export interface RPCMethod {
  cacheable: boolean;
  handler: (req: any) => Promise<any>;
}
export interface RPCCacheData {
  [query: string]: RPCCacheItem | null;
}
export interface RPCCacheItem extends RPCResponse {
  value: RPCResponse;
  signature: string;
}
export interface RPCClearCacheRequest {
  request: string;
  relays?: string[];
}
export declare type RPCClearCacheResponseRelayList = {
  [relay: string]: RPCClearCacheResponse;
};
export interface RPCClearCacheResponse extends RPCResponse {
  relays?: RPCClearCacheResponseRelayList;
}
export interface RPCBroadcastRequest {
  request: RPCRequest;
  relays: string[];
}
export interface RPCBroadcastResponse extends RPCResponse {
  relays: {
    [relay: string]: RPCResponse;
  };
}
export declare class RPCServer extends EventEmitter {
  get cache(): RPCCache;
  registerMethod(
    moduleName: string,
    methodName: string,
    options: RPCMethod
  ): void;
  getMethods(): string[];
  setup(stream: any): any;
  signData(data: any): string;
  static hashQuery(query: RPCRequest): string;
}
export declare class RPCCache extends EventEmitter {
  get data(): RPCCacheData;
  constructor(server: RPCServer);
  getNodeQuery(node: string, queryHash: string): Promise<boolean | RPCResponse>;
  signResponse(item: RPCCacheItem): any;
  verifyResponse(pubkey: Buffer, item: RPCCacheItem): boolean | Buffer;
  addItem(query: RPCRequest, response: RPCResponse): void;
  deleteItem(queryHash: string): boolean;
}
//# sourceMappingURL=rpc.d.ts.map
