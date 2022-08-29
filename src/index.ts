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
}

export type PluginFunction = (api: PluginAPI) => Promise<void>;

export interface Plugin {
  name: string;
  plugin: PluginFunction;
  exports?: any;
  default?: Plugin;
}

export type RPCStreamHandler = (
  stream: AsyncIterable<Uint8Array>
) => Promise<RPCResponse>;
