import Module from './module';
import FetchManager from '../fetch/manager';
import BlockManager from '../block/manager';
import ConnectionManager from '../messaging/manager';


class ModuleManager {
  loadedModules: {
    [moduleName: string]: Module
  } = {};

  fetchManager: FetchManager = new FetchManager();
  blockManager: BlockManager = new BlockManager();
  connectionManager: ConnectionManager;

  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager;
  }

  async loadModule(url: string): Promise<Module> {
    const module = new Module(url, this);
    await module.load();

    this.loadedModules[module.name as string] = module;

    if (typeof module.fetchScript !== 'undefined') {
      module.fetchScript.register(this.fetchManager.create(module));
    }

    return module;
  }

  async unloadModule(name: string) {
    const module = this.loadedModules[name] as Module;

    if (typeof module.fetchScript !== 'undefined') {
      this.fetchManager.destroy(module.name as string);
      module.fetchScript.unregister();
    }

    delete this.loadedModules[name];
  }

  getModule(name: string): Module|undefined {
    return this.loadedModules[name];
  }
}

export default ModuleManager;
