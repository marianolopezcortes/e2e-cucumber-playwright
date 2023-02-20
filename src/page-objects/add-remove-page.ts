import { Locator, Page } from "@playwright/test";

export class AddRemovePage {
    private readonly page: Page;
    private readonly ADD_ELEMENT_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ADD_ELEMENT_BUTTON = page.locator(
            "button:has-text('Add Element')"
        );
    }

    isVisible = async (): Promise<boolean> => {
        return this.ADD_ELEMENT_BUTTON.isVisible();
    };

    clickAddElement = async () => {
        await this.ADD_ELEMENT_BUTTON.click();
    };

    clickDelete = async () => {
        await this.page.locator(".added-manually").first().click();
    };

    numberDeleteButtons = async (): Promise<number> => {
        return this.page.locator(".added-manually").count();
    };
}
