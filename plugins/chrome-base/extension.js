const devtoolcdp = require("./log/devtoolcdp.js");

function activate(context) {
    return {
        consoleMessage: devtoolcdp.consoleMessage
    }
}

function deactivate() {

}

module.exports = {
    activate,
    deactivate
}