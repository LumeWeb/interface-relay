import type { Ed25519Keypair, Err } from "libskynet";
import { OverwriteDataFn, ReadDataFn } from "./index.js";

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
  cert?: Uint8Array;
  key?: Uint8Array;
}

export interface SavedSslData {
  cert?: IndependentFileSmall;
  key?: IndependentFileSmall;
}
