// content.js
function captureFullPageScreenshot() {
    console.log("Starting screenshot capture");
  
    html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      scrollY: -window.scrollY,
      height: document.body.scrollHeight
    }).then(canvas => {
      console.log("Screenshot captured");
      canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        chrome.runtime.sendMessage({action: "download", url: url}, response => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent successfully:", response);
          }
        });
      });
    }).catch(error => {
      console.error("Error capturing screenshot:", error);
    });
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received:", request);
    if (request.action === "capture") {
      captureFullPageScreenshot();
    }
  });
  
  console.log("Content script loaded");