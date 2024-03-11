import { League } from "../model/league";
import { Club } from "../model/club";
import { ObjectId } from "mongodb";
import { IShirt, Shirt, isShirtCondition } from "../model/shirt";
import { User } from "../model/user";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLContext } from "./utils";

export const allLeagues = async () => {
	return await League.find().then((data) => data);
};

export const allClubs = async () => {
	return await Club.find().then((data) => data);
};

export const allClubsByLeague = async (_: never, {leagueId}: {leagueId: string}) => {
	return await Club.find({"league": new ObjectId(leagueId)});
}

export const allShirts = async () => {
	return await Shirt.find()
		.populate('club')
		.populate('seller')
		.populate('bids')
		.populate('activeBids');
}

export const leagueById = async (_: never, {leagueId}: {leagueId: string}) => {
	return await League.findById(leagueId)
		.populate('clubs');
}

export const clubById = async (_: never, {clubId}: {clubId: string}) => {
	return await Club.findById(clubId)
		.populate('shirts')
		.populate('league');
}

export const shirtsByLeague = async (_: never, {leagueId}: {leagueId: string}) => {
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
}

export const shirtsByClub = async (_: never, {clubId}: {clubId: string}) => {
	const club = await Club.findOne({_id: new ObjectId(clubId)});
	if (!club) {
		return [];
	}



	if (!club?.populated('shirts')) {
		await club?.populate({
			path: 'shirts',
			populate: {
				path: "bids activeBids seller club"
			}
		});
	}

	return club.shirts;
}

export const shirtById = async (_: never, {shirtId}) => {
	return Shirt.findById(shirtId);
}

export const shirtsByUserId = async (_: never, {userId}) => {
	return Shirt.find({"user._id": userId});
}

export const shirtsByCondition = async (_: never, {cond}: {cond: string}) => {
	if (isShirtCondition(cond)) {
		return await Shirt.find({condition: cond})
			.populate('bids')
			.populate('activeBids')
			.populate('club')
			.populate('seller');
	} else {
		return []
	}
}

export const shirtsByYear = async (_: never, {year}: {year: string}) => {
	return await Shirt.find({year})
		.populate('bids')
		.populate('activeBids')
		.populate('club')
		.populate('seller');
}

export const bidsByShirtId = async (_: never, {shirtId}: {shirtId: string}) => {
	const shirt = await Shirt.findById(shirtId).populate('bids');

	if (!shirt) {
		return [];
	}

	return shirt.bids;
}

export const bidsByUserId = async (_: never, {bidId}: {bidId: string}) => {
	const user = await User.findById(bidId).populate('placedBids');

	if (!user) {
		return [];
	}

	return user.placedBids;
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
	allLeagues,
	allClubs,
	allClubsByLeague,
	allShirts,
	leagueById,
	clubById,
	shirtsByLeague,
	shirtsByClub,
	shirtById,
	shirtsByUserId,
	shirtsByCondition,
	shirtsByYear,
	bidsByShirtId,
	bidsByUserId,
	userSignIn,
}
