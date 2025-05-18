import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
  import { ExpertUser, PageSecurity } from "./security";


export type GetSiteActivityParams = {
    since?: string;
    authenticate?: boolean;
}

export type GetSiteSubPagesTagsParams = {
    format?: "debug" | "html" | "xml";
    width?: number;
    exclude?: number;
    type?: "compact" | "expandable";
} & BaseQueryParams;

export type GetSiteFullNavTreeTagsParams = {
    format?: "debug" | "html" | "xml";
    width?: number;
} & BaseQueryParams;

export type GetSiteOperationsParams = {
    authenticate?: boolean;
}

export type GetSitePropertiesParams = {
    names?: string;
    contentcutoff?: number;
} & BaseQueryParams;

export type GetSiteKeyPropertiesParams = BaseQueryParams;

export type GetSiteKeyPropertiesInfoParams = {
    contentcutoff?: number;
} & BaseQueryParams;

export type GetSiteQueryParams = {
    parser?: "bestguess" | "term" | "filename" | "lucene";
    nocache?: boolean;
    authenticate?: boolean;
    constraint?: string;
    sortby?: SortBy;
    verbose?: boolean;
    format?: "xml" | "search";
    q: string;
} & PaginationQueryParams;

export type GetSiteTagsParams = {
    to?: string;
    from?: string;
    authenticate?: boolean;
    type?: "text" | "date" | "user" | "define";
    q: string;
    pages?: boolean;
}

export type GetSiteTagParams = {
    include?: string;
    parentid?: number;
    language?: string;
    authenticate?: boolean;
}

type SortBy =
  | "score"
  | "-score"
  | "title"
  | "-title"
  | "date"
  | "-date"
  | "size"
  | "-size"
  | "wordcount"
  | "-wordcount"
  | "rating.score"
  | "-rating.score"
  | "rating.count"
  | "-rating.count";


export type GetSiteActivityResponse = {
    "@type"?: string;
    entry?: Partial<entryBody> | Partial<entryBody>[] | "";
}

export type GetSiteExportGroupsResponse = {
    "group"?: Partial<groupBody> | Partial<groupBody>[] | "";
}

export type GetSiteExportUsersResponse = {
    "user"?: Partial<userBody> | Partial<userBody>[] | "";
}

export type GetSiteSubPagesTagsResponse = {
    "children": {
        "html": string;
        "nodes": string;
    }
}

export type GetSitePropertiesResponse = {
    "@count"?: string;
    "@href"?: string;
    property?: Partial<propertyBody> | Partial<propertyBody>[]| "";
}

export type GetSiteKeyPropertiesInfoResponse = Partial<propertyBody>;

export type GetSiteQueryResponse = {
    "@ranking"?: string;
    "@queryid"?: string;
    "@sessionid"?: string;
    "@querycount"?: string;
    "@count.recommendations"?: string;
    "@count"?: string;
    result?: Partial<queryBody> | Partial<queryBody>[] | "";
}

export type GetSiteStatusResponse = {
    "@status"?: string;
}

export type GetSiteTagsResponse = {
    "@count"?: string;
    tag?: Partial<tagBody> | Partial<tagBody>[] | "";
}

export type GetSiteTagResponse = {
    "@value"?: string;
    "@id"?: string;
    "@href"?: string;
    pages?: {
        "@count"?: string;
        "@totalcount"?: string;
        page?: Partial<PageTag> | Partial<PageTag>[] | "";
    }
    title?: string;
    type?: string;
    uri?: string;
}

type PageTag = {
    "@id": string;
    "@guid": string;
    "@draft.state": string;
    "@href": string;
    "@deleted": string;
    "date.created": string;
    language: string;
    namespace: string;
    path: Partial<{
        "@seo": string;
        "@type": string;
        "#text": string;
    }>;
    title: string;
    "uri.ui": string;
}

export type tagBody = {
    "@value": string;
    "@id": string;
    "@href": string;
    title: string;
    type: string;
    uri: string;
}

export type queryBody = {
    author: string;
    authorDisplayName: string;
    "date.modified": string;
    id: string;
    mime: string;
    page: Partial<{
        "@guid": string;
        path: string;
        rating: string;
        title: string;
        "uri.ui": string;
    }>;
    preview: string;
    rank: string;
    tag: string;
    title: string;
    type: string;
    uri: string;
    "uri.track": string;
}

export type entryBody = {
    "@date": string;
    "pages.created": string;
    "pages.deleted": string;
    "pages.edited": string;
    "pages.total": string;
    "users.created": string;
    "users.total": string;
}

export type groupBody = {
    "@guid": string;
    "groupname": string;
    "premissions.group": Partial<{
        "operations": Partial<{
            '@mask': string;
            '#text': string;
        }>;
        "role": Partial<{
            '@id': string;
            '#text': string;
        }>;
    }>;
    "service.authentication": object | "";
}

export type groupsBody = {
    group: Partial<groupBody> | Partial<groupBody>[];
}

type userBody = {
    "@anonymous": string;
    "@virtual": string;
    "date.created": string;
    "date.lastlogin": string;
    email: string;
    fullname: string;
    groups: groupsBody | "";
    "hash.email": string;
    language: string;
    "license.seat": Partial<{
        "@owner": string;
        "#text": string;
    }>;
    nick: string;
    password: object;
    "permissions.effective": Partial<{
        operations: Partial<{
            '@mask': string;
            '#text': string;
        }>
    }>;
    "permissions.revoked": object | "";
    "permissions.user": Partial<{
        operations: Partial<{
            '@mask': string;
            '#text': string;
        }>
        role: Partial<{
            '@id': string;
            '#text': string;
        }>
    }>;
    "service.authentication": object | "";
    status: string;
    timezone: string;
    "uri.avatar": string;
    "uri.gravatar": string;
    username: string;
}

export type propertyBody = {
    "@revision": string;
    "@resid": string;
    "@name": string;
    "@href": string;
    "@etag": string;
    "@resource-is-deleted": string;
    "@resource-rev-is-deleted": string;
    contents: Partial<{
        "@type": string;
        "@size": string;
        "@href": string;
    }>;
    "date.modified": string;
    "user.modified": Partial<userModifiedBody>;
}

export type userModifiedBody = {
    "@anonymous": string;
    "@virtual": string;
    "@id": string;
    "@wikiid": string;
    "@href": string;
    "date.created": string;
    "date.lastlogin"?: string;
    "email": string;
    "fullname": string;
    "hash.email": string;
    "license.seat": Partial<{
        "@owner": string;
        "#text": string;
    }>;
    nick: string;
    password: object;
    status: string;
    "uri.avatar": string;
    "uri.gravatar": string;
    username: string;
}