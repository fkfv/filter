import ModuleManager from '../module/manager';
import ModuleList from '../module/list';
import Module from '../module/module';

import {MessageType} from '../../common/message/message';
import {MessageHandler, Try} from '../../common/message/handler';
import {Message} from '../../common/messaging/event';
import {ModuleResponse, ModuleListResponse, ModuleActivateResponse,
  ModuleDeactivateResponse, ModuleAddResponse,
  ModuleRemoveResponse} from '../../common/message/builder';

import type {ModuleRequest, ModuleListRequest, ModuleActivateRequest,
  ModuleDeactivateRequest, ModuleAddRequest,
  ModuleRemoveRequest} from '../../common/message/message';


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
    [MessageType.ModuleActivateRequest]: (request: ModuleActivateRequest) => {
      Try(list.activate(request.payload.module), msg, (module) => {
        msg.reply(ModuleActivateResponse(module.name));
      });
    },
    [MessageType.ModuleDeactivateRequest]: (request: ModuleDeactivateRequest) => {
      Try(list.deactivate(request.payload.module), msg, (module) => {
        msg.reply(ModuleDeactivateResponse(module.name));
      })
    },
    [MessageType.ModuleAddRequest]: (request: ModuleAddRequest) => {
      Try(list.add(request.payload.url), msg, (module) => {
        msg.reply(ModuleAddResponse(module.name));
      });
    },
    [MessageType.ModuleRemoveRequest]: (request: ModuleRemoveRequest) => {
      Try(list.remove(request.payload.module), msg, () => {
        msg.reply(ModuleRemoveResponse(request.payload.module));
      })
    }
  });
};

export default ModuleHandler;
