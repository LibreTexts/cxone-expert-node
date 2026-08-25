import {
    BaseQueryParams,
    PaginationQueryParams,
    RequestModeQueryParam,
  } from "./requests";
  import type { ExpertUser } from "./security";
  import type { OneOrMany } from "./index";

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
    "group": OneOrMany<Partial<Group>>;
};

export type GetGroupResponse = Group;

export type GetGroupUserResponse = {
    "@count": string;
    "@querycount": string;
    "@href": string;
    "user": OneOrMany<Partial<ExpertUser>>;
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
