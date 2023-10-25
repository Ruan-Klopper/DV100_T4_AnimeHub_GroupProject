const animeMovies = [
  "Spirited Away",
  "My Neighbor Totoro",
  "Princess Mononoke",
  "Grave of the Fireflies",
  "Akira",
  "Nausicaä of the Valley of the Wind",
  "Ghost in the Shell",
  "Your Name",
  "A Silent Voice",
  "Cowboy Bebop: The Movie",
  "Perfect Blue",
  "Howl's Moving Castle",
  "Wolf Children",
  "Paprika",
  "Summer Wars",
  "Neon Genesis Evangelion: The End of Evangelion",
  "Redline",
  "The Girl Who Leapt Through Time",
  "Tokyo Godfathers",
  "Millennium Actress",
  "Jin-Roh: The Wolf Brigade",
  "The Garden of Words",
  "The Wind Rises",
  "Kiki's Delivery Service",
  "Porco Rosso",
  "The Tale of the Princess Kaguya",
  "Ponyo",
  "The Boy and the Beast",
  "Whisper of the Heart",
  "Castle in the Sky",
  "Ninja Scroll",
  "Patema Inverted",
  "The Place Promised in Our Early Days",
  "5 Centimeters Per Second",
  "In This Corner of the World",
  "The Cat Returns",
  "Mary and The Witch's Flower",
  "Steamboy",
  "The Red Turtle",
  "Metropolis",
  "Memories",
  "Sword of the Stranger",
  "Promare",
  "Akira",
  "Ninja Scroll",
  "The Disappearance of Haruhi Suzumiya",
  "Naruto: The Last",
  "Demon Slayer: Mugen Train",
  "One Piece: Stampede",
  "My Hero Academia: Two Heroes",
];

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "Historical" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "Superhero" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Psychological" },
  { id: 34, name: "Mecha" },
];

let allMovies = [];
let users = [];
let watchlist = [];

const apiKey = "55d6709a66609e881d98203251b15b9b";

// Document ready ---------------------------------------------------
$(document).ready(async function () {
  console.log("Document ready");
  saveArray();
  loadLibraryCardsByCategory();
  setNavUsername();
});
// Document ready ---------------------------------------------------

function setNavUsername() {
  const currentUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log(currentUser);
  if (currentUser) {
    $("#nav-item-left").text(currentUser.username);
    $("#nav-item-right").text("Sign Out");
    $("#nav-item-left").removeAttr("href"); // Remove href from "Sign Up"
    $("#nav-item-right").removeAttr("href"); // Remove href from "Sign Out"
    $("#nav-item-right").attr("onclick", "signOut();");
  }
}

function signOut() {
  // clear activeUser localStorage
  localStorage.removeItem("activeUser");

  // Restore the original state of the links
  $("#nav-item-left").text("Sign Up");
  $("#nav-item-right").text("Sign In");

  // Update the href attributes to navigate to the correct pages
  $("#nav-item-left").attr("href", "../pages/signup.html");
  $("#nav-item-right").attr("href", "../pages/signin.html");
}

//accessor methods - returnes information

// write a new method that returnes the data that has been
// pulled from the API as a JSON struckture

function getMovieDetails(movieName) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieName
  )}`;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data.results.length > 0) {
        const movie = data.results[0];

        const genreNames = movie.genre_ids.map((genreId) => {
          const genre = genres.find((g) => g.id === genreId);
          return genre ? genre.name : "Unknown";
        });

        const movieDetails = {
          id: movie.id,
          title: movie.original_title,
          description: movie.overview,
          language: movie.original_language,
          coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          genre_ids: movie.genre_ids,
          genres: genreNames,
        };

        // console.log("2nd function: MOVIE DATA");
        // console.log(data);
        // console.log("2nd function: MOVIE OVERVIEW");
        // console.log(movieDetails);
        return movieDetails;
      } else {
        console.log("Movie not found");
      }
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}

// mutator methods - no return function, only executing

//async important
// Why saveArray? if someone added another movie to the array,
// they only need to add the movie name and nothing will fall apart

async function saveArray() {
  // clears the array to prevent doublewritting
  allMovies = [];

  for (let i = 0; i < animeMovies.length; i++) {
    const movieName = animeMovies[i];
    const movieDetails = await getMovieDetails(movieName);

    if (movieDetails) {
      const description = movieDetails.description;
      const coverImageUrl = movieDetails.coverImageUrl;
      const genres = movieDetails.genres;
      allMovies.push({
        name: movieName,
        description: description,
        coverImageUrl: coverImageUrl,
        genres: genres,
      });
    }
  }
}

// Library -------------------------------------------------------------------

function loadLibraryCardsAll() {
  // Clear all code in the libraryMoviesContainer
  $("#libraryMoviesContainer").empty();

  const allmovies = allMovies;

  // Loop through all movies and generate cards
  for (let i = 0; i < allmovies.length; i++) {
    const movie = allmovies[i];

    const movieName = animeMovies[i];

    // Get movie details
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieName
    )}`;

    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (data) {
        if (data.results.length > 0) {
          const movie = data.results[0];

          const genreNames = movie.genre_ids.map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : "Unknown";
          });

          const movieDetails = {
            id: movie.id,
            title: movie.original_title,
            description: movie.overview,
            language: movie.original_language,
            coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            genre_ids: movie.genre_ids,
            genres: genreNames,
          };

          // Clone the card template
          const card = $("#template-card-library").contents().clone(true, true);

          // Add the "card-all" class to the cloned card for scaling reasons
          card.addClass("card-all");

          // Update card content
          card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
          card.find("#CARD-Movie-Name").text(movieDetails.title);

          console.log(movieDetails);
          // Generate genre pills and append them
          const pillContainer = card.find("#pill-container");
          pillContainer.empty(); // Clear any existing pills
          for (let j = 0; j < movieDetails.genres.length; j++) {
            const genrePill = $("#template-pill-genre-library")
              .contents()
              .clone(true, true);
            genrePill.text(movieDetails.genres[j]);
            pillContainer.append(genrePill);
          }

          // Append the card to the libraryMoviesContainer
          $("#libraryMoviesContainer").append(card);
        } else {
        }
      },
      error: function (error) {},
    });
  }
}

function loadLibraryCardsByCategory() {
  // Clear all code in the movie category containers
  $("#movie-category").empty();

  // Loop through movies and generate cards
  for (let i = 0; i < animeMovies.length; i++) {
    const movieName = animeMovies[i];

    // Get movie details
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieName
    )}`;

    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (data) {
        if (data.results.length > 0) {
          const movie = data.results[0];

          const genreNames = movie.genre_ids.map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : "Unknown";
          });

          const movieDetails = {
            id: movie.id,
            title: movie.original_title,
            description: movie.overview,
            language: movie.original_language,
            coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            genre_ids: movie.genre_ids,
            genres: genreNames,
          };

          // Add card element:---------------------------------------------------------------------------

          // Clone the card template
          const card = $("#template-card-library").contents().clone(true, true);

          // Add the "card-category" class to the cloned card for scaling reasons
          card.addClass("card-category");

          // Update card content
          card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
          card.find(".library-card-title").text(movieDetails.title);

          // Generate genre pills and append them
          const pillContainer = card.find("#pill-container");
          pillContainer.empty(); // Clear any existing pills
          for (let j = 0; j < movieDetails.genres.length; j++) {
            const genrePill = $("#template-pill-genre-library")
              .contents()
              .clone(true, true);
            genrePill.text(movieDetails.genres[j]);
            pillContainer.append(genrePill);
          }

          // Append the card to the appropriate category
          for (let j = 0; j < movieDetails.genres.length; j++) {
            const genre = movieDetails.genres[j];

            if (genre == "Science Fiction") {
              $(`#movie-category-scifi`).append(card);
            } else {
              $(`#movie-category-${genre.toLowerCase()}`).append(card);
            }
          }

          card.click(function () {
            window.location.href = `individual.html?id=${movieDetails.id}`;
          });
          // Add card element:---------------------------------------------------------------------------
        } else {
        }
      },
      error: function (error) {},
    });
  }
}

$("#save-movie").click(function () {
  alert("working");
});
