import Post from "@/lib/models/post.model";
import { NextRequest, NextResponse } from "next/server";


//  =======================
//  Dislike post functionality
//  =======================

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await Post.findByIdAndUpdate(
            params.id,
            {
                $pull: { likes: params.id }
            }
        )

        return NextResponse.json({
            success: true,
            message: 'You disliked a video'
        })
    }
    catch (error : any) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        return NextResponse.json({
            success: false,
            message,
        })

    }
}