import * as moviesService from '../models/movies/index.js';
import { HttpError } from '../helpers/index.js';
import { movieAddShema, movieUpdateShema } from '../shemas/movies-shemas.js';

const getAll = async (req, res, next) => {
	try {
		const result = await moviesService.listMovies();

		res.json(result);
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const result = await moviesService.getMovieById(id);
		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		res.json(result);
	} catch (error) {
		next(error);
	}
};

const add = async (req, res, next) => {
	try {
		const { error } = movieAddShema.validate(req.body);

		if (error) {
			throw HttpError(400, error.message);
		}

		const result = await moviesService.addMovie(req.body);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const updateById = async (req, res, next) => {
	try {
		const { error } = movieUpdateShema.validate(req.body);

		if (error) {
			throw HttpError(400, error.message);
		}

		const { id } = req.params;

		const result = await moviesService.updateMovieById(id, req.body);

		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		res.json(result);

	} catch (error) {
		next(error);
	}
};

const deleteById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const result = await moviesService.removeMovie(id);

		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		// res.status(204).send();

		res.json(result);

	} catch (error) {
		next(error);
	}
}

export default {
	getAll,
	getById,
	add,
	updateById,
	deleteById,
};
