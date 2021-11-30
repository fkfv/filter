import ModuleManager from '../module/manager';
import ModuleList from '../module/list';
import Module from '../module/module';

import {MessageType} from '../../common/message/message';
import {MessageHandler, Try} from '../../common/message/handler';
import {Message} from '../../common/messaging/event';
import {ModuleResponse, ModuleListResponse, ModuleLoadResponse,
  ModuleUnloadResponse} from '../../common/message/builder';

import type {ModuleRequest, ModuleListRequest, ModuleLoadRequest,
  ModuleUnloadRequest} from '../../common/message/message';


const FilterModule = (manager: ModuleManager, request: ModuleRequest) => {
  return Object.fromEntries(Object.entries(manager.loadedModules)
    .filter(([_, module]: [any, Module]) => {
      return (module.match as RegExp).test(request.payload.url);
    })
    .map(([_, module]: [any, Module]) => {
      return [module.name as string, module.sources.blocker as string];
    }));
};

const ModuleHandler = (list: ModuleList) => (msg: Message): boolean => {
  return MessageHandler(msg, {
    [MessageType.ModuleRequest]: (request: ModuleRequest) => {
      msg.reply(ModuleResponse(request.payload.url,
                               FilterModule(list.manager, request)));
    },
    [MessageType.ModuleListRequest]: (_: ModuleListRequest) => {
      Try(list.list(), msg, (modules) => {
        msg.reply(ModuleListResponse(modules));
      });
    },
    [MessageType.ModuleLoadRequest]: (request: ModuleLoadRequest) => {
      Try(manager.loadModule(request.payload.url), msg, (module: Module) => {
        msg.reply(ModuleLoadResponse(module.name as string));
      });
    },
    [MessageType.ModuleUnloadRequest]: (request: ModuleUnloadRequest) => {
      Try(manager.unloadModule(request.payload.module), msg, () => {
        msg.reply(ModuleUnloadResponse());
      });
    }
  });
};

export default ModuleHandler;
