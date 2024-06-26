import axios from 'axios';

const apiDomain = import.meta.env.VITE_BACKEND_API_URL;


export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${apiDomain}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

export const searchMovies = async (id?: number, name?: string, genres?: number) => {
  try {
    const params = new URLSearchParams();
    if (id !== undefined) params.append('movie_id', id.toString());
    if (name) params.append('name', name);
    if (genres !== undefined) params.append('genres', genres.toString());

    const response = await axios.get(`${apiDomain}/movies`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieShows = async (id?: number) => {
  try {
    const params = id !== undefined ? { movie_id: id } : {};
    const response = await axios.get(`${apiDomain}/movieShows`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie shows:', error);
    throw error;
  }
};