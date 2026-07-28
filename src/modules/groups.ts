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
import BaseModule from "./base";

export default class Groups extends BaseModule {
  constructor(globals: ExpertGlobalOptions) {
    super(globals, "groups");
  }

  private parseGroupId(id: string | number) {
    if (typeof id === "number") {
      return id.toString();
    }
    return `=${encodeURIComponent(id)}`;
  }

  public async getGroups(
      reqArgs?: GetGroupsParams,
      funcArgs?: BaseArgs
  ) {
      this.debug('getGroups called');
      const requests = this.prepare(funcArgs);

      const res = await requests.get<GetGroupsResponse>(`/groups`, {
        params: {
            ...reqArgs,
        },
      });
      this.debug('getGroups completed successfully');
      return res.data;
    }

  public async getGroup(
      id: string | number,
      reqArgs?: GetGroupParams,
      funcArgs?: BaseArgs
    ) {
      this.debug('getGroup called for:', id);
      const groupId = this.parseGroupId(id);
      const requests = this.prepare(funcArgs);

      const res = await requests.get<GetGroupResponse>(`/groups/${groupId}`, {
        params: {
          ...reqArgs,
        },
      });
      this.debug('getGroup completed successfully');
      return res.data;
    }

    public async getGroupUser(
        id: string | number,
        reqArgs?: GetGroupUserParams,
        funcArgs?: BaseArgs
      ) {
        this.debug('getGroupUser called for:', id);
        const groupId = this.parseGroupId(id);
        const requests = this.prepare(funcArgs);

        const res = await requests.get<GetGroupUserResponse>(`/groups/${groupId}/users`, {
          params: {
            ...reqArgs,
          },
        });
        this.debug('getGroupUser completed successfully');
        return res.data;
      }
}
