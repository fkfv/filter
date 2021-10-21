import {Message} from '../messaging/event';
import {ErrorResponse} from './builder';


type HandlerCallback = (msg: any) => void;

/*
** Invoke the handler for message if it is defined in handles. Return if the
** handler was found or not.
*/
const MessageHandler = (msg: Message, handles: {
  [typeKey: string]: HandlerCallback
}): boolean => {
  if (handles.hasOwnProperty(msg.message.type)) {
    (handles[msg.message.type] as HandlerCallback)(msg.message);
    return true;
  } else {
    return false;
  }
};

/*
** Invoke the handler if the message is one of the defined types. Return if the
** message was handled.
*/
const MultiMessageHandler = (msg: Message, handles: string[],
  handler: HandlerCallback): boolean => {
  if (handles.includes(msg.message.type as string)) {
    handler(msg);
    return true;
  } else {
    return false;
  }
};

const Try = (promise: Promise<any>, msg: Message,
             handler: ((val: any) => void)) => {
  promise.then(handler).catch(e => msg.reply(ErrorResponse(e.toString())));
};

export {
  MessageHandler, MultiMessageHandler, Try
};
