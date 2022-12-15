import Config from "@lumeweb/cfg";
import tls from "tls";
import { Logger } from "loglevel";
import { RPCMethod, RPCServer } from "./rpc.js";
import { IndependentFileSmall, SavedSslData, SslData } from "./files.js";
import type { express } from "express";
// @ts-ignore
import type { Err } from "libskynet";

export type PluginFunction = (api: PluginAPI) => Promise<void>;

export type DnsProvider = (ipAddress: string, domain: string) => Promise<void>;

export type OverwriteDataFn = (newData: Uint8Array) => Promise<Err>;

export type ReadDataFn = () => Promise<[Uint8Array, Err]>;

export interface Plugin {
  name: string;
  plugin: PluginFunction;
  exports?: any;
  default?: Plugin;
}

export interface PluginAPI {
  config: Config;
  registerMethod: (methodName: string, method: RPCMethod) => void;
  loadPlugin: (moduleName: string) => Promise<Plugin>;
  getRpcServer: () => RPCServer;
  ssl: {
    setContext: (context: tls.SecureContext) => void;
    getContext: () => tls.SecureContext;
    getSaved: (retry: boolean) => Promise<boolean | SavedSslData>;
    set: (
      cert: IndependentFileSmall | Uint8Array,
      key: IndependentFileSmall | Uint8Array
    ) => void;
    get: () => SslData;
    save: () => Promise<void>;
    setCheck(checker: () => Promise<void>): void;
  };
  appRouter: {
    get: () => express.Router;
    set: (newRouter: express.Router) => void;
    reset: () => void;
  };
  files: {
    createIndependentFileSmall(
      seed: Uint8Array,
      userInode: string,
      fileData: Uint8Array
    ): Promise<[IndependentFileSmall, Err]>;
    openIndependentFileSmall(
      seed: Uint8Array,
      userInode: string
    ): Promise<[IndependentFileSmall, Err]>;
    overwriteIndependentFileSmall(
      file: IndependentFileSmall,
      newData: Uint8Array
    ): Promise<Err>;
  };
  dns: {
    setProvider(provider: DnsProvider): void;
  };
  logger: Logger;
  getSeed: () => Uint8Array;
}
