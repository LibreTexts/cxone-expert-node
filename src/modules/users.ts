import {
    BaseArgs,
    ExpertGlobalOptions,
    GetUsersParams,
    GetUsersResponse,
    GetUserParams,
    GetUserResponse,
    GetUserMetricsParams,
    GetUserMetricsResponse,
    GetUserPropertiesParams,
    GetUserPropertiesResponse,
    GetUserPropertiesKeyParams,
    GetUserPropertiesKeyResponse,
    GetUserPropertiesKeyInfoParams,
    GetUserPropertiesKeyInfoResponse,
    GetUserSearchParams,
    GetUserSearchResponse
  } from "../types";
import { getTld } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Users {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
  }

  private parseUserId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    return `=${encodeURIComponent(encodeURIComponent(id))}`;
  }

  private parseKey(key: string) {
    return encodeURIComponent(encodeURIComponent(key));
  }

  public async getUsers(
    funcArgs: BaseArgs,
    reqArgs?: GetUsersParams
  ) {
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUsersResponse>(`/users`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUser(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetUserParams
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserResponse>(`/users/${userId}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserMetrics(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetUserMetricsParams
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserMetricsResponse>(`/users/${userId}/metrics`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserProperties(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetUserPropertiesParams
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserPropertiesResponse>(`/users/${userId}/properties`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserPropertiesKey(
    id: string | number,
    identifier: string,
    funcArgs: BaseArgs,
    reqArgs?: GetUserPropertiesKeyParams
  ) {
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserPropertiesKeyResponse>(`/users/${userId}/properties/${key}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserPropertiesKeyInfo(
    id: string | number,
    identifier: string,
    funcArgs: BaseArgs,
    reqArgs?: GetUserPropertiesKeyInfoParams
  ) {
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserPropertiesKeyInfoResponse>(`/users/${userId}/properties/${key}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUsersSearch(
    funcArgs: BaseArgs,
    reqArgs?: GetUserSearchParams
  ) {
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetUserSearchResponse>(`/users/search`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }
}
