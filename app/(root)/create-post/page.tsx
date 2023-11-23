import React from "react";
import { currentUser } from "@clerk/nextjs";
import PostForm from "@/components/forms/PostForm";

const Page = async () => {
  const user = await currentUser();   
  if (!user) return null;

  return (
    <div>
      <h1 className="head-text">Create Post </h1>
      <PostForm userId={user?.id} />
    </div>
  );
};

export default Page;
