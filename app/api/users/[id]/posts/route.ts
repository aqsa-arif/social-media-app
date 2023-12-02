import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    connectToDB();

    const { id } = params; 
    try {
        const userPosts = await User.findOne({ id })
            .populate({
                path: 'posts',
                model: Post,
                populate: {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            }) 

        return NextResponse.json(userPosts);

    } catch (error: any) {
        throw new Error("Failed to get posts : ", error.message);
    }
}