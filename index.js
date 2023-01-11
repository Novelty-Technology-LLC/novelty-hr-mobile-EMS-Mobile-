/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
//for http network request log for react-native-debugger
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;
  fetch;
  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false;
  } else {
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
    global.FileReader = global.originalFileReader
      ? global.originalFileReader
      : global.FileReader;
  }
}
AppRegistry.registerComponent(appName, () => App);
