const fieldMappings = {
  email: ["email", "email1", "user_email", "login_email"],
  phone: ["phone", "mobile", "contact"],
  github: ["github", "git", "github_url"],
  linkedin: ["linkedin", "linkedin_url"],
 FullName: ["first_name", "fname", "firstName", "name"],
};

// ✅ Define `findField` function
function findField(possibleNames, type) {
  let inputs = document.querySelectorAll(`input[type='${type}'], input`);
  for (let name of possibleNames) {
    let field = [...inputs].find(
      (input) =>
        (input.id && input.id.toLowerCase().includes(name.toLowerCase())) ||
        (input.name && input.name.toLowerCase().includes(name.toLowerCase())) ||
        (input.placeholder && input.placeholder.toLowerCase().includes(name.replace("_", " ")))
    );
    if (field) return field;
  }
  return null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "autofill" && request.userData) {
    let { email, phone, github, linkedin, FullName } = request.userData.register || {};
    let first_name = FullName ? FullName.split(" ")[0] : "";
    let last_name = FullName && FullName.split(" ").length > 1 
                    ? FullName.split(" ").slice(1).join(" ") 
                    : "";

    // ✅ Autofill Email
    let emailField = findField(fieldMappings.email, "email");
    if (emailField) {
      emailField.value = email;
      emailField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // ✅ Autofill Phone
    let phoneField = findField(fieldMappings.phone, "tel");
    if (!phoneField) phoneField = findField(fieldMappings.phone, "text");
    if (phoneField) {
      phoneField.value = phone;
      phoneField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // ✅ Autofill GitHub
    let githubField = findField(fieldMappings.github, "url");
    if (!githubField) githubField = findField(fieldMappings.github, "text");
    if (githubField) {
      githubField.value = github;
      githubField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // ✅ Autofill LinkedIn
    let linkedinField = findField(fieldMappings.linkedin, "url");
    if (!linkedinField) linkedinField = findField(fieldMappings.linkedin, "text");
    if (linkedinField) {
      linkedinField.value = linkedin;
      linkedinField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // ✅ Autofill First Name
    let firstNameField = findField(fieldMappings.first_name, "text");
    if (firstNameField) {
      firstNameField.value = first_name;
      firstNameField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // ✅ Autofill Last Name
    let lastNameField = findField(fieldMappings.last_name, "text");
    if (lastNameField) {
      lastNameField.value = last_name;
      lastNameField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    sendResponse({ status: "success" });
  }
});
