import {
  BaseQueryParams,
  PaginationQueryParams,
  RequestModeQueryParam,
} from "./requests";
import { ExpertUser, PageSecurity } from "./security";

export type GetPageParams = {
  format?: "html" | "xhtml";
  revision?: string;
  include?: "contents" | "prevnext";
  includeDeleted?: boolean;
  mode?: RequestModeQueryParam;
  exclude?: string;
} & BaseQueryParams;

export type GetPageContentsParams = {
  overview?: boolean;
  include?: string;
  reltopath?: string;
  relto?: number;
  pageid?: number;
  includes?: "overview" | "tags" | "overview,tags";
  format?: "html" | "xhtml" | "text" | "dekicode";
  highlight?: string;
  revision?: string;
  mode: RequestModeQueryParam;
  section?: string;
} & BaseQueryParams;

export type GetPageSubPagesParams = BaseQueryParams & PaginationQueryParams;
export type GetPageSecurityParams = BaseQueryParams & {
  export?: boolean;
};

export type GetPageDiffParams = {
  diff?: "combined" | "all";
  previous?: string;
  format?: "html" | "xhtml";
  mode?: RequestModeQueryParam;
  revision?: string;
} & BaseQueryParams;

export type GetPageFilesParams = BaseQueryParams & PaginationQueryParams;

export type GetPageResponse = PageBase & PageExtended;
export type GetPageSecurityResponse = PageSecurity;

export type GetPageContentsResponse = {
  "@revision": string;
  "@type": string;
  "@title": string;
  body: string[];
  head: string;
  tail: string;
};

export type GetPageSubPagesResponse = {
  "@count": string;
  "@href": string;
  "page.subpage": PageBase | PageBase[];
};

export type GetPageDiffResponse = {
  "@type": string;
  "#text": string;
};

export type GetPageFilesResponse = {
  "@count": string;
  "@offset": string;
  "@href": string;
  file: PageFile | PageFile[];
};

export type PageBase = {
  "@id": string;
  "@guid": string;
  "@draft.state": string;
  "@href": string;
  "@deleted": string;
  "@revision": string;
  article: string;
  "date.created": string;
  "date.modified": string;
  language: string;
  namespace: string;
  path: PagePath;
  security: PageSecurity;
  title: string;
  "uri.ui": string;
};

export type PageExtended = {
  "@unpublish": string;
  aliases: {
    [key: string]: string;
  };
  comments: {
    "@count": string;
    "@href": string;
  };
  contents: {
    "@type": string;
    "@href": string;
    "@etag": string;
  };
  "contents.alt": {
    "@type": string;
    "@href": string;
  };
  "date.edited": string;
  description: string;
  files: {
    "@count": string;
    "@href": string;
    file: PageFile | PageFile[];
  };
  inbound: {
    "@count": string;
  };
  "language.effective": string;
  metrics: {
    "metric.charcount": string;
    "metric.views": string;
  };
  outbound: {
    "@count": string;
  };
  "page.parent": GetPageResponse;
  "page.redirectedfrom": string;
  properties: {
    "@count": string;
    "@href": string;
    property: Record<string, string>[];
  };
  rating: {
    "@score": string;
    "@count": string;
    "@seated.score": string;
    "@seated.count": string;
    "@unseated.score": string;
    "@unseated.count": string;
    "@anonymous.score": string;
    "@anonymous.count": string;
  };
  revisions: {
    "@count": string;
    "@href": string;
  };
  subpages: {
    "@href": string;
  };
  summary: string;
  tags: {
    "@count": string;
    "@href": string;
    tag: PageTag | PageTag[];
  };
  timeuuid: string;
  "user.author": ExpertUser;
  "user.createdby": ExpertUser;
};

export type PageFile = {
  "@id": string;
  "@revision": string;
  "@res-id": string;
  "@href": string;
  "@res-is-head": string;
  "@res-is-deleted": string;
  "@res-rev-is-deleted": string;
  "@res-contents-id": string;
  "alt-text": string;
  contents: object;
  "contents.preview": any[];
  "date.created": string;
  "date.last-modified": string;
  description: string;
  filename: string;
  revisions: object;
  "user.createdBy": ExpertUser;
};

export type PageTag = {
  "@value": string;
  "@id": string;
  "@href": string;
  title: string;
  type: string;
  url: string;
};

export type PagePath = {
  "@seo": string;
  "#text": string;
};
