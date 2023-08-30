const path = require('path');
const packageInfo = require('./package.json');

const extensionsDir = path.resolve(__dirname, "..").replace(new RegExp('\\\\', 'g'), '/').toLowerCase();

function isDevelopmentPlugin(pluginFile) {
	pluginFile = pluginFile.replace(new RegExp('\\\\', 'g'), '/').toLowerCase();
	if (pluginFile.startsWith(extensionsDir)) {
		return false;
	}
	return true;
}

['debug', 'log', 'warn', 'error'].forEach((methodName) => {
	const originalLoggingMethod = console[methodName];
	console[methodName] = (firstArgument, ...otherArguments) => {
		const originalPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const callee = new Error().stack[1];
		Error.prepareStackTrace = originalPrepareStackTrace;
		const relativeFileName = path.resolve(process.cwd(), callee.getFileName());
		if (!isDevelopmentPlugin(relativeFileName)) {
			return;
		}
		const prefix =
			`${relativeFileName}:${callee.getLineNumber() || 0}:${callee.getColumnNumber() || 0}`;
		if (firstArgument instanceof Error) {
			originalLoggingMethod(firstArgument, ...otherArguments);
		} else {
			otherArguments.push("\t" + prefix);
			originalLoggingMethod(firstArgument, ...otherArguments);
		}
	};
});
let mainProgram = packageInfo.main;
if (!mainProgram.startsWith("./")) {
	mainProgram = "./" + mainProgram;
}

require(mainProgram);