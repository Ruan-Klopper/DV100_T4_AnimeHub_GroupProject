let allMovies = [
  {
    name: "Spirited Away",
    genre: "Fantasy",
    categories: ["Adventure", "Mystery"],
  },
  {
    name: "My Neighbor Totoro",
    genre: "Fantasy",
    categories: ["Family", "Adventure"],
  },
  {
    name: "Attack on Titan: Crimson Bow and Arrow",
    genre: "Action",
    categories: ["Fantasy", "Drama"],
  },
  {
    name: "Naruto the Movie: Ninja Clash in the Land of Snow",
    genre: "Action",
    categories: ["Adventure", "Comedy"],
  },
  {
    name: "Death Note: The Last Name",
    genre: "Mystery",
    categories: ["Thriller", "Psychological"],
  },
  {
    name: "Fullmetal Alchemist: The Sacred Star of Milos",
    genre: "Action",
    categories: ["Adventure", "Drama"],
  },
  {
    name: "Your Name",
    genre: "Romance",
    categories: ["Drama", "Supernatural"],
  },
  {
    name: "Cowboy Bebop: The Movie",
    genre: "Sci-Fi",
    categories: ["Space", "Adventure"],
  },
  {
    name: "Princess Mononoke",
    genre: "Fantasy",
    categories: ["Adventure", "Drama"],
  },
  {
    name: "One Piece Film: Strong World",
    genre: "Action",
    categories: ["Adventure", "Comedy"],
  },
  {
    name: "Akira",
    genre: "Sci-Fi",
    categories: ["Cyberpunk", "Action"],
  },
  {
    name: "Neon Genesis Evangelion: The End of Evangelion",
    genre: "Mecha",
    categories: ["Psychological", "Drama"],
  },
  {
    name: "Ghost in the Shell",
    genre: "Sci-Fi",
    categories: ["Cyberpunk", "Action"],
  },
  {
    name: "Sword of the Stranger",
    genre: "Action",
    categories: ["Adventure", "Samurai"],
  },
  {
    name: "Dragon Ball Z: Resurrection 'F'",
    genre: "Action",
    categories: ["Adventure", "Fantasy"],
  },
  {
    name: "Grave of the Fireflies",
    genre: "Drama",
    categories: ["War", "Historical"],
  },
  {
    name: "Howl's Moving Castle",
    genre: "Fantasy",
    categories: ["Adventure", "Romance"],
  },
  {
    name: "One Punch Man: The Strongest Hero",
    genre: "Action",
    categories: ["Comedy", "Superhero"],
  },
  {
    name: "Tokyo Godfathers",
    genre: "Drama",
    categories: ["Comedy", "Christmas"],
  },
  {
    name: "Kiki's Delivery Service",
    genre: "Fantasy",
    categories: ["Adventure", "Family"],
  },
  {
    name: "A Silent Voice",
    genre: "Drama",
    categories: ["School", "Romance"],
  },
  {
    name: "Demon Slayer: Mugen Train",
    genre: "Action",
    categories: ["Supernatural", "Adventure"],
  },
  {
    name: "Paprika",
    genre: "Sci-Fi",
    categories: ["Psychological", "Thriller"],
  },
  {
    name: "A Whisker Away",
    genre: "Fantasy",
    categories: ["Romance", "Supernatural"],
  },
  {
    name: "Summer Wars",
    genre: "Sci-Fi",
    categories: ["Comedy", "Family"],
  },
  {
    name: "Wolf Children",
    genre: "Fantasy",
    categories: ["Slice of Life", "Drama"],
  },
  {
    name: "The Girl Who Leapt Through Time",
    genre: "Romance",
    categories: ["Sci-Fi", "Slice of Life"],
  },
  {
    name: "Akame ga Kill! Zero",
    genre: "Action",
    categories: ["Fantasy", "Adventure"],
  },
  {
    name: "Dragon Ball Super: Broly",
    genre: "Action",
    categories: ["Adventure", "Fantasy"],
  },
  {
    name: "Ghost in the Shell: Stand Alone Complex - Solid State Society",
    genre: "Sci-Fi",
    categories: ["Cyberpunk", "Mystery"],
  },
  {
    name: "The Garden of Words",
    genre: "Romance",
    categories: ["Slice of Life", "Drama"],
  },
  {
    name: "Redline",
    genre: "Action",
    categories: ["Sci-Fi", "Racing"],
  },
  {
    name: "The Wind Rises",
    genre: "Drama",
    categories: ["Biography", "Historical"],
  },
  {
    name: "Ajin: Demi-Human - Compel",
    genre: "Action",
    categories: ["Horror", "Supernatural"],
  },
  {
    name: "Vampire Hunter D: Bloodlust",
    genre: "Action",
    categories: ["Horror", "Vampire"],
  },
  {
    name: "Perfect Blue",
    genre: "Mystery",
    categories: ["Psychological", "Thriller"],
  },
  {
    name: "Nausicaä of the Valley of the Wind",
    genre: "Fantasy",
    categories: ["Adventure", "Post-Apocalyptic"],
  },
  {
    name: "The Promised Neverland: Grace Field's Promise",
    genre: "Mystery",
    categories: ["Thriller", "Psychological"],
  },
  {
    name: "Steamboy",
    genre: "Steam Punk",
    categories: ["Adventure", "Action"],
  },
  {
    name: "Promare",
    genre: "Sci-Fi",
    categories: ["Action", "Mecha"],
  },
  {
    name: "Garden of Sinners - Paradox Spiral",
    genre: "Mystery",
    categories: ["Supernatural", "Psychological"],
  },
  {
    name: "Children Who Chase Lost Voices",
    genre: "Fantasy",
    categories: ["Adventure", "Drama"],
  },
  {
    name: "The Boy and the Beast",
    genre: "Fantasy",
    categories: ["Adventure", "Comedy"],
  },
  {
    name: "Ninja Scroll",
    genre: "Action",
    categories: ["Adventure", "Samurai"],
  },
  {
    name: "Ponyo",
    genre: "Fantasy",
    categories: ["Adventure", "Family"],
  },
  {
    name: "Penguin Highway",
    genre: "Sci-Fi",
    categories: ["Adventure", "Mystery"],
  },
  // You can continue to add more entries to the 'animeMovies' array following the same structure.
];

let moviesByGenre = [
  {
    movieGenre: "Action",
    movieArray: [],
  },
  {
    movieGenre: "Adventure",
    movieArray: [],
  },
  {
    movieGenre: "Fantasy",
    movieArray: [],
  },
  {
    movieGenre: "Science Fiction (Sci-Fi)",
    movieArray: [],
  },
  {
    movieGenre: "Mystery",
    movieArray: [],
  },
  {
    movieGenre: "Drama",
    movieArray: [],
  },
  {
    movieGenre: "Romance",
    movieArray: [],
  },
  {
    movieGenre: "Comedy",
    movieArray: [],
  },
  {
    movieGenre: "Horror",
    movieArray: [],
  },
  {
    movieGenre: "Slice of Life",
    movieArray: [],
  },
  {
    movieGenre: "Psychological",
    movieArray: [],
  },
  {
    movieGenre: "Supernatural",
    movieArray: [],
  },
  {
    movieGenre: "Mecha",
    movieArray: [],
  },
  {
    movieGenre: "Magic",
    movieArray: [],
  },
  {
    movieGenre: "Historical",
    movieArray: [],
  },
  {
    movieGenre: "Martial Arts",
    movieArray: [],
  },
  {
    movieGenre: "Superhero",
    movieArray: [],
  },
  {
    movieGenre: "Vampire",
    movieArray: [],
  },
  {
    movieGenre: "Cyberpunk",
    movieArray: [],
  },
];

allMovies.forEach((movie) => {
  // Find the corresponding genre in 'moviesByGenre' and push the movie
  for (const genreData of moviesByGenre) {
    if (genreData.movieGenre === movie.genre) {
      genreData.movieArray.push(movie);
      break;
    }
  }
});

console.log(moviesByGenre);