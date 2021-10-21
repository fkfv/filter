import Connection from './connection';


class Message<T extends Connection = Connection> extends Event {
  sender: T;
  message: any;
  id: string;

  constructor(message: any, id: string, sender: T) {
    super('message');

    this.message = message;
    this.id = id;
    this.sender = sender;
  }

  reply(message: any) {
    this.sender.send(message, false, this.id);
  }
}

export {Message};
