import type tls from "tls";

export type SSLManagerRenewHandler = (domain: string) => Promise<boolean>;
declare class SSLManager {
  private _context?;
  private _key?;
  private _cert?;
  private _domain;
  private _renewHandler?;
  constructor(domain: string);
  get context(): tls.SecureContext;
  set privateKey(key: Buffer);
  set cert(cert: Buffer);
  private _maybeUpdateContext;
  renew(): Promise<boolean>;
  get enabled(): any;
}
export default SSLManager;
