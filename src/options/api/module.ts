import Connection from '../../common/messaging/connection';

import {ModuleListRequest, ModuleLoadRequest,
  ModuleUnloadRequest} from '../../common/message/builder';
import {ModuleListResponse, ModuleLoadResponse,
  ModuleUnloadResponse} from '../../common/message/message';
import {ApiSend} from './';


const ModuleList = async (connection: Connection) => {
  const modules = await ApiSend<ModuleListResponse>(connection,
                                                    ModuleListRequest());

  return modules.payload.modules;
};

const ModuleLoad = async (connection: Connection,
                          url: string): Promise<string> => {
  const name = await ApiSend<ModuleLoadResponse>(connection,
                                                 ModuleLoadRequest(url));

  return name.payload.module;
};

const ModuleUnload = async (connection: Connection,
                            name: string): Promise<void> => {
  await ApiSend<ModuleUnloadResponse>(connection, ModuleUnloadRequest(name));
};

export {ModuleList, ModuleLoad, ModuleUnload};
