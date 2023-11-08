// User object data structure:
// username: username
// email: email
// password: password

$(document).ready(function () {
  $("#signup-submit-button").on("click", function () {
    const username = $("#signup-username").val();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();

    const user = {
      username: username,
      email: email,
      password: password,
    };

    addUser(user, function (success, errorValue) {
      if (success) {
        event.preventDefault();
        $("#signup-modal").modal("show");
        $("#modal-text").text(
          `Welcome onboard ${user.username}, please sign in.`
        );
        $("#close-modal").text("Sign in");
        $("#close-modal").click(function () {
          window.location.href = "../pages/signin.html";
        });
        console.log("User added successfully!");
      } else {
        $("#signup-modal").modal("show");
        $("#modal-text").text(`Oopsie: ${errorValue}`);
      }
    });
  });

  $("#signin-submit-btn").on("click", function () {
    const username = $("#signin-username").val();
    const password = $("#signin-password").val();

    const user = {
      username: username,
      password: password,
    };

    checkUser(user, function (success, errorValue) {
      if (success) {
        event.preventDefault();
        $("#signin-modal").modal("show");
        $("#modal-text").text(`Welcome onboard ${user.username}`);
        $("#close-modal").text("Get started with JOY!");
        $("#close-modal").click(function () {
          window.location.href = "../index.html";
        });
      } else {
        event.preventDefault();
        $("#signin-modal").modal("show");
        $("#modal-text").text(`Oopsie: ${errorValue}`);
      }
    });
  });
});

// Add users to the allUsers array
function addUser(user, callback) {
  let errorValue = "";
  let success = false;

  if (
    user.username.length >= 3 &&
    user.email.includes("@") &&
    user.password.length >= 6
  ) {
    const allUsersString = localStorage.getItem("allUsers");
    const allUsers = allUsersString ? JSON.parse(allUsersString) : [];
    allUsers.push(user);
    const updatedAllUsersString = JSON.stringify(allUsers);
    localStorage.setItem("allUsers", updatedAllUsersString);
    console.log(user);
    success = true;
  } else {
    errorValue = "Invalid credentials";
  }

  if (callback && typeof callback === "function") {
    callback(success, errorValue);
  }
}

//Check for a user in the local data
function checkUser(user, callback) {
  // To do if failed ----------------------------
  // * Opens a Bootstrap modal that indicates that
  //   the login procedure was unsuccessful
  // * Returns an object with error message and success status

  // Check for blank input fields
  if (!user.username || !user.password) {
    if (callback && typeof callback === "function") {
      callback(false, "Input fields are blank.");
    }
    return; // Exit the function
  }

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
        localStorage.removeItem("activeUser");
        localStorage.setItem("activeUser", JSON.stringify(user));
        console.log("Success");
        console.log(user);
        break;
      }
    }
    if (!success) {
      // Display error message or modal for unsuccessful login
      errorValue = "Invalid credentials";
      console.log(user);
    }
  } else {
    errorValue = "No users registered yet.";
  }

  if (callback && typeof callback === "function") {
    callback(success, errorValue);
  }
}
