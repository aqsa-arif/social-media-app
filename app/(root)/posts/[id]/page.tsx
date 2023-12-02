"use client";

import React from "react";
import PostCard from "@/components/cards/PostCard";
import { fetchPost, fetchUser } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import CommentForm from "@/components/forms/CommentForm";

const page = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();

  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: user?.id }],
    queryFn: () => fetchUser({ id: user?.id }),
  });

  //   if(!userInfo?.onboarded) return redirect('/onboarding');

  const { data: singlePost } = useQuery({
    queryKey: ["posts", { id: params.id }],
    queryFn: () => fetchPost(params.id),
  }); 

  return (
    <section className="relative">
      <div>
        <PostCard
          key={singlePost?._id}
          {...singlePost}
          currentUserId={user?.id}
        />
      </div>

      <div className="mt-7">
        <CommentForm
          postId={singlePost?._id}
          userImgUrl={userInfo?.image}
          userId={userInfo?._id.toString()}
        />
      </div>

      <div className="mt-10 flex flex-col">
        {singlePost?.children?.map((comment: any) => {
          return (
            <PostCard
              key={comment._id}
              {...comment}
              currentUserId={comment.id}
              isComment
            />
          );
        })}
      </div>
    </section>
  );
};

export default page;
