import {
  BaseArgs,
  ExpertGlobalOptions,
  GetPagesParams,
  GetPagesResponse,
  GetPageParams,
  GetPageResponse,
  GetPageContentsParams,
  GetPageContentsResponse,
  GetPageContentsExplainParams,
  GetPageContentsExplainResponse,
  GetPageDiffParams,
  GetPageDiffResponse,
  GetPageExplainParams,
  GetPageExplainResponse,
  GetPageExportTokenParams,
  GetPageExportTokenFilenameParams,
  GetPageFilesSubPagesParams,
  GetPageFilesSubPagesResponse,
  GetPageFilesParams,
  GetPageFilesResponse,
  GetPageFileParams,
  GetPageFileDescriptionParams,
  GetPageFileInfoParams,
  GetPageFileInfoResponse,
  GetPageFileRevisionsParams,
  GetPageFileRevisionsResponse,
  GetPageFindParams,
  GetPageFindResponse,
  GetPageInfoParams,
  GetPageInfoResponse,
  GetPageLinksParams,
  GetPageLinksResponse,
  GetPagePdfParams,
  GetPagePdfFilenameParams,
  GetPagePropertiesParams,
  GetPagePropertiesResponse,
  GetPagePropertiesKeyParams,
  GetPagePropertiesKeyInfoParams,
  GetPagePropertiesKeyInfoResponse,
  GetPageRatingsParams,
  GetPageRatingsResponse,
  GetPageRevisionsParams,
  GetPageRevisionsResponse,
  GetPageSubPagesParams,
  GetPageSubPagesResponse,
  GetPageTagsParams,
  GetPageTagsResponse,
  GetPageTreeParams,
  GetPageTreeResponse,
  GetPageBookParams,
  GetPageBookFilenameParams,
  GetPagesCsvParams,
  GetPagesPopularParams,
  GetPagesPopularResponse
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
    if (id === "home") {
      return id;
    }
    return `=${encodeURIComponent(encodeURIComponent(id))}`;
  }

  private parseFileName(name: string) {
    return `=${encodeURIComponent(encodeURIComponent(name))}`;
  }
  private parseKey(name: string) {
    return `${encodeURIComponent(encodeURIComponent(name))}`;
  }

  public async getPages(
    funcArgs: BaseArgs,
    reqArgs?: GetPagesParams
  ) {
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPagesResponse>(`/pages`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
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

    const res = await requests.get<GetPageContentsResponse>(`/pages/${pageId}/contents`, {
      params: {
        ...reqArgs,
      },
    });
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

    const res = await requests.get<GetPageContentsExplainResponse>(`/pages/${pageId}/contents/explain`, {
      params: {
        ...reqArgs,
      },
    });
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

    const res = await requests.get<GetPageDiffResponse>(`/pages/${pageId}/diff`, {
      params: {
        ...reqArgs,
      },
    });
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

    const res = await requests.get<GetPageExplainResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageExportToken(
    id: string | number,
    token: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageExportTokenParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/export/${token}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageExportTokenFilename(
    id: string | number,
    token: string,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageExportTokenFilenameParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/export/${token}/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageFilesSubpages(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFilesSubPagesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFilesSubPagesResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
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

    const res = await requests.get<GetPageFilesResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageFile(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/files/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageFileDescription(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileDescriptionParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/files/${filenameId}/description`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageFileInfo(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileInfoParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFileInfoResponse>(`/pages/${pageId}/files/${filenameId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageFileRevisions(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFileRevisionsParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFileRevisionsResponse>(`/pages/${pageId}/files/${filenameId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageFind(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageFindParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageFindResponse>(`/pages/${pageId}/find`, {
      params: {
        ...reqArgs,
      },
    });
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

    const res = await requests.get<GetPageInfoResponse>(`/pages/${pageId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }
  
  public async getPageLinks(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageLinksParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageLinksResponse>(`/pages/${pageId}/links`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPagePDF(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePdfParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/pdf`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }
  
  public async getPagePDFFilename(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePdfFilenameParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/${pageId}/pdf/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageProperties(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePropertiesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPagePropertiesResponse>(`/pages/${pageId}/properties`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPagePropertiesKey(
    id: string | number,
    key: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePropertiesKeyParams
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<string>(`/pages/${pageId}/properties/${keyId}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPagePropertiesKeyInfo(
    id: string | number,
    key: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPagePropertiesKeyInfoParams
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPagePropertiesKeyInfoResponse>(`/pages/${pageId}/properties/${keyId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageRatings(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageRatingsParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageRatingsResponse>(`/pages/${pageId}/ratings`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageRevisions(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageRevisionsParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageRevisionsResponse>(`/pages/${pageId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageSubpages(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageSubPagesParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageSubPagesResponse>(`/pages/${pageId}/subpages`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageTags(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageTagsParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageTagsResponse>(`/pages/${pageId}/tags`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageTree(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageTreeParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPageTreeResponse>(`/pages/${pageId}/tree`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageBook(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPageBookParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/book`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPageBookFilename(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: GetPageBookFilenameParams
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/book/${filename}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPagesCsv(
    funcArgs: BaseArgs,
    reqArgs?: GetPagesCsvParams
  ) {
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get(`/pages/csv`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPagesPopular(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetPagesPopularParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetPagesPopularResponse>(`/pages/popular`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }
  
}
