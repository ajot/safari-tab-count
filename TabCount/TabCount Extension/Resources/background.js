// Count all tabs across all windows and update the badge
async function updateTabCount() {
    const tabs = await browser.tabs.query({});
    const count = tabs.length;

    // Update the badge text on the toolbar icon
    await browser.action.setBadgeText({ text: String(count) });

    // Apple-style badge: iOS red (#FF3B30)
    await browser.action.setBadgeBackgroundColor({ color: "#FF3B30" });
}

 // Update count when the extension first loads
 updateTabCount();

 // Listen for new tabs
 browser.tabs.onCreated.addListener(() => {
     updateTabCount();
 });

 // Listen for closed tabs
 browser.tabs.onRemoved.addListener(() => {
     updateTabCount();
 });

 // Listen for new windows (they come with a tab)
 browser.windows.onCreated.addListener(() => {
     updateTabCount();
 });

 // Listen for closed windows
 browser.windows.onRemoved.addListener(() => {
     updateTabCount();
 });
