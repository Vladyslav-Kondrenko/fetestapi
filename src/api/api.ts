import axios from 'axios';
import type { Movie } from '@/components/movie.type';
const apiDomain = import.meta.env.VITE_BACKEND_API_URL;


interface SearchMoviesResponse {
  error_code: number;
  error_message: string;
  data: Movie[];
}

export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${apiDomain}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

export const searchMovies = async (id?: number, name?: string, genres?: number): Promise<SearchMoviesResponse> => {
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

interface Seat {
  seat: number;
  is_free: boolean;
}

interface Row {
  row: number;
}

export type ShowPlaceData = [Row, Seat[]];

interface GetShowPlacesResponse {
  error_code: number;
  error_message: string;
  data: ShowPlaceData[];
}

export const getShowPlaces = async (id: number, daytime: string, showdate: string): Promise<GetShowPlacesResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('movie_id', id.toString());
    params.append('daytime', daytime);
    params.append('showdate', showdate);

    const response = await axios.get(`${apiDomain}/showPlaces`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching show places:', error);
    throw error;
  }
};

export interface BookPlaceRequest {
  movie_id: number;
  row: number;
  seat: number;
  showdate: string;
  daytime: string;
}

export type BookPlaceData = {
  movie_id: string;
    row: string;
    seat: string;
    showdate: string;
    daytime: string;
    ticketkey: string;
}

export interface BookPlaceResponse {
  error_code: number;
  error_message: string;
  data: BookPlaceData[];
}

export const bookPlace = async (request: BookPlaceRequest): Promise<BookPlaceResponse> => {
  try {
    const response = await axios.post(`${apiDomain}/bookPlace`, request);
    return response.data;
  } catch (error) {
    console.error('Error booking place:', error);
    throw error;
  }
};