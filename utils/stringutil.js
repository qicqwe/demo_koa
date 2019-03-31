/**
 * @author maqiao
 * @date 2019/3/28 13:06
 */
class Stringutil {
    static randomString(len) {
        try {
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        } catch (err) {
            console.log(err);
        }
    }

    static getJsonTree(data, parentId) {
        var itemArr = [];
        for (var i = 0; i < data.length; i++) {
            var node = data[i];
            if (node.parentId == parentId) {
                var newNode = {};
                newNode.id = node.id;
                newNode.name = node.name;
                newNode.baseData=node;
                newNode.nodes = this.getJsonTree(data, node.id);
                itemArr.push(newNode);
            }
        }
        return itemArr;
    }
}

module.exports = Stringutil;