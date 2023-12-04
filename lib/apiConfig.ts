import axios from "axios";
import { ObjectId } from "mongoose";

interface Params {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  path: string;
}
export const updateUser = async ({
  id,
  name,
  username,
  bio,
  image,
  path,
}: Params): Promise<string> => {
  try {
    const { data } = await axios({
      url: `/api/users/${id}`,
      method: "PUT",
      data: {
        name,
        username,
        bio,
        image,
        path,
      },
    });
    ;
    return data.message;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async ({
  text,
  photo,
  author,
  communityId,
  path,
}: {
  text: string;
  photo: string | null,
  author: ObjectId;
  communityId: null;
  path: string;
}) => {
  try {
    const { data } = await axios({
      url: `/api/post/new`,
      method: "POST",
      data: {
        text,
        photo,
        author,
        communityId,
        path,
      },
    });
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUser = async ({ id }: { id: string | undefined }) => {
  try {
    const { data } = await axios({
      url: `/api/users/${id}`,
      method: "GET",
    });
    ;
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPost = async (id: string) => {
  try {
    const { data } = await axios({
      url: `/api/post/${id}`,
      method: "GET",
    });
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPosts = async (pageNumber = 1, pageSizeLimit = 20) => {
  try {
    const { data } = await axios({
      url: `/api/post`,
      method: "GET",
      // params: {
      //   pageNumber,
      //   pageSizeLimit
      // }
    });
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserPosts = async (id: string) => {
  try {
    const { data } = await axios({
      url: `/api/users/${id}/posts`,
      method: "GET",
    });
    ;

    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const createCommentPost = async ({
  text,
  postId,
  userId,
  path,
}: {
  text: string;
  postId: string,
  userId: string,
  path: string;
}) => {
  try {
    const { data } = await axios({
      url: `/api/comment/new`,
      method: "POST",
      data: {
        text,
        postId,
        userId,
        path,
      },
    });
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addLike = async ({ postId, userId }: { postId: string, userId: string }) => {
  try {
    const { data } = await axios({
      url: `/api/post/like`,
      method: "PUT",
      data: {
        postId, userId
      }
    });
    ;
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeLike = async ({ postId, userId }: { postId: string, userId: string }) => {
  try {
    const { data } = await axios({
      url: `/api/post/dislike`,
      method: "PUT",
      data: {
        postId, userId
      }
    });
    ;
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const searchUsers = async ({ userId, searchString }: { userId: string | undefined, searchString: string }) => {
  try {
    const { data } = await axios({
      url: `/api/users/search`,
      method: "POST",
      data: {
        userId,
        searchString
      }
    });
    ;
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUserActivity = async (id: string) => {
  try {
    const { data } = await axios({
      url: `/api/users/activity/${id}`,
      method: "GET",
    });
    ;
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

