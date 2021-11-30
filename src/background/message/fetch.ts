import ModuleList from '../module/list';

import {MessageType} from '../../common/message/message';
import {MessageHandler} from '../../common/message/handler';
import {FetchResponse, ErrorResponse} from '../../common/message/builder';
import {Message} from '../../common/messaging/event';
import {FetchEvent} from '../../common/module/interface';

import type {FetchRequest} from '../../common/message/message';


const FetchRespond = (msg: Message): ((data: any) => void) => {
  return (data: any) => {
    const {module, detail} = msg.message.payload;

    msg.sender.send(FetchResponse(module, detail, false, data));
  };
};

const FetchError = (msg: Message): ((message: string) => void) => {
  return (message: string) => {
    const {module, detail} = msg.message.payload;

    msg.sender.send(FetchResponse(module, detail, false, undefined, message));
  };
};

const FetchHandler = (list: ModuleList) => (msg: Message): boolean => {
  return MessageHandler(msg, {
    [MessageType.FetchRequest]: (request: FetchRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module does not exist'));
      } else if (typeof module.fetchScript === 'undefined') {
        msg.reply(ErrorResponse('Module does not have a fetcher'));
      } else {
        const fetcher = list.manager.fetchManager.create(module);
        /* todo: fetch cached. */
        fetcher.fetch.dispatchEvent(new FetchEvent(request.payload.detail,
                                                   FetchRespond(msg),
                                                   FetchError(msg)));
      }
    }
  });
};

export default FetchHandler;
