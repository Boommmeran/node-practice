import mongoose from 'mongoose';
import { app } from "./app.js";

const DB_HOST =
	'mongodb+srv://Boom:Boom1992@practicecluster.fgilhp3.mongodb.net/my-movies?retryWrites=true&w=majority';

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000, () => console.log('server running'));
	})
	.catch((error) => {
    console.log(error.message);
    process.exit(1)
	});

