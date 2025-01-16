import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";

export type GetGroupsParams = {
    authProvider?: number;
    groupnamefilter?: string;
    sortby?: "id" | "name" | "role" | "service";
    authenticate?: boolean;
} & PaginationQueryParams;

export type GetGroupParams = {
    authenticate?: boolean;
}

export type GetGroupUserParams = {
    sortby?: "id" | "username" | "nick" | "email" | "fullname" | "date.lastlogin" | "status" | "role" | "service";
    authenticate?: boolean;
    activatedfilter?: boolean;
    rolefilter?: string;
    usernamefilter?: string;
} & PaginationQueryParams;






export type GetGroupsResponse = {
    "@count": string;
    "@querycount": string;
    "@href": string;
    "group": Group | Group[];
};

export type GetGroupResponse = Group;

export type GetGroupUserResponse = {
    "@count": string;
    "@querycount": string;
    "@href": string;
    "user": GroupUser | GroupUser[]
};

export type Group = {
    "@id": string;
    "@href": string;
    "@guid": string;
    "groupname": string;
    "permissions.group": GroupPermissions;
    "service.authentication": {
        "@id": string;
        "@href": string;
    };
    "users": {
        "@count": string;
        "@href": string;
    }
};

export type GroupPermissions = {
    "operations": {
        "@mask": string;
        "#text": string;
    };
    "role": {
        "@id": string;
        "@href": string;
        "#text": string;
    };
};

export type GroupUser = {
    "@anonymous": string;
    "@virtual": string;
    "@id": string;
    "@wikiid": string;
    "@href": string;
    "@guid": string;
    "date.created": string;
    "date.lastlogin": string;
    "email": string;
    "fullname": string;
    "hash.email": string;
    "license.seat": string;
    "nick": string;
    "password": {
        "@exists": string;
    }
    "status": string;
    "uri.avatar": string;
    "uri.gravatar": string;
    "username": string;
};
