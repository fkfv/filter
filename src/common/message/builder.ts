import {MessageType} from './message';

import type {OptionListOption} from './message';


const OptionNameOnly = (type: string, module: string, name: string) => {
  return {
    type,
    payload: {
      module,
      name
    }
  };
};

const OptionNameValue = (type: string, module: string, name: string,
                         value: boolean|string|number) => {
  return {
    type,
    payload: {
      module,
      name,
      value
    }
  };
};

const OptionGetRequest = (module: string, name: string) =>
  OptionNameOnly(MessageType.OptionGetRequest, module, name);
const OptionSetRequest = (module: string, name: string,
                          value: boolean|string|number) =>
  OptionNameValue(MessageType.OptionSetRequest, module, name, value);
const OptionGetResponse = (module: string, name: string,
                           value: boolean|string|number) =>
  OptionNameValue(MessageType.OptionGetResponse, module, name, value);
const OptionSetResponse = (module: string, name: string) =>
  OptionNameOnly(MessageType.OptionSetResponse, module, name);

const OptionListRequest = (module: string) => {
  return {
    type: MessageType.OptionListRequest,
    payload: {
      module
    }
  };
};

const OptionListResponse = (module: string, options: {
  [categoryName: string]: {
    [optionName: string]: OptionListOption
  }
}) => {
  return {
    type: MessageType.OptionListResponse,
    payload: {
      module,
      options
    }
  };
};

const FetchRequest = (module: string, detail: any) => {
  return {
    type: MessageType.FetchRequest,
    payload: {
      module,
      detail
    }
  };
};

const FetchResponse = (module: string, detail: any, cached: boolean, data: any,
                       error?: string) => {
  return {
    type: MessageType.FetchResponse,
    payload: {
      module,
      detail,
      cached,
      data,
      error
    }
  };
};

const ModuleRequest = (url: string) => {
  return {
    type: MessageType.ModuleRequest,
    payload: {
      url
    }
  };
};

const ModuleResponse = (url: string, modules: {
  [moduleName: string]: string
}) => {
  return {
    type: MessageType.ModuleResponse,
    payload: {
      url,
      modules
    }
  };
};

const ModuleListRequest = () => {
  return {
    type: MessageType.ModuleListRequest,
    payload: {}
  };
};

const ModuleListResponse = (modules: {
  url: string;
  name: string;
  description?: string;
  active: boolean;
}[]) => {
  return {
    type: MessageType.ModuleListResponse,
    payload: {
      modules
    }
  };
};

const ModuleName = (type: string, module: string) => {
  return {
    type,
    payload: {
      module
    }
  };
};

const ModuleActivateRequest = (name: string) =>
  ModuleName(MessageType.ModuleActivateRequest, name);
const ModuleDeactivateRequest = (name: string) =>
  ModuleName(MessageType.ModuleDeactivateRequest, name);

const ModuleAddRequest = (url: string) => {
  return {
    type: MessageType.ModuleAddRequest,
    payload: {
      url
    }
  };
};

const ModuleRemoveRequest = (name: string) =>
  ModuleName(MessageType.ModuleRemoveRequest, name);
const ModuleActivateResponse = (name: string) =>
  ModuleName(MessageType.ModuleActivateResponse, name);
const ModuleDeactivateResponse = (name: string) =>
  ModuleName(MessageType.ModuleDeactivateResponse, name);
const ModuleAddResponse = (name: string) =>
  ModuleName(MessageType.ModuleAddResponse, name);
const ModuleRemoveResponse = (name: string) =>
  ModuleName(MessageType.ModuleRemoveResponse, name);

const Field = (type: string, module: string, fields: {
  [fieldName: string]: string|string[];
}, action?: "add" | "remove") => {
  return {
    type,
    payload: {
      module,
      fields,
      action
    }
  };
};

const IdentifyRequest = (module: string, fields: {
  [fieldName: string]: string|string[];
}) => Field(MessageType.IdentifyRequest, module, fields);

const IdentifyResponse = (module: string, block: boolean,
                          blockReason: string[]) => {
  return {
    type: MessageType.IdentifyResponse,
    payload: {
      module,
      block,
      blockReason
    }
  };
};

const BlockRequest = (module: string, fields: {
  [fieldName: string]: string|string[];
}, action: "add" | "remove") =>
  Field(MessageType.BlockRequest, module, fields, action);

const BlockResponse = () => {
  return {
    type: MessageType.BlockResponse,
    payload: {}
  };
};

const RefreshRequest = () => {
  return {
    type: MessageType.RefreshRequest,
    payload: {}
  };
};

const ModuleRefreshRequest = () => {
  return {
    type: MessageType.ModuleRefreshRequest,
    payload: {}
  };
};

const ErrorResponse = (message: string, module?: string) => {
  return {
    type: MessageType.ErrorResponse,
    payload: {
      message,
      module
    }
  };
};

export {
  OptionGetRequest, OptionSetRequest, OptionGetResponse, OptionSetResponse,
  OptionListRequest, OptionListResponse,
  FetchRequest, FetchResponse,
  ModuleRequest, ModuleResponse,
  ModuleListRequest, ModuleListResponse,
  ModuleActivateRequest, ModuleActivateResponse,
  ModuleDeactivateRequest, ModuleDeactivateResponse,
  ModuleAddRequest, ModuleAddResponse,
  ModuleRemoveRequest, ModuleRemoveResponse,
  IdentifyRequest, IdentifyResponse,
  BlockRequest, BlockResponse,
  RefreshRequest, ModuleRefreshRequest,
  ErrorResponse
};
