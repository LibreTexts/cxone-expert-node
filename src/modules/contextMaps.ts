import {
    BaseArgs,
    ExpertGlobalOptions,
    GetContextMapParams,
    GetContextMapResponse,
    GetContextMapByIdParams,
    GetContextMapByIdResponse
} from "../types";
import BaseModule from "./base";

export default class contextMaps extends BaseModule {
    constructor(globals: ExpertGlobalOptions) {
        super(globals, "contextMaps");
    }

    public async getContextMaps(
        reqArgs?: GetContextMapParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getContextMaps called');
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetContextMapResponse>(`/contextmaps`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getContextMaps completed successfully');
        return res.data;
    }

    public async getContextMapsById(
        language: string,
        id: string | number,
        reqArgs?: GetContextMapByIdParams,
        funcArgs?: BaseArgs
    ) {
        this.debug('getContextMapsById called for:', language, id);
        const requests = this.prepare(funcArgs);
        const res = await requests.get<GetContextMapByIdResponse>(`/contextmaps/${language}/${id}`, {
          params: {
              ...reqArgs,
          },
        });
        this.debug('getContextMapsById completed successfully');
        return res.data;
    }

}
