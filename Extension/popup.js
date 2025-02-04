document.addEventListener("DOMContentLoaded", () => {
  const autofillButton = document.getElementById("autofill");
  if (!autofillButton) {
    console.error("Autofill button not found");
    return;
  }

  autofillButton.addEventListener("click", handleAutofill);
});

async function handleAutofill() {
  try {
    const data = await fetchData();
    if (!data) return;

    const tab = await getCurrentTab();
    if (!tab) return;

    await injectContentScript(tab.id);
    await sendAutofillMessage(tab.id, data);

    console.log("Autofill triggered successfully!");
  } catch (error) {
    console.error("Error during autofill process:", error);
  }
}

function fetchData() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        resolve(null);
      } else if (!response || response.error) {
        console.error("Error fetching data:", response?.error || "No response received");
        resolve(null);
      } else {
        console.log("Data received in popup.js:", response.data);
        resolve(response.data);
      }
    });
  });
}

function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        console.error("No active tab found.");
        resolve(null);
      } else {
        resolve(tabs[0]);
      }
    });
  });
}

function injectContentScript(tabId) {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting content script:", chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          console.log("Content script injected!");
          resolve();
        }
      }
    );
  });
}

function sendAutofillMessage(tabId, userData) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabId,
      { message: "autofill", userData: userData },
      (contentResponse) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message to content script:", chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
        } else if (!contentResponse || contentResponse.status !== "success") {
          console.error("Failed to trigger autofill");
          reject(new Error("Failed to trigger autofill"));
        } else {
          resolve();
        }
      }
    );
  });
}
