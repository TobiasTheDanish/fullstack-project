import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql/schema'
import mongoose from 'mongoose';
import { GraphQLContext } from './graphql/utils';
import multer from 'multer';
import { Client } from 'file-storing';
const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();

async function main() {
	const app = express()

	app.use(cors());

	mongoose.connect(process.env.MONGODB_CONN_STR!.replace('<password>', process.env.MONGODB_PW!));

	const server = new ApolloServer<GraphQLContext>({
		typeDefs,
		resolvers,
	});

	await server.start();

	app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, { context : async ({req}) => {
		return {
			jwt: req.headers.authorization,
			jwtSecret: process.env.JWT_SECRET!,
		};
	}}));

	app.post('/upload/single', upload.single('file'), async (req, res, next) => {
		if (!req.file) {
			res.status(400).json({
				error: "No file provided.",
			});
			return next();
		}
		const { buffer } = req.file;

		const storageClient = new Client({
			region: "eu-central-1",
			credentials: {
				accessKeyId: process.env.S3_ACCESS!,
				secretAccessKey: process.env.S3_SECRET!,
			},
		});
		const uploadRes = await storageClient.upload({
			key: crypto.randomUUID(),
			body: buffer,
			bucket: "football-shirts-fullstack-proj",
			objectAccess: "public-read",
		})

		if (uploadRes.succes) {
			res.status(200).json({
				message: "Upload succesfull",
				path: uploadRes.Location,
			});
		} else {
			res.status(500).json({
				error: "Upload of file failed",
				uploadRes,
			});
		}
	});

	app.listen(4000);
	console.log("Listening on localhost:4000");
}

main()
