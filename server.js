import mongoose from 'mongoose';
import { app } from "./app.js";
import { DB_HOST } from "./config.js";



mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000, () => console.log('server running'));
	})
	.catch((error) => {
    console.log(error.message);
    process.exit(1)
	});

