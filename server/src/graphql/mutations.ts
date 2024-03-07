import { ObjectId } from "mongodb";
import { Shirt } from "../model/shirt";
import { Bid } from "../model/bid";

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

export const createShirt = async (_: never, {input}: CreateShirtArgs) => {
	const newShirt = await Shirt.create({
		_id: new ObjectId(),
		club: new ObjectId(input.clubId),
		seller: new ObjectId(input.sellerId),
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

export const updateShirt = async (_: never, {shirtId, input}: UpdateShirtArgs) => {
	await Shirt.updateOne({_id: shirtId}, {...input})
	return await Shirt.findById(shirtId)
		.populate('club')
		.populate('seller');
}

export const deleteShirtById = async (_: never, {shirtId}: {shirtId: string}) => {
	return await Shirt.findByIdAndDelete(shirtId);
}

export const acceptBid = async (_: never, {bidId}: {bidId: string}) => {
	await Bid.updateOne({_id: bidId}, {accepted: true});
	return await Bid.findById(bidId);
}

export const declineBid = async (_: never, {bidId}: {bidId: string}) => {
	await Bid.updateOne({_id: bidId}, {declined: true});
	return await Bid.findById(bidId);
}

interface CreateBidArgs {
	input: {
		ownerId: string,
		shirtId: string,
		amount: number,
		expiryDate: string
	}
}

export const createBid = async (_: never, {input}: CreateBidArgs) => {
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

export const updateBid = async (_: never, {bidId, input}: UpdateBidArgs) => {
	await Bid.updateOne({_id: bidId}, {...input})
	return await Bid.findById(bidId)
		.populate('shirt')
		.populate('owner');
}

export const deleteBidById = async (_: never, {bidId}: {bidId: string}) => {
	return Bid.findByIdAndDelete(bidId);
}

export default {
	createShirt,
	updateShirt,
	deleteShirtById,
	acceptBid,
	declineBid,
	createBid,
	updateBid,
	deleteBidById,
}
