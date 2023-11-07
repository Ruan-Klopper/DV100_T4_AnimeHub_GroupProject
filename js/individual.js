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
  setNavUsername();
  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get("id");

  // Check if the movie ID exists
  if (movieID) {
    getMovieDetailsById(movieID);
  } else {
    // Handle the error state
  }

  // Initialize Owl Carousel on the 'video-container' element
  $("#video-container").owlCarousel({
    loop: true,
    margin: 5,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
});

function setNavUsername() {
  const currentUser = JSON.parse(localStorage.getItem("activeUser"));
  if (currentUser) {
    $("#nav-item-left").text(currentUser.username);
    $("#nav-item-right").text("Sign Out");
    $("#nav-item-left").removeAttr("href");
    $("#nav-item-right").removeAttr("href");
  }
}

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
          id: data.id,
          title: data.title,
          description: data.overview,
          language: data.original_language,
          coverImageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          genre_ids: data.genre_ids,
          genres: genreNames,
        };
        $("#movie-title-page").text(movieDetails.title);

        $("#movie-genre").text(movieDetails.genres.join(", "));
        $("#movie-title").text(movieDetails.title);
        // $('#movie-director').text("Movie Directors names");
        // $('#movie-actors').text("Movie Actors names");
        $("#movie-description").text(movieDetails.description);
        $("#movie-image").attr("src", movieDetails.coverImageUrl);

        $(".save-movie").click(function () {
          const movieID = movieDetails.id;
          let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
          watchList.push(movieID);
          localStorage.setItem("watchList", JSON.stringify(watchList));
        });
      } else {
        console.log("Movie not found");
        $("#movie-title-page").text("Movie not found");
      }
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });

  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`;

  $.ajax({
    url: creditsUrl,
    method: "GET",
    dataType: "json",
    success: function (creditsData) {
      // Assuming you want to display the first director and a few actors
      const director = creditsData.crew.find(
        (person) => person.job === "Director"
      );
      const actors = creditsData.cast.slice(0, 3); // Display the first 3 actors

      // Now you can update your DOM elements with this information
      const directors = director ? `${director.name}` : "No Directors";

      const actor =
        actors.length > 0
          ? actors
              .map((actor) => `${actor.name} (${actor.character})`)
              .join(", ")
          : "No actors";

      $("#movie-director").text("Director: " + directors);
      $("#movie-actors").text("Actor/s: " + actor);
    },
    error: function (error) {
      console.error("Error fetching credits data:", error);
    },
  });

  const videoUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`;

  $.ajax({
    url: videoUrl,
    method: "GET",
    dataType: "json",
    success: function (videoData) {
      if (videoData.results.length > 0) {
        for (let i = 0; i < videoData.results.length; i++) {
          const videoKey = videoData.results[i].key;
          const videoFrame = $("#video-frame").contents().clone(true, true);
          videoFrame
            .find("#frame")
            .attr("src", `https://www.youtube.com/embed/${videoKey}`);
          $("#video-container").owlCarousel("add", videoFrame); // Add the video frame to the Owl Carousel
          $("#episodes-heading").text("Available videos:");
        }
        $("#video-container").trigger("refresh.owl.carousel"); // Refresh the Owl Carousel
      } else {
        console.error("No video data available for this movie.");
        $("#episodes-heading").text("No video data available for this movie.");
      }
    },
    error: function (error) {
      console.error("Error fetching video data:", error);
      $("#episodes-heading").text("Error fetching video data:", error);
    },
  });
}
