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

export type RPCClearCacheResponseRelayList = {
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
  relays: { [relay: string]: RPCResponse };
}

export declare class RPCServer extends EventEmitter {
  get cache(): RPCCache;
  registerMethod(
    moduleName: string,
    methodName: string,
    options: RPCMethod
  ): void;
  public getMethods(): string[];
  public setup(stream: any): any;
  public signData(data: any): string;
  public static hashQuery(query: RPCRequest): string;
}
export declare class RPCCache extends EventEmitter {
  get data(): RPCCacheData;
  constructor(server: RPCServer);
  public getNodeQuery(
    node: string,
    queryHash: string
  ): Promise<boolean | RPCResponse>;
  public signResponse(item: RPCCacheItem): any;
  public verifyResponse(pubkey: Buffer, item: RPCCacheItem): boolean | Buffer;
  public addItem(query: RPCRequest, response: RPCResponse): void;
  public deleteItem(queryHash: string): boolean;
}
