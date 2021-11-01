import Connection from '../common/messaging/connection';
import ModuleManager from './module/manager';
import IndexHandler from './message';

import {ModuleRequest} from '../common/message/builder';


const port = chrome.runtime.connect();
const connection = new Connection(port);
const moduleManager = new ModuleManager(connection);

connection.message.addListener(IndexHandler(moduleManager));

const {protocol, hostname, pathname} = window.location;
const host = `${protocol}//${hostname}${pathname}`;
connection.send(ModuleRequest(host));
