import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AddRemovePage } from "page-objects/add-remove-page";
import { CustomWorld } from "support/custom-world";

When("I am on the add/remove page", async function (this: CustomWorld) {
    expect(await new AddRemovePage(this.page!).isVisible()).toBeTruthy();
});

When("I click Add Button 3 times", async function (this: CustomWorld) {
    await this.addRemovePage?.clickAddElement();
    await this.addRemovePage?.clickAddElement();
    await this.addRemovePage?.clickAddElement();
});

Then("I have 3 Delete Buttons", async function (this: CustomWorld) {
    expect(await this.addRemovePage?.numberDeleteButtons()).toBe(3);
});

When("I click Delete 3 times", async function (this: CustomWorld) {
    await this.addRemovePage?.clickDelete();
    await this.addRemovePage?.clickDelete();
    await this.addRemovePage?.clickDelete();
});

Then("I have no Delete Buttons", async function (this: CustomWorld) {
    expect(await this.addRemovePage?.numberDeleteButtons()).toBe(0);
});
