import {
    After,
    AfterAll,
    Before,
    BeforeAll,
    ITestCaseHookParameter,
    Status,
    setDefaultTimeout,
    setParallelCanAssign
} from "@cucumber/cucumber";
import { atMostOnePicklePerTag } from "@cucumber/cucumber/lib/support_code_library_builder/parallel_can_assign_helpers";
import * as fs from "fs";
import { AddRemovePage } from "page-objects/add-remove-page";
import { Browser, chromium } from "playwright";
import { CustomWorld } from "support/custom-world";
const { Config } = require("../../config/config.js");

setDefaultTimeout(10 * 1000 * 60); // 10 mins
setParallelCanAssign(atMostOnePicklePerTag(["@serial"])); // TODO => See that

let browser: Browser;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
BeforeAll({ timeout: -1 }, async function () {
    browser = await chromium.launch({
        headless: Config.HEADLESS,
        slowMo: 1000
    });
});

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
Before({ tags: "@unstable" }, async function () {
    return "skipped" as any;
});

Before({ timeout: -1 }, async function (this: CustomWorld) {
    await initPlaywrigthContext.call(this);
    await initPO.call(this);
});

After(
    { timeout: -1 },
    async function (this: CustomWorld, testCase: ITestCaseHookParameter) {
        if (testCase.result?.status !== Status.PASSED) {
            await saveScreenshot.apply(this);
        }

        await this.context?.close();
        await this.page?.close();

        if (testCase.result?.status !== Status.PASSED) {
            const videoPath = await this.page!.video()?.path();
            const videobuffer = fs.readFileSync(videoPath!, "base64");
            await this.attach(videobuffer!, "base64:video/webm");
        }
        if (
            testCase.result?.status !== Status.FAILED ||
            Config.REPORTER == undefined
        ) {
            const videoPath = await this.page!.video()?.path();
            fs.unlinkSync(videoPath!);
        }
    }
);

const saveScreenshot = async function (this: CustomWorld) {
    const buffer = (await this.page!.screenshot())?.toString("base64");
    await this.attach(buffer, "base64:image/png");
};

AfterAll({ timeout: -1 }, async () => {
    await browser.close();
});

async function initPlaywrigthContext(this: CustomWorld) {
    const screenSize = { width: 1920, height: 1080 };
    this.context = await browser.newContext({
        viewport: screenSize,
        recordVideo: {
            dir: "reports/videos",
            size: screenSize
        }
    });
    this.page = await this.context!.newPage();
    const response = await this.page!.goto(Config.TARGET_URL!, {
        timeout: 80000
    });
    if (!response?.ok()) {
        console.error(
            "Invalid navigation page. Please set the correct TARGET_URL parameter"
        );
        process.exit(1);
    }
}

async function initPO(this: CustomWorld) {
    this.addRemovePage = new AddRemovePage(this.page!);
}
