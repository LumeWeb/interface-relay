import type { EventEmitter2 } from "eventemitter2";
import type { RPCMethod, RPCServer } from "./rpc.js";
import type { Logger } from "pino";
import type SSLManager from "./ssl.js";
import type { HDKey } from "micro-ed25519-hdkey";
import type Config from "@lumeweb/cfg";
import type { ProtocolManager } from "./swarm.js";
import type { Util } from "./util.js";

export type PluginFunction = (api: PluginAPI) => Promise<void>;

export interface Plugin {
  name: string;
  plugin: PluginFunction;
  exports?: any;
  default?: Plugin;
}

export declare class PluginAPI extends EventEmitter2 {
  constructor({
    config,
    logger,
    server,
    swarm,
  }: {
    config: Config;
    logger: Logger;
    server: RPCServer;
    swarm: any;
  });
  get util(): Util;
  get swarm(): any;
  get config(): Config;
  get pluginConfig(): Config;
  get logger(): Logger;
  get rpcServer(): RPCServer;
  get seed(): Uint8Array;
  get identity(): HDKey;
  get ssl(): SSLManager;
  get protocols(): ProtocolManager;
  loadPlugin(moduleName: string): (moduleName: string) => Promise<Plugin>;
  registerMethod(methodName: string, method: RPCMethod): void;
}
