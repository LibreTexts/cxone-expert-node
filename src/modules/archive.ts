import {
    BaseArgs,
    ExpertGlobalOptions,
    GetArchiveParams,
    GetArchiveResponse,
    GetArchiveFilesParams,
    GetArchiveFilesResponse,
    GetArchiveFileParams,
    GetArchiveFileInfoResponse,
    GetArchivePagesParams,
    GetArchivePagesResponse,
    GetArchivePageParams,
    GetArchivePageResponse,
    GetArchivePageContentsResponse,
    GetArchivePageInfoResponse,
    GetArchivePageSubPagesResponse
} from "../types";
import { getTld } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Archive {
    private globals: ExpertGlobalOptions;
    private _auth?: Auth;

    constructor(args: ExpertGlobalOptions, auth?: Auth) {
        this.globals = args;
        this._auth = auth;
    }

    private parseFileName(name: string) {
        return `=${encodeURIComponent(encodeURIComponent(name))}`;
    }

    public async getArchive(
        funcArgs: BaseArgs,
        reqArgs?: GetArchiveParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchiveResponse>(`/archive`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchiveFiles(
        funcArgs: BaseArgs,
        reqArgs?: GetArchiveFilesParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchiveFilesResponse>(`/archive/files`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchiveFile(
        fileId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchiveFileParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get(`/archive/files/${fileId}`, {
          params: {
              ...reqArgs,
          },
          responseType: "stream"
        });
        return res.data;
    }

    public async getArchiveFileByName(
        fileId: number,
        fileName: string,
        funcArgs: BaseArgs,
        reqArgs?: GetArchiveFileParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const parseFileName = this.parseFileName(fileName);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get(`/archive/files/${fileId}/${parseFileName}`, {
          params: {
              ...reqArgs,
          },
          responseType: "stream"
        });
        return res.data;
    }

    public async getArchiveFileInfo(
        fileId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchiveFileParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchiveFileInfoResponse>(`/archive/files/${fileId}/info`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchivePages(
        funcArgs: BaseArgs,
        reqArgs?: GetArchivePagesParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchivePagesResponse>(`/archive/pages`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchivePage(
        pageId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchivePageParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchivePageResponse>(`/archive/page/${pageId}`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchivePageContents(
        pageId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchivePageParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchivePageContentsResponse>(`/archive/page/${pageId}/contents`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchivePageInfo(
        pageId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchivePageParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchivePageInfoResponse>(`/archive/page/${pageId}/info`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getArchivePageSubPages(
        pageId: number,
        funcArgs: BaseArgs,
        reqArgs?: GetArchivePageParams
    ) {
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetArchivePageSubPagesResponse>(`/archive/page/${pageId}/subpages`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

}