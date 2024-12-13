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

export type GetPagesParams = {
  startpage?: boolean;
  format?: "html" | "xml" | "google";
  authenticate?: boolean;
};

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

export type GetPageExplainParams = GetPageParams;

export type GetPageInfoParams = {
  exclude?: string;
} & BaseQueryParams;

export type GetPageFileInfoParams = {
  includeDeleted?: boolean;
  revision?: string;
} & BaseQueryParams;

export type GetPageFileRevisionsParams = {
  changefilter?: string;
} & BaseQueryParams;

export type GetPageContentsExplainParams = {
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

// export type GetPageFindParams = {
//   tags?: string;
//   missingClassifications?: string;
//   since?: string;
//   upto?: string;
//   include?: string;
// };

export type GetPageFileRevisionsResponse = {
  "@count": string;
  "@href": string;
  file:
    | (PageFile & { "page.parent": GetPageInfoResponse; "user-action": string })
    | (PageFile & {
        "page.parent": GetPageInfoResponse;
        "user-action": string;
      })[];
};

export type GetPageResponse = PageBase & PageExtended;
export type GetPagesResponse = {
  "@id": string;
  "@guid": string;
  "@draft.state": string;
  "@href": string;
  "@deleted": string;
  "date.created": string;
  language: string;
  namespace: string;
  path: PagePath & { "@type": string };
  subpages: Subpages | "";
};

export type GetPageSecurityResponse = PageSecurity;

export type GetPageExplainResponse = PageBase & PageExtended;

export type GetPageInfoResponse = Omit<
  PageBase,
  "article" | "date.modified" | "security"
>;

export type GetPageContentsResponse = {
  "@revision": string;
  "@type": string;
  "@title": string;
  body: string[];
  head: string;
  tail: string;
};

export type GetPageFileInfoResponse = {
  "page.parent": GetPageInfoResponse;
} & PageFile;

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

export type GetPageContentsExplainResponse = {
  "@elapsed": string;
  "@id": string;
  "@path": string;
  "@version": string;
  calls: object;
  "data-stats": PageDataStats;
  "db-summary": PageDbSummary;
  "hs-summary": PageHsSummary;
  "redis-summary": PageRedisSummary;
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
  "contents.preview"?: any[];
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

export type Subpages = {
  page: Subpage[] | Subpage;
};

export type Subpage = {
  "@id": string;
  "@guid": string;
  "@draft.state": string;
  "@href": string;
  "@deleted": string;
  "date.created": string;
  language: string;
  namespace: string;
  path: PagePath;
  subpages: Subpages | "";
  title: string;
  "uri.ui": string;
};

export type PageDataStats = {
  entry: PageDataEntry | PageDataEntry[];
};

export type PageDataEntry = {
  "@name": string;
  "@value": string;
};

export type PageDbSummary = {
  "@elapsed": string;
  "@count": string;
  query: PageSummaryQuery | PageSummaryQuery[];
};

export type PageHsSummary = PageDbSummary;

export type PageRedisSummary = {
  "@elapsed": string;
  "@count": string;
};

export type PageSummaryQuery = {
  "@name": string;
  "@elapsed": string;
  "@average": string;
  "@max": string;
  "@count": string;
};
