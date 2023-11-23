"use client";

import { createPost, fetchUser } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PostValidation } from "@/lib/validations/post";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/apiConfig";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const PostForm = ({ userId }: { userId: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const { startUpload } = useUploadThing("media");

  const { data: userInfo, error } = useQuery({
    queryKey: ["users", { id: userId }],
    queryFn: () => fetchUser({ id: userId }),
  });

  if (userInfo) {
    if (!userInfo?.onboarded) redirect("/onboarding");
    console.log(userInfo);
  }
  if (error) {
    console.log(error);
  }

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      photo: null,
      accountId: userInfo?._id,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader(); // Allows asynchronous reading of files.
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      // if (!file.type.includes("image")) return;

      // Sets up an event handler to execute when the file reading operation is successfully completed.
      fileReader.onload = async (event) => {
        const imgDataUrl = event.target?.result?.toString() || "";
        fieldChange(imgDataUrl);
      };
      //readAsDataURL tells fileReader to read the contents of the specified file and generate a data URL  => data URL represents the image data encoded as a string. This string can be used directly within application
      fileReader.readAsDataURL(file);
    }
  };

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log(data);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (values.photo) {
      const blob = values.photo;
      const hasImageChange = isBase64Image(blob);

      if (hasImageChange) {
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.photo = imgRes[0].url;
        }
      }
    }
    mutate({
      text: values.post,
      photo: values.photo,
      author: userInfo._id,
      communityId: null,
      path: pathname,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Profile Photo"
                    width={96}
                    height={96}
                    className="rounded-full w-full h-full"
                  />
                ) : (
                  <Image
                    src="assets/profile.svg"
                    alt="Profile Photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="border border-dark-4 bg-dark-3 text-light-1 no-focus">
                <Textarea rows={15} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
