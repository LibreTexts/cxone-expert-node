import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
  import { ExpertUser, PageSecurity } from "./security";
  import { PageFile, DeletePageFileNameDescriptionResponse } from "./pages";

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

export type DeleteFileParams = BaseQueryParams;

export type HeadFileParams = {
    includeDeleted?: boolean;
    revision?: string;
    size?: "original" | "thumb" | "webview" | "bestfit" | "custom";
    format?: "jpg" | "png" | "bmp" | "gif";
    ratio?: "fixed"| "var";
    width?: number;
    height: number;
} & BaseQueryParams;

export type PutFileParams = {
    description?: string;
} & BaseQueryParams;

export type PutFileResponse = DeletePageFileNameDescriptionResponse;

export type DeleteFileNameParams = BaseQueryParams;

export type HeadFileNameParams = HeadFileParams;

export type PutFileNameParams = PutFileParams;

export type PostFileCopyParams = {
    name?: string;
    to?: string;
} & BaseQueryParams;

export type PostFileCopyResponse = PageFile;

export type DelDescriptionFileParams = BaseQueryParams;

export type DelDescriptionFileResponse = DeletePageFileNameDescriptionResponse;
