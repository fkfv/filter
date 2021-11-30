import Connection from '../common/messaging/connection';


const port = chrome.runtime.connect();
const connection = new Connection(port);

export {connection};
