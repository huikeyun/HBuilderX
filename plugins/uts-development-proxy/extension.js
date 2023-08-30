const nls = require('hxnls')
const localize = nls.config({
	messageFormat: nls.MessageFormat.both,
	bundleFormat: nls.BundleFormat.standalone
})(__filename)
const hx = require('hbuilderx')
const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const ios = 'uts-development-ios'
const android = 'uts-development-android'
const pluginCheckInstall = async (plugin, callback = () => {}) => {
	const installText = localize(0, null);
	const cancelText = localize(1, null);
	const tipTextAndroid = localize(2, null);
	const tipTextIOS = localize(3, null);
	const existsPlugin = await hx.extensions.existsPlugin(plugin);
	if (existsPlugin.code === 0 && !existsPlugin.exists) {
		let result = await hx.window.showInformationMessage(plugin === android ? tipTextAndroid : tipTextIOS, [
			installText,
			cancelText
		]);
		if (result == installText) {
			let installPlugin = await hx.extensions.installPlugin(plugin)
			if (installPlugin.code === 0) {
				callback()
			} else {
				callback()
			}
		} else {
			callback()
		}
	}
}

const isUts = (file) => {
	if (!file) return false
	const uts = path.extname(file) === '.uts' || path.extname(file) === '.vue'
	return uts
}
const isAndroid = (file) => {
	if (!file) return false
	const android = file.toLowerCase().includes('app-android')
	return android
}
const isIOS = (file) => {
	if (!file) return false
	const ios = file.toLowerCase().includes('app-ios')
	return ios
}

// 创建uts平台目录
async function createUtsPlatformDirectory(param, name){
    const {
        fsPath
    } = param;
    console.log(name)
    if(fs.existsSync(fsPath)){
        const targetDir = path.join(fsPath, name);
        if(!fs.existsSync(targetDir)){
            fs.mkdirSync(targetDir);
        }
    }
}

const namePlaceholder = localize(4, null);
const listTitle = localize(5, null);
const defaultTemplate = localize(6, null);
// 创建uts文件
async function createUtsFile(param){
    console.log(param)
    let result = await hx.window.showFileWizardDialog({
        defaultName:"index.uts",
        suffix:".uts",
        template:[defaultTemplate],
        namePlaceholder,
        listTitle
    });
    if(result){
        if(result.template === defaultTemplate){
            fs.writeFile(result.file,"",()=>{
                hx.workspace.openTextDocument(result.file);
            });
        }
    }
    console.log(result);
}

const PLATFORMS = ["app-android", "app-ios", "web", "mp-alipay", "mp-baidu", "mp-jd", "mp-kuaishou", "mp-lark", "mp-qq", "mp-toutiao", "mp-weixin", "mp-xhs"];
// 创建uts组件文件
async function createUtsComponentFile(param) {
    console.log(param)
    const templatesNames = [defaultTemplate];
    let result = await hx.window.showFileWizardDialog({
        defaultName: "index.vue",
        suffix: ".vue",
        template: templatesNames,
        namePlaceholder,
        listTitle
    });
    if (result) {
        if (result.template === defaultTemplate) {
            const defaultTemplateContent = `<template>
	<view>
        
	</view>
</template>

<script lang="uts">

</script>
`;
            // 获取当前平台
            try {
                const res = /utssdk[/\\]([^/\\]+)([/\\]([^/\\]+))?/g.exec(param.fsPath);
                if(res && res.length > 2){
                    let platform = res[1];
                    let templatePath = path.join(__dirname, "template", (platform + ".vue"));
                    if(!fs.existsSync(templatePath)){
                        platform = res[2];
                        templatePath = path.join(__dirname, "template", (platform + ".vue"));
                    }
                    if(fs.existsSync(templatePath)){
                        fs.copyFile(templatePath, result.file, fs.constants.COPYFILE_EXCL, (err) => {
                            if(!err){
                               hx.workspace.openTextDocument(result.file);
                            }
                        })
                        return;
                    }
                }
            }
            catch (e) {}
            fs.writeFile(result.file, defaultTemplateContent, () => {
                hx.workspace.openTextDocument(result.file);
            });
        }
    }
    console.log(result);
}

function activate(context) {
    let disposable_android = hx.commands.registerCommand('create.uts.directory.app.android', (param)=>{createUtsPlatformDirectory(param, "app-android")});
    let disposable_ios = hx.commands.registerCommand('create.uts.directory.app.ios', (param)=>{createUtsPlatformDirectory(param, "app-ios")});
    let disposable_web = hx.commands.registerCommand('create.uts.directory.web', (param)=>{createUtsPlatformDirectory(param, "web")});
    let disposable_weixin = hx.commands.registerCommand('create.uts.directory.mp.weixin', (param)=>{createUtsPlatformDirectory(param, "mp-weixin")});
    let disposable_alipay = hx.commands.registerCommand('create.uts.directory.mp.alipay', (param)=>{createUtsPlatformDirectory(param, "mp-alipay")});
    let disposable_baidu = hx.commands.registerCommand('create.uts.directory.mp.baidu', (param)=>{createUtsPlatformDirectory(param, "mp-baidu")});
    let disposable_kuaishou = hx.commands.registerCommand('create.uts.directory.mp.kuaishou', (param)=>{createUtsPlatformDirectory(param, "mp-kuaishou")});
    let disposable_lark = hx.commands.registerCommand('create.uts.directory.mp.lark', (param)=>{createUtsPlatformDirectory(param, "mp-lark")});
    let disposable_qq = hx.commands.registerCommand('create.uts.directory.mp.qq', (param)=>{createUtsPlatformDirectory(param, "mp-qq")});
    let disposable_toutiao = hx.commands.registerCommand('create.uts.directory.mp.toutiao', (param)=>{createUtsPlatformDirectory(param, "mp-toutiao")});
    let disposable_jd = hx.commands.registerCommand('create.uts.directory.mp.jd', (param)=>{createUtsPlatformDirectory(param, "mp-jd")});
    let disposable_xhs = hx.commands.registerCommand('create.uts.directory.mp.xhs', (param)=>{createUtsPlatformDirectory(param, "mp-xhs")});
    let disposable_file = hx.commands.registerCommand('create.uts.file', createUtsFile);
    let disposable_file1 = hx.commands.registerCommand('create.uts.component.file', createUtsComponentFile);
    context.subscriptions.push([disposable_android, disposable_ios, disposable_web, disposable_weixin
    , disposable_alipay, disposable_baidu, disposable_kuaishou, disposable_lark, disposable_qq, disposable_toutiao
    ,disposable_jd, disposable_xhs, disposable_file, disposable_file1]);
    
	let state = {
		ios: false,
		android: false
	}
	const callback = () => {
		if (state.ios && state.android) {
			changeListener && changeListener.dispose && changeListener.dispose()
		}
	}
	const handle = (TextEditor) => {
		if (state.ios && state.android) return
		const file = TextEditor?.fileName || TextEditor?.document?.fileName
		if (isUts(file)) {
			if (isAndroid(file)) {
				if (state.android) return
				state.android = true
				pluginCheckInstall(android, callback)
			}
			if (isIOS(file)) {
				if (state.ios) return
				state.ios = true
				pluginCheckInstall(ios, callback)
			}
		}
	}
	const activeTextEditor = vscode.window.activeTextEditor
	handle(activeTextEditor)
	const changeListener = vscode.window.onDidChangeActiveTextEditor(handle);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
