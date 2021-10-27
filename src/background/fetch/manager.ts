import Fetcher from './fetcher';
import Module from '../module/module';
import Option from '../module/option';


class FetchManager {
  fetchers: {
    [moduleName: string]: Fetcher
  } = {};

  create(module: Module): Fetcher {
    if (this.fetchers.hasOwnProperty(module.name as string)) {
      return this.fetchers[module.name as string] as Fetcher;
    }

    const fetcher = new Fetcher(module.option as Option,
                                module.manager.connectionManager, this);
    this.fetchers[module.name as string] = fetcher;
    return fetcher;
  }

  destroy(name: string) {
    delete this.fetchers[name];
  }
}

export default FetchManager;
