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
    GetFileRevisionsResponse
  } from "../types";
import { getTld } from "../utils";
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
      funcArgs: BaseArgs,
      reqArgs?: GetFileParams
  ) {
      const fileId = this.parseFileId(id);
      const tld = getTld(this.globals, funcArgs.tld);
      const requests = new Requests(tld, funcArgs.auth);
  
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
    funcArgs: BaseArgs,
    reqArgs?: GetFileNameParams
  ) {
    const fileId = this.parseFileId(id);
    const filenameId = this.parseFileName(filename);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

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
    funcArgs: BaseArgs,
    reqArgs?: GetFileDescriptionParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

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
    funcArgs: BaseArgs,
    reqArgs?: GetFileInfoParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetFileInfoResponse>(`files/${fileId}/info`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

  public async getFileRevisions(
    id: string | number,
    funcArgs: BaseArgs,
    reqArgs?: GetFileRevisionsParams
  ) {
    const fileId = this.parseFileId(id);
    const tld = getTld(this.globals, funcArgs.tld);
    const requests = new Requests(tld, funcArgs.auth);

    const res = await requests.get<GetFileRevisionsResponse>(`files/${fileId}/revisions`, {
      params: {
        ...reqArgs,
      }
    });
    return res.data;
  }

}