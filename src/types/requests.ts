export type BaseQueryParams = {
    authenticate?: boolean;
    redirects?: number;
}

export type PaginationQueryParams = {
    offset?: number;
    limit?: string
}

export type RequestModeQueryParam = 'edit' | 'view' | 'raw';