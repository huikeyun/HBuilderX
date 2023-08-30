# HBuilder X - Release Notes
======================================
## 3.8.12.20230817
### HBuilder
* Added Git plug-in In the address bar in the toolbar, add a Git branch name to the left of the project name, and you can easily perform Git-related operations after clicking 
* Language Server: JS, TS supports automatic repair of error checking
* Language Server: Added support to type `/**` on the ts method to automatically extract method parameter information to tsdoc
* Language Server: Fixed the bug that the text in the floating frame does not support copying by `ctrl + c`
* Language Server: Fixed the bug that the editor floating frame occasionally floats to other application windows
* Language Server: Typing `@` in the TS file block comment does not prompt the bug of the comment label
* Language Server: Enter `@` in the JS block comment of the vue file to prompt the comment label, and replace the bug with incorrect content after pressing Enter
* Language Server: Fixed the bug that there is no code hint in the vue/nvue file tag event
* Language Server: Fixed the bug that this in the Vue arrow function cannot access the vue instance
* Language Server: Fixed the bug that Vue API description internationalization fails
* Language Server: In some cases, the file code in the uniCloud directory prompts a slow bug
* Language Server: After the js syntax check is enabled, the js error in the vue file is incorrect Bug
* Language Server: Fixed the bug that the uni-app project cannot recognize the pinia module
* Language Server: Fixed the bug that the built-in module `(eg: @dcloudio/uni-app)` will not be prompted when the module name of the uni-app project is prompted
* Language Server: Fixed the bug that the occasional outline of vue and html files does not take effect
* Language Server: Fixed the html file, some template syntax may cause the bug that the code cannot be prompted
* Fixed code assistant, the bug that the next page button is still not grayed out when the list cannot be turned to the next page in some cases
* Language Server: Fixed the bug that in some cases, after HBuilderX exits, some node processes cannot exit correctly with 100% CPU
* Fixed multi-file search After specifying the search range, switching the editor tab causes the bug that the search range changes
* Fixed single-line comments, when the cursor is at the beginning of the line, the bug that the anti-comment does not take effect
* Fixed the bug that when the uni-app is running on a real machine, unplug the phone and plug it in again, re-running will cause repeated console logs and multiple compilation processes
* Fixed the bug that the `Restart Application` button in the console toolbar does not take effect after being clicked in some cases when the uni-app is running on a real machine
### uni-app plugin
* App-iOS Fixed The tabBar styles are abnormal when using font icons [Details](https://ask.dcloud.net.cn/question/173375)
* Douyin Added Support for running to specified pages
### uniCloud plugin
* Adjust uni-ai The Baidu LLM api s adjusted to [wenxin workshop](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/jlil56u11)
* Added uni-map-common A common module for aggregating cloud capabilities from multiple map providers [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-map-common.html)
* Added unicloud-map The cloud integrated component is mainly used to display custom POIs in the database and render them on the map [Details](https://uniapp.dcloud.net.cn/uniCloud/unicloud-map.html)
* Added unicloud-map Map management plugin, providing POI management, which can visually mark POIs on the management side [Details](https://uniapp.dcloud.net.cn/uniCloud/unicloud-map-admin.html)
* Added unicloud-city-select City selection component, making it convenient for users to quickly select the components of the target city in the application [Details](https://uniapp.dcloud.net.cn/uniCloud/unicloud-city-select.html)
* Added The parameter of Aliyun timing triggered function is align with Tencent cloud function [Details](https://uniapp.dcloud.net.cn/uniCloud/trigger.html#trigger-param)
* Added The _timing function of cloudobject add input parameters [Details](https://uniapp.dcloud.net.cn/uniCloud/trigger.html#cloudobject)
* Added uni-ai supports calling the iFly spark model through the developer's own key [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#get-llm-manager)
* Added Http request method uniCloud.request is available [Details](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#unicloud-request)
* Added Websocket client method uniCloud.connectSocket is available [Details](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#websocket-client)
### App plugin (5+ App & uni-app)
* Android Adapts to support Android 14
* Android Update the cloud packaging compileSdkVersion to 33
* Android Fixed The default language of the permission denied prompt text on the QR code scanning interface is incorrect [Details](https://ask.dcloud.net.cn/question/174032)
* iOS Fixed After update with wgt, installing the app without removing it cause white screen [Details](https://ask.dcloud.net.cn/question/163393)

## 3.8.7.20230703
### HBuilder
* Added support for `Ctrl + Tab` to quickly switch between views(macOS:shortcut `Alt + Tab`).
* Added automatic filling of `clogvar` code block with the nearest variable.
* Added support for code folding in the code block region of Markdown editor.
* Added support for automatic uploading of uni-app Alipay releases. [Details](https://hx.dcloud.net.cn/cli/publish-mp-alipay)
* Fixed language service caused slow HTML tag and attribute suggestions in certain cases.
* Fixed language service caused high CPU usage in certain cases.
* Fixed language service global class and ID definitions were not able to navigate to local definitions. [Details](https://ask.dcloud.net.cn/question/170668)
* Fixed language service paths starting with @/ in Vue files were unable to navigate to their definitions.
* Fixed language service TypeScript files in Vue CLI projects were incorrectly reported as errors.
* Fixed triggering comment with `Ctrl + / `on multiple lines would also comment the last line if the cursor was at the beginning of the line.
* Fixed inserting a blank line above with `Ctrl + Shift + Enter` would result in incorrect indentation in certain cases.
* Fixed the console log where shortcuts like `Shift + Up` or `Shift + Down` couldn't be used to select text.
* Fixed multi-file character search where the highlighting in the editor was not cleared after clicking "Reset".
* Fixed the bug that HBuilderX crashed during the multi-file character search in some cases
* Improved multi-file character search by increasing the display area for search results on small screens.
* Fixed multi-file character search where the input for include/exclude directories was not taken into account when clicking the "Search" button.
* Fixed the built-in browser where occasional crashes occurred when switching between preview and closing multiple times.
* Fixed switching the left-side view (such as the project explorer) while having multiple running consoles would cause misalignment of the buttons at the top of the console.
* Added plugin API `languages.registerInlineCompletionItemProvider` to support inline code completion. [Details](https://hx.dcloud.net.cn/ExtensionDocs/Api/languages/registerInlineCompletionItemProvider)
* Added plugin API `window.createStatusbarItem` to create a status bar item. [Details](https://hx.dcloud.net.cn/ExtensionDocs/Api/windows/createStatusBarItem) 
* Optimized the performance of the plugin API `console.appendLine` for logging.
### uni-app plugin
* App、Web Fixed Vue page textarea component height rendering exception [Details](https://ask.dcloud.net.cn/question/169380)
* App Updated Vue2 project nvue file event compilation [Details](https://ask.dcloud.net.cn/question/170516)
* App Fixed Text nodes in nvue files cannot use \n to wrap [Details](https://github.com/dcloudio/uni-app/issues/4215)
* App Fixed Some prompts for fingerprint authentication do not support internationalization [Details](https://ask.dcloud.net.cn/question/168473	)
* App Fixed The VideoContext method fails in some cases of the Vue3 project [Details](https://ask.dcloud.net.cn/question/168476)
* App-iOS Fixed uni.setTabBarItem dynamically sets gif images not to take effect [Details](https://ask.dcloud.net.cn/question/171342)
* App-iOS Fixed The nvue rich-text component may randomly appear on a white background when the text is rendered in a loop [Details](https://ask.dcloud.net.cn/question/171090)
* App-iOS Fixed The nvue video component height is set rpx may cause Controls not to appear [Details](https://ask.dcloud.net.cn/question/171037)
* App-iOS Fixed The tabBar icon is distorted when the width and height are inconsistent [Details](https://ask.dcloud.net.cn/question/172418)
* Web Updated uni.showToast text wrapping style [Details](https://github.com/dcloudio/uni-app/pull/4373)
* Web Fixed In some cases, the location selection interface displays abnormally [Details](https://ask.dcloud.net.cn/question/167071)
* Web Fixed Gaode map address name is missing [Details](https://ask.dcloud.net.cn/question/171013)
* Web Fixed darkmode configuration does not take effect [Details](https://github.com/dcloudio/uni-app/issues/4317)
* Mini Program Fixed Event compilation errors in some cases of nested lists [Details](https://ask.dcloud.net.cn/question/171043)
* Mini Program Fixed eventChannel disorder in some cases
* Mini Program Fixed Custom attribute names cannot use name, value  [Details](https://github.com/dcloudio/uni-app/pull/4257)
* Weixin Mini Program Fixed Report an error using requirePlugin [Details](https://github.com/dcloudio/uni-app/issues/4301)
* Douyin Mini Program Added Support consume-card, pay-button, rate-button, member-button components [Details](https://ask.dcloud.net.cn/question/167927)
* Douyin Mini Program Added showToast supports mask configuration [Details](https://ask.dcloud.net.cn/question/154332)
* Web platform, mini-program platform, App platform online push: Fixed uni-push2.0, which used to cause high-frequency push calls, leading to insufficient client memory and causing the client to get stuck (for mini-program platform, you need to add a new socket legal domain wshzn.getui.net:5223 to the whitelist, [Details](https://uniapp.dcloud.net.cn/unipush-v2.html#useinmp))
### uniCloud plugin
* [Important] Added uni-ai support making calls through the uni-ai billing gateway [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#api)
* Fixed The multi method of redis does not return results correctly when calling from local cloudfunction [Details](https://ask.dcloud.net.cn/question/171188)
* Added Extension uni-cloud-push can be used in local cloudfunction
* Optimized Aliyun The timeout period of invoke cloudfunction by cloudfunction is adjusted from 10 seconds to 60 seconds
* Added Aliyun Cloud Storage support directory [Details](https://uniapp.dcloud.net.cn/uniCloud/storage.html#storage-dir)
* Fixed jql The geoNear method returns incorrect results when it does not pass the query parameter [Details](https://ask.dcloud.net.cn/question/172404)
* Added uni-ai The chatCompletion method supports optimizedMessage events to optimize the frequency of message triggering and reduce client stuttering [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#chat-completion-stream)
### App plugin (5+ App & uni-app)
* Android Optimize The plus.runtime.install function as an independent module, it's not included when the Google Play channel, solve the problem that the Google Play report DCloud SDK contains downloading or installing applications from unknown sources [Details](https://ask.dcloud.net.cn/question/172533)
* Android Update the AndroidX library to version 1.1.0, solve the problem that the Google Play report androidx.fragment:fragment:1.0.0 SDK is obsolete
* Android Fixed The input box may be blocked when the soft keyboard pops up with version 3.8.4 [Details](https://ask.dcloud.net.cn/question/172135)
* iOS Adjust allowsInlineMediaPlayback defaults to ture, allow videos to play in full screen [Details](https://uniapp.dcloud.net.cn/collocation/manifest-app.html#full-manifest)
* iOS Adjust mediaPlaybackRequiresUserAction defaults to false, allows audio and video to control automatic playback through APIs [Details](https://uniapp.dcloud.net.cn/collocation/manifest-app.html#full-manifest)
* iOS Fixed setTitleNViewButtonStyle Styling title bar buttons may prevent them from displaying properly [Details](https://ask.dcloud.net.cn/question/172191)
* iOS Fixed The orientation of the video may be incorrect [Details](https://ask.dcloud.net.cn/question/171484)

## 3.8.4.20230531
### HBuilder
* Fixed the bug caused by 3.8.3 when the computer is connected to an external monitor and the multi-file character search function is activated, and the bug of switching to other screens [Details](https://ask.dcloud.net.cn/question/170787)
* Language Server: Fixed the bug that the class cannot be prompted for Vue files in some cases
* Language Server: Fixed In some cases, the language service is abnormal, prompting the bug of `The TypeScript language service died unexpectedly 5 times in the last 5 Minutes.`
* Language Server: Fixed the bug that in some cases, Node process takes up 100% of the CPU
### uni-app plugin
* App Fixed Vue2 project is not parsed accurately using the border-radius style in the nvue page style [Details](https://ask.dcloud.net.cn/question/168877)
* App-Android Fixed Some devices may report `Uncaught SyntaxError: Invalid or unexpected token at __uniappview.html:2` error cause white screen [Details](https://ask.dcloud.net.cn/question/170588)
* Mini Program Fixed Vue2 project compiles with errors when using global variables like JSON.stringify in templates [Details](https://ask.dcloud.net.cn/question/170722)
### App plugin (5+ App & uni-app)
* Android Fixed The input box focus switch may cause the page to display abnormally caused by version 3.8.3 [Details](https://ask.dcloud.net.cn/question/170689)

## 3.8.3.20230526
### HBuilder
* 【Important】Windows 64-bit system, HBuilderX built-in Node adjusted to 64-bit Node.exe.
* Optimize the multi-file character search from the toolbar to the left view of HBuilderX [Details](https://hx.dcloud.net.cn/Tutorial/UserGuide/node-multi-file-search).
* Optimize the left view of HBuilderX. The drop-down menu in the upper right corner of the top supports switching views of project manager, multi-file character search, debugging, etc.
* Language Server: Added "Find references" which codes the file is referenced by (right click on the file [File Find Reference]).
* Language Server: Added Vue and Html files to support ID and Class lookup references.
* Language Server: Added uni-app project component to support finding references.
* Language Server: Added Html file to introduce Vue.js support code Vue code prompt.
* Language Server: Optimize javascript/typescript function overload hints.
* Language Server: Fixed the bug that the prompt ratio of px to upx/rpx is set, and the code assistant prompts that the custom ratio does not take effect.
* Language Server: Fixed the js file. In some cases, require cannot prompt the bug of other js file paths.
* Language Server: Fixed the sorting rules of the code assistant, and fix the bug that the first item of typing unic under the uni-app project is not uniCloud.
* Language Server: Fixed the uni-app project, in some cases, the project does not exist in the uni_module directory, and the bug that the language service reports an error.
* Language Server: Fixed the bug that the path prompt at the beginning of uni-app/, the input completion item in the middle is incorrect.
* Language Server: Fixed the bug that the uts plug-in Android system API part of the type inheritance relationship error leads to the bug of syntax verification error.
* Language Server: Fixed the bug that some types of uts plug-in iOS are missing default constructors, which causes syntax verification errors.
* Language Server: Fixed the bug that the uts plug-in iOS String type method is incomplete and the syntax verification error is reported.
* Language Server: Fixed the bug that the template tag of the Vue file cannot prompt lang.
* Language Server: Fixed the bug that the template tag of the Vue file, when the lang attribute is empty, the html tag cannot prompt.
* Language Server: Fixed Vue file SCSS @ syntax, in some cases, the bug that the @ symbol replaces the wrong position after the code assistant enters.
* Language Server: Fixed Vue file SCSS, in some cases, !default and !global have no prompt Bug.
* Fixed Bug that cannot format files above 1M.
* Fixed formatting Format plug-in, when there is an indentation on the first line of the js file, the formatting will cause the indentation to be indented according to the first line as a whole Bug
* Fixed In some cases, when the project manager is always associated with the editor, opening a file under the sub-project or the parent project will cause the bug that the project manager scrolls incorrectly
* Optimize Alt+Tab to switch tabs, list item icons and project manager icons are consistent.
* Added MacOSX, App project, support to choose custom base to run to iOS Simulator [Details](https://uniapp.dcloud.net.cn/tutorial/run/run-custom-base-ios-simulator.html)
* Fixed the bug that when the uni-app project runs and downloads the compiler plug-in, in some cases, the console does not prompt to re-run.
* Added uni-app to support multiple projects to run to WeChat developer tools at the same time.
* Adjust the uts project, run it to the iOS simulator, the console shields the uts debugging entry, and does not support the uts debugging of the iOS simulator.
* Adjust uts project, uts Android development extension, increase gradle version limit, only support version 7.6.1 and below.
* Fixed uni-app when the project contains uts authorized version of the plug-in, submitting the bug that the server failed to make a custom debugging base.
* 【Important】Adjust the uni-app manifest.json and package window, delete the entrance of the interactive game (Cash Out Cat), this advertising business will be officially offline on May 31.
* Added uniCloud Aliyun, the front-end web page hosts a custom domain name, and automatically refreshes the CDN after uploading files.
### uniCloud plugin
* Added uni-ai Support azure chatCompletion api [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#get-llm-manager)
* Added uni-ai Add text to image api [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#ai-media)
* Fixed jql Some requests execute slowly in some situation [Details](https://ask.dcloud.net.cn/question/170035)
### uni-app plugin
* App Fixed Vue3 project picker-view component using v-if toggle error [Details](https://ask.dcloud.net.cn/question/166884)
* App, Web Updated Socket connection onClose event information increases Code and Reason attributes
* App, Web optimize navigationBarBackgroundColor, navigationBarTextStyle default [Details](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)
* App Fixed Vue3 project uses pure NVue development to turn to the homepage when the heat load jumps to the homepage [Details](https://ask.dcloud.net.cn/question/164673)
* App Fixed The new language of international configuration is not good [Details](https://ask.dcloud.net.cn/question/165884)
* App Fixed Vue3 project nvue page configuration flex-direction default value invalid [Details](https://ask.dcloud.net.cn/question/165497)
* App Fixed Vue3 project vue page text component nest text component show abnormality [Details](https://github.com/dcloudio/uni-app/issues/4215)
* App Fixed the bug that clicked the error after configuring type="checkbox" on the nvue page switch component [Details](https://ask.dcloud.net.cn/question/168894)
* App-Android Fixed The WebSocket closure with a code value of 1001 that is being listened to by uni.onSocketClose may not trigger the callback
* App-Android Fixed The existence of special characters in nvue pages may cause crashes [Details](https://ask.dcloud.net.cn/question/166447)
* App-Android Fixed The nvue pages may render abnormally when in App floating window mode [Details](https://ask.dcloud.net.cn/question/156014)
* App-Android Fiexd Special characters in the text component of nvue pages will not be displayed [Details](https://ask.dcloud.net.cn/question/166014)
* App-Android Fixed The prompt text for permission denied on the Scan Code page does not support internationalization [Details](https://ask.dcloud.net.cn/question/169217)
* App-iOS Fixed uni.scanCode may cause the application to freeze after scanning the code [Details](https://ask.dcloud.net.cn/question/160090)
* Web Fixed onError invalid in the Vue3 project script setup [Details](https://ask.dcloud.net.cn/question/164798)
* Web Fixed Gaode navigation destination name display exception [Details](https://ask.dcloud.net.cn/question/165669)
* Web Fixed Gaode no locate permission did not trigger fail callback [Details](https://ask.dcloud.net.cn/question/166298)
* Web Fixed Gaode map callout layout exception [Details](https://github.com/dcloudio/uni-app/issues/4230)
* Web Updated Cancel coordinate system conversion when using IP positioning [Details](https://github.com/dcloudio/uni-app/issues/4248)
* Web Fixed Vue3 project input component uses v-model when input is out of focus too fast [Details](https://ask.dcloud.net.cn/question/166821)
* Mini Program Updated Vue2 project adds slotMultipleInstance configuration to support scoped slot rendering of multiple instances [Details](https://github.com/dcloudio/uni-app/issues/3503)
* Mini Program Updated Vue2 project v-for supports index parameter when traversing objects [Details](https://ask.dcloud.net.cn/question/163685)
* Mini Program Fixed Vue2 project event expressions containing multiple function statements compiled invalid [Details](https://ask.dcloud.net.cn/question/147342)
* Mini Program Fixed Vue3 project page style file is missing after compilation [Details](https://ask.dcloud.net.cn/question/163867)
* Mini Program Fixed Vue2 project compiles invalidly with static directory condition when using high version CopyWebpackPlugin [Details](https://github.com/dcloudio/uni-app/issues/4181)
* Baidu Mini Program, Alipay Mini Program Added Support for running to specified pages
* Weixin Mini Program Fixed Support for enterprise applets onNFCReadMessage life cycle [Details](https://ask.dcloud.net.cn/question/166024)
* Weixin Mini Program Fixed Vue3 project mixed subcontracting part of the case of interface calls reported error [Details](https://github.com/dcloudio/uni-app/issues/4175)
* Alipay Mini Program Fixed The component styleIsolation is configured to apply-shared by default.
* Alipay Mini Program Fixed Vue3 project page - meta component foot-font-size attribute is invalid
* ByteDance Mini Program Fixed Fix aweme-data component not rendering properly
* uni-ad manages background page adjustments, adjusts the basic ads of the app, and enhances the classification concept of advertisements [Details](https://uniapp.dcloud.net.cn/uni-ad/release.html)
### App plugin (5+ App & uni-app)
* Android Fixed The playground may fail to synchronize files [Details](https://ask.dcloud.net.cn/question/169374)
* Android Fixed The prompt text for permission denied on the Scan Code page does not support internationalization [Details](https://ask.dcloud.net.cn/question/169217)
* Android Fixed The advertisData field of BluetoothDeviceInfo may lose data [Details](https://ask.dcloud.net.cn/question/165119)
* Android Fixed After the app switches languages, the restart may flash the screen [Details](https://ask.dcloud.net.cn/question/166730)
* Android Fixed In certain situations, the software keyboard may pop up and immediately collapse [Details](https://ask.dcloud.net.cn/question/161957)
* Android Fixed plus.navigator.updateSplashscreen may not take effect [Details](https://ask.dcloud.net.cn/question/164023)
* iOS Fixed Apple in-app payments are unresponsive after plus.runtime.restart
* iOS Fixed Entering a video page that contains video playback controls interrupts music playback [Details](https://ask.dcloud.net.cn/question/165329)
* iOS Fixed The navigation bar titleNView setting splitLine style may not display correctly [Details](https://ask.dcloud.net.cn/question/164906)

## 3.7.11.20230427
### uni-app plugin
* Added UTS plug-in in the plug-in market to support publishing encrypted payment type plug-ins. [Details](https://uniapp.dcloud.net.cn/plugin/publish.html#uts)
### uniCloud plugin
* Fixed When using the vue3 project to publish to the web, uniCloud.SSEChannel's open method reported an error

## 3.7.10.20230425
### uniCloud plugin
* [Important] Added uni-cloud-ai extension, provide AI conversation capabilities [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html)
* [Important] Added uni-cms, A full-end, cloud-integrated open source CMS content management system with built-in AI-generated content and ads to unlock monetization [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-cms.html)
* Added uni-ai response in stream format [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-ai.html#chat-completion-stream)
* Added Server sent event channel between cloudfunction and client [Details](https://uniapp.dcloud.net.cn/uniCloud/sse-channel.html)
* Updated The dynamic enum configured in schema removes the enumeration limit of only 500 entries when validating data
* Added The primaryCollection parameter is added to the subtable read event in the trigger, and the value is the table name of the primary table in this contingency query
* Added Server sent event channel between cloudfunction and client [Details](https://uniapp.dcloud.net.cn/uniCloud/sse-channel.html)
* Updated HBuilderX automatically pulls schemas and schema extension js with the same name in opendb when creating a schema or schema extension js from opendb
* Added JQL supports IN syntax, querying a field and another table specifying records that match the field [Details](https://uniapp.dcloud.net.cn/uniCloud/jql.html#enhanced-in)

## 3.7.9.20230324
### HBuilder
* Language Server: Fixed the bug that 404 is displayed after the URL of the help document in the code assistant is redirected due to the change of the Vue domain name
* Fixed the bug that HBuilderX crashes when you right-click the schema.json file in 3.7.8 to download DB Schema
* Fixed js-beautify formatting plug-in, when the indentation is set to `tab`, the ts file formatting causes the bug that the indentation in the comment is wrong
* Fixed the bug caused by 3.7.8, some low-version MacOSX operating systems, no iOS mobile phone detected
### uniCloud plugin
* Added The JQL syntax supports querying records where one field and another table specify a field equally [Details](https://uniapp.dcloud.net.cn/uniCloud/jql.html#enhanced-in)

## 3.7.8.20230323
### HBuilder
* Added a built-in formatting plug-in, which supports the use of the .jsbeautifyrc configuration file under the project [Details](https://hx.dcloud.net.cn/Tutorial/extension/js-beautify)
* Fixed the bug that the built-in formatting plug-in does not support formatting the ts code in the Vue file.
* Language Server: Fixed Vue file `this.xxx = ...`, xxx cannot go to the defined bug.
* Language Server: Fixed the uni-app cli ts project, after using pnpm to install the module, opening the vue file under the project causes the language service to crash.
* Fixed the bug that the language service ts file in some cases, the ts grammar check does not take effect
* Optimize settings, language service configuration, enable code assistant, after modifying configuration items, it will take effect without restarting HBuilderX
* Fixed Enable .editorconfig support, when configuring `insert_final_newline`, accidentally touch the bug of the code assistant when saving
* Fixed Enable .editorconfig support, if the last line of the Vue file does not wrap, the bug that the file content will be wrong when saving
* Fixed MacOSX, run the App to iOS, the device selection window, in some cases, the bug that the iOS device is repeatedly displayed
* Added uni-app uts plug-in to run to iOS to support debugging (requires MacOSX) [Details](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug-ios.html)
### uni-app plugin
* Web、App Fixed NodesRef cannot get properties [Details](https://ask.dcloud.net.cn/question/163535)
* Web Fixed The markertap event will be triggered when the Gaode map is zoomed [Details](https://ask.dcloud.net.cn/question/162763)
* App Updated The video component supports the isLive property
* App Fixed uni.uploadFile interface timeout configuration is invalid [Details](https://ask.dcloud.net.cn/question/163747)
* App Fixed onPageScroll and onReachBottom are invalid when the Vue2 project uses the composition API [Details](https://ask.dcloud.net.cn/question/162503)
* App-Android Fixed Using Secure Network may cause a crash on some devices
* App-iOS Fixed The nvue page component may occasionally crash when setting the border style [Details](https://ask.dcloud.net.cn/question/164236)
* App-iOS Fixed The nvue page loading component event does not fire properly [Details](https://ask.dcloud.net.cn/question/163143)
* Mini Program Fixed In some cases of Vue2 projects, v-for nested v-model is invalid after compilation
* JingDong Mini Program Added Support compiling Vue3 projects [Details](https://github.com/dcloudio/uni-app/pull/4023)
* Weixin Mini Program Added Support Skyline gesture [Details](https://ask.dcloud.net.cn/question/162700)
* Weixin Mini Program Fixed Some attributes of components such as share-element are invalid. [Details](https://ask.dcloud.net.cn/question/163926)
* Alipay Mini Program Fixed Vue3 project page-meta component page-style attribute is invalid. [Details](https://ask.dcloud.net.cn/question/163563)
* ByteDance Mini Program Fixed uni.chooseImage does not support sizeType configuration. [Details](https://ask.dcloud.net.cn/question/163986)
### uniCloud plugin
* [Important] Added uni facial recognition verify. All-in-one financial-grade security in the cloud [Details](https://uniapp.dcloud.net.cn/uniCloud/frv/intro)
* [Important] uni-id-pages adds real-name authentication function [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-id-summary.html#frv)
* [Important] Added uni-frv-external cloud-integrated template for non-uniCloud business to use the real-name authentication function [Details](https://uniapp.dcloud.net.cn/uniCloud/frv/dev.html#uni-frv-external)
* Added The uni-cloud-s2s public module is added to solve the problem of mutual trust between the uniCloud and the traditional server [Details](https://uniapp.dcloud.net.cn/uniCloud/uni-cloud-s2s.html)
* Fixed uniCloud HBuilderX plugin In some cases, modifying a JS file does not take effect in real time
* Fixed uniCloud HBuilderX plugin In some cases, modifying dependencies of cloudfunction causes package.json content error [Details](https://ask.dcloud.net.cn/question/165273)
* Updated Secure Network The WeChat Mini Program allows secure network handshake without calling the uni-id-co method [Details](https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#mp-weixin-without-uni-id-pages)
* Updated uniCloud HBuilderX plugin When you call a local cloudfunction, each project fixes 4 cloudfunction instances to a minimum of 2 instances and a maximum of 8 instances
* Updated uniCloud HBuilderX plugin Call local cloudfunction stop waiting for instances to be idle when all instances are occupied, and directly reject the call request
* Updated Aliyun The maximum timeout for client connection to cloudfunction is adjusted from 20 seconds to 40 seconds
* Updated Aliyun The QPS limit of http trigger through default domain is adjusted from 100 to 1000
* Updated Aliyun The limit for CDN refreshes for front-end web hosting has been adjusted from 3/h to 10/h
* Fixed Aliyun The limit of collection number cannot be refreshed in real time after collection is removed
* Fixed Aliyun Some transaction errors are not clearly reported
* Updated When the client SDK is developing and debugging, the time of connecting to the local network is adjusted from the connection when the application is started to the connection when the local SCF is accessed
* Fixed The client sdk uniCloud.init and uniCloud.database methods still use the public beta endpoint by default when associating with the official version of aliyun space
### App plugin (5+ App & uni-app)
* Android Fixed The readAsDataURL of plus.io.FileReader returns base64 characters containing line breaks [Details](https://ask.dcloud.net.cn/question/164955)
* Android Fixed tabbar page switching may be unexpected in dark mode [Details](https://ask.dcloud.net.cn/question/163416)
* Android Fixed In Xiaomi Android 13 devices, selecting pictures from the album may be abnormal caused by version 3.7.3 [Details](https://ask.dcloud.net.cn/question/163903)
* iOS Fixed The video controls setting to false does not hide the title bar when displayed in full screen [Details](https://ask.dcloud.net.cn/question/160712)

## 3.7.3.20230223
### HBuilder
* Add code block surround, wrap code blocks such as if outside the selection area (menu Edit->Surround->Code block surround, shortcut key win: `Ctrl+Alt+T`, mac: `Command+Alt+T`). [Details](https://hx.dcloud.net.cn/Tutorial/Language/Snippets?id=surround)
* Added project manager, font size adjustment (menu settings-> Commonly Used). [Details](https://hx.dcloud.net.cn/Tutorial/setting?id=project-explorer-font-size)
* Language Server: Fixed Vue3-ts project, the bug that the image src attribute reports an error [Details](https://ask.dcloud.net.cn/question/162064)
* Language Server: Fixed uni-app main.js, the Vue variable or method defined by Vue.prototype.xxx, in the vue file, `this.` cannot prompt Bug. [Details](https://ask.dcloud.net.cn/question/147190)
* Language Server: Fixed the Vue file, when there are only script and style nodes, but no template node, the document structure diagram shows a blank bug.
* Fixed the bug that multiple lines of content will be copied when copying or cutting when multiple cursors are on the same line.
* Fixed the bug that it may not be possible to go to the definition when it takes a long time to go to the definition.
* Fixed the bug that HBuilderX cannot be started due to abnormal editor theme configuration in some cases.
* Fixed the bug that blank characters cannot be highlighted in the Markdown code area.
* Fixed the bug that Markdown copied table data from WPS and pasted it as a Markdown table syntax conversion error.
* Fixed the bug that the editor will not automatically scroll to the original cursor position when you press the esc key to find symbol in Editor.
* Fixed the setting interface and manifest.json interface, clicking the blank area on the right side of the text on the check box control will also cause the bug to be selected/cancelled.
* uniCloud: Fixed the bug that the upload and run operation fails when there are Chinese files in the cloud function directory of uniCloud cloud function.
* Mobile App Playground: MacOSX run the project to the real iOS device, and automatically start the App (MacOSX needs to install Xcode that matches the iOS mobile phone system) [Details](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#ios-app-automatically-open)
* Mobile App Playground: Added Windows operating system, iOS standard base, supports signing with Apple certificate, after signing, it can run standard base to iOS real device [Details](https://uniapp.dcloud.net.cn/tutorial/run/ios-apple-certificate-signature.html)
* Mobile App Playground: Added Windows device selection window, custom dock and standard dock support switching with & shortcut keys.
* uni-app: Added WeChat Build, automatically uploaded to the WeChat platform, and supports the configuration of WeChat ci robot numbers. [Details](https://uniapp.dcloud.net.cn/tutorial/build/publish-mp-weixin-cli.html)
* uni-app: uts plug-in run to Android support debug debugging. [Details](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug.html)
* uni-app: Optimize uts plugin, iOS compilation, improve compilation speed.
* uni-app: Fixed the bug that when uni-app runs to Chrome, it opens a new Chrome instance every time it runs.
### uni-app plugin
* [Important] Added uts components. Native extensions can be developed using the uts language. [Details](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
* Added uni-vue-devtools plugin. Easy to view, modify data and review custom components. [Details](https://uniapp.dcloud.net.cn/tutorial/debug/uni-vue-devtools.html)
* Fix the variable conditions in the Vue3 project uni.scss to compile the invalid bug. [Details](https://ask.dcloud.net.cn/question/162271)
* Web, App Added The page-meta component supports the scroll-top property.
* Web Fixed The show-progress attribute of the video component does not take effect. [Details](https://github.com/dcloudio/uni-app/issues/3908)
* Web Fixed When the input component type=digit, the placeholder is not displayed after clearing the input box. [Details](https://ask.dcloud.net.cn/question/160726)
* Web Fixed Vue3 project onNavigationBarSearchInputConfirmed not working. [Details](https://ask.dcloud.net.cn/question/154740)
* Web Fixed Vue3 project switching tabbar page does not trigger onTabItemTap.
* Web Fixed The title bar button text shows the abnormal bug after internationalization. [Details](https://ask.dcloud.net.cn/question/162369)
* Web Fixed Vue3 project the bug that the picker got stuck after packaging. [Details](https://ask.dcloud.net.cn/question/162091)
* Web Fixed Vue2 project the bug that the built-in browser Gaode map uni.getLocation reports an error. [Details](https://ask.dcloud.net.cn/question/156303)
* App Added [ext component] animation-view component. [Details](https://uniapp.dcloud.net.cn/component/animation-view.html)
* App Fixed Vue3 project the bug that the color of custom buttons does not change when sliding to the top of the navigation bar when the native navigation bar type is transparent. [Details](https://ask.dcloud.net.cn/question/154074)
* App Fixed Vue3 project the bug that the height of the movable area will not be updated after the movable-area component changes its height. [Details](https://ask.dcloud.net.cn/question/159723)
* App Fixed Vue3 project the bug that the preloadPage life cycle triggers an exception. [Details](https://ask.dcloud.net.cn/question/160416)
* App-Android Fixed The uni.sendSocketMessage introduced by the 3.6.16 upgrade fastjson cannot send ArrayBuffer data. [Details](https://ask.dcloud.net.cn/question/161872)
* App-Android Fixed The height of the cell component of the nvue page exceeds the height of the list itself, and the loadmore event is frequently fired. [Details](https://ask.dcloud.net.cn/question/161972)
* App-Android Fixed After the placeholder attribute of the input component of the nvue page is changed, the placeholder-style and placeholder-class properties are invalidated. [Details](https://ask.dcloud.net.cn/question/161678)
* App-Android Fixed The bubble displays abnormally when the marker of the nvue page map component sets the anchor. [Details](https://ask.dcloud.net.cn/question/161180)
* App-Android Fixed The cover-view is not displayed when the nvue page map component updates the marker. [Details](https://ask.dcloud.net.cn/question/161998)
* App-Android Fixed uni.getSystemInfo may get the same deviedId value on some devices. [Details](https://ask.dcloud.net.cn/question/163174)
* Weixin Mini Program Added pages.json supports configuring the entryPagePath property. [Details](https://ask.dcloud.net.cn/question/126216)
* Mini Program Fixed Vue3 project Fixed the bug that the page is referenced as a component and the title configuration of the navigation bar is invalid. [Details](https://ask.dcloud.net.cn/question/162745)
* Mini Program Fixed In some cases of Vue2 projects, v-for nested v-model is invalid after compilation.
* Weixin Mini Program Fixed Incorrect return value when using uni.env in Vue2 project. [Details](https://ask.dcloud.net.cn/question/159865)
* Alipay Mini Program Fixed The DingTalk mini program uses uni.saveImageToPhotosAlbum to report an error. [Details](https://ask.dcloud.net.cn/question/159183)
* Alipay Mini Program Fixed the bug that the platform attribute returned by uni.getSystemInfo is incorrect in the simulator.
* QQ Mini Program Vue3 project Fixed the bug that the video component ended event does not trigger on the real device. [Details](https://ask.dcloud.net.cn/question/155602)
* Kuaishou Mini Program Vue3 project Fixed the bug that the project button getPhoneNumber triggers an exception. [Details](https://ask.dcloud.net.cn/question/4113)
* uts plugin App Added Math related function support.
* uts plugin App-Android Fixed Array.sort function does not work.
* uts plugin App-iOS Added Support calling .a static library. [Details](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#ios-libs)
* uts plugin App-iOS Fixed Incorrect formatting when using multiple levels of nested complex objects
* uts plugin App-iOS Fixed The function may be abnormal when the parameter is greater than the actual number when calling the method
* uts plugin App-iOS Fixed The initial value of the property does not take effect after the component is hot refreshed
### uniCloud plugin
* Added Manage dependencies of schema extension [Details](https://uniapp.dcloud.net.cn/uniCloud/jql.html#deps-of-jql)
* Added JQL Trigger method add new parameters [Details](https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html#trigger-param)
* Fixed Using array which contains negative value in parameter of where method report an error [Details](https://ask.dcloud.net.cn/question/161852)
* Fixed Calling cloud object method without return value report an error [Details](https://ask.dcloud.net.cn/question/161852)
* Updated Deprecate subCollection property of JQL triggr parameter, please use secondaryCollection instead [Details](https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html#trigger-param)
* Added New JQL trigger timing "beforeReadAsSecondaryCollection" and "afterReadAsSecondaryCollection" [Details](https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html#trigger-timing)
* Aliyun Fixed No error message was returned when deleting file encounter error
* HBuilderX Plugin Fixed Using console.warn output message to console panel in cloud functions was not colored properly
### App plugin (5+ App & uni-app)
* Android Fixed Picture selection on Android 13 devices prompts no permission [Details](https://ask.dcloud.net.cn/question/160879)
* Android Fixed plus.io.FileReader's readAsDataURL reads data without splitting by slice position [Details](https://ask.dcloud.net.cn/question/160467)
* Android Fixed The VideoPlayer fires the timeupdate event when the video is buffered
* Android Update PayPal SDK to version 0.8.8 to fix the bug that payment cannot be made normally [Details](https://ask.dcloud.net.cn/question/154976)
* Android Fixed plus.downloader.clear cannot clear persistent storage downloads [Details](https://ask.dcloud.net.cn/question/162099)
* iOS Fixed AudioPlayer seekTo does not support milliseconds to jump to the specified position

## 3.6.18.20230117
### uni-app plugin
* Web Fixed The Vue3 project scroll-view component slot introduced in version 3.6.17 renders abnormally in some cases [Details](https://ask.dcloud.net.cn/question/149557)
* Weixin Mini Program Fixed An error is reported when running the enterprise version of WeChat introduced by version 3.6.17
* Weixin Mini Program Fixed Version 3.6.17 introduced Vue2 project partially in the scope slot access length property reported an error
### App plugin (5+ App & uni-app)
* Android Fixed The system navigation bar button color is the same as the background color caused by version 3.6.17 [Details](https://ask.dcloud.net.cn/question/161501)

## 3.6.17.20230112
### HBuilder
* Fixed HBuilderX green soft theme, select the terminal text, the bug that the selected color is not displayed.
* Optimize one-click sharing of Markdown, css and js resources required by the webpage, and upload them to uniCloud web page hosting.
* Fixed the bug that the uni-app runs to the iOS simulator, and the uni debugging is turned on. After opening, the window shows a blank bug
### uni-app plugin
* App-Vue, Web Updated The input component supports the inputmode property [Details](https://uniapp.dcloud.net.cn/component/input.html#inputmode)
* App Fixed The Vue3 project image component uses base64 to display exceptions [Details](https://ask.dcloud.net.cn/question/158368)
* App-Android Fixed The live-pusher component of the nvue page refuses the camera permission and then manually opens it. After returning to the application, the camera preview may not be called [Details](https://ask.dcloud.net.cn/question/158518)
* App-iOS Fixed After the nvue page map component uses a custom map style, switching satellite images is invalid [Details](https://ask.dcloud.net.cn/question/159316)
* App-iOS Fixed Start the application with a white screen after using the simulator to enable debugging [Details](https://ask.dcloud.net.cn/question/160363)
* Web Fixed The input component enters a negative number to bring out the last result [Details](https://ask.dcloud.net.cn/question/159447)
* Web Fixed Using uni.navigateTo eventChannel in Vue3 project will only be called once [Details](https://ask.dcloud.net.cn/question/155922)
* Web Fixed Vue3 project scroll-view component scrolling frequently triggers view updates [Details](https://ask.dcloud.net.cn/question/149557)
* Web Fixed The Vue3 project uses the picker component end attribute to read errors [Details](https://github.com/dcloudio/uni-app/issues/4075)
* Web Fixed uni.setTabBarItem causes tab switching life cycle exception [Details](https://ask.dcloud.net.cn/question/160739)
* Weixin Mini Program Fixed Array length changes cannot be observed in the Vue2 project template [Details](https://github.com/dcloudio/uni-app/issues/1827)
* Alipay Mini Program Fixed Vue3 project use inline styles running error report [Details](https://ask.dcloud.net.cn/question/159362)
### uniCloud plugin
* JQL Fixed Trigger report an error when using setUser without permission parameter
* JQL Fixed Add method report an error when using null in child object
* JQL Added Add triggerContext parameter to share variable between before trigger and after trigger [Details](https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html#trigger-context)
* Aliyun Updated Single file size limit was changed from 100MB to 5GB
### App plugin (5+ App & uni-app)
* Android Fixed Multiple calls to createBLEConnection to connect to a Bluetooth device, failure to connect the device may also trigger a success callback [Details](https://ask.dcloud.net.cn/question/113070)
* iOS Fixed The iconWidth/iconHeight property is disabled when plus.nativeUI.toast sets style to inline [Details](https://ask.dcloud.net.cn/question/160192)
* iOS Fixed startBluetoothDevicesDiscovery Search for nearby Bluetooth devices returns data without an advertisData field [Details](https://ask.dcloud.net.cn/question/160178)

## ReleaseNote
[https://update.dcloud.net.cn/hbuilderx/changelog/ReleaseNote_release_archive_en_2022.html](https://update.dcloud.net.cn/hbuilderx/changelog/ReleaseNote_release_archive_en_2022.html)