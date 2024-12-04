export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a6a1c9390e7e9eff6a7333d0777acfaf&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };