module.exports = class Base64Util {
    static decode(data) {
      const response = {
        type: null,
        data: null,
      };
      const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
      if (matches.length !== 3) return new Error('Invalid input string');
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');
  
      return response;
    }
  };