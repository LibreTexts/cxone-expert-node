import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
import { ExpertUser, PageSecurity } from "./security";

export type GetPageHierarchyByIdParams = {
  limit?: number;
  include?: string;
  upto?: string;
};

export type GetPageHierarchyDetailByIdParams = {
  include?: string;
}

export type GetEventPageParams = GetPageHierarchyByIdParams;

export type GetEventPageDetailParams = GetPageHierarchyByIdParams;

export type GetEventUserPageParams = GetPageHierarchyByIdParams;

export type GetEventUserPageDetailParams = GetPageHierarchyDetailByIdParams;

export type GetPageHierarchyByIdResponse = {
  "@count": string;
  "@upto": string;
  "@since": string;
  summary: EventSummary | EventSummary[];
};

export type GetPageHierarchyDetailByIdResponse = {
  "@count": string;
  summary: EventDetailSummary | EventDetailSummary[];
}

export type GetEventPageResponse = {
  "@count": string;
  "@upto": string;
  "@since": string;
  summary: EventDetailSummary | EventDetailSummary[];
};

export type GetEventPageDetailResponse = {
  "@count": string;
  event: EventDetail;
};

export type GetEventUserPageResponse = GetPageHierarchyByIdResponse;

export type GetEventUserPageDetailResponse = GetPageHierarchyDetailByIdResponse;

export type EventSummary = {
  "@id": string;
  "@datetime": string;
  "@count": string;
  "@detailid": string;
  "@uri.detail": string;
  "@uri.hierarchy"?: string; 
  event: EventDetail;
  page: object;
  user?: UserDetail;
}

export type EventDetailSummary = {
  "@id": string;
  "@datetime": string;
  "@count": string;
  "@uri.detail": string;
  event: EventDetail;
}

export type EventDetail = {
  "@id": string;
  "@datetime": string;
  "@mt-epoch": string;
  "@type": string;
  "@language": string;
  "@version": string;
  diff?: object;
  page: object;
  request: object;
}

export type UserDetail = {
  "user": {
    "@id": string;
  }
}

