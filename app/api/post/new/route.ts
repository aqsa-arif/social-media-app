import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"; 
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    text: string,
    photo: string | null,
    author: string,
    // communityId: string | null,
    path: string
}

export const POST = async (req: NextRequest) => {     
    connectToDB(); 
    
    const {
        text,
        photo,
        author,
        // communityId,
        path
    }: Params = await req.json();

    try {
        const createdPost = await Post.create({
            text,
            photo,
            author,
            community: null
        })

        // Update User model
        await User.findByIdAndUpdate(author, { $push: { posts: createdPost._id } });
        revalidatePath(path);

        return NextResponse.json({ createdPost, message: "Posted successfully" });

    } catch (error: any) {
        throw new Error("Failed to create post : ", error.message);
    }
};

