import {
    BaseArgs,
    ExpertGlobalOptions,
    GetContextMapParams,
    GetContextMapResponse,
    GetContextMapByIdParams,
    GetContextMapByIdResponse
} from "../types";
import { getTld, getAuth } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class contextMaps {
    private globals: ExpertGlobalOptions;
    private _auth?: Auth;

    constructor(args: ExpertGlobalOptions, auth?: Auth) {
        this.globals = args;
        this._auth = auth;
    }

    private parseFileName(name: string) {
        return `=${encodeURIComponent(encodeURIComponent(name))}`;
    }

    public async getContextMaps(
        reqArgs?: GetContextMapParams,
        funcArgs?: BaseArgs
    ) {
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetContextMapResponse>(`/contextmaps`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

    public async getContextMapsById(
        language: string,
        id: string | number,
        reqArgs?: GetContextMapByIdParams,
        funcArgs?: BaseArgs
    ) {
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetContextMapByIdResponse>(`/contextmaps/${language}/${id}`, {
          params: {
              ...reqArgs,
          },
        });
        return res.data;
    }

}
