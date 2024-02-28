import { League } from "../model/league";
import { Club } from "../model/club";
import { IShirt, Shirt } from "../model/shirt"
import { User } from "../model/user";
import { Bid } from "../model/bid";
import { ObjectId } from "mongodb";
import { populate } from "dotenv";

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
		shirts: [Shirt],
		createdAt: String,
	}

	type Shirt {
		_id: ID!,
    	title: String!,
    	description: String!,
    	condition: String!,
    	year: String!,
    	club: Club!,
    	seller: User!,
    	playerName: String!,
    	playerNumber: Int!,
    	bids: Bid,
    	activeBids: Bid,
    	price: Int,
    	minPrice: Int!,
    	createdAt: String,
	}

	type User {
		_id: ID!,
		username: String!,
		email: String!,
		password: String!,
		shirts: Shirt,
		placedBids: Bid,
		createdAt: String,
	}

	type Bid {
		_id: ID!,
		owner: User!,
		shirt: Shirt!,
		amount: Int,
		expiryDate: String,
		accepted: Boolean,
		declined: Boolean,
		createdAt: String,
	}

	type Query {
		allLeagues: [League],
		allClubs: [Club],
		allClubsByLeague(leagueId: ID): [Club],
		allShirts: [Shirt],
		shirtsByLeague(leagueId: ID): [Shirt],
		shirtsByClub(clubId: ID): [Shirt],
		shirtById(shirtId: ID): Shirt,
		shirtsByUserId(userId: ID): [Shirt],
	}
`;

export const resolvers = {
	Query: {
		allLeagues: async () => {
			console.log("Start finding leagues");
			return League.find().then((data) => data);
		},
		allClubs: async () => {
			console.log("Start finding clubs");
			return Club.find().then((data) => data);
		},
		allClubsByLeague: async (_, {leagueId}) => {
			console.log("Start finding clubs by league")
			return Club.find({"league._id": leagueId});
		},
		allShirts: async () => {
			return Shirt.find()
				.populate('club')
				.populate('seller')
				.populate('bids')
				.then((data) => data);
		},
		shirtsByLeague: async (_, {leagueId}: {leagueId: string}) => {
			const league = await League
			.findOne({_id: new ObjectId(leagueId)})
			.populate({
					path: 'clubs',
					populate: {
						path: 'shirts'
					}
			});

			if (!league) {
				return [];
			}
			const clubs = league.clubs

			const shirts: IShirt[] = [];

			clubs.forEach(club => {
				club.shirts.forEach(shirt => {
					shirts.push(shirt);
				});
			});

			return shirts;
		},
		shirtsByClub: async (_, {clubId}: {clubId: string}) => {
			const club = await Club.findOne({_id: new ObjectId(clubId)});
			if (!club) {
				return [];
			}

			if (!club?.populated('shirts')) {
				await club?.populate('shirts');
			}

			return club.shirts;
		},
		shirtById: async (_, {shirtId}) => {
			return Shirt.findById(shirtId);
		},
		shirtsByUserId: async (_, {userId}) => {
			return Shirt.find({"user._id": userId});
		}
	}
};
