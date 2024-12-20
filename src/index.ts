import pages from './modules/pages';
import auth from './modules/auth';
import requests from './modules/requests';
import { AuthObject, BaseArgs, BrowserTokenParams, ExpertGlobalOptions, ServerTokenParams } from './types';
import Pages from './modules/pages';


export default class Expert {
    private globals: ExpertGlobalOptions = {};
    private _pages?: Pages;
    private _auth?: auth;

    constructor(tld?: string) {
        if (tld) {
            this.globals.tld = tld;
        }
    }

    public get pages(): Pages {
        if (!this._pages) {
            this._pages = new pages(this.globals);
        }

        return this._pages;
    }

    public get auth(): auth {
        if (!this._auth) {
            this._auth = new auth();
        }

        return this._auth;
    }

}