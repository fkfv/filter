import ModuleList from '../module/list';

import {MessageType} from '../../common/message/message';
import {MessageHandler, Try} from '../../common/message/handler';
import {Message} from '../../common/messaging/event';
import {ErrorResponse, BlockerListResponse, BlockerBlockedResponse,
  BlockerAddResponse,
  BlockerRemoveResponse} from '../../common/message/builder';

import type {BlockerListRequest, BlockerBlockedRequest, BlockerAddRequest,
  BlockerRemoveRequest} from '../../common/message/message';
import type {Blockable} from '../module/module';

const BlockerHandler = (list: ModuleList) => (msg: Message): boolean => {
  return MessageHandler(msg, {
    [MessageType.BlockerListRequest]: (request: BlockerListRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module does not exist'));
      } else {
        msg.reply(BlockerListResponse(module.name as string,
                                      module.blockables as Blockable[]));
      }
    },
    [MessageType.BlockerBlockedRequest]: (request: BlockerBlockedRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module does not exist'));
      } else {
        const blocker = list.manager.blockManager.create(module);
        Try(blocker.get(request.payload.blocker), msg, blocked => {
          msg.reply(BlockerBlockedResponse(request.payload.module,
                                           request.payload.blocker,
                                           blocked));
        });
      }
    },
    [MessageType.BlockerAddRequest]: (request: BlockerAddRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module does not exist'));
      } else {
        const blocker = list.manager.blockManager.create(module);
        Try(blocker.add(request.payload.blocker,
                        request.payload.item), msg, () => {
          msg.reply(BlockerAddResponse());
        });
      }
    },
    [MessageType.BlockerRemoveRequest]: (request: BlockerRemoveRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module does not exist'));
      } else {
        const blocker = list.manager.blockManager.create(module);
        Try(blocker.remove(request.payload.blocker,
                           request.payload.item), msg, () => {
          msg.reply(BlockerRemoveResponse());
        });
      }
    }
  });
};

export default BlockerHandler;
