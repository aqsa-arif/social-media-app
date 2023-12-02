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
    console.log(userId);    

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

        console.log(user);       

        // if (path === "/profile/edit") {
        //     revalidatePath(path);  // Make sure the next time someone visits this specific page, they get the latest and freshest content, not what's saved in the cache
        // }

        return NextResponse.json({ message: "Updated successfully"});

    } catch (error: any) {
        throw new Error("Failed to update/create user: ", error.message);
    }
};


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    connectToDB();
    
    const { id } = params;     
    console.log("ID", id);

    try {
        const user = await User.findOne({ id });
        //  .populate({
        //     path: 'communities',
        //     model: 'Community'
        //  }); 
        console.log('User =>>>>>>>>>>>>', user);
        
        
        return NextResponse.json(user);

    } catch (error: any) {
        throw new Error("Failed to get user : ", error.message);
    }
}
