import { League } from "../model/league";
import { Club } from "../model/club";
import { IShirt, Shirt, isShirtCondition } from "../model/shirt"
import { ObjectId } from "mongodb";
import { Bid } from "../model/bid";
import { User } from "../model/user";

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

	input CreateShirtInput {
		title: String!,
		description: String!,
		condition: String!,
		year: String!,
		clubId: ID!,
		sellerId: ID!,
		playerName: String,
		playerNumber: Int,
		price: Int!,
		minPrice: Int!
	}

	input UpdateShirtInput {
		title: String!,
		description: String!,
		condition: String!,
		year: String!,
		clubId: ID!,
		sellerId: ID!,
		playerName: String,
		playerNumber: Int,
		price: Int!,
		minPrice: Int!,
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
		playerName: String,
		playerNumber: Int,
		bids: [Bid],
		activeBids: [Bid],
		price: Int!,
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

	input CreateBidInput {
		ownerId: ID!,
		shirtId: ID!,
		amount: Int,
		expiryDate: String
	}

	input UpdateBidInput {
		owner: ID!,
		shirt: ID!,
		amount: Int,
		expiryDate: String,
		accepted: Boolean,
		declined: Boolean,
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
		shirtsByCondition(cond: String): [Shirt],
		shirtsByYear(year: String): [Shirt],
		bidsByShirtId(shirtId: ID): [Bid],
		bidsByUserId(userId: ID): [Bid],
	}

	type Mutation {
		createShirt(input: CreateShirtInput): Shirt,
		updateShirt(shirtId: ID!, input: UpdateShirtInput): Shirt,
		deleteShirtById(id: ID!): Shirt,
		acceptBid(bidId: ID!): Bid,
		declineBid(bidId: ID!): Bid,
		createBid(input: CreateBidInput): Bid,
		updateBid(bidId: ID!, input: UpdateBidInput): Bid,
		deleteBidById(bidId: ID!): Bid,
	}
`;

export const resolvers = {
	Query: {
		allLeagues: async () => {
			return League.find().then((data) => data);
		},
		allClubs: async () => {
			return Club.find().then((data) => data);
		},
		allClubsByLeague: async (_: never, {leagueId}: {leagueId: string}) => {
			return await Club.find({"league": new ObjectId(leagueId)});
		},
		allShirts: async () => {
			return await Shirt.find()
				.populate('club')
				.populate('seller')
				.populate('bids')
				.populate('activeBids');
		},
		leagueById: async (_: never, {leagueId}: {leagueId: string}) => {
			return await League.findById(leagueId)
				.populate('clubs');
		},
		clubById: async (_: never, {clubId}: {clubId: string}) => {
			return Club.findById(clubId)
				.populate('shirts')
				.populate('league');
		},
		shirtsByLeague: async (_: never, {leagueId}: {leagueId: string}) => {
			const league = await League
				.findOne({_id: new ObjectId(leagueId)})
				.populate({
					path: 'clubs',
					populate: {
						path: 'shirts',
						populate: {
							path: "bids activeBids seller club"
						}
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
		shirtsByClub: async (_: never, {clubId}: {clubId: string}) => {
			const club = await Club.findOne({_id: new ObjectId(clubId)});
			if (!club) {
				return [];
			}

			if (!club?.populated('shirts')) {
				await club?.populate({
					path: 'shirts',
					populate: {
						path: "bids activeBids seller"
					}
				});
			}

			return club.shirts;
		},
		shirtById: async (_: never, {shirtId}) => {
			return Shirt.findById(shirtId);
		},
		shirtsByUserId: async (_: never, {userId}) => {
			return Shirt.find({"user._id": userId});
		},
		shirtsByCondition: async (_: never, {cond}: {cond: string}) => {
			if (isShirtCondition(cond)) {
				return await Shirt.find({condition: cond})
				.populate('bids')
				.populate('activeBids')
				.populate('club')
				.populate('seller');
			} else {
				return []
			}
		},
		shirtsByYear: async (_: never, {year}: {year: string}) => {
			return await Shirt.find({year})
				.populate('bids')
				.populate('activeBids')
				.populate('club')
				.populate('seller');
		},
		bidsByShirtId: async (_: never, {shirtId}: {shirtId: string}) => {
			const shirt = await Shirt.findById(shirtId).populate('bids');
			
			if (!shirt) {
				return [];
			}

			return shirt.bids;
		},
		bidsByUserId: async (_: never, {bidId}: {bidId: string}) => {
			const user = await User.findById(bidId).populate('placedBids');
			
			if (!user) {
				return [];
			}

			return user.placedBids;
		},
	},
	Mutation: {
		createShirt: async (_: never, {input}: CreateShirtArgs) => {
			const newShirt = await Shirt.create({
				_id: new ObjectId(),
				club: new ObjectId(input.clubId),
				seller: new ObjectId(input.sellerId),
				...input
			});

			await newShirt.populate('club');
			await newShirt.populate('seller');

			return newShirt;
		},
		updateShirt: async (_: never, {shirtId, input}: UpdateShirtArgs) => {
			await Shirt.updateOne({_id: shirtId}, {...input})
			return await Shirt.findById(shirtId)
				.populate('club')
				.populate('seller');
		},
		deleteShirtById: async (_: never, {shirtId}: {shirtId: string}) => {
			return await Shirt.findByIdAndDelete(shirtId);
		},
		acceptBid: async (_: never, {bidId}: {bidId: string}) => {
			await Bid.updateOne({_id: bidId}, {accepted: true});
			return await Bid.findById(bidId);
		},
		declineBid: async (_: never, {bidId}: {bidId: string}) => {
			await Bid.updateOne({_id: bidId}, {declined: true});
			return await Bid.findById(bidId);
		},
		createBid: async (_: never, {input}: CreateBidArgs) => {
			const newBid = await Bid.create({
				_id: new ObjectId(),
				owner: new ObjectId(input.ownerId),
				shirt: new ObjectId(input.shirtId),
				expiryDate: new Date(input.expiryDate),
				amount: input.amount,
			});

			await newBid.populate('owner');
			await newBid.populate('shirt');

			return newBid;
		},
		updateBid: async (_: never, {bidId, input}: UpdateBidArgs) => {
			await Bid.updateOne({_id: bidId}, {...input})
			return await Bid.findById(bidId)
				.populate('shirt')
				.populate('owner');
		},
		deleteBidById: async (_: never, {bidId}: {bidId: string}) => {
			return Bid.findByIdAndDelete(bidId);
		},
	}
};

interface CreateShirtArgs {
	input: {
		title: string,
		description: string,
		condition: string,
		year: string,
		clubId: string,
		sellerId: string,
		playerName: string,
		playerNumber: number,
		price: number,
		minPrice: number
	}
}

interface UpdateShirtArgs {
	shirtId: string,
	input: {
		title: string,
		description: string,
		condition: string,
		year: string,
		club: string,
		seller: string,
		playerName: string,
		playerNumber: number,
		bids: [string],
		activeBids: [string],
		price: number,
		minPrice: number,
		createdAt: string,
	}
}

interface CreateBidArgs {
	input: {
		ownerId: string,
		shirtId: string,
		amount: number,
		expiryDate: string
	}
}

interface UpdateBidArgs {
	bidId: string, 
	input: {
		owner: string,
		shirt: string,
		amount: number,
		expiryDate: string,
		accepted: boolean,
		declined: boolean,
	}
}
