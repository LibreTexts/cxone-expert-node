import { AuthObject, ExpertGlobalOptions } from "./types";
import Auth from './modules/auth';

export function getTld(globals: ExpertGlobalOptions, tld?: string) {
    if (!tld && !globals.tld) {
        throw new Error('TLD is required');
    }
    return tld ?? globals.tld;
}

export function getAuth(globals: ExpertGlobalOptions, authOverride?: AuthObject): AuthObject {
    // Per-call override provided - use it directly
    if (authOverride) {
        return authOverride;
    }

    // Fall back to global auth config
    if (globals.auth) {
        const authInstance = new Auth();

        if (globals.auth.type === 'server') {
            return authInstance.ServerToken(globals.auth.params).getHeader();
        } else if (globals.auth.type === 'browser') {
            return authInstance.BrowserToken(globals.auth.params).getHeader();
        }
    }

    throw new Error('Authentication is required. Configure auth in Expert constructor or pass auth to method call.');
}
