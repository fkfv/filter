import IndexHandler from './message';
import ConnectionManager from './messaging/manager';
import ModuleManager from './module/manager';


const connectionManager = new ConnectionManager();
const moduleManager = new ModuleManager(connectionManager);

chrome.runtime.onConnect.addListener(connectionManager.acceptConnection.bind(connectionManager));
connectionManager.message.addListener(IndexHandler(moduleManager));

