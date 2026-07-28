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
import BaseModule from "./base";

export default class Site extends BaseModule {
  constructor(globals: ExpertGlobalOptions) {
    super(globals, "site");
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
    this.debug('getSiteActivity called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteActivityResponse>(`/site/activity`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getSiteActivity completed successfully');
    return res.data;
  }

  public async getSiteExportGroups(
    funcArgs?: BaseArgs
  ) {
    this.debug('getSiteExportGroups called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteExportGroupsResponse>(`/site/export/groups`);
    this.debug('getSiteExportGroups completed successfully');
    return res.data;
  }

  public async getSiteExportUsers(
    funcArgs?: BaseArgs
  ) {
    this.debug('getSiteExportUsers called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteExportUsersResponse>(`/site/export/users`);
    this.debug('getSiteExportUsers completed successfully');
    return res.data;
  }

  public async getSiteSubPagesTags(
    id: string | number,
    reqArgs?: GetSiteSubPagesTagsParams,
    funcArgs?: BaseArgs
  ){
    this.debug('getSiteSubPagesTags called for:', id);
    const pageId = this.parsePageId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteSubPagesTagsResponse>(
        `/site/nav/${pageId}/children`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('getSiteSubPagesTags completed successfully');
    return res.data;
  }

  public async getSiteFullNavTreeTags(
    id: string | number,
    reqArgs?: GetSiteFullNavTreeTagsParams,
    funcArgs?: BaseArgs
  ){
    this.debug('getSiteFullNavTreeTags called for:', id);
    const pageId = this.parsePageId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<string>(
        `/site/nav/${pageId}/full`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('getSiteFullNavTreeTags completed successfully');
    return res.data;
  }

  public async getSiteOperations(
    reqArgs?: GetSiteOperationsParams,
    funcArgs?: BaseArgs
  ){
    this.debug('getSiteOperations called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<string>(
        `/site/operations`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('getSiteOperations completed successfully');
    return res.data;
  }

  public async getSiteProperties(
    reqArgs?: GetSitePropertiesParams,
    funcArgs?: BaseArgs
  ){
    this.debug('getSiteProperties called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSitePropertiesResponse>(
        `/site/properties`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('getSiteProperties completed successfully');
    return res.data;
  }

  public async GetSiteKeyProperties(
    identifier: string,
    reqArgs?: GetSiteKeyPropertiesParams,
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteKeyProperties called for:', identifier);
    const key = this.parseKey(identifier);
    const requests = this.prepare(funcArgs);

    const res = await requests.get(
        `/site/properties/${key}`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('GetSiteKeyProperties completed successfully');
    return res.data;
  }

  public async GetSiteKeyPropertiesInfo(
    identifier: string,
    reqArgs?: GetSiteKeyPropertiesInfoParams,
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteKeyPropertiesInfo called for:', identifier);
    const key = this.parseKey(identifier);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteKeyPropertiesInfoResponse>(
        `/site/properties/${key}/info`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('GetSiteKeyPropertiesInfo completed successfully');
    return res.data;
  }

  public async GetSiteQuery(
    reqArgs?: GetSiteQueryParams,
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteQuery called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteQueryResponse>(
        `/site/query`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('GetSiteQuery completed successfully');
    return res.data;
  }

  public async GetSiteStatus(
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteStatus called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteStatusResponse>(
        `/site/status`
    );
    this.debug('GetSiteStatus completed successfully');
    return res.data;
  }

  public async GetSiteTags(
    reqArgs?: GetSiteTagsParams,
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteTags called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteTagsResponse>(
        `/site/tags`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('GetSiteTags completed successfully');
    return res.data;
  }

  public async GetSiteTag(
    reqArgs?: GetSiteTagParams,
    funcArgs?: BaseArgs
  ){
    this.debug('GetSiteTag called');
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetSiteTagResponse>(
        `/site/tag`,
        {
            params: {
                ...reqArgs,
            },
        }
    );
    this.debug('GetSiteTag completed successfully');
    return res.data;
  }

}
