"use client";

import React from "react";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { user } = useUser();

  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: user?.id }],
    queryFn: () => fetchUser({ id: user?.id }),
  });

  const userData = {
    id: user?.id || "",
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };
 
  return (
    <div className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your Profile now to use Socail Media App
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </div>
  );
};

export default Page;
