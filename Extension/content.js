chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "autofill") {
    console.log("Autofill request received. Fetching data from backend...");

    fetch("http://localhost:3004/api/v1/getRegister")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from backend:", data);

        if (data.success && data.register) {
          const userData = data.register;

          // Autofill form fields
          if (document.getElementById("name")) {
            document.getElementById("name").value = userData.FullName || "";
          }
          if (document.getElementById("email")) {
            document.getElementById("email").value = userData.email || "";
          }
          if (document.getElementById("phoneNumber")) {
            document.getElementById("phoneNumber").value = userData.phone || "";
          }
          if (document.getElementById("address")) {
            document.getElementById("address").value = userData.address || "";
          }

          console.log("Autofilled the form successfully!");
        } else {
          console.error("No valid user data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});
