/// <reference types="node" />
/// <reference types="node" />
import type EventEmitter from "events";
import type NodeCache from "node-cache";
import type DHTCache from "@lumeweb/dht-cache";
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
export interface RPCBroadcastRequest {
  request: RPCRequest;
  relays: string[];
  timeout: number;
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
  handleRequest(request: RPCRequest): Promise<RPCResponse>;
}
export declare class RPCCache extends EventEmitter {
  get data(): NodeCache;
  get dhtCache(): DHTCache;
  constructor(server: RPCServer);
  signResponse(item: RPCCacheItem): any;
  verifyResponse(pubkey: Buffer, item: RPCCacheItem): boolean | Buffer;
  addItem(query: RPCRequest, response: RPCResponse): void;
  deleteItem(queryHash: string): boolean;
}
//# sourceMappingURL=rpc.d.ts.map
