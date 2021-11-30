import IndexHandler from './message';
import ConnectionManager from './messaging/manager';
import ModuleManager from './module/manager';
import ModuleList from './module/list';


const connectionManager = new ConnectionManager();
const moduleManager = new ModuleManager(connectionManager);
const moduleList = new ModuleList(moduleManager);

chrome.runtime.onConnect.addListener(connectionManager.acceptConnection.bind(connectionManager));
connectionManager.message.addListener(IndexHandler(moduleList));

