import {
    BaseArgs,
    ExpertGlobalOptions,
    GetFileParams,
    GetFileNameParams,
    GetFileDescriptionParams,
    GetFileInfoParams,
    GetFileInfoResponse,
    GetFilePropertiesParams,
    GetFilePropertiesKeyParams,
    GetFilePropertiesKeyInfoParams,
    GetFileRevisionsParams,
    GetFileRevisionsResponse,
    DeleteFileParams,
    HeadFileParams,
    PutFileParams,
    PutFileResponse,
    DeleteFileNameParams,
    HeadFileNameParams,
    PutFileNameParams,
    PostFileCopyParams,
    PostFileCopyResponse,
    DelDescriptionFileParams,
    DelDescriptionFileResponse
  } from "../types";
import BaseModule from "./base";

export default class Files extends BaseModule {
  constructor(globals: ExpertGlobalOptions) {
    super(globals, "files");
  }

  private parseFileId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    return `=${encodeURIComponent(encodeURIComponent(id))}`;
  }

  private parseFileName(name: string) {
    return `=${encodeURIComponent(encodeURIComponent(name))}`;
  }

  private parseKey(key: string) {
    return encodeURIComponent(encodeURIComponent(key));
  }

  public async getFile(
      id: string | number,
      reqArgs?: GetFileParams,
      funcArgs?: BaseArgs
  ) {
      this.debug('getFile called for:', id);
      const fileId = this.parseFileId(id);
      const requests = this.prepare(funcArgs);

      const res = await requests.get(`files/${fileId}`, {
        params: {
          ...reqArgs,
        },
        responseType: "stream",
      });
      this.debug('getFile completed successfully');
      return res.data;
  }

  public async getFileName(
    id: string | number,
    filename: string,
    reqArgs?: GetFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getFileName called for:', id, filename);
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const requests = this.prepare(funcArgs);

    const res = await requests.get(`files/${fileId}/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getFileName completed successfully');
    return res.data;
  }

  public async getFileDescription(
    id: string | number,
    reqArgs?: GetFileDescriptionParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getFileDescription called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get(`files/${fileId}/description`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    this.debug('getFileDescription completed successfully');
    return res.data;
  }

  public async getFileInfo(
    id: string | number,
    reqArgs?: GetFileInfoParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getFileInfo called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetFileInfoResponse>(`files/${fileId}/info`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('getFileInfo completed successfully');
    return res.data;
  }

  public async getFileRevisions(
    id: string | number,
    reqArgs?: GetFileRevisionsParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('getFileRevisions called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.get<GetFileRevisionsResponse>(`files/${fileId}/revisions`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('getFileRevisions completed successfully');
    return res.data;
  }

  public async deleteFile(
    id: string | number,
    reqArgs?: DeleteFileParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('deleteFile called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.del(`files/${fileId}`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('deleteFile completed successfully');
    return res.data;
  }

  public async headFile(
    id: string | number,
    reqArgs?: HeadFileParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('headFile called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.head(`files/${fileId}`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('headFile completed successfully');
    return res.data;
  }

  public async putFile(
    id: string | number,
    reqArgs?: PutFileParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putFile called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.put<PutFileResponse>(`files/${fileId}`,
      "",
      {
      params: {
        ...reqArgs,
      }
    });
    this.debug('putFile completed successfully');
    return res.data;
  }

  public async deleteFileName(
    id: string | number,
    filename: string,
    reqArgs?: DeleteFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('deleteFileName called for:', id, filename);
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const requests = this.prepare(funcArgs);

    const res = await requests.del(`files/${fileId}/${filenameId}`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('deleteFileName completed successfully');
    return res.data;
  }

  public async headFileName(
    id: string | number,
    filename: string,
    reqArgs?: HeadFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('headFileName called for:', id, filename);
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const requests = this.prepare(funcArgs);

    const res = await requests.head(`files/${fileId}/${filenameId}`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('headFileName completed successfully');
    return res.data;
  }

  public async putFileName(
    id: string | number,
    filename: string,
    reqArgs?: PutFileNameParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('putFileName called for:', id, filename);
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const requests = this.prepare(funcArgs);

    const res = await requests.put(`files/${fileId}/${filenameId}`,
      "",
      {
      params: {
        ...reqArgs,
      }
    });
    this.debug('putFileName completed successfully');
    return res.data;
  }

  public async postFileCopy(
    id: string | number,
    reqArgs?: PostFileCopyParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('postFileCopy called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.post<PostFileCopyResponse>(`files/${fileId}/copy`,
      "",
      {
      params: {
        ...reqArgs,
      }
    });
    this.debug('postFileCopy completed successfully');
    return res.data;
  }

  public async delDescriptionFile(
    id: string | number,
    reqArgs?: DelDescriptionFileParams,
    funcArgs?: BaseArgs
  ) {
    this.debug('delDescriptionFile called for:', id);
    const fileId = this.parseFileId(id);
    const requests = this.prepare(funcArgs);

    const res = await requests.del<DelDescriptionFileResponse>(`files/${fileId}/description`, {
      params: {
        ...reqArgs,
      }
    });
    this.debug('delDescriptionFile completed successfully');
    return res.data;
  }
}
