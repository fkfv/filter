import OptionHandler from './option';
import ModuleManager from '../module/manager';

import {MultiMessageHandler} from '../../common/message/handler';
import {MessageType} from '../../common/message/message';


const IndexHandler = (manager: ModuleManager) => (msg: any) => {
  MultiMessageHandler(msg, [
    MessageType.OptionGetRequest,
    MessageType.OptionSetRequest,
    MessageType.OptionListRequest
  ], OptionHandler(manager));
};

export default IndexHandler;
