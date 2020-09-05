/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: require("./src/services/dbService").DB_NAME,
    },
  },
};
