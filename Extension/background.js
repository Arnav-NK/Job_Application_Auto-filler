chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    // get data of user from backend who latestly parsed the resume
    fetch("http://localhost:3004/api/v1/getRegister")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        sendResponse({ data: data });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    return true;
  }
});
