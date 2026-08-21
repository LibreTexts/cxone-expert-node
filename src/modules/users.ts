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
import BaseModule from "./base";

export default class Users extends BaseModule {
  constructor(globals: ExpertGlobalOptions) {
    super(globals, "users");
  }

  public async getUsers(
    reqArgs?: GetUsersParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUsers called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUsersResponse>(`/users`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUsers completed successfully');
    return res.data;
  }

  public async getUser(
    id: string | number,
    reqArgs?: GetUserParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUser called for:', id);
    const userId = this.parseUserId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserResponse>(`/users/${userId}`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUser completed successfully');
    return res.data;
  }

  public async getUserMetrics(
    id: string | number,
    reqArgs?: GetUserMetricsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUserMetrics called for:', id);
    const userId = this.parseUserId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserMetricsResponse>(`/users/${userId}/metrics`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUserMetrics completed successfully');
    return res.data;
  }

  public async getUserProperties(
    id: string | number,
    reqArgs?: GetUserPropertiesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUserProperties called for:', id);
    const userId = this.parseUserId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserPropertiesResponse>(`/users/${userId}/properties`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUserProperties completed successfully');
    return res.data;
  }

  public async getUserPropertiesKey(
    id: string | number,
    identifier: string,
    reqArgs?: GetUserPropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUserPropertiesKey called for:', id, identifier);
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserPropertiesKeyResponse>(`/users/${userId}/properties/${key}`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUserPropertiesKey completed successfully');
    return res.data;
  }

  public async getUserPropertiesKeyInfo(
    id: string | number,
    identifier: string,
    reqArgs?: GetUserPropertiesKeyInfoParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUserPropertiesKeyInfo called for:', id, identifier);
    const userId = this.parseUserId(id);
    const key = this.parseKey(identifier);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserPropertiesKeyInfoResponse>(`/users/${userId}/properties/${key}/info`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUserPropertiesKeyInfo completed successfully');
    return res.data;
  }

  public async getUsersSearch(
    reqArgs?: GetUserSearchParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getUsersSearch called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetUserSearchResponse>(`/users/search`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getUsersSearch completed successfully');
    return res.data;
  }
}
