import Module from '../module/module';


class Blocker {
  module: Module;

  constructor(module: Module) {
    this.module = module;
  }

  get(name: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get({
        [`blocked.${this.module.name as string}.${name}`]: []
      }, (items?: {
        [itemName: string]: string[];
      }) => {
        if (items === undefined) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items[`blocked.${this.module.name as string}.${name}`] as string[]);
        }
      });
    });
  }

  add(name: string, value: string|string[]): Promise<void> {
    if (!Array.isArray(value)) {
      return this.add(name, [value]);
    }

    return new Promise((resolve, reject) => {
      this.get(name).then((existingValues: string[]) => {
        let updated = false;
        value.forEach(v => {
          const index = existingValues.indexOf(v);
          if (index === -1) {
            updated = true;
            existingValues.push(v);
          }
        });

        if (updated) {
          this._set(name, existingValues, resolve, reject);
        } else {
          resolve();
        }
      }).catch(reject);
    });
  }

  remove(name: string, value: string|string[]): Promise<void> {
    if (!Array.isArray(value)) {
      return this.remove(name, [value]);
    }

    return new Promise((resolve, reject) => {
      this.get(name).then((existingValues: string[]) => {
        let updated = false;
        value.forEach(v => {
          const index = existingValues.indexOf(v);
          if (index !== -1) {
            updated = true;
            existingValues.splice(index, 1);
          }
        });

        if (updated) {
          this._set(name, existingValues, resolve, reject);
        } else {
          resolve();
        }
      }).catch(reject);
    });
  }

  async contains(field: string, value: string|string[]): Promise<boolean> {
    if (!Array.isArray(value)) {
      return await this.contains(field, [value]);
    }

    const values = await this.get(field);
    return value.some(v => values.includes(v));
  }

  _set(name: string, items: string[], resolve: (() => void),
       reject: ((err: any) => void)) {
    chrome.storage.local.set({
      [`blocked.${this.module.name as string}.${name}`]: items
    }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    })
  }
}

export default Blocker;
