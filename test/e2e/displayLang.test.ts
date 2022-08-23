import * as path from "path"
import { describe, test, expect } from "./baseFixture"

// Given a code-server environment with Spanish Language Pack downloaded
const flags = ["--extensions-dir", path.join(__dirname, "./extensions"), "--locale", "es"]

describe("Display language patch", flags, {}, () => {
  test("should allow you to load code-server in Spanish", async ({ codeServerPage }) => {
    test.setTimeout(45000)

    // Click [aria-label="Extensions (⇧⌘X)"]
    await codeServerPage.page.click('[aria-label="Extensions (⇧⌘X)"]')

    // Click [aria-label="Spanish Language Pack for Visual Studio Code, 1.70.0, Publisher MS-CEINTL, Language pack extension for Spanish"] >> text=Set Display Language
    await codeServerPage.page.click(
      '[aria-label="Spanish Language Pack for Visual Studio Code, 1.70.0, Publisher MS-CEINTL, Language pack extension for Spanish"] >> text=Set Display Language',
    )

    // Click text=Restart
    await Promise.all([
      codeServerPage.page.waitForNavigation(/*{ url: 'http://localhost:56541/?folder=/var/folders/c7/ns6lqzvx3z10mq647y5g9lqc0000gn/T/code-server/tests/workspaces/workspaces-dcTB8x' }*/),
      codeServerPage.page.click("text=Restart"),
    ])

    // Click text=Extensiones
    const visible = await codeServerPage.page.isVisible("text=Extensiones")

    // Then
    expect(visible).toBe(true)
  })
})
