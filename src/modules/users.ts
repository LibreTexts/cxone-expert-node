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
import { getTld, getAuth } from "../utils";
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
    reqArgs?: GetUsersParams,
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetUsersResponse>(`/users`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUser(
    id: string | number,
    reqArgs?: GetUserParams,
    funcArgs?: BaseArgs
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetUserResponse>(`/users/${userId}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserMetrics(
    id: string | number,
    reqArgs?: GetUserMetricsParams,
    funcArgs?: BaseArgs
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetUserMetricsResponse>(`/users/${userId}/metrics`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUserProperties(
    id: string | number,
    reqArgs?: GetUserPropertiesParams,
    funcArgs?: BaseArgs
  ) {
    const userId = this.parseUserId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetUserPropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetUserPropertiesKeyInfoParams,
    funcArgs?: BaseArgs
  ) {
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetUserPropertiesKeyInfoResponse>(`/users/${userId}/properties/${key}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getUsersSearch(
    reqArgs?: GetUserSearchParams,
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetUserSearchResponse>(`/users/search`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }
}
