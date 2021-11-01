import OptionHandler from './option';
import FetchHandler from './fetch';
import ModuleHandler from './module';
import IdentifyHandler from './identify';
import ModuleManager from '../module/manager';

import {MultiMessageHandler} from '../../common/message/handler';
import {MessageType} from '../../common/message/message';


const IndexHandler = (manager: ModuleManager) => (msg: any) => {
  MultiMessageHandler(msg, [
    MessageType.OptionGetRequest,
    MessageType.OptionSetRequest,
    MessageType.OptionListRequest
  ], OptionHandler(manager)) ||
  MultiMessageHandler(msg, [
    MessageType.FetchRequest
  ], FetchHandler(manager)) ||
  MultiMessageHandler(msg, [
    MessageType.ModuleRequest,
    MessageType.ModuleListRequest,
    MessageType.ModuleLoadRequest,
    MessageType.ModuleUnloadRequest
  ], ModuleHandler(manager)) ||
  MultiMessageHandler(msg, [
    MessageType.IdentifyRequest,
    MessageType.BlockRequest
  ], IdentifyHandler(manager));
};

export default IndexHandler;
