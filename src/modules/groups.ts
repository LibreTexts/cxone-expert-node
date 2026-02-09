import {
    BaseArgs,
    ExpertGlobalOptions,
    GetGroupsParams,
    GetGroupsResponse,
    GetGroupParams,
    GetGroupResponse,
    GetGroupUserParams,
    GetGroupUserResponse
  } from "../types";
  import { getTld, getAuth } from "../utils";
  import Auth from "./auth";
  import Requests from "./requests";

export default class Groups {
  private globals: ExpertGlobalOptions;
  private _auth?: Auth;

  constructor(args: ExpertGlobalOptions, auth?: Auth) {
    this.globals = args;
    this._auth = auth;
  }

  private parseGroupId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    return `=${encodeURIComponent(id)}`;
  }

  public async getGroups(
      funcArgs: BaseArgs = {},
      reqArgs?: GetGroupsParams
  ) {
      const tld = getTld(this.globals, funcArgs.tld);
      const auth = getAuth(this.globals, funcArgs.auth);
      const requests = new Requests(tld, auth);

      const res = await requests.get<GetGroupsResponse>(`/groups`, {
        params: {
            ...reqArgs,
        },
      });
      return res.data;
    }

  public async getGroup(
      id: string | number,
      funcArgs: BaseArgs = {},
      reqArgs?: GetGroupParams
    ) {
      const groupId = this.parseGroupId(id);
      const tld = getTld(this.globals, funcArgs.tld);
      const auth = getAuth(this.globals, funcArgs.auth);
      const requests = new Requests(tld, auth);
  
      const res = await requests.get<GetGroupResponse>(`/groups/${groupId}`, {
        params: {
          ...reqArgs,
        },
      });
      return res.data;
    }

    public async getGroupUser(
        id: string | number,
        funcArgs: BaseArgs = {},
        reqArgs?: GetGroupUserParams
      ) {
        const groupId = this.parseGroupId(id);
        const tld = getTld(this.globals, funcArgs.tld);
        const auth = getAuth(this.globals, funcArgs.auth);
        const requests = new Requests(tld, auth);
    
        const res = await requests.get<GetGroupUserResponse>(`/groups/${groupId}/users`, {
          params: {
            ...reqArgs,
          },
        });
        return res.data;
      }
}
