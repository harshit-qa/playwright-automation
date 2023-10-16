import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly successIcon: Locator
    

    constructor(page: Page) {
        this.page = page;
        this.successIcon=page.locator('//*[contains(@class, "icon--color-success")]')
    }

    async isUserLoggedIn() {

        return await this.successIcon.isVisible();
    }

}