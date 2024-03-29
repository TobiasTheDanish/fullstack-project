export interface Club {
    _id: string,
    name: string,
    league: League,
    shirts: Shirt[],
    imageUrl: string,
    createdAt?: Date,
}

export interface League {
    _id: string,
    name: string,
    country: string,
    clubs: Club[],
    imageUrl: string,
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
    imageUrls: string[],
    createdAt?: string,
}

export interface Bid {
    _id: string,
    owner?: User,
    shirt?: Shirt,
    amount: number,
    expiryDate: string,
    accepted: boolean,
    declined: boolean,
    createdAt?: string,
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
