import { AuthObject, BrowserTokenParams, ServerTokenParams } from "../types";
import { createHmac } from 'crypto';

export default class Auth {
    private token: string | null = null;

    public BrowserToken({ key }: BrowserTokenParams) {
        this.token = key;
        return this;
    }

    public ServerToken({ key, secret, user }: ServerTokenParams) {
        if(!key || !secret || !user) {
            throw new Error("Missing required parameters: key, secret, user");
        }
        
        const epoch = Math.floor(Date.now() / 1000);
        const hmac = createHmac('sha256', secret);
        hmac.update(`${key}${epoch}=${user}`);
        const hash = hmac.digest('hex');
        this.token = `${key}_${epoch}_=${user}_${hash}`;
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

