const { createRPFormatterClass } = require("@reportportal/agent-js-cucumber");
const { Config } = require("../config.js");

const config = {
    uuid: "6458d719-bb6a-495b-8aff-54838700b937",
    enabled: Config.RP_ENABLED,
    token: Config.RP_TOKEN,
    endpoint: Config.RP_ENDPOINT,
    launch: Config.RP_LAUNCH + Date.now(), // TODO Delete Date.now()
    project: "nlweb",
    description: Config.RP_DESCRIPTION,
    mode: "DEFAULT",
    attributes: [{ key: "onprem", value: "true" }],
    scenarioBasedStatistics: true,
    debug: false,
    restClientConfig: {
        timeout: 0
    }
};

module.exports = createRPFormatterClass(config);
