import { AuthObject } from './auth';

export * from './auth';
export * from './pages';
export * from './requests';
export * from './security';

export type BaseArgs = {
    auth: AuthObject;
    tld?: string
}

export type ExpertGlobalOptions = {
    tld?: string;
}