// User object data structure:
// username: username
// email: email
// password: password

$(document).ready(function () {
  $("#signup-submit-button").on("click", function () {
    event.preventDefault();
    const username = $("#signup-username").val();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();

    const user = {
      username: username,
      email: email,
      password: password,
    };

    addUser(user);
  });

  $("#signin-submit-btn").on("click", function () {
    event.preventDefault();
    alert("Button clicked!");
    const username = $("#signin-username").val();
    const password = $("#signin-password").val();

    const user = {
      username: username,
      password: password,
    };

    checkUser(user);
  });
});

// Add users to the allUsers array
function addUser(user) {
  const allUsersString = localStorage.getItem("allUsers");
  const allUsers = allUsersString ? JSON.parse(allUsersString) : [];
  allUsers.push(user);
  const updatedAllUsersString = JSON.stringify(allUsers);
  localStorage.setItem("allUsers", updatedAllUsersString);
  console.log(user);
}

//Check for a user in the local data
function checkUser(user) {
  // To do if failed ----------------------------
  // * Opens a Bootstrap modal that indicates that
  //   the login procedure was unsuccessful
  // * Returns an object with error message and success status
  // To do if successful -----------------------
  // * Empties the activeUser localStorage object
  // * Loads the user into the activeUser localStorage object
  // * Redirects to the home page home.html
  // * Returns an object with success status and a success message
  const allUsersString = localStorage.getItem("allUsers");
  let errorValue = "";
  let success = false;
  if (allUsersString !== null) {
    const allUsers = JSON.parse(allUsersString);
    for (let i = 0; i < allUsers.length; i++) {
      const selectedUser = allUsers[i];
      if (
        user.username === selectedUser.username &&
        user.password === selectedUser.password
      ) {
        // Success
        errorValue = "Successful login";
        success = true;
        // Clear the activeUser localStorage object
        localStorage.removeItem("activeUser");
        // Load the user into the activeUser localStorage object
        localStorage.setItem("activeUser", JSON.stringify(user));
        // Redirect to the home page
        window.location.href = "../home.html";

        console.log("Sucess");
        console.log(user);
        break;
      }
    }
    if (!success) {
      // Display error message or modal for unsuccessful login
      // ...
      errorValue = "Invalid credentials";
      console.log("Unsucessfull");
      console.log(user);
    }
  } else {
    console.log("No users found in localStorage");
    errorValue = "No users registered yet.";
  }
  return {
    errorValue: errorValue,
    success: success,
  };
}
