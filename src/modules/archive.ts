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
import BaseModule from "./base";

export default class Archive extends BaseModule {
    constructor(globals: ExpertGlobalOptions) {
        super(globals, "archive");
    }

    public async getArchive(
        reqArgs?: GetArchiveParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchive called');
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchiveResponse>(`/archive`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchive completed successfully');
        return res.data;
    }

    public async getArchiveFiles(
        reqArgs?: GetArchiveFilesParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchiveFiles called');
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchiveFilesResponse>(`/archive/files`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchiveFiles completed successfully');
        return res.data;
    }

    public async getArchiveFile(
        fileId: number,
        reqArgs?: GetArchiveFileParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchiveFile called for:', fileId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get(`/archive/files/${fileId}`, {
          params: {
              ...reqArgs,
          },
          responseType: "stream"
        });
        this.debug('getArchiveFile completed successfully');
        return res.data;
    }

    public async getArchiveFileByName(
        fileId: number,
        fileName: string,
        reqArgs?: GetArchiveFileParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchiveFileByName called for:', fileId, fileName);
        const parseFileName = this.parseFileName(fileName);
        const requests = this.prepare(funcArgs);
        const res = await requests.get(`/archive/files/${fileId}/${parseFileName}`, {
          params: {
              ...reqArgs,
          },
          responseType: "stream"
        });
        this.debug('getArchiveFileByName completed successfully');
        return res.data;
    }

    public async getArchiveFileInfo(
        fileId: number,
        reqArgs?: GetArchiveFileParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchiveFileInfo called for:', fileId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchiveFileInfoResponse>(`/archive/files/${fileId}/info`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchiveFileInfo completed successfully');
        return res.data;
    }

    public async getArchivePages(
        reqArgs?: GetArchivePagesParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchivePages called');
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchivePagesResponse>(`/archive/pages`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchivePages completed successfully');
        return res.data;
    }

    public async getArchivePage(
        pageId: number,
        reqArgs?: GetArchivePageParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchivePage called for:', pageId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchivePageResponse>(`/archive/page/${pageId}`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchivePage completed successfully');
        return res.data;
    }

    public async getArchivePageContents(
        pageId: number,
        reqArgs?: GetArchivePageParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchivePageContents called for:', pageId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchivePageContentsResponse>(`/archive/page/${pageId}/contents`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchivePageContents completed successfully');
        return res.data;
    }

    public async getArchivePageInfo(
        pageId: number,
        reqArgs?: GetArchivePageParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchivePageInfo called for:', pageId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchivePageInfoResponse>(`/archive/page/${pageId}/info`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchivePageInfo completed successfully');
        return res.data;
    }

    public async getArchivePageSubPages(
        pageId: number,
        reqArgs?: GetArchivePageParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getArchivePageSubPages called for:', pageId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetArchivePageSubPagesResponse>(`/archive/page/${pageId}/subpages`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getArchivePageSubPages completed successfully');
        return res.data;
    }

}
