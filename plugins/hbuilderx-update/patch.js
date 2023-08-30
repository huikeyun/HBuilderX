const fs = require('fs');
const crypto = require('crypto');
const {
	spawnSync
} = require('child_process');
const path = require('path');
const mkdirp = require('mkdirp');
const unzipper = require('unzipper');

const logger = {
	'info': function (msg) {
		console.log(msg);
	}
}

function patchFiles(argv) {
	const srcDir = argv[0]; // 源目录,这个目录下的文件不修改
	const backupDir = argv[1]; // 替换目标文件夹,操作后的文件存在这个目录
	// HBuilderX.app/Contents/HBuilderX/update/patch/diff/hbuilderx-language-services
	const workDir = argv[2]; // 对应的工作目录


	if (!fs.existsSync(srcDir)) { // 如果旧目录不存在
		logger.info("Error: Old directory does not exist"); // 给出错误提示
		return;
	}

	const store = path.join(backupDir, "store"); // 定义备份存储目录
	if (!fs.existsSync(store)) { // 如果新目录不存在
		mkdirp.sync(store); // 创建新目录
	}
	// 保存不同的文件

	const workspaceDir = path.join(workDir, "workspace"); // 定义工作区目录
	const backupRecord = path.join(backupDir, "backup.json");
	const workFilePath = path.join(workDir, "work.json"); // 定义工作路径

	// 定义函数：计算文件的 MD5 值
	function md5(file) {
		const hash = crypto.createHash('md5');
		hash.update(fs.readFileSync(file));
		return hash.digest('hex');
	}

	// 定义函数：更新文件
	function update_file(file_path, file_info, backup) {
		const patch_file_path = path.join(workspaceDir, file_info['path']);
		const src_file_path = path.join(srcDir, file_path);
		const new_file_path = path.join(store, file_path);
		const dir_path = path.dirname(new_file_path);
		// 如果目录不存在，则创建目录
		if (!fs.existsSync(dir_path)) {
			fs.mkdirSync(dir_path, {
				recursive: true
			});
		}

		// 如果文件不存在，则发出警告
		if (!fs.existsSync(patch_file_path)) {
			logger.info(`Patch file not found for ${file_path}`);
			return;
		}
		// 本来应该存在的文件不存在，则发出警告
		if (!fs.existsSync(src_file_path)) {
			logger.info(`Old file not found for ${file_path}`);
			return;
		}
		backup[file_path] = {md5: md5(src_file_path)}; // 记录到backup.json中
		
		let code = 0;
		try {
			// Updater已经在env中配置好了
			code = spawnSync('Updater', ["patch", src_file_path, new_file_path, patch_file_path]);
		} catch (err) {
			logger.info(`Failed to execute bspatch: ${err}`);
		}

		logger.info(`return code ${JSON.stringify(code)}`);

		const new_file_md5 = md5(new_file_path);
		logger.info(`md5: ${new_file_md5}`);
		if (code.status !== 0) {
			logger.info(`bspatch exited with code ${code}`);
		} else if ('md5' in file_info) {
			if (new_file_md5 !== file_info['md5']) {
				logger.info(`MD5 mismatch for ${file_path} ${new_file_md5} != ${file_info['md5']}`);
			}
		} else {
			logger.info(`No MD5 provided for ${file_path}`);
		}

	}

	// 定义函数：创建文件
	function create_file(file_path, file_info, backup) {
		// 复制文件,如果是zip文件则解压
		const src_file_path = path.join(srcDir, file_path);
		const file_source = path.join(workspaceDir, file_path);		
		const new_file_path = path.join(store, file_path);

		logger.info(`create file ${file_info} ==> ${file_path} --> ${new_file_path}`);

		// 如果是 zip 文件，则解压
		if ('path' in file_info && file_info.path.endsWith('.zip')) {
			if (!fs.existsSync(path.dirname(new_file_path))) {
				fs.mkdirSync(path.dirname(new_file_path), {
					recursive: true
				});
			}
			const target = path.join(workspaceDir, file_info.path);
			logger.info(`target = ${target}`);
			fs.createReadStream(target).pipe(unzipper.Extract({ path: new_file_path }));
			// 记录到backup.json中
			if (backup) {
				// 这是一个目录
				backup[file_path] = {empty:true}; 
			}
		} else {
			if (fs.existsSync(file_source)) {
				if (!fs.existsSync(path.dirname(new_file_path))) {
					fs.mkdirSync(path.dirname(new_file_path), {
						recursive: true
					});
				}
				if ('md5' in file_info) {
					const file_md5 = md5(file_source);
					// 如果 MD5 值不匹配，则发出错误
					// 停止运行
					if (file_md5 !== file_info.md5) {
						logger.info(
							`MD5 mismatch for ${file_path} ${file_md5} != ${file_info.md5}`); // 如果 MD5 值不匹配，则发出错误
						return;
					}
				}	
				fs.renameSync(file_source, new_file_path);
				if(fs.existsSync(src_file_path)){
					backup[file_path] = {md5:md5(src_file_path)}; // 记录到backup.json中)			
				}else{
					backup[file_path] = {empty:true}; // 本来就是没有的
				}				
			} else {
				logger.info(`Unknown file type for ${file_path}`); // 如果文件类型未知，则发出警告
			}
		}
	}

	async function deleteFile(file_path, backup) {
		// const new_file_path = path.join(srcDir, filePath);
		// if (fs.existsSync(new_file_path)) {
		// 	if (fs.lstatSync(new_file_path).isDirectory()) {
		// 		fs.rmdirSync(new_file_path, { recursive: true });
		// 	} else {
		// 		fs.unlinkSync(new_file_path);
		// 	}
		// }
		const src_file_path = path.join(srcDir, file_path);		
		// 不需要在store中生成任何文件
		// 如果是目录
		if (fs.existsSync(src_file_path)) {
			if (fs.lstatSync(src_file_path).isDirectory()) {
				traverseDirectory(srcDir, src_file_path, backup);
			}else{
				backup[file_path] = {md5:md5(src_file_path)}; // 记录到backup.json中
			}
		}		
	}

	function traverseDirectory(root, directoryPath, backup) {
		const files = fs.readdirSync(directoryPath);
		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);
			const stats = fs.statSync(filePath);
			if (stats.isDirectory()) {
				traverseDirectory(root, filePath, backup);
			} else {
				const md5Hash = md5(filePath);
				const key = path.relative(root, filePath);
				backup[key] = { md5: md5Hash };
			}
		});
	}

	// 主函数
	// 打开work_file_path文件并获取json内容赋值到work	
	const work = JSON.parse(fs.readFileSync(workFilePath));
	let backup = {};
	if (fs.existsSync(backupRecord)) {
		backup = JSON.parse(fs.readFileSync(backupRecord));
	}
	// 循环work的每一个对象
	for (const file_path in work) {
		const file_info = work[file_path]
		if (file_info.kind === "create") {
			create_file(file_path, file_info, backup);
		} else if (file_info.kind === "delete") {
			deleteFile(file_path, backup);
		} else if (file_info.kind === "copy") {
			// copy_file(file_path);
		} else if (file_info.kind === "update") {
			update_file(file_path, file_info, backup)
		} else {
			logger.info(`Unknown operation for ${file_path}`); // 将警告写入logging
		}
	}
	fs.writeFileSync(backupRecord, JSON.stringify(backup, null, 2));
}

if (process.argv.length < 4) { // 如果输入的参数不足
	console.log("Usage: node patchfile.js <old_dir> <new_dir> <workdir>"); // 显示用法
} else { // 否则
	patchFiles(process.argv.slice(2)); // 调用patchFiles(第一个参数)
}