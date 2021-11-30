import Connection from '../../common/messaging/connection';

import {ModuleListRequest, ModuleActivateRequest, ModuleDeactivateRequest,
  ModuleAddRequest, ModuleRemoveRequest} from '../../common/message/builder';
import {ApiSend} from './';

import type {ModuleListResponse, ModuleActivateResponse,
  ModuleDeactivateResponse, ModuleAddResponse,
  ModuleRemoveResponse} from '../../common/message/message';


const ModuleList = async (connection: Connection) => {
  const modules = await ApiSend<ModuleListResponse>(connection,
                                                    ModuleListRequest());

  return modules.payload.modules;
};

const ModuleActivate = async (connection: Connection, module: string) => {
  await ApiSend<ModuleActivateResponse>(connection,
                                        ModuleActivateRequest(module));
};

const ModuleDeactivate = async (connection: Connection, module: string) => {
  await ApiSend<ModuleDeactivateResponse>(connection,
                                          ModuleDeactivateRequest(module));
};

const ModuleAdd = async (connection: Connection, url: string) => {
  const module = await ApiSend<ModuleAddResponse>(connection,
                                                  ModuleAddRequest(url));

  return module.payload.module;
};

const ModuleRemove = async (connection: Connection, module: string) => {
  await ApiSend<ModuleRemoveResponse>(connection,
                                      ModuleRemoveRequest(module));
};

export {ModuleList, ModuleActivate, ModuleDeactivate, ModuleAdd, ModuleRemove};
