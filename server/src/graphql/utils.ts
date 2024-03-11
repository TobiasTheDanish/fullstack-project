import { GraphQLError } from "graphql/error/GraphQLError";
import jwt from "jsonwebtoken";

export interface GraphQLContext {
	jwt?: string,
	userId?: string,
	jwtSecret: string,
}


type ResolverFN = (parent: any, args: any, context: GraphQLContext, info: any) => any | undefined
export function authenticate(resolver: ResolverFN): ResolverFN {
	return (parent: any, args: any, context: GraphQLContext, info: any) => {
		if (!context.jwt) {
			throw new GraphQLError("No JWT found.", {
				extensions: {
					code: 'UNAUTHORIZED',
				}
			});
		}
		
		try {
			const decode = jwt.verify(context.jwt, context.jwtSecret);

			if (typeof decode == "string") {
				context.userId = decode;
			} else {
				context.userId = decode.userId;
			}
		} catch (e) {
			throw new GraphQLError(`Invalid JWT: ${context.jwt}`, {
				extensions: {
					code: 'UNAUTHORIZED',
				},
				originalError: e,
			});
		}


		return resolver(parent, args, context, info);
	}
}
