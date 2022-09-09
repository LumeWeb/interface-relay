/// <reference types="node" />
import tls from "tls";
import type { Logger } from "loglevel";
import type { Ed25519Keypair, Err } from "libskynet";
import type express from "express";
export interface RPCRequest {
  bypassCache?: boolean;
  module: string;
  method: string;
  data: any;
}
export interface RPCResponse {
  updated?: number;
  data?: any;
  error?: string;
}
export interface RPCMethod {
  cacheable: boolean;
  handler: (
    request: RPCRequest,
    sendStream: (stream: AsyncIterable<Uint8Array>) => void
  ) => Promise<RPCResponse | null>;
}
export interface StreamFileResponse {
  data?: Uint8Array;
  done: boolean;
}
export interface PluginAPI {
  config: any;
  registerMethod: (methodName: string, method: RPCMethod) => void;
  loadPlugin: (moduleName: string) => Promise<Plugin>;
  getMethods: () => string[];
  ssl: {
    setContext: (context: tls.SecureContext) => void;
    getContext: () => tls.SecureContext;
    getSaved: (retry: boolean) => Promise<boolean | SslData>;
    set: (cert: IndependentFileSmall, key: IndependentFileSmall) => void;
    get: () => SslData;
    save: () => Promise<void>;
  };
  appRouter: {
    get: () => express.Router;
    set: (newRouter: express.Router) => void;
    reset: () => void;
  };
  logger: Logger;
}
export declare type PluginFunction = (api: PluginAPI) => Promise<void>;
export interface Plugin {
  name: string;
  plugin: PluginFunction;
  exports?: any;
  default?: Plugin;
}
export declare type RPCStreamHandler = (
  stream: AsyncIterable<Uint8Array>
) => Promise<RPCResponse>;
export declare type OverwriteDataFn = (newData: Uint8Array) => Promise<Err>;
export declare type ReadDataFn = () => Promise<[Uint8Array, Err]>;
export interface IndependentFileSmallMetadata {
  largestHistoricSize: bigint;
}
export interface IndependentFileSmall {
  dataKey: Uint8Array;
  fileData: Uint8Array;
  inode: string;
  keypair: Ed25519Keypair;
  metadata: IndependentFileSmallMetadata;
  revision: bigint;
  seed: Uint8Array;
  skylink: string;
  viewKey: string;
  overwriteData: OverwriteDataFn;
  readData: ReadDataFn;
}
export interface SslData {
  cert?: IndependentFileSmall;
  key?: IndependentFileSmall;
}
//# sourceMappingURL=index.d.ts.map
