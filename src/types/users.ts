import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
  import { ExpertUser, PageSecurity } from "./security";
  import { Group } from "./groups";
  import { PageBase, PageProperty } from "./pages";


export type GetUsersParams = {
    verbose?: boolean;
    sortby?: string;
    seatfilter?: string;
    activatedfilter?: boolean;
    rolefilter?: string;
    authprovider?: number;
    usernameemailfilter?: string;
    fullnamefilter?: string;
    usernamefilter?: string;
} & PaginationQueryParams & BaseQueryParams;

export type GetUsersResponse = {
    "@count"?: string;
    "@querycount"?: string;
    "@totalcount"?: string;
    "@seateduserstotalcount"?: string;
    "@href": string;
    user: Partial<userBody> | Partial<userBody>[] | "";
}

export type GetUserParams = {
    exclude?: string;
} & BaseQueryParams;

export type GetUserResponse = Partial<userBody> | "";

export type GetUserMetricsParams = BaseQueryParams;

export type GetUserMetricsResponse = {
    "@user.id"?: string;
    "@href"?: string;
    "metric.comments"?: string;
    "metric.files-added"?: string;
    "metric.pages-created"?: string;
    "metric.pages-edited"?: string;
    "metric.ratings-down"?: string;
    "metric.ratings-up"?: string;
}

export type GetUserPropertiesParams = {
    names?: string;
    contentcutoff?: number;
} & BaseQueryParams;

export type GetUserPropertiesResponse = {
    "@count"?: string;
    "@href"?: string;
    property?: Partial<PageProperty> | Partial<PageProperty>[] | "";
}

export type GetUserPropertiesKeyParams = BaseQueryParams;

export type GetUserPropertiesKeyResponse = {
    property: {
        "@name"?: string;
        contents?: {
            "@type"?: string;
            "#text"?: string;
        }
    }
}

export type GetUserPropertiesKeyInfoParams = {
    contentcutoff?: number;
} & BaseQueryParams;

export type GetUserPropertiesKeyInfoResponse = PageProperty;

export type GetUserSearchParams = {
    format?: string;
    groupid?: number;
    seated?: boolean;
    active?: boolean;
    authprovider?: number;
    fullname?: string;
    username?: string;
    email?: string;
} & BaseQueryParams & PaginationQueryParams;

export type GetUserSearchResponse = {
    "@count"?: string;
    user?: Partial<userBody> | Partial<userBody>[] | "";
}

export type userBody = {
    groups: {
        group?: Partial<Group> | Partial<Group>[];
    } | "";
    "page.home": Partial<PageBase> | Partial<PageBase>[] | "";
} & (Partial<ExpertUser> | Partial<ExpertUser>[])