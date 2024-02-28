import { League } from "../model/league";

export const typeDefs = `#graphql
	type League {
		_id: ID!,
		name: String!,
		country: String!,
		createdAt: String,
	}

	type Club {
		_id: ID!,
		name: String!,
		league: League!,
		createdAt: String,
	}

	type Query {
		allLeagues: [League],
		allClubs: [Club],
		allClubsByLeague(leagueId: ID): [Club],
	}
`;

export const resolvers = {
	Query: {
		allLeagues: async () => {
			console.log("Start finding leagues");
			return League.find().then((data) => data);
		},
	},
};
