const getMovieInfo = async (title) => {
  try {
    const response = await fetch(
      `https://omdbapi.com/?t=${title}&type=movie&apikey=2eed784c`,
      { mode: 'cors' }
    );
    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error();
    }

    return {
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      runtime: data.Runtime,
      rating:
        data.Ratings[0] === undefined ? 'N/A' : `${data.Ratings[0].Value}★`,
      plot: data.Plot,
      poster: data.Poster,
    };
  } catch (error) {
    return undefined;
  }
};

export default getMovieInfo;
