import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { path: '/', title: 'PANDORA', label: 'Overview' },
  { path: '/war-system', title: 'Make every move matter.', label: 'War System' },
  { path: '/factions', title: 'Friends first. Factions soon.', label: 'Factions' },
  { path: '/mods', title: 'Familiar world. Different possibilities.', label: 'Mods' },
  { path: '/rules', title: 'Conflict is expected. Ruining somebody’s week isn’t.', label: 'Rules' },
  { path: '/setup', title: 'Prepare for Pandora.', label: 'Setup' },
];

test('six routes, direct refresh, route history and shortened Overview', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.spec-list')).toContainText('26.2 / Fabric');
  await expect(page.locator('.objective-select, .focused-browser, .dossier, .rules-document')).toHaveCount(0);
  for (const route of routes.slice(1)) {
    await page.getByRole('navigation').getByRole('link', { name: route.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(route.path + '$'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.title, { useInnerText: true, ignoreCase: true });
    await expect(page.getByRole('navigation').getByRole('link', { name: route.label, exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('main')).toBeFocused();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.title, { useInnerText: true, ignoreCase: true });
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/rules$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/setup$/);
  expect(errors).toEqual([]);
});

test('objective details, pending faction bookmarks and honest unfinished content', async ({ page }) => {
  await page.goto('/war-system');
  await page.getByRole('button', { name: /Control Points/ }).click();
  await expect(page.locator('#objective-detail')).toContainText('freeze capture progress');
  await expect(page.locator('#objective-detail')).toContainText('Not live progress');
  await page.goto('/factions');
  await page.getByRole('button', { name: 'Player roster' }).click();
  await expect(page.locator('#dossier-content')).toContainText('Roster to be confirmed');
  await expect(page.locator('.roster-pending')).toContainText('Faction assignments have not been decided');
  await page.goto('/rules');
  await expect(page.locator('#expanded-rules')).toContainText('Optional clarifications');
  await page.goto('/setup');
  await expect(page.locator('.package-seal')).toContainText('Not yet deployed');
  await expect(page.locator('a[download]')).toHaveCount(0);
});

test('Mods moves the entire rail with keys, clicks and wheel; boundaries release scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/mods');
  const list = page.getByRole('listbox');
  await list.focus();
  const before = await page.locator('.selector-track').evaluate((node) => getComputedStyle(node).transform);
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { selected: true })).toContainText('Terralith');
  await expect(page.locator('#selected-mod-title')).toHaveText('Terralith');
  await expect.poll(() => page.locator('.selector-track').evaluate((node) => getComputedStyle(node).transform)).not.toBe(before);
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#selected-mod-title')).toHaveText('Simple Voice Chat');
  await expect(page.locator('.mod-environment').last()).toHaveClass(/environment-signal/);
  await list.hover();
  await page.mouse.wheel(0, 90);
  await expect(page.getByRole('option', { selected: true })).toContainText('Farmer’s Delight');
  await expect(page.locator('#selected-mod-title')).toHaveText('Farmer’s Delight');
  await expect(page.locator('.mod-environment').last()).toHaveClass(/environment-cultivation/);
  await page.getByRole('option', { name: /Voxy/ }).click();
  await expect(page.locator('#selected-mod-title')).toHaveText('Voxy / LOD Support');
  await expect(list).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('option', { selected: true })).toContainText('Performance & Security');
  await expect(page.getByRole('button', { name: 'Next mod' })).toBeDisabled();
  await list.hover();
  const priorScroll = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 650);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(priorScroll);
  await list.focus();
  await page.keyboard.press('Home');
  await expect(page.getByRole('option', { selected: true })).toContainText('Tectonic');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Next mod' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(list).toBeFocused();
});

test('mobile navigation and real swipe input', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173/');
  const menu = page.getByRole('button', { name: 'Menu +' });
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: /Mods/ }).click();
  await expect(page).toHaveURL(/\/mods$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  const list = page.getByRole('listbox');
  const box = await list.boundingBox();
  expect(box).not.toBeNull();
  const session = await context.newCDPSession(page);
  const x = box!.x + box!.width / 2;
  const y = box!.y + box!.height / 2 + 50;
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - 95 }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByRole('option', { selected: true })).toContainText('Terralith');
  await expect(page.locator('#selected-mod-title')).toHaveText('Terralith');
  await context.close();
});

test('all mod environments, rapid selection and readable companion states', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/mods');
  await page.getByRole('listbox').focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#selected-mod-title')).toHaveText('Farmer’s Delight');
  await expect(page.locator('.mod-environment').last()).toHaveClass(/environment-cultivation/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.keyboard.press('Home');
  const kinds = ['ridges', 'strata', 'signal', 'cultivation', 'horizon', 'archive', 'system', 'system'];
  for (let index = 0; index < kinds.length; index++) {
    await expect(page.locator('.mod-environment').last()).toHaveClass(new RegExp('environment-' + kinds[index]));
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({ path: 'test-results/mod-environment-' + index + '.png', fullPage: true, animations: 'disabled' });
    if (index < kinds.length - 1) await page.keyboard.press('ArrowDown');
  }
});

for (const route of routes) {
  test(route.label + ' responsive, accessible, and visually captured', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1024, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]] as const) {
      await page.setViewportSize({ width, height });
      await page.screenshot({ path: 'test-results/' + route.label.replaceAll(' ', '-') + '-' + name + '.png', fullPage: true, animations: 'disabled' });
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations).toEqual([]);
    }
  });
}

test('terrain animates, responds to pointer, suspends offscreen, and honors reduced motion', async ({ page }) => {
  await page.goto('/');
  const terrain = page.locator('canvas');
  const capture = () => terrain.evaluate((node) => (node as HTMLCanvasElement).toDataURL());
  const first = await capture();
  await page.mouse.move(900, 450);
  await page.waitForTimeout(250);
  expect(await capture()).not.toBe(first);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(200);
  const paused = await capture();
  await page.waitForTimeout(200);
  expect(await capture()).toBe(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(100);
  const still = await capture();
  await page.mouse.move(200, 250);
  await page.waitForTimeout(200);
  expect(await capture()).toBe(still);
  await page.goto('/mods');
  await page.getByRole('listbox').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#selected-mod-title')).toHaveText('Terralith');
  expect(await page.locator('.selector-track').evaluate((node) => getComputedStyle(node).transitionDuration)).toBe('0s');
  expect(await page.locator('.environment-art g').first().evaluate((node) => getComputedStyle(node).animationName)).toBe('none');
});

test('background stays covered during switches and wheel momentum advances only once', async ({ page }) => {
  await page.goto('/mods');
  const list = page.getByRole('listbox');
  await list.hover();
  await page.mouse.wheel(0, 60);
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 8);
    await page.waitForTimeout(50);
  }
  await expect(page.getByRole('option', { selected: true })).toContainText('Terralith');
  await list.focus();
  for (let step = 0; step < 5; step++) {
    await page.keyboard.press('ArrowDown');
    for (let frame = 0; frame < 5; frame++) {
      const coverage = await page.locator('.mod-atmosphere').evaluate((node) => {
        const base = node.querySelector(':scope > .mod-environment')!;
        const style = getComputedStyle(base);
        return { opacity: style.opacity, background: style.backgroundColor, count: node.querySelectorAll('.mod-environment').length };
      });
      expect(coverage.opacity).toBe('1');
      expect(coverage.background).toBe('rgb(16, 18, 24)');
      expect(coverage.count).toBeLessThanOrEqual(2);
      await page.waitForTimeout(30);
    }
  }
  await expect(page.locator('.mod-environment')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.keyboard.press('Home');
  await expect(page.locator('.mod-environment')).toHaveCount(1);
  await expect(page.locator('.mod-environment')).toHaveClass(/environment-ridges/);
  await expect(page.locator('video')).toHaveCount(0);
});

test('seven core rules and seven optional keyboard-operated clarifications', async ({ page }) => {
  await page.goto('/rules');
  await expect(page.locator('.rule-entry')).toHaveCount(7);
  await expect(page.locator('.rule-clarification')).toHaveCount(7);
  await expect(page.locator('.rule-clarification[open]')).toHaveCount(0);
  const summary = page.locator('.rule-clarification summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.rule-clarification[open]')).toHaveCount(1);
  await expect(page.locator('.rule-clarification[open]')).toContainText('specific strategic reason');
  await summary.evaluate((node) => (node as HTMLElement).blur());
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(250);
  await page.screenshot({path:'test-results/Rules-open-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'test-results/Rules-open-mobile.png',fullPage:true});
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('.rule-clarification[open]')).toHaveCount(0);
});

test('supplied media matches each mod and videos load only when selected', async ({ page, request }) => {
  const videos = new Set<string>();
  page.on('request', (req) => { if (req.url().endsWith('.mp4')) videos.add(req.url().split('/').pop()!); });
  await page.goto('/mods');
  const media = page.locator('.focused-media .media');
  await expect(media).toHaveAttribute('src', '/media/mods/tectonic.mp4');
  await expect.poll(() => media.evaluate((node) => (node as HTMLVideoElement).readyState)).toBeGreaterThan(1);
  expect([...videos]).toEqual(['tectonic.mp4']);
  await page.emulateMedia({reducedMotion:'reduce'});
  const names = ['tectonic-poster.png','terralith-poster.jpg','simplevoicechat.png','farmersdelight-poster.png','voxy.jpeg','flashback.jpeg','pandora.jpg','performance.png'];
  await page.getByRole('listbox').focus();
  for (const [index, name] of names.entries()) {
    await expect(media).toHaveAttribute('src', '/media/mods/' + name);
    await expect.poll(() => media.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect((await request.head('/media/mods/' + name)).ok()).toBe(true);
    if (index < names.length - 1) await page.keyboard.press('ArrowDown');
  }
  expect([...videos]).toEqual(['tectonic.mp4']);
  for (const name of ['terralith.mp4','farmersdelight.mp4']) expect((await request.head('/media/mods/' + name)).ok()).toBe(true);
});
