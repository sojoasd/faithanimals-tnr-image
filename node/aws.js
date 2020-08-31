const AWS = require("aws-sdk");
const logger = require("./logger");

module.exports = class AWSService {
  constructor(region, accessKey, secretKey, bucket) {
    AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });
    this.s3 = new AWS.S3({ signatureVersion: "v4", region });
    this.bucket = bucket;
  }

  getS3SignedUrl({ path, action, expireSeconds }) {
    const fn = "getS3SignedUrl";
    logger.debug(fn, { bucket: this.bucket, path, action, expireSeconds });

    const url = this.s3.getSignedUrl(action, {
      Bucket: this.bucket,
      Key: path,
      Expires: expireSeconds,
      ACL: "public-read",
    });

    logger.debug(fn, { url });

    return url;
  }
};
