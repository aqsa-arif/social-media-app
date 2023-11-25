"use client";

import React from "react";
import PostCard from "@/components/cards/PostCard";
import { fetchPost, fetchUser } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import CommentForm from "@/components/forms/CommentForm";

const page = ({ params }: { params: { id: string } }) => {
  const {user} = useUser();
  console.log(user?.id); 

  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: user?.id }],
    queryFn: () => fetchUser({ id: user?.id }),
  }); 
  
  //   if(!userInfo?.onboarded) return redirect('/onboarding');

  const { data: singlePost } = useQuery({
    queryKey: ["posts", { id: params.id }],
    queryFn: () => fetchPost(params.id),
  });
  console.log(singlePost);  

  return (
    <section className="relative">
      <div>
        <PostCard key={singlePost?._id} {...singlePost} currentUserId={user} />
      </div>

      <div className="mt-7">
        <CommentForm postId={singlePost?._id} userImgUrl={userInfo?.image} userId={userInfo?._id.toString()}   />
      </div>
    </section>
  );
};

export default page;
