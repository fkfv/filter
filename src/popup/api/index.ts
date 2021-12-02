import Connection from '../../common/messaging/connection';

import {MessageType} from '../../common/message/message';


const ApiSend = async <T> (connection: Connection, msg: any): Promise<T> => {
  const response = await connection.send(msg, true);

  if (response.type === MessageType.ErrorResponse) {
    throw new Error(response.payload.message ?? 'Error');
  }

  return response as T;
};

export {ApiSend};
