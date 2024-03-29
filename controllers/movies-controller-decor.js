import * as moviesService from '../models/movies/index.js';
import { HttpError } from '../helpers/index.js';
import { movieAddShema, movieUpdateShema } from '../shemas/movies-shemas.js';

import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
		const result = await moviesService.listMovies();

		res.json(result);
};

const getById = async (req, res) => {
		const { id } = req.params;

		const result = await moviesService.getMovieById(id);
		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		res.json(result);
};

const add = async (req, res) => {
		const result = await moviesService.addMovie(req.body);

		res.status(201).json(result);
};

const updateById = async (req, res) => {
		const { id } = req.params;

		const result = await moviesService.updateMovieById(id, req.body);

		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		res.json(result);
};

const deleteById = async (req, res) => {
		const { id } = req.params;

		const result = await moviesService.removeMovie(id);

		if (!result) {
			throw HttpError(404, `Movies with id=${id} not found`);
		}

		// res.status(204).send();

		res.json(result);
}

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById),
};
