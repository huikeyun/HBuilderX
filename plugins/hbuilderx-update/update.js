const fs = require('fs');
const path = require('path');

function backupAndCopy(name, newName) {
  // backup update to backup
  // script location HBuilderX.app/Contents/HBuilderX/update/patch/plugins/update_plugin
  // backup location HBuilderX.app/Contents/HBuilderX/update/backup
  const resPath = path.join(__dirname, '../../../../../Resources/');
  
  const src = path.join(__dirname, name);
  if (fs.existsSync(src)) {
    let hbicns = path.join(resPath, 'HBuilder.icns');
    if (fs.existsSync(hbicns)) {
      fs.unlinkSync(hbicns);
    }
    hbicns = path.join(resPath, 'HBuilder-alpha.icns');
    if (fs.existsSync(hbicns)) {
      fs.unlinkSync(hbicns);
    }
    let updaterPath = path.join(resPath, newName);
    fs.copyFileSync(src, updaterPath);
    if(name != newName){
      updaterPath = path.join(resPath, name);
      fs.copyFileSync(src, updaterPath);
    }
  }
}

// Read the package.json file located at /Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/about/package.json
// const packageJsonPath = '/Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/about/package.json';
const packageJsonPath = path.join(__dirname, '../../../../../HBuilderX/plugins/about/package.json');
const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
const alphaNodeValue = JSON.parse(packageJson).alpha;
// let fixRight = "io.dcloud.HBuilderX";
if (alphaNodeValue === true) {
  // 复制过去的时候plist中的指向还是HBuilder.icns,所以这里修改HBuilder-alpha.icns到HBuilder.icns
  // 避免显示空图标
  backupAndCopy("HBuilder-alpha.icns", "HBuilder.icns");
  // 重置HBuilderX的权限
  // fixRight = "io.dcloud.HBuilderXAlpha";
} else {
  backupAndCopy("HBuilder.icns", "HBuilder.icns");
  // 重置HBuilderX的权限
  // fixRight = "io.dcloud.HBuilderX";
}

// Call the system command "touch" to create an empty file named "HBuilderX.app"
// This will create the necessary file for the backupAndCopy function to copy it to the Resources directory
// Note: This assumes that the current working directory is the same as __dirname
// Get the current working directory
const currentDir = process.cwd();
// Use regex to find the ".app" string and extract the characters from the beginning of the string up to ".app"
const regex = /^.*\.app/;
const appName = currentDir.match(regex)[0];

// refresh icon cache
require('child_process').execSync(`touch ${appName}`);
// require('child_process').execSync(`tccutil reset All ${fixRight}`);
