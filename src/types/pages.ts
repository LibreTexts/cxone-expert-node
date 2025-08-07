import {
  BaseQueryParams,
  PaginationQueryParams,
  RequestModeQueryParam,
} from "./requests";
import { ExpertUser, PageSecurity } from "./security";

export type GetPagesParams = {
  startpage?: boolean;
  format?: "html" | "xml" | "google";
  authenticate?: boolean;
};

export type GetPagesResponse = {
  "@id"?: string;
  "@guid"?: string;
  "@draft.state"?: string;
  "@href"?: string;
  "@deleted"?: string;
  "date.created"?: string;
  language?: string;
  namespace?: string;
  path?: Partial<PagePath> | "";
  subpages?: Partial<Subpages> | "";
  title?: string;
  "uri.ui"?: string;
};

export type GetPageParams = {
  format?: "html" | "xhtml";
  revision?: string;
  include?: "contents" | "prevnext";
  includeDeleted?: boolean;
  mode?: RequestModeQueryParam;
  exclude?: string;
} & BaseQueryParams;

export type GetPageResponse = Partial<PageBase> & Partial<PageExtended>;

export type GetPageContentsParams = {
  overview?: boolean;
  include?: boolean;
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

export type GetPageContentsResponse = {
  "@revision"?: string;
  "@type"?: string;
  "@title"?: string;
  body?: string[] | "";
  head?: string;
  tail?: string;
};

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

export type GetPageContentsExplainResponse = {
  "@elapsed"?: string;
  "@id"?: string;
  "@Path"?: string;
  "@version"?: string;
  calls?: {
    "@elapsed"?: string;
    "@count-total"?: string;
    "@count-unique"?: string;
    expr?: exprCall | exprCall[] | "";
    import?: importCall | importCall[] | "";
    page?: pageCall | pageCall[] | "";
    property?: propertyCall | propertyCall[] | "";
    template?: templateCall | templateCall[] | "";
  }
  "data-stats"?: {
    entry?: Entry | Entry[] | "";
  }
  "db-summary"?: {
    "@elapsed"?: string;
    "@count"?: string;
    query?: Query | Query[] | "";
  }
  "hs-summary"?: {
    "@elapsed"?: string;
    "@count"?: string;
    query?: Query | Query[] | "";
  }
  "redis-summary"?: {
    "@elapsed"?: string;
    "@count"?: string;
    query?: Query | Query[] | "";
  }
}

export type GetPageDiffParams = {
  diff?: "combined" | "all";
  previous?: string;
  format?: "html" | "xhtml";
  mode?: RequestModeQueryParam;
  revision?: string;
} & BaseQueryParams;

export type GetPageDiffResponse = {
  "@type"?: string;
  "#text"?: string;
};

export type GetPageExplainParams = GetPageParams;

export type GetPageExplainResponse = GetPageResponse;

export type GetPageExportTokenParams = {
  recursive?: boolean;
  token?: string;
  pageid?: number;
  reltopath?: string;
  relto?: number;
  dryrun?: boolean;
};

export type GetPageExportTokenFilenameParams = GetPageExportTokenParams;

export type GetPageFilesSubPagesParams = BaseQueryParams;

export type GetPageFilesSubPagesResponse = {
  "@id"?: string;
  "@guid"?: string;
  "@draft.state"?: string;
  "@href"?: string;
  "@deleted"?: string;
  "date.created"?: string;
  files?: {
    "@count?": string;
    "@href?": string;
    file?: Partial<PageFile> | Partial<PageFile>[] | "";
  } | "";
  language?: string;
  namespace?: string;
  path?: Partial<PagePath> | "";
  subpages?: Partial<page_subpage> | "";
  title?: string;
  "uri.ui"?: string;
}

export type GetPageFilesParams = BaseQueryParams & PaginationQueryParams;

export type GetPageFilesResponse = {
  "@count": string;
  "@offset": string;
  "@totalcount": string;
  "@href": string;
  file?: Partial<PageFile> | Partial<PageFile>[] | "";
}

export type GetPageFileParams = {
  includeDeleted?: boolean;
  revision?: string;
  size?: "original" | "thumb" | "webview" | "bestfit" | "custom";
  format?: "jpg" | "png" | "bmp" | "gif";
  ratio?: "fixed" | "var";
  width?: number;
  height?: number;
} & BaseQueryParams;

export type GetPageFileDescriptionParams = {
  revision?: string;
} & BaseQueryParams;

export type GetPageFileInfoParams = {
  includeDeleted?: boolean;
  revision?: string;
} & BaseQueryParams;

export type GetPageFileInfoResponse = Partial<PageFile>;

export type GetPageFileRevisionsParams = {
  changefilter?: "CONTENT" | "NAME" | "LANGUAGE" | "META" | "DELETEFLAG" | "PARENT";
} & BaseQueryParams;

export type GetPageFileRevisionsResponse = {
  "@count"?: string;
  "@totalcount"?: string;
  "@href"?: string;
  file?: Partial<PageFile> | Partial<PageFile>[] | "";
}

export type GetPageFindParams = {
  tags?: string;
  missingclarifications?: string;
  since?: string;
  upto?: string;
  include?: string;
}

export type GetPageFindResponse = {
  "@count"?: string;
  "@totalcount"?: string;
  page?: "" | (Partial<PageBase> & Partial<Tags>) | (Partial<PageBase> & Partial<Tags>)[];
}

export type GetPageInfoParams = {
  exclude?: string;
} & BaseQueryParams;

export type GetPageInfoResponse = Partial<PageBase>;

export type GetPageLinksParams = {
  dir: "from" | "to";
} & BaseQueryParams;

export type GetPageLinksResponse = {
  "@count"?: string;
  page?: Partial<PageBase> | Partial<PageBase>[] | "";
}

export type GetPagePdfParams = {
  showtoc?: boolean;
  format?: "pdf" | "html";
  authenticate?: boolean;
  stylesheet?: string;
}

export type GetPagePdfFilenameParams = GetPagePdfParams;

export type GetPagePropertiesParams = {
  depth?: number;
  name?: string;
  contentcutoff?: number;
} & BaseQueryParams;

export type GetPagePropertiesResponse = {
  "@count"?: string;
  "@href"?: string;
  property?: Partial<PageProperty> | Partial<PageProperty>[] | "";
}

export type GetPagePropertiesKeyParams = BaseQueryParams;

export type GetPagePropertiesKeyInfoParams = {
  contentcutoff?: number;
} & BaseQueryParams;

export type GetPagePropertiesKeyInfoResponse = Partial<PageProperty> | Partial<PageProperty>[] | "";

export type GetPageRatingsParams = BaseQueryParams;

export type GetPageRatingsResponse = PageRating;

export type GetPageRevisionsParams = {
  revision?: string;
  deleted?: boolean;
} & BaseQueryParams & PaginationQueryParams;

export type GetPageRevisionsResponse = {
  page?: (Partial<PageBase> & Partial<PageExtended>) | (Partial<PageBase> & Partial<PageExtended>)[] | "";
}

export type GetPageSecurityParams = BaseQueryParams & {
  export?: boolean;
};

export type GetPageSecurityResponse = Partial<PageSecurity>;

export type GetPageSubPagesParams = BaseQueryParams & PaginationQueryParams;

export type GetPageSubPagesResponse = Partial<page_subpage>;

export type GetPageTagsParams = {
  exports?: boolean;
} & BaseQueryParams;

export type GetPageTagsResponse =  Partial<Tags>;

export type GetPageTreeParams = {
  startpage?: boolean;
  format?: "html" | "xml" | "google";
  include?: string;
  authenticate?: boolean;
};

export type GetPageTreeResponse = {
  page: Partial<GetPagesResponse>;
};

export type GetPageBookParams = {
  format?: "html" | "pdf";
  title?: string;
  showtoc?: boolean;
  authenticate?: boolean;
  stylesheet?: string;
  pageids: number;
  filename?: string;
}

export type GetPageBookFilenameParams = GetPageBookParams;

export type GetPagesCsvParams = {
  filename?: string;
  pageids: string;
}

export type GetPagesPopularParams = BaseQueryParams & PaginationQueryParams;

export type GetPagesPopularResponse = {
  "@count"?: string;
  "@href"?: string;
  page?: (Partial<PageBase> & Partial<PageExtended>) | (Partial<PageBase> & Partial<PageExtended>)[] | "";
}

export type PostPageContentsParams = {
  ordered?: boolean;
  restriction?: string;
  importtime?: string;
  overwrite?: boolean;
  reltopath?: string;
  relto?: number;
  abort?: "never" | "modified" | "exists";
  xpath?: string;
  section?: number;
  title?: string;
  comment?: string;
  edittime: string; 
  authenticate?: boolean;
  redirects?: number;
  tidy?: "remove" | "convert";
}

export type PostPageContentsResponse = {
  edit: {
    "@status": "success" | "conflict";
    page: {
      "@id": number;
      "@href": string;
      title: string;
      path: string;
    };
    "page.base": {
      "@id": number;
      "@revision": number;
      "@href": string;
      title: string;
      path: string;
      "date.edited": string;
      "user.author": {
        "@id": number;
        "@href": string;
        nick: string;
        username: string;
        email: string;
      };
      description: string;
      contents: {
        "@type": string;
        "@href": string;
      };
    };
    "page.overwritten"?: {
      "@id": number;
      "@revision": number;
      "@href": string;
      title: string;
      path: string;
      "date.edited": string;
      "user.author": {
        "@id": number;
        "@href": string;
        nick: string;
        username: string;
        email: string;
      };
      description: string;
      contents: {
        "@type": string;
        "@href": string;
      };
    };
  };
}

export type DeletePageParams = {
  recursive?: boolean;
} & BaseQueryParams;

export type DeletePageResponse = {
  deletedPages?: {
    "@count"?: number;
    page?: Partial<DeletedPage> | Partial<DeletedPage>[] | "";
  }
}

export type PostPageAllowedParams = {
  permissions?: string;
}

export type PostPageAllowedResponse = {
  users?: {
    user: Partial<Allowed> | Partial<Allowed>[] | "";
  }
}

export type PostCopyPageParams = {
  to: string; 
  title?: string;
  abort?: 'never' | 'exists';
  recursive?: boolean;
  tags?: boolean;
  attachments?: boolean;
} & BaseQueryParams;

export type PostCopyPageResponse = {
  'pages.copied?': {
    "@count"?: string;
    page?: Partial<PageBase> | Partial<PageBase>[] | "";
  } | "";
}

export type DeletePageFileNameParams = BaseQueryParams;

export type HeadPageFileNameParams = {
  includeDeleted?: boolean;
  revision?: string;
  size?: "original" | "thumb" | "webview" | "bestfit" | "custom";
  format?: "jpg" | "png" | "bmp" | "gif";
  ratio?: "fixed" | "var";
  width?: number;
  height?: number;
} & BaseQueryParams;

export type PutPageFileNameParams = {
  description?: string;
} & BaseQueryParams;

export type PutPageFileNameResponse = Partial<PageFile>;

export type DeletePageFileNameDescriptionParams = BaseQueryParams;

export type DeletePageFileNameDescriptionResponse = Partial<PageFile> & {
    properties?: {
      "@count"?: string;
      "@href"?: string;
      property?: Partial<PageProperty> | Partial<PageProperty>[] | "";
    }
  };


export type PutPageFileNameDescriptionParams = BaseQueryParams;

export type PutPageFileNameDescriptionResponse = Partial<PageFile> & {
    properties?: {
      "@count"?: string;
      "@href"?: string;
      property?: Partial<PageProperty> | Partial<PageProperty>[] | "";
    }
  };


export type PutPageFileNamePropertiesKeyParams = {
  description?: string;
  etag?: string;
  abort?: "never" | "modified" | "exists";
} & BaseQueryParams;

export type PutPageFileNamePropertiesKeyResponse = PageProperty;

export type PutPageImportParams = {
  behavior?: "sync" | "async";
  filename?: string;
  pageid?: number;
}

export type PutPageMoveParams = {
  parentid?: number;
  name?: string;
  title?: string;
  to?: string;
} & BaseQueryParams;

export type PutPageMoveResponse = {
  "page.moved?": {
    "@count"?: string;
    page?: Partial<PageBase> | Partial<PageBase>[] | "";
  } | "";
};

export type PutPageOrderParams = {
  afterid?: number;
};

export type PostPagePropertiesParams = {
  abort?: "never" | "modified" | "exists";
  description?: string;
}  & BaseQueryParams;

export type PostPagePropertiesResponse = PageProperty;

export type PutPagePropertiesParams = BaseQueryParams;

export type PutPagePropertiesResponse = {
  properties?: {
    "@count"?: string;
    "@href"?: string;
    property?: Partial<PageProperty> | Partial<PageProperty>[] | "";
  }
};

export type DeletePagePropertiesKeyParams = BaseQueryParams;

export type PutPagePropertiesKeyParams = {
  abort?: "never" | "modified" | "exists";
  description?: string;
  etag?: string;
} & BaseQueryParams;

export type PutPagePropertiesKeyResponse = PageProperty;

export type PostPageRatingsParams = {
  score: number;
} & BaseQueryParams;

export type PostPageRevertParams = {
  verbose?: boolean;
  abort?: "never" | "conflict";
  fromrevision?: string;
} & BaseQueryParams;

export type DeletePageSecurityParams = BaseQueryParams;

export type PostPageSecurityParams = {
  cascade?: "none" | "delta";
} & BaseQueryParams;

export type PostPageSecurityResponse = Partial<PageSecurity>;

export type PutPageSecurityParams = {
  cascade?: "none" | "delta" | "absolute";
} & BaseQueryParams;

export type PutPageSecurityResponse = Partial<PageSecurity>;

export type PutPageTagsParams = BaseQueryParams;

export type PutPageTagsResponse = Partial<Tags>;

export type PagePath = {
  "@seo": string;
  "@type": string;
  "#text": string;
};

export type Subpages = {
  page: Partial<Subpage>[] | Partial<Subpage>;
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
  path: Partial<PagePath> | "";
  subpages: Subpages | "";
  title: string;
  "uri.ui": string;
};

export type PageBase = {
  "@id": string;
  "@guid": string;
  "@draft.state": string;
  "@href": string;
  "@deleted": string;
  "@revision": string;
  "@terminal": string;
  "@subpages": string;
  "@files": string;
  article: string; 
  "date.created": string;
  "date.modified": string;
  language: string;
  namespace: string;
  path: Partial<PagePath> | "";
  restriction: string;
  security: Partial<PageSecurity> | "";
  title: string;
  "uri.ui": string;
};

export type PageExtended = {
  "@unpublish": string;
  aliases: {
    [key: string]: string;
  } | "";
  comments: {
    "@count"?: string;
    "@href"?: string;
  } | "";
  contents: Partial<Contents> | "";
  "contents.alt": {
    "@type": string;
    "@href": string;
  } | "";
  "date.edited": string;
  description: string;
  files: {
    "@count?": string;
    "@href?": string;
    file?: Partial<PageFile> | Partial<PageFile>[] | "";
  } | "";
  inbound: {
    "@count"?: string;
    page?: Partial<PageBase> | Partial<PageBase>[] | "";
  } | "";
  "language.effective": string;
  metrics: {
    "metric.charcount"?: string;
    "metric.views"?: string;
  } | "";
  outbound: {
    "@count"?: string;
    page?: Partial<PageBase> | Partial<PageBase>[] | "";
  } | "";
  "page.parent": Partial<PageBase> | "";
  "page.redirectedfrom": string;
  properties: {
    "@count"?: string;
    "@href"?: string;
    property?: PageProperty[];
  } | "";
  rating: Partial<PageRating> | "";
  revisions: Partial<PageRevision> | "";
  "revisions.archive": Partial<PageRevision> | "";
  subpages: {
    "@href"?: string;
  } | "";
  summary: string;
  tags: Partial<Tags> | "";
  timeuuid: string;
  "user.author": Partial<ExpertUser> | "";
  "user.createdby": Partial<ExpertUser> | "";
};

export type PageRating = {
  "@score": string;
  "@count": string;
  "@seated.score": string;
  "@seated.count": string;
  "@unseated.score": string;
  "@unseated.count": string;
  "@anonymous.score": string;
  "@anonymous.count": string;
}

export type PageRevision = {
  "@count": string;
  "@deprecated": string;
  "@totalcount": string;
  "@href": string;
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
  contents: Partial<Contents> | "";
  "contents.preview": Partial<ContentsPreview> | Partial<ContentsPreview>[] | "";
  "date.created": string;
  "date.last-modified": string;
  description: string;
  filename: string;
  "page.parent": Partial<PageBase> | "";
  revisions: Partial<PageRevision> | "";
  "user-action": {
    "@type"?: string;
  } | "";
  "user.createdBy": Partial<ExpertUser> | "";
};

export type PageTag = {
  "@value": string;
  "@id": string;
  "@href": string;
  title: string;
  type: string;
  uri: string;
  related: {
    "@count"?: string;
    page?: Partial<PageBase> | Partial<PageBase>[] | "";
  } | "";
};

export type Contents = {
  "@type": string;
  "@size": string;
  "@width": string;
  "@height": string;
  "@href": string;
  "#text": string;
  properties: {
    property: Partial<PageProperty> | Partial<PageProperty>[] | "";
  } | "";
}

export type ContentsPreview = {
  "@rel": string;
  "@type": string;
  "@maxwidth": string;
  "@maxheight": string;
  "@href": string;
  "@etag": string;
};

export type Tags = {
  "@count"?: string;
  "@href"?: string;
  tag?: Partial<PageTag> | Partial<PageTag>[] | "";
}

export type PageProperty = {
  "@etag": string;
  "@href": string;
  "@name": string;
  "@resid": string;
  "@resource-is-deleted": string;
  "@resource-rev-is-deleted": string;
  "@revision": string;
  "change-description": string;
  contents: Pick<Contents, '@href' | '@size' | '#text' | '@type'>;
  "date.modified": string;
  "user.modified": ExpertUser;
}

export type page_subpage = {
  "@totalcount": string;
  "@count": string;
  "@href": string;
  "page.subpage": Partial<PageBase> | Partial<PageBase>[] | "";
}

export type exprCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
  function: functionCall | functionCall[] | "";
}

export type functionCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
  "@location": string;
  expr: exprCall | exprCall[] | "";
}

export type importCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
  "@recursive": string;
  "@location": string;
  import: importCall | importCall[] | "";
}

export type pageCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
  import: importCall | importCall[] | "";
  template: templateCall | templateCall[] | "";
}

export type propertyCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
}

export type templateCall = {
  "@name": string;
  "@elapsed": string;
  "@avg": string;
  "@max": string;
  "@percent": string;
  "@count": string;
  "@mode": string;
  "@location": string;
  function: functionCall | functionCall[] | "";
  property: propertyCall | propertyCall[] | "";
  template: templateCall | templateCall[] | "";
}

export type Entry = {
  "@name": string;
  "@value": string;
}

export type Query = {
  "@name": string;
  "@elapsed": string;
  "@average": string;
  "@max": string;
  "@count": string;
}

export type DeletedPage = {
  "@id": number;
  "@href": string;
  title: string;
  path: string;
}

export type Allowed = {
  "@id": string;
}