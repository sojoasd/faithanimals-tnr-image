function envConfig(env, keys) {
  return keys.reduce((a, k) => {
    let v = env[k];
    if (v != undefined) a[k] = JSON.parse(Buffer.from(v, "base64").toString("utf-8"));
    return a;
  }, {});
}

module.exports = {
  envConfig,
};
