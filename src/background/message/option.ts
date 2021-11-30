import ModuleList from '../module/list';

import {Message} from '../../common/messaging/event';
import {MessageType} from '../../common/message/message';
import {MessageHandler, Try} from '../../common/message/handler';
import {ErrorResponse, OptionGetResponse, OptionSetResponse,
  OptionListResponse} from '../../common/message/builder';

import type {OptionGetRequest, OptionSetRequest,
  OptionListRequest} from '../../common/message/message';


const RegExpStringTransformer = (_: any, value: any) => {
  if (value instanceof RegExp) {
    return {
      '_regexp': true,
      value: value.source
    };
  }

  return value;
};

const StringRegExpTransformer = (_: any, value: any) => {
  if (typeof value === 'object') {
    if (value.hasOwnProperty('_regexp')) {
      return new RegExp(value.source);
    }
  }

  return value;
};

const OptionHandler = (list: ModuleList) => (msg: Message): boolean => {
  return MessageHandler(msg, {
    [MessageType.OptionGetRequest]: (request: OptionGetRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module not found'));
      } else if (typeof module.option === 'undefined') {
        msg.reply(ErrorResponse('Module does not have options'));
      } else {
        Try(module.option.get(request.payload.name), msg, value => {
          const {module, name} = request.payload;

          msg.reply(OptionGetResponse(module, name, value));
        });
      }
    },
    [MessageType.OptionSetRequest]: (request: OptionSetRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module not found'));
      } else if (typeof module.option === 'undefined') {
        msg.reply(ErrorResponse('Module does not have options'));
      } else {
        Try(module.option.set(request.payload.name,
                              request.payload.value), msg, (_: any) => {
          const {module, name} = request.payload;
          msg.reply(OptionSetResponse(module, name));
        });
      }
    },
    [MessageType.OptionListRequest]: (request: OptionListRequest) => {
      const module = list.manager.getModule(request.payload.module);
      if (!module) {
        msg.reply(ErrorResponse('Module not found'));
      } else if (typeof module.options === 'undefined') {
        msg.reply(OptionListResponse(request.payload.module, {}));
      } else {
        const options = JSON.parse(
          JSON.stringify(module.options, RegExpStringTransformer),
          StringRegExpTransformer);

        msg.reply(OptionListResponse(request.payload.module, options));
      }
    }
  });
};

export default OptionHandler;
