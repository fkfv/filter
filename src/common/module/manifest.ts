type Blockable = {
  /*
  ** The programmatic ID of the blockable value. This will be used as the name
  ** if no name is provided.
  */
  id: string;

  /*
  ** The name of the blockable value for display. If a single string is provided
  ** then it will be pluralised by appending an `s`, if two strings are provided
  ** the second will be used as the plural form.
  */
  name?: string|{
    singular: string;
    plural: string;
  };

  /*
  ** An optional description of where this value is found on the matched site
  ** to describe what is being blocked.
  */
  description?: string;
};

type OptionValue = {
  /*
  ** Display name of the option.
  */
  name: string;
  description?: string;
};

type BooleanOptionValue = OptionValue & {
  type: "boolean";
  defaultValue?: boolean;
};

type StringOptionValue = OptionValue & {
  type: "string";
  defaultValue?: string;

  /*
  ** Minimum and maximum length of the string.
  */
  minimumLength?: number;
  maximumLength?: number;

  /*
  ** Regex the string must match, not including opening and closing slash or
  ** flags.
  */
  match?: string;
};

type NumberOptionValue = OptionValue & {
  type: "number";
  defaultValue?: number;

  /*
  ** Minimum and maximum value of the number.
  */
  minimumValue?: number;
  maximumValue?: number;

  /*
  ** Precision of the number.
  */
  precision?: number;
};

type OptionValues = BooleanOptionValue|StringOptionValue|NumberOptionValue;

interface ModuleManifest {
  name: string;
  description?: string;
  
  /*
  ** The regular expression to match sites that the module is injected for. May
  ** include / as a opener/closer and flags.
  */
  match: string;

  scripts: {
    /*
    ** Script that is injected in the page context. The script will be loaded
    ** once for each matching page.
    */
    blocker: string;

    /*
    ** Optional script that is loaded in the background context. The script will
    ** only be loaded once.
    */
    fetcher?: string;
  };

  /*
  ** List of all attributes that can be blocked by this module.
  */
  blockables: Blockable[];

  /*
  ** Options for the module, if any exist.
  */
  options?: {
    [categoryName: string]: {
      [optionName: string]: OptionValues;
    };
  };
}

export type {ModuleManifest, Blockable, BooleanOptionValue, StringOptionValue,
  NumberOptionValue, OptionValues};
