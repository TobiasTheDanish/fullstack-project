import queries from "./queries";
import mutations from "./mutations";

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
		playerName: String,
		playerNumber: Int,
		price: Int!,
		imageUrls: [String],
		minPrice: Int!
	}

	input UpdateShirtInput {
		title: String!,
		description: String!,
		condition: String!,
		year: String!,
		clubId: ID!,
		playerName: String,
		playerNumber: Int,
		price: Int!,
		minPrice: Int!,
		imageUrls: [String],
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
		imageUrls: [String],
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
		shirtId: ID!,
		amount: Int,
		expiryDate: String
	}

	input UpdateBidInput {
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
		leagueById(leagueId: ID): League,
		clubById(clubId: ID): Club,
		shirtsByLeague(leagueId: ID): [Shirt],
		shirtsByClub(clubId: ID): [Shirt],
		shirtById(shirtId: ID): Shirt,
		shirtsByUserId(userId: ID): [Shirt],
		shirtsByCondition(cond: String): [Shirt],
		shirtsByYear(year: String): [Shirt],
		bidsByShirtId(shirtId: ID): [Bid],
		bidsByUserId(userId: ID): [Bid],
		userSignIn(username: String!, password: String!): String,
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
		userSignUp(username: String!, email: String!, password: String!): String,
	}
`;

export const resolvers = {
	Query: queries,
	Mutation: mutations,
};
