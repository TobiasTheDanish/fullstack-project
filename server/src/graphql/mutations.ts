import { ObjectId } from "mongodb";
import { Shirt } from "../model/shirt";
import { Bid } from "../model/bid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { User } from "../model/user";
import { authenticate, GraphQLContext } from "./utils";
import { League } from "../model/league";
import { Club } from "../model/club";

interface CreateShirtArgs {
	input: {
		title: string,
		description: string,
		condition: string,
		year: string,
		clubId: string,
		playerName: string,
		playerNumber: number,
		price: number,
		imageUrls: string[],
		minPrice: number,
	}
}

export const createShirt = async (_: any, {input}: CreateShirtArgs, context: GraphQLContext) => {
	const newShirt = await Shirt.create({
		_id: new ObjectId(),
		club: new ObjectId(input.clubId),
		seller: new ObjectId(context.userId!),
		...input
	});

	await newShirt.populate('club');
	await newShirt.populate('seller');

	return newShirt;
}

interface UpdateShirtArgs {
	shirtId: string,
	input: {
		title: string,
		description: string,
		condition: string,
		year: string,
		club: string,
		playerName: string,
		playerNumber: number,
		bids: [string],
		activeBids: [string],
		price: number,
		minPrice: number,
		imageUrls: string[],
		createdAt: string,
	}
}

export const updateShirt = async (_: any, {shirtId, input}: UpdateShirtArgs, context: GraphQLContext) => {
	await Shirt.updateOne({_id: shirtId, seller: context.userId}, {...input, seller: context.userId})
	return await Shirt.findById(shirtId)
		.populate('club')
		.populate('seller');
}

export const deleteShirtById = async (_: any, {id}: {id: string}, context: GraphQLContext) => {
	const shirt = await Shirt.findOneAndDelete({_id: new ObjectId(id), seller: new ObjectId(context.userId)});
	if (!shirt) {
		throw new GraphQLError(`Could not find and delete shirt with id: ${id}, and sellerId: ${context.userId}`, {
			extensions: {
				code: "INTERNAL_SERVER_ERROR",
			}
		});
	}

	return shirt;
}

export const acceptBid = async (_: any, {bidId}: {bidId: string}) => {
	const bid = await Bid.updateOne({_id: bidId}, {accepted: true});

	if (bid.modifiedCount != 1) {
		throw new GraphQLError(`No update to place on bid with id: ${bidId}!`, {
			extensions: {
				code: "INTERNAL_SERVER_ERROR",
			},
		});
	}

	return await Bid.findById(bidId);
}

export const declineBid = async (_: any, {bidId}: {bidId: string}) => {
	const bid = await Bid.updateOne({_id: bidId}, {declined: true});

	if (bid.modifiedCount != 1) {
		throw new GraphQLError(`No update to place on bid with id: ${bidId}!`, {
			extensions: {
				code: "INTERNAL_SERVER_ERROR",
			},
		});
	}

	return await Bid.findById(bidId);
}

interface CreateBidArgs {
	input: {
		shirtId: string,
		amount: number,
		expiryDate: string
	}
}

export const createBid = async (_: any, {input}: CreateBidArgs, context: GraphQLContext) => {
	const newBid = await Bid.create({
		_id: new ObjectId(),
		owner: new ObjectId(context.userId),
		shirt: new ObjectId(input.shirtId),
		expiryDate: new Date(parseInt(input.expiryDate)),
		amount: input.amount,
	});

	await newBid.populate('owner');
	await newBid.populate('shirt');

	return newBid;
}

interface UpdateBidArgs {
	bidId: string, 
	input: {
		shirt: string,
		amount: number,
		expiryDate: string,
		accepted: boolean,
		declined: boolean,
	}
}

export const updateBid = async (_: any, {bidId, input}: UpdateBidArgs, context: GraphQLContext) => {
	await Bid.updateOne({_id: bidId, owner: context.userId}, {...input, owner: context.userId})
	return await Bid.findById(bidId)
		.populate('shirt')
		.populate('owner');
}

export const deleteBidById = async (_: any, {bidId}: {bidId: string}, context: GraphQLContext) => {
	return Bid.findOneAndDelete({_id: bidId, owner: context.userId});
}

interface UpdateLeagueArgs {
	leagueId: string, 
	input: {
		name: string,
		country: string,
		imageUrl: string,
	}
}

export const updateLeague = async (_: any, {leagueId, input}: UpdateLeagueArgs) => {
	await League.updateOne({_id: leagueId}, {...input})

	return await League.findById(leagueId)
		.populate({
			path: 'clubs',
			populate: {
				path: 'shirts',
				populate: {
					path: "bids activeBids seller club"
				}
			}
		});
}

interface UpdateClubArgs {
	clubId: string, 
	input: {
		name: string,
		league: string,
		imageUrl: string,
	}
}

export const updateClub = async (_: any, {clubId, input}: UpdateClubArgs) => {
	await Club.updateOne({_id: clubId}, {...input})

	return await Club.findById(clubId)
		.populate('league')
		.populate({
			path: 'shirts',
			populate: {
				path: "bids activeBids seller club"
			}
		});
}

interface Credentials {
	username: string,
	email: string,
	password: string,
}
export const userSignUp = async(_: never, {username, email, password}: Credentials, context: GraphQLContext) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			username: username,
			email: email,
			password: hashedPassword,
			shirts: [],
			placedBids: [],
		});

		const token = jwt.sign({userId: user._id}, context.jwtSecret, {expiresIn: '1d'});

		return token;
	} catch (e) {
		throw new GraphQLError("An error occurred during sign up", {
			extensions: {
				code: 'INTERNAL_SERVER_ERROR',
			},
			originalError: e,
		});
	}
}

interface Credentials {
	username: string,
	password: string,
}
export const userSignIn = async(_: never, {username, password}: Credentials, context: GraphQLContext) => {
	const user = await User.findOne({username: username});

	if (!user) {
		throw new GraphQLError("Invalid username", {
			extensions: {
				code: 'BAD_CREDENTIALS',
			},
		});
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new GraphQLError("Invalid username or password", {
			extensions: {
				code: 'BAD_CREDENTIALS',
			},
		});
	}

	try {
		const token = jwt.sign({userId: user._id}, context.jwtSecret, {expiresIn: '1d'});

		return token
	} catch (e) {
		throw new GraphQLError("Could not sign JWT.", {
			extensions: {
				code: 'INTERNAL_SERVER_ERROR',
			},
			originalError: e,
		});
	}
}

export default {
	createShirt: authenticate(createShirt),
	updateShirt: authenticate(updateShirt),
	deleteShirtById: authenticate(deleteShirtById),
	acceptBid: authenticate(acceptBid),
	declineBid: authenticate(declineBid),
	createBid: authenticate(createBid),
	updateBid: authenticate(updateBid),
	deleteBidById: authenticate(deleteBidById),
	updateLeague: authenticate(updateLeague),
	updateClub: authenticate(updateClub),
	userSignIn,
	userSignUp,
}
