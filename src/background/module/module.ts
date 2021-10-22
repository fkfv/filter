// @ts-ignore
import validate from '../../common/validate';

import OptionClass from './option';
import ModuleManager from './manager';

import type {/*ModuleManifest,*/ BooleanOptionValue, StringOptionValue,
  NumberOptionValue, OptionValues,
  Blockable as ManifestBlockable} from '../../common/module/manifest';
import type {ModuleFetch} from '../../common/module/interface';
// import type {ValidateFunction} from 'ajv';


/* compiled ajv validate function as a typeguard. */
// declare var validate: ValidateFunction &
//                       ((manifest: any) => manifest is ModuleManifest);

enum ModuleLoadState {
  /*
  ** The module class has been created, but the manifest has not begun loading.
  */
  Unloaded = "state/unloaded",

  /*
  ** The manifest is being loaded.
  */
  Loading = "state/loading",

  /*
  ** The manifest is loaded, but the fetcher script has not been loaded.
  */
  ManifestLoaded = "state/manifest-loaded",

  /*
  ** The manifest is loaded, and there is no fetcher script.
  */
  FullWithoutFetcher = "state/full-without-fetcher",

  /*
  ** The manifest and fetcher script have been loaded.
  */
  Full = "state/full"
}

type Blockable = {
  id: string;
  name: {
    singular: string;
    plural: string;
  };
  description: string;
};

type Option = {
  name: string;
  description: string;
};

type OptionBoolean = Option & {
  type: "boolean";
  defaultValue: boolean;
};

type OptionString = Option & {
  type: "string";
  defaultValue: string;
  minimumLength: number;
  maximumLength: number;
  match: RegExp;
};

type OptionNumber = Option & {
  type: "number";
  defaultValue: number;
  minimumValue: number;
  maximumValue: number;
  precision: number;
};

type Options = OptionBoolean|OptionString|OptionNumber;

const pluralise = (singular: string): string => {
  if (singular.endsWith('y')) {
    return `${singular}ies`;
  } else {
    return `${singular}s`;
  }
};

class Module {
  loadState: ModuleLoadState = ModuleLoadState.Unloaded;

  /*
  ** Source URLs for each part of the module.
  */
  sources: {
    manifest: string;
    blocker?: string;
    fetcher?: string;
  };

  name?: string;
  description?: string;
  match?: RegExp;

  blockables?: Blockable[];
  options?: {
    [categoryName: string]: {
      [optionName: string]: Options;
    };
  };

  fetchScript?: ModuleFetch;
  option?: OptionClass;

  manager: ModuleManager;

  constructor(manifestUrl: string, manager: ModuleManager) {
    this.sources = {
      manifest: manifestUrl
    };
    this.manager = manager;
  }

  async load() {
    const response = await fetch(this.sources.manifest);
    const manifest = await response.json();

    if (!validate(manifest)) {
      // @ts-ignore
      throw new Error(validate.errors[0].message);
    }

    this.name = manifest.name;
    this.description = manifest.description;

    if (manifest.match[0] === '/') {
      const [_, pattern, flags] = manifest.match.match(/\/(.*)\/(\w+)?$/);
      this.match = new RegExp(pattern, flags);
    } else {
      this.match = new RegExp(manifest.match);
    }

    this.blockables = manifest.blockables.map((block: ManifestBlockable) => {
      let name;

      if (typeof block.name === 'undefined') {
        name = {singular: block.id, plural: pluralise(block.id)};
      } else if (typeof block.name === 'string') {
        name = {singular: block.name, plural: pluralise(block.name)};
      } else {
        name = block.name;
      }

      return {
        id: block.id,
        name,
        description: block.description ?? name.singular
      };
    });

    const options = Object.entries(manifest.options ?? {});
    // @ts-ignore
    this.options = Object.fromEntries(options.map(this._mapCategory.bind(this)));

    if (typeof manifest.scripts.fetcher === 'string') {
      this.sources = {
        manifest: this.sources.manifest,
        blocker: this._buildUri(manifest.scripts.blocker),
        fetcher: this._buildUri(manifest.scripts.fetcher)
      };

      const module = await import(/* webpackIgnore: true */this.sources.fetcher as string);
      const script = this._findExport(module);
      
      if (typeof script === 'function') {
        // @ts-ignore
        this.fetchScript = new script();
      } else {
        this.fetchScript = script;
      }

    } else {
      this.sources = {
        manifest: this.sources.manifest,
        blocker: this._buildUri(manifest.scripts.blocker),
      };
    }

    this.option = new OptionClass(this);
  }

  findOption(name: string): Options|undefined {
    if (typeof this.options === 'undefined') {
      return undefined;
    }

    for (const options of Object.values(this.options)) {
      for (const [optionName, option] of Object.entries(options)) {
        if (name === optionName) {
          return option;
        }
      }
    }

    return undefined;
  }

  findOptionDefault(name: string): boolean|string|number|undefined {
    if (typeof this.options === 'undefined') {
      return undefined;
    }

    for (const options of Object.values(this.options)) {
      for (const [optionName, {defaultValue}] of Object.entries(options)) {
        if (name === optionName) {
          return defaultValue;
        }
      }
    }

    return undefined;
  }

  _buildUri(uri: string): string {
    if (/https?:/.test(uri) ||
        /(?:moz-|chrome-)?extension:/.test(uri)) {
      return uri;
    }

    return new URL(uri, this.sources.manifest).href;
  }

  _booleanAttributes(attributes: BooleanOptionValue,
                     description: string): OptionBoolean {
    return {
      ...attributes,
      description,
      defaultValue: attributes.defaultValue ?? Boolean()
    };
  }

  _stringAttributes(attributes: StringOptionValue,
                    description: string): OptionString {
    return {
      ...attributes,
      description,
      defaultValue: attributes.defaultValue ?? String(),
      minimumLength: attributes.minimumLength ?? 0,
      maximumLength: attributes.maximumLength ?? Number.MAX_SAFE_INTEGER,
      match: new RegExp(attributes.match ?? /(?:)/)
    };
  }

  _numberAttributes(attributes: NumberOptionValue,
                    description: string): OptionNumber {
    return {
      ...attributes,
      description,
      defaultValue: attributes.defaultValue ?? Number(),
      minimumValue: attributes.minimumValue ?? Number.MIN_VALUE,
      maximumValue: attributes.maximumValue ?? Number.MAX_VALUE,
      precision: attributes.precision ?? 1
    };
  }

  _mapOption([option, attributes]: [string, OptionValues]): [string, Option] {
    let description;    

    if (typeof attributes.description === 'undefined') {
      description = attributes.name;
    } else {
      description = attributes.description;
    }

    switch (attributes.type) {
    case 'boolean':
      return [option, this._booleanAttributes(attributes, description)];
    case 'string':
      return [option, this._stringAttributes(attributes, description)];
    case 'number':
      return [option, this._numberAttributes(attributes, description)];
    }
  }

  _mapCategory([category, options]: CategoryInType): CategoryOutType {
    return [
      category,
      Object.fromEntries(Object.entries(options).map(this._mapOption.bind(this)))
    ];
  }

  /*
  ** Find the exported class from the module.
  */
  _findExport(module: any): ModuleFetch {
    if (Object.hasOwnProperty.call(module, 'default')) {
      return module.default as ModuleFetch;
    } else {
      throw new Error('Do not know how to find the module export');
    }
  }
}

type CategoryInType = [string, {[optionName: string]: OptionValues}];
type CategoryOutType = [string, {[optionName: string]: Option}];

export default Module;

export type {Options, OptionBoolean, OptionString, OptionNumber};
