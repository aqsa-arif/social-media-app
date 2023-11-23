import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    connectToDB();
 
    const pageNumber = parseInt(req.nextUrl.searchParams.get('pageNumber') as string) ;
    const pageSizeLimit = parseInt(req.nextUrl.searchParams.get('pageSizeLimit') as string);
    console.log(pageNumber, pageSizeLimit); 

    const skipamount = (pageNumber - 1) * pageSizeLimit;

    // Fetch posts that have no parents 
    const postQuery = Post.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipamount)
        .limit(pageSizeLimit)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children', 
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })

    const totalPostsCount = await Post.countDocuments({ parentId: { $in: [null, undefined] } });
    const posts = await postQuery.exec();

    const isNext = totalPostsCount > posts.length + skipamount;
    
    return NextResponse.json({ posts, isNext });
}