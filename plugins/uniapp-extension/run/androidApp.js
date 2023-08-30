const hx = require('hbuilderx')
const vscode = require('vscode');
const path = require("path");
const fs = require("fs");
const { runSession } = require("./runSessionUtil");


var debugSession;

async function initSession(session) {
	const viewId = `workbench.view.console.${session.args.udid}`;
	const viewTitle = `${session.workspaceFolder.name}-${session.args.name}`;
	const utsDebugText = "uts调试";
	const weexDebugText = "uni/nvue调试";
	const restartAppTips = "重启应用";
	const restartTips = "重新运行(Ctrl+F5)";
	const stopTips = "停止运行(Ctrl+Shift+F5)";
	const startAppTips = "运行(Ctrl+F5)";
	const utsDebugTitle = viewTitle + "-uts调试";
	const runSessionInit = runSession()

	hx.debug.onDidTerminateDebugSession(async function(session) {
		if (!session) return;
		if (!debugSession) return;
		if (session.session === debugSession.session) {
			await runSessionInit.stopUtsDebug(debugSession);
			await runSessionInit.removeDebugSession(debugSession);
			debugSession = null;
		}
	});

	const launcherExists = await hx.extensions.existsPlugin('launcher');
	if (launcherExists && launcherExists.exists) {
		let launcher = hx.extensions.getExtension("launcher");
		launcher.onDidTerminatelauncherSession && launcher.onDidTerminatelauncherSession(async function(udid) {
			if (udid === session.args.udid) {
				session.stop()
			}
		})
	}

	await session.init({
		autoDelete: false,
		consoleOptions: {
			id: viewId,
			title: viewTitle,
			toolbarItems: [{
					type: 'button',
					tooltips: runSessionInit.vueDevtoolsTips(),
					isHidden: runSessionInit.hideDevtool(),
					when: `viewId == '${viewId}' && isVue3 <- '${session.workspaceFolder.uri.fsPath}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
					icon: {
						normal: "hxtheme://vue-debug.png",
						hover: "hxtheme://vue-debug-hover.png"
					},
					onClick: runSessionInit.debounce(async () => {
						await runSessionInit.startVuedevtools(session);
					})
				},
				{
					type: 'button',
					when: `viewId == '${viewId}' && workspaceFolder.type == 'UniApp_Vue'  && (session.state == 'STARTING' || session.state == 'STARTED')`,
					icon: {
						normal: "hxtheme://debug.png",
						hover: "hxtheme://debug-hover.png"
					},
					tooltips: "",
					menu: [{
							title: weexDebugText,
							onClick: async function() {
								await hx.app.startWeexDebug(session);
							},
						},
						{
							title: utsDebugText,
							when: `viewId == '${viewId}' && isUts <- '${session.workspaceFolder.uri.fsPath}' && (session.state == 'STARTING' || session.state == 'STARTED')`,
							onClick: async function() {
								if (debugSession && debugSession.session) {
									const stopUtsDebugText = "是否需要停止uts调试";
									const yesText = "是(&O)";
									const noText = "否(&C)";
									const result = await hx.window.showMessageBox({
										type: 'warning',
										title: '',
										text: stopUtsDebugText,
										buttons: [yesText, noText]
									});
									if (result == yesText) {
										await runSessionInit.stopUtsDebug(debugSession);
										debugSession = null;
									}
									return;
								}
								const pluginList = ["launcher", "uts-android-debug",
									"uniapp-uts-v1"
								];
								for (const name of pluginList) {
									var existsPlugin = await hx.extensions.existsPlugin(name);
									if (existsPlugin && !existsPlugin.exists) {
										const pluginTipText = `当前操作依赖插件【${name}】,请安装后再试`;
										const msgBoxBtnInstall = "安装(&O)";
										const msgBoxBtnCancel = "取消(&C)";

										const result = await hx.window.showMessageBox({
											type: 'warning',
											title: '',
											text: pluginTipText,
											buttons: [msgBoxBtnInstall, msgBoxBtnCancel]
										});

										if (result == msgBoxBtnInstall) {
											hx.extensions.installPlugin(name);
										}
										return;
									}
								}

								let extension = hx.extensions.getExtension("launcher");
								if (extension) {
									console.log("开始获取配置信息::");
									var debugInfo = await extension.getAndroidLaunchInfo({
										udid: session.args.udid
									});

									console.log("getAndroidLaunchInfo::", debugInfo);

									const errDebug = "配置信息获取失败...";
									const inputDirError = "项目路径获取失败...";
									const outputDirError = "编译目录输出目录获取失败...";
									const processIdError = "获取process失败...";
									const adbPathError = "adb路径获取失败...";
									const adbPortError = "adb端口获取失败...";
									const runStateError = "App启动中,请等待App启动完成后点击uts调试...";

									if (!debugInfo) {
										await session.console.appendLine({
											line: errDebug,
											level: "error"
										});
									};

									if (!debugInfo.inputDir || !fs.existsSync(debugInfo
											.inputDir)) {
										await session.console.appendLine({
											line: inputDirError,
											level: "error"
										});
										return;
									}

									if (!debugInfo.outputDir || !fs.existsSync(debugInfo
											.outputDir)) {
										await session.console.appendLine({
											line: outputDirError,
											level: "error"
										});
										return;
									}

									if (!debugInfo.processId || Number.parseInt(debugInfo
											.processId) < 1) {
										await session.console.appendLine({
											line: processIdError,
											level: "error"
										});
										return;
									}

									if (!debugInfo.adbPath || !fs.existsSync(debugInfo
											.adbPath)) {
										await session.console.appendLine({
											line: adbPathError,
											level: "error"
										});
										return;
									}

									if (!debugInfo.adbPort || Number.parseInt(debugInfo
											.adbPort) < 1) {
										await session.console.appendLine({
											line: adbPortError,
											level: "error"
										});
										return;
									}

									if (Number.parseInt(debugInfo.runState) != 1) {
										await session.console.appendLine({
											line: runStateError,
											level: "error"
										});
										return;
									}

									var workspaceFolder = session.workspaceFolder;
									var config = {
										"type": "android",
										"request": "attach",
										"name": utsDebugTitle,
										"appSrcRoot": debugInfo.outputDir,
										"processId": debugInfo.processId,
										"adbPort": debugInfo.adbPort,
										"adbPath": debugInfo.adbPath,
										"webRoot": debugInfo.inputDir,
										"uniapputs": path.join(hx.env.appRoot, "plugins",
											"uniapp-uts-v1")
									};

									await session.console.appendLine({
										line: "开启uts调试",
										level: "info"
									});

									debugSession = await runSessionInit.startUtsDebug(
										workspaceFolder, config);
									if (debugSession && debugSession.session) {
										await session.console.appendLine({
											line: "uts调试开启成功",
											level: "success"
										});
									} else {
										await session.console.appendLine({
											line: "uts调试开启失败",
											level: "success"
										});
									}
								}
							}
						}
					],
					onClick: async function() {}
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
						await runSessionInit.stopUtsDebug(debugSession);
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
					onClick: runSessionInit.debounce(async () => {
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
						//await runSessionInit.stopUtsDebug(debugSession);
						await session.start();
					}
				}
			].filter((item) => {
				return item && !item.isHidden
			})
		}
	}, true);
}


async function start(session, runSessions, type) {
	await runSessions.start(session, type);
}

async function stop(session, runSessions) {
	await runSessions.stop(session);
	if (debugSession) {
		await runSessions.stopUtsDebug(debugSession);
	}
}

async function startSession(session, type) {
	const runSessions = runSession()
	await initSession(session);
	return {
		start: runSessions.throttle(async function() {
			if (session.args && session.args.udid) {
				let launcher = hx.extensions.getExtension("launcher");
				if (launcher && launcher.deviceIsConnected) {
					const device = await launcher.deviceIsConnected(session.args.udid, session)
					if (!device) {
						await session.stop();
						return
					}
				}
			}
			await start(session, runSessions, type);
		}),
		stop: runSessions.throttle(async function() {
			await stop(session, runSessions);
		})
	}
}

module.exports = {
	startSession
}

