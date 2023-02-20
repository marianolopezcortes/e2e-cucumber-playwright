const config = require("config");

const Config = {
    TARGET_URL: config.get("TARGET_URL"),
    HEADLESS: config.get("HEADLESS"),
    DRY_RUN: config.get("DRY_RUN"),
    CUCUMBER_TAGS: config.get("CUCUMBER_TAGS"),
    CUCUMBER_WORKERS: config.get("CUCUMBER_WORKERS"),

    RP_ENABLED: config.get("RP_ENABLED"),
    // Jenkins
    RP_ENDPOINT: config.get("RP_ENDPOINT"),
    RP_TOKEN: config.get("RP_TOKEN"),
    RP_LAUNCH: config.get("RP_LAUNCH"),
    RP_DESCRIPTION: config.get("RP_DESCRIPTION")
};
if (Config.TARGET_URL === "") {
    throw new Error("Please set the correct TARGET_URL parameter");
}
console.log("Config=>" + JSON.stringify(Config, null, 2));

module.exports = {
    Config
};
