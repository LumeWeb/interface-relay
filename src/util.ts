import type b4a from "b4a";
import type c from "compact-encoding";
export declare class Util {
  private _crypto;
  get crypto(): Crypto;
  get bufferEncoding(): typeof b4a;
  get binaryEncoding(): typeof c;
}

export declare class Crypto {
  createHash(data: string): Buffer;
}
