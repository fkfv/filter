import {v4 as uuid} from 'uuid';

import {Message, Listener} from './event';
import {Log} from '../logging';


type PromiseFunctions = {
  resolve: ((value: any) => void);
  reject: ((err: any) => void);
};

type ResponseWaiting = {
  [responseId: string]: PromiseFunctions;
};

class Connection {
  /*
  ** Messages that are waiting for a response.
  */
  messages: ResponseWaiting = {};
  message: Listener<Message> = new Listener();

  port: chrome.runtime.Port;
  closed: boolean = false;

  constructor(port: chrome.runtime.Port) {
    this.port = port;

    port.onDisconnect.addListener(this.onDisconnect.bind(this));
    port.onMessage.addListener(this.onMessage.bind(this));
  }

  private onDisconnect(_: any) {
    /*
    ** Reject any messages waiting for a response.
    */
    const error = chrome.runtime.lastError || new Error('Connection closed');
    this.closed = true;

    Object.values(this.messages).forEach(wait => wait.reject(error));
  }

  private onMessage(message: any, _: any) {
    const messageId = message.messageId;
    const useListener = this.messages.hasOwnProperty(messageId);

    Log(messageId, {
      'Message ID': messageId,
      'Using Listener': [
        useListener ? '%cYes' : '%cNo',
        useListener ? 'color: green' : 'color: red'
      ],
      'Direction': ['%cIncoming', 'color: orange']
    });

    if (useListener) {
      (this.messages[messageId] as PromiseFunctions).resolve(message.message);
    } else {
      this.message.dispatchEvent(new Message(message.message, messageId, this));
    }
  }

  /*
  ** Send a message. If waitForResponse is true then the promise will be
  ** resolved with a response to the message, otherwise the promise will resolve
  ** immediately.
  */
  send(message: any, waitForResponse: boolean = false,
                     id?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.closed) {
        reject(new Error('Port is already closed'));
      }

      const messageId = id || uuid();

      this.port.postMessage({
        messageId,
        message
      });

      Log(messageId, {
        'Message ID': messageId,
        'Using Listener': [
          waitForResponse ? '%cNo' : '%cYes',
          waitForResponse ? 'color: red' : 'color: green'
        ],
        'Direction': ['%cOutgoing', 'color: blue']
      });

      if (waitForResponse) {
        this.messages[messageId] = {resolve, reject};
      } else {
        resolve(undefined);
      }
    });
  }
}

export default Connection;
