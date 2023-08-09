const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "fe8ba14535c5eea8b34473a3ed6658fc",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
