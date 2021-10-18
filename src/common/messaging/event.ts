import Connection from './connection';


class Message extends Event {
  sender: Connection;
  message: any;
  id: string;

  constructor(message: any, id: string, sender: Connection) {
    super('message');

    this.message = message;
    this.id = id;
    this.sender = sender;
  }
}

type ListenerCallback<T extends Event> = ((event: T) => void);

class Listener<T extends Event = Message> {
  private listeners: ListenerCallback<T>[] = [];

  addListener(callback: ListenerCallback<T>): void {
    this.listeners.push(callback);
  }

  removeListener(callback: ListenerCallback<T>): void {
    const listener = this.listeners.indexOf(callback);
    if (listener !== -1) {
      this.listeners.splice(listener, 1);
    }
  }

  dispatchEvent(event: T) {
    this.listeners.forEach(listener => listener(event));
  }
}

export {Message, Listener};
