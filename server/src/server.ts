import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql/schema'
import mongoose from 'mongoose';
import { GraphQLContext } from './graphql/utils';

dotenv.config();

async function main() {
	const app = express()

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

	app.listen(4000);
	console.log("Listening on localhost:4000");
}

main()
