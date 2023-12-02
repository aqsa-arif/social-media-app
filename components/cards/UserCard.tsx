import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
}

const UserCard = ({ id, name, username, image, personType }: Props) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card-avatar">
        <div className="relative w-12 h-12 ">
          <Image
            loader={() => image}
            src={image}
            alt=""
            fill
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 text-ellipsis">
        <h4 className="text-base-semibold text-light-1 mb-1">{name}</h4>
        <p className="text-small-medium text-gray-1">@{username}</p>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
