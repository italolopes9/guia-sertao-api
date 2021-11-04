const fs = require('fs');
const Base64Util = require('./base64-util');

module.exports = class ImageUtil {
  static async saveLocal({ url, name, avatar, type }) {
    let avatarName = name.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
    avatarName = `${avatarName}_${new Date().getTime()}`;
    const avatarImage = Base64Util.decode(avatar);

    const fileName = `${process.cwd()}/static/images/${type}/${avatarName}.png`;

    await fs.writeFileSync(fileName, avatarImage.data, () => console.log);

    return `${url}images/${type}/${avatarName}.png`;
  }
};
