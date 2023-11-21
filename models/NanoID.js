const { customAlphabet } = require('nanoid');


const generateNanoID = (length) => {
    length = length || 10;
    const nanoid = customAlphabet('1234567890ABCDEFGHJKLMPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz', length);
    return nanoid();
}

module.exports = generateNanoID;
