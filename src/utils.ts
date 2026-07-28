import { AuthObject, ExpertGlobalOptions } from "./types";
import Auth from './modules/auth';
import { ExpertError } from './errors';
import createDebug from 'debug';

export function createDebugLogger(namespace: string, enabled?: boolean) {
    const debugLogger = createDebug(namespace);
    if (enabled !== undefined) {
        debugLogger.enabled = enabled;
    }
    return debugLogger;
}

export function getTld(globals: ExpertGlobalOptions, tld?: string) {
    if (!tld && !globals.tld) {
        throw ExpertError.config('TLD is required');
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

    throw ExpertError.config('Authentication is required. Configure auth in Expert constructor or pass auth to method call.');
}

export function getHeaders(globals: ExpertGlobalOptions, headersOverride?: Record<string, string>): Record<string, string> | undefined {
    if (!globals.headers && !headersOverride) return undefined;
    return { ...globals.headers, ...headersOverride };
}

export function joinPaths(...parts: string[]): string {
    // Remove leading/trailing slashes from each part and join with a single slash
    return parts.map(part => part.replace(/^\/|\/$/g, '')).join('/');
}