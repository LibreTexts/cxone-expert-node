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
import BaseModule from "./base";

export default class Events extends BaseModule {
    constructor(globals: ExpertGlobalOptions) {
        super(globals, "events");
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
        this.debug('getPageHierarchyById called for:', id);
        const pageId = this.parsePageId(id);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetPageHierarchyByIdResponse>(`events/page-hierarchy/${pageId}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getPageHierarchyById completed successfully');
        return res.data;
    }

    public async getPageHierarchyDetailById(
        id: string | number,
        detailId: string,
        reqArgs?: GetPageHierarchyDetailByIdParams,
        funcArgs?: BaseArgs
    ){
        this.debug('getPageHierarchyDetailById called for:', id, detailId);
        const pageId = this.parsePageId(id);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetPageHierarchyDetailByIdResponse>(`events/page-hierarchy/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getPageHierarchyDetailById completed successfully');
        return res.data;
    }

    public async getEventPage(
        id: string | number,
        reqArgs?: GetEventPageParams,
        funcArgs?: BaseArgs
    ){
        this.debug('getEventPage called for:', id);
        const pageId = this.parsePageId(id);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetEventPageResponse>(`events/page/${pageId}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getEventPage completed successfully');
        return res.data;
    }

    public async getEventPageDetail(
        id: string | number,
        detailId: string,
        reqArgs?: GetEventPageDetailParams,
        funcArgs?: BaseArgs
    ){
        this.debug('getEventPageDetail called for:', id, detailId);
        const pageId = this.parsePageId(id);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetEventPageDetailResponse>(`/events/page/${pageId}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getEventPageDetail completed successfully');
        return res.data;
    }

    public async getEventUserPage(
        userId: string | number,
        reqArgs?: GetEventUserPageParams,
        funcArgs?: BaseArgs
    ){
        this.debug('getEventUserPage called for:', userId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetEventUserPageResponse>(`/events/user-page/${this.parseUserId(userId)}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getEventUserPage completed successfully');
        return res.data;
    }

    public async getEventUserDetailPage(
        userId: string | number,
        detailId: string,
        reqArgs?: GetEventUserPageDetailParams,
        funcArgs?: BaseArgs
    ){
        this.debug('getEventUserDetailPage called for:', userId, detailId);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetEventUserPageDetailResponse>(`/events/user-page/${this.parseUserId(userId)}/${detailId}`, {
            params: {
                ...reqArgs,
            },
        });
        this.debug('getEventUserDetailPage completed successfully');
        return res.data;
    }
};
