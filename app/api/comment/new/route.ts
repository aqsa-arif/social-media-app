import Post from "@/lib/models/post.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { postId, text, userId, path } = await req.json();    

    connectToDB();
    try {         
        const commentPost = new Post({
            parentId: postId, 
            text, 
            author: userId
        })
        const saved = await commentPost.save(); 

        const originalPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { children: saved._id } },
            { new: true }
          );
          
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Comment posted successfully" });

    } catch (error : any) {
        console.log('Error while saving comment post', error.message);        
    }
}