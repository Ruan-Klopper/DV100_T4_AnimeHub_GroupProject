const apiKey = "55d6709a66609e881d98203251b15b9b";

$(document).ready(function () {
  setNavUsername();
  loadWatchlistCards();
});

function loadWatchlistCards() {
  $("#watchlist-container").empty();
  // Get the watchlist from local storage
  const watchlist = JSON.parse(localStorage.getItem("watchList")) || [];

  // Find the container where cards will be displayed
  const watchlistContainer = document.getElementById("watchlist-container");

  // Go through each movie id in the watchlist
  watchlist.forEach(function (movieID) {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        if (data) {
          const movie = data;

          const movieDetails = {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };

          const card = $("#watchlist-card").contents().clone(true, true);
          card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
          card.find("#movie-title").text(movieDetails.title);
          card.find("#movie-description").text(movieDetails.description);
          $("#watchlist-container").append(card);

          card.find(".view-movie").click(function () {
            window.location.href = `individual.html?id=${movieDetails.id}`;
          });

          card.find(".remove").click(function () {
            let watchListLocal = JSON.parse(localStorage.getItem("watchList")) || [];
            const updatedWatchlist = watchListLocal.filter((id) => id !== movieID);   
            localStorage.setItem("watchList", JSON.stringify(updatedWatchlist));
            loadWatchlistCards();
        });
        
        } else {
          console.error("Movie not found:", movieID);
        }
      },
      error: function (error) {
        console.error("ERROR:", error);
      },
    });
  });
}

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

// Create a new movie card element

// card.className = 'col-3';
// card.innerHTML = `
//     <div class="card">
//         <img src="../images/movie${movie.poster_path}.jpg" class="card-img-top" alt="Movie Poster" />
//         <div class="card-body">
//             <h5 class="card-title">Movie Title ${movie.original_title}</h5>
//             <p class="card-text">
//                 Some quick example text to build on the card title and make up the bulk of the card's content.
//             </p>
//             <a href="#" class="btn btn-primary btn-gradient" style="width: 100%;">Go somewhere</a>
//         </div>
//     </div>
// `;

// // Append the card to the watchlist container
// watchlistContainer.appendChild(card);
