// background.js
chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked");
    chrome.tabs.sendMessage(tab.id, {action: "capture"}, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to content script:", chrome.runtime.lastError);
      } else {
        console.log("Message sent to content script successfully");
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background script:", request);
    if (request.action === "download") {
      chrome.downloads.download({
        url: request.url,
        filename: "screenshot.png"
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Error initiating download:", chrome.runtime.lastError);
          sendResponse({success: false, error: chrome.runtime.lastError.message});
        } else {
          console.log("Download initiated successfully, ID:", downloadId);
          sendResponse({success: true, downloadId: downloadId});
        }
      });
      return true; // Indicates that the response is sent asynchronously
    }
  });