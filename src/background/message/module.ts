import ModuleManager from '../module/manager';
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

const ListModule = (manager: ModuleManager) => {
  return Object.values(manager.loadedModules).map(module => {
    if (typeof module.description === 'undefined') {
      return {
        url: module.sources.manifest,
        name: module.name as string
      };
    } else {
      return {
        url: module.sources.manifest,
        name: module.name as string,
        description: module.description
      };
    }
  });
};

const ModuleHandler = (manager: ModuleManager) => (msg: Message): boolean => {
  return MessageHandler(msg, {
    [MessageType.ModuleRequest]: (request: ModuleRequest) => {
      msg.reply(ModuleResponse(request.payload.url,
                               FilterModule(manager, request)));
    },
    [MessageType.ModuleListRequest]: (_: ModuleListRequest) => {
      msg.reply(ModuleListResponse(ListModule(manager)));
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
