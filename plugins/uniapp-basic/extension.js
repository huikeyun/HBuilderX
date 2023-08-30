var hx = require("hbuilderx");
const validate = require("./validate.js");

function activate(context) {
    return{
        verify:validate.verify,
        verifyAppleCert:validate.verifyAppleCert
    }
}

function deactivate() {

}

module.exports = {
	activate,
	deactivate
}