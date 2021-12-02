import Connection from '../../common/messaging/connection';

import {ModuleListRequest} from '../../common/message/builder';
import {ApiSend} from './';

import type {ModuleListResponse} from '../../common/message/message';


const ModuleList = async (connection: Connection) => {
  const modules = await ApiSend<ModuleListResponse>(connection,
                                                    ModuleListRequest());

  return modules.payload.modules;
};

export {ModuleList};
