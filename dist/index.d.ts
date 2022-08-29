import type { JSONSchemaType } from "ajv";
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
    handler: (request: RPCRequest, sendStream: (stream: AsyncIterable<Uint8Array>) => void) => Promise<RPCResponse | null>;
}
export declare const RPC_REQUEST_SCHEMA: JSONSchemaType<RPCRequest>;
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
export declare type PluginFunction = (api: PluginAPI) => Promise<void>;
export interface Plugin {
    name: string;
    plugin: PluginFunction;
    exports?: any;
    default?: Plugin;
}
export declare type RPCStreamHandler = (stream: AsyncIterable<Uint8Array>) => Promise<RPCResponse>;
//# sourceMappingURL=index.d.ts.map