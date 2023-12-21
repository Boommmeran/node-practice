import express from 'express';
import moviesControllers from '../../controllers/movies-controller-decor.js';
import { isEmptyBody } from "../../middlewares/index.js";


const moviesRouter = express.Router();

const { getAll, getById, add, updateById, deleteById } = moviesControllers;

moviesRouter.get('/', getAll);

moviesRouter.get('/:id', getById);

moviesRouter.post('/', isEmptyBody, add);

moviesRouter.put('/:id', isEmptyBody, updateById);

moviesRouter.delete('/:id', deleteById);

export default moviesRouter;