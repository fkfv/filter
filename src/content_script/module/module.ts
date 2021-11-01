import Option from '../../common/module/option';
import Connection from '../../common/messaging/connection';

import {FetchRequest} from '../../common/message/builder';
import {ModuleBlock, FetchedEvent,
  Listener} from '../../common/module/interface';


class Module {
  connection: Connection;
  name: string;
  url: string;

  block: Listener<Event> = new Listener();
  fetched: Listener<FetchedEvent> = new Listener();
  option: Option;

  blocker?: ModuleBlock;

  constructor(name: string, url: string, connection: Connection) {
    this.connection = connection;
    this.name = name;
    this.url = url;
    this.option = new Option(this.connection, this.name);
  }

  async load() {
    const module = await import(/* webpackIgnore: true */this.url);
    const blocker = this._findExport(module);

    if (typeof blocker === 'function') {
      // @ts-ignore
      this.blocker = new blocker();
    } else {
      this.blocker = blocker;
    }
  }

  refresh() {
    this.block.dispatchEvent(new Event('block'));
  }

  fetch(detail: any) {
    const request = FetchRequest(this.name, detail);
    this.connection.send(request);
  }

  _findExport(module: any): ModuleBlock {
    if (Object.hasOwnProperty.call(module, 'default')) {
      return module.default as ModuleBlock;
    } else {
      throw new Error('Do not know how to find the module export');
    }
  }
}

export default Module;
