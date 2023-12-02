import { fetchUserPosts } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "../cards/PostCard";

interface Props {
  currentUserId: string | undefined;
  accountId: string;
  dbId: string;
  accountType: string;
}

const PostsTab = ({ currentUserId, accountId, dbId, accountType }: Props) => {
  const { data: result } = useQuery({
    queryKey: ["posts", { id: accountId }],
    queryFn: () => fetchUserPosts(accountId),
  }); 

  if (result?.posts?.length < 1 ) 
    return (
      <div className="w-fit mx-auto my-8">
        <p>Haven't created any posts yet.</p>
      </div>
    );

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result?.posts?.map((post: any) => (
        <PostCard
          key={post._id}
          {...post}
          author={ 
            accountType === "User" && { name: result.name, image: result.image, id: result.id } 
          }
          currentUserId={currentUserId}
          accountType={accountType}
        />
      ))}
    </section>
  );
};

export default PostsTab;
