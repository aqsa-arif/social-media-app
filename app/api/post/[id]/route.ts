import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log(params.id);
    try {
        const post = await Post.findById(params.id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Post,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name image"
                        }
                    },
                ]
            });

        console.log(post);

        return NextResponse.json(post);

    } catch (error) {
        console.log('Error while fetching single Post', error);
    }
}



