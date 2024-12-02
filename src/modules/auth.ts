import { AuthObject, BrowserTokenParams, ServerTokenParams } from "../types";
import { createHmac } from 'crypto';

export default class Auth {
    private token: string | null = null;

    public BrowserToken({ key }: BrowserTokenParams) {
        this.token = key;
        return this;
    }

    public ServerToken({ key, secret, user }: ServerTokenParams) {
        const hmac = createHmac('sha256', secret);
        const epoch = Math.floor(Date.now() / 1000);
        hmac.update(`${key}_${epoch}_${user}`);
        const hash = hmac.digest('hex');
        this.token = `tkn_${key}_${epoch}_${user}_${hash}`;
        return this;
    }

    public getToken() {
        return this.token;
    }

    public getHeader(): AuthObject {
        return {
            'X-Deki-Token': this.token
        }
    }
}

