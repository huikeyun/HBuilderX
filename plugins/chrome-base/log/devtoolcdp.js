const CDP = require('chrome-remote-interface');
var hx = require("hbuilderx");
var URL = require("url");
var sourceMap = require("source-map-builder");

async function onConsoleApiCalled(event, runtime) {

    var data = event;
    //let model = SDK.targetManager.mainTarget().model(SDK.RuntimeModel);
    let console_args = {
        type: data.type
    };
    // 检查是否有符合规则的类型数据
    function isSpectial(AObject, ASize, ASubType) {
        let mRet = false;
        for (var i = 0; i < ASize; i++)
            if (AObject[i].hasOwnProperty("description")) {
                if (AObject[i].subtype == ASubType) {
                    mRet = true;
                }
            }
        return mRet;
    }

    let mArgs = data.args;
    if ((data.type == "error") && (isSpectial(mArgs, mArgs.length, "error"))) {
        var mContent = {};
        mContent['type'] = data.type;
        mContent['args'] = "";
        var mMsg = "";
        for (var i = 0; i < mArgs.length; i++) {
            if (mArgs[i].type == "string") {
                mMsg = mMsg + mArgs[i].value;
            } else if (mArgs[i].type == "object") {
                mMsg = mMsg + mArgs[i].description;
            }
        }
        let stacks = data.stackTrace.callFrames
        if (stacks.length > 0) {
            mContent.url = stacks[0].url;
            mContent.lineNumber = stacks[0].lineNumber;
        }
        mContent['args'] = mMsg;
        await browserConsoleApiCalled(JSON.stringify(mContent), event);
    } else {
        //window.console_args = {type:data.level};
        let stacks = data.stackTrace.callFrames
        //console_args.lineNumber = data.line;
        if (stacks.length > 0) {
            console_args.url = stacks[0].url;
            console_args.lineNumber = stacks[0].lineNumber;
        }

        let args = data.args;
        let resultArray = [];

        for (var i = 0; i < args.length; i++) {
            let remObj = args[i];
            await createOutObject(runtime, remObj, resultArray, i, 7, true);
        }
        //console.log(resultArray);
        console_args.args = resultArray;
        await browserConsoleApiCalled(JSON.stringify(console_args), event);
    }

    async function createOutObject(runtime, remObj, result, index, deep, isRoot) {
        if (remObj == 'undefined') {
            result[index] = undefined;
        } else if (remObj.subtype && remObj.subtype == null) {
            result[index] = null;
        } else if (remObj.type == 'function') {
            result[index] = remObj.description;
        } else if (remObj.type != 'object') {
            result[index] = remObj.value;
        } else {
            if (deep <= 0) {
                result[index] = "Object";
            } else {
                let isArray = false;
                if (remObj.subtype && remObj.subtype == 'array') {
                    isArray = true;
                }
                result[index] = isArray ? [] : {};
                var properties = await runtime.getProperties({
                    objectId: remObj.objectId
                });
                if (properties && properties.internalProperties && remObj.subtype == "proxy") {
                    var internalProperties = properties.internalProperties;
                    for (var i = 0; i < internalProperties.length; i++) {
                        var internalProp = internalProperties[i];
                        if (internalProp.name === "[[Target]]") {
                            await createPropertieOutObject(runtime, internalProp, result[index], i, deep - 1);
                        }
                    }
                } else {
                    if (properties && properties.result) {
                        var resultPropertie = properties.result;
                        for (var i = 0; i < resultPropertie.length; i++) {
                            var prop = resultPropertie[i];
                            if (prop.isOwn) {
                                await createPropertieOutObject(runtime, prop, result[index], i, deep - 1);
                            }
                        }
                    }
                }
            }
        }
    }

    async function createPropertieOutObject(runtime, remObj, result, index, deep) {
        var objValue = remObj.value;
        var name = remObj.name;
        if (!objValue) {
            result[name] = undefined;
        } else if (objValue.subtype && objValue.subtype == null) {
            result[name] = null;
        } else if (objValue.type == 'function') {
            result[name] = objValue.description;
        } else if (objValue.type != 'object') {
            result[name] = objValue.value;
        } else {
            if (deep <= 0) {
                result[name] = "Object";
            } else {
                let isArray = false;
                if (objValue.subtype && objValue.subtype == 'array') {
                    isArray = true;
                }
                result[name] = isArray ? [] : {};
                var properties = await runtime.getProperties({
                    objectId: objValue.objectId
                });
                if (properties && properties.result) {
                    var resultPropertie = properties.result;
                    for (var i = 0; i < resultPropertie.length; i++) {
                        var prop = resultPropertie[i];
                        if (prop.isOwn) {
                            await createPropertieOutObject(runtime, prop, result[name], i, deep - 1);
                        }
                    }
                }

            }
        }
    }
}

async function browserConsoleApiCalled(data, event) {
    var callUrl;
    if (event) {
        var stackTrace = event.stackTrace;
        if (stackTrace) {
            var callFrames = stackTrace.callFrames;
            if (callFrames) {
                for (var frame of callFrames) {
                    if (frame && frame.url) {
                        if(frame.url.startsWith("http")){
                           callUrl = frame.url;
                           break; 
                        }
                    }
                }
            }
        }
    }

    var msgData = {
        "data": data,
        "url": callUrl
    };
    
    await hx.request("builtinbrowserhost.cefbrowserConsoleApiCalled", msgData);
}


let scriptParsedMap = new Map();
let cdpRuntimeMap = new Map();

async function getcanEmulateTarget(port, host, url) {
    var client;
    if (!host) {
        host = "127.0.0.1";
    }
   
   var arr = [];
    try {
        var list = await CDP.List({
            host: host,
            port: port
        });

        if (!list) {
            return client;
        }
        for (var o of list) {
            try {
                client = await CDP({
                    port: port,
                    target: o.webSocketDebuggerUrl,
                });
                if (url) {
                    if (o && o.url && o.url.startsWith(url)) {
                        arr.push(client);
                        client = null;
                        
                    }
                } else {
                    var emulate = await client.Emulation.canEmulate();
                    if (emulate && emulate.result) {
                        arr.push(client);
						client = null;
						continue;
                    }
                }
                client = null;
            } catch (e) {
                client = null;
            }
        }
    } catch (e) {
        client = null;
    }
    
    client = null;
    
    for (var o of arr){
        if(cdpRuntimeMap.get(o.webSocketUrl)){
            const {
                Runtime
            } = cdpRuntimeMap.get(o.webSocketUrl);
            
            await Runtime.disable();
            
        }else{
            client = o;
        }
    }
    
    if(client){
        cdpRuntimeMap.set(client.webSocketUrl,client);
        client.on('event',async function(message){ 
            try{
                if(message.method === 'Inspector.detached'){
                    cdpRuntimeMap.delete(client.webSocketUrl);
                    await client.close();
                }
                else if(message.method ==="Debugger.scriptParsed"){
                    const params = message.params;
                    if(params){
                        const scriptId = params.scriptId;
                        if(scriptId){
                            scriptParsedMap.set(scriptId,params);
                        }
                    }
                }
            }catch(e){
                
            }
        });
    }

    return client;
}

async function consoleMessage(params) {
    var port = params.port;
    var url = params.url;
    var host;
    var client = await getcanEmulateTarget(port, host, url);
    if (!client) return;
    const {
        Runtime,
        Page,
        Debugger
    } = client;

    await Runtime.enable();
    await Debugger.enable();
    
    Runtime.consoleAPICalled(async (event) => {
        var ev = event;
        try{
          const callFrames = event.stackTrace.callFrames;
          const scriptId = callFrames[0].scriptId;
          const lineNumber = callFrames[0].lineNumber;
          const columnNumber = callFrames[0].columnNumber;
          if(scriptId){
              const data = scriptParsedMap.get(scriptId);
              const sourceMapURL = data.sourceMapURL;
              if(sourceMapURL){
                  const str = "base64,";
                  const index = sourceMapURL.indexOf(str);
                  if(index > -1){
                      const start = index + str.length;
                      const base64 = sourceMapURL.slice(start,sourceMapURL.length);
                      const base64Str = Buffer.from(base64, "base64").toString();
                      const json =JSON.parse(base64Str);
                      var source = json.sources[0].replace('uni-app:///','');
                      var smb = new sourceMap.SourceMapBuilder(json);
                      var s = smb.getSource(lineNumber, columnNumber);
                      const line  =   Number(s.line) + 1;
                      source = " at " + source +":" + line;
                      ev.args.push({type:"string",value:source});
                  }
              }else{
                   const urlObject = URL.parse(callFrames[0].url);
                   const line  =   Number(lineNumber) + 1;
                   const sourcePath  = urlObject.path.replace(/^\/(.*)/, "$1");
                   const source = " at " + sourcePath +":" + line
                   ev.args.push({type:"string",value:source});
              }
          }
        }catch(e){
          console.log("eee:",e);
        }
        
        await onConsoleApiCalled(ev, Runtime);
    });
    
    if(url){
       await Page.navigate({url: url}); 
    }
}

module.exports = {
    consoleMessage:consoleMessage
}
