import {
  AuthObject,
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
import { getTld, getAuth, createDebugLogger } from "../utils";
import Auth from "./auth";
import Requests from "./requests";
import { Buffer } from 'buffer';
import type { Debugger } from 'debug';

export default class Pages {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;
  private debug: Debugger;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
    this.debug = createDebugLogger('cxone-expert-node:pages', args.debug);
    this.debug('Pages module initialized');
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

  /**
   * Creates a Requests instance with the current global settings including debug state.
   * @param tld - The top-level domain
   * @param auth - The authentication object
   * @returns A configured Requests instance
   */
  private createRequests(tld?: string, auth?: AuthObject) {
    return new Requests(tld, auth, 'json', this.globals.debug);
  }

  public async getPages(
    reqArgs?: GetPagesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPages called');
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPagesResponse>(`/pages`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPages completed successfully');
    return res.data;
  }

  public async getPage(
    idOrPath: string | number,
    reqArgs?: GetPageParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPage called for:', idOrPath);
    const id = this.parsePageId(idOrPath);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageResponse>(`/pages/${id}`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPage completed successfully');
    return res.data;
  }

  public async getPageContents(
    id: string | number,
    reqArgs?: GetPageContentsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageContents called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageContentsResponse>(`/pages/${pageId}/contents`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageContents retrieved contents for page:', id);
    return res.data;
  }

  public async getPageContentsExplain(
    id: string | number,
    reqArgs?: GetPageContentsExplainParams,
    funcArgs?: BaseArgs,
  ) {
    this.debug('getPageContentsExplain called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageContentsExplainResponse>(`/pages/${pageId}/contents/explain`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageContentsExplain retrieved contents for page:', id);
    return res.data;
  }

  public async getPageDiff(
    id: string | number,
    reqArgs?: GetPageDiffParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageDiff called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageDiffResponse>(`/pages/${pageId}/diff`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageDiff retrieved diff for page:', id);
    return res.data;
  }

  public async getPageExplain(
    id: string | number,
    reqArgs?: GetPageExplainParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageExplain called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageExplainResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageExplain retrieved explanation for page:', id);
    return res.data;
  }

  public async getPageExportToken(
    id: string | number,
    token: string,
    reqArgs?: GetPageExportTokenParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageExportToken called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/export/${token}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPageExportToken successfully retrieved export for page:', id);
    return res.data;
  }

  public async getPageExportTokenFilename(
    id: string | number,
    token: string,
    filename: string,
    reqArgs?: GetPageExportTokenFilenameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageExportTokenFilename called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/export/${token}/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPageExportTokenFilename successfully retrieved export for page:', id);
    return res.data;
  }

  public async getPageFilesSubpages(
    id: string | number,
    reqArgs?: GetPageFilesSubPagesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFilesSubpages called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageFilesSubPagesResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageFilesSubpages retrieved file and subpage info for page:', id);
    return res.data;
  }

  public async getPageFiles(
    id: string | number,
    reqArgs?: GetPageFilesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFiles called');
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageFilesResponse>(`/pages/${pageId}/explain`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageFiles retrieved file info for page:', id);
    return res.data;
  }

  public async getPageFile(
    id: string | number,
    filename: string,
    reqArgs?: GetPageFileParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFile called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/files/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPageFile successfully retrieved file for page:', id);
    return res.data;
  }

  public async getPageFileDescription(
    id: string | number,
    filename: string,
    reqArgs?: GetPageFileDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFileDescription called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/files/${filenameId}/description`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPageFileDescription successfully retrieved description for page:', id);
    return res.data;
  }

  public async getPageFileInfo(
    id: string | number,
    filename: string,
    reqArgs?: GetPageFileInfoParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFileInfo called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageFileInfoResponse>(`/pages/${pageId}/files/${filenameId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageFileInfo successfully retrieved info for file on page:', id);
    return res.data;
  }

  public async getPageFileRevisions(
    id: string | number,
    filename: string,
    reqArgs?: GetPageFileRevisionsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFileRevisions called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageFileRevisionsResponse>(`/pages/${pageId}/files/${filenameId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageFileRevisions successfully retrieved revisions for file on page:', id);
    return res.data;
  }

  public async getPageFind(
    id: string | number,
    reqArgs?: GetPageFindParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageFind called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageFindResponse>(`/pages/${pageId}/find`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageFind successfully retrieved find results for page:', id);
    return res.data;
  }

  public async getPageInfo(
    id: string | number,
    reqArgs?: GetPageInfoParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageInfo called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageInfoResponse>(`/pages/${pageId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageInfo successfully retrieved info for page:', id);
    return res.data;
  }

  public async getPageLinks(
    id: string | number,
    reqArgs?: GetPageLinksParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageLinks called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageLinksResponse>(`/pages/${pageId}/links`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageLinks successfully retrieved links for page:', id);
    return res.data;
  }

  public async getPagePDF(
    id: string | number,
    reqArgs?: GetPagePdfParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagePDF called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/pdf`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPagePDF successfully retrieved PDF for page:', id);
    return res.data;
  }

  public async getPagePDFFilename(
    id: string | number,
    filename: string,
    reqArgs?: GetPagePdfFilenameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagePDFFilename called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/${pageId}/pdf/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPagePDFFilename successfully retrieved PDF for page:', id);
    return res.data;
  }

  public async getPageProperties(
    id: string | number,
    reqArgs?: GetPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageProperties called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPagePropertiesResponse>(`/pages/${pageId}/properties`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageProperties successfully retrieved properties for page:', id);
    return res.data;
  }

  public async getPagePropertiesKey(
    id: string | number,
    key: string,
    reqArgs?: GetPagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagePropertiesKey called for page:', id);
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<string>(`/pages/${pageId}/properties/${keyId}`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPagePropertiesKey successfully retrieved property key for page:', id);
    return res.data;
  }

  public async getPagePropertiesKeyInfo(
    id: string | number,
    key: string,
    reqArgs?: GetPagePropertiesKeyInfoParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagePropertiesKeyInfo called for page:', id);
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPagePropertiesKeyInfoResponse>(`/pages/${pageId}/properties/${keyId}/info`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPagePropertiesKeyInfo successfully retrieved property key info for page:', id);
    return res.data;
  }

  public async getPageRatings(
    id: string | number,
    reqArgs?: GetPageRatingsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageRatings called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageRatingsResponse>(`/pages/${pageId}/ratings`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageRatings successfully retrieved ratings for page:', id);
    return res.data;
  }

  public async getPageRevisions(
    id: string | number,
    reqArgs?: GetPageRevisionsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageRevisions called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageRevisionsResponse>(`/pages/${pageId}/revisions`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageRevisions successfully retrieved revisions for page:', id);
    return res.data;
  }

  public async getPageSubpages(
    id: string | number,
    reqArgs?: GetPageSubPagesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageSubpages called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageSubPagesResponse>(`/pages/${pageId}/subpages`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageSubpages successfully retrieved subpages for page:', id);
    return res.data;
  }

  public async getPageTags(
    id: string | number,
    reqArgs?: GetPageTagsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageTags called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageTagsResponse>(`/pages/${pageId}/tags`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageTags successfully retrieved tags for page:', id);
    return res.data;
  }

  public async getPageTree(
    id: string | number,
    reqArgs?: GetPageTreeParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageTree called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPageTreeResponse>(`/pages/${pageId}/tree`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPageTree successfully retrieved tree for page:', id);
    return res.data;
  }

  public async getPageBook(
    reqArgs?: GetPageBookParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageBook called');
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/book`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPageBook successfully retrieved book');
    return res.data;
  }

  public async getPageBookFilename(
    id: string | number,
    filename: string,
    reqArgs?: GetPageBookFilenameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPageBookFilename called for page:', id);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/book/${filename}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });

    this.debug('getPageBookFilename successfully retrieved book for page:', id);
    return res.data;
  }

  public async getPagesCsv(
    reqArgs?: GetPagesCsvParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagesCsv called with params');
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get(`/pages/csv`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getPagesCsv successfully retrieved CSV data');
    return res.data;
  }

  public async getPagesPopular(
    reqArgs?: GetPagesPopularParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getPagesPopular called for page.');
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.get<GetPagesPopularResponse>(`/pages/popular`, {
      params: {
        ...reqArgs,
      },
    });
    this.debug('getPagesPopular successfully retrieved popular pages.');
    return res.data;
  }

  public async postPageContents(
    id: string | number,
    content?: string,
    reqArgs?: PostPageContentsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageContents called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

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
    this.debug('postPageContents successfully updated page:', id);
    return res.data;
  }

  public async putPageUnorder(
    id: string | number,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageUnorder called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

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
    this.debug('delPageDelete called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del<DeletePageResponse>(
      `/pages/${pageId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('delPageDelete successfully deleted page:', id);
    return res.data;
  }

  public async delPageAllowed(
    id: string | number,
    reqArgs?: PostPageAllowedParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('delPageAllowed called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del<PostPageAllowedResponse>(
      `/pages/${pageId}/allowed`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('delPageAllowed successfully changed permissions for page:', id);
    return res.data;
  }

  public async postPageCopied(
    id: string | number,
    reqArgs?: PostCopyPageParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageCopied called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.post<PostCopyPageResponse>(
      `/pages/${pageId}/copy`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('postPageCopied successfully copied page:', id);
    return res.data;
  }

  public async postPageExport(
    id: string | number,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageExport called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.post(
      `/pages/${pageId}/export`,
      "",
    );

    this.debug('postPageExport successfully exported page:', id);
    return res.data;
  }

  public async delPageFileName(
    id: string | number,
    filename: string,
    reqArgs?: DeletePageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('delPageFileName called for page:', id, 'filename:', filename);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del(
      `/pages/${pageId}/files/${filenameId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('delPageFileName successfully deleted file:', filename, 'from page:', id);
    return res.data;
  }

  public async headPageFileName(
    id: string | number,
    filename: string,
    reqArgs?: HeadPageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('headPageFileName called for page:', id, 'filename:', filename);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.head(
      `/pages/${pageId}/files/${filenameId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('headPageFileName successfully checked existence of file:', filename, 'on page:', id);
    return res.data;
  }

  public async putPageFileName(
    id: string | number,
    filename: string,
    file: Buffer | NodeJS.ReadableStream,
    reqArgs?: PutPageFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageFileName called for page:', id, 'filename:', filename);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

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
    this.debug('putPageFileName successfully uploaded file:', filename, 'to page:', id);
    return res.data;
  }


  public async delPageFileNameDescription(
    id: string | number,
    filename: string,
    reqArgs?: DeletePageFileNameDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('delPageFileNameDescription called for page:', id, 'filename:', filename);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del<DeletePageFileNameDescriptionResponse>(
      `/pages/${pageId}/files/${filenameId}/description`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('delPageFileNameDescription successfully deleted description for file:', filename, 'on page:', id);
    return res.data;
  }

  public async putPageFileNameDescription(
    id: string | number,
    filename: string,
    reqArgs?: PutPageFileNameDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageFileNameDescription called for page:', id, 'filename:', filename);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPageFileNameDescriptionResponse>(
      `/pages/${pageId}/files/${filenameId}/description`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageFileNameDescription successfully updated description for file:', filename, 'on page:', id);
    return res.data;
  }

  public async putPageFileNamePropertiesKey(
    id: string | number,
    filename: string,
    key: string,
    reqArgs?: PutPageFileNamePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageFileNamePropertiesKey called for page:', id, 'filename:', filename, 'key:', key);
    const pageId = this.parsePageId(id);
    const filenameId = this.parseFileName(filename);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPageFileNamePropertiesKeyResponse>(
      `/pages/${pageId}/files/${filenameId}/properties/${keyId}`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageFileNamePropertiesKey successfully updated property key:', key, 'for file:', filename, 'on page:', id);
    return res.data;
  }

  public async putPageImport(
    id: string | number,
    reqArgs?: PutPageImportParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageImport called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put(
      `/pages/${pageId}/import`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageImport successfully imported content to page:', id);
    return res.data;
  }

  public async putPageMove(
    id: string | number,
    reqArgs?: PutPageMoveParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageMove called for page:', id, 'to:', reqArgs?.to);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPageMoveResponse>(
      `/pages/${pageId}/move`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageMove successfully moved page:', id);
    return res.data;
  }

  public async putPageOrder(
    id: string | number,
    reqArgs?: PutPageOrderParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageOrder called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put(
      `/pages/${pageId}/order`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageOrder successfully updated order for page:', id);
    return res.data;
  }

  public async postPageProperties(
    id: string | number,
    propertyName: string,
    propertyValue: string,
    reqArgs?: PostPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageProperties called for page:', id, 'property:', propertyName);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

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

    this.debug('postPageProperties successfully created property:', propertyName, 'for page:', id);
    return res.data;
  }

  public async putPageProperties(
    id: string | number,
    propertyName: string,
    propertyValue: string,
    reqArgs?: PutPagePropertiesParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageProperties called for page:', id, 'property:', propertyName);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

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

    this.debug('putPageProperties successfully updated property:', propertyName, 'for page:', id);
    return res.data;
  }

  public async deletePagePropertiesKey(
    id: string | number,
    key: string,
    reqArgs?: DeletePagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('deletePagePropertiesKey called for page:', id, 'key:', key);
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del(
      `/pages/${pageId}/properties/${keyId}`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('deletePagePropertiesKey successfully deleted property key:', key, 'for page:', id);
    return res.data;
  }

  public async putPagePropertiesKey(
    id: string | number,
    key: string,
    reqArgs?: PutPagePropertiesKeyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPagePropertiesKey called for page:', id, 'key:', key);
    const pageId = this.parsePageId(id);
    const keyId = this.parseKey(key);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPagePropertiesKeyResponse>(
      `/pages/${pageId}/properties/${keyId}`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPagePropertiesKey successfully updated property key:', key, 'for page:', id);
    return res.data;
  }

  public async postPageRatings(
    id: string | number,
    reqArgs?: PostPageRatingsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageRatings called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.post(
      `/pages/${pageId}/ratings`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('postPageRatings successfully submitted rating for page:', id);
    return res.data;
  }

  public async postPageRevert(
    id: string | number,
    reqArgs?: PostPageRevertParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageRevert called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.post(
      `/pages/${pageId}/revert`,
      "",
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('postPageRevert successfully reverted page:', id);
    return res.data;
  }

  public async deletePageSecurity(
    id: string | number,
    reqArgs?: DeletePageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('deletePageSecurity called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.del(
      `/pages/${pageId}/security`,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('deletePageSecurity successfully deleted security settings for page:', id);
    return res.data;
  }

  public async postPageSecurity(
    id: string | number,
    content?: string,
    reqArgs?: PostPageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postPageSecurity called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.post<PostPageSecurityResponse>(
      `/pages/${pageId}/security`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('postPageSecurity successfully created security settings for page:', id);
    return res.data;
  }

  public async putPageSecurity(
    id: string | number,
    content?: string,
    reqArgs?: PutPageSecurityParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageSecurity called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPageSecurityResponse>(
      `/pages/${pageId}/security`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageSecurity successfully updated security settings for page:', id);
    return res.data;
  }

  public async putPageTags(
    id: string | number,
    content?: string,
    reqArgs?: PutPageTagsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putPageTags called for page:', id);
    const pageId = this.parsePageId(id);
    const tld = getTld(this.globals, funcArgs?.tld);
    const auth = getAuth(this.globals, funcArgs?.auth);
    const requests = this.createRequests(tld, auth);

    const res = await requests.put<PutPageTagsResponse>(
      `/pages/${pageId}/tags`,
      content,
      {
        params: {
          ...reqArgs,
        },
      }
    );

    this.debug('putPageTags successfully updated tags for page:', id);
    return res.data;
  }
}
