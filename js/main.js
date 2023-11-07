const apiKey = "55d6709a66609e881d98203251b15b9b";

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

// Shuffle function to randomize the movie list
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getMovieDetails(movieName) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieName
  )}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const movie = data.results[0];

    if (!movie) {
      return null;
    }

    const genreNames = movie.genre_ids.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : "Unknown";
    });

    const movieDetails = {
      title: movie.original_title,
      description: movie.overview,
      coverImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: genreNames,
      id: movie.id,
    };

    return movieDetails;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to create a movie card
function createMovieCard(movieDetails) {
  const card = $("<div>").addClass("col-xs-12 col-sm-6 col-md-4 col-lg-3 justify-content-center movie-card");
  const cardContent = $("<div>").addClass("card mb-0 mr-0");
  const cardImage = $("<img>").addClass("card-img-top").attr("src", movieDetails.coverImageUrl).attr("alt", movieDetails.title);
  const cardBody = $("<div>").addClass("card-body");
  const pillContainer = $("<div>").addClass("pill-container");

  movieDetails.genres.forEach((genre) => {
    const genrePill = $("<span>").addClass("badge rounded-pill text-bg-dark").text(genre);
    pillContainer.append(genrePill);
  });

  const cardTitle = $("<h5>").addClass("library-card-title").text(movieDetails.title);
  const viewButton = $("<button>").addClass("btn btn-primary btn-gradient view-movie").text("View movie");
  const saveButton = $("<button>").addClass("btn btn-outline-dark save-movie").html('<i class="bi bi-bookmark-heart-fill"></i>');

  cardBody.append(pillContainer);
  cardBody.append(cardTitle);
  cardBody.append(viewButton);
  cardBody.append(saveButton);
  cardContent.append(cardImage);
  cardContent.append(cardBody);
  card.append(cardContent);

  // Bind click event to the "view-movie" button
  viewButton.click(function () {
    window.location.href = `individual.html?id=${movieDetails.id}`;
  });

  // Bind click event to the "save-movie" button
  saveButton.click(function () {
    const movieID = movieDetails.id;
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    watchList.push(movieID);
    localStorage.setItem("watchList", JSON.stringify(watchList));
  });

  return card;
}

// Function to populate the home page with movie cards
async function populateHomeCards() {
  const homeNewReleases = $("#home-new-releases");
  const homeMostPopular = $("#home-most-popular");

  const limitPerSection = 4; // Number of cards to display in each section
  let displayedInNewReleases = 0;
  let displayedInMostPopular = 0;

  // Shuffle the animeMovies array
  shuffleArray(animeMovies);

  for (const movieName of animeMovies) {
    const movieDetails = await getMovieDetails(movieName);

    if (movieDetails) {
      const card = createMovieCard(movieDetails);

      if (displayedInNewReleases < limitPerSection) {
        homeNewReleases.append(card);
        displayedInNewReleases++;
      } else if (displayedInMostPopular < limitPerSection) {
        homeMostPopular.append(card);
        displayedInMostPopular++;
      } else {
        break; // Stop adding cards once the limit is reached in both sections
      }
    }
  }
}

// Function to set the username in the navigation bar
function setNavUsername() {
  const currentUser = JSON.parse(localStorage.getItem("activeUser"));
  if (currentUser) {
    $("#nav-item-left").text(currentUser.username);
    $("#nav-item-right").text("Sign Out");
    $("#nav-item-left").removeAttr("href");
    $("#nav-item-right").removeAttr("href");
    $("#nav-item-right").attr("onclick", "signOut();");
  }
}

// Function to sign out the user
function signOut() {
  // Clear the activeUser localStorage
  localStorage.removeItem("activeUser");

  // Restore the original state of the links
  $("#nav-item-left").text("Sign Up");
  $("#nav-item-right").text("Sign In");

  // Update the href attributes to navigate to the correct pages
  $("#nav-item-left").attr("href", "../pages/signup.html");
  $("#nav-item-right").attr("href", "../pages/signin.html");
}

// Call the functions to populate the home page after the page is fully loaded
$(document).ready(() => {
  setTimeout(populateHomeCards, 100);
  setNavUsername();
});
