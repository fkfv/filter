import Connection from '../../common/messaging/connection';

import {BlockerListRequest, BlockerBlockedRequest, BlockerAddRequest,
  BlockerRemoveRequest} from '../../common/message/builder';
import {ApiSend} from './';

import type {BlockerListResponse, BlockerBlockedResponse, BlockerAddResponse,
  BlockerRemoveResponse} from '../../common/message/message';


const BlockedList = async (connection: Connection, module: string) => {
  const request = BlockerListRequest(module);
  const blockers = await ApiSend<BlockerListResponse>(connection, request);

  return blockers.payload.blockers;
};

const BlockedBlocked = async (connection: Connection, module: string,
                              blocker: string) => {
  const request = BlockerBlockedRequest(module, blocker);
  const blocked = await ApiSend<BlockerBlockedResponse>(connection, request);

  return blocked.payload.blocked;
};

const BlockedAdd = async (connection: Connection, module: string,
                          blocker: string, item: string) => {
  const request = BlockerAddRequest(module, blocker, item);
  await ApiSend<BlockerAddResponse>(connection, request);
};

const BlockedRemove = async (connection: Connection, module: string,
                             blocker: string, item: string) => {
  const request = BlockerRemoveRequest(module, blocker, item);
  await ApiSend<BlockerRemoveResponse>(connection, request);
};

export {BlockedList, BlockedBlocked, BlockedAdd, BlockedRemove}
