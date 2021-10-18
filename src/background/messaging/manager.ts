import Connection from '../../common/messaging/connection';

import {Message, Listener} from '../../common/messaging/event';


class Accepted extends Event {
  sender: Connection;

  constructor(sender: Connection) {
    super('connect');

    this.sender = sender;
  }
}

class ConnectionManager {
  /*
  ** Array of all active connections.
  */
  connections: Connection[] = [];
  message: Listener<Message> = new Listener();
  connect: Listener<Accepted> = new Listener();

  /*
  ** Broadcast a messagge to all connections, or optionally leave out the one
  ** connection acting as the sender of the broadcast.
  */
  broadcast(message: any, sender?: Connection) {
    this.connections.filter(c => c === sender).forEach(c => c.send(message));
  }

  acceptConnection(port: chrome.runtime.Port): Connection {
    const connection = new Connection(port);

    this.connections.push(connection);
    port.onDisconnect.addListener(this.onDisconnect.bind(this));
    this.connect.dispatchEvent(new Accepted(connection));
    connection.message.addListener(this.onMessage.bind(this, connection));

    return connection;
  }

  private onMessage(sender: Connection, message: Message) {
    this.message.dispatchEvent(
      new Message(message.message, message.id, sender)
    );
  }

  private onDisconnect(port: any) {
    /*
    ** Remove the connection from the active pool.
    */
    const connectionIndex = this.getConnectionByPort(port);
    if (connectionIndex !== -1) {
      this.connections.splice(connectionIndex, 1);
    }
  }

  private getConnectionByPort(port: chrome.runtime.Port): number {
    return this.connections.findIndex(c => c.port === port);
  }
}

export default ConnectionManager;
