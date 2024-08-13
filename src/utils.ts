import { ExpertGlobalOptions } from "./types";

export function getTld(globals: ExpertGlobalOptions, tld?: string) {
    if (!tld && !globals.tld) {
        throw new Error('TLD is required');
    }
    return tld ?? globals.tld;
}
