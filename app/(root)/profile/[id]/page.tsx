"use client";

import React from "react";
import ProfileHeader from "@/components/common/ProfileHeader";
import { fetchUser } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import PostsTab from "@/components/common/PostsTab"; 

const page = ({ params }: { params: { id: string } }) => {
  const { user } = useUser(); 
  
  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: params.id }],
    queryFn: () => fetchUser({ id: params.id }),
  });
  

  return (
    <div>
      <ProfileHeader
        profileId={userInfo?.id}
        logedInId={user?.id}
        name={userInfo?.name}
        username={userInfo?.username}
        imgUrl={userInfo?.image}
        bio={userInfo?.bio}
      />

      <div className="mt-9">
        <div className="w-full">
          <div className="tab w-1/4 px-4">
            <Image
              src={"/assets/reply.svg"}
              alt={"Posts"}
              width={24}
              height={24}
              className="object-contain"
            />
            <p className="max-sm:hidden">Posts</p>
            <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
              {userInfo?.posts?.length}
            </p>
          </div>

          <div className="w-full text-light-1">
            <PostsTab
              currentUserId={user?.id}
              accountId={userInfo?.id}
              dbId={userInfo?._id}
              accountType={"User"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
