import Post from "@/lib/models/post.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (req: NextRequest) => {
    connectToDB();
    const { postId, userId } = await req.json();

    try {
        const updated = await Post.findByIdAndUpdate(
            postId,
            {
                $addToSet: { likes: userId },
            },
        );

        return NextResponse.json({
            success: true,
            message: 'You liked a video',
        })
    }
    catch (error: any) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        return NextResponse.json({
            success: false,
            message,
        })
    }
}