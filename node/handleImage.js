(async () => {
  const HttpHelper = require("./httpHelper");
  const fs = require("fs");
  const path = require("path");
  const logger = require("./logger");
  const env = require("./env");
  const AwsServiceSource = require("./aws");

  const AwsService = new AwsServiceSource(env.AWS_CONFIG.AWS_REGION, env.AWS_CONFIG.AWS_ACCESS_KEY, env.AWS_CONFIG.AWS_SECRET_KEY, env.AWS_CONFIG.AWS_BUCKET);

  const bucket = env.AWS_CONFIG.AWS_BUCKET;
  const action = "putObject";
  const expireSeconds = 50000;
  // const tnrIds = [
  //   "0072401",
  //   "0072402",
  //   "0072403",
  //   "0072404",
  //   "0072405",
  //   "0072406",
  //   "0072407",
  //   "0072601",
  //   "0072602",
  //   "0072603",
  //   "0072604",
  //   "0072605",
  //   "0072606",
  //   "0072608",
  //   "0072801",
  //   "0072802",
  //   "0072803",
  //   "0072804",
  //   "0072805",
  // ];

  const tnrIds = [
    "0072812",
    "0072813",
    "0072814",
    "0072816",
    "0072817",
    "0072818",
    "0072819",
    "0072820",
    "0072821",
    "0072903",
    "0072904",
    "0073005",
    "0073008",
    "0073009",
    "0073010",
    "0073015",
    "0073016",
    "0073017",
    "0073019",
    "0073020",
  ];

  // const tnrIds = ["0072401"];

  const awsUris = [];

  tnrIds.forEach((id) => {
    const tUri = AwsService.getS3SignedUrl({
      bucket,
      path: `202007/${id}t.jpg`,
      action,
      expireSeconds,
    });

    awsUris.push({ id: `${id}t`, uri: tUri });

    const oUri = AwsService.getS3SignedUrl({
      bucket,
      path: `202007/${id}o.jpg`,
      action,
      expireSeconds,
    });

    awsUris.push({ id: `${id}o`, uri: oUri });
  });

  const res = await Promise.all(
    awsUris.map(async ({ id, uri }) => {
      try {
        logger.info(`${__dirname}/img/${id}.jpg`);

        const file = fs.readFileSync(`${__dirname}/img/${id}.jpg`);

        const options = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Length": file.length,
            "Content-Type": `image/jpeg`,
          },
        };
        await HttpHelper.uploadImage(uri, options, file);

        console.log(`${id} ok`);

        return id;
      } catch (error) {
        logger.error("error", { msg: error.message, uri });
      }
    })
  );

  if (awsUris.length !== res.length) {
    console.log("awsUris", awsUris);
    console.log("res", res);
  } else {
    console.log("res", res);
  }
})();
