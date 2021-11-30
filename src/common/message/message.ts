enum MessageType {
  /*
  ** Allow the content script to request the value of options.
  */
  OptionGetRequest = "content-script/option/get",
  OptionSetRequest = "content-script/option/set",
  OptionGetResponse = "background/option/get",
  OptionSetResponse = "background/option/set",

  OptionListRequest = "content-script/option/list",
  OptionListResponse = "background/option/list",

  /*
  ** Allow the content script to schedule background fetch tasks.
  */
  FetchRequest = "content-script/fetch",
  FetchResponse = "background/fetch",

  /*
  ** Allow the content script to query which modules should apply to the current
  ** page.
  */
  ModuleRequest = "content-script/modules",
  ModuleResponse = "background/modules",

  /*
  ** Allow the content script to list, load, and unload modules.
  */
  ModuleListRequest = "content-script/module/list",
  ModuleLoadRequest = "content-script/module/load",
  ModuleUnloadRequest = "content-script/module/unload",
  ModuleListResponse = "background/module/list",
  ModuleLoadResponse = "background/module/load",
  ModuleUnloadResponse = "background/module/unload",

  /*
  ** Allow the content script to submit data against the block database, or
  ** update the block database.
  */
  IdentifyRequest = "content-script/identify",
  BlockRequest = "content-script/block",
  IdentifyResponse = "background/identify",
  BlockResponse = "background/block",

  /*
  ** Allow the background script to request a content script to recheck for
  ** blocked data and modules.
  */
  RefreshRequest = "background/refresh",
  ModuleRefreshRequest = "background/module-refresh",

  /*
  ** Allow either script to report an error occurring.
  */
  ErrorResponse = "both/error",
}

type MessageTypeGen<T, Y> = {
  type: T;
  payload: Y;
};

type OptionNameOnlyPayload = {
  module: string;
  name: string;
};

type OptionNameValuePayload = OptionNameOnlyPayload & {
  value: string|number|boolean;
};

type OptionGetRequest = MessageTypeGen<MessageType.OptionGetRequest,
                                       OptionNameOnlyPayload>;
type OptionSetRequest = MessageTypeGen<MessageType.OptionSetRequest,
                                       OptionNameValuePayload>;
type OptionGetResponse = MessageTypeGen<MessageType.OptionGetResponse,
                                        OptionNameValuePayload>;
type OptionSetResponse = MessageTypeGen<MessageType.OptionSetResponse,
                                        OptionNameOnlyPayload>;

type OptionListRequestPayload = {
  module: string;
};

type OptionListBase = {
  name: string;
  description: string;
};

type OptionListBoolean = OptionListBase & {
  type: "boolean";
  defaultValue: boolean;
};

type OptionListString = OptionListBase & {
  type: "string";
  defaultValue: string;
  minimumLength: number;
  maximumLength: number;
  match: string;
};

type OptionListNumber = OptionListBase & {
  type: "number";
  defaultValue: number;
  minimumValue: number;
  maximumValue: number;
  precision: number;
};

type OptionListOption = OptionListBoolean|OptionListString|OptionListNumber;

type OptionListResponsePayload = {
  module: string;
  options: {
    [optionCategory: string]: {
      [optionName: string]: OptionListOption;
    }
  };
};

type OptionListRequest = MessageTypeGen<MessageType.OptionListRequest,
                                        OptionListRequestPayload>;
type OptionListResponse = MessageTypeGen<MessageType.OptionListResponse,
                                         OptionListResponsePayload>;

type FetchRequestPayload = {
  module: string;
  detail: any;
};

type FetchResponsePayload = FetchRequestPayload & {
  cached: boolean;
  data: any;
  error?: string;
};

type FetchRequest = MessageTypeGen<MessageType.FetchRequest,
                                   FetchRequestPayload>;
type FetchResponse = MessageTypeGen<MessageType.FetchResponse,
                                    FetchResponsePayload>;

type ModuleRequestPayload = {
  url: string;
};

type ModuleResponsePayload = ModuleRequestPayload & {
  modules: {
    [moduleName: string]: string/*moduleUrl*/;
  };
};

type ModuleRequest = MessageTypeGen<MessageType.ModuleRequest,
                                    ModuleRequestPayload>;
type ModuleResponse = MessageTypeGen<MessageType.ModuleResponse,
                                     ModuleResponsePayload>;

type ModuleListResponsePayload = {
  modules: {
    url: string;
    name: string;
    description?: string;
    active: boolean;
  }[];
};

type ModuleListRequest = MessageTypeGen<MessageType.ModuleListRequest, {}>;
type ModuleListResponse = MessageTypeGen<MessageType.ModuleListResponse,
                                         ModuleListResponsePayload>;

type ModuleNamePayload = {
  module: string;
};

type ModuleUrlPayload = {
  url: string;
};

type ModuleLoadRequest = MessageTypeGen<MessageType.ModuleLoadRequest,
                                        ModuleUrlPayload>;
type ModuleUnloadRequest = MessageTypeGen<MessageType.ModuleUnloadRequest,
                                          ModuleNamePayload>;
type ModuleLoadResponse = MessageTypeGen<MessageType.ModuleLoadResponse,
                                         ModuleNamePayload>;
type ModuleUnloadResponse = MessageTypeGen<MessageType.ModuleUnloadResponse,
                                           {}>;

type FieldPayload = {
  module: string;
  fields: {
    [fieldName: string]: string|string[];
  };
};

type IdentifyResponsePayload = {
  module: string;
  block: boolean;
  blockReason: string[];
};

type BlockRequestPayload = FieldPayload & {
  action: "add"|"remove";
};

type IdentifyRequest = MessageTypeGen<MessageType.IdentifyRequest,
                                      FieldPayload>;
type BlockRequest = MessageTypeGen<MessageType.BlockRequest,
                                   BlockRequestPayload>;
type IdentifyResponse = MessageTypeGen<MessageType.IdentifyResponse,
                                       IdentifyResponsePayload>;
type BlockResponse = MessageTypeGen<MessageType.BlockResponse, {}>;

type RefreshRequest = MessageTypeGen<MessageType.RefreshRequest, {}>;
type ModuleRefreshRequest = MessageTypeGen<MessageType.ModuleRefreshRequest,
                                           {}>;

type ErrorResponsePayload = {
  module?: string;
  message: string;
};

type ErrorResponse = MessageTypeGen<MessageType.ErrorResponse,
                                    ErrorResponsePayload>;

type Message =
  |OptionGetRequest
  |OptionSetRequest
  |OptionGetResponse
  |OptionSetResponse
  |OptionListRequest
  |OptionListResponse
  |FetchRequest
  |FetchResponse
  |ModuleRequest
  |ModuleResponse
  |ModuleListRequest
  |ModuleListResponse
  |ModuleLoadRequest
  |ModuleUnloadRequest
  |ModuleLoadResponse
  |ModuleUnloadResponse
  |IdentifyRequest
  |BlockRequest
  |IdentifyResponse
  |BlockResponse
  |RefreshRequest
  |ModuleRefreshRequest
  |ErrorResponse
;

export {MessageType};

export type {
  OptionListOption,
  ModuleListResponsePayload
};

export type {
  OptionGetRequest,
  OptionSetRequest,
  OptionGetResponse,
  OptionSetResponse,
  OptionListRequest,
  OptionListResponse,
  FetchRequest,
  FetchResponse,
  ModuleRequest,
  ModuleResponse,
  ModuleListRequest,
  ModuleListResponse,
  ModuleLoadRequest,
  ModuleUnloadRequest,
  ModuleLoadResponse,
  ModuleUnloadResponse,
  IdentifyRequest,
  BlockRequest,
  IdentifyResponse,
  BlockResponse,
  RefreshRequest,
  ModuleRefreshRequest,
  ErrorResponse
};

export type {Message};
