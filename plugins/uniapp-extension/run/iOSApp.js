const hx = require('hbuilderx')
const vscode = require('vscode');
const path = require("path");
const os = require("os");
const fs = require("fs");
const {
	execSync
} = require('child_process');
const {
	runSession
} = require("./runSessionUtil");

var debugSession;
let runState = false

async function initSession(session) {
	const viewId = `workbench.view.console.${session.args.udid}`;
	const viewTitle = `${session.workspaceFolder.name}-${session.args.name}`;
	const utsDebugText = "uts调试";
	const weexDebugText = "uni/nvue调试";
	const restartAppTips = "重启应用";
	const restartTips = "重新运行(Ctrl+F5)";
	const stopTips = "停止运行(Ctrl+Shift+F5)";
	const startAppTips = "运行(Ctrl+F5)";
	const utsDebugTitle = viewTitle + "-uts-iOS调试";
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
						hover: "hxtheme://vue-debug-hover.png",
					},
					onClick: runSessionInit.debounce(async () => {
						await runSessionInit.startVuedevtools(session);
					})
				},
				{
					type: 'button',
					when: `viewId == '${viewId}' && workspaceFolder.type == 'UniApp_Vue'&& (session.state == 'STARTING' || session.state == 'STARTED')`,
					icon: {
						normal: "hxtheme://debug.png",
						hover: "hxtheme://debug-hover.png"
					},
					tooltips: '',
					menu: [{
							title: weexDebugText,
							onClick: async function() {
								await hx.app.startWeexDebug(session);
							},
						},
						{
							title: utsDebugText,
							hidden: session.args.platform !== 'iOS-iPhone',
							when: `viewId == '${viewId}' && isUts <- '${session.workspaceFolder.uri.fsPath}' && (session.state == 'STARTING' || session.state == 'STARTED') && isMac`,
							onClick: async function() {
								try {
									if (runState) return
									runState = true
									execSync('xcodebuild -version');
									const pluginList = ["launcher", "uts-debug-ios",
										"uniapp-uts-v1"
									];
									for (const name of pluginList) {
										var existsPlugin = await hx.extensions
											.existsPlugin(name);
										if (existsPlugin && !existsPlugin.exists) {
											const pluginTipText =
												`当前操作依赖插件【${name}】,请安装后再试`;
											const msgBoxBtnInstall = "安装(&O)";
											const msgBoxBtnCancel = "取消(&C)";

											const result = await hx.window
												.showMessageBox({
													type: 'warning',
													title: '',
													text: pluginTipText,
													buttons: [msgBoxBtnInstall,
														msgBoxBtnCancel
													]
												});

											if (result == msgBoxBtnInstall) {
												hx.extensions.installPlugin(name);
											}
											return;
										}
									}
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
											await runSessionInit.stopUtsDebug(
												debugSession);
											debugSession = null;
										}
										return;
									}
									let extension = hx.extensions.getExtension(
										"launcher");

									let debugInfo = {
										runState: 0
									}
									debugInfo = await extension.getiOSLaunchInfo({
										udid: session.args.udid
									});

									console.error("debugInfo::", debugInfo);

									const inputDirError = "项目路径获取失败...";
									const outputDirError = "编译输出目录获取失败...";
									const iosBundleIdError = "iosBundleId获取失败...";
									const iosTargetError = "设备信息获取失败...";
									const runStateError = "请等待App启动完成后点击uts调试...";

									if (Number.parseInt(debugInfo.runState) != 1) {
										await session.console.appendLine({
											line: runStateError,
											level: "error"
										});
										return;
									}

									if (!debugInfo.iosTarget) {
										await session.console.appendLine({
											line: iosTargetError,
											level: "error"
										});
									}

									if (!debugInfo.iosBundleId) {
										await session.console.appendLine({
											line: iosBundleIdError,
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

									const innserVersion = debugInfo.innserVersion
									const unpackagePath = path.resolve(path.dirname(
										debugInfo.ipaPath), '../')
									const cachePath = path.resolve(unpackagePath,
										'./cache')
									const debugPath = path.resolve(unpackagePath,
										'./debug')
									const run = async (session, cachePath, debugPath,
										innserVersion) => {
										const ok = '确定'
										const cancel = '取消'
										const result = await hx.window
											.showMessageBox({
												type: 'info',
												title: '编译提醒',
												text: '首次调试基座需重新编译动态库，是否继续？',
												buttons: [ok, cancel]
											})
										if (result === cancel) {
											return
										}
										emptyDir(cachePath)
										await hx.app.stopProject(session);
										await hx.app.startProject(session);
										fs.writeFileSync(path.resolve(debugPath,
											'v', ), innserVersion)
									}
									if (fs.existsSync(path.resolve(debugPath, 'v'))) {
										const v = fs.readFileSync(path.resolve(
											debugPath, 'v'), {
											encoding: "utf-8"
										})
										if (v !== innserVersion) {
											await run(session, cachePath, debugPath,
												innserVersion)
											return
										}
									} else {
										await run(session, cachePath, debugPath,
											innserVersion)
										return
									}

									extension.unpackIpaTofolder(debugInfo.ipaPath)
									const program = path.resolve(debugPath,
										'./Payload/HBuilder.app')
									if (!fs.existsSync(program)) {
										throw new Error("program don't exist")
									}
									var workspaceFolder = session.workspaceFolder;
									const sourceMap = {
										// '/Users/dcloud/srv/io.dcloud.package/package/test/wgtRoot/__UNI__005F1B1':debugInfo.outputDir
									}
									var config = {
										"name": utsDebugTitle,
										"type": "lldb",
										"request": "attach",
										"iosBundleId": debugInfo.iosBundleId,
										"iosTarget": debugInfo.iosTarget,
										"isUts": true,
										"inputDir": debugInfo.inputDir,
										program,
										"outputDir": debugInfo.outputDir,
										"debugDir": path.join(os.tmpdir(),
											'./ios_build_device/template/xcode_ust_template'
										),
										"convertFile": path.join(hx.env.appRoot,
											"plugins",
											"uniapp-uts-v1"),
										sourceMap
									};
									const utsDebugiOSExt = hx.extensions.getExtension(
										"uts-debug-ios");
									const debugConfig = await utsDebugiOSExt
										.resolveDebugConfiguration(workspaceFolder,
											config)

									console.error("debugConfig::", debugConfig);

									debugSession = await runSessionInit.startUtsDebug(
										workspaceFolder, debugConfig);
									if (debugSession && debugSession.session &&
										debugSession.success) {
										await session.console.appendLine({
											line: "uts调试开启成功",
											level: "success"
										});
									} else {
										await session.console.appendLine({
											line: "uts调试开启失败",
											level: "error"
										});
									}
								} catch (error) {
									await session.console.appendLine({
										line: error.toString(),
										level: 'error'
									});
								} finally {
									runState = false
								}
							}
						}
					].filter((item) => {
						return !item.hidden
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

const emptyDir = (dir) => {
	if (fs.existsSync(dir)) {
		fs.readdirSync(dir).forEach((file) => {
			const filePath = path.resolve(dir, file);
			if (fs.statSync(filePath).isDirectory()) {
				emptyDir(filePath);
			} else {
				fs.unlinkSync(filePath);
			}
		});
		fs.rmdirSync(dir);
	}
}

module.exports = {
	startSession
}