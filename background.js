const newTabs = new Set();
let verbose = true;

function logVerbose(...args) {
  if (verbose) {
    console.log(...args);
  }
}

////// tabs //////

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.pendingUrl === "chrome://newtab/") {
    logVerbose("tabs.onCreated", tab);
    newTabs.add(tab.id);
  }
});

chrome.tabs.onRemoved.addListener((tab) => {
  newTabs.delete(tab.id);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  logVerbose("tabs.onUpdated", tabId, changeInfo);
});

////// webNavigation //////

chrome.webNavigation.onErrorOccurred.addListener((details) => {
  logVerbose("webNavigation.onErrorOccurred", details);
  if (
    details.error === "net::ERR_ABORTED" &&
    newTabs.has(details.tabId) &&
    details.url !== "chrome://newtab/" &&
    !details.url.startsWith("chrome-extension://")
  ) {
    console.log("BUG! New tab navigation was aborted. Reloading.", details.url);
    newTabs.delete(details.tabId);
    chrome.tabs.update(details.tabId, { url: details.url });
  }
});

chrome.webNavigation.onCommitted.addListener((details) => {
  logVerbose("webNavigation.onCommitted", details);
  newTabs.delete(details.tabId);
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  logVerbose("webNavigation.onBeforeNavigate", details);
});

chrome.webNavigation.onCompleted.addListener((details) => {
  logVerbose("webNavigation.onCompleted", details);
});

