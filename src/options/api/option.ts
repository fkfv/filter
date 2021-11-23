import Connection from '../../common/messaging/connection';

import {OptionListRequest, OptionGetRequest,
  OptionSetRequest} from '../../common/message/builder';
import {OptionListResponse, OptionGetResponse,
  OptionSetResponse} from '../../common/message/message';
import {ApiSend} from './';


const OptionList = async (connection: Connection, module: string) => {
  const options = await ApiSend<OptionListResponse>(connection,
                                                    OptionListRequest(module));

  return options.payload.options;
};

const OptionGet = async (connection: Connection,
                         module: string, option: string) => {
  const response = await ApiSend<OptionGetResponse>(connection,
                                                    OptionGetRequest(module,
                                                                     option));

  return response.payload.value;
};

const OptionSet = async (connection: Connection, module: string, option: string,
                         value: boolean|string|number) => {
  await ApiSend<OptionSetResponse>(connection, OptionSetRequest(module, option,
                                                                value));
};

export {OptionList, OptionGet, OptionSet};
