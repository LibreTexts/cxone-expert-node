export type ExpertUser = {
    '@anonymous': string;
    '@virtual': string;
    '@id': string;
    '@wikiid': string;
    '@href': string;
    '@guid': string;
    nick: string;
    username: string | '#RESTRICTED'
}

export type PageSecurity = {
    '@href': string;
    grants: {
        grant: SecurityGrant | SecurityGrant[]
    },
    'permissions.effective': SecurityGrantPermissions | SecurityGrantPermissions[]
    'permissions.page': SecurityGrantPermissions & SecurityGrantPermissionsRestriction | SecurityGrantPermissions & SecurityGrantPermissionsRestriction[]
    'permissions.revoked': Record<string, { operations: SecurityGrantPermissionsOperations | SecurityGrantPermissionsOperations[] }>
}

export type SecurityGrant = {
    'date.modified': string;
    permissions: SecurityGrantPermissions;
    user: ExpertUser
    'user.modifiedby': ExpertUser
}

export type SecurityGrantPermissions = {
    operations: SecurityGrantPermissionsOperations | SecurityGrantPermissionsOperations[]
    role: SecurityRole | SecurityRole[]
}

export type SecurityGrantPermissionsOperations = {
    '@mask': string;
    '#text': string;
}

export type SecurityGrantPermissionsRestriction = {
    '@id': string;
    '#text': string;
}

export type SecurityRole = {
    '@id': string;
    '@href': string;
    '#text': string;
}