import type { Group } from "./groups";
import type { Maybe, OneOrMany, Scalar } from "./index";

export type ExpertUser = {
    '@anonymous': string;
    '@virtual': string;
    '@id': string;
    '@wikiid': string;
    '@href': string;
    '@guid': string;
    'date.created': string;
    /** Absent for users who have never signed in. */
    'date.lastlogin'?: string;
    email: string;
    /** The identifier at the external auth provider. Absent for local accounts and bots. */
    externalname?: string;
    fullname: string;
    "hash.email": string;
    /** Plain `"true"`/`"false"`, or `{ "@owner": "true", "#text": "true" }` for the site owner. Read with `text()`. */
    "license.seat": Scalar;
    nick: string;
    password: Maybe<{
        "@exists": string
    }>;
    status: string;
    /** Only present when the account has an explicit timezone preference. */
    timezone?: string;
    "uri.avatar": string;
    "uri.gravatar": string;
    /** `#RESTRICTED` when the caller lacks permission to see the real username. */
    username: string;
}

export type PageSecurity = {
    '@href': string;
    grants: Maybe<{
        grant?: OneOrMany<SecurityGrant>
    }>;
    'permissions.effective': Maybe<SecurityPermissions>;
    'permissions.page': Maybe<SecurityPagePermissions>;
    /**
     * TODO: shape unconfirmed. Every observed response returns `""`; a sample
     * with revoked permissions is needed to type the populated form.
     */
    'permissions.revoked': Maybe<{
        operations?: OneOrMany<SecurityOperations>
    }>;
}

/**
 * Shared by every permissions block. `permissions.effective` returns exactly
 * this and nothing more.
 */
export type SecurityPermissions = {
    operations: OneOrMany<SecurityOperations>;
}

/** `permissions.page`: operations plus the page's restriction. Carries no role. */
export type SecurityPagePermissions = SecurityPermissions & {
    restriction: Maybe<SecurityRestriction>;
}

/** A grant's permissions: operations plus the granted role. */
export type SecurityGrantPermissions = SecurityPermissions & {
    role: OneOrMany<SecurityRole>;
}

type SecurityGrantBase = {
    'date.modified': string;
    permissions: SecurityGrantPermissions;
    'user.modifiedby': Partial<ExpertUser>;
}

/** A grant to an individual user. */
export type SecurityUserGrant = SecurityGrantBase & {
    user: Partial<ExpertUser>;
    group?: never;
}

/** A grant to a group. Carries a slim group record, not the full group resource. */
export type SecurityGroupGrant = SecurityGrantBase & {
    group: Partial<Group>;
    user?: never;
}

/**
 * A permission grant. Targets a user or a group, never both, so `grant.user`
 * narrows the union.
 *
 * @example
 * ```ts
 * for (const grant of many(security.grants && security.grants.grant)) {
 *   const who = grant.user ? grant.user.fullname : grant.group.groupname;
 * }
 * ```
 */
export type SecurityGrant = SecurityUserGrant | SecurityGroupGrant;

export type SecurityOperations = {
    '@mask': string;
    '#text': string;
}

/** The page's restriction level, e.g. `Public`, `Semi-Public`, `Private`. */
export type SecurityRestriction = {
    '@id': string;
    '#text': string;
}

export type SecurityRole = {
    '@id': string;
    '@href': string;
    '#text': string;
}

/** @deprecated Renamed to {@link SecurityOperations}. */
export type SecurityGrantPermissionsOperations = SecurityOperations;

/** @deprecated Renamed to {@link SecurityRestriction}. */
export type SecurityGrantPermissionsRestriction = SecurityRestriction;
