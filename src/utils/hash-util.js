const bcryptjs = require('bcryptjs');

module.exports = class HashUtil {
  static decryptPassword({ password, passwordHash }) {
    return bcryptjs.compare(password, passwordHash);
  }
  static async encryptPassword(password) {
    return await bcryptjs.hash(password, 10);
  }
};