"use client";

import React from "react";
import ProfileHeader from "@/components/common/ProfileHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import Image from "next/image";

const page = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();
  console.log(user?.id);

  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: params.id }],
    queryFn: () => fetchUser({ id: params.id }),
  });

  //   if (userInfo) {
  //     if (!userInfo?.onboarded) redirect("/onboarding");
  //   }

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
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                    {userInfo?.posts?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
