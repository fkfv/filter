import ModuleManager from './module/manager';
import Module from './module/module';

import {FetchedEvent} from '../common/module/interface';
import {Message} from '../common/messaging/event';
import {MessageType, FetchResponse,
  ModuleResponse} from '../common/message/message';
import {ErrorResponse, ModuleRequest} from '../common/message/builder';
import {MessageHandler, Try} from '../common/message/handler';


const IndexHandler = (manager: ModuleManager) => (msg: Message) => {
  return MessageHandler(msg, {
    [MessageType.FetchResponse]: (response: FetchResponse) => {
      const module = manager.getModule(response.payload.module);
      if (!module) {
        msg.sender.send(ErrorResponse('Module is not loaded'));
      } else {
        if (typeof response.payload.error !== 'undefined') {
          const event = new FetchedEvent(response.payload.detail,
                                         response.payload.error);
          module.fetched.dispatchEvent(event);
        } else {
          const event = new FetchedEvent(response.payload.detail,
                                         response.payload.data,
                                         response.payload.cached);
          module.fetched.dispatchEvent(event);
        }
      }
    },
    [MessageType.RefreshRequest]: (_: any) => {
      Object.values(manager.loadedModules).forEach((module: Module) => {
        module.block.dispatchEvent(new Event('block'));
      });
    },
    [MessageType.ModuleRefreshRequest]: (_: any) => {
      const {protocol, hostname, pathname} = window.location;
      const host = `${protocol}//${hostname}${pathname}`;
      msg.sender.send(ModuleRequest(host));
    },
    [MessageType.ModuleResponse]: (response: ModuleResponse) => {
      const remove = Object.keys(manager.loadedModules)
        .filter(k => !Object.keys(response.payload.modules).includes(k));
      const add = Object.entries(response.payload.modules)
        .filter(([name, _]: [string, any]) => {
          return !Object.keys(manager.loadedModules).includes(name)
        });

      Try(Promise.all(remove.map(module => manager.unloadModule(module))), msg, (_: any) => {
        Try(Promise.all(add.map(([name, url]: [string, string]) => {
          return manager.loadModule(name, url)
        })), msg, (modules: Module[]) => {
          modules.forEach(module => module.refresh());
        });
      });
    }
  });
};

export default IndexHandler;
