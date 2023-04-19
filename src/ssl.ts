import type tls from "tls";

export type SSLManagerRenewHandler = (domain: string) => Promise<boolean>;
export type SSLCert = string | Buffer | Array<string | Buffer>;

declare class SSLManager {
  constructor(domain: string);

  get context(): tls.SecureContext;

  set privateKey(key: Buffer);

  set cert(cert: SSLCert);

  renew(): Promise<boolean>;

  get enabled(): boolean;

  get ready(): boolean;

  get renewHandler(): SSLManagerRenewHandler;
  set renewHandler(value: SSLManagerRenewHandler);
}

export default SSLManager;
