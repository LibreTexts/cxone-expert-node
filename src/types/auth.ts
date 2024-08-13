
export type BrowserTokenParams = {
    key: string;
}

export type ServerTokenParams = {
    key: string;
    secret: string;
    user: string;
}

export type AuthObject = {
    'X-Deki-Token': string | null;
}