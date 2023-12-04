import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongoose";
import { revalidatePath } from "next/cache";
import User from "@/lib/models/user.model";

interface Params {
    name: string;
    username: string;
    bio: string;
    image: string;
    path: string;
}

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    connectToDB();

    const {
        name,
        username,
        bio,
        image,
        path,
    }: Params = await req.json();

    const userId = params.id;
    try {
        const user = await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            }, { upsert: true, new: true }
        );

        return NextResponse.json({ message: "Updated successfully" });

    } catch (error: any) {
        throw new Error("Something went wrong ", error.message);
    }
};


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    connectToDB();

    const { id } = params;
    try {
        const user = await User.findOne({ id });
        return NextResponse.json(user);


    } catch (error: any) {
        throw new Error("Failed to get user : ", error.message);
    }
}
