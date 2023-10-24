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

const apiKey = "55d6709a66609e881d98203251b15b9b";

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get("id");

  console.log(movieID);
  //chk id exist
  if (movieID) {
    getMovieDetailsById(movieID);
  } else {
    //error state
  }
});

function getMovieDetailsById(movieID) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data) {
        const genreNames = data.genres.map((genre) => genre.name);

        const movieDetails = {
          title: data.original_title,
          description: data.overview,
          language: data.original_language,
          coverImageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          genre_ids: data.genre_ids,
          genres: genreNames,
        };

        console.log("Movie Data:");
        console.log(movieDetails);
        console.log(data);

        $('#movie-genre').text(movieDetails.genres.join(', '));
        $('#movie-title').text(movieDetails.title);
        $('#movie-director').text("Movie Directors names");
        $('#movie-actors').text("Movie Actors names");
        $('#movie-description').text(movieDetails.description);
        $('#movie-image').attr('src', movieDetails.coverImageUrl);
      } else {
        console.log("Movie not found");
      }
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}
