import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"; 
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } } ) => {

    const userId = params.id; 
    try {
        connectToDB();
         
        const userPosts = await Post.find({ author: userId }); 
        
        const childPostIds = userPosts.reduce((acc, userPost) => {
            return acc.concat(userPost.children);
        },[]) 

        const replies = await Post.find({
            _id: { $in: childPostIds },
            author: { $ne: userId }
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })
 
        return NextResponse.json(replies);

    } catch (error: any) {
        console.error("Error:", error.message);
        throw new Error("Something went wrong");
    }
}
