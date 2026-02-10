import {
    BaseArgs,
    ExpertGlobalOptions,
    GetSiteActivityParams,
    GetSiteActivityResponse,
    GetSiteSubPagesTagsParams,
    GetSiteSubPagesTagsResponse,
    GetSiteExportGroupsResponse,
    GetSiteExportUsersResponse,
    GetSiteFullNavTreeTagsParams,
    GetSiteOperationsParams,
    GetSitePropertiesParams,
    GetSitePropertiesResponse,
    GetSiteKeyPropertiesParams,
    GetSiteKeyPropertiesInfoParams,
    GetSiteKeyPropertiesInfoResponse,
    GetSiteQueryParams,
    GetSiteQueryResponse,
    GetSiteStatusResponse,
    GetSiteTagsParams,
    GetSiteTagsResponse,
    GetSiteTagParams,
    GetSiteTagResponse
  } from "../types";
import { getTld, getAuth } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Site {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
  }

  private parsePageId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    return `=${encodeURIComponent(encodeURIComponent(id))}`;
  }

  private parseKey(key: string) {
    return encodeURIComponent(encodeURIComponent(key));
  }

  public async getSiteActivity(
    reqArgs?: GetSiteActivityParams,
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteActivityResponse>(`/site/activity`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getSiteExportGroups(
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteExportGroupsResponse>(`/site/export/groups`);
    return res.data;
  }

  public async getSiteExportUsers(
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteExportUsersResponse>(`/site/export/users`);
    return res.data;
  }

  public async getSiteSubPagesTags(
    id: string | number,
    reqArgs?: GetSiteSubPagesTagsParams,
    funcArgs?: BaseArgs
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteSubPagesTagsResponse>(
        `/site/nav/${pageId}/children`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async getSiteFullNavTreeTags(
    id: string | number,
    reqArgs?: GetSiteFullNavTreeTagsParams,
    funcArgs?: BaseArgs
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<string>(
        `/site/nav/${pageId}/full`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async getSiteOperations(
    reqArgs?: GetSiteOperationsParams,
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<string>(
        `/site/operations`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async getSiteProperties(
    reqArgs?: GetSitePropertiesParams,
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSitePropertiesResponse>(
        `/site/properties`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async GetSiteKeyProperties(
    identifier: string,
    reqArgs?: GetSiteKeyPropertiesParams,
    funcArgs?: BaseArgs
  ){
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get(
        `/site/properties/${key}`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async GetSiteKeyPropertiesInfo(
    identifier: string,
    reqArgs?: GetSiteKeyPropertiesInfoParams,
    funcArgs?: BaseArgs
  ){
    const key = this.parseKey(identifier);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteKeyPropertiesInfoResponse>(
        `/site/properties/${key}/info`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async GetSiteQuery(
    reqArgs?: GetSiteQueryParams,
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteQueryResponse>(
        `/site/query`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async GetSiteStatus(
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteStatusResponse>(
        `/site/status`
    );
    return res.data;
  }

  public async GetSiteTags(
    reqArgs?: GetSiteTagsParams,
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteTagsResponse>(
        `/site/tags`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

  public async GetSiteTag(
    reqArgs?: GetSiteTagParams,
    funcArgs?: BaseArgs
  ){
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetSiteTagResponse>(
        `/site/tag`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    return res.data;
  }

}
