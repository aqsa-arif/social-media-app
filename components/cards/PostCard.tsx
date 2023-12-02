import React from "react";
import { addLike, fetchUser, removeLike } from "@/lib/apiConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

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
  likes: string[] | null | undefined;
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
  children,
  likes,
  currentUserId,
  isComment,
}: Props) => { 
  const { user } = useUser();
  const queryClient = useQueryClient(); 
   
  const { data: userInfo } = useQuery({
    queryKey: ["users", { id: user?.id }],
    queryFn: () => fetchUser({ id: user?.id }),
  });
  console.log(userInfo);
  console.log(likes);
  

  const { mutate: likPostMutate } = useMutation({
    mutationFn: addLike,
    onSuccess: (data) => {
      if (data.success) {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: dislikePostMutate } = useMutation({
    mutationFn: removeLike,
    onSuccess: (data) => {
      if (data.success) {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <article
      className={`flex flex-col w-full rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7 "
      }`}
    >
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
            <p className="mt-2 mb-1 text-small-regular text-light-2">{text}</p>
            {photo && (
              <Image
                loader={() => photo}
                src={photo}
                alt="Post Image"
                width={480}
                height={230}
                className="rounded-lg mt-6"
              />
            )}

            <div className={`mt-5 flex flex-col gap-3 ${isComment && 'mb-10'}`}>
              <div className="flex gap-3.5">
                <button type="button" > 
                  {likes?.length && likes.includes(userInfo?._id) ? (
                    <Image
                      src={"/assets/red-heart.svg"}
                      alt="heart"
                      width={20}
                      height={20}
                      className="cursor-pointer object-contain"
                      onClick={() => dislikePostMutate({postId: _id, userId: userInfo?._id}) }
                    />
                  ) : (
                    <Image
                      src={"/assets/heart-gray.svg"}
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                      onClick={() => likPostMutate({postId: _id, userId: userInfo?._id})}
                    />
                  )}
                </button>

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

              <div className="flex items-center gap-4">
              {children?.length > 0 && (
                <Link href={`/posts/${_id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {children.length} { children.length > 1 ? 'replies' : 'reply'}  
                  </p>
                </Link>
              )} 

              {likes && likes?.length > 0 && (
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {" "}
                 {likes.length} {likes?.length > 1 ? 'likes' : 'like'} 
                </p>
              )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
