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
  GetPagesPopularResponse,
  PostPageContentsParams, 
  PostPageContentsResponse,
  DeletePageParams,
  DeletePageResponse,
  PostPageAllowedParams,
  PostPageAllowedResponse,
  PostCopyPageParams,
  PostCopyPageResponse,
  DeletePageFileNameParams,
  HeadPageFileNameParams,
  PutPageFileNameParams,
  PutPageFileNameResponse,
  DeletePageFileNameDescriptionParams,
  DeletePageFileNameDescriptionResponse,
  PutPageFileNameDescriptionParams,
  PutPageFileNameDescriptionResponse,
  PutPageFileNamePropertiesKeyParams,
  PutPageFileNamePropertiesKeyResponse,
  PutPageImportParams,
  PutPageMoveParams,
  PutPageMoveResponse,
  PutPageOrderParams,
  PostPagePropertiesParams,
  PostPagePropertiesResponse,
  PutPagePropertiesParams,
  PutPagePropertiesResponse,
  DeletePagePropertiesKeyParams,
  PutPagePropertiesKeyParams,
  PutPagePropertiesKeyResponse,
  PostPageRatingsParams,
  PostPageRevertParams,
  DeletePageSecurityParams,
  PostPageSecurityParams,
  PostPageSecurityResponse,
  PutPageSecurityParams,
  PutPageSecurityResponse,
  PutPageTagsParams,
  PutPageTagsResponse
} from "../types";
import { getTld } from "../utils";
import Auth from "./auth";
import Requests from "./requests";
import { Buffer } from 'buffer';
import type { Readable } from 'stream';

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
  
  public async postPageContents(
    id: string | number,
    funcArgs: BaseArgs,
    content?: string, 
    reqArgs?: PostPageContentsParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.post<PostPageContentsResponse>(
      `/pages/${pageId}/contents`,
      content ?? "", 
      {
        headers: {
          "Content-Type": "text/plain",
        },
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  public async putPageUnorder(
    id: string | number,
    funcArgs: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.put(
      `/pages/${pageId}/unorder`,
      ""
    );
  
    return res.data;
  }

  public async delPageDelete(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: DeletePageParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.del<DeletePageResponse>(
      `/pages/${pageId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async delPageAllowed(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PostPageAllowedParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.del<PostPageAllowedResponse>(
      `/pages/${pageId}/allowed`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async postPageCopied(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PostCopyPageParams
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.post<PostCopyPageResponse>(
      `/pages/${pageId}/copy`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async postPageExport(
    id: string | number,
    funcArgs: BaseArgs
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.post(
      `/pages/${pageId}/export`,
      "",
    );
  
    return res.data;
  }

  public async delPageFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: DeletePageFileNameParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.del(
      `/pages/${pageId}/files/${filenameId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async headPageFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: HeadPageFileNameParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.head(
      `/pages/${pageId}/files/${filenameId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async putPageFileName(
    id: string | number,
    filename: string,
    file: Buffer | NodeJS.ReadableStream, 
    funcArgs: BaseArgs,
    reqArgs?: PutPageFileNameParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPageFileNameResponse>(
      `/pages/${pageId}/files/${filenameId}`,
      file,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        params: {
          ...reqArgs,
        },
      }
    );
    return res.data;
  }

  
  public async delPageFileNameDescription(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: DeletePageFileNameDescriptionParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.del<DeletePageFileNameDescriptionResponse>(
      `/pages/${pageId}/files/${filenameId}/description`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async putPageFileNameDescription(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs,
    reqArgs?: PutPageFileNameDescriptionParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.put<PutPageFileNameDescriptionResponse>(
      `/pages/${pageId}/files/${filenameId}/description`,
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async putPageFileNamePropertiesKey(
    id: string | number,
    filename: string,
    key: string,
    funcArgs: BaseArgs,
    reqArgs?: PutPageFileNamePropertiesKeyParams
  ){
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);
  
    const res = await requests.put<PutPageFileNamePropertiesKeyResponse>(
      `/pages/${pageId}/files/${filenameId}/properties/${keyId}`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );
  
    return res.data;
  }

  public async putPageImport(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PutPageImportParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put(
      `/pages/${pageId}/import`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageMove(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PutPageMoveParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPageMoveResponse>(
      `/pages/${pageId}/move`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageOrder(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PutPageOrderParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put(
      `/pages/${pageId}/order`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async postPageProperties(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PostPagePropertiesParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.post<PostPagePropertiesResponse>(
      `/pages/${pageId}/properties`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageProperties(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PutPagePropertiesParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPagePropertiesResponse>(
      `/pages/${pageId}/properties`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async deletePagePropertiesKey(
    id: string | number,
    key: string,
    funcArgs: BaseArgs,
    reqArgs?: DeletePagePropertiesKeyParams
  ){
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.del(
      `/pages/${pageId}/properties/${keyId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPagePropertiesKey(
    id: string | number,
    key: string,
    funcArgs: BaseArgs,
    reqArgs?: PutPagePropertiesKeyParams
  ){
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPagePropertiesKeyResponse>(
      `/pages/${pageId}/properties/${keyId}`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async postPageRatings(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PostPageRatingsParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.post(
      `/pages/${pageId}/ratings`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async postPageRevert(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: PostPageRevertParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.post(
      `/pages/${pageId}/revert`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async deletePageSecurity(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: DeletePageSecurityParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.del(
      `/pages/${pageId}/security`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async postPageSecurity(
    id: string | number,
    funcArgs: BaseArgs,
    content?: string,
    reqArgs?: PostPageSecurityParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.post<PostPageSecurityResponse>(
      `/pages/${pageId}/security`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageSecurity(
    id: string | number,
    funcArgs: BaseArgs,
    content?: string,
    reqArgs?: PutPageSecurityParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPageSecurityResponse>(
      `/pages/${pageId}/security`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageTags(
    id: string | number,
    funcArgs: BaseArgs,
    content?: string,
    reqArgs?: PutPageTagsParams
  ){
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.put<PutPageTagsResponse>(
      `/pages/${pageId}/tags`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }
}
