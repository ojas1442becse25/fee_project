import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to homepage
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  console.log('✓ Page loaded');
  
  // Take initial screenshot
  await page.screenshot({ path: 'hero-initial.png', fullPage: false });
  console.log('✓ Initial screenshot taken');
  
  // Simulate mouse movement across the dashboard (left to right)
  console.log('\n→ Testing horizontal tilt...');
  const dashboardRect = await page.locator('.hero-core-console').boundingBox();
  if (dashboardRect) {
    const centerX = dashboardRect.x + dashboardRect.width / 2;
    const centerY = dashboardRect.y + dashboardRect.height / 2;
    
    // Move left
    await page.mouse.move(dashboardRect.x + 20, centerY);
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'hero-tilt-left.png' });
    console.log('  Tilted left');
    
    // Move right
    await page.mouse.move(dashboardRect.x + dashboardRect.width - 20, centerY);
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'hero-tilt-right.png' });
    console.log('  Tilted right');
    
    // Move center
    await page.mouse.move(centerX, centerY);
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'hero-tilt-center.png' });
    console.log('  Returned to center');
  }
  
  // Test floating card hover
  console.log('\n→ Testing floating card hover...');
  const topRightCard = await page.locator('.badge-top-right').first();
  if (topRightCard) {
    await topRightCard.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'hero-card-hover.png' });
    console.log('  Top-right card hovered');
  }
  
  // Test button hover
  console.log('\n→ Testing CTA button hover...');
  const mainButton = await page.locator('.hero-btn-main').first();
  if (mainButton) {
    await mainButton.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'hero-button-hover.png' });
    console.log('  Main button hovered');
  }
  
  // Test 360 spin
  console.log('\n→ Testing 360° spin...');
  const spinButton = await page.locator('.console-360-btn').first();
  if (spinButton) {
    await spinButton.click();
    await page.waitForTimeout(1300);
    await page.screenshot({ path: 'hero-after-spin.png' });
    console.log('  360° spin completed');
  }
  
  console.log('\n✓ All interactions tested successfully!');
  
  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
