import ModuleList from '../module/list';

import {MessageType} from '../../common/message/message';
import {MessageHandler, Try} from '../../common/message/handler';
import {ErrorResponse, IdentifyResponse, BlockResponse,
  RefreshRequest} from '../../common/message/builder';

import type {IdentifyRequest,
  BlockRequest} from '../../common/message/message';


const IdentifyHandler = (list: ModuleList) => (msg: any): boolean => {
  return MessageHandler(msg, {
    [MessageType.IdentifyRequest]: (request: IdentifyRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module not found'));
      } else {
        const blocker = list.manager.blockManager.create(module);
        const matcher = Object.entries(request.payload.fields)
          .map(([field, value]: [string, string|string[]]) => {
            return [field, blocker.contains(field, value)];
          });

        Try(Promise.all(matcher), msg, (results) => {
          const matches = results.filter(([_, value]: [string, boolean]) => {
            return value;
          }).map(([name, _]: [string, boolean]) => {
            return name;
          });

          msg.reply(IdentifyResponse(module.name as string, matches.length > 0,
                                     matches));
        });
      }
    },
    [MessageType.BlockRequest]: (request: BlockRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module not found'));
      } else {
        const blocker = list.manager.blockManager.create(module);
        const waiting = Object.entries(request.payload.fields)
          .map(([name, value]: [string, string|string[]]) => {
            if (request.payload.action === 'add') {
              return blocker.add(name, value);
            } else {
              return blocker.remove(name, value);
            }
          });

        Try(Promise.all(waiting), msg, (_: any) => {
          msg.reply(BlockResponse());
          list.manager.connectionManager.broadcast(RefreshRequest());
        });
      }
    }
  });
};

export default IdentifyHandler;
 