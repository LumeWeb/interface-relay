export type ProtocolHandler = (peer: any, muxer: any) => void;

export declare class ProtocolManager {
  constructor(swarm: any);
  register(name: string, handler: ProtocolHandler): boolean;
}
