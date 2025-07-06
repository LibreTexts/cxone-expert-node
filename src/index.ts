import pages from './modules/pages';
import auth from './modules/auth';
import requests from './modules/requests';
import { AuthObject, BaseArgs, BrowserTokenParams, ExpertGlobalOptions, ServerTokenParams } from './types';
import Pages from './modules/pages';
import Groups from './modules/groups';
import Archive from './modules/archive';
import Site from './modules/site';

export * from './types/index';

export default class Expert {
    private globals: ExpertGlobalOptions = {};
    private _pages?: Pages;
    private _groups?: Groups;
    private _site?: Site;
    private _auth?: auth;
    private _archive?: Archive;

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

    public get site(): Site {
        if (!this._site) {
            this._site = new Site(this.globals);
        }

        return this._site;
    }

    public get archive(): Archive {
        if (!this._archive) {
            this._archive = new Archive(this.globals);
        }

        return this._archive;
    }

    public get groups(): Groups {
        if (!this._groups) {
            this._groups = new Groups(this.globals);
        }

        return this._groups;
    }

}
