const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUTPUT_DIR = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

(async () => {
    console.log('Starting Puppeteer...');
    const browser = await puppeteer.launch({
        protocolTimeout: 120000,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });
    const page = await browser.newPage();
    
    // Desktop Viewport
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    console.log(`Navigating to ${URL}`);
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for fonts and rendering
    await new Promise(r => setTimeout(r, 3000));
    
    const desktopPath = path.join(OUTPUT_DIR, 'desktop-full.png');
    await page.screenshot({ path: desktopPath, fullPage: true });
    console.log(`Saved desktop screenshot: ${desktopPath}`);
    
    // Mobile Viewport
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 1500));
    const mobilePath = path.join(OUTPUT_DIR, 'mobile-full.png');
    await page.screenshot({ path: mobilePath, fullPage: true });
    console.log(`Saved mobile screenshot: ${mobilePath}`);

    await browser.close();
    console.log('Done!');
})();
