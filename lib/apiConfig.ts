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
  console.log(id);
     
  try {
    const { data } = await axios({
      url: `/api/users/${id}`,
      method: "GET",
    });
    console.log(data);    
    return data;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPost = async ( id : string ) => { 
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
      params: {
       pageNumber,
       pageSizeLimit 
      }
    });
    return data;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};
