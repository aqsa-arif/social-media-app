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
                $pull: { likes: userId }
            }
        )

        return NextResponse.json({
            success: true,
            message: 'You disliked a video'
        })
    }
    catch (error: any) { 
        const message = error.message || 'Something went wrong';
        return NextResponse.json({
            success: false,
            message,
        })

    }
}