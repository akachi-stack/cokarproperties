const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async () => {
  try {
    const filePath = path.resolve('services.html');
    const html = fs.readFileSync(filePath, 'utf8');

    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'file:///' + filePath.replace(/\\\\/g, '/')
    });

    // Wait for external scripts to load and run
    await new Promise((resolve) => setTimeout(resolve, 600));

    const document = dom.window.document;
    const hamburger = document.querySelector('.hamburger');
    const dropdown = document.getElementById('dropdownBox');

    if (!dropdown) {
      console.log(JSON.stringify({ error: 'dropdownBox not found' }));
      return;
    }

    const getDisplay = () => dom.window.getComputedStyle(dropdown).display;

    const before = getDisplay();

    if (!hamburger) {
      console.log(JSON.stringify({ before, error: 'hamburger not found' }));
      return;
    }

    // Simulate click
    hamburger.dispatchEvent(new dom.window.Event('click', { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 200));
    const afterClick = getDisplay();

    // Simulate exit icon click if present
    const exitIcon = document.getElementById('exitIcon');
    if (exitIcon) {
      exitIcon.dispatchEvent(new dom.window.Event('click', { bubbles: true, cancelable: true }));
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    const afterExit = getDisplay();

    console.log(JSON.stringify({ before, afterClick, afterExit }));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exitCode = 1;
  }
})();
