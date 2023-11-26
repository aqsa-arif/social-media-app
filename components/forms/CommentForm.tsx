"use client";

import { createCommentPost, createPost, fetchUser } from "@/lib/apiConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/post";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface Props {
  postId: string;
  userImgUrl: string;
  userId: string;
}

const CommentForm = ({ postId, userImgUrl, userId }: Props) => {
  console.log(postId, userImgUrl, userId);

  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  // const { data: userInfo, error } = useQuery({
  //   queryKey: ["users", { id: userId }],
  //   queryFn: () => fetchUser({ id: userId }),
  // // });

  // if (userInfo) {
  //   if (!userInfo?.onboarded) redirect("/onboarding");
  //   console.log(userInfo);
  // }
  // if (error) {
  //   console.log(error);
  // }

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createCommentPost,
    onSuccess: (data) => {
      form.reset(); 
      queryClient.invalidateQueries({ queryKey: ["posts"], })      
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    mutate({
      postId,
      text: values.post,
      userId,
      path: pathname,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <div className="relative w-12 h-12">
                  <Image
                    loader={() => userImgUrl}
                    src={userImgUrl}
                    alt="Profile Image"
                    fill 
                    className="rounded-full"
                  />
                </div>
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
