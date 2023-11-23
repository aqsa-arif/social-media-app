import * as z from "zod"
 
export const userValidation = z.object({
  profile_photo: z.string().url().min(1, {message: "Can't be empty"}),
  name: z.string().min(3, {message: "Minimum 3 characters"}).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(100, {message: "Maximum 100 characters"}),
})