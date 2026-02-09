import { AuthObject, ServerTokenParams, BrowserTokenParams } from './auth';

export * from './auth';
export * from './pages';
export * from './requests';
export * from './security';
export * from './groups';
export * from './archive';
export * from './events';
export * from './site';
export * from './contextMaps';
export * from './users';
export * from './files';

// Auth configuration types
export type AuthConfig =
  | { type: 'server', params: ServerTokenParams }
  | { type: 'browser', params: BrowserTokenParams }
  | null;

export type BaseArgs = {
    auth?: AuthObject;
    tld?: string
}

export type ExpertGlobalOptions = {
    tld?: string;
    auth?: AuthConfig;
}