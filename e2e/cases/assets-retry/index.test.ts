import { expect, test } from '@playwright/test';
import { build, dev, gotoPage } from '@e2e/helper';

test.only('should works`', async ({ page }) => {
  const rsbuild = await dev({
    cwd: __dirname,
  });

  await gotoPage(page, rsbuild);
  const testAsyncCompEle = page.locator('#async-comp-test');
  await expect(testAsyncCompEle).toHaveText('Hello AsyncCompTest');
  await rsbuild.close();
});
