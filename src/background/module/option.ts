import Module from './module';

import type {OptionString, OptionNumber} from './module';


class Option {
  module: Module;

  constructor(module: Module) {
    this.module = module;
  }

  get(name: string): Promise<boolean|string|number|undefined> {
    const qualifiedName = `${this.module.name}.${name}`;

    return new Promise((resolve, reject) => {
      chrome.storage.local.get({
        [qualifiedName]: this.module.findOptionDefault(name)
      }, (items: {[key: string]: any}) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (items.hasOwnProperty(qualifiedName) && items[qualifiedName] !== undefined) {
          resolve(items[qualifiedName]);
        } else {
          reject(new Error('Failed to retrieve value.'));
        }
      });
    });
  }

  set(name: string, value: boolean|string|number): Promise<void> {
    return new Promise((resolve, reject) => {
      const option = this.module.findOption(name);
      if (typeof option === 'undefined') {
        reject(new Error(`Option ${name} not found.`));
        return;
      }

      switch (option.type) {
      case 'boolean':
        if (typeof value !== 'boolean') {
          reject(new Error(`Option ${option.name} must be boolean.`));
        } else {
          this._set(name, value, resolve, reject);
        }
        break;
      case 'string':
        if (typeof value !== 'string') {
          reject(new Error(`Option ${option.name} must be string.`));
        } else if (value.length < (option as OptionString).minimumLength ||
                   value.length > (option as OptionString).maximumLength) {
          reject(new Error(`Option ${option.name} must be between ` +
                           `${(option as OptionString).minimumLength} and ` +
                           `${(option as OptionString).maximumLength} characters long.`));
        } else if (!value.match((option as OptionString).match)) {
          reject(new Error(`Option ${option.name} did not follow the required` +
                           ` pattern.`))
        } else {
          this._set(name, value, resolve, reject);
        }
        break;
      case 'number':
        if (typeof value !== 'number') {
          reject(new Error(`Option ${option.name} must be number.`));
        } else if (value < (option as OptionNumber).minimumValue ||
                   value > (option as OptionNumber).maximumValue) {
          reject(new Error(`Option ${option.name} must be between ` +
                           `${(option as OptionNumber).minimumValue} and ${(option as OptionNumber).maximumValue}` +
                           `.`));
        } else if (!Number.isInteger(value / (option as OptionNumber).precision)) {
          reject(new Error(`Option ${option.name} only has a precision of ` + 
                           `${(option as OptionNumber).precision}.`));
        } else {
          this._set(name, value, resolve, reject);
        }
      }
    });
  }

  _set(name: string, value: boolean|string|number,
       resolve: (() => void), reject: ((err: any) => void)) {
    const qualifiedName = `${this.module.name}.${name}`;

    chrome.storage.local.set({
      [qualifiedName]: value
    }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  }
}

export default Option;
