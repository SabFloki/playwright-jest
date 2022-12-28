import { baseUrl, jestTimeout } from "../timeset"

beforeAll(async () => {
    jest.setTimeout(jestTimeout)
    await page.goto(baseUrl)
})

describe('All navigations of execution', () => {
    test('Dynamic ID', async () => {
        await Promise.all([
            page.waitForNavigation(),
            page.click("(//div[@class='col-sm']//a)[3]")])
        await page.locator('button:has-text("Button with Dynamic ID")').click()
    })

    test('Class Attribute', async () => {
        await page.goto(baseUrl)
        await page.click('text="Class Attribute"')
        page.on('dialog', dialog => dialog.accept());
        await page.waitForTimeout(2000)
        await page.click("//button[contains(@class,'btn class1')]")
        const noTY = await page.locator('//*[contains(text(),"Button")]').count()
        expect(noTY).toEqual(3)
    })
})