import Module from './module';
import ConnectionManager from '../messaging/manager';


class ModuleManager {
  loadedModules: {
    [moduleName: string]: Module
  } = {};

  connectionManager: ConnectionManager;

  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager;
  }

  async loadModule(url: string): Promise<Module> {
    const module = new Module(url, this);
    await module.load();

    this.loadedModules[module.name as string] = module;

    return module;
  }

  async unloadModule(name: string) {
    const module = this.loadedModules[name] as Module;

    delete this.loadedModules[name];
  }

  getModule(name: string): Module|undefined {
    return this.loadedModules[name];
  }
}

export default ModuleManager;
