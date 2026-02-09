import pages from './modules/pages';
import auth from './modules/auth';
import requests from './modules/requests';
import { AuthConfig, AuthObject, BaseArgs, BrowserTokenParams, ExpertGlobalOptions, ServerTokenParams } from './types';
import Pages from './modules/pages';
import Groups from './modules/groups';
import Events from './modules/events';
import Archive from './modules/archive';
import Site from './modules/site';
import contextMaps from './modules/contextMaps';
import Users from './modules/users';
import Files from './modules/files';

export * from './types/index';

export default class Expert {
    private globals: ExpertGlobalOptions = {};
    private _pages?: Pages;
    private _groups?: Groups;
    private _site?: Site;
    private _auth?: auth;
    private _archive?: Archive;
    private _events?: Events;
    private _contextMaps?: contextMaps;
    private _users?: Users;
    private _files?: Files;

    constructor(options?: { tld?: string; auth?: AuthConfig }) {
        if (options) {
            if (options.tld) this.globals.tld = options.tld;
            if (options.auth) this.globals.auth = options.auth;
        }
    }

    public setAuth(authConfig: AuthConfig): this {
        this.globals.auth = authConfig;
        return this;
    }

    public configureServerAuth(params: ServerTokenParams): this {
        this.globals.auth = { type: 'server', params };
        return this;
    }

    public configureBrowserAuth(params: BrowserTokenParams): this {
        this.globals.auth = { type: 'browser', params };
        return this;
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

    public get events(): Events {
        if (!this._events) {
            this._events = new Events(this.globals);
        }

        return this._events;
    }

    public get contextMaps(): contextMaps {
        if (!this._contextMaps) {
            this._contextMaps = new contextMaps(this.globals);
        }
        return this._contextMaps;
    }

    public get users(): Users {
        if (!this._users) {
            this._users = new Users(this.globals);
        }

        return this._users;
    }

    public get files(): Files {
        if (!this._files) {
            this._files = new Files(this.globals);
        }

        return this._files;
    }

}
