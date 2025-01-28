const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main Street, Springfield, IL",
};

// Function to autofill the form fields
function autofillData() {
  document.getElementById("name").value = userData.name;
  document.getElementById("email").value = userData.email;
  document.getElementById("address").value = userData.address;

  console.log("Autofilled with data:", userData);
}
