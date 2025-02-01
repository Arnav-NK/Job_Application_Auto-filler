
document.getElementById("autofill").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: "autofill" }, (response) => {
      if (response && response.status === "success") {
        console.log("Autofill triggered successfully!");
      } else {
        console.error("Failed to trigger autofill");
      }
    });
  });
});
