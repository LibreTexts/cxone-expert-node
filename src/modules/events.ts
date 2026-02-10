import {
    BaseArgs,
    ExpertGlobalOptions,
    GetPageHierarchyByIdParams,
    GetPageHierarchyByIdResponse,
    GetPageHierarchyDetailByIdParams,
    GetPageHierarchyDetailByIdResponse,
    GetEventPageParams,
    GetEventPageResponse,
    GetEventPageDetailParams,
    GetEventPageDetailResponse,
    GetEventUserPageParams,
    GetEventUserPageResponse,
    GetEventUserPageDetailParams,
    GetEventUserPageDetailResponse
} from "../types";
import { getTld, getAuth } from "../utils";
import Auth from "./auth";
import Requests from "./requests";

export default class Events {
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
        return `=${encodeURIComponent(encodeURIComponent(id))}`;
    }

    private parseUserId(id: string | number) {
        if (typeof id === "number") {
          return id.toString();
        }
        return `=${encodeURIComponent(encodeURIComponent(id))}`;
      }

    public async getPageHierarchyById(
        id: string | number,
        reqArgs?: GetPageHierarchyByIdParams,
        funcArgs?: BaseArgs
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetPageHierarchyByIdResponse>(`events/page-hierarchy/${pageId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }
    
    public async getPageHierarchyDetailById(
        id: string | number,
        detailId: string,
        reqArgs?: GetPageHierarchyDetailByIdParams,
        funcArgs?: BaseArgs
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetPageHierarchyDetailByIdResponse>(`events/page-hierarchy/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventPage(
        id: string | number,
        reqArgs?: GetEventPageParams,
        funcArgs?: BaseArgs
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetEventPageResponse>(`events/page/${pageId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventPageDetail(
        id: string | number,
        detailId: string,
        reqArgs?: GetEventPageDetailParams,
        funcArgs?: BaseArgs
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetEventPageDetailResponse>(`/events/page/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventUserPage(
        userId: string | number,
        reqArgs?: GetEventUserPageParams,
        funcArgs?: BaseArgs
    ){
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetEventUserPageResponse>(`/events/user-page/${this.parseUserId(userId)}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventUserDetailPage(
        userId: string | number,
        detailId: string,
        reqArgs?: GetEventUserPageDetailParams,
        funcArgs?: BaseArgs
    ){
        const tld = getTld(this.globals, funcArgs?.tld);
        const auth = getAuth(this.globals, funcArgs?.auth);
        const requests = new Requests(tld, auth);
        const res = await requests.get<GetEventUserPageDetailResponse>(`/events/user-page/${this.parseUserId(userId)}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }
};
