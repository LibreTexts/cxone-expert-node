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
import { getTld, getAuth } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Files {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
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
      funcArgs: BaseArgs = {},
      reqArgs?: GetFileParams
  ) {
      const fileId = this.parseFileId(id);
      const tld = getTld(this.globals, funcArgs.tld);
      const auth = getAuth(this.globals, funcArgs.auth);
      const requests = new Requests(tld, auth);
  
      const res = await requests.get(`files/${fileId}`, {
        params: {
          ...reqArgs,
        },
        responseType: "stream",
      });
      return res.data;
  }

  public async getFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs = {},
    reqArgs?: GetFileNameParams
  ) {
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get(`files/${fileId}/${filenameId}`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getFileDescription(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: GetFileDescriptionParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get(`files/${fileId}/description`, {
      params: {
        ...reqArgs,
      },
      responseType: "stream",
    });
    return res.data;
  }

  public async getFileInfo(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: GetFileInfoParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetFileInfoResponse>(`files/${fileId}/info`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async getFileRevisions(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: GetFileRevisionsParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.get<GetFileRevisionsResponse>(`files/${fileId}/revisions`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async deleteFile(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: DeleteFileParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.del(`files/${fileId}`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async headFile(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: HeadFileParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.head(`files/${fileId}`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async putFile(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: PutFileParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.put<PutFileResponse>(`files/${fileId}`, 
      "",
      {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async deleteFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs = {},
    reqArgs?: DeleteFileNameParams
  ) {
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.del(`files/${fileId}/${filenameId}`, { 
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async headFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs = {},
    reqArgs?: HeadFileNameParams
  ) {
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.head(`files/${fileId}/${filenameId}`, {  
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async putFileName(
    id: string | number,
    filename: string,
    funcArgs: BaseArgs = {},
    reqArgs?: PutFileNameParams
  ) {
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.put(`files/${fileId}/${filenameId}`, 
      "",
      {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }
  
  public async postFileCopy(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: PostFileCopyParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.post<PostFileCopyResponse>(`files/${fileId}/copy`, 
      "",
      {
      params: {
        ...reqArgs,
      } 
    });
    return res.data;
  }

  public async delDescriptionFile(
    id: string | number,
    funcArgs: BaseArgs = {},
    reqArgs?: DelDescriptionFileParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const auth = getAuth(this.globals, funcArgs.auth);
    const requests = new Requests(tld, auth);

    const res = await requests.del<DelDescriptionFileResponse>(`files/${fileId}/description`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }
}
