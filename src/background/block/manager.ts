import Blocker from './blocker';
import Module from '../module/module';


class BlockManager {
  blockers: {
    [moduleName: string]: Blocker
  } = {};

  create(module: Module): Blocker {
    if (this.blockers.hasOwnProperty(module.name as string)) {
      return this.blockers[module.name as string] as Blocker;
    }

    const blocker = new Blocker(module);
    this.blockers[module.name as string] = blocker;
    return blocker;
  }

  destroy(name: string) {
    delete this.blockers[name];
  }
}

export default BlockManager;
