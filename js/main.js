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

// Get details from the API
async function getMovieDetails(movieName) {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

  try {
      const response = await fetch(apiUrl);
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
      };

      return movieDetails;
  } catch (error) {
      console.error("Error fetching data:", error);
      return null;
  }
}

// Populate home page
async function populateHomeCarousel() {
  const homeNewReleases = document.querySelector('#new-releases-carousel .carousel-inner');
  const homeMostPopular = document.querySelector('#most-popular-carousel .carousel-inner');

  animeMovies.forEach(async (movieName) => {
      const movieDetails = await getMovieDetails(movieName);

      if (movieDetails) {
          const card = createMovieCard(movieDetails);

          // Add card to both "New Releases" and "Most Popular" carousels
          homeNewReleases.appendChild(card.cloneNode(true));
          homeMostPopular.appendChild(card.cloneNode(true));
      }
  });
}

//movie card element
function createMovieCard(movieDetails) {
  const card = document.createElement('div');
  card.className = 'carousel-item';

  const cardContent = document.createElement('div');
  cardContent.className = 'card';

  const cardImage = document.createElement('img');
  cardImage.className = 'card-img-top';
  cardImage.src = movieDetails.coverImageUrl;
  cardImage.alt = movieDetails.title;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'library-card-title';
  cardTitle.textContent = movieDetails.title;

  const pillContainer = document.createElement('div');
  pillContainer.className = 'pill-container';

  movieDetails.genres.forEach((genre) => {
      const genrePill = document.createElement('span');
      genrePill.className = 'badge bg-primary genre-pill';
      genrePill.textContent = genre;
      pillContainer.appendChild(genrePill);
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(pillContainer);
  cardContent.appendChild(cardImage);
  cardContent.appendChild(cardBody);
  card.appendChild(cardContent);

  return card;
}

//navigation bar
function styleNavigationBar() {
  const navBar = document.querySelector('.navbar');
  navBar.classList.add('navbar-library-style');
}

document.addEventListener('DOMContentLoaded', () => {
  populateHomeCarousel();
  styleNavigationBar();
});