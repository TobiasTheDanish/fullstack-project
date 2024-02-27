import mongoose from "mongoose";
import dotenv from 'dotenv'
import { Club } from "./model/club";
import { Seller } from "./model/seller";
import { Shirt } from "./model/shirt";
import { ObjectId } from "mongodb";

dotenv.config();

async function main() {
	mongoose.connect(process.env.MONGODB_CONN_STR!.replace("<password>", process.env.MONGODB_PW!));

	/* // create first club
	const chelsea = await Club.create({
		_id: new ObjectId(),
		name: "Chelsea",
		league: "Premier league",
		country: "England",
		shirts: [],
	});

	// create first seller
	const seller = await Seller.create({
		_id: new ObjectId(),
		username: "Chrille",
		email: "chrille@stennicke.dk",
		shirts: [],
	}); */

	const club = await Club.findById(new ObjectId("65dddc8f97422fa34af91c94")).exec();
	const seller = await Seller.findById(new ObjectId("65dddc9097422fa34af91c97")).exec();

	await Shirt.create({
		_id: new ObjectId(),
		name: "Chelsea Home Kit 2013/14",
		club: club!._id,
		seller: seller!._id,
		playerName: "Frank Lampard",
		number: 10,
		price: 800
	});
}

main()
	.then(() => console.log("connected to db"))
	.catch((e) => console.error("Error connecting:", e.message));
