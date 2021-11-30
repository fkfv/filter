import OptionHandler from './option';
import FetchHandler from './fetch';
import ModuleHandler from './module';
import IdentifyHandler from './identify';
import ModuleList from '../module/list';

import {MultiMessageHandler} from '../../common/message/handler';
import {MessageType} from '../../common/message/message';


const IndexHandler = (list: ModuleList) => (msg: any) => {
  MultiMessageHandler(msg, [
    MessageType.OptionGetRequest,
    MessageType.OptionSetRequest,
    MessageType.OptionListRequest
  ], OptionHandler(list)) ||
  MultiMessageHandler(msg, [
    MessageType.FetchRequest
  ], FetchHandler(list)) ||
  MultiMessageHandler(msg, [
    MessageType.ModuleRequest,
    MessageType.ModuleListRequest,
    MessageType.ModuleActivateRequest,
    MessageType.ModuleDeactivateRequest,
    MessageType.ModuleAddRequest,
    MessageType.ModuleRemoveRequest
  ], ModuleHandler(list)) ||
  MultiMessageHandler(msg, [
    MessageType.IdentifyRequest,
    MessageType.BlockRequest
  ], IdentifyHandler(list));
};

export default IndexHandler;
