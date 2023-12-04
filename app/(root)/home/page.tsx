"use client";

import PostCard from "@/components/cards/PostCard";
import { fetchPosts } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";  

export default function Home() {
  const { user } = useUser();  

  const { data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(1, 30), 
  });   

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {postsData?.length === 0 ? (
          <p className="no-result">No Posts found</p>
        ) : (
          <>
            {postsData?.posts?.map((post: any) => {
              return (
                <PostCard key={post._id} {...post} currentUserId={user?.id} />
              );
            })}
          </>
        )}
      </section>
    </div>
  );
}
