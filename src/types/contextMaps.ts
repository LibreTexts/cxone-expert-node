import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
import { ExpertUser, PageSecurity } from "./security";
import type { OneOrMany } from "./index";


export type GetContextMapParams = {
    contextid?: string;
    mapped?: boolean;
    language?: string;
    verbose?: boolean;
    languagesonly?: boolean;
}

export type GetContextMapByIdParams = {
    authenticate?: boolean;
    id?: string;
    verbose?: boolean;
    language?: string;
}

export type GetContextMapResponse = {
    languages: {
        language: OneOrMany<string>;
    };
    contextmap?: OneOrMany<Partial<ContextMap>>;
};

export type GetContextMapByIdResponse = {
    "@default": string;
    "@exists": string;
    id: string;
    language: string;
    pageid: string;
}

type ContextMap = {
    "@default": string;
    "@exists": string;
    id: string;
    description: string;
    language: string;
};
  