import { BaseArgs, ExpertGlobalOptions, GetPageContentsParams, GetPageContentsResponse, GetPageParams, GetPageResponse, GetPageSecurityParams, GetPageSecurityResponse, GetPageSubPagesParams, GetPageSubPagesResponse } from "../types";
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
        if (typeof id === 'number') {
            return id.toString();
        }
        return `=${encodeURIComponent(id)}`;
    }

    public async getPage(id: string | number, funcArgs: BaseArgs, reqArgs?: GetPageParams) {
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);

        const res = await requests.get<GetPageResponse>(`/pages/${pageId}`, {
            params: {
                ...reqArgs
            }
        });
        return res.data
    }

    public async getPageContents(id: string | number, funcArgs: BaseArgs, reqArgs?: GetPageContentsParams) {
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);

        const res = await requests.get<GetPageContentsResponse>(`/pages/${pageId}/contents`, {
            params: {
                ...reqArgs
            }
        });
        return res.data;
    }

    public async getPageSubPages(id: string | number, funcArgs: BaseArgs, reqArgs?: GetPageSubPagesParams) {
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);

        const res = await requests.get<GetPageSubPagesResponse>(`/pages/${pageId}/subpages`, {
            params: {
                ...reqArgs
            }
        });
        return res.data;
    }

    public async getPageSecurity(id: string | number, funcArgs: BaseArgs, reqArgs?: GetPageSecurityParams) {
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);

        const res = await requests.get<GetPageSecurityResponse>(`/pages/${pageId}/security`, {
            params: {
                ...reqArgs
            }
        });
        return res.data;
    }
}