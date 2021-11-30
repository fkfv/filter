import ModuleManager from './manager';

import {ModuleRefreshRequest} from '../../common/message/builder';


type ModuleInfo = {
  name: string;
  url: string;
  description: string|undefined;
  active: boolean;
};

type ModuleUpdateFn = (info: ModuleInfo) => Promise<void>;

class ModuleList {
  manager: ModuleManager;

  constructor(manager: ModuleManager) {
    this.manager = manager;
  }

  list(): Promise<ModuleInfo[]> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get({
        modules: []
      }, modules => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(modules.modules);
        }
      });
    });
  }

  async activate(name: string): Promise<ModuleInfo> {
    return await this._updateModule(name, async (module) => {
      await this.manager.loadModule(module.url);

      module.active = true;
    });
  }

  async deactivate(name: string): Promise<ModuleInfo> {
    return await this._updateModule(name, async (module) => {
      await this.manager.unloadModule(name);

      module.active = false;
    });
  }

  async add(url: string): Promise<ModuleInfo> {
    const module = await this.manager.loadModule(url);
    const modules = await this.list();
    const info = {
      name: module.name as string,
      description: module.description,
      active: true,
      url
    };

    modules.push(info);
    await this._update(modules);

    return info;
  }

  async remove(name: string): Promise<void> {
    const modules = await this.list();
    const index = modules.findIndex(m => m.name === name);

    if (index === -1) {
      throw new Error(`Module ${name} not found`);
    }

    await this.manager.unloadModule(name);
    modules.splice(index, 1);
    await this._update(modules);
  }

  _refresh() {
    this.manager.connectionManager.broadcast(ModuleRefreshRequest());
  }

  /*
  ** This function will find the module by name, call updateFn with the found
  ** module, update the module in the database if the function resolves and
  ** then return the modified module.
  */
  async _updateModule(name: string,
                      updateFn: ModuleUpdateFn): Promise<ModuleInfo> {
    const modules = await this.list();
    const module = modules.find(m => m.name === name);

    if (typeof module === 'undefined') {
      throw new Error(`Module ${name} not found`);
    }

    await updateFn(module);
    await this._update(modules);

    return module;
  }

  _update(modules: ModuleInfo[]): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({
        modules
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}

export default ModuleList;
