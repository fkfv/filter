type ListenerCallback<T extends Event> = ((event: T) => void);

class Listener<T extends Event> {
  private listeners: ListenerCallback<T>[] = [];

  addListener(callback: ListenerCallback<T>): void {
    this.listeners.push(callback);
  }

  removeListener(callback: ListenerCallback<T>): void {
    const listener = this.listeners.indexOf(callback);
    if (listener !== -1) {
      this.listeners.splice(listener, 1);
    }
  }

  dispatchEvent(event: T) {
    this.listeners.forEach(listener => listener(event));
  }
}

type OptionValue = string|number|boolean;
type PossibleOptionValue = OptionValue|undefined;

interface Option {
  get(name: string, defaultValue?: OptionValue): Promise<PossibleOptionValue>;
  set(name: string, value: OptionValue): Promise<void>;
}

interface ModuleClass<T> {
  register(object: T): void;
  unregister(): void;
}

class FetchedEvent extends Event {
  /*
  ** The detail used to request the fetch.
  */
  detail: any;

  /*
  ** If the data was cached. Only present if an error has not occurred.
  */
  cached?: boolean;

  /*
  ** The fetched data. Only present if an error has not occured.
  */
  data?: any;

  /*
  ** The error message. Only present if an error has occurred.
  */
  error?: string;

  /*
  ** Create a fetched event. Will be an error event if only the parameter
  ** dataOrError is provided, or a data event if both dataOrError and cached are
  ** provided.
  */
  constructor(detail: any, dataOrError: any, cached?: boolean) {
    super('fetched');

    this.detail = detail;

    if (typeof cached === 'boolean') {
      this.cached = cached;
      this.data = dataOrError;
    } else {
      this.error = dataOrError;
    }
  }
}

type DataFn = ((data: any) => void);
type ErrorFn = ((message: string) => void);

class FetchEvent extends Event {
  detail: any;

  /*
  ** Respond to the fetch request with an error or with the fetched data.
  */
  respond: DataFn;
  error: ErrorFn;

  constructor(detail: any, respond: DataFn, error: ErrorFn) {
    super('fetch');

    this.detail = detail;
    this.respond = respond;
    this.error = error;
  }
}

interface SharedObject {
  option: Option;

  /*
  ** Request that the objects on the page should be rechecked for blocking.
  */
  refresh(): void;
};

interface ModuleBlockObject extends SharedObject {
  /*
  ** Event that is triggered when the page should be searched for objects to
  ** block.
  */
  block: Listener<Event>;

  /*
  ** Event that is triggered when a fetch request is finished.
  */
  fetched: Listener<FetchedEvent>;

  /*
  ** Queue a fetch request.
  */
  fetch(detil: any): void;
}

interface ModuleFetchObject extends SharedObject {
  /*
  ** Event that is triggered when a request to fetch is received.
  */
  fetch: Listener<FetchEvent>;

  /*
  ** fetch() implementation that will use a cooldown between requests.
  */
  queuedFetch(input: Request, init?: RequestInit): Promise<Response>;
}

type ModuleBlock = ModuleClass<ModuleBlockObject>;
type ModuleFetch = ModuleClass<ModuleFetchObject>;

export type {ModuleBlock, ModuleFetch, ModuleBlockObject, ModuleFetchObject};
export {Listener, FetchedEvent, FetchEvent};
