const fieldMappings = {
  email: ["email", "email1", "user_email", "login_email"],
  password: ["password", "pass", "user_pass"],
  first_name: ["first_name", "fname", "firstName", "given_name"],
  last_name: ["last_name", "lname", "lastName", "surname", "family_name"],
};

function findField(possibleNames, type) {
  let inputs = document.querySelectorAll(`input[type='${type}'], input`);
  for (let name of possibleNames) {
    let field = [...inputs].find(
      (input) =>
        input.id.includes(name) ||
        (input.name && input.name.includes(name)) ||
        (input.placeholder &&
          input.placeholder.toLowerCase().includes(name.replace("_", " ")))
    );
    if (field) return field;
  }
  return null;
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "autofill" && request.userData) {
    let { email, password, first_name, last_name } = request.userData;

    let emailField = findField(fieldMappings.email, "email");
    if (emailField) emailField.value = email;

    let passwordField = findField(fieldMappings.password, "password");
    if (passwordField) passwordField.value = password;

    let firstNameField = findField(fieldMappings.first_name, "text");
    if (firstNameField) firstNameField.value = first_name;

    let lastNameField = findField(fieldMappings.last_name, "text");
    if (lastNameField) lastNameField.value = last_name;

    sendResponse({ status: "success" });
  }
});
