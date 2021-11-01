import Module from './module';
import Connection from '../../common/messaging/connection';

import {ModuleBlock} from '../../common/module/interface';


class ModuleManager {
  loadedModules: {
    [moduleName: string]: Module;
  } = {};

  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async loadModule(name: string, url: string) {
    const module = new Module(name, url, this.connection);
    await module.load();

    this.loadedModules[module.name as string] = module;
    (module.blocker as ModuleBlock).register(module);

    return module;
  }

  async unloadModule(name: string) {
    const module = this.loadedModules[name] as Module;
    if (!module) {
      return;
    }

    (module.blocker as ModuleBlock).unregister();

    delete this.loadedModules[name];
  }

  getModule(name: string): Module|undefined {
    return this.loadedModules[name];
  }
}

export default ModuleManager;
