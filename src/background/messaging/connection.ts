import Connection from '../../common/messaging/connection';
import Manager from './manager';


class ManagedConnection extends Connection {
  manager: Manager;

  constructor(port: chrome.runtime.Port, manager: Manager) {
    super(port);

    this.manager = manager;
  }
}

export default ManagedConnection;
