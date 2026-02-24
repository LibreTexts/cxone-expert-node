import pages from './modules/pages';
import auth from './modules/auth';
import { AuthConfig, BrowserTokenParams, ExpertGlobalOptions, ServerTokenParams } from './types';
import Pages from './modules/pages';
import Groups from './modules/groups';
import Events from './modules/events';
import Archive from './modules/archive';
import Site from './modules/site';
import contextMaps from './modules/contextMaps';
import Users from './modules/users';
import Files from './modules/files';
import { createDebugLogger } from './utils';
import type { Debugger } from 'debug';

export * from './types/index';

export default class Expert {
    private globals: ExpertGlobalOptions = {};
    private debug: Debugger;
    private _pages?: Pages;
    private _groups?: Groups;
    private _site?: Site;
    private _auth?: auth;
    private _archive?: Archive;
    private _events?: Events;
    private _contextMaps?: contextMaps;
    private _users?: Users;
    private _files?: Files;

    constructor(options?: { tld?: string; auth?: AuthConfig; debug?: boolean }) {
        if (options) {
            if (options.tld) this.globals.tld = options.tld;
            if (options.auth) this.globals.auth = options.auth;
            if (options.debug !== undefined) this.globals.debug = options.debug;
        }
        
        this.debug = createDebugLogger('cxone-expert-node', this.globals.debug);
        this.debug('Debug logging enabled for cxone-expert-node. This is not recommended for production use as credentials may be exposed in log files!');
        this.debug('Expert instance created with options:', options);
    }

    public setAuth(authConfig: AuthConfig): this {
        this.globals.auth = authConfig;
        this.debug('Authentication configured:', authConfig);
        return this;
    }

    public configureServerAuth(params: ServerTokenParams): this {
        this.globals.auth = { type: 'server', params };
        this.debug('Server authentication configured:', params);
        return this;
    }

    public configureBrowserAuth(params: BrowserTokenParams): this {
        this.globals.auth = { type: 'browser', params };
        this.debug('Browser authentication configured:', params);
        return this;
    }

    public get pages(): Pages {
        if (!this._pages) {
            this.debug('Initializing Pages module');
            this._pages = new pages(this.globals);
        }

        return this._pages;
    }

    public get auth(): auth {
        if (!this._auth) {
            this.debug('Initializing Auth module');
            this._auth = new auth();
        }

        return this._auth;
    }

    public get site(): Site {
        if (!this._site) {
            this.debug('Initializing Site module');
            this._site = new Site(this.globals);
        }

        return this._site;
    }

    public get archive(): Archive {
        if (!this._archive) {
            this.debug('Initializing Archive module');
            this._archive = new Archive(this.globals);
        }

        return this._archive;
    }

    public get groups(): Groups {
        if (!this._groups) {
            this.debug('Initializing Groups module');
            this._groups = new Groups(this.globals);
        }

        return this._groups;
    }

    public get events(): Events {
        if (!this._events) {
            this.debug('Initializing Events module');
            this._events = new Events(this.globals);
        }

        return this._events;
    }

    public get contextMaps(): contextMaps {
        if (!this._contextMaps) {
            this.debug('Initializing Context Maps module');
            this._contextMaps = new contextMaps(this.globals);
        }
        return this._contextMaps;
    }

    public get users(): Users {
        if (!this._users) {
            this.debug('Initializing Users module');
            this._users = new Users(this.globals);
        }

        return this._users;
    }

    public get files(): Files {
        if (!this._files) {
            this.debug('Initializing Files module');
            this._files = new Files(this.globals);
        }

        return this._files;
    }
}
