import express from 'express';
import moviesControllers from '../../controllers/movies-controller-decor.js';
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { movieAddShema, movieUpdateShema } from '../../shemas/movies-shemas.js';


const moviesRouter = express.Router();

const { getAll, getById, add, updateById, deleteById } = moviesControllers;

moviesRouter.get('/', getAll);

moviesRouter.get('/:id', getById);

moviesRouter.post('/', isEmptyBody, validateBody(movieAddShema), add);

moviesRouter.put(
	'/:id',
	isEmptyBody,
	validateBody(movieUpdateShema),
	updateById,
);

moviesRouter.delete('/:id', deleteById);

export default moviesRouter;