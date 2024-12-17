import {
  BaseArgs,
  ExpertGlobalOptions,
  GetPageContentsParams,
  GetPageContentsResponse,
  GetPageParams,
  GetPageResponse,
  GetPageSecurityParams,
  GetPageSecurityResponse,
  GetPageSubPagesParams,
  GetPageSubPagesResponse,
  GetPageDiffParams,
  GetPageDiffResponse,
  GetPageFilesParams,
  GetPageFilesResponse,
  GetPageExplainParams,
  GetPageExplainResponse,
  GetPageInfoParams,
  GetPageInfoResponse,
  GetPageFileInfoParams,
  GetPageFileInfoResponse,
  GetPageFileRevisionsParams,
  GetPageFileRevisionsResponse,
  GetPageContentsExplainParams,
  GetPageContentsExplainResponse,
  GetPagePropertiesParams,
  GetPagePropertiesResponse,
} from "../types";
import { getTld } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Pages {
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
    return `=${encodeURIComponent(id)}`;
  }

  private parseFileName(name: string) {
    return `=${encodeURIComponent(name)}`;
  }

  public async getPage(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageResponse>(`/pages/${pageId}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageContents(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageContentsParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageContentsResponse>(
      `/pages/${pageId}/contents`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageSubPages(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageSubPagesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageSubPagesResponse>(
      `/pages/${pageId}/subpages`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageSecurity(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageSecurityParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageSecurityResponse>(
      `/pages/${pageId}/security`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageDiff(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageDiffParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageDiffResponse>(
      `/pages/${pageId}/diff`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageFiles(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFilesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFilesResponse>(
      `/pages/${pageId}/files`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageExplain(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageExplainParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageExplainResponse>(
      `/pages/${pageId}/explain`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageInfo(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageInfoParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageInfoResponse>(
      `/pages/${pageId}/info`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageFileInfo(
    id: string | number,
    fileName: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileInfoParams
  ) {
    const pageId = this.parsePageId(id);
    const fileNameId = this.parseFileName(fileName);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFileInfoResponse>(
      `/pages/${pageId}/files/${fileNameId}/info`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageFileRevisions(
    id: string | number,
    fileName: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileRevisionsParams
  ) {
    const pageId = this.parsePageId(id);
    const fileNameId = this.parseFileName(fileName);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFileRevisionsResponse>(
      `/pages/${pageId}/files/${fileNameId}/revisions`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageContentsExplain(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageContentsExplainParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageContentsExplainResponse>(
      `/pages/${pageId}/contents/explain`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async getPageContentsProperties(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePropertiesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPagePropertiesResponse>(
      `/pages/${pageId}/properties`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }
}
