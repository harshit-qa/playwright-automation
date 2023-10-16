
import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly acceptAllCookies :Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly emailErrorMsg: Locator
    readonly pwdErrorMsg: Locator
    readonly loginErrorMsg: Locator
    readonly forgotPasswordLink: Locator
    readonly forgotPasswordEmail:Locator
    readonly forgotPasswordEmailBox:Locator
    readonly sendEmailButton:Locator
    readonly forgotPasswordEmailError:Locator
    readonly forgotPasswordConfirmation:Locator

    constructor(page: Page) {
        this.page = page;
        this.acceptAllCookies=page.locator('//button[contains(@class,"accept-all")]')
        this.emailInput = page.locator('//*[@id="loginForm"]//input[@name="email"]')
        this.passwordInput = page.locator('//*[@id="loginForm"]//input[@name="password"]')
        this.loginButton = page.locator('//*[@id="loginForm"]/fieldset/button')
        this.emailErrorMsg = page.locator('(//div[@class="input__error"])[1]')
        this.pwdErrorMsg = page.locator('(//div[@class="input__error"])[2]')
        this.loginErrorMsg = page.locator('//div[contains(@class,"alert--error")]')
        this.forgotPasswordLink= page.locator('//div[@class="login__link"]')
        this.forgotPasswordEmail=page.getByRole('textbox', { name: 'E-Mail-Adresse*' });
        this.sendEmailButton=page.locator('//button[contains(@class,"button__primary forgot-password__button")]')
        this.forgotPasswordEmailError=page.locator('//*[@id="forgotPasswordForm"]//div[@class="input__error"]')
        this.forgotPasswordConfirmation=page.locator('//div[@class="forgot-password__confirmation"]')

    }

    async goToLoginPage(url: string) {
        await this.page.goto(url);
        await this.page.reload();
        await this.page.waitForLoadState("load")
    }

    async acceptCookies(){
        await this.acceptAllCookies.click()
        
    }

    async enterUsername(email: string) {
        await this.emailInput.fill(email)
        console.log(`User email is entered successfully`);
    }

    async enterPassowrd(password: string) {
        await this.passwordInput.fill(password)
        console.log(`User password is entered successfully`);
    }

    async clickLoginButton() {
        await this.loginButton.click()
        console.log(`Login button is clicked successfully`);
        await this.page.waitForTimeout(5000);
    }


    async login(email: string, password: string) {
        await this.enterUsername(email)
        await  this.enterPassowrd(password)
        await this.clickLoginButton()

    }

    async validateRequiredEmailError() {
        await expect(this.emailErrorMsg).toBeVisible({ timeout: 2000 })
        console.log("Error message is displayed as:", await this.emailErrorMsg.textContent());
    }

    async validateRequiredPasswordError() {
        await expect(this.pwdErrorMsg).toBeVisible({ timeout: 2000 })
        console.log("Error messgae is displayed as:", await this.pwdErrorMsg.textContent());
    }

    async validateLoginDetailsError() {
        await expect(this.loginErrorMsg).toBeVisible({ timeout: 2000 })
        console.log("Error messgae is displayed as:", await this.loginErrorMsg.textContent());

    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
        console.log(`Forgot password link is clicked successfully`);
    }

    async enterForgotPasswordEmail(email: string) {
        await this.forgotPasswordEmail.click();
        await this.forgotPasswordEmail.fill(email)
        console.log(`User email is entered successfully`);
    }

    async clickSendEmailButton(){
        
        await this.sendEmailButton.click();
        console.log(`Send email is clicked successfully`);
    }

    async validateEmailSentConfirmation(){
     
        await expect(this.forgotPasswordConfirmation).toBeVisible({ timeout: 2000 })
        console.log(`Email is sent successfully`);
    }

    async validateForgotPasswordEmailErrorMessage(){
        
        await expect(this.forgotPasswordEmailError).toBeVisible({ timeout: 2000 })
        console.log("Error message is displayed as",await this.forgotPasswordEmailError.textContent());
    }


    async resetPassword(email: string) {
        await this.clickForgotPasswordLink();
        await this.enterForgotPasswordEmail(email);
        await this.clickSendEmailButton();
        await this.validateEmailSentConfirmation();
    }


}