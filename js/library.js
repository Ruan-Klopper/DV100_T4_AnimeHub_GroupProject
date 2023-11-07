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

let detailedMovies = [];

let watchlist = [];

let appliedSort = "default";
let appliedFilter = "category";

const apiKey = "55d6709a66609e881d98203251b15b9b";

// Document ready ---------------------------------------------------
$(document).ready(async function () {
  setNavUsername();
  await populateDMarray();
  applyFilterSort();
});
// Document ready ---------------------------------------------------

function setNavUsername() {
  const currentUser = JSON.parse(localStorage.getItem("activeUser"));
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

async function populateDMarray() {
  detailedMovies = [];

  const ajaxPromises = animeMovies.map(async (movieName) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieName
    )}`;

    try {
      const data = await $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
      });

      if (data.results.length > 0) {
        const movie = data.results[0];

        const genreNames = movie.genre_ids.map((genreId) => {
          const genre = genres.find((g) => g.id === genreId);
          return genre ? genre.name : "Unknown";
        });

        detailedMovies.push({
          movieName: movieName,
          id: movie.id,
          title: movie.original_title,
          description: movie.overview,
          language: movie.original_language,
          coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          genre_ids: movie.genre_ids,
          genres: genreNames,
          popularity: movie.popularity,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        });
      } else {
        console.error("Movie not found:", movieName);
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  });

  // Wait for all AJAX requests to complete before returning
  await Promise.all(ajaxPromises);
}

function loadLibraryCardsAll() {
  // Clear all code in the libraryMoviesContainer
  $("#libraryMoviesContainer").empty();

  for (let i = 0; i < detailedMovies.length; i++) {
    const movieDetails = detailedMovies[i];

    const movieName = animeMovies[i];

    // Clone the card template
    const card = $("#template-card-library").contents().clone(true, true);

    // Add the "card-all" class to the cloned card for scaling reasons
    card.addClass("card-all");

    // Update card content
    card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
    card.find("#CARD-Movie-Name").text(movieDetails.movieName);

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
  }
}

function loadLibraryCardsFromArray(dispMovies) {
  $("#movies-container").empty();

  for (let i = 0; i < dispMovies.length; i++) {
    const movieDetails = dispMovies[i];

    const card = $("#template-card-library").contents().clone(true, true);

    // Add the "card-category" class to the cloned card for scaling reasons
    card.addClass("card-category");

    // Update card content
    card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
    card.find(".library-card-title").text(movieDetails.movieName);

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

    // Append the card to the movies-container
    $("#movies-container").append(card);

    // Bind click event to the "view-movie" button
    card.find(".view-movie").click(function () {
      window.location.href = `individual.html?id=${movieDetails.id}`;
    });

    card.find(".save-movie").click(function () {
      const movieID = movieDetails.id;
      let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
      watchList.push(movieID);
      localStorage.setItem("watchList", JSON.stringify(watchList));
    });

    // Add card element:---------------------------------------------------------------------------
  }
}

function loadLibraryCardsByCategory() {
  // Empty the movie container
  $("#movies-container").empty();

  // Clone the movie category container template and append it to the movies container
  const categoryContainer = $("#template-movie-category-container")
    .contents()
    .clone(true, true);
  $("#movies-container").append(categoryContainer);

  // Loop through movies and generate cards
  for (let i = 0; i < detailedMovies.length; i++) {
    const movieDetails = detailedMovies[i];

    const card = $("#template-card-library").contents().clone(true, true);

    // Add the "card-category" class to the cloned card for scaling reasons
    card.addClass("card-category");

    // Update card content
    card.find(".card-img-top").attr("src", movieDetails.coverImageUrl);
    card.find(".library-card-title").text(movieDetails.movieName);

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

    // Bind click event to the "view-movie" button
    card.find(".view-movie").click(function () {
      window.location.href = `individual.html?id=${movieDetails.id}`;
    });

    card.find(".save-movie").click(function () {
      const movieID = movieDetails.id;
      let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
      watchList.push(movieID);
      localStorage.setItem("watchList", JSON.stringify(watchList));
    });
  }
}

$("input[name='FilterRadio']").click(function () {
  appliedFilter = $(this).attr("value");
  applyFilterSort();
});

$("input[name='sortingRadio']").click(function () {
  appliedSort = $(this).attr("value");
  applyFilterSort();
});

async function applyFilterSort() {
  await populateDMarray();
  let completed = [];
  let load = false;

  // Load everything into their own category
  if (appliedFilter == "category") {
    load = false;
    loadLibraryCardsByCategory();
  } else if (appliedFilter == "default") {
    completed = detailedMovies;
    load = true;
  } else if (appliedFilter == "action") {
    completed = detailedMovies.filter((movie) =>
      movie.genres.includes("Action")
    );
    load = true;
  } else if (appliedFilter == "comedy") {
    completed = detailedMovies.filter((movie) =>
      movie.genres.includes("Comedy")
    );
    load = true;
  } else if (appliedFilter == "drama") {
    completed = detailedMovies.filter((movie) =>
      movie.genres.includes("Drama")
    );
    load = true;
  } else if (appliedFilter == "romance") {
    completed = detailedMovies.filter((movie) =>
      movie.genres.includes("Romance")
    );
    load = true;
  } else if (appliedFilter == "scifi") {
    completed = detailedMovies.filter((movie) =>
      movie.genres.includes("Science Fiction")
    );
    load = true;
  }

  if (load) {
    if (appliedSort == "Popularity") {
      completed = completed.sort((a, b) => b.popularity - a.popularity);
    } else if (appliedSort == "releasedate") {
      completed = completed.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    } else if (appliedSort == "rating") {
      completed = completed.sort((a, b) => b.voteAverage - a.voteAverage);
    }
    $("#sortDropdown").removeClass("disabled");
    loadLibraryCardsFromArray(completed);
  } else {
    completed = [];
    $("#sortDropdown").addClass("disabled");
  }
}

