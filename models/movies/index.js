import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const moviesPath = path.resolve('models', 'movies', 'movies.json');


function updateMovies(movies) {
	fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
}

async function listMovies() {
	const data = await fs.readFile(moviesPath);
	return JSON.parse(data);
}

async function getMovieById(movieId) {
	const movies = await listMovies();

	return movies.find((movie) => movie.id === movieId) || null;
}

async function removeMovie(movieId) {
	const movies = await listMovies();

	const index = movies.findIndex((movie) => movie.id === movieId);

	if (index === -1) {
		return null;
	}

	const [result] = movies.splice(index, 1);

	await updateMovies(movies);

	return result;
};

export const updateMovieById = async (id, data) => {
	const movies = await listMovies();

	const index = movies.findIndex((item) => item.id === id);

	if (index === -1) {
		return null;
	}
	
	movies[index] = { ...movies[index], ...data };

	await updateMovies(movies);

	return movies[index];
};

async function addMovie(data) {
	const movies = await listMovies();

	const newMovie = {
		id: nanoid(),
		...data,
	};

	movies.push(newMovie);

	await updateMovies(movies);

	return newMovie;
}

export { listMovies, getMovieById, removeMovie, addMovie };
