const { default: AllureReporter } = require('@wdio/allure-reporter');

beforeAll(async () => {
    await page.goto('http://uitestingplayground.com/')
})

describe('All navigations of execution', () => {
    test('Dynamic ID', async () => {
        await Promise.all([
            page.waitForNavigation(),
            page.click("(//div[@class='col-sm']//a)[3]")])
        await page.locator('button:has-text("Button with Dynamic ID")').click()
        AllureReporter.addStep('Dynamice ID -  is tapped')
    })

    test('Class Attribute', async () => {
        await page.goto('http://uitestingplayground.com/')
        await page.click('text="Class Attribute"')
        page.on('dialog', dialog => dialog.accept());
        await page.waitForTimeout(2000)
        await page.click("//button[contains(@class,'btn class1')]")
        AllureReporter.addStep('Class -  is tapped')
        const noTY = await page.locator('//*[contains(text(),"Button")]').count()
        expect(noTY).toEqual(3)
        AllureReporter.addStep('Count is -  is ' + noTY)
    })
})