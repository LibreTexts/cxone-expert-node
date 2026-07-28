import { BaseArgs, ExpertGlobalOptions } from "../types";
import { getTld, getAuth, getHeaders, createDebugLogger } from "../utils";
import Requests from "./requests";
import type { Debugger } from "debug";

/**
 * Base class for every API domain module. Holds the shared globals and a
 * per-module debug logger, and centralizes HTTP client construction so the
 * TLD/auth/headers resolution lives in exactly one place.
 */
export default abstract class BaseModule {
  protected globals: ExpertGlobalOptions;
  protected debug: Debugger;

  constructor(globals: ExpertGlobalOptions, namespace: string) {
    this.globals = globals;
    this.debug = createDebugLogger(`cxone-expert-node:${namespace}`, globals.debug);
    this.debug(`${namespace} module initialized`);
  }

  /**
   * Resolves TLD, auth, and headers from globals (with optional per-call
   * overrides) and returns a configured Requests client. Single source of
   * truth for how every endpoint builds its HTTP client.
   * @param funcArgs - Optional per-call auth/tld/headers overrides.
   * @returns A configured Requests instance.
   */
  protected prepare(funcArgs?: BaseArgs): Requests {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const headers = getHeaders(this.globals, funcArgs?.headers);
    return new Requests(tld, auth, "json", this.globals.debug, headers);
  }
}
