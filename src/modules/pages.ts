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
import { getTld, getAuth } from "../utils";
import Auth from "./auth";
import Requests from "./requests";
import { Buffer } from 'buffer';

export default class Pages {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
  }

  /**
   * Converts a page identifier (number or string) into the format expected by the API.
   * If the identifier is a number, it's simply converted to a string and returned as-is.
   * If it's a page path, it's double URL-encoded and prefixed with '=' to indicate it's a path.
   * @param id - The page identifier, which can be a number (page ID), or a page path.
   * @returns A string formatted for use in API endpoints, either as a page ID or a double URL-encoded page path.
   */
  private parsePageId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    if (id === "home") {
      return id;
    }
    return `=${encodeURIComponent(encodeURIComponent(id))}`;
  }

  /**
   * Double URL-encodes a filename and prefixes it with '=' to indicate it's a filename in the API.
   * @param name - The filename to be formatted for API use.
   */
  private parseFileName(name: string) {
    return `=${encodeURIComponent(encodeURIComponent(name))}`;
  }

  /**
   * Double URL-encodes a property key for use in API endpoints.
   * @param name - The property key to be formatted for API use.
   */
  private parseKey(name: string) {
    return `${encodeURIComponent(encodeURIComponent(name))}`;
  }

  public async getPages(
    reqArgs?: GetPagesParams,
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPagesResponse>(`/pages`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPage(
    idOrPath: string | number,
    reqArgs?: GetPageParams,
    funcArgs?: BaseArgs
  ) {
    const id = this.parsePageId(idOrPath);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageResponse>(`/pages/${id}`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageContents(
    id: string | number,
    reqArgs?: GetPageContentsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageContentsResponse>(`/pages/${pageId}/contents`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageContentsExplain(
    id: string | number,
    reqArgs?: GetPageContentsExplainParams,
    funcArgs?: BaseArgs,
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageContentsExplainResponse>(`/pages/${pageId}/contents/explain`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageDiff(
    id: string | number,
    reqArgs?: GetPageDiffParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageDiffResponse>(`/pages/${pageId}/diff`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageExplain(
    id: string | number,
    reqArgs?: GetPageExplainParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageExportTokenParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageExportTokenFilenameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageFilesSubPagesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageFilesSubPagesResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageFiles(
    id: string | number,
    reqArgs?: GetPageFilesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageFileParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageFileDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageFileInfoParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageFileRevisionsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageFileRevisionsResponse>(`/pages/${pageId}/files/${filenameId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageFind(
    id: string | number,
    reqArgs?: GetPageFindParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageFindResponse>(`/pages/${pageId}/find`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageInfo(
    id: string | number,
    reqArgs?: GetPageInfoParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageInfoResponse>(`/pages/${pageId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageLinks(
    id: string | number,
    reqArgs?: GetPageLinksParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageLinksResponse>(`/pages/${pageId}/links`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPagePDF(
    id: string | number,
    reqArgs?: GetPagePdfParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPagePdfFilenameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPagePropertiesKeyInfoParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPagePropertiesKeyInfoResponse>(`/pages/${pageId}/properties/${keyId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageRatings(
    id: string | number,
    reqArgs?: GetPageRatingsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageRatingsResponse>(`/pages/${pageId}/ratings`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageRevisions(
    id: string | number,
    reqArgs?: GetPageRevisionsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageRevisionsResponse>(`/pages/${pageId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageSubpages(
    id: string | number,
    reqArgs?: GetPageSubPagesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageSubPagesResponse>(`/pages/${pageId}/subpages`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageTags(
    id: string | number,
    reqArgs?: GetPageTagsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageTagsResponse>(`/pages/${pageId}/tags`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageTree(
    id: string | number,
    reqArgs?: GetPageTreeParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPageTreeResponse>(`/pages/${pageId}/tree`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async getPageBook(
    id: string | number,
    reqArgs?: GetPageBookParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPageBookFilenameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get(`/pages/book/${filename}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getPagesCsv(
    reqArgs?: GetPagesCsvParams,
    funcArgs?: BaseArgs
  ) {
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: GetPagesPopularParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetPagesPopularResponse>(`/pages/popular`, {
      params: {
        ...reqArgs,
      },
    });
    return res.data;
  }

  public async postPageContents(
    id: string | number,
    content?: string,
    reqArgs?: PostPageContentsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.put(
      `/pages/${pageId}/unorder`,
      ""
    );

    return res.data;
  }

  public async delPageDelete(
    id: string | number,
    reqArgs?: DeletePageParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PostPageAllowedParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PostCopyPageParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.post(
      `/pages/${pageId}/export`,
      "",
    );

    return res.data;
  }

  public async delPageFileName(
    id: string | number,
    filename: string,
    reqArgs?: DeletePageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: HeadPageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: DeletePageFileNameDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageFileNameDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageFileNamePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageImportParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageMoveParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPageOrderParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    propertyName: string,
    propertyValue: string,
    reqArgs?: PostPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.post<PostPagePropertiesResponse>(
      `/pages/${pageId}/properties`,
      propertyValue,
      {
        headers: {
          Slug: propertyName,
        },
        params: {
          ...reqArgs,
        },
      }
    );

    return res.data;
  }

  public async putPageProperties(
    id: string | number,
    propertyName: string,
    propertyValue: string,
    reqArgs?: PutPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.put<PutPagePropertiesResponse>(
      `/pages/${pageId}/properties`,
      propertyValue,
      {
        headers: {
          Slug: propertyName,
        },
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
    reqArgs?: DeletePagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PutPagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PostPageRatingsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: PostPageRevertParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    reqArgs?: DeletePageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    content?: string,
    reqArgs?: PostPageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    content?: string,
    reqArgs?: PutPageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
    content?: string,
    reqArgs?: PutPageTagsParams,
    funcArgs?: BaseArgs
  ) {
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = new Requests(tld, auth);

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
