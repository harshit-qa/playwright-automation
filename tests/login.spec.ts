
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as fs from 'fs'
import { HomePage } from '../pages/HomePage';

let jsonData: any;
let homePage: HomePage;
let loginPage:LoginPage;

// Read the JSON configuration file
try {
    jsonData = JSON.parse(fs.readFileSync('./resources/config.json', 'utf-8'))
} catch (error) {
    console.error("Error occured : " + error)
}

test.beforeEach(async ({ page,browser }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage(jsonData.url);
    await loginPage.acceptCookies();
    
});

test.describe('Login Test', () => {

    test('Verify Successful Login', async () => {
        
       await loginPage.login(jsonData.email,jsonData.password);
       const userIsLoggedIn = await homePage.isUserLoggedIn();
       expect(userIsLoggedIn).toBeTruthy();
       console.log("User is Logged in successfully")

    }); 
 
   test('Verify Login with blank email and password', async () => {
        
        await loginPage.clickLoginButton();
        await loginPage.validateLoginDetailsError();
        await loginPage.validateRequiredEmailError();
        await loginPage.validateRequiredPasswordError();
 
     });


     test('Verify Login with valid email and blank password', async () => {
        await loginPage.enterUsername(jsonData.email);
        await loginPage.clickLoginButton();
        await loginPage.validateLoginDetailsError();
        await loginPage.validateRequiredEmailError();
       
 
     });

     test('Verify Login with blank email and valid password', async () => {
        await loginPage.enterPassowrd(jsonData.password);
        await loginPage.clickLoginButton();
        await loginPage.validateLoginDetailsError();
        await loginPage.validateRequiredEmailError();
       
 
     });

     test('Verify Login with invalid email and password', async () => {
        
        await loginPage.login("invalid","invalid");
        await loginPage.validateLoginDetailsError();
 
     });

     test('Verify Login with valid email and invalid password', async () => {
        
        await loginPage.login(jsonData.email,"invalid");
        await loginPage.validateLoginDetailsError();
 
     });

     test('Verify Login with invalid email and valid password', async () => {
        
        await loginPage.login(jsonData.email,"invalid");
        await loginPage.validateLoginDetailsError();
 
     });
 
     test('Verify resetting password with valid email', async () => {
        
        await loginPage.resetPassword(jsonData.email)
 
     });

     test('Verify resetting password with blank email', async () => {
      await loginPage.acceptCookies();  
      await loginPage.clickForgotPasswordLink();
      await loginPage.clickSendEmailButton();
      await loginPage.validateForgotPasswordEmailErrorMessage();

   });

   test('Verify resetting password with invalid email', async () => {
      await loginPage.acceptCookies();  
      await loginPage.clickForgotPasswordLink();
      await loginPage.enterForgotPasswordEmail("invalid");
      await loginPage.clickSendEmailButton();
      await loginPage.validateForgotPasswordEmailErrorMessage();

   });
});

