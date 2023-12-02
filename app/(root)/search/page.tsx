"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/lib/apiConfig";
import { useUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/common/Searchbar";

const page = () => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const { data } = useQuery({
    queryKey: ["users", "search"],
    enabled: isSearched,
    queryFn: () =>
      searchUsers({
        userId: user?.id,
        searchString: search,
      }),
  });

  const handleSearch = (text: string) => {
    setSearch(text);
    
    if(text.trim().length){
        setIsSearched(true);
    }else{
        setIsSearched(false);
    }
  };

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      {JSON.stringify(search.length)}

      <Searchbar
        routeType="search"
        search={search}
        handleSearch={handleSearch}
      />

      <div className="mt-14 flex flex-col gap-9">
        {data?.length === 0 ? (
          <p className="no-result">No User matched this Search.</p>
        ) : (
          <>
            {data?.map((person: any) => (
              <UserCard {...person} personType="User" />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
