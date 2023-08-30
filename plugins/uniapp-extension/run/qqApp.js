const hx = require('hbuilderx')
const vscode = require('vscode');
const path = require("path");
const fs = require("fs");
const {runSession} = require("./runSessionUtil");

async function initSession(session) {
    const viewId = `workbench.view.console.qqAPPDevTools`;
    const viewTitle = `小程序 - QQ`;
    const restartAppTips = "重启应用";
    const restartTips = "重新运行(Ctrl+F5)";
    const stopTips = "停止运行(Ctrl+Shift+F5)";
    const startAppTips = "运行(Ctrl+F5)";
    const runSessionInit  = runSession();
    
    await session.init({
        autoDelete: false,
        consoleOptions: {
            id: viewId,
            title: viewTitle,
            toolbarItems: [
                {
                    type: 'button',
                    tooltips: runSessionInit.vueDevtoolsTips(),
                    isHidden: runSessionInit.hideDevtool(),
                    when: `viewId == '${viewId}' && isVue3 <- '${session.workspaceFolder.uri.fsPath}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
                    icon: {
                        normal: "hxtheme://vue-debug.png",
                        hover: "hxtheme://vue-debug-hover.png",
                  },
                  onClick: runSessionInit.debounce(async () =>{
                      await runSessionInit.startVuedevtools(session);
                    })
                },
                {
                    type: 'button',
                    when: `viewId == '${viewId}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
                    icon: {
                        normal: "hxtheme://restart_app.png",
                        hover: "hxtheme://restart_app_hover.png"
                    },
                    tooltips: restartAppTips,
                    onClick: async function() {
                        await hx.app.restartProject(session);
                    }
                },
                {
                    type: 'button',
                    when: `viewId == '${viewId}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
                    icon: {
                        normal: "hxtheme://restart.png",
                        hover: "hxtheme://restart-hover.png"
                    },
                    tooltips: restartTips,
                    onClick:runSessionInit.debounce(async () =>{
                            await session.stop();
                            await session.start();
                        })
                },
                {
                    type: 'button',
                    when: `viewId == '${viewId}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
                    icon: {
                        normal: "hxtheme://stop.png",
                        hover: "hxtheme://stop-hover.png"
                    },
                    tooltips: stopTips,
                    onClick: async function() {
                        await session.stop();
                    }
                },
                {
                    type: 'button',
                    when: `viewId == '${viewId}' && (session.state == 'STOPPED' || session.state == 'STOPPING')`,
                    icon: {
                        normal: "hxtheme://start.png",
                        hover: "hxtheme://start-hover.png"
                    },
                    tooltips: startAppTips,
                    onClick: async function() {
                        await session.start();
                    }
                }
            ].filter((item)=>{
                return item && !item.isHidden
            })
        }
    }, true);
}


async function start(session,runSessions) {
    await runSessions.start(session);
}

async function stop(session,runSessions) {
    await runSessions.stop(session);
}

async function startSession(session) {
    const runSessions = runSession()
    await initSession(session);
    return {
        start: async function() {
            await start(session,runSessions);
        },
        stop: async function() {
            await stop(session,runSessions);
        }
    }
}

module.exports = {
    startSession
}