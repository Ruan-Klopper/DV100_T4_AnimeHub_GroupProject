$(document).ready(function () {
  setNavUsername();
});


document.addEventListener("DOMContentLoaded", function () {
  // Get the watchlist from local storage
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Find the container where  cards will be displayed
  const watchlistContainer = document.getElementById('watchlist-container');

  // Go through each movie id in the watchlist
  watchlist.forEach(function (movieID) {
      // Create a new movie card element
      const card = document.createElement('div');
      card.className = 'col-3';
      card.innerHTML = `
          <div class="card">
              <img src="../images/movie${movie.poster_path}.jpg" class="card-img-top" alt="Movie Poster" />
              <div class="card-body">
                  <h5 class="card-title">Movie Title ${movie.original_title}</h5>
                  <p class="card-text">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary btn-gradient" style="width: 100%;">Go somewhere</a>
              </div>
          </div>
      `;

      // Append the card to the watchlist container
      watchlistContainer.appendChild(card);
  });
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

