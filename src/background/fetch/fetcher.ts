import Option from '../module/option';
import ConnectionManager from '../messaging/manager';
import FetchManager from './manager';

import {Listener, FetchEvent} from '../../common/module/interface';
import {MessageType} from '../../common/message/message';


class Fetcher {
  option: Option;
  fetch: Listener<FetchEvent> = new Listener();

  connectionManager: ConnectionManager;
  fetchManager: FetchManager;

  constructor(option: Option, connectionManager: ConnectionManager,
              fetchManager: FetchManager) {
    this.option = option;
    this.connectionManager = connectionManager;
    this.fetchManager = fetchManager;
  }

  refresh() {
    this.connectionManager.broadcast({
      type: MessageType.RefreshRequest
    });
  }

  queuedFetch(input: Request, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }
}

export default Fetcher;

