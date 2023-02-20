const { DEFAULT_THEME } = require("@cucumber/pretty-formatter");
const { Config } = require("./config.js");

// Common options
const commonOptions = {
    requireModule: ["ts-node/register", "tsconfig-paths/register"],
    paths: ["features/**/*.feature"],
    require: ["src/**/*.ts"],
    parallel: Config.CUCUMBER_WORKERS,
    tags: Config.CUCUMBER_TAGS,
    dryRun: Config.DRY_RUN,
    snippetInterface: "async-await"
};
const baseFormatters = ["@cucumber/pretty-formatter"];

let options;
if (!Config.RP_ENABLED) {
    options = {
        ...commonOptions,
        format: [
            ...baseFormatters,
            "json:" + process.cwd() + "/reports/cucumber-report.json",
            "html:" + process.cwd() + "/reports/cucumber-report.html"
        ],
        formatOptions: {
            colorsEnabled: true,
            theme: {
                ...DEFAULT_THEME
            }
        }
    };
} else {
    options = {
        ...commonOptions,
        format: [
            ...baseFormatters,
            "./config/formatters/rp-formatter.js:" +
                process.cwd() +
                "/reports/dummy.txt"
        ]
    };
}
module.exports = {
    default: options
};
