var hx = require("hbuilderx");
const androidApp = require('./run/androidApp')
const iOSApp = require('./run/iOSApp')
const weApp = require('./run/weApp')
const baiduApp = require('./run/baiduApp')
const alipayApp = require('./run/alipayApp')
const bytedanceApp = require('./run/bytedanceApp')
const qqApp = require('./run/qqApp')
const mp360App = require('./run/360App')
const quickapphuawei = require('./run/quickapphuawei')
const quickappunion = require('./run/quickappunion')
const kuaishouApp = require('./run/kuaishouApp')
const mplarkApp = require('./run/mplarkApp')
const mpjdApp = require('./run/mpjdApp')


//该方法将在插件激活的时候调用
function activate(context) {
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:app-android", async function (session) {
    return await androidApp.startSession(session,"uni-app:app-android");
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:app-ios", async function (session) {
    return await iOSApp.startSession(session,"uni-app:app-ios");
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-weixin", async function (session) {
    return await weApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-baidu", async function (session) {
    return await baiduApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-alipay", async function (session) {
    return await alipayApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-toutiao", async function (session) {
    return await bytedanceApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-qq", async function (session) {
    return await qqApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-360", async function (session) {
    return await mp360App.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:quickapp-webview-huawei", async function (session) {
    return await quickapphuawei.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:quickapp-webview-union", async function (session) {
    return await quickappunion.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-kuaishou", async function (session) {
    return await kuaishouApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-lark", async function (session) {
    return await mplarkApp.startSession(session);
  });
  
  hx.workspace.registerWorkspaceFolderLauncher("uni-app:mp-jd", async function (session) {
    return await mpjdApp.startSession(session);
  });
  
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
  activate,
  deactivate
}
