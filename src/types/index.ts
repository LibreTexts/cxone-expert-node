import { AuthObject } from './auth';

export * from './auth';
export * from './pages';
export * from './requests';
export * from './security';
export * from './groups';
export * from './archive';
export * from './events';

export type BaseArgs = {
    auth: AuthObject;
    tld?: string
}

export type ExpertGlobalOptions = {
    tld?: string;
}