const axios = require("axios");
const logger = require("./logger");

class HttpHelper {
  static async uploadImage(url, options, data) {
    const fn = "HttpHelper.uploadImage";

    return new Promise((resolve, reject) => {
      axios
        .put(url, data, options)
        .then(function (result) {
          resolve(true);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

module.exports = HttpHelper;
