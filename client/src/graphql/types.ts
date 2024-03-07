export interface Club {
    _id: string,
    name: string,
    league: League,
    shirts: Shirt[],
    createdAt?: Date,
}

export interface League {
    _id: string,
    name: string,
    country: string,
    clubs: Club[],
    createdAt?: Date,
}

export type ShirtCondition = "New" | "Used" | "Damaged"

export interface Shirt {
    _id: string,
    title: string,
    description: string,
    condition: ShirtCondition,
    year: string,
    club?: Club,
    seller?: User,
    playerName: string,
    playerNumber: number,
    bids: Bid[],
    activeBids: Bid[],
    price: number,
    minPrice: number,
    createdAt?: Date,
}

export interface Bid {
    _id: string,
    owner?: User,
    shirt?: Shirt,
    amount: number,
    expiryDate: Date,
    accepted: boolean,
    declined: boolean,
    createdAt?: Date,
}

export interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    shirts: Shirt[],
    placedBids: Bid[],
    createdAt?: Date,
}
