/**
 * @author maqiao
 * @date 2019/3/29 12:11
 */
const fs = require('fs');
class uploadFileUtil{
    static checkDirExist(p){
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
    static getUploadDirName(){
        const date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        const dir = `${date.getFullYear()}${month}${date.getDate()}`;
        return dir;
    }
    static getUploadFileExt(name) {
        let ext = name.split('.');
        return ext[ext.length - 1];
    }
    static getUploadFileName(ext){
        return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
    }
}
module.exports = uploadFileUtil;
