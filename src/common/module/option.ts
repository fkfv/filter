import Connection from '../messaging/connection';

import {MessageType} from '../../common/message/message';
import {OptionGetRequest, OptionSetRequest} from '../../common/message/builder';


class Option {
  connection: Connection;
  module: string;

  constructor(connection: Connection, module: string) {
    this.connection = connection;
    this.module = module;
  }

  async get(name: string): Promise<boolean|string|number> {
    const request = OptionGetRequest(this.module, name);
    const response = await this.connection.send(request, true);

    if (response.type === MessageType.ErrorResponse) {
      throw new Error('Option does not exist');
    }

    return response.payload.value;
  }

  async set(name: string, value: boolean|string|number) {
    const request = OptionSetRequest(this.module, name, value);
    const response = await this.connection.send(request, true);

    if (response.type === MessageType.ErrorResponse) {
      throw new Error('Option does not exist');
    }
  }
}

export default Option;
