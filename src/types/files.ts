import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
  import { ExpertUser, PageSecurity } from "./security";
  import { PageFile } from "./pages";

export type GetFileParams = {
    includeDeleted?: boolean;
    revision?: string;
    size?: "original" | "thumb" | "webview" | "bestfit" | "custom";
    format?: "jpg" | "png" | "bmp" | "gif";
    ratio?: "fixed"| "var";
    width?: number;
    height: number;
} & BaseQueryParams;

export type GetFileNameParams = GetFileParams;

export type GetFileDescriptionParams = {
    revision?: string;
} & BaseQueryParams;

export type GetFileInfoParams = {
    includeDeleted?: boolean;
    revision?: string;
} & BaseQueryParams;

export type GetFileInfoResponse = PageFile;

export type GetFilePropertiesParams = {
    names?: string;
    contentcutoff?: number;
} & BaseQueryParams;

export type GetFilePropertiesKeyParams = BaseQueryParams;

export type GetFilePropertiesKeyInfoParams = {
    contentcutoff?: number;
} & BaseQueryParams;

export type GetFileRevisionsParams = {
    changefilter?: "CONTENT" | "NAME" | "LANGUAGE" | "META" | "DELETEFLAG" | "PARENT";
} & BaseQueryParams;

export type GetFileRevisionsResponse = {
    "@count": string;
    "@totalcount": string;
    "@href": string;
    file: Partial<PageFile> | Partial<PageFile>[] | "";
}