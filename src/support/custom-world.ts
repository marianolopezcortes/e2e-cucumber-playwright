import { World, setWorldConstructor } from "@cucumber/cucumber";
import { AddRemovePage } from "page-objects/add-remove-page";
import { BrowserContext, Page } from "playwright";
import { Config } from "../../config/config";
const { RPWorld } = require("@reportportal/agent-js-cucumber");

export type CustomWorld = {
    context?: BrowserContext;
    page?: Page;

    // Page objects
    addRemovePage?: AddRemovePage;

    targetUrl?: string;
    headless?: boolean;
} & World &
    typeof RPWorld;

if (Config.RP_ENABLED) {
    setWorldConstructor(RPWorld);
} else {
    setWorldConstructor(World);
}
