const hx = require('hbuilderx')
const vscode = require('vscode');

function runSession() {
	const debugSessions = []
	const vueDevtoolsTips = "vue-devtools调试";

	return {
		vueDevtoolsTips() {
			return vueDevtoolsTips;
		},
		hideDevtool() {
			return false;
		},
		async addDebugSession(debugSession) {
			if (debugSession) {
				debugSessions.push(debugSession);
			}
		},

		async removeDebugSession(debugSession) {
			if (debugSession) {
				const index = debugSessions.indexOf(debugSession);
				if (index > -1) {
					debugSessions.splice(index, 1);
				}
			}
		},

		async startUtsDebug(workspaceFolder, config) {
			var session = await vscode.debug.startDebugging(workspaceFolder, config);
			if (session && session.session) {
				this.addDebugSession(session);
			}
			return session;
		},

		async stopUtsDebug(debugSession) {
			if (debugSession && debugSession.session) {
				await vscode.debug.stopDebugging({
					session: debugSession.session
				});
			}
		},

		async start(session, type) {
			var typeStr = type;
			if (session && session.args) {
				if (session.args.miniProgram) {
					typeStr = "uni-app:miniProgram"
				}
			}
			var resolveLaunch;
			try {
				if (typeStr)
					resolveLaunch = await hx.workspace.resolveLaunchConfiguration(typeStr, session.workspaceFolder);
			} catch (e) {

			}

			if (resolveLaunch && resolveLaunch.get("openVueDevtools")) {
				this.startVuedevtools(session, true);
			} else {
				await hx.app.startProject(session);
			}
		},

		async stop(session) {
			await hx.app.stopProject(session);
			await this.closeWebviewDialog(session);
		},

		async closeWebviewDialog(session) {
			const devtoolsPluginName = 'uni-vue-devtools';
			const devtoolsPlugin = await hx.extensions.getExtension(devtoolsPluginName);
			if (devtoolsPlugin && session) {
				await devtoolsPlugin.closeWebviewDialog({
					workspaceFolder: session.workspaceFolder,
					platform: session.args.platform
				});
			}
		},
		debounce(callback, delay = 600) {
			let timer;
			return function() {
				if (timer) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					callback.call(this)
				}, delay)
			}
		},
		throttle(callback, delay = 1000) {
			let timer;
			return function(...args) {
				if (timer) { return }
				timer = setTimeout(() => {
					timer = null
				}, delay)
				callback.apply(this, args)
			}
		},
		async startVuedevtools(session, sessionCompile) {
			const devtoolsPluginName = 'uni-vue-devtools'
			var existsPlugin = await hx.extensions.existsPlugin(devtoolsPluginName);
			console.warn('existsPlugin', existsPlugin)
			if (existsPlugin && !existsPlugin.exists) {
				const pluginTipText = `当前操作依赖插件【${devtoolsPluginName}】,请安装后再试`;
				const msgBoxBtnInstall = "安装(&O)";
				const msgBoxBtnCancel = "取消(&C)";

				const result = await hx.window.showMessageBox({
					type: 'warning',
					title: '',
					text: pluginTipText,
					buttons: [msgBoxBtnInstall, msgBoxBtnCancel]
				});

				if (result == msgBoxBtnInstall) {
					hx.extensions.installPlugin(devtoolsPluginName);
				}
				return;
			} else {
				const devtoolsPlugin = await hx.extensions.getExtension(
					devtoolsPluginName);
				const compileArgs = await devtoolsPlugin.getDevtoolsArgs({
					workspaceFolder: session.workspaceFolder,
					platform: session.args.platform
				});
				var startSession = session;
				startSession.compileArgs = compileArgs
				if (sessionCompile) {
					await hx.app.startProject(startSession)
				} else {
					const isRestart = await devtoolsPlugin.getIsRestart({
						workspaceFolder: session.workspaceFolder,
						platform: session.args.platform
					});
					if (isRestart) {
						await hx.app.stopProject(session);
						await hx.app.startProject(startSession);
					}
				}

			}
		}
	}
}

module.exports = {
	runSession
}

