const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const fsext = require('fs-extra');
const { execSync } = require('child_process');

function getDirs(diffdir, pluginName, arg) {

    // 有arg决定是打patch,还是还原
    if (arg == 'patch') {
        // 打patch
        let retDirs = {
            src: path.join(diffdir, pluginName, 'store'),
            backup: path.join(diffdir, pluginName, 'backup')
        };
        return retDirs;

    } else if (arg == 'restore') {
        // 还原
        let retDirs = {
            src: path.join(diffdir, pluginName, 'backup'),
            backup: path.join(diffdir, pluginName, 'store')
        };
        return retDirs;
    }
    return {};
}

// 在启动前备份文件并移动文件到指定目录
// 获取第一个参数
function movepatch(args) {
    // 获取第一个参数是patch还是restore
    var arg = args[0];
    // 第二个参数是插件根目录
    var pluginsDir = args[1];
    // 第三个参数是diffDir
    var diffDir = args[2];

    // 当前目录为/HBuilderX.app/Contents/HBuilderX/plugins/hbuilderx-update
    // 获取/HBuilderX.app/Contents/HBuilderX/update/backup/diff目录
    // var diffDir = path.join(__dirname, '../../update/backup/diff');
    // 获取/HBuilderX.app/Contents/HBuilderX/plugins目录
    // var pluginsDir = path.join(__dirname, '../../plugins');
    // 同步遍历diff目录
    var files = fs.readdirSync(diffDir);
    // 获取每个文件夹的名称
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // 获取每个文件夹的路径
        var filePath = path.join(diffDir, file);
        // 获取每个文件夹的信息
        var stat = fs.statSync(filePath);
        // 判断是否为文件夹
        if (stat.isFile()) {
            continue;
        }
        // 获取该文件夹下的store文件夹
        const dirs = getDirs(diffDir, file, arg);
        console.log(dirs);
        var storeDir = dirs.src;
        // 获取该文件夹下的run文件
        var done = path.join(filePath, 'done');
        // 如果done文件存在,则说明该文件夹下的文件已经被移动到pluginsDir/file目录下
        // 判断done文件是否存在,如果存在,跳过执行
        // if (arg == 'restore') {
        //     fs.unlink(done);
        // }
        // if (fs.existsSync(done)) {
        //     continue;
        // }
        // 获取backup文件夹
        var backupDir = dirs.backup;
        // 获取该文件夹下的backup.json文件
        var backupFile = path.join(filePath, 'backup.json');
        // 深度遍历所有store下面的文件并与pluginsDir/file对应目录下的文件进行位置交换
        const targetDir = path.join(pluginsDir, file);
        // backupFile的格式为{"文件的相对路径":{md5:"文件的md5值"}或者{empty:true}, ...}
        // 遍历所有backupFile的key,如果key对应的value中有md5值,则说明该文件存在,否则说明该文件不存在
        // 根据key获取storeDir下的文件,如果文件存在,则将文件与targetDir下的文件进行交换
        // 如果文件不存在,则将targetDir下的文件复制到storeDir下
        var backupJson = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
        // 大小写问题?
        for (var key in backupJson) {
            console.log(`moveFile ${key} backup to ${backupDir}`)
            moveFile(storeDir, targetDir, key, backupDir, backupJson[key])
        }
        // 生成一个空的done文件
        // fs.writeFileSync(done, '');
        if(process.env.hxdebug){
            const newplugins = path.join(pluginsDir, '../newplugins', file);
            // 测试环境下操作完成后比对文件
            execSync(`diff -r ${targetDir} ${newplugins} > ${diffDir}/diff_${file}.txt`);
        }
    }
}

function moveFile(storeDir, targetDir, key, backup, info) {
    // 获取storeDir下的文件
    var src = path.join(storeDir, key);
    // 获取targetDir下的文件
    var target = path.join(targetDir, key);
    var backupfile = path.join(backup, key);

    // 交换两个文件的位置
    // 如果temp目录不存在则先创建目录
    if (!fs.existsSync(backup)) {
        mkdirp.sync(backup);
    }
    // 先保证src和target的目录都存在
    if (!fs.existsSync(path.dirname(src))) {
        mkdirp.sync(path.dirname(src));
    }
    if (!fs.existsSync(path.dirname(target))) {
        mkdirp.sync(path.dirname(target));
    }

    if (!fs.existsSync(path.dirname(backupfile))) {
        mkdirp.sync(path.dirname(backupfile));
    }

    // 将target文件移动到backup目录下
    if (fs.existsSync(target)) {
        console.log(`moveSync ${key} to backup`);
        fsext.moveSync(target, backupfile, { overwrite: true });
    } else {
        console.log(`${target} not exist`);
    }

    // 将src文件移动到temp目录下
    if (fs.existsSync(src)) {
        console.log(`moveSync ${key} to target`);
        fsext.moveSync(src, target);
    } else {
        console.log(`${src} not exist delete `);
        if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
            // 获取target的父目录
            let parent = target;
            while (parent != targetDir) {
                // 如果target是个文件夹,而文件夹中没有任何东西,则删除该文件夹
                if (fs.existsSync(parent) && fs.statSync(parent).isDirectory()) {
                    fs.rmdirSync(parent);
                }
                parent = path.dirname(parent);
            }
        }
    }
}

// 考虑执行到一半的情况
// 获取第一个参数
var args = process.argv.splice(2);

movepatch(args);