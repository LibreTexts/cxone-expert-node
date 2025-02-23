import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
import { ExpertUser, PageSecurity } from "./security";

export type GetArchiveParams = {
    authenticate?: boolean;
};

export type GetArchiveFilesParams = {
    authenticate?: boolean;
} & PaginationQueryParams;

export type GetArchiveFileParams = {
    authenticate?: boolean;
}

export type GetArchivePagesParams = BaseQueryParams & PaginationQueryParams;

export type GetArchivePageParams = {
    authenticate?: boolean;
}

export type GetArchiveResponse = {
    "files.archive": {
        "@href": string;
    };
    "pages.archive": {
        "@href": string;
    };
};

export type GetArchiveFilesResponse = {
    "@count": string;
    "@offset": string;
    "file.archive": ArchiveFile | ArchiveFile[];
};

export type GetArchiveFileInfoResponse = ArchiveFile;

export type GetArchivePagesResponse = {
    "@querycount": string;
    "page.archive": ArchivePage | ArchivePage[];
}

export type GetArchivePageResponse = ArchivePage;

export type GetArchivePageInfoResponse = ArchivePage;

export type GeetArchivePageSubPagesResponse = {
    
}
export type GetArchivePageContentsResponse = {
    "@type": string;
    body: any[];
};

export type GetArchivePageSubPagesResponse = {
    "page.archive"?: ArchivePage | ArchivePage[];
}

export type ArchiveFile = {
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
    "date.deleted"?: string;
    "date.last-modified": string;
    description: string;
    filename: string;
    "page.parent"?: object;
    "properties"?: object;
    "user-action": {
        "@type": string;
    };
    "user.createdby": ExpertUser;
    "user.deletedby"?: ExpertUser;
};

export type ArchivePage = {
    "@id": string;
    "@href": string;
    contents: object;
    "date.deleted": string;
    "path": string;
    "subpages"?: object;
    "title": string;
    "user.deleted": ExpertUser;
};


