"use client";

import { fetchUser, getUserActivity } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const [isUserActive, setIsUserActive] = useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: user?.id }],
    queryFn: () => fetchUser({ id: user?.id }),
  });

  useEffect(() => {
    if (userInfo?._id) {
      setIsUserActive(true);
    }
  }, [userInfo?._id]);

  const { data: userActivty } = useQuery({
    queryKey: ["users", "search"],
    enabled: isUserActive,
    queryFn: () => getUserActivity(userInfo?._id),
  });

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {userActivty?.length > 0 ? (
          <>
            {userActivty?.map((activity: any) => {
              return (
                <Link key={activity._id} href={`/posts/${activity.parentId}`}>
                  <article className="activity-card">
                    <Image
                      loader={() => activity?.author?.image}
                      src={activity?.author?.image}
                      alt="Profile Picture"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {activity?.author?.name}
                      </span>
                      replied to your comment.
                    </p>
                  </article>
                </Link>
              );
            })}
          </>
        ) : (
          <p className="text-base-regular text-light-3">No activity yet.</p>
        )}
      </section>
    </section>
  );
};

export default page;
