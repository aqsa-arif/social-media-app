import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  _id: string;
  parentId: string | null | undefined;
  text: string;
  photo: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: null | {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  children: {
    author: {
      image: string;
    };
  }[];
  currentUserId: string;
  isComment?: boolean;
}

const PostCard = ({
  _id,
  parentId,
  text,
  photo,
  author,
  community,
  createdAt,
  children: comments,
  currentUserId,
  isComment,
}: Props) => {
  console.log(
    _id,
    parentId,
    text,
    photo,
    author,
    community,
    createdAt,
    comments,
    currentUserId
  );

  return (
    <article className="flex flex-col w-full rounded-xl bg-dark-2 p-7">
      <div className="flex justify-between items-start">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative w-11 h-11"
            >
              <Image
                loader={() => author?.image}
                src={author?.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex flex-col w-full">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author?.name}
              </h4>
            </Link>
            <p className="mt-2 mb-4 text-small-regular text-light-2">{text}</p>
            {photo && (
              <Image
                loader={() => photo}
                src={photo}
                alt="Post Image"
                width={480}
                height={230}  
              />
            )}

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src={"/assets/heart-gray.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/posts/${_id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src={"/assets/repost.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src={"/assets/share.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments?.length && (
                <Link href={`posts/${_id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1 ">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
