$(document).ready(function () {
  setNavUsername();
});

function setNavUsername() {
  const currentUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log(currentUser);
  if (currentUser) {
    $("#nav-item-left").text(currentUser.username);
    $("#nav-item-right").text("Sign Out");
    $("#nav-item-left").removeAttr("href");
    $("#nav-item-right").removeAttr("href");
  }
}
