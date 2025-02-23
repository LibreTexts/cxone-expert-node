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
import { getTld } from "../utils";
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
        funcArgs: BaseArgs,
        reqArgs?: GetPageHierarchyByIdParams
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
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
        funcArgs: BaseArgs,
        reqArgs?: GetPageHierarchyDetailByIdParams
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetPageHierarchyDetailByIdResponse>(`events/page-hierarchy/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventPage(
        id: string | number,
        funcArgs: BaseArgs,
        reqArgs?: GetEventPageParams
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
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
        funcArgs: BaseArgs,
        reqArgs?: GetEventPageDetailParams
    ){
        const pageId = this.parsePageId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetEventPageDetailResponse>(`/events/page/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }

    public async getEventUserPage(
        userId: string | number,
        funcArgs: BaseArgs,
        reqArgs?: GetEventUserPageParams 
    ){
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
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
        funcArgs: BaseArgs,
        reqArgs?: GetEventUserPageDetailParams
    ){
        const tld = getTld(this.globals, funcArgs.tld);
        const requests = new Requests(tld, funcArgs.auth);
        const res = await requests.get<GetEventUserPageDetailResponse>(`/events/user-page/${this.parseUserId(userId)}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        return res.data;
    }
};