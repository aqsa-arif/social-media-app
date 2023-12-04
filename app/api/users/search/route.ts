import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { FilterQuery } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const userId = req.nextUrl.searchParams.get('userId') as string;
    const searchString = req.nextUrl.searchParams.get('searchString') as string;
    try {
        connectToDB();
        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }

        query.$or = [
            { username: { $regex: regex } },
            { name: { $regex: regex } }
        ]

        const usersQuery = await User.find(query).sort({ createdAt: 'desc' }).exec();

        const totalUsersCount = await User.countDocuments(query);

        return NextResponse.json(usersQuery);

    } catch (error: any) {
        throw new Error("Failed to search users: ", error.message);
    }
}
