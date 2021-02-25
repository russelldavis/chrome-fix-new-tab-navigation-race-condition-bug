///////////////
// OLD APPROACH
// Abandonded because chrome.tabs.create doesn't focus the omnibox in the new tab.
// Also, not 100% sure this approach avoids the problem.
//
///////////////

// Importantly, this extension is configured with `"persistent": true` in the manifest,
// so it won't be unloaded. That means there will never be a delay when creating a new
// tab due to the extension being loaded.

chrome.commands.onCommand.addListener((command, _tab) => {
  if (command === "blank-new-tab") {
    chrome.tabs.create({
      url: "data://,",
    });
    return;
  }
  if (command === "blank-new-window") {
    chrome.windows.create({
      url: "about:blank",
    });
    return;
  }
  if (command === "blank-new-window-incognito") {
    chrome.windows.create({
      incognito: true,
      url: "about:blank",
    });
    return;
  }
});
